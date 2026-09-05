---
specdojo:
  id: specdojo:pm-issue-log-sample
  type: project
  status: draft
  rulebook: specdojo:pm-issue-log-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 95
    graded_at: "2026-09-05T19:25:34.522Z"
    graded_by: gemma-expert-executor
    content_hash: 6d487ac27c15d36d960f670a273d9e156cbcc43b2253b39139ac0ea1d50ebccc
    categories:
      consistency: { score: 75 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 100 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 1, minor: 1, note: 0 }
---

# 課題ログ サンプル

## 1. 概要

本書は、駄菓子屋の販売管理システム構築プロジェクトで発生した課題を追跡管理する最小サンプルである。

## 2. 課題ログ一覧

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-omissions-consistency line=11 更新責任者が未記載である（rulebook 6.1 違反）。 -->

| 課題ID | 発生日     | 内容                 | 優先度 | 対応策                   | 担当     | 期限       | ステータス |
| ------ | ---------- | -------------------- | ------ | ------------------------ | -------- | ---------- | ---------- |
| IS-001 | 2026-04-02 | テストデータ不足     | 高     | データ生成スクリプト追加 | QA担当   | 2026-04-08 | 対応中     |
| IS-002 | 2026-04-04 | レシート文言確認待ち | 中     | 文言レビュー会開催       | 業務担当 | 2026-04-11 | 未着手     |

## 3. 優先度と期限

| 課題ID | 優先度 | 期限       | 判定根拠           |
| ------ | ------ | ---------- | ------------------ |
| IS-001 | 高     | 2026-04-08 | テスト遅延影響が大 |
| IS-002 | 中     | 2026-04-11 | 業務確認待ち       |

## 4. 対応計画

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-omissions-consistency line=22 優先度基準および期限設定ルールが未記載である（rulebook 6.3 違反）。 -->

| 課題ID | 対応策                   | 依存事項     | 完了条件           |
| ------ | ------------------------ | ------------ | ------------------ |
| IS-001 | データ生成スクリプト追加 | DB管理者承認 | テスト全件実行可能 |
| IS-002 | 文言レビュー会開催       | PO参加       | 承認済み文言反映   |

## 5. 進捗レビュー

- レビュー周期: 週2回
- 状態更新: 未着手 / 対応中 / 完了
- 期限超過時: PMへ即時エスカレーション

## 6. 関連ドキュメント

- `pm-risk-register`: 潜在リスク管理
- `pm-change-request-log`: 仕様変更管理
