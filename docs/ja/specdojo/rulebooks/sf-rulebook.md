---
specdojo:
  id: specdojo:sf-rulebook
  type: rulebook
  status: draft
  recipe: undecided
  sample: specdojo:sf-sample
  template: undecided
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 71
    graded_at: "2026-09-03T09:54:00.148Z"
    graded_by: gemma-expert-executor
    content_hash: 81c55adec41ebc6666d7c5176dd96fa4b7615ce2d356ced26cedb0bc26e5b4cd
    categories:
      consistency: { score: 50 }
      usability: { score: 58 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 3, score: 75 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 2, score: 50 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 5, minor: 1, note: 0 }
---

# システム化機能一覧（System Function List, SFL）作成ルール

業務をシステムで実現するための機能（ユースケースや画面・バッチ単位など）を一覧化し、各機能の目的・入出力・関連プロセスを明確にします。

## 1. メタデータ

| 項目       | 説明                          | 必須 |
| ---------- | ----------------------------- | ---- |
| id         | 機能一覧ID (sf-xxx-xxxx)      | ○    |
| type       | `domain` 固定                 | ○    |
| title      | 機能一覧名                    | ○    |
| status     | `draft`/`ready`/`deprecated`  | ○    |
| supersedes | 置き換え関係（古仕様→新仕様） | 任意 |

### 1.1 ID規約

- 機能一覧IDは正規表現 `^sf-[a-z0-9-]+$` に合致する一意IDを使用する。

- `type: data` は業務ドメイン仕様であることを示す。

ドキュメントID・機能IDともに `sf-` プレフィックスの `lower-kebab` 形式（正規表現: `^sf-[a-z0-9-]+$`）を使用します。
一覧ハブには `sf-index`、個別機能には `sf-<機能名>` を付与してください（例: `sf-product-register`）。

## 2. 記述ルール

- 機能一覧は **表形式** で整理する。1行が1機能を表す。
- 機能名・概要は業務観点で記述し、実装技術や画面遷移手順など実装詳細は含めない。
- 項目の表現は他仕様（BDD／CDSL／CCD／用語集）と整合性を保つ。

### 2.1 標準列の定義（必須順）

| 列名             | 説明                                                                            |
| ---------------- | ------------------------------------------------------------------------------- |
| **機能ID**       | 機能を識別するID（例: sf-product-register。`sf-` プレフィックスの lower-kebab） |
| **機能名**       | 業務担当が理解できる日本語名（簡潔）                                            |
| **概要**         | 機能の目的／要約（何を実現するか）                                              |
| **入出力**       | 主な入力と出力（データ種別や帳票、外部システムとのインターフェース）            |
| **関連プロセス** | 関連する業務領域（例：調達、販売、会計）                                        |
| **関連仕様ID**   | 関連する他仕様の `id`（業務プロセス / 画面 / 帳票 等のファイルID）              |
| **備考**         | 追加説明、依存関係、制約など                                                    |

※ 列順は上記に統一してください。プロジェクト固有の列を追加する場合は、必須列を変えないこと。

## 3. サンプル

### 3.1 メタデータ（front-matter YAML）

```yaml
---
id: sf-index
type: data
title: システム化機能一覧(main)
status: draft

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency メタデータ定義（10行目）の domain 固定という指定と、本行およびサンプルでの data という記述が矛盾している。 -->
supersedes: []

<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability type 値の矛盾および指定サンプルの不整合により、正しくどのような成果物を作成すべきか判断できず、読者を混乱させる。 -->
---

<!-- specdojo:finding id=F006 severity=major rule=vp-ux-language-consistency メタデータの type フィールドにおいて, 定義値 (domain) と解説・サンプル値 (data) が統一されていない。 -->
```

### 3.2 機能一覧（表）

<!-- specdojo:finding id=F002 severity=minor rule=vp-arc-conciseness IDの正規表現定義が 17 行目と重複しているため、統合して簡潔に記述すべきである。 -->

| 機能ID              | 機能名   | 概要                                           | 入出力                                      | 関連プロセス | 関連仕様ID                 | 備考 |
| ------------------- | -------- | ---------------------------------------------- | ------------------------------------------- | ------------ | -------------------------- | ---- |
| sf-product-register | 商品登録 | 新しい商品を登録し、在庫管理テーブルを作成する | 入: 商品マスタ情報 / 出: 商品ID             | 管理、販売   | bps-product, uis-admin     |      |
| sf-closing-daily    | レジ締め | 当日の売上を集計し日次レポートを生成する       | 入: 売上トランザクション / 出: 日次レポート | 会計         | bps-closing, rpt-daily-sum |      |

## 4. 本文構成（標準テンプレ）

| 番号 | 見出し   | 必須 |
| ---- | -------- | ---- |
| 1    | 機能一覧 | ○    |

## 5. 記述ガイド

- 機能IDは `sf-` プレフィックスで一意に管理する。
- 関連仕様IDはID文字列で記載し、リンク可能性を維持する。
- 入出力は業務視点で簡潔に記載する。

## 6. 禁止事項

- 実装クラス名、SQL、内部設計の詳細を記載しない。
- 関連仕様IDを空欄で確定しない。
- 用語不整合のまま登録しない。

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency 指定サンプル sf-sample.md が, 本ルールで定義されている「1行1機能の表形式」に従わず, 個別機能の詳細定義文書となっており矛盾している。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance 指定サンプル sf-sample.md の構成が本ルールの定義（機能一覧表の作成）と完全に乖離しており、適用方法が不明確である。 -->
