import { describe, expect, it } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import yaml from "js-yaml";
import { format } from "prettier";
import {
  discoverGradeTargets,
  gradeMarkdownContent,
  matchesGradeTargetFilters,
  parseGradeExecutorAnalysis,
  parseGradeSubmission,
  renderGradePlan,
  renderGradeReporterPlan,
  resolveGradeActor,
  resolveGradeReferenceId,
  resolveGradeReferencePaths,
  selectGradeReferenceExample,
  validateGradeReporterFidelity,
  validateGradeSubmission,
  validateGradedMarkdown,
  writeGradePlans,
  type GradeSubmission,
} from "../../src/grade.js";
import type { ReviewViewpointsDoc } from "../../src/review-types.js";
import type { MemberRoster } from "../../src/specdojo-config.js";

const viewpoints: ReviewViewpointsDoc = {
  id: "specdojo:pm-review-viewpoints",
  type: "standard",
  status: "draft",
  grade_rubric: {
    id: "grade-rubric-v1",
    pass_score: 70,
    levels: [0, 1, 2, 3, 4].map((level) => ({
      level,
      name: `L${level}`,
      description: `level ${level}`,
      review_verdict: level === 4 ? "pass" : level === 3 ? "conditional_pass" : "changes_requested",
    })),
    weights: {
      kata: { architecture: 20, quality: 40, usability: 40 },
      deliverable: { architecture: 20, quality: 40, usability: 40 },
    },
  },
  viewpoints: [
    {
      id: "vp-arc-document-structure",
      role: "ARC",
      category: "architecture",
      title: "structure",
      check: "check structure",
      evidence: "frontmatter and headings",
      default_severity: "major",
      evaluation: "deterministic",
      continuous: true,
    },
    {
      id: "vp-qe-kata-conformance",
      role: "QE",
      category: "quality",
      title: "kata",
      check: "check Kata",
      evidence: "authoring standard",
      default_severity: "major",
      evaluation: "agent",
      continuous: true,
      grade_targets: ["kata"],
    },
    {
      id: "vp-arc-conciseness",
      role: "ARC",
      category: "usability",
      title: "concise",
      check: "check repetition",
      evidence: "paragraphs",
      default_severity: "minor",
      evaluation: "agent",
      continuous: true,
    },
  ],
};

const submission: GradeSubmission = {
  rubric: "grade-rubric-v1",
  graded_by: "test-agent",
  documents: [
    {
      path: "docs/ja/specdojo/rulebooks/example-rulebook.md",
      viewpoints: [
        { id: "vp-qe-kata-conformance", level: 4, findings: [] },
        {
          id: "vp-arc-conciseness",
          level: 3,
          findings: [{ severity: "minor", message: "前置きが重複している。", line: 3 }],
        },
      ],
    },
  ],
};

const markdown = `---
specdojo:
  id: specdojo:example-rulebook
  type: rulebook
  status: draft
---

# Example

本文です。
`;

