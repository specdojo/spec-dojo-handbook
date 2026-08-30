import { describe, expect, it } from "vitest";
import {
  gradeMarkdownContent,
  parseGradeExecutorAnalysis,
  parseGradeSubmission,
  renderGradePlan,
  renderGradeReporterPlan,
  resolveGradeActor,
  resolveGradeReferencePaths,
  validateGradeReporterFidelity,
  validateGradeSubmission,
  validateGradedMarkdown,
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
  it("writes an idempotent grade snapshot and inline findings", () => {
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
    expect(first.match(/specdojo:finding/g)).toHaveLength(1);
    expect(validateGradedMarkdown(first, submission.documents[0].path)).toEqual([]);
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
    expect(graded).toMatch(/vp-arc-conciseness:\s*\n\s*level: 2/);
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
    expect(repeated).toMatch(/vp-arc-conciseness:\s*\n\s*level: 2/);
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
