---
specdojo:
  id: specdojo:pm-change-request-log-sample
  type: project
  status: draft
  rulebook: specdojo:pm-change-request-log-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 93
    graded_at: "2026-09-05T18:45:30.520Z"
    graded_by: gemma-expert-executor
    content_hash: 4329650fb16f9a4a8950d245e6d6e13ae7f762725192218979864cf27faebbd3
    categories:
      consistency: { score: 88 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 88 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 3, score: 75 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 3, note: 0 }
---

# 変更要求ログ サンプル

<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-kata-conformance line=2 テンプレートで定義されている「個票から生成された派生ビュー（再生成可能）」という性質や注記が反映されておらず、手動管理のログ形式となっている。 -->

## 1. 概要

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-omissions-consistency line=5 概要に「運用期間」と「記録単位」の記載が不足している。 -->

本書は、駄菓子屋の販売管理システム構築プロジェクトにおける変更要求の申請・審査・決定・実施追跡を管理する最小サンプルである。

## 2. 変更要求一覧

| 変更ID | 要求内容                         | 申請者     | 申請日     | 状態   |
| ------ | -------------------------------- | ---------- | ---------- | ------ |
| CR-001 | 在庫一覧にカテゴリ絞り込みを追加 | 業務PO     | 2026-04-01 | 審査中 |
| CR-002 | 日次売上CSVの列順を変更          | 店舗責任者 | 2026-04-03 | 承認   |

## 3. 影響評価

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-omissions-consistency line=19 影響評価の一覧に, rulebook で指定されている「品質」への影響項目が不足している。 -->

| 変更ID | 影響範囲  | 工数見積 | 納期影響 | 評価 |
| ------ | --------- | -------- | -------- | ---- |
| CR-001 | 画面・API | 3人日    | なし     | 軽微 |
| CR-002 | 帳票・IF  | 2人日    | 1日延長  | 中   |

## 4. 審査・決定

| 変更ID | 審査結果     | 決定者 | 決定日     | 実施条件         |
| ------ | ------------ | ------ | ---------- | ---------------- |
| CR-001 | 承認         | PM     | 2026-04-04 | UATで操作性確認  |
| CR-002 | 条件付き承認 | PM     | 2026-04-05 | 連携先へ仕様通知 |

## 5. 実施追跡

| 変更ID | 実施担当   | 期限       | 進捗   | 完了条件       |
| ------ | ---------- | ---------- | ------ | -------------- |
| CR-001 | 開発リード | 2026-04-10 | 対応中 | 受入テスト合格 |
| CR-002 | IF担当     | 2026-04-09 | 完了   | 取込確認完了   |

## 6. 関連ドキュメント

- `pm-plan`: 全体管理方針
- `pm-issue-log`: 顕在課題管理
- `pm-risk-register`: 潜在リスク管理
