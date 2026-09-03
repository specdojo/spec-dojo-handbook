---
specdojo:
  id: specdojo:trc-requirements-to-specs-rulebook
  type: rulebook
  status: draft
  sample: specdojo:trc-requirements-to-specs-sample
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 93
    graded_at: "2026-09-03T13:03:15.710Z"
    graded_by: gemma-expert-executor
    content_hash: 250cd3889e8a16d0c58c9767e42bf7f6c51e2064607c5060d1ebd2ca16548448
    categories:
      consistency: { score: 75 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 100 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 3, score: 75 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 3, note: 0 }
---

# トレーサビリティ（要求→仕様）作成ルール

Requirements Traceability (Requirements to Specs) Rulebook

本ドキュメントは、各成果物の型付きID参照から要求と仕様の対応関係を派生ビューとして表示する場合の形式を定義します。要求漏れ・仕様漏れを防ぎ、変更時の影響追跡とレビュー判断を容易にすることを目的とします。

## 1. 全体方針

- 対象は「要求と仕様の対応関係の可視化」であり、仕様本文そのものの詳細記述は扱わない。
- 対応関係の正本は仕様成果物の `relations.satisfies` とし、本ビューを手編集しない。
- 1 行は 1 つの対応命題（要求IDと対応仕様IDの関係）を原則とし、判定可能な状態で記述する。
- 記載の最小単位は `要求ID` とし、各要求が少なくとも 1 つ以上の仕様へトレースされる状態を維持する。
- 充足状況とギャップは、レビュー時に即時判定できる語彙で統一する。
- 本ビューは必要なプロジェクトで生成する任意の管理ビューとし、独立した成果物ドメインやトラックを持たない。

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-omissions-consistency 成果物間の関係性やプロジェクトフロー上の位置づけを明記する「位置づけ」節が不足しており、作成タイミングや目的の把握が不十分である（prj-overview-rulebook の第 2 章を参照）。 -->

## 2. 位置づけと用語定義（必要に応じて）

| 用語       | 定義                                                            |
| ---------- | --------------------------------------------------------------- |
| 要求ID     | 要求を一意に識別する ID（例: `req-` 系）                        |
| 対応仕様ID | 要求を実現する仕様を一意に識別する ID（例: `bac-` / `bes-` 系） |

| 充足状況 | 要求に対する仕様整備の達成状態（未着手 / 一部充足 / 充足） |
| ギャップ | 要求と仕様の間に残る不足・不整合・未確定事項 |

## 3. ファイル命名・ID規則

- 対象ドキュメント ID は `trc-requirements-to-specs` とする。

<!-- specdojo:finding id=F001 severity=minor rule=vp-arc-cross-document-consistency 対象ドキュメントIDが`＜project-id＞:ID`形式ではなく固定文字列で定義されており、プロジェクト間でのID一意性の担保という命名規則に反している。 -->

- 推奨ファイル名は `trc-requirements-to-specs.md` とする。
- 本 rulebook の ID は `specdojo:trc-requirements-to-specs-rulebook` とする。
- 追加分割が必要な場合は `trc-requirements-to-specs-<term>` 形式を用いる。

## 4. 推奨 Frontmatter 項目

[document-metadata-standard.md](../standards/document-metadata-standard.md) に準拠し、以下を推奨する。

| 項目       | 説明                                          | 必須 |
| ---------- | --------------------------------------------- | ---- |
| id         | `trc-requirements-to-specs`                   | ○    |
| type       | `project`                                     | ○    |
| status     | `draft` / `ready` / `deprecated`              | ○    |
| rulebook   | `specdojo:trc-requirements-to-specs-rulebook` | ○    |
| based_on   | 生成元となる要求・仕様の ID 配列              | 任意 |
| supersedes | 置き換え対象ドキュメント ID 配列              | 任意 |

## 5. 本文構成（標準テンプレ）

| 章  | 見出し               | 必須 | 目的                                         |
| --- | -------------------- | ---- | -------------------------------------------- |
| 1   | 目的と適用範囲       | ○    | トレース対象の境界と運用目的を明確化する     |
| 2   | トレース対象の前提   | ○    | 対象要求群・対象仕様群・除外範囲を明確化する |
| 3   | トレースマトリクス   | ○    | 要求IDと対応仕様IDの対応関係を一覧化する     |
| 4   | 充足状況サマリ       | ○    | 充足状況を集計し、優先対応領域を可視化する   |
| 5   | ギャップと対応方針   | ○    | 不足・不整合の内容と解消方針を整理する       |
| 6   | 変更履歴と更新ルール | 任意 | 追記・更新時の追跡可能性を担保する           |

## 6. 記述ガイド

### 6.1. 目的と適用範囲

- どの要求群とどの仕様群の対応を管理するかを明記する。
- 対象外（例: 廃止要求、移管済み要求）がある場合は理由付きで記載する。

### 6.2. トレース対象の前提

- 要求側と仕様側の参照元（ID体系、版、作成日）を明記する。
- トレース単位（1:1 / 1:N / N:1）を先に定義する。

### 6.3. トレースマトリクス

- 表形式で記載し、最低限次のカラムを含める。

| カラム     | 内容                           |
| ---------- | ------------------------------ |
| 要求ID     | 追跡対象の要求 ID              |
| 要求要約   | 要求内容の要点（1 行）         |
| 対応仕様ID | 対応する仕様 ID（複数可）      |
| 充足状況   | `未着手` / `一部充足` / `充足` |
| ギャップ   | 未対応点・不整合・要確認事項   |
| 備考       | 根拠、判断日、関連チケットなど |

### 6.4. 充足状況サマリ

- 充足状況は件数で集計し、未着手と一部充足を優先管理対象として明示する。
- 重大ギャップ（業務影響が大きい項目）は個別 ID を記載して強調する。

### 6.5. ギャップと対応方針

- ギャップごとに「解消方針」「担当」「期限」「判定条件」を記載する。
- 方針未確定の場合は _UNDECIDED_: ラベルで暫定状態を明示する。

### 6.6. 変更履歴と更新ルール

- 要求や仕様のID参照が更新された場合は、派生ビューを再生成する。
- 充足状況やギャップをビューへ直接入力せず、生成元となる成果物または検証結果へ記録する。

## 7. 禁止事項

- 要求本文・仕様本文の全文転記を行わない。

<!-- specdojo:finding id=F003 severity=minor rule=vp-ux-readability 禁止事項に理由が添えられていないため、著者がルールの意図を理解しにくく、適用判断に迷う可能性がある。理由を添えた表形式への変更を推奨する。 -->

- 要求IDまたは対応仕様IDが空の行を作成しない。
- 充足状況に曖昧語（例: ほぼ対応、だいたい完了）を使用しない。
- ギャップを「なし」としながら対応仕様IDが未記載の状態を許容しない。
- 根拠リンクや判断履歴なしで充足状況を更新しない。
- 生成したトレース表を手編集し、成果物の `relations.satisfies` と異なる関係を持たせない。
