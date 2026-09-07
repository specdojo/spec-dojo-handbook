---
specdojo:
  id: specdojo:imp-data-rulebook
  type: rulebook
  status: draft
  recipe: undecided
  sample: specdojo:imp-data-sample
  template: undecided
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 61
    graded_at: "2026-09-02T19:33:59.486Z"
    graded_by: codex-expert-executor
    content_hash: 68d9b5d43103a78ae9320da3f2302be7614d5443acddfd504d5d414b207ec8da
    categories:
      consistency: { score: 25 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 3, score: 75 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 7, minor: 4, note: 0 }
---

# 影響調査（データ）作成ルール

Impact Analysis (Data) Rulebook

本ドキュメントは、変更要求がデータへ与える影響を整理するための「影響調査（データ）」の記述ルールを定義します。プロジェクト関係者が変更要否・影響度・対応方針・未解決事項を同じ粒度で判断できる状態を目標とします。

## 1. 全体方針

- 対象は「変更要求によるデータ影響の把握と判断」であり、実装設計の詳細化は扱わない。
- 記載粒度は「データ責任者とプロジェクト管理者が合意形成できるレベル」とし、影響の有無だけでなく、判断根拠を簡潔に残す。
- 1 ドキュメントで複数のデータ領域を扱ってよいが、影響詳細はデータ対象単位で分割して管理する。

<!-- specdojo:finding id=F010 severity=minor rule=vp-ux-readability 詳細の委譲先が「インターフェース仕様、テスト仕様、運用設計」という一般名称だけで成果物IDや参照先が示されていないため、対応する成果物またはカタログ上の関係を明記する必要がある。 -->

- インターフェース仕様、テスト仕様、運用設計への波及がある場合は、本書で概要と判断を記載し、詳細は各ドキュメントへ委譲する。

<!-- specdojo:finding id=F004 severity=minor rule=vp-arc-conciseness 「変更要否」「影響度」「対応方針」「未解決事項」の定義は後続の章・カラム説明の言い換えに留まるため、複数解釈を防ぐ固有事項だけに絞るか各記述ガイドへ統合する必要がある。 -->

## 2. 位置づけと用語定義（必要に応じて）

| 用語           | 定義                                                                         |
| -------------- | ---------------------------------------------------------------------------- |
| 変更要求       | プロダクトまたは運用に対する変更の要望。起票済みの要求や課題を含む           |
| 影響対象データ | 変更要求の影響を受けるデータ項目、データモデル、データストア、データ連携項目 |
| 変更要否       | 影響対象に対して変更が必要かどうかの判定                                     |
| 影響度         | 影響の強さ。整合性、可用性、移行難易度、利用者影響を踏まえて評価する         |
| 対応方針       | 影響に対して採用する対処方針（実施、代替、見送りなど）                       |
| 未解決事項     | 判断や実施に必要な情報が不足している課題                                     |

## 3. ファイル命名・ID規則

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency `type: project` の成果物IDを `imp-data` 固定としているが、参照先の命名標準は正規IDを `＜project-id＞:＜local-id＞` と定めているため、`imp-data` は local_id と明記し、Frontmatter の `id` は `＜project-id＞:imp-data` とする必要がある。 -->

- 対象ドキュメント ID は `imp-data` とする。
- 対象ドキュメントの推奨ファイル名は `imp-data.md` とする。
- `id` は [id-and-file-naming-standard.md](../standards/id-and-file-naming-standard.md) の規則に従い、英小文字・数字・ハイフンで構成する。
- 関連する追補文書を分割する場合は `imp-data-<term>` 形式を用いる。

## 4. 推奨 Frontmatter 項目

影響調査（データ）ドキュメントでは、[document-metadata-standard.md](../standards/document-metadata-standard.md) に準拠し、以下を推奨する。

| 項目     | 説明                                | 必須 |
| -------- | ----------------------------------- | ---- |
| id       | ドキュメント ID（例: `imp-data`）   | ○    |
| type     | `project`                           | ○    |
| status   | `draft` / `ready` / `deprecated`    | ○    |
| rulebook | `specdojo:imp-data-rulebook` 固定   | ○    |
| part_of  | 一覧/親ドキュメントへの所属 ID 配列 | 任意 |

<!-- specdojo:finding id=F002 severity=major rule=vp-arc-cross-document-consistency 成果物カタログでは `imp-data` が `imp-business` に依存するが、`based_on` を任意の変更要求・根拠資料としており依存元を要求していないため、`imp-business` を直接の根拠として記録する規則を追加する必要がある。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-qe-omissions-consistency 成果物カタログで必須依存として定義された `imp-business` が Frontmatter の根拠要件から欠落しているため、`based_on` に同成果物を含める条件を明記する必要がある。 -->

