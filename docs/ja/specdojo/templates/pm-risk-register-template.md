---
specdojo:
  id: specdojo:pm-risk-register-template
  type: template
  status: ready
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:pm-risk-register
      type: project
      status: ready
      part_of:
        - _PROJECT_ID_:pjr-index
      rulebook: specdojo:pjr-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 66
    graded_at: "2026-09-10T16:11:37.544Z"
    graded_by: gemma-expert-executor
    content_hash: 25df723ceabef7e173d0507cb2eb92e2305091bbad663c47dc16cea3df9e213e
    categories:
      consistency: { score: 38 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 1, major: 3, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=1 Frontmatter の rulebook 指定が specdojo:pjr-rulebook となっており、正しくは specdojo:pm-risk-register-rulebook である。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=1 rulebook で定義された必須本文構成（概要〜関連ドキュメント）がすべて欠落している。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-ux-readability line=1 ルールブックに定義されたリスク登録簿としての構造を持たず、実務上のテンプレートとして機能していない。 -->

# リスク登録簿

<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-kata-conformance line=3 ルールブックでは手動作成の文書構成を定義しているが、本テンプレートは自動生成ビューとして定義されており、責務が根本的に矛盾している。 -->

> このファイルは各 `pjr-XXXX-<topic>.md`（個票）から生成された派生ビューです。正本は個票の Frontmatter であり、このファイルは再生成可能です。

<!-- specdojo:view-slot=table -->
