# 業務データ辞書(Business Data Dictionary)作成ルール

## 業務データ辞書

業務データ辞書(Business Data Dictionary)は、システムで扱う業務データの定義を体系的に整理・記述したドキュメントです。以下のルールに従って作成します。

| 項目       | 説明                                       | 必須 |
| ---------- | ------------------------------------------ | ---- |
| id         | データ辞書ID (bdd-xxx-xxxx)                | ○    |
| type       | `domain` 固定                              | ○    |
| title      | データ辞書名                               | ○    |
| status     | `draft`/`ready`/`deprecated`               | ○    |
| version    | バージョン                                 | 任意 |
| owners     | 担当者                                     | 任意 |
| depends_on | 前提となる他データ辞書や概念データストア等 | 任意 |
| implements | 満たすべきビジネスルール                   | 任意 |
| tests      | この仕様を検証するテスト仕様               | 任意 |
| supersedes | 置き換え関係（古仕様→新仕様）              | 任意 |
| entities   | 業務データエンティティの一覧               | ○    |

### entities フィールド構成

| サブ項目       | 説明                       | 必須 |
| -------------- | -------------------------- | ---- |
| logicalName    | 業務上の論理名             | ○    |
| physicalName   | システム上の物理名         | ○    |
| description    | 業務データの説明           | 任意 |
| glossaryTermId | 用語集の用語ID             | 任意 |
| fields         | 業務データフィールドの一覧 | ○    |

### fields フィールド構成

| サブ項目       | 説明                                                                   | 必須 |
| -------------- | ---------------------------------------------------------------------- | ---- |
| logicalName    | 業務上の論理名                                                         | ○    |
| physicalName   | システム上の物理名                                                     | ○    |
| glossaryTermId | 用語集の用語ID                                                         | 任意 |
| type           | データ型 (integer / string / boolean / date / datetime / enum / money) | ○    |
| description    | フィールドの説明                                                       | 任意 |
| unit           | 単位（該当する場合）                                                   | 任意 |
| constraints    | フィールドの制約条件                                                   | 任意 |
| example        | フィールドの例値                                                       | 任意 |

### constraints サブフィールド構成

| サブ項目 | 説明                            | 必須 |
| -------- | ------------------------------- | ---- |
| required | 必須入力かどうか (true / false) | 任意 |
| unique   | 一意性制約 (true / false)       | 任意 |
| minValue | 最小値                          | 任意 |
| maxValue | 最大値                          | 任意 |
| pattern  | 正規表現パターン                | 任意 |

## サンプル

### 業務データ辞書

```yaml
id: bdd-main # 一意なID
type: domain # screen | api | domain | data | test | flow | rule
title: 業務データ辞書
version: 0.1.0
status: draft # draft | ready | deprecated
owners: []
tags: []

# 参照関係（方向と意味を固定）
depends_on: [] # 技術的・定義的な土台（前提）へのリンク
implements: [] # 満たすべきビジネスルールへのリンク
tests: [] # この仕様を検証するテスト仕様
supersedes: [] # 置き換え関係（古仕様→新仕様）

entities:
  - logicalName: 商品
    physicalName: product
    description: 駄菓子屋で販売する個々の商品
    glossaryTermId: tm-product
    fields:
      - logicalName: 商品コード
        physicalName: productCode
        glossaryTermId: tm-product-code
        type: string # integer | string | boolean | date | datetime | enum | money
        description: 各商品を一意に識別するコード
        constraints:
          required: true
          unique: true
        example: 45-14603-32581-2
      - logicalName: 商品名
        physicalName: productName
        type: string # integer | string | boolean | date | datetime | enum | money
        glossaryTermId: tm-product-name
        description: おばあちゃんやお客さんが読める商品名
        constraints:
          required: true
        example: うまか棒 たこ焼き味
      - logicalName: 価格
        physicalName: price
        type: integer # integer | string | boolean | date | datetime | enum | money
        glossaryTermId: tm-price
        description: 商品の販売価格（税抜き）
        unit: 円
        constraints:
          required: true
        example: 100

  - logicalName: 顧客
    physicalName: customer
    glossaryTermId: tm-customer
    description: 駄菓子屋の常連客
    fields:
      - logicalName: 顧客ID
        physicalName: customerId
        type: string # integer | string | boolean | date | datetime | enum | money
        glossaryTermId: tm-customer-id
        description: 顧客を一意に識別するID
        example: CU-0001
      - logicalName: 名前
        physicalName: name
        type: string # integer | string | boolean | date | datetime | enum | money
        glossaryTermId: tm-customer-name
        description: 本名または保護者名
        example: 山田 太郎
      - logicalName: ニックネーム
        physicalName: nickname
        type: string # integer | string | boolean | date | datetime | enum | money
        glossaryTermId: tm-customer-nickname
        description: 子どもたちの呼び名
        example: タロちゃん
      - logicalName: つけ残高
        physicalName: creditBalance
        type: integer # integer | string | boolean | date | datetime | enum | money
        glossaryTermId: tm-credit-balance
        description: 現時点でのつけの残高
        unit: 円
        example: 250
```

### 概念データストア一覧

Conceptual Data Stores List

### 保管場所一覧

Storage Locations List

### ステータス

Product Status
Payment Status
