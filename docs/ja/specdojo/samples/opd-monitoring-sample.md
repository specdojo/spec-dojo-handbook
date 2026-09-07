---
specdojo:
  id: specdojo:opd-monitoring-sample
  type: operations
  status: draft
  rulebook: specdojo:opd-rulebook
  based_on: []
  supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 82
    graded_at: "2026-09-05T13:29:57.981Z"
    graded_by: gemma-expert-executor
    content_hash: 505ce7c208e52ef4ef1dbca708e596a4fd4fcf95235d4956f01f0b26519802be
    categories:
      consistency: { score: 63 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 2, minor: 2, note: 0 }
---

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-omissions-consistency line=1 Frontmatter の必須項目 `title` が不足している。 -->

# 運用方針・設計: 監視 サンプル

- 参照: `../rulebooks/opd-rulebook.md`

## 1. 概要（monitoring）

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=7 `opd-rulebook` の「5. 本文構成（標準テンプレ）」で定義されている必須見出し（2, 3, 4, 6, 7, 8, 9, 10, 11）が不足している。 -->
<!-- specdojo:finding id=F004 severity=minor rule=vp-ux-readability line=7 必須構成を省略しているため、`opd-＜term＞` 文書を正しく作成するためのサンプルとして不十分である。 -->

監視・アラートの方針を `opd-index` の差分として定義する（指標・閾値・通知先・初動の具体化）。

## 2. 監視・アラート方針（指標・閾値・通知先・初動）

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance line=12 見出し番号が `opd-rulebook` の定義する順序（## 5. 監視・アラート方針... ## 12. 関連ドキュメント導線...）と不一致である。 -->

| 監視対象 | 指標/閾値             | 通知先 | 初動（誰が何をするか）                       | 備考             |
| -------- | --------------------- | ------ | -------------------------------------------- | ---------------- |
| API      | 5xx率 > 1%（5分）     | #ops   | Ops当番がダッシュボード確認→切り分け開始     | 誤検知は閾値調整 |
| DB       | レプリカ遅延 > 30s    | #ops   | Ops当番が負荷/ジョブ確認→Devへ連絡（P2以上） |                  |
| Batch    | 予定時刻+15分で未完了 | #ops   | Ops当番がジョブ状態確認→再実行可否を判断     | 詳細は opr-batch |

## 3. 関連ドキュメント導線（`opr` 等）

| 種別 | ドキュメントID | 目的                     | 備考   |
| ---- | -------------- | ------------------------ | ------ |
| 手順 | opr-monitoring | アラート対応の手順・証跡 | 必須   |
| 手順 | opr-batch      | バッチ失敗時の再実行手順 | 該当時 |
