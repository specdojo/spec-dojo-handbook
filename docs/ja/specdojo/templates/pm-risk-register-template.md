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
    graded_at: "2026-09-06T12:35:23.847Z"
    graded_by: gemma-expert-executor
    content_hash: 76b3a01726611430c5b13be4e356819045e624a93cf1eab0b96614edfd344e79
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

# リスク登録簿

> このファイルは各 `pjr-XXXX-<topic>.md`（個票）から生成された派生ビューです。正本は個票の Frontmatter であり、このファイルは再生成可能です。

<!-- specdojo:view-slot=table -->

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=13 rulebook に指定されている `specdojo:pjr-rulebook` が本成果物の正本である `specdojo:pm-risk-register-rulebook` と矛盾している。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=45 ルールブックで定義されている必須本文構成（概要〜関連ドキュメント）がすべて欠落しており、整合性が取れていない。 -->
<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-kata-conformance line=43 自動生成ビューの定義となっており、ルールブックで定義されている手動作成前提の本文構成ルールと根本的に矛盾している。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-ux-readability line=45 ルールブックの要求事項（必須章）を満たすための構成や導線がなく、利用者にとって完成させるべき成果物の姿が不明確である。 -->