| based_on | 変更要求や根拠資料の ID 配列 | 任意 |
| supersedes | 置き換え対象ドキュメント ID 配列 | 任意 |

## 5. 本文構成（標準テンプレ）

影響調査（データ）の本文は、以下の構成を標準とする。

| 章  | 見出し         | 必須 | 目的                                           |
| --- | -------------- | ---- | ---------------------------------------------- |
| 1   | 目的と適用範囲 | ○    | 対象と判断対象範囲を明確化する                 |
| 2   | 変更要求の概要 | ○    | 変更背景と要求内容を要約する                   |
| 3   | 影響分析サマリ | ○    | 影響の全体像と優先順位を俯瞰する               |
| 4   | 影響詳細一覧   | ○    | 影響対象データごとの変更要否・影響度を記録する |
| 5   | 対応方針       | ○    | 採用方針、実施条件、担当と期限を整理する       |
| 6   | 未解決事項     | ○    | 意思決定待ちや調査不足を明示する               |

## 6. 記述ガイド

### 6.1. 目的と適用範囲

- 対象変更要求の識別子、対象データ領域、対象期間を明記する。
- 「何を判断する文書か」を 2〜4 行で示す。

### 6.2. 変更要求の概要

<!-- specdojo:finding id=F008 severity=minor rule=vp-qe-kata-conformance 変更要求の概要に成功条件を要求しているが、参照 sample には背景・要求内容・狙いしかなく成功条件がないため、判定可能な成功条件を sample に追加する必要がある。 -->

- 変更の背景、狙い、成功条件を簡潔に記述する。
- 要求詳細は原文を転記せず、判断に必要な要点のみを要約する。

### 6.3. 影響分析サマリ

<!-- specdojo:finding id=F005 severity=major rule=vp-qe-verifiability 高・中・低の使用を要求しながら各レベルを分ける条件や閾値がなく、作成者ごとに影響度判定が変わるため、整合性・可用性・移行難易度・利用者影響などについて各レベルの判定基準を定義する必要がある。 -->

- 高・中・低の影響度で件数を整理し、優先対応対象を明記する。
- サマリで使用した評価観点（例: データ整合性、データ欠損リスク、移行影響、監査影響）を先に示す。

### 6.4. 影響詳細一覧

<!-- specdojo:finding id=F003 severity=major rule=vp-arc-cross-document-consistency 成果物カタログの完了条件であるデータ構造・整合性への技術的影響、データ検証・移行テストへの影響、データ変更の実装影響が必須カラムまたは必須記述として定義されていないため、対応する確認項目を本文要件へ追加する必要がある。 -->
<!-- specdojo:finding id=F007 severity=major rule=vp-qe-omissions-consistency データ構造・整合性、データ検証・移行テスト、実装影響を確認する必須項目がなく、成果物カタログの done_criteria を満たしたか判定できないため、影響詳細または対応方針の必須項目として追加する必要がある。 -->

- 影響詳細は表形式で記載し、最低限次のカラムを含める。

| カラム         | 内容                                                 |
| -------------- | ---------------------------------------------------- |
| 影響対象データ | 影響を受けるデータ対象（エンティティ、項目、格納先） |
| 変更要否       | `要` / `否`                                          |
| 影響度         | `高` / `中` / `低`                                   |
| 対応方針       | 実施・代替・見送りなどの方針                         |
| 判断根拠       | 判定理由の要点                                       |
| 備考           | 制約、前提、関連ドキュメント                         |

### 6.5. 対応方針

<!-- specdojo:finding id=F011 severity=minor rule=vp-ux-language-consistency 文書内で定義された「影響度」およびサマリの「優先対応」と異なる「重要度」が突然使われ、どの値で並べるか判別できないため、「影響度」または定義した「優先度」に統一する必要がある。 -->

- 重要度が高い項目から順に、実施時期、担当、前提条件を記載する。
- 見送りの場合は、再評価条件と時期を必ず記載する。

### 6.6. 未解決事項

- 各項目に「論点」「不足情報」「決定期限」「担当」を記載する。
- 未解決事項は放置せず、次回レビューでの処理方針を記録する。

## 7. 禁止事項

- 実装詳細（SQL 全文、クラス名、API リクエスト構造）を記載しない。
- 「影響あり」「要対応」のみで根拠を記載しない。

<!-- specdojo:finding id=F009 severity=major rule=vp-qe-kata-conformance 影響度尺度を定義せず高・中・低を使用することを禁止しているが、参照 sample は評価観点を列挙するだけで尺度を定義せず各影響度を使用しているため、sample に判定尺度を追加するかRulebookの適用方法を明確化する必要がある。 -->

- 影響度の尺度を定義せずに高・中・低を混在させない。
- 未解決事項に期限や担当を設定せずに放置しない。
- 他ドキュメントの本文を重複転記し、参照元との不整合を生む記述をしない。
