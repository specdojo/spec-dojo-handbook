---
specdojo:
  id: specdojo:trc-requirements-to-tests-rulebook
  type: rulebook
  status: draft
  sample: specdojo:trc-requirements-to-tests-sample
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 55
    graded_at: "2026-09-03T13:23:32.129Z"
    graded_by: codex-expert-executor
    content_hash: 5e9e14f22fa8cdfbb2f651684eaa57116bfeeb1587407f5176f4e15eb001f0b0
    categories:
      consistency: { score: 25 }
      usability: { score: 67 }
      architecture: { score: 100 }
      quality: { score: 38 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 2, score: 50 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 12, minor: 3, note: 0 }
---

# トレーサビリティ（要求→テスト）作成ルール

Requirements Traceability (Requirements to Tests) Rulebook

本ドキュメントは、各成果物の型付きID参照から要求とテストの対応関係を派生ビューとして表示する場合の形式を定義します。要求漏れ・テスト漏れを防ぎ、変更時の影響追跡と受入判断を容易にすることを目的とします。

## 1. 全体方針

- 対象は「要求とテストの対応関係の可視化」であり、テスト手順本文の詳細記述は扱わない。
- 対応関係の正本はテスト成果物の `relations.verifies` とし、本ビューを手編集しない。
- 1 行は 1 つの対応命題（要求IDと対応テストIDの関係）を原則とし、判定可能な状態で記述する。
- 記載の最小単位は `要求ID` とし、各要求が少なくとも 1 つ以上のテストへトレースされる状態を維持する。
- 充足状況とギャップは、レビュー時に即時判定できる語彙で統一する。
- 本ビューは必要なプロジェクトで生成する任意の管理ビューとし、独立した成果物ドメインやトラックを持たない。

## 2. 位置づけと用語定義（必要に応じて）

| 用語         | 定義                                                                       |
| ------------ | -------------------------------------------------------------------------- |
| 要求ID       | 要求を一意に識別する ID（例: `req-` 系）                                   |
| 対応テストID | 要求を検証するテストを一意に識別する ID（例: `utc-` / `itc-` / `atc-` 系） |

<!-- specdojo:finding id=F014 severity=major rule=vp-ux-language-consistency `充足状況` を「テスト整備の達成状態」とだけ定義しているため、テストIDが存在する `未着手` や一部のテストだけが ready・成功した場合の意味を一意に解釈できず、対応関係・作成状態・実行結果を区別した用語と状態定義へ改めてください。 -->

| 充足状況 | 要求に対するテスト整備の達成状態（未着手 / 一部充足 / 充足） |
| ギャップ | 要求とテストの間に残る不足・不整合・未確定事項 |

## 3. ファイル命名・ID規則

- 対象ドキュメント ID は `trc-requirements-to-tests` とする。
- 推奨ファイル名は `trc-requirements-to-tests.md` とする。
- 本 rulebook の ID は `specdojo:trc-requirements-to-tests-rulebook` とする。
- 追加分割が必要な場合は `trc-requirements-to-tests-<term>` 形式を用いる。

## 4. 推奨 Frontmatter 項目

[document-metadata-standard.md](../standards/document-metadata-standard.md) に準拠し、以下を推奨する。

| 項目     | 説明                                          | 必須 |
| -------- | --------------------------------------------- | ---- |
| id       | `trc-requirements-to-tests`                   | ○    |
| type     | `project`                                     | ○    |
| status   | `draft` / `ready` / `deprecated`              | ○    |
| rulebook | `specdojo:trc-requirements-to-tests-rulebook` | ○    |

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency 参考 sample の `based_on` は `utc-index` と `itc-index` のみで、本文が参照元とする `req-2026-r1` と `atc-*` を含まず、「生成元となる要求・テスト仕様の ID 配列」という本定義と整合しないため、全直接生成元を列挙する規則と sample を一致させてください。 -->
<!-- specdojo:finding id=F007 severity=major rule=vp-qe-omissions-consistency 要求漏れを検出するための要求母集団とテスト関係を機械的に特定する必要があるのに、生成元を表す `based_on` が任意で代替の探索規則もないため、必須化するか成果物カタログ等からの決定的な入力解決規則を定義してください。 -->

| based_on | 生成元となる要求・テスト仕様の ID 配列 | 任意 |
| supersedes | 置き換え対象ドキュメント ID 配列 | 任意 |

<!-- specdojo:finding id=F011 severity=minor rule=vp-qe-kata-conformance Rulebook 記述標準の必須章名は「本文要件」だが本章は「本文構成（標準テンプレ）」となっているため、規約・目的・必須性を定義する章であることが識別できる標準章名へ合わせてください。 -->

## 5. 本文構成（標準テンプレ）

| 章  | 見出し               | 必須 | 目的                                           |
| --- | -------------------- | ---- | ---------------------------------------------- |
| 1   | 目的と適用範囲       | ○    | トレース対象の境界と運用目的を明確化する       |
| 2   | トレース対象の前提   | ○    | 対象要求群・対象テスト群・除外範囲を明確化する |
| 3   | トレースマトリクス   | ○    | 要求IDと対応テストIDの対応関係を一覧化する     |
| 4   | 充足状況サマリ       | ○    | 充足状況を集計し、優先対応領域を可視化する     |
| 5   | ギャップと対応方針   | ○    | 不足・不整合の内容と解消方針を整理する         |
| 6   | 変更履歴と更新ルール | 任意 | 追記・更新時の追跡可能性を担保する             |

## 6. 記述ガイド

### 6.1. 目的と適用範囲

