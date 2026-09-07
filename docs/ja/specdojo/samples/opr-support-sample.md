---
specdojo:
  id: specdojo:opr-support-sample
  type: operations
  status: draft
  rulebook: specdojo:opd-rulebook
  based_on:
    - opd-index
  supersedes: []
  grade:
    rubric: grade-rubric-v1
    reference: specdojo:prj-overview-sample
    target: kata
    verdict: fail
    score: 72
    graded_at: "2026-09-05T17:27:20.297Z"
    graded_by: gemma-expert-executor
    content_hash: c52515548a7748280466c2e951c13c18791c0f53e60af82a55e9548e61577dc4
    categories:
      consistency: { score: 25 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 1, major: 3, minor: 0, note: 0 }
---

# 運用手順: 問い合わせ一次対応 サンプル

- 参照: `../rulebooks/opr-rulebook.md`

## 1. 問い合わせ一次対応手順（テンプレ・ナレッジ）

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=6 Frontmatter の `rulebook` が `specdojo:opd-rulebook` となっており、手順書であるため `specdojo:opr-rulebook` とすべきである。 -->

- 分類:
  - 仕様確認 / 障害疑い / 依頼（権限・設定） / データ修正要否
- 一次対応テンプレ（例）:
  - 受付→再現条件→影響→暫定回避→引継ぎ要否
- 引き継ぎ条件:
  - 障害疑いは `opr-incident` へ（P判定を付与）

<!-- specdojo:finding id=F002 severity=blocker rule=vp-qe-omissions-consistency line=15 `opr-rulebook` 第 5 章で定義されている必須章がほぼすべて欠落しており、かつ省略理由の記載もないため、運用手順書の構成として不成立である。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance line=15 見出し番号が `## 1` となっているが、ルールおよびテンプレートの定義に従い `## 10` とすべきである。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-ux-readability line=15 必須構成を大幅に省略しているため、`opr-＜term＞` 文書を正しく作成するためのサンプルとしての役割（完成形の提示）を果たせておらず、不十分である。 -->