describe("grade target filters", () => {
  const passSubmission: GradeSubmission = {
    rubric: "grade-rubric-v1",
    documents: [
      {
        path: "docs/ja/specdojo/rulebooks/example-rulebook.md",
        viewpoints: [
          { id: "vp-qe-kata-conformance", level: 4, findings: [] },
          { id: "vp-arc-conciseness", level: 4, findings: [] },
        ],
      },
    ],
  };

  it("discovers artifact templates but excludes internal exec templates from kata", () => {
    const targets = discoverGradeTargets({ target: "kata" });

    expect(targets).toContainEqual(expect.stringContaining("/templates/prj-overview-template.md"));
    expect(targets).not.toContainEqual(expect.stringContaining("/exec-templates/"));
  });

  it("combines verdict, score, finding-count, and changed-only filters", () => {
    const graded = gradeMarkdownContent({
      content: markdown,
      path: passSubmission.documents[0].path,
      input: passSubmission.documents[0],
      viewpoints,
      target: "kata",
      gradedBy: "test-agent",
      now: new Date("2026-08-31T00:00:00.000Z"),
    });

    expect(
      matchesGradeTargetFilters(graded, "example.md", {
        verdict: "pass",
        minScore: 100,
        maxFindings: 0,
      }),
    ).toBe(true);
    expect(
      matchesGradeTargetFilters(graded, "example.md", {
        verdict: "needs-work",
        minScore: 100,
        maxFindings: 0,
      }),
    ).toBe(false);
    expect(
      matchesGradeTargetFilters(graded, "example.md", {
        verdict: "pass",
        minScore: 100,
        maxFindings: 0,
        changedOnly: true,
      }),
    ).toBe(false);
    expect(
      matchesGradeTargetFilters(
        graded.replace("本文です。", "本文を変更しました。"),
        "example.md",
        {
          verdict: "pass",
          minScore: 100,
          maxFindings: 0,
          changedOnly: true,
        },
      ),
    ).toBe(true);

    const lowerScore = gradeMarkdownContent({
      content: markdown,
      path: submission.documents[0].path,
      input: submission.documents[0],
      viewpoints,
      target: "kata",
      gradedBy: "test-agent",
      now: new Date("2026-08-31T00:00:00.000Z"),
    });
    expect(
      matchesGradeTargetFilters(lowerScore, "example.md", {
        verdict: "pass",
        minScore: 96,
        maxFindings: 1,
      }),
    ).toBe(false);
  });

  it("counts all stored finding severities against the maximum", () => {
    const needsWork = structuredClone(passSubmission);
    needsWork.documents[0].viewpoints[0] = {
      id: "vp-qe-kata-conformance",
      level: 2,
      findings: [{ severity: "major", message: "必須事項が欠落している。", line: 1 }],
    };
    const graded = gradeMarkdownContent({
      content: markdown,
      path: needsWork.documents[0].path,
      input: needsWork.documents[0],
      viewpoints,
      target: "kata",
      gradedBy: "test-agent",
      now: new Date("2026-08-31T00:00:00.000Z"),
    });

    expect(
      matchesGradeTargetFilters(graded, "example.md", {
        verdict: "needs-work",
        maxFindings: 1,
      }),
    ).toBe(true);
    expect(matchesGradeTargetFilters(graded, "example.md", { maxFindings: 0 })).toBe(false);
  });

  it("defines ungraded as the absence of specdojo.grade", () => {
    expect(matchesGradeTargetFilters(markdown, "example.md", { ungraded: true })).toBe(true);
    expect(
      matchesGradeTargetFilters(markdown, "example.md", {
        ungraded: true,
        changedOnly: true,
      }),
    ).toBe(true);
    expect(() =>
      matchesGradeTargetFilters(markdown, "example.md", {
        ungraded: true,
        verdict: "pass",
      }),
    ).toThrow("--ungraded cannot be combined");
    expect(() =>
      matchesGradeTargetFilters(markdown, "example.md", {
        ungraded: true,
        minScore: 96,
      }),
    ).toThrow("--ungraded cannot be combined");
  });

  it("rejects invalid score and finding thresholds", () => {
    expect(() => matchesGradeTargetFilters(markdown, "example.md", { minScore: -1 })).toThrow(
      "--min-score must be an integer between 0 and 100",
    );
    expect(() => matchesGradeTargetFilters(markdown, "example.md", { minScore: 101 })).toThrow(
      "--min-score must be an integer between 0 and 100",
    );
    expect(() => matchesGradeTargetFilters(markdown, "example.md", { maxFindings: -1 })).toThrow(
      "--max-findings must be a non-negative integer",
    );
  });
});

