---
specdojo:
  id: specdojo:opr-index-sample
  type: operations
  status: draft
  rulebook: specdojo:opd-rulebook
  based_on: []
  supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 84
    graded_at: "2026-09-05T16:20:21.088Z"
    graded_by: gemma-expert-executor
    content_hash: 34ddb990dc9be73c45070fcd670bf8363218dd9ec0957901e864ea3626899473
    categories:
      consistency: { score: 63 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 2, minor: 1, note: 0 }
---

# 運用手順: 全体 サンプル

<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-kata-conformance line=3 参照先のパスおよびファイル名（`opr-rulebook.md`）が、実際のルールブック（`opr-index-rulebook.md`）と一致していない。 -->

- 参照: `../rulebooks/opr-rulebook.md`

## 1. 概要（index）

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-kata-conformance line=6 Frontmatter の `rulebook` 指定が `opd-rulebook` になっており、対象成果物の種別と不整合である。 -->

恒常運用の実行手順を標準化し、担当者差によらず同一品質で運用できる状態を定義する（本書がSSOT）。

## 2. 日次/週次/月次点検手順

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-omissions-consistency line=11 ルールブックで必須とされている本文構成（2, 4-10章）が欠落しており、サンプルとして不完全である。 -->

| 頻度 | 手順                         | 実施者   | 完了条件                           | 証跡               |
| ---- | ---------------------------- | -------- | ---------------------------------- | ------------------ |
| 日次 | 監視ダッシュ確認             | Ops当番  | P1相当の異常がない、または起票済み | 日次チェックシート |
| 週次 | 主要アラートの誤検知レビュー | Ops Lead | 誤検知が棚卸し済み                 | 週次レビュー記録   |
| 月次 | 権限棚卸しの実施確認         | Sec/Ops  | 棚卸し完了                         | 棚卸しレポート     |

## 3. 証跡（ログ、チケット、チェックリスト、実施記録）

| 証跡種別       | 保存先    | 保管期間 | 参照権限 | 最低限残す識別子 |
| -------------- | --------- | -------- | -------- | ---------------- |
| チケット       | Issue管理 | 2年      | Ops/Dev  | ticket_id        |
| 実施ログ       | ログ基盤  | 90日     | Ops      | run_id, job_id   |
| チェックリスト | Docs      | 1年      | Ops      | 実施日, 実施者   |

## 4. 関連ドキュメント導線（`opd` 参照、`mip` / `otp` / `cop` 連携）

| 種別 | ドキュメントID     | 目的                                  | 備考       |
| ---- | ------------------ | ------------------------------------- | ---------- |
| 方針 | opd-index          | 統制・判断基準（SLO/SLA、停止判断等） | 必須       |
| 手順 | opr-incident       | 障害対応手順（優先度別）              | 該当時     |
| 手順 | opr-monitoring     | アラート対応手順                      | 該当時     |
| 手順 | opr-backup-restore | バックアップ確認/復旧演習             | 該当時     |
| 移行 | otp-index          | ハイパーケア連携（参考）              | 必要時のみ |
