import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, extname, isAbsolute, join, relative, resolve } from "node:path";
import { type Command } from "commander";
import yaml from "js-yaml";
import { extractJsonText } from "./agent-response.js";
import { collectResolvedDeliverables, loadCatalogDocs } from "./catalog-build.js";
import { resolveBasePath } from "./catalog-paths.js";
import { resolveViewpointsDoc } from "./review-plan.js";
import type { GradeRubric, ReviewViewpoint, ReviewViewpointsDoc } from "./review-types.js";
import {
  assertValidActor,
  getProjectCatalogPath,
  getProjectExecutionPath,
  getProjectViewpointsPath,
  loadConfig,
  loadMemberRoster,
  specdojoRootDir,
  type MemberRoster,
  type SpecDojoProjectConfig,
} from "./specdojo-config.js";
import { listFilesRecursive } from "./exec-shared.js";

export type GradeTarget = "kata" | "deliverable";
export type GradeSeverity = "blocker" | "major" | "minor" | "note";

export type GradeFindingInput = {
  id?: string;
  severity: GradeSeverity;
  message: string;
  line?: number;
};

type PreviousGradeFinding = Pick<GradeFindingInput, "severity" | "message"> & {
  rule: string;
};

export type GradeViewpointInput = {
  id: string;
  level: number;
  findings?: GradeFindingInput[];
};

export type GradeDocumentInput = {
  path: string;
  viewpoints: GradeViewpointInput[];
};

export type GradeSubmission = {
  rubric: string;
  /** @deprecated grade apply ignores this agent-supplied value; use --by instead. */
  graded_by?: string;
  documents: GradeDocumentInput[];
};

export type GradeValidationIssue = { path: string; message: string };

type MarkdownDocument = {
  data: Record<string, unknown>;
  body: string;
};

const FINDING_RE =
  /^[ \t]*<!--[ \t]*specdojo:finding[ \t]+id=([^ \t]+)[ \t]+severity=(blocker|major|minor|note)[ \t]+rule=([^ \t]+)[ \t]+(.*?)[ \t]*-->[ \t]*(?:\r?\n|$)/gm;
const KATA_DIRS = ["rulebooks", "recipes", "samples", "templates"] as const;
const KATA_REFERENCE_EXTENSIONS = new Set([".md", ".yaml", ".yml", ".json"]);
const KATA_REFERENCE_FIELDS = ["rulebook", "recipe", "sample", "template"] as const;
const SEVERITY_LEVEL_CAP: Record<GradeSeverity, number> = {
  blocker: 0,
  major: 2,
  minor: 3,
  note: 4,
};

function levelCapForFindings(findings: readonly GradeFindingInput[]): number {
  const majorCount = findings.filter((finding) => finding.severity === "major").length;
  const severityCap = findings.reduce(
    (current, finding) => Math.min(current, SEVERITY_LEVEL_CAP[finding.severity]),
    4,
  );
  return majorCount >= 2 ? Math.min(severityCap, 1) : severityCap;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseMarkdown(content: string, path: string): MarkdownDocument {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`${path}: Markdown frontmatter is required`);
  const parsed = yaml.load(match[1]);
  if (!isRecord(parsed) || !isRecord(parsed.specdojo)) {
    throw new Error(`${path}: frontmatter must contain a specdojo mapping`);
  }
  return { data: parsed, body: (match[2] ?? "").replace(/^(?:\r?\n)+/, "") };
}

function serializeMarkdown(document: MarkdownDocument): string {
  return `---\n${yaml.dump(document.data, { lineWidth: 120, noRefs: true }).trimEnd()}\n---\n\n${document.body.replace(/^\n+/, "")}`;
}

function withoutFindingComments(body: string): string {
  return body.replace(FINDING_RE, "");
}

function previousGradeFindings(body: string): PreviousGradeFinding[] {
  return [...body.matchAll(FINDING_RE)].map((match) => ({
    severity: match[2] as GradeSeverity,
    rule: match[3],
    message: match[4].trim(),
  }));
}

function stableContentHash(document: MarkdownDocument): string {
  const cloned = structuredClone(document.data);
  const specdojo = isRecord(cloned.specdojo) ? cloned.specdojo : {};
  delete specdojo.grade;
  return createHash("sha256")
    .update(yaml.dump(cloned, { sortKeys: true, noRefs: true, lineWidth: -1 }))
    .update("\n")
    .update(withoutFindingComments(document.body))
    .digest("hex");
}

function sanitizeCommentText(value: string): string {
  return value
    .replace(/--+/g, "—")
    .replace(/[\r\n]+/g, " ")
    .trim();
}

