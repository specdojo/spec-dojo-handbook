---
specdojo:
  id: specdojo:dmd-index-sample
  type: project
  status: draft
  rulebook: specdojo:dmd-index-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 84
    graded_at: "2026-09-05T02:40:47.468Z"
    graded_by: gemma-expert-executor
    content_hash: 79d25cd9616886cc1277fc89f60a254f2fa895d59b6fe3cda3cf2bf161b39f8f
    categories:
      consistency: { score: 63 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 2, minor: 1, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=1 Frontmatter の id および type が、参照先の rulebook で定義されている必須値と矛盾している。 -->
<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-omissions-consistency line=1 Frontmatter に必須項目である title が欠落している。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance line=1 rulebook で定義された Frontmatter の制約を遵守しておらず、サンプルとしての正しさを欠いている。 -->

# データ移行設計 サンプル

## 1. 概要（index）

本書はデータ移行設計の入口（`dmd-index`）として、共通方針と対象別DMDへの導線を定義する最小サンプルである。

## 2. 共通方針（抽出/変換/除外/冪等性/ログ）

- 抽出方式: 原則フル。増分採用時は基準カラム/キー/基準時刻を必須とする
- 変換/除外: 再実行で同一結果となるように定義し、根拠を記録する
- 冪等性: run_id を識別キーとして管理し、再実行時は別run_idを採番する
- ログ: 抽出/変換/投入/照合レポートに run_id を付与する

## 3. run_id 規約（命名/採番/記録/参照方法）

| 項目     | 方針                             |
| -------- | -------------------------------- |
| 命名     | `DMD-YYYYMMDD-<term>-NN`         |
| 採番     | 当日内でNNを連番                 |
| 記録先   | 移行ログ基盤（例: S3/logs）      |
| 参照方法 | 照合レポート名・投入データに付与 |

## 4. 検証の共通方針（種別/基準/証跡/保管）

- 検証種別: 件数照合 / サンプル照合 / 重要値照合
- 合格基準: 原則 差分0。許容差εを用いる場合は理由を明記する
- 証跡: 照合レポート/検証ログを run_id 単位で保管する

## 5. 対象一覧（スコープ/非対象/担当/対応ドキュメント）

| 区分   | 対象（論理名） | 旧→新                     | 方針（フル/増分） | 担当 | 対応DMD          |
| ------ | -------------- | ------------------------- | ----------------- | ---- | ---------------- |
| データ | 受注           | old.orders → new.orders   | フル              | Mig  | dmd-order-data   |
| データ | 請求           | old.invoice → new.invoice | 増分              | Mig  | dmd-invoice-data |
| 非対象 | 監査ログ       | old.audit_log → -         | -                 | -    | -                |

## 6. 関連ドキュメント（必須）

- `dmd-order-data`: 受注データ移行設計
- `dmd-invoice-data`: 請求データ移行設計
- `mip-index`: 移行計画（成功条件/停止許容時間）
- `mtp-index`: リハーサル計画（検証設計/証跡）