describe("grade submission", () => {
  it("parses JSON and enforces severity level caps", () => {
    expect(parseGradeSubmission(JSON.stringify(submission))).toEqual(submission);
    expect(validateGradeSubmission(submission, viewpoints, "kata")).toEqual([]);

    const invalid = structuredClone(submission);
    invalid.documents[0].viewpoints[1].level = 4;
    expect(validateGradeSubmission(invalid, viewpoints, "kata")).toContainEqual({
      path: "documents[0].viewpoints[1]",
      message: "finding severity caps level at 3",
    });
  });

  it("accepts submissions without the legacy agent-supplied graded_by", () => {
    const withoutActor = structuredClone(submission);
    delete withoutActor.graded_by;
    expect(parseGradeSubmission(JSON.stringify(withoutActor))).toEqual(withoutActor);
    expect(validateGradeSubmission(withoutActor, viewpoints, "kata")).toEqual([]);
  });

  it("resolves the grading actor from the member roster", () => {
    const roster: MemberRoster = {
      version: 1,
      project_id: "prj-0001",
      members: [
        {
          nickname: "codex-executor",
          display_name: "Codex Executor",
          email: null,
          roles: [],
          type: "agent",
        },
      ],
    };

    expect(resolveGradeActor(" codex-executor ", roster)).toBe("codex-executor");
    expect(() => resolveGradeActor("/root", roster)).toThrow('Unknown actor: "/root"');
    expect(() => resolveGradeActor("codex-executor", null)).toThrow(
      "members_path is required for grade apply --by",
    );
  });

  it("requires every continuous agent viewpoint and excludes deterministic viewpoints", () => {
    const missing = structuredClone(submission);
    missing.documents[0].viewpoints.pop();
    expect(validateGradeSubmission(missing, viewpoints, "kata")).toContainEqual({
      path: "documents[0]",
      message: "missing agent viewpoint: vp-arc-conciseness",
    });
  });
});