function findingComment(
  finding: Required<Pick<GradeFindingInput, "id">> & GradeFindingInput,
  rule: string,
): string {
  return `<!-- specdojo:finding id=${finding.id} severity=${finding.severity} rule=${rule} ${sanitizeCommentText(finding.message)} -->`;
}

function insertFindings(body: string, viewpoints: GradeViewpointInput[]): string {
  const lines = withoutFindingComments(body).split("\n");
  const insertions = new Map<number, string[]>();
  const usedIds = new Set(
    viewpoints.flatMap((viewpoint) =>
      (viewpoint.findings ?? []).flatMap((finding) => (finding.id ? [finding.id] : [])),
    ),
  );
  let sequence = 0;
  for (const viewpoint of viewpoints) {
    for (const finding of viewpoint.findings ?? []) {
      let id = finding.id?.trim();
      if (!id) {
        do {
          sequence += 1;
          id = `F${String(sequence).padStart(3, "0")}`;
        } while (usedIds.has(id));
        usedIds.add(id);
      }
      const index = Math.max(0, Math.min(lines.length, (finding.line ?? 1) - 1));
      const existing = insertions.get(index) ?? [];
      existing.push(findingComment({ ...finding, id }, viewpoint.id));
      insertions.set(index, existing);
    }
  }
  const output: string[] = [];
  for (let index = 0; index <= lines.length; index += 1) {
    output.push(...(insertions.get(index) ?? []));
    if (index < lines.length) output.push(lines[index]);
  }
  return output.join("\n").replace(/^\n+/, "");
}

function resolveProject(projectOption?: string): {
  id: string;
  project: SpecDojoProjectConfig;
} {
  const { config } = loadConfig();
  if (!config) throw new Error("grade commands require .specdojo/specdojo.config.json");
  const id =
    projectOption?.trim() || config.current_project || Object.keys(config.projects)[0] || "";
  const project = config.projects[id];
  if (!project) throw new Error(`Unknown project: ${id}`);
  return { id, project };
}

function loadViewpoints(projectOption?: string): ReviewViewpointsDoc {
  const { project } = resolveProject(projectOption);
  const path = getProjectViewpointsPath(project);
  if (!path) throw new Error("viewpoints_path is required for grade");
  return resolveViewpointsDoc(resolve(specdojoRootDir(), path));
}

export function resolveGradeActor(actor: string, roster: MemberRoster | null): string {
  const normalized = actor.trim();
  if (!normalized) throw new Error("--by must be a non-empty pm-members.yaml nickname");
  if (!roster) throw new Error("members_path is required for grade apply --by");
  assertValidActor(normalized, roster);
  if (roster.members.filter((member) => member.nickname === normalized).length !== 1) {
    throw new Error(`Duplicate actor nickname in members_path: ${normalized}`);
  }
  return normalized;
}

function assertRubric(doc: ReviewViewpointsDoc): GradeRubric {
  const rubric = doc.grade_rubric;
  if (!rubric) throw new Error("Resolved viewpoints do not define grade_rubric");
  return rubric;
}

function repoRelativePath(path: string): string {
  return relative(specdojoRootDir(), path).replace(/\\/g, "/");
}

type KataReference = {
  id: string;
  path: string;
  kind: (typeof KATA_DIRS)[number];
  references: string[];
};

function referenceIds(metadata: Record<string, unknown>): string[] {
  return KATA_REFERENCE_FIELDS.flatMap((field) => {
    const value = metadata[field];
    if (typeof value === "string") return [value];
    if (Array.isArray(value))
      return value.filter((item): item is string => typeof item === "string");
    return [];
  }).filter((id) => id !== "none" && id !== "undecided");
}

function parseKataReference(path: string, kind: KataReference["kind"]): KataReference | null {
  try {
    const extension = extname(path).toLowerCase();
    let metadata: Record<string, unknown>;
    if (extension === ".md") {
      metadata = parseMarkdown(readFileSync(path, "utf8"), repoRelativePath(path)).data
        .specdojo as Record<string, unknown>;
    } else {
      const parsed = yaml.load(readFileSync(path, "utf8"));
      if (!isRecord(parsed)) return null;
      metadata = isRecord(parsed.specdojo) ? parsed.specdojo : parsed;
    }
    const id = typeof metadata.id === "string" ? metadata.id.trim() : "";
    if (!id) return null;
    return { id, path, kind, references: referenceIds(metadata) };
  } catch {
    // Some reusable snippets in Kata directories are Markdown fragments rather than documents.
    return null;
  }
}

