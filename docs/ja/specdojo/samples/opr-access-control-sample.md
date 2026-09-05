---
specdojo:
  id: specdojo:opr-access-control-sample
  type: operations
  status: draft
  rulebook: specdojo:opd-rulebook
  based_on:
    - opd-access-control
  supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 72
    graded_at: "2026-09-05T14:15:55.311Z"
    graded_by: gemma-expert-executor
    content_hash: 78e26c40c58f9e8d71b6a1e9fad75c8c965b5cadf1537ffc0e7e93718fbe7454
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

<!-- specdojo:finding id=F002 severity=blocker rule=vp-qe-omissions-consistency line=1 `opr-rulebook` で定義されている必須章（概要、適用範囲・前提、定期点検、障害対応、アラート対応、バックアップ・リストア、バッチ再実行、運用変更、問い合わせ一次対応、証跡、関連文書導線）がすべて欠落している。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-ux-readability line=1 必須構成を大幅に省略しているため、`opr-＜term＞` 文書を正しく作成するためのサンプルとして不十分である。 -->

# 運用手順: アカウント付与・剥奪 サンプル

- 参照: `../rulebooks/opr-rulebook.md`

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance line=5 「アカウント付与/剥奪手順」の見出し番号が `## 1` となっているが、ルール規定の順序に従い `## 9` とすべきである。 -->

## 1. アカウント付与/剥奪手順

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=6 Frontmatter の `rulebook` が `specdojo:opd-rulebook` となっており、手順書であるため `specdojo:opr-rulebook` とすべきである。 -->

| 手順 | 内容                 | 実施者      | 完了条件         | 証跡          |
| ---- | -------------------- | ----------- | ---------------- | ------------- |
| 1    | 申請受付（チケット） | Support/Ops | 必要情報が揃う   | ticket_id     |
| 2    | 承認                 | Ops Lead    | 承認コメントあり | 承認ログ      |
| 3    | 付与/剥奪            | Ops         | 権限反映確認     | 実施ログ      |
| 4    | 検証                 | 申請者      | ログイン確認     | スクショ/ログ |
| 5    | 記録                 | Ops         | 台帳更新         | 台帳          |
