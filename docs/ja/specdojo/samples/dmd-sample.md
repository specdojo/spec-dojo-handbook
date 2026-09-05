---
specdojo:
  id: specdojo:dmd-sample
  type: project
  status: draft
  rulebook: specdojo:dmd-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 89
    graded_at: "2026-09-05T02:58:36.361Z"
    graded_by: gemma-expert-executor
    content_hash: 7d34afe9ccbb8bfecdaf89d33ef39af1078e4ae7da83e6d90ec19eded3fc3b2b
    categories:
      consistency: { score: 88 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 1, minor: 2, note: 0 }
---

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-omissions-consistency line=1 Frontmatter の必須項目である `title` が不足している。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-kata-conformance line=1 Frontmatter の `type` は `migration` 固定とする必要があるが、`project` となっている。 -->

# データ移行設計 サンプル

<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-kata-conformance line=3 見出し中の `＜term＞` (`order-data`) が、ドキュメント ID に使用されている `＜term＞` (`sample`) と一致していない。 -->

## 1. 概要（order-data）

本書は受注データの対象別移行設計（`dmd-<term>`）として、抽出・変換・投入・検証方法を定義する最小サンプルである。

## 2. 対象データ詳細（テーブル/期間/抽出条件/概算件数）

| 対象       | 期間/抽出条件   | 方式（フル/増分） | 増分基準（カラム/キー/基準時刻） | 概算件数  | 備考       |
| ---------- | --------------- | ----------------- | -------------------------------- | --------- | ---------- |
| orders     | 2024-01-01 以降 | フル              | -                                | 2,300,000 | 旧基盤のみ |
| order_item | ordersに紐づく  | フル              | -                                | 8,900,000 |            |

## 3. データマッピング

| 旧データ            | 新データ             | 変換/補足                      |
| ------------------- | -------------------- | ------------------------------ |
| orders.order_id     | orders.id            | 主キー維持（連番維持）         |
| orders.status       | orders.state         | コード変換（参照表に従う）     |
| order_item.order_id | order_items.order_id | orders投入後に投入（参照整合） |

## 4. 変換ルール

- 状態コードは旧→新の変換表に従う
- 日付は UTC に統一する

## 5. 除外ルール

- 取消済みかつ 3 年経過のデータは除外（業務上不要）

## 6. 移行手順（手動/バッチ/ツール）

| 手順 | 内容 | 入力             | 出力                | 実行単位（ジョブ/コマンド） | 備考       |
| ---- | ---- | ---------------- | ------------------- | --------------------------- | ---------- |
| 1    | 抽出 | 旧DB             | 抽出ファイル（CSV） | job: export_orders          | S3に配置   |
| 2    | 変換 | 抽出ファイル     | 変換済みファイル    | job: transform_orders       | 変換表参照 |
| 3    | 投入 | 変換済みファイル | 新DB                | job: load_orders            | run_id付与 |

## 7. 性能/所要時間見積

- 1,000,000 件あたり 45 分（並列度 4）
- 停止許容時間内で完了するように実行順序を固定する

## 8. ログ/再実行性

| 項目         | 方針                                 |
| ------------ | ------------------------------------ |
| 識別キー     | run_id                               |
| ログ保存先   | 移行ログ基盤（例: S3/logs）          |
| 冪等性方式   | run_id隔離（同一run_idは再投入不可） |
| 再実行可否   | 別run_idで再実行可                   |
| データ無効化 | run_id単位で隔離/無効化フラグ        |

## 9. 検証方法（件数照合/サンプル照合/重要値）

| 検証種別     | 検証項目                | 方法            | 合格基準（差分0 / 許容差ε） | 証跡             |
| ------------ | ----------------------- | --------------- | --------------------------- | ---------------- |
| 件数照合     | orders件数              | 旧/新件数比較   | 差分0                       | 照合レポート     |
| サンプル照合 | 重要顧客100件の受注明細 | 旧/新の明細突合 | 差分0                       | 抜取検証ログ     |
| 重要値照合   | 売上合計（期間別）      | 旧/新集計値比較 | 差分0                       | 集計照合レポート |

## 10. 関連ドキュメント（必須）

- `dmd-index`: データ移行設計の入口（共通方針/run_id/検証）
- `mip-index`: 移行計画（対象期間/停止許容時間/成功条件）
- `mtp-index`: 移行リハーサル（検証計画・証跡）