function loadKataReferences(): KataReference[] {
  const root = specdojoRootDir();
  return KATA_DIRS.flatMap((kind) =>
    listFilesRecursive(join(root, "docs/ja/specdojo", kind))
      .filter((path) => KATA_REFERENCE_EXTENSIONS.has(extname(path).toLowerCase()))
      .flatMap((path) => {
        const reference = parseKataReference(path, kind);
        return reference ? [reference] : [];
      }),
  );
}

function resolveGradeReferencePathsFromCatalog(path: string, catalog: KataReference[]): string[] {
  const target = resolveSafeMarkdownPath(path);
  const targetDocument = parseMarkdown(readFileSync(target, "utf8"), repoRelativePath(target));
  const targetMetadata = targetDocument.data.specdojo as Record<string, unknown>;
  const targetId = typeof targetMetadata.id === "string" ? targetMetadata.id.trim() : "";
  if (!targetId) return [];

  const byId = new Map(catalog.map((item) => [item.id, item]));
  const selected = new Map<string, KataReference>();
  const add = (item: KataReference | undefined) => {
    if (item && item.path !== target) selected.set(item.id, item);
  };

  for (const id of referenceIds(targetMetadata)) add(byId.get(id));
  for (const item of catalog) if (item.references.includes(targetId)) add(item);

  // A document and the directly linked rulebook/recipe form the anchor of a Kata set.
  // Follow their declared links, but do not recursively traverse sibling back-links.
  for (let depth = 0; depth < 2; depth += 1) {
    for (const item of [...selected.values()]) {
      if (item.kind !== "rulebooks" && item.kind !== "recipes") continue;
      for (const id of item.references) add(byId.get(id));
    }
  }
  return [...selected.values()].map((item) => item.path).sort();
}

export function resolveGradeReferencePaths(path: string): string[] {
  return resolveGradeReferencePathsFromCatalog(path, loadKataReferences());
}

function resolveSafeMarkdownPath(input: string): string {
  const root = specdojoRootDir();
  const absolute = resolve(root, input);
  const rel = repoRelativePath(absolute);
  if (rel.startsWith("../") || isAbsolute(rel))
    throw new Error(`Path is outside repository: ${input}`);
  if (extname(absolute).toLowerCase() !== ".md") {
    throw new Error(`${input}: grade currently writes inline findings only for Markdown`);
  }
  if (!existsSync(absolute)) throw new Error(`Document not found: ${input}`);
  return absolute;
}

function resolveSafeRepositoryPath(input: string, option: string): string {
  const root = specdojoRootDir();
  const absolute = resolve(root, input);
  const rel = relative(root, absolute);
  if (rel.startsWith("../") || isAbsolute(rel)) {
    throw new Error(`${option} must be inside the repository`);
  }
  return absolute;
}

export function discoverGradeTargets(opts: {
  target: GradeTarget;
  project?: string;
  paths?: string[];
  changedOnly?: boolean;
}): string[] {
  const root = specdojoRootDir();
  let candidates: string[];
  if (opts.paths && opts.paths.length > 0) {
    candidates = opts.paths.map(resolveSafeMarkdownPath);
  } else if (opts.target === "kata") {
    candidates = KATA_DIRS.flatMap((dir) =>
      listFilesRecursive(join(root, "docs/ja/specdojo", dir)).filter((path) =>
        path.endsWith(".md"),
      ),
    );
  } else {
    const { project } = resolveProject(opts.project);
    const catalog = getProjectCatalogPath(project);
    if (!catalog) throw new Error("catalog_path is required for deliverable grading");
    const paths = new Set<string>();
    for (const loaded of loadCatalogDocs(resolve(root, catalog))) {
      const resolved: Parameters<typeof collectResolvedDeliverables>[2] = [];
      collectResolvedDeliverables(
        loaded.doc.groups,
        resolveBasePath("", loaded.doc.base_path),
        resolved,
      );
      for (const item of resolved) {
        if (item.item.kind !== "generated" && item.item.path && item.resolvedPath.endsWith(".md")) {
          const path = resolve(root, item.resolvedPath);
          if (existsSync(path)) paths.add(path);
        }
      }
    }
    candidates = [...paths];
  }
  const unique = [...new Set(candidates)].sort();
  if (!opts.changedOnly) return unique;
  return unique.filter((path) => {
    const parsed = parseMarkdown(readFileSync(path, "utf8"), repoRelativePath(path));
    const specdojo = parsed.data.specdojo as Record<string, unknown>;
    const grade = isRecord(specdojo.grade) ? specdojo.grade : {};
    return grade.content_hash !== stableContentHash(parsed);
  });
}

