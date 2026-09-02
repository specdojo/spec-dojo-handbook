import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, readdirSync, readFileSync, readlinkSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { gitEnvironment, gitResult } from "./exec-worktree.js";

// PJR-3S8Q で agent の書き込み対象外とした、親 runner / hook / CI の実行内容を
// 変えられる設定パス。provider 設定から注入できない固定定義として CLI 側に持つ。
const PROTECTED_DIRECTORY_PREFIXES = [
  ".specdojo/",
  ".github/workflows/",
  ".gitlab/ci/",
  ".circleci/",
  ".azure-pipelines/",
  ".jenkins/",
] as const;

const PROTECTED_EXACT_PATHS = new Set([
  "package.json",
  "lefthook.yml",
  ".lefthook.yml",
  ".gitlab-ci.yml",
  ".gitlab-ci.yaml",
  "azure-pipelines.yml",
  "azure-pipelines.yaml",
  "Jenkinsfile",
]);

const SNAPSHOT_DIRECTORY_ROOTS = [
  ".specdojo",
  ".github/workflows",
  ".gitlab/ci",
  ".circleci",
  ".azure-pipelines",
  ".jenkins",
] as const;

export type AgentProtectedConfigSnapshot = ReadonlyMap<string, string>;

// `.specdojo/doc-index.json` のように、保護対象ディレクトリの下にある gitignore 済みの生成物を
// 除外する。agent は共通規約に従って `index build` などの再生成コマンドを実行するため、生成物まで
// 保護対象に含めると、規約どおりの検証を行っただけで違反として扱われてしまう。
//
// 判定は「追跡されていない」ではなく「ignore されている」で行う。未追跡のファイルをすべて除外すると、
// agent が新しい設定ファイル（例: `.specdojo/claude/settings.<mode>.json`）を作って保護をすり抜け
// られるため、ignore 済みの生成物だけを対象から外す。
//
// git が使えない、または想定外の終了コードで失敗した場合は除外せず、全候補を保護対象のままにする。
function ignoredPaths(repoRoot: string, candidates: readonly string[]): ReadonlySet<string> {
  if (candidates.length === 0) return new Set();
  const result = spawnSync("git", ["check-ignore", "-z", "--stdin"], {
    cwd: repoRoot,
    env: gitEnvironment(),
    input: `${candidates.join("\0")}\0`,
    encoding: "utf8",
  });
  // 0: 1件以上が ignore 対象、1: 該当なし。それ以外は判定不能として除外しない。
  if (result.error || (result.status !== 0 && result.status !== 1)) return new Set();
  return new Set(
    (result.stdout ?? "")
      .split("\0")
      .filter((path) => path !== "")
      .map((path) => normalizeRepoPath(path)),
  );
}

