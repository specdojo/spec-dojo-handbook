---
specdojo:
  id: specdojo:cnd-mermaid-rulebook
  type: rulebook
  status: draft
  target_format: markdown
  recipe: undecided
  sample: specdojo:cnd-sample
  template: undecided
  based_on:
    - specdojo:rulebook-authoring-standard
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 84
    graded_at: "2026-09-02T02:21:10.655Z"
    graded_by: codex-expert-executor
    content_hash: 9b4cfd6df0801bf5fe5843b7b3fc9e9d9cae66dc69d529c54df7bcde519753fe
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
    findings: { blocker: 0, major: 2, minor: 2, note: 0 }
---

# Mermaid を用いたC4コンテナ図 作成ルール

C4 Container Diagram (CND) Documentation Rules using Mermaid

本ドキュメントは、アーキテクチャ設計のために、**Mermaid の `flowchart` 構文を使って C4 コンテナ図を描く際の標準ルール**です。

C4 コンテナ図は「対象システム」を、**実行/配備単位（コンテナ）** に分割して俯瞰し、利用者（人）・外部システム・データストアとの関係（やり取り）を、概念レベルで合意するために用います。

---

## 1. 全体方針

- Mermaid の **`flowchart` を C4 コンテナ図風に利用**する。
- 対象は「対象システム内の主要コンテナ」と「境界外（人/外部システム）との関係」であり、コンポーネント/クラス等の内部構造は含めない。
- 図は「正確さ（過剰な詳細）」よりも「解釈が割れないこと（合意）」を優先する。
- 1つの図には **対象システムを1つ**だけ置く（複数対象は図を分ける）。

---

## 2. C4要素と Mermaid 記号の対応

C4 の要素を、以下のように Mermaid の記号にマッピングする。

| C4要素                                   | 意味                               | Mermaid での表現例                                                   |
| ---------------------------------------- | ---------------------------------- | -------------------------------------------------------------------- |
| Person（人/ロール）                      | 利用者・関係者                     | `店員["店員"]`                                                       |
| Container（コンテナ）                    | 実行/配備単位（Web/API/バッチ等）  | `Webアプリ("Webアプリ<br>（React）")`                                |
| Database（データベース）                 | 永続データストア                   | `販売DB[("販売DB")]`                                                 |
| External Software System（外部システム） | 連携先システム                     | `会計システム["会計システム"]`                                       |
| System Boundary（境界）                  | 対象システムの範囲                 | `subgraph 境界["対象システム"] ... end`                              |
| Relationship（関係）                     | 利用・連携・参照・データ入出力概念 | `店員 -->\|"売上登録"\| Webアプリ`/`API --> \|"売上データ"\| 販売DB` |

---

<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-omissions-consistency `## 2.1 標準の色分け（推奨）` は H2 の章として非整数番号になっているため、Rulebook 記述標準の連番規則に合わせて H3 の `### 2.1. 標準の色分け（推奨）` とし、配下の 2.1.1、2.1.2 も階層と番号末尾を整合させる必要がある。 -->

## 2.1 標準の色分け（推奨）

C4コンテナ図は色が必須ではありませんが、読み手が「人 / 対象システム内の要素 / 外部システム」を一目で区別できるよう、以下の色分けを推奨します。

- Person（人/ロール）: 暖色系
- 対象システム内（Container / Database）: 寒色系（主役）
- 外部システム（External System）: 無彩色系（脇役）
- 境界（System Boundary）: 破線枠

Mermaid `flowchart` では `classDef` + `class`、境界は `style` を使用します。

### 2.1.1 標準スタイル定義（コピーして利用）

<!-- specdojo:finding id=F002 severity=minor rule=vp-arc-cross-document-consistency 参照サンプル `docs/ja/specdojo/samples/cnd-sample.md` の line 9 および 30 において、本ルールブックへのパスが `cnd-rulebook.md` と誤記されており, 正しくは `cnd-mermaid-rulebook.md` である。 -->

※ 既存の C4 コンテキスト図（CXD）と同じ色指定を利用します。

