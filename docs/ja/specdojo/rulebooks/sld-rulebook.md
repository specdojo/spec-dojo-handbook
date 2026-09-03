---
specdojo:
  id: specdojo:sld-rulebook
  type: rulebook
  status: draft
  recipe: undecided
  sample: specdojo:sld-sample
  template: undecided
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 51
    graded_at: "2026-09-03T10:09:34.385Z"
    graded_by: gemma-expert-executor
    content_hash: 295723d7517402d1274ed6f739ead2e65e65ee63644f292a132b3b25ce5b84f0
    categories:
      consistency: { score: 50 }
      usability: { score: 50 }
      architecture: { score: 100 }
      quality: { score: 25 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 1, score: 25 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 5, minor: 1, note: 0 }
---

# 保管場所一覧 （Storage Locations List）作成ルール

業務で管理する物理的・論理的な保管場所を一覧で定義します。各保管場所の主な保管対象・目的・関連プロセス・管理頻度などを明記し、在庫や現金などの流れ・管理単位を明確にします。

## 1. メタデータ

| 項目 | 説明                          | 必須 |
| ---- | ----------------------------- | ---- |
| id   | 保管場所一覧ID (sll-xxx-xxxx) | ○    |
| type | `domain` 固定                 | ○    |

| title | 保管場所一覧名 | ○ |
| status | `draft`/`ready`/`deprecated` | ○ |
| supersedes | 置き換え関係（古仕様→新仕様） | 任意 |

### 1.1 ID規約

- 保管場所一覧IDは正規表現 `^sll-[a-z0-9-]+$` に合致する一意IDを用いる。
- `type: data` は業務ドメイン仕様であることを示す。

## 2. 記述ルール

- 保管場所の一覧を **表形式** で整理する。
- 保管場所名は **日本語単数形** を使用する（例：レジ、金庫、売り場棚）。
- 内容を曖昧な記述にせず、簡潔かつ明確に記載する。
- 仕様間（BDD／CDSL／CCD／glossary）で名称の整合性を保つ。

### 2.1 標準列の定義

| 列名 | 説明 |

| ------------------ | ----------------------------------------------------------------- |
| **保管場所** | 場所の論理名（日本語単数形） |
| **主な保管対象** | 主に保管する対象（商品在庫、現金など） |
| **主な内容・目的** | 管理目的や作業内容（名詞句中心で簡潔に） |

<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability サンプルでの名称不一致およびメタデータ定義の矛盾により、成果物の正体と分類が判別しにくい。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-ux-language-consistency ルールブックの「保管場所一覧」とサンプルの「保管場所定義 / 業務データ辞書」の間で名称が統一されていない。 -->

| **関連プロセス** | 関連する業務領域（例：調達、販売、会計）※複数の場合は「、」区切り |
| **管理頻度** | 更新・確認の頻度（例：日次、随時、納品時・補充時） |

※ 列順は **保管場所 → 主な保管対象 → 主な内容・目的 → 関連プロセス → 管理頻度** に統一する。

## 3. サンプル

### 3.1 メタデータ（front-matter YAML）

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency `sld-sample.md` の `type: project` がルールブックの規定（`domain` または `data`）と矛盾している。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability 20行目の「`domain` 固定」という記述と 28行目の 「`type: data`」 という記述が矛盾しており、正しい設定値が判定不能である。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance サンプル `sld-sample.md` のメタデータがルールブックの規定に従っていない。 -->

```yaml
---
id: sll-main
type: data
title: 保管場所一覧(main)
status: draft
supersedes: []
---
```

### 3.2 保管場所一覧（表）

| 保管場所     | 主な保管対象                         | 主な内容・目的                                                   | 関連プロセス | 管理頻度       |
| ------------ | ------------------------------------ | ---------------------------------------------------------------- | ------------ | -------------- |
| バックヤード | 商品在庫（未陳列）、段ボール、予備棚 | 納品された商品を保管し、数量と賞味期限を管理。補充元として機能。 | 調達、販売   | 納品時・補充時 |
| 売り場棚     | 販売中の商品                         | お客様が手に取る商品を配置、価格表示、補充、前出しを行う。       | 販売         | 開店前・営業中 |

<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-omissions-consistency 他成果物との関係性を定義する「位置づけ」節が欠落しており、文書の役割が不明確である。 -->

| レジ | 現金、レジ記録 | 日次の売上金を管理し、入出金記録を保持。 | 会計 | 日次 |
| 金庫 | 日次売上金 | 売上金を安全に保管し、必要に応じて出金。 | 会計 | 日次 |
| 銀行口座 | 事業用銀行口座 | 仕入先や経費の支払い、売上金の入金を管理。 | 会計 | 随時 |

## 4. 本文構成（標準テンプレ）

| 番号 | 見出し       | 必須 |
| ---- | ------------ | ---- |
| 1    | 保管場所一覧 | ○    |

## 5. 記述ガイド

- 保管場所名は業務用語で統一する。
- 管理頻度は判定可能な語彙で記載する。
- 関連プロセスは複数指定時の区切りを統一する。

## 6. 禁止事項

- 物理DB設計や実装コードを記載しない。
- 保管対象未記載で確定しない。
- 略語のみで意味不明な名称を使わない。
