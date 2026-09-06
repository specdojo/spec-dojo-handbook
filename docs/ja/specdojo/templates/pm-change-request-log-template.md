---
specdojo:
  id: specdojo:pm-change-request-log-template
  type: template
  status: ready
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:pm-change-request-log
      type: project
      status: ready
      part_of:
        - _PROJECT_ID_:pjr-index
      rulebook: specdojo:pjr-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 81
    graded_at: "2026-09-06T10:11:53.221Z"
    graded_by: gemma-expert-executor
    content_hash: a06abdc79885db3b244a4a9ea3006fa104fda21399fc1729f639653219acbf2a
    categories:
      consistency: { score: 50 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 3, minor: 0, note: 0 }
---

# 変更要求ログ

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance line=3 文書が「派生ビュー（再生成可能）」であるとの記述は、手動での章構成や記述ガイドを定義するルールブックの規定と矛盾している。 -->

> このファイルは各 `pjr-XXXX-<topic>.md`（個票）から生成された派生ビューです。正本は個票の Frontmatter であり、このファイルは再生成可能です。

<!-- specdojo:view-slot=table -->

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=13 Frontmatter の rulebook 指定が specdojo:pjr-rulebook となっており、専用の pm-change-request-log-rulebook と不整合である。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=13 Frontmatter の rulebook 指定が specdojo:pjr-rulebook となっており、専用の pm-change-request-log-rulebook と不整合である。 -->