```mermaid
flowchart LR
  %% --- Standard styles (recommended) ---
  classDef person fill:#fff3bf,stroke:#f08c00,color:#000;
  classDef system fill:#d0ebff,stroke:#1c7ed6,color:#000;
  classDef external fill:#e9ecef,stroke:#495057,color:#000;

  %% System boundary style (subgraph)
  %% NOTE: '境界' は subgraph のID（名前）に合わせる
  style 境界 fill:#ffffff,fill-opacity:0,stroke:#868e96,stroke-width:1px,stroke-dasharray: 5 5;
```

### 2.1.2 適用ルール

- Personノードには `person` クラスを付ける
- 対象システム内の Container / Database には `system` クラスを付ける
- 外部システムノードには `external` クラスを付ける
- 境界は `subgraph 境界[...]` として、`style 境界 ...` で枠線を指定する

---

## 3. ノードのルール

### 3.1 Person（人/ロール）

- **四角 `[]`** を使用する。
- 表示ラベルは業務ロール/主体を短い日本語で表す。

例:

```mermaid
flowchart LR
  店員["👤店員"]
  店主["👤店主"]

  classDef person fill:#fff3bf,stroke:#f08c00,color:#000;
  class 店員,店主 person;
```

### 3.2 Container（コンテナ）

- **角丸長方形 `()`** を使用する。
- 表示ラベルは「コンテナ名（＋必要なら技術/役割の短い補足）」とする。
- 改行は `<br>` を使用してよい（長文化防止）。

例:

```mermaid
flowchart LR
  Webアプリ("Webアプリ<br>（レジ/管理画面）")
  API("API<br>（販売/在庫）")

  classDef system fill:#d0ebff,stroke:#1c7ed6,color:#000;
  class Webアプリ,API system;
```

### 3.3 Database（データベース）

- **円柱ノード `[(...)]`** を使用する。
- DBの論理名を短く書く（例: `販売DB`, `在庫DB`）。

例:

```mermaid
flowchart LR
  販売DB[("販売DB")]

  classDef system fill:#d0ebff,stroke:#1c7ed6,color:#000;
  class 販売DB system;
```

### 3.4 External Software System（外部システム）

- **四角 `[]`** を使用する。
- 表示ラベルは外部システムの一般名（例: 会計、決済、EC、配送など）。

例:

```mermaid
flowchart LR
  会計システム["会計システム"]
  決済サービス["決済サービス"]

  classDef external fill:#e9ecef,stroke:#495057,color:#000;
  class 会計システム,決済サービス external;
```

### 3.5 System Boundary（境界）

- 対象システムは **サブグラフ `subgraph ... end`** で囲う。
- 境界内には、対象システムの **主要コンテナ**（2〜7個程度を目安）と、必要なら主要DBを置く。
- 境界内の要素を増やしすぎない（詳細化はコンポーネント図へ）。

例:

```mermaid
flowchart LR
  subgraph 境界["対象システム"]
    Webアプリ("Webアプリ")
    API("API")
    販売DB[("販売DB")]
  end

  classDef system fill:#d0ebff,stroke:#1c7ed6,color:#000;
  class Webアプリ,API,販売DB system;
  style 境界 fill:#ffffff,fill-opacity:0,stroke:#868e96,stroke-width:1px,stroke-dasharray: 5 5;
```

---

## 4. エッジ（関係）のルール

### 4.1 方向

- `A --> B` を基本とする。
- 方向は「主たる依存/利用/送信の向き」が分かるように統一する。
  - 例: 人がシステムを利用する: `人 -->|"利用"| 対象システム内のコンテナ`
  - 例: コンテナ間の呼び出し: `Webアプリ -->|"API呼び出し"| API`
  - 例: DBへの入出力: `API -->|"売上データ"| 販売DB`

### 4.2 ラベル

- すべてのエッジにラベルを付ける（「何の関係か」を合意するため）。
- ラベルは **短い名詞句**または **短い動詞句**で書く。
  - 例: `売上登録` / `在庫照会` / `会計仕訳連携` / `決済結果を受信`