describe("grade markdown update", () => {
  it("writes an idempotent compact grade snapshot that Prettier preserves", async () => {
    const now = new Date("2026-08-29T00:00:00.000Z");
    const first = gradeMarkdownContent({
      content: markdown,
      path: submission.documents[0].path,
      input: submission.documents[0],
      viewpoints,
      target: "kata",
      gradedBy: "codex-executor",
      now,
    });
    const second = gradeMarkdownContent({
      content: first,
      path: submission.documents[0].path,
      input: submission.documents[0],
      viewpoints,
      target: "kata",
      gradedBy: "codex-executor",
      now,
    });

    expect(second).toBe(first);
    expect(first).toContain("verdict: pass");
    expect(first).toContain("score: 90");
    expect(first).toContain("graded_by: codex-executor");
    expect(first).not.toContain("graded_by: test-agent");
    expect(first).toContain("architecture: { score: 100 }");
    expect(first).toContain("vp-qe-kata-conformance: { level: 4, score: 100 }");
    expect(first).toContain("findings: { blocker: 0, major: 0, minor: 1, note: 0 }");
    expect(first.match(/specdojo:finding/g)).toHaveLength(1);
    expect(validateGradedMarkdown(first, submission.documents[0].path)).toEqual([]);
    const formatted = await format(first, { parser: "markdown" });
    expect(formatted).toContain("architecture: { score: 100 }");
    expect(formatted).toContain("vp-qe-kata-conformance: { level: 4, score: 100 }");
    expect(formatted).toContain("findings: { blocker: 0, major: 0, minor: 1, note: 0 }");
    const frontmatterOf = (value: string) => yaml.load(value.match(/^---\n([\s\S]*?)\n---/)![1]);
    expect(frontmatterOf(formatted)).toEqual(frontmatterOf(first));
  });

  it("keeps mappings outside grade in block style", () => {
    const withExternalMetadata = markdown.replace(
      "---\n\n# Example",
      `external:
  nested:
    mapping:
      remains:
        first: one
        second: two
---

# Example`,
    );
    const graded = gradeMarkdownContent({
      content: withExternalMetadata,
      path: submission.documents[0].path,
      input: submission.documents[0],
      viewpoints,
      target: "kata",
      gradedBy: "codex-executor",
      now: new Date("2026-08-29T00:00:00.000Z"),
    });

    expect(graded).toContain(`external:
  nested:
    mapping:
      remains:
        first: one
        second: two`);
    expect(graded).not.toContain("remains: { first: one, second: two }");
  });

  it("detects count drift and edits after grading", () => {
    const graded = gradeMarkdownContent({
      content: markdown,
      path: submission.documents[0].path,
      input: submission.documents[0],
      viewpoints,
      target: "kata",
      gradedBy: "codex-executor",
      now: new Date("2026-08-29T00:00:00.000Z"),
    });
    expect(
      validateGradedMarkdown(graded.replace("severity=minor", "severity=note"), "test.md"),
    ).toEqual(
      expect.arrayContaining([
        expect.stringContaining("findings.minor"),
        expect.stringContaining("findings.note"),
      ]),
    );
    expect(validateGradedMarkdown(`${graded}\n追記`, "test.md")).toContain(
      "test.md: content changed after the last grade",
    );
  });

  it("preserves the severity and level cap across repeated grading", () => {
    const content = markdown.replace(
      "本文です。",
      "<!-- specdojo:finding id=F042 severity=major rule=vp-qe-kata-conformance 必須の禁止事項が欠落している。 -->\n本文です。",
    );
    const input = structuredClone(submission.documents[0]);
    input.viewpoints = [
      { id: "vp-qe-kata-conformance", level: 4, findings: [] },
      {
        id: "vp-arc-conciseness",
        level: 3,
        findings: [{ severity: "minor", message: "必須の禁止事項が欠落している。", line: 1 }],
      },
    ];

    const graded = gradeMarkdownContent({
      content,
      path: input.path,
      input,
      viewpoints,
      target: "kata",
      gradedBy: "codex-executor",
      now: new Date("2026-08-30T00:00:00.000Z"),
    });

    expect(graded).toContain(
      "severity=major rule=vp-arc-conciseness 必須の禁止事項が欠落している。",
    );
    expect(graded).toContain("vp-arc-conciseness: { level: 2, score: 50 }");
    expect(graded).toContain("major: 1");
    expect(graded).toContain("verdict: needs-work");

    const repeatedInput = structuredClone(input);
    repeatedInput.viewpoints[1].level = 4;
    repeatedInput.viewpoints[1].findings![0].severity = "note";
    const repeated = gradeMarkdownContent({
      content: graded,
      path: repeatedInput.path,
      input: repeatedInput,
      viewpoints,
      target: "kata",
      gradedBy: "codex-executor",
      now: new Date("2026-08-30T01:00:00.000Z"),
    });

    expect(repeated).toContain(
      "severity=major rule=vp-arc-conciseness 必須の禁止事項が欠落している。",
    );
    expect(repeated).toContain("vp-arc-conciseness: { level: 2, score: 50 }");
    expect(repeated).toContain("major: 1");
    expect(repeated).toContain("verdict: needs-work");
  });

  it("allows a lower severity for a different residual finding with rationale", () => {
    const content = markdown.replace(
      "本文です。",
      "<!-- specdojo:finding id=F042 severity=major rule=vp-qe-kata-conformance 必須の禁止事項が欠落している。 -->\n本文です。",
    );
    const input = structuredClone(submission.documents[0]);
    input.viewpoints[1].findings = [
      {
        severity: "minor",
        message: "必須の禁止事項は追加済みだが、例示が一部不足しているため軽微な問題だけが残る。",
        line: 1,
      },
    ];

    const graded = gradeMarkdownContent({
      content,
      path: input.path,
      input,
      viewpoints,
      target: "kata",
      gradedBy: "codex-executor",
      now: new Date("2026-08-30T00:00:00.000Z"),
    });

    expect(graded).toContain(
      "severity=minor rule=vp-arc-conciseness 必須の禁止事項は追加済みだが、例示が一部不足しているため軽微な問題だけが残る。",
    );
    expect(graded).toContain("minor: 1");
  });
});