function continuousViewpoints(doc: ReviewViewpointsDoc, target: GradeTarget): ReviewViewpoint[] {
  return (doc.viewpoints ?? []).filter(
    (viewpoint) =>
      viewpoint.continuous === true &&
      viewpoint.evaluation !== "human" &&
      (viewpoint.grade_targets === undefined || viewpoint.grade_targets.includes(target)),
  );
}

function agentViewpoints(doc: ReviewViewpointsDoc, target: GradeTarget): ReviewViewpoint[] {
  return continuousViewpoints(doc, target).filter((viewpoint) => viewpoint.evaluation === "agent");
}

function deterministicResults(
  document: MarkdownDocument,
  definitions: ReviewViewpointsDoc,
  target: GradeTarget,
): GradeViewpointInput[] {
  const results: GradeViewpointInput[] = [];
  for (const viewpoint of continuousViewpoints(definitions, target).filter(
    (item) => item.evaluation === "deterministic",
  )) {
    const findings: GradeFindingInput[] = [];
    const specdojo = document.data.specdojo as Record<string, unknown>;
    if (viewpoint.id === "vp-arc-document-structure") {
      for (const key of ["id", "type", "status"] as const) {
        if (typeof specdojo[key] !== "string" || !String(specdojo[key]).trim()) {
          findings.push({
            severity: "major",
            message: `Frontmatter の specdojo.${key} が未設定です。`,
            line: 1,
          });
        }
      }
      if (!/^#\s+\S/m.test(document.body)) {
        findings.push({ severity: "major", message: "本文に H1 見出しがありません。", line: 1 });
      }
    }
    if (viewpoint.id === "vp-qe-config-validity") {
      const placeholderLine = document.body
        .split("\n")
        .findIndex((line) => /(?:_TODO_|_ASSUMPTION_)/.test(line));
      if (placeholderLine >= 0) {
        findings.push({
          severity: "major",
          message: "未解決の _TODO_ / _ASSUMPTION_ が残っています。",
          line: placeholderLine + 1,
        });
      }
    }
    const cap = levelCapForFindings(findings);
    results.push({ id: viewpoint.id, level: cap, findings });
  }
  return results;
}