- 長い場合は `<br>` で改行してよい。

---

## 5. 命名・表記ルール

- ノードIDは日本語でもよいが、記号や空白は避け、短い識別子にする（例: `Webアプリ`, `API`, `販売DB`, `会計システム`, `店員`）。
- 表示ラベルは `"..."` で囲ってよい（混乱を避けるため、必要に応じて統一）。
- 同じ主体/システム/コンテナ/DBは、図の中で名称を揺らさない。

---

## 6. 禁止事項

| 項目                                                  | 理由                            |
| ----------------------------------------------------- | ------------------------------- |
| 物理テーブル名・物理カラム名・SQL全文                 | コンテナ図の粒度を超える        |
| APIエンドポイント/HTTPメソッド/リクエストJSON等の詳細 | IF仕様に記述する                |
| 実装クラス/関数名、内部モジュールの列挙               | 変更に弱い                      |
| 画面遷移やクリック手順の逐語列挙                      | UI変更に弱い・図の目的から逸脱  |
| コンポーネント/クラス等の内部構造の詳細               | コンポーネント図/実装設計で表す |
| 矢印ラベルなしの関係                                  | 合意が取れない                  |

---

## 7. サンプル（最小）

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency `sample: specdojo:cnd-sample` で宣言された参照サンプルには Mermaid の C4 コンテナ図がなく、概要表だけでは本ルールブックのノード、境界、関係、スタイル規則を適用した完成例として整合性を確認できない。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance 対応 sample の `docs/ja/specdojo/samples/cnd-sample.md` は完成した Mermaid 図を提示していないため、Sample 記述標準が求める「rulebook の必須要素を満たす最小完成例」として、ノード、境界、ラベル付き関係、スタイルを適用した図へ置き換える必要がある。 -->

```mermaid
flowchart LR
  %% Person
  店員["👤店員"]

  %% External Systems
  会計システム["会計システム"]
  決済サービス["決済サービス"]

  %% Target System Boundary
  subgraph 境界["対象システム"]
    Webアプリ("Webアプリ<br>（レジ/管理画面）")
    API("API<br>（販売/在庫）")
    販売DB[("販売DB")]
  end

  %% Relationships
  店員 -->|"売上登録"| Webアプリ
  Webアプリ -->|"API呼び出し"| API
  API -->|"売上データ"| 販売DB

  API -->|"会計仕訳連携"| 会計システム
  API -->|"決済依頼"| 決済サービス
  決済サービス -->|"決済結果"| API

  %% Styles
  classDef person fill:#fff3bf,stroke:#f08c00,color:#000;
  classDef system fill:#d0ebff,stroke:#1c7ed6,color:#000;
  classDef external fill:#e9ecef,stroke:#495057,color:#000;
  class 店員 person;
  class Webアプリ,API,販売DB system;
  class 会計システム,決済サービス external;
  style 境界 fill:#ffffff,fill-opacity:0,stroke:#868e96,stroke-width:1px,stroke-dasharray: 5 5;
```

---

## 8. 凡例（推奨）

凡例は下記のように表現する（必要な場合のみ）。

```mermaid
flowchart LR
  subgraph 凡例["凡例"]
    direction LR

    人["👤Person<br>（人/ロール）"]

    subgraph 境界例["システム境界"]
      Web("Container<br>（コンテナ）")
      DB[("Database<br>（データベース）")]
    end

    外部["External System<br>（外部システム）"]

    人 -->|"Relationship（関係）"| Web
    Web -->|"Relationship（関係）"| DB
    Web -->|"Relationship（関係）"| 外部
  end

  %% Styles
  classDef person fill:#fff3bf,stroke:#f08c00,color:#000;
  classDef system fill:#d0ebff,stroke:#1c7ed6,color:#000;
  classDef external fill:#e9ecef,stroke:#495057,color:#000;
  class 人 person;
  class Web,DB system;
  class 外部 external;
  style 境界例 fill:#ffffff,fill-opacity:0,stroke:#868e96,stroke-width:1px,stroke-dasharray: 5 5;
```

---
