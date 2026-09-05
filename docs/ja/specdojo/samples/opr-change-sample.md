---
specdojo:
  id: specdojo:opr-change-sample
  type: operations
  status: draft
  rulebook: specdojo:opd-rulebook
  based_on:
    - opd-index
  supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 57
    graded_at: "2026-09-05T15:30:20.775Z"
    graded_by: gemma-expert-executor
    content_hash: aa4d765f820eddd9c2f82135b0bef4a973d6cd2436ea55c4a9fcbca394c357be
    categories:
      consistency: { score: 25 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 38 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 1, major: 4, minor: 0, note: 0 }
---

# 運用手順: 運用変更（設定変更・デプロイ） サンプル

- 参照: `../rulebooks/opr-rulebook.md`

## 1. 運用変更作業（設定変更・デプロイ・ロールバック）

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=6 Frontmatter の `rulebook` 指定が `specdojo:opd-rulebook` となっており、成果物種別と矛盾している。 -->

- 事前:
  - 変更チケット起票（承認者: Ops Lead）
  - 影響評価とロールバック方針を記載
- 実施:
  - 実施ログ（誰が/いつ/何を）を残す
- ロールバック:
  - 異常（P1/P2）発生時は即時戻し、報告

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=51 「実施ログ（誰が/いつ/何を）を残す」という表現のみでは, 証跡として十分な内容であるかを判定できず, 再現性を担保できない。 -->
<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-omissions-consistency line=41 `opr-rulebook` 第5章で定義された必須構成（概要、適用範囲・前提、証跡、関連文書導線等）がほぼすべて欠落しており、文書として不成立である。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=41 `opr-template.md` の構成に従っておらず、サンプルとしてあるべき「rulebook に準拠した具体的な記述例」を提示できていない。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=41 記載内容が極めて不十分であり、初見の読者が OPR の具体的な記述水準や構成を把握し、模倣するためのリファレンスとして機能していない。 -->