export function renderGradePlan(opts: {
  target: GradeTarget;
  path: string;
  references?: string[];
  viewpoints: ReviewViewpointsDoc;
  projectId: string;
}): string {
  const rubric = assertRubric(opts.viewpoints);
  const viewpoints = agentViewpoints(opts.viewpoints, opts.target);
  const absolute = resolveSafeMarkdownPath(opts.path);
  const rel = repoRelativePath(absolute);
  const document = parseMarkdown(readFileSync(absolute, "utf8"), rel);
  const metadata = document.data.specdojo as Record<string, unknown>;
  const documentId = typeof metadata.id === "string" ? metadata.id : rel;
  const priorFindings = previousGradeFindings(document.body);
  const taskHash = createHash("sha256").update(rel).digest("hex").slice(0, 12).toUpperCase();
  const taskId = `GRADE-${opts.target.toUpperCase()}-${taskHash}`;
  const references = (opts.references ?? []).map((reference) =>
    repoRelativePath(resolveSafeRepositoryPath(reference, "reference")),
  );
  const lines = [
    "---",
    yaml
      .dump(
        {
          specdojo: {
            id: `${opts.projectId}:grade-${opts.target}-${taskHash.toLowerCase()}-plan`,
            type: "exec-plan",
            rulebook: "none",
            task_id: taskId,
            name: `grade: ${rel}`,
            mode: "review",
            status: "ready",
            project_id: opts.projectId,
            targets: [documentId],
          },
        },
        { lineWidth: 120, noRefs: true },
      )
      .trimEnd(),
    "---",
    "",
    `# Review Plan: ${taskId} grade: ${rel}`,
    "",
    "最終応答契約（最優先）: 正常終了時の最終応答は、後述する GradeSubmission JSON オブジェクト1個だけとする。この契約は、agent 定義や共通指示にある変更ファイル、検証結果、根拠、未確認範囲などの最終報告指示に優先する。根拠は `findings[].message` に含める。途中経過、タスクリスト、前置き、要約、Markdown コードフェンスを最終応答へ含めない。最初の文字を `{`、最後の文字を `}` とし、JSON を出力したら応答を終了する。",
    "",
    "## 1. このタスクで行うこと",
    "",
    `評価対象 \`${rel}\` を共通 viewpoint と category rubric で 0-4 判定する。deterministic viewpoint は CLI が判定するため、agent の出力には含めない。`,
    "",
    "## 2. 対象項目",
    "",
    `- \`target\`: ${opts.target}`,
    `- \`rubric\`: ${rubric.id}`,
    `- \`document_id\`: ${documentId}`,
    `- \`評価対象\`: \`${rel}\``,
    "",
    "### 参考資料",
    "",
    "参考資料は評価対象ではなく、成果物間整合を判定するための材料である。GradeSubmission の `documents` へ追加しない。",
    "",
    ...(references.length > 0 ? references.map((reference) => `- \`${reference}\``) : ["- なし"]),
    "",
    "## 3. 進め方",
    "",
    "1. 評価対象をファイル読み取りツールで全文読み、実行ログに読み取り操作を残す。plan に対象本文は埋め込まれていないため、この手順を省略しない。",
    "2. 参考資料がある場合は列挙された全ファイルを全文読み、実行ログに各パスの読み取り操作を残す。参考資料を評価対象と混同しない。",
    "3. 評価対象を次の rubric と viewpoint に照らし、各 viewpoint を 0-4 で判定する。ある viewpoint の finding の有無から、ほかの viewpoint の判定を推論しない。",
    "4. level 3 以下には finding を付ける。finding には severity（blocker / major / minor / note）、対象直前の本文行番号、具体的な修正理由を含める。line は Frontmatter を除く本文の1始まり（通常は H1 が1行目）とする。",
    "5. 前回の指摘を対象の現在内容と照合し、解消済みか確認する。未解消なら今回の finding に含める。前回の rule は前回評価時の分類として扱い、各 viewpoint は現在の根拠から独立に評価する。",
    "6. 前回の指摘の確認だけで終了せず、前回の指摘にない問題もすべての viewpoint で独立して検出する。",
    "",
    "### 3.1. 前回の指摘",
    "",
    "対象文書に現在記録されている finding の事実情報を示す。",
    "",
    ...(priorFindings.length > 0
      ? ["```json", JSON.stringify(priorFindings, null, 2), "```"]
      : ["- なし"]),
    "",
    "### 3.2. Rubric",
    "",
    ...rubric.levels.map(
      (level) =>
        `- ${level.level} (${level.name}, review=${level.review_verdict}): ${level.description}`,
    ),
    "",
    "### 3.3. Viewpoints",
    "",
    ...viewpoints.map(
      (viewpoint) =>
        `- ${viewpoint.id} [${viewpoint.category}/${viewpoint.evaluation}]: ${viewpoint.check} Evidence: ${viewpoint.evidence}`,
    ),
    "",
    "## 4. 完了手順",
    "",
    "1. すべての agent viewpoint の判定と、必要な finding が揃っていることを確認する。",
    "2. facts である `path` と `rubric` を変更せず、次のテンプレートを満たす GradeSubmission JSON を作り、判定結果を各 `level` と `findings` へ反映する。判定主体は CLI が `grade apply --by <nickname>` から確定するため、agent は `graded_by` を出力しない。",
    "3. JSON が `rubric`、対象1件、すべての agent viewpoint を含むこと、level 3 以下の各 viewpoint に非空の `message` を持つ finding があることを確認する。",
    "4. 最終応答には確認済みの JSON オブジェクトだけを出力する。コードフェンスや JSON 外の説明を加えない。",
    "",
    "```json",
    JSON.stringify(
      {
        rubric: rubric.id,
        documents: [
          {
            path: rel,
            viewpoints: viewpoints.map((viewpoint) => ({
              id: viewpoint.id,
              level: 4,
              findings: [],
            })),
          },
        ],
      },
      null,
      2,
    ),
    "```",
    "",
    "## 5. 異常終了の条件",
    "",
    "- 評価対象または参考資料を読み取れない場合は、内容を推測せず異常終了する。",
    "- rubric または viewpoint に不足があり、全項目を判定できない場合は異常終了する。",
    "- GradeSubmission JSON の契約を満たせない場合は異常終了する。",
  ];
  return `${lines.join("\n")}\n`;
}

function gradePlanFilename(path: string): string {
  const rel = repoRelativePath(path);
  const stem = basename(path, extname(path))
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const hash = createHash("sha256").update(rel).digest("hex").slice(0, 10);
  return `${stem || "document"}-${hash}-grade-plan.md`;
}

export function writeGradePlans(opts: {
  target: GradeTarget;
  paths: string[];
  viewpoints: ReviewViewpointsDoc;
  projectId: string;
  outputDirectory: string;
}): { path: string; changed: boolean }[] {
  const outputDirectory = resolveSafeRepositoryPath(opts.outputDirectory, "--out");
  if (opts.paths.length === 0) return [];
  mkdirSync(outputDirectory, { recursive: true });
  const kataReferences = loadKataReferences();
  return opts.paths.map((path) => {
    const absolute = resolveSafeMarkdownPath(path);
    const output = join(outputDirectory, gradePlanFilename(absolute));
    const content = renderGradePlan({
      target: opts.target,
      path: absolute,
      references: resolveGradeReferencePathsFromCatalog(absolute, kataReferences),
      viewpoints: opts.viewpoints,
      projectId: opts.projectId,
    });
    const changed = !existsSync(output) || readFileSync(output, "utf8") !== content;
    if (changed) writeFileSync(output, content, "utf8");
    return { path: repoRelativePath(output), changed };
  });
}

