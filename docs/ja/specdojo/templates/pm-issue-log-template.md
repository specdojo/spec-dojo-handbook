---
specdojo:
  id: specdojo:pm-issue-log-template
  type: template
  status: ready
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:pm-issue-log
      type: project
      status: ready
      part_of:
        - _PROJECT_ID_:pjr-index
      rulebook: specdojo:pjr-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 61
    graded_at: "2026-09-06T10:56:48.039Z"
    graded_by: gemma-expert-executor
    content_hash: 9d05cede7ad6b8b300d927fd32502983ea92ada57d96fa62eeb6c80f0e2a5811
    categories:
      consistency: { score: 25 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 2, major: 2, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F002 severity=blocker rule=vp-qe-omissions-consistency line=1 rulebook で定義されている必須章（概要、課題ログ一覧、優先度と期限、対応計画、進捗レビュー、関連ドキュメント）がすべて欠落している。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-ux-readability line=1 テンプレートとして必要な構造的ガイダンスやプレースホルダーが欠落しており、rulebook の要求を満たすための補助となっていない。 -->

# 課題ログ

<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-kata-conformance line=3 rulebook が定義する静的なドキュメント構造を無視し、「個票から生成される派生ビュー」として定義されており、整合性が取れていない。 -->

> このファイルは各 `pjr-XXXX-<topic>.md`（個票）から生成された派生ビューです。正本は個票の Frontmatter であり、このファイルは再生成可能です。

<!-- specdojo:view-slot=table -->

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=13 Frontmatter の rulebook 指定が `specdojo:pm-issue-log-rulebook` ではなく `specdojo:pjr-rulebook` になっている。 -->