describe("grade plan", () => {
  it("renders an executor plan without a GradeSubmission JSON contract", () => {
    const path = "docs/ja/specdojo/rulebooks/pm-quality-management-plan-rulebook.md";
    const plan = renderGradePlan({
      target: "kata",
      path,
      references: [],
      viewpoints,
      projectId: "prj-0001",
    });
    expect(plan).toContain("type: exec-plan");
    expect(plan).toContain(`- \`評価対象\`: \`${path}\``);
    expect(plan).toContain("## 1. このタスクで行うこと");
    expect(plan).toContain("## 2. 対象項目");
    expect(plan).toContain("## 3. 進め方");
    expect(plan).toContain("## 4. 完了手順");
    expect(plan).toContain("## 5. 異常終了の条件");
    expect(plan).toContain("実行ログに読み取り操作を残す");
    expect(plan).toContain("[VIEWPOINT vp-qe-kata-conformance]");
    expect(plan).toContain("根拠や検討過程を自由形式で詳しく記述してよい");
    expect(plan).toContain("GradeSubmission JSON は作成しない");
    expect(plan).not.toContain('"documents"');
    expect(plan).not.toContain('"graded_by"');
    expect(plan).toContain("vp-qe-kata-conformance");
    expect(plan).toContain("vp-arc-conciseness");
    expect(plan).not.toContain("vp-arc-document-structure [");
    expect(plan).not.toContain("## Document:");
    expect(plan).not.toContain("Frontmatter（CLI の決定的判定対象）");
  });

  it("renders a reporter plan that only structures the executor declaration", () => {
    const path = "docs/ja/specdojo/rulebooks/pm-quality-management-plan-rulebook.md";
    const plan = renderGradeReporterPlan({
      target: "kata",
      path,
      viewpoints,
      projectId: "prj-0001",
    });

    expect(plan).toContain("grade pipeline の reporter stage");
    expect(plan).toContain("評価やファイル読み取りは行わず");
    expect(plan).toContain("追加・省略・変更せず");
    expect(plan).toContain(`"path": "${path}"`);
    expect(plan).toContain('"rubric": "grade-rubric-v1"');
    expect(plan).toContain("message の要約、言い換え、校正を行わない");
  });

  it("parses free-form executor rationale and rejects reporter judgment changes", () => {
    const executorOutput = `前置きの分析も許容する。
[VIEWPOINT vp-qe-kata-conformance]
LEVEL: 2
規約の必須事項と比較した。
FINDING major line=7: 必須の禁止事項が欠落している。
[END VIEWPOINT]
[VIEWPOINT vp-arc-conciseness]
LEVEL: 4
重複は見つからなかった。
[END VIEWPOINT]
`;
    const expectedPath = "docs/ja/specdojo/rulebooks/example-rulebook.md";
    const reporterSubmission: GradeSubmission = {
      rubric: "grade-rubric-v1",
      documents: [
        {
          path: expectedPath,
          viewpoints: [
            {
              id: "vp-qe-kata-conformance",
              level: 2,
              findings: [{ severity: "major", line: 7, message: "必須の禁止事項が欠落している。" }],
            },
            { id: "vp-arc-conciseness", level: 4, findings: [] },
          ],
        },
      ],
    };

    expect(parseGradeExecutorAnalysis(executorOutput).viewpoints).toHaveLength(2);
    expect(
      validateGradeReporterFidelity({
        executorOutput,
        submission: reporterSubmission,
        viewpoints,
        target: "kata",
        expectedPath,
      }),
    ).toEqual([]);
    expect(validateGradeSubmission(reporterSubmission, viewpoints, "kata")).toEqual([]);

    const changed = structuredClone(reporterSubmission);
    changed.documents[0].viewpoints[0].level = 1;
    changed.documents[0].viewpoints[0].findings![0].severity = "blocker";
    expect(
      validateGradeReporterFidelity({
        executorOutput,
        submission: changed,
        viewpoints,
        target: "kata",
        expectedPath,
      }),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.stringContaining("differs from executor level"),
        }),
        expect.objectContaining({
          message: expect.stringContaining("differs from executor count"),
        }),
      ]),
    );
  });

  it("resolves declared and reverse-linked Kata references", () => {
    const references = resolveGradeReferencePaths("docs/ja/specdojo/samples/opr-batch-sample.md");
    expect(references).toEqual(
      expect.arrayContaining([
        expect.stringContaining("/rulebooks/opd-rulebook.md"),
        expect.stringContaining("/rulebooks/opr-rulebook.md"),
        expect.stringContaining("/templates/opr-template.md"),
      ]),
    );
  });

  it("lists reference paths without embedding target or reference contents", () => {
    const path = "docs/ja/specdojo/samples/opr-batch-sample.md";
    const references = resolveGradeReferencePaths(path);
    const plan = renderGradePlan({
      target: "kata",
      path,
      references,
      viewpoints,
      projectId: "prj-0001",
    });
    expect(plan).toContain(`- \`評価対象\`: \`${path}\``);
    expect(plan).toContain("`docs/ja/specdojo/rulebooks/opr-rulebook.md`");
    expect(plan).not.toContain("本文（finding.line");
    expect(plan).not.toContain("# 運用手順: バッチ再実行・失敗対応 サンプル");
    expect(plan).not.toContain("# 運用手順 作成ルール");
    expect(plan.length).toBeLessThan(20_000);
  });

  it("selects a ready reference example from the same Kata kind on each run", () => {
    const path = "docs/ja/specdojo/rulebooks/pm-quality-management-plan-rulebook.md";
    const candidates = [
      path,
      "docs/ja/specdojo/rulebooks/atc-rulebook.md",
      "docs/ja/specdojo/rulebooks/cdfd-overview-rulebook.md",
      "docs/ja/specdojo/rulebooks/cdfd-rulebook.md",
      "docs/ja/specdojo/recipes/cdfd-recipe.md",
    ];
    const first = selectGradeReferenceExample({
      target: "kata",
      path,
      candidates,
      random: () => 0,
    });
    const second = selectGradeReferenceExample({
      target: "kata",
      path,
      candidates,
      random: () => 0.999,
    });

    expect(first).toMatch(/\/rulebooks\/cdfd-overview-rulebook\.md$/);
    expect(second).toMatch(/\/rulebooks\/cdfd-rulebook\.md$/);
    expect(first).not.toBe(second);
  });

  it("records the comparison reference as a document id", () => {
    // パスで保存すると文書を移動したときに参照が壊れる。ID なら移動しても解決できる。
    const id = resolveGradeReferenceId("docs/ja/specdojo/rulebooks/prj-overview-rulebook.md");

    expect(id).toBe("specdojo:prj-overview-rulebook");
  });

  it("keeps an already resolved id as is", () => {
    expect(resolveGradeReferenceId("specdojo:prj-overview-rulebook")).toBe(
      "specdojo:prj-overview-rulebook",
    );
  });

  it("writes the reference id into the grade and omits the key when unused", () => {
    const graded = gradeMarkdownContent({
      content: markdown,
      path: submission.documents[0].path,
      input: submission.documents[0],
      viewpoints,
      target: "kata",
      gradedBy: "gemma-expert-executor",
      reference: "docs/ja/specdojo/rulebooks/prj-overview-rulebook.md",
      now: new Date("2026-08-31T00:00:00.000Z"),
    });
    const without = gradeMarkdownContent({
      content: markdown,
      path: submission.documents[0].path,
      input: submission.documents[0],
      viewpoints,
      target: "kata",
      gradedBy: "gemma-expert-executor",
      now: new Date("2026-08-31T00:00:00.000Z"),
    });

    expect(graded).toContain("reference: specdojo:prj-overview-rulebook");
    expect(without).not.toContain("reference:");
  });

  it("omits the reference section entirely when no example is given", () => {
    // 空の節に「なし」と記すと、候補が存在しないのか指定していないのかを読み手が
    // 区別できない。
    const plan = renderGradePlan({
      target: "kata",
      path: "docs/ja/specdojo/rulebooks/pm-quality-management-plan-rulebook.md",
      references: [],
      viewpoints,
      projectId: "prj-0001",
    });

    expect(plan).not.toContain("### 良い実例（比較リファレンス）");
    expect(plan).not.toContain("該当候補なし");
  });

  it("uses the given reference instead of selecting one", () => {
    const directory = mkdtempSync(join(tmpdir(), "specdojo-grade-plan-"));
    try {
      const override = "docs/ja/specdojo/rulebooks/prj-overview-rulebook.md";
      const plans = writeGradePlans({
        target: "kata",
        paths: ["docs/ja/specdojo/rulebooks/pm-quality-management-plan-rulebook.md"],
        referenceExampleCandidates: ["docs/ja/specdojo/rulebooks/cdfd-rulebook.md"],
        referenceExampleOverride: override,
        viewpoints,
        projectId: "prj-0001",
        outputDirectory: "logs/grade-plan-test",
        random: () => 0,
      });

      expect(plans).toHaveLength(1);
      expect(plans[0].referenceExample).toBe(override);
    } finally {
      rmSync(directory, { recursive: true, force: true });
      rmSync("logs/grade-plan-test", { recursive: true, force: true });
    }
  });

  it("reports no reference when candidates are empty", () => {
    // 候補を渡さない場合はリファレンスなしになる。CLI はこの結果を見て警告する。
    try {
      const plans = writeGradePlans({
        target: "kata",
        paths: ["docs/ja/specdojo/rulebooks/pm-quality-management-plan-rulebook.md"],
        referenceExampleCandidates: [],
        viewpoints,
        projectId: "prj-0001",
        outputDirectory: "logs/grade-plan-empty",
        random: () => 0,
      });

      expect(plans[0].referenceExample).toBeUndefined();
      expect(plans[0].target).toMatch(/pm-quality-management-plan-rulebook\.md$/);
    } finally {
      rmSync("logs/grade-plan-empty", { recursive: true, force: true });
    }
  });

  it("returns nothing when no ready document shares the target kind", () => {
    // 種別が違うと構造も目的も異なり、記載水準の基準として誤りを招く。代用せず
    // リファレンスなしで評価する。
    const path = "docs/ja/specdojo/recipes/cdfd-recipe.md";
    const candidates = [path, "docs/ja/specdojo/rulebooks/cdfd-rulebook.md"];

    const selected = selectGradeReferenceExample({
      target: "kata",
      path,
      candidates,
      random: () => 0,
    });

    expect(selected).toBeUndefined();
  });

  it("records a good example as comparison material without evaluating it", () => {
    const path = "docs/ja/specdojo/rulebooks/pm-quality-management-plan-rulebook.md";
    const referenceExample = "docs/ja/specdojo/rulebooks/cdfd-rulebook.md";
    const plan = renderGradePlan({
      target: "kata",
      path,
      references: [],
      referenceExample,
      viewpoints,
      projectId: "prj-0001",
    });

    expect(plan).toContain("### 良い実例（比較リファレンス）");
    expect(plan).toContain(`- \`${referenceExample}\``);
    expect(plan).toContain("評価対象へ含めず");
    expect(plan).toContain("内容を正解として機械的に模倣しない");
    expect(plan).toContain("参考資料や良い実例を評価対象と混同しない");
    expect(plan).not.toContain("# CDFD 作成ルール");
    expect(plan.length).toBeLessThan(20_000);
  });

  it("carries previous finding facts into the next plan without previous scores", () => {
    const path = "tests/fixtures/grade/previous-findings.md";
    const plan = renderGradePlan({
      target: "kata",
      path,
      references: [],
      viewpoints,
      projectId: "prj-0001",
    });
    const previousSection = plan.match(/### 3\.1\. 前回の指摘\n([\s\S]*?)\n### 3\.2\. Rubric/)?.[1];

    expect(previousSection).toBeDefined();
    expect(previousSection).toContain('"rule": "vp-qe-kata-conformance"');
    expect(previousSection).toContain('"severity": "major"');
    expect(previousSection).toContain('"message": "必須の禁止事項が欠落している。"');
    expect(previousSection).not.toContain("F042");
    expect(previousSection).not.toContain("level");
    expect(previousSection).not.toContain("score");
    expect(previousSection).not.toContain("verdict");
    expect(plan).toContain("未解消なら前回の message を変更せず今回の finding に含め");
    expect(plan).toContain("severity は前回と同等以上を指定する");
    expect(plan).toContain(
      "severity を引き下げる場合は、その根拠を新しい finding の message に含める",
    );
    expect(plan).toContain("各 viewpoint は現在の根拠から独立に評価する");
    expect(plan).toContain("前回の指摘にない問題もすべての viewpoint で独立して検出する");
  });
});