function normalizeRepoPath(path: string): string {
  return path.replaceAll("\\", "/").replace(/^\.\//, "");
}

export function isAgentProtectedConfigPath(path: string): boolean {
  const normalized = normalizeRepoPath(path);
  if (PROTECTED_EXACT_PATHS.has(normalized)) return true;
  if (PROTECTED_DIRECTORY_PREFIXES.some((prefix) => normalized.startsWith(prefix))) return true;
  return /^(?:commitlint\.config\.[^/]+|\.commitlintrc(?:\.[^/]+)?)$/.test(normalized);
}

function fingerprint(path: string): string {
  const stat = lstatSync(path);
  if (stat.isSymbolicLink()) return `link:${readlinkSync(path)}`;
  if (!stat.isFile()) return `other:${stat.mode}:${stat.size}`;
  return `file:${createHash("sha256").update(readFileSync(path)).digest("hex")}`;
}

function addTreeFiles(repoRoot: string, rootPath: string, out: Map<string, string>): void {
  if (!existsSync(rootPath)) return;
  const stat = lstatSync(rootPath);
  if (!stat.isDirectory()) {
    const relPath = normalizeRepoPath(relative(repoRoot, rootPath).split(sep).join("/"));
    if (isAgentProtectedConfigPath(relPath)) out.set(relPath, fingerprint(rootPath));
    return;
  }
  for (const entry of readdirSync(rootPath, { withFileTypes: true })) {
    const entryPath = join(rootPath, entry.name);
    if (entry.isDirectory()) addTreeFiles(repoRoot, entryPath, out);
    else {
      const relPath = normalizeRepoPath(relative(repoRoot, entryPath).split(sep).join("/"));
      if (isAgentProtectedConfigPath(relPath)) out.set(relPath, fingerprint(entryPath));
    }
  }
}

// in-place 実行では人間が先に行った未 commit 変更を妨げないよう、agent 起動直前の
// ファイル内容を保存し、終了後に内容が変わった保護対象だけを agent 由来と判定する。
export function captureAgentProtectedConfigSnapshot(
  repoRoot: string,
): AgentProtectedConfigSnapshot {
  const snapshot = new Map<string, string>();
  for (const entry of readdirSync(repoRoot, { withFileTypes: true })) {
    if (entry.isDirectory()) continue;
    if (!isAgentProtectedConfigPath(entry.name)) continue;
    snapshot.set(entry.name, fingerprint(join(repoRoot, entry.name)));
  }
  for (const relRoot of SNAPSHOT_DIRECTORY_ROOTS) {
    addTreeFiles(repoRoot, join(repoRoot, relRoot), snapshot);
  }
  for (const path of ignoredPaths(repoRoot, [...snapshot.keys()])) {
    snapshot.delete(path);
  }
  return snapshot;
}

export function changedAgentProtectedConfigPaths(
  repoRoot: string,
  before: AgentProtectedConfigSnapshot,
): string[] {
  const after = captureAgentProtectedConfigSnapshot(repoRoot);
  const allPaths = new Set([...before.keys(), ...after.keys()]);
  return [...allPaths]
    .filter((path) => before.get(path) !== after.get(path))
    .sort((a, b) => a.localeCompare(b));
}

// block した変更を人が判断できるよう、対象パスごとの差分を git から取得する。
// diff は差分ありで status 1 を返すため、0 と 1 のみ結果として採用する。
function gitDiffText(repoRoot: string, args: readonly string[]): string {
  const result = gitResult(repoRoot, [...args]);
  if (result.error || (result.status !== 0 && result.status !== 1)) return "";
  return typeof result.stdout === "string" ? result.stdout : "";
}

function untrackedProtectedPaths(repoRoot: string, paths: readonly string[]): ReadonlySet<string> {
  const result = gitResult(repoRoot, ["status", "--porcelain", "-z", "--", ...paths]);
  if (result.error || result.status !== 0) return new Set();
  const stdout = typeof result.stdout === "string" ? result.stdout : "";
  const untracked = new Set<string>();
  for (const entry of stdout.split("\0")) {
    if (!entry.startsWith("?? ")) continue;
    untracked.add(normalizeRepoPath(entry.slice(3)));
  }
  return untracked;
}

// git が差分を出せない場合（未追跡の新規ファイル、agent が commit 済み、repository 未初期化）
// でも、適用者が内容を判断できるよう現在の内容を追加行として組み立てる。
function addedFileDiff(repoRoot: string, path: string, note: string): string {
  const absolutePath = join(repoRoot, path);
  if (!existsSync(absolutePath)) return "";
  let content: string;
  try {
    content = readFileSync(absolutePath, "utf8");
  } catch {
    return "";
  }
  const header = `# ${path}: ${note}\n--- /dev/null\n+++ b/${path}`;
  if (content.includes("\0")) return `${header}\n# binary content omitted`;
  const lines = content.split("\n");
  if (lines.at(-1) === "") lines.pop();
  return [header, ...lines.map((line) => `+${line}`)].join("\n");
}

// 対象パスごとの提案差分を1つのテキストにまとめる。差分を取得できないパスは、
// 取得できなかったことが分かる注記を残し、他パスの差分は落とさない。
export function describeAgentProtectedConfigChanges(
  repoRoot: string,
  paths: readonly string[],
): string {
  if (paths.length === 0) return "";
  const untracked = untrackedProtectedPaths(repoRoot, paths);
  const sections: string[] = [];
  for (const path of paths) {
    const diff = untracked.has(path)
      ? addedFileDiff(repoRoot, path, "新規ファイル（未追跡）の内容")
      : gitDiffText(repoRoot, ["diff", "HEAD", "--unified=3", "--", path]) ||
        gitDiffText(repoRoot, ["diff", "--unified=3", "--", path]) ||
        addedFileDiff(repoRoot, path, "git 差分を取得できなかったため現在の内容を出力");
    sections.push(
      diff.trim() === ""
        ? `# ${path}: 差分を取得できませんでした（削除、またはバイナリ・非 Git 環境の可能性があります）`
        : diff.trimEnd(),
    );
  }
  return sections.join("\n");
}

export function agentProtectedConfigViolation(paths: readonly string[]): string {
  return (
    "agent-config-write: protected configuration changes detected; " +
    `paths=${paths.join(", ")}; ` +
    "agent must record the required change in the result handoff for human or orchestrator application"
  );
}
