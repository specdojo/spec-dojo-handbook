---
specdojo:
  id: specdojo:opr-monitoring-sample
  type: operations
  status: draft
  rulebook: specdojo:opd-rulebook
  based_on:
    - opd-monitoring
  supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 70
    graded_at: "2026-09-05T16:49:07.103Z"
    graded_by: gemma-expert-executor
    content_hash: df5fad5f38b80d256171bf02657725d681200149f927873628a63970276db809
    categories:
      consistency: { score: 38 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 63 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 4, minor: 2, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=1 Frontmatter の `rulebook` が `specdojo:opd-rulebook` となっており、成果物種別（operations/OPR）と矛盾している。 -->
<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-omissions-consistency line=1 Frontmatter の必須項目 `title` が不足している。 -->

# 運用手順: 監視・アラート対応 サンプル

- 参照: `../rulebooks/opr-rulebook.md`

## 1. 概要（monitoring）

監視アラートの確認→暫定対応→恒久対応を `opr-index` の具体手順として定義する。

## 2. アラート対応手順（確認→暫定対応→恒久対応）

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-verifiability line=17 完了条件「影響拡大が止まる」などの記述が抽象的であり、判定基準として不十分である。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-omissions-consistency line=12 `opr-rulebook` で定義されている必須章（2, 3, 4, 6, 7, 8, 9, 10, 11, 12）がすべて省略されており、理由の記載もないためルールに違反している。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-qe-kata-conformance line=12 見出し番号が `opr-rulebook` および `opr-template.md` で定義された固定順序に従っておらず、## 2 となっている（正しくは ## 5）。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-ux-readability line=12 必須構成を大幅に省略しており、`opr-＜term＞` 文書を作成するための完成形サンプルとして不十分である。 -->

| 段階     | 手順                             | 完了条件               | 証跡         |
| -------- | -------------------------------- | ---------------------- | ------------ |
| 確認     | アラート種別/影響/発生範囲を確認 | 優先度（P1/P2/P3）確定 | チケット起票 |
| 暫定対応 | 影響遮断（機能停止/スロットル）  | 影響拡大が止まる       | 実施ログ     |
| 恒久対応 | 原因特定→修正計画→反映           | 再発防止策が合意       | 修正チケット |
| 誤検知   | 根拠を記録し閾値/抑止を提案      | 再発防止（閾値調整）   | 設定変更記録 |