- どの要求群とどのテスト群の対応を管理するかを明記する。
- 対象外（例: 廃止要求、次フェーズ対応要求）がある場合は理由付きで記載する。

### 6.2. トレース対象の前提

- 要求側とテスト側の参照元（ID体系、版、作成日）を明記する。
- トレース単位（1:1 / 1:N / N:1）を先に定義する。

### 6.3. トレースマトリクス

- 表形式で記載し、最低限次のカラムを含める。

| カラム   | 内容                   |
| -------- | ---------------------- |
| 要求ID   | 追跡対象の要求 ID      |
| 要求要約 | 要求内容の要点（1 行） |

<!-- specdojo:finding id=F008 severity=major rule=vp-qe-omissions-consistency 「1行は1つの要求IDと対応テストIDの関係」とする line 11 に対して対応テストIDを複数可としており、行の粒度が矛盾するため、1関係1行または1要求1行のどちらかに統一してください。 -->
<!-- specdojo:finding id=F015 severity=minor rule=vp-ux-language-consistency `対応テストID` という単数の項目名で複数IDを格納できるため、1件の関係を表す line 11 の用語と読み方が揃わず、行の粒度を統一したうえで単数・複数表記を合わせてください。 -->

| 対応テストID | 対応するテスト ID（複数可） |

<!-- specdojo:finding id=F004 severity=major rule=vp-qe-verifiability `未着手`・`一部充足`・`充足` の判定条件がなく、テスト成果物の存在、status、ケース網羅、実行結果のどれで状態を決めるか判定できないため、各状態の必要十分条件と参照フィールドを定義してください。 -->

| 充足状況 | `未着手` / `一部充足` / `充足` |
| ギャップ | 未対応点・不整合・要確認事項 |
| 備考 | 根拠、判断日、関連チケットなど |

### 6.4. 充足状況サマリ

<!-- specdojo:finding id=F005 severity=major rule=vp-qe-verifiability 1:N と N:1 を許容しながら充足状況の集計単位と分母が未定義で、行数・要求ID数・対応命題数のどれを件数とするかによって結果が変わるため、重複排除規則を含む集計式を定義してください。 -->

- 充足状況は件数で集計し、未着手と一部充足を優先管理対象として明示する。
- 重大ギャップ（受入判定に影響する項目）は個別 ID を記載して強調する。

### 6.5. ギャップと対応方針

<!-- specdojo:finding id=F003 severity=minor rule=vp-arc-cross-document-consistency `担当` の識別形式が未指定で、参考 sample は責務項目に自由記述の役割名を使用している一方、sample 記述標準は責務項目に Role code を要求しているため、Role code を使用する規則を明記してください。 -->

- ギャップごとに「解消方針」「担当」「期限」「判定条件」を記載する。
- 方針未確定の場合は _UNDECIDED_: ラベルで暫定状態を明示する。

### 6.6. 変更履歴と更新ルール

- 要求やテストのID参照が更新された場合は、派生ビューを再生成する。

<!-- specdojo:finding id=F002 severity=major rule=vp-arc-cross-document-consistency 参考 sample の更新規則は充足状況を状態遷移で管理して備考へチケット ID を追記する手編集を前提としており、ビューへ直接入力せず再生成する本規定と矛盾するため、更新主体と手入力可能項目を明示して両文書を一致させてください。 -->
<!-- specdojo:finding id=F009 severity=major rule=vp-qe-omissions-consistency 充足状況とギャップを生成元成果物または検証結果へ記録するとしているが、使用する成果物種別、フィールド、優先順位、競合時の扱いがなく派生不能なため、各出力カラムの生成元と変換規則を定義してください。 -->
<!-- specdojo:finding id=F012 severity=major rule=vp-qe-kata-conformance 非手編集の派生ビューであるにもかかわらず、入力解決、状態・ギャップの導出、再生成の実行方法が rulebook・recipe・template のいずれにも定義されず、参考 sample も完成した適用例になっていないため、rulebook 内に適用契約を定義するか対応 recipe/template を宣言してください。 -->
<!-- specdojo:finding id=F013 severity=major rule=vp-ux-readability 読者には充足状況・ギャップ・対応方針を記載するよう求めながら直接入力を禁止しており、どの元成果物をどの順序で更新してビューを再生成するか分からないため、入力成果物からレビューまでの手順と編集境界を明記してください。 -->

- 充足状況やギャップをビューへ直接入力せず、生成元となる成果物または検証結果へ記録する。

## 7. 禁止事項

- 要求本文・テスト本文の全文転記を行わない。

<!-- specdojo:finding id=F006 severity=major rule=vp-qe-verifiability 対応テストIDが空の行を禁止すると、`relations.verifies` の参照が存在しない未対応要求をマトリクスへ表示できず、テスト漏れを判定できないため、未対応要求を表す行形式とその判定規則を定義してください。 -->
<!-- specdojo:finding id=F010 severity=major rule=vp-qe-omissions-consistency テスト漏れの検出を目的としながら対応テストIDが空の行を全面禁止しており、未対応要求を可視化する要件と矛盾するため、未対応を表す例外形式を追加してください。 -->

- 要求IDまたは対応テストIDが空の行を作成しない。
- 充足状況に曖昧語（例: ほぼ対応、だいたい完了）を使用しない。
- ギャップを「なし」としながら対応テストIDが未記載の状態を許容しない。
- 根拠リンクや判断履歴なしで充足状況を更新しない。
- 生成したトレース表を手編集し、成果物の `relations.verifies` と異なる関係を持たせない。
