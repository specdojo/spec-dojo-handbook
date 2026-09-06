---
specdojo:
  id: specdojo:pm-decision-log-template
  type: template
  status: ready
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:pm-decision-log
      type: project
      status: ready
      part_of:
        - _PROJECT_ID_:pjr-index
      rulebook: specdojo:pjr-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 96
    graded_at: "2026-09-06T10:41:09.639Z"
    graded_by: codex-expert-executor
    content_hash: be713dcc14b74513845a581f862b4b51e138f8cb8d5ee8e94a038b537f3040a4
    categories:
      consistency: { score: 100 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 88 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 4, score: 100 }
      vp-qe-kata-conformance: { level: 3, score: 75 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 1, note: 0 }
---

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-kata-conformance line=1 `specdojo:pjr-rulebook` が `template: not-needed` を宣言する一方、このファイルは `register build` が必須ロードする `type: template` であり、著述標準上の template 要否・所在の正本と実際の適用資産が一致しないため、複数テンプレートを解決できる宣言方式を定めて参照関係を整合させる必要がある。 -->

# 決定記録

> このファイルは各 `pjr-XXXX-<topic>.md`（個票）から生成された派生ビューです。正本は個票の Frontmatter であり、このファイルは再生成可能です。

<!-- specdojo:view-slot=table -->