export function parseGradeSubmission(raw: string): GradeSubmission {
  let value: unknown;
  try {
    value = JSON.parse(extractJsonText(raw));
  } catch (error) {
    throw new Error(
      `Grade submission must be JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  if (
    !isRecord(value) ||
    typeof value.rubric !== "string" ||
    (value.graded_by !== undefined && typeof value.graded_by !== "string") ||
    !Array.isArray(value.documents)
  ) {
    throw new Error("Grade submission requires rubric and documents[]");
  }
  return value as GradeSubmission;
}

export function validateGradeSubmission(
  submission: GradeSubmission,
  doc: ReviewViewpointsDoc,
  target: GradeTarget,
): GradeValidationIssue[] {
  const issues: GradeValidationIssue[] = [];
  const rubric = assertRubric(doc);
  if (submission.rubric !== rubric.id)
    issues.push({ path: "$", message: `rubric must be ${rubric.id}` });
  const required = agentViewpoints(doc, target);
  const allowed = new Map(required.map((viewpoint) => [viewpoint.id, viewpoint]));
  const paths = new Set<string>();
  for (const [documentIndex, document] of submission.documents.entries()) {
    const where = `documents[${documentIndex}]`;
    if (!document || typeof document.path !== "string" || !Array.isArray(document.viewpoints)) {
      issues.push({ path: where, message: "path and viewpoints[] are required" });
      continue;
    }
    if (paths.has(document.path))
      issues.push({ path: where, message: `duplicate path: ${document.path}` });
    paths.add(document.path);
    const ids = new Set<string>();
    const findingIds = new Set<string>();
    for (const [viewpointIndex, result] of document.viewpoints.entries()) {
      const resultPath = `${where}.viewpoints[${viewpointIndex}]`;
      if (!result || !allowed.has(result.id)) {
        issues.push({
          path: resultPath,
          message: `unknown or non-continuous viewpoint: ${result?.id ?? ""}`,
        });
        continue;
      }
      if (ids.has(result.id))
        issues.push({ path: resultPath, message: `duplicate viewpoint: ${result.id}` });
      ids.add(result.id);
      if (!Number.isInteger(result.level) || result.level < 0 || result.level > 4) {
        issues.push({ path: resultPath, message: "level must be an integer from 0 to 4" });
      }
      const findings = result.findings ?? [];
      if (!Array.isArray(findings)) {
        issues.push({ path: resultPath, message: "findings must be an array" });
        continue;
      }
      if (result.level < 4 && findings.length === 0) {
        issues.push({ path: resultPath, message: "level 0-3 requires at least one finding" });
      }
      for (const [findingIndex, finding] of findings.entries()) {
        if (
          !finding ||
          !Object.hasOwn(SEVERITY_LEVEL_CAP, finding.severity) ||
          typeof finding.message !== "string" ||
          !finding.message.trim()
        ) {
          issues.push({
            path: `${resultPath}.findings[${findingIndex}]`,
            message: "severity and non-empty message are required",
          });
          continue;
        }
        if (finding.id !== undefined) {
          if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(finding.id)) {
            issues.push({
              path: `${resultPath}.findings[${findingIndex}].id`,
              message: "id must contain only letters, digits, dot, underscore, or hyphen",
            });
          } else if (findingIds.has(finding.id)) {
            issues.push({
              path: `${resultPath}.findings[${findingIndex}].id`,
              message: `duplicate finding id: ${finding.id}`,
            });
          }
          findingIds.add(finding.id);
        }
        if (finding.line !== undefined && (!Number.isInteger(finding.line) || finding.line < 1)) {
          issues.push({
            path: `${resultPath}.findings[${findingIndex}].line`,
            message: "line must be a positive integer",
          });
        }
      }
      const cap = levelCapForFindings(findings);
      if (result.level > cap)
        issues.push({ path: resultPath, message: `finding severity caps level at ${cap}` });
    }
    for (const viewpoint of required) {
      if (!ids.has(viewpoint.id)) {
        issues.push({ path: where, message: `missing agent viewpoint: ${viewpoint.id}` });
      }
    }
  }
  return issues;
}

function scoreDocument(
  input: GradeDocumentInput,
  rubric: GradeRubric,
  doc: ReviewViewpointsDoc,
  target: GradeTarget,
) {
  const definitions = new Map((doc.viewpoints ?? []).map((viewpoint) => [viewpoint.id, viewpoint]));
  const categoryLevels = new Map<string, number[]>();
  const counts: Record<GradeSeverity, number> = { blocker: 0, major: 0, minor: 0, note: 0 };
  const viewpointOutput: Record<string, { level: number; score: number }> = {};
  for (const result of input.viewpoints) {
    const definition = definitions.get(result.id)!;
    const values = categoryLevels.get(definition.category) ?? [];
    values.push(result.level);
    categoryLevels.set(definition.category, values);
    viewpointOutput[result.id] = { level: result.level, score: result.level * 25 };
    for (const finding of result.findings ?? []) counts[finding.severity] += 1;
  }
  const categories: Record<string, { score: number }> = {};
  let weighted = 0;
  let totalWeight = 0;
  for (const [category, levels] of categoryLevels) {
    const score = Math.round((levels.reduce((sum, level) => sum + level, 0) / levels.length) * 25);
    categories[category] = { score };
    const weight = rubric.weights[target][category] ?? 0;
    weighted += score * weight;
    totalWeight += weight;
  }
  const score = totalWeight > 0 ? Math.round(weighted / totalWeight) : 0;
  const verdict =
    counts.blocker > 0
      ? "fail"
      : counts.major > 0 || score < rubric.pass_score
        ? "needs-work"
        : "pass";
  return { score, verdict, categories, viewpoints: viewpointOutput, findings: counts };
}

export function applyGradeSubmission(opts: {
  submission: GradeSubmission;
  viewpoints: ReviewViewpointsDoc;
  target: GradeTarget;
  gradedBy: string;
  dryRun?: boolean;
  now?: Date;
}): string[] {
  const issues = validateGradeSubmission(opts.submission, opts.viewpoints, opts.target);
  if (issues.length > 0)
    throw new Error(issues.map((issue) => `${issue.path}: ${issue.message}`).join("\n"));
  const changed: string[] = [];
  for (const input of opts.submission.documents) {
    const absolute = resolveSafeMarkdownPath(input.path);
    const rel = repoRelativePath(absolute);
    const current = readFileSync(absolute, "utf8");
    const next = gradeMarkdownContent({
      content: current,
      path: rel,
      input,
      viewpoints: opts.viewpoints,
      target: opts.target,
      gradedBy: opts.gradedBy,
      now: opts.now,
    });
    if (next !== current) {
      changed.push(rel);
      if (!opts.dryRun) writeFileSync(absolute, next, "utf8");
    }
  }
  return changed;
}

export function gradeMarkdownContent(opts: {
  content: string;
  path: string;
  input: GradeDocumentInput;
  viewpoints: ReviewViewpointsDoc;
  target: GradeTarget;
  gradedBy: string;
  now?: Date;
}): string {
  const document = parseMarkdown(opts.content, opts.path);
  const specdojo = document.data.specdojo as Record<string, unknown>;
  const evaluated = {
    ...opts.input,
    viewpoints: [
      ...opts.input.viewpoints,
      ...deterministicResults(document, opts.viewpoints, opts.target),
    ],
  };
  const rubric = assertRubric(opts.viewpoints);
  const summary = scoreDocument(evaluated, rubric, opts.viewpoints, opts.target);
  const body = insertFindings(document.body, evaluated.viewpoints);
  specdojo.grade = {
    rubric: rubric.id,
    target: opts.target,
    verdict: summary.verdict,
    score: summary.score,
    graded_at: (opts.now ?? new Date()).toISOString(),
    graded_by: opts.gradedBy,
    content_hash: stableContentHash({ data: document.data, body }),
    categories: summary.categories,
    viewpoints: summary.viewpoints,
    findings: summary.findings,
  };
  return serializeMarkdown({ data: document.data, body });
}

export function validateGradedDocument(path: string): string[] {
  const absolute = resolveSafeMarkdownPath(path);
  const rel = repoRelativePath(absolute);
  return validateGradedMarkdown(readFileSync(absolute, "utf8"), rel);
}

export function validateGradedMarkdown(content: string, path: string): string[] {
  const document = parseMarkdown(content, path);
  const specdojo = document.data.specdojo as Record<string, unknown>;
  const grade = isRecord(specdojo.grade) ? specdojo.grade : null;
  if (!grade) return [`${path}: specdojo.grade is missing`];
  const findings = isRecord(grade.findings) ? grade.findings : {};
  const actual: Record<GradeSeverity, number> = { blocker: 0, major: 0, minor: 0, note: 0 };
  for (const match of document.body.matchAll(FINDING_RE)) actual[match[2] as GradeSeverity] += 1;
  const errors: string[] = [];
  for (const severity of Object.keys(actual) as GradeSeverity[]) {
    if (findings[severity] !== actual[severity])
      errors.push(
        `${path}: findings.${severity}=${String(findings[severity])}, comments=${actual[severity]}`,
      );
  }
  if (grade.content_hash !== stableContentHash(document))
    errors.push(`${path}: content changed after the last grade`);
  return errors;
}

function collectPathOption(value: string, previous: string[]): string[] {
  return [...previous, value];
}

function requireTarget(value: string): GradeTarget {
  if (value !== "kata" && value !== "deliverable")
    throw new Error("--target must be kata or deliverable");
  return value;
}

function commandError(error: unknown): void {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}

export function registerGradeCommand(program: Command): void {
  const grade = program
    .command("grade")
    .description("Continuously assess Kata and deliverable content quality");
  const addSelection = (command: Command) =>
    command
      .requiredOption("--target <target>", "kata or deliverable")
      .option("--project <projectId>", "Project id in specdojo.config.json")
      .option(
        "--path <path>",
        "Grade only this Markdown document (repeatable)",
        collectPathOption,
        [],
      )
      .option("--changed-only", "Select documents changed since their latest grade", false);

  addSelection(
    grade.command("plan").description("Write one reusable assessment plan per selected document"),
  )
    .option("--out <directory>", "Write plans below this repository-relative directory")
    .action((options) => {
      try {
        const target = requireTarget(options.target);
        const viewpoints = loadViewpoints(options.project);
        const { id: projectId, project } = resolveProject(options.project);
        const paths = discoverGradeTargets({
          target,
          project: options.project,
          paths: options.path,
          changedOnly: options.changedOnly,
        });
        const outputDirectory =
          options.out ?? join(getProjectExecutionPath(project), "grade", "plans", target);
        const plans = writeGradePlans({
          target,
          paths,
          viewpoints,
          projectId,
          outputDirectory,
        });
        for (const plan of plans)
          process.stdout.write(`${plan.changed ? "written" : "unchanged"}: ${plan.path}\n`);
        process.stdout.write(`Planned: ${plans.length} document(s)\n`);
      } catch (error) {
        commandError(error);
      }
    });

  addSelection(
    grade
      .command("apply")
      .description("Validate agent JSON, calculate scores, and update documents"),
  )
    .requiredOption("--from <path>", "GradeSubmission JSON produced by the assessment agent")
    .requiredOption("--by <nickname>", "Grading agent nickname from pm-members.yaml")
    .option("--dry-run", "Validate and list updates without writing", false)
    .action((options) => {
      try {
        const target = requireTarget(options.target);
        const viewpoints = loadViewpoints(options.project);
        const { project } = resolveProject(options.project);
        const gradedBy = resolveGradeActor(
          options.by,
          loadMemberRoster(specdojoRootDir(), project),
        );
        const submission = parseGradeSubmission(
          readFileSync(resolveSafeRepositoryPath(options.from, "--from"), "utf8"),
        );
        const selected = new Set(
          discoverGradeTargets({
            target,
            project: options.project,
            paths: options.path,
            changedOnly: options.changedOnly,
          }).map(repoRelativePath),
        );
        for (const document of submission.documents)
          if (!selected.has(repoRelativePath(resolve(specdojoRootDir(), document.path))))
            throw new Error(`${document.path}: not selected by the current grade filters`);
        const changed = applyGradeSubmission({
          submission,
          viewpoints,
          target,
          gradedBy,
          dryRun: options.dryRun,
        });
        for (const path of changed)
          process.stdout.write(`${options.dryRun ? "would update" : "updated"}: ${path}\n`);
        process.stdout.write(
          `Graded: ${submission.documents.length}, updated: ${changed.length}\n`,
        );
      } catch (error) {
        commandError(error);
      }
    });

  addSelection(
    grade.command("validate").description("Validate stored grade hashes and finding counts"),
  ).action((options) => {
    try {
      const target = requireTarget(options.target);
      const paths = discoverGradeTargets({
        target,
        project: options.project,
        paths: options.path,
        changedOnly: false,
      });
      const errors = paths.flatMap(validateGradedDocument);
      for (const error of errors) process.stderr.write(`ERROR: ${error}\n`);
      process.stdout.write(`Validated: ${paths.length} document(s), ${errors.length} error(s)\n`);
      if (errors.length > 0) process.exitCode = 1;
    } catch (error) {
      commandError(error);
    }
  });
}
