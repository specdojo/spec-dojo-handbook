---
specdojo:
  id: specdojo:gl-rulebook
  type: rulebook
  status: draft
  target_format: yaml
  recipe: undecided
  sample: specdojo:gl-sample
  template: undecided
  grade:
    rubric: grade-rubric-v1
    reference: specdojo:prj-overview-rulebook
    target: kata
    verdict: pass
    score: 96
    graded_at: "2026-08-31T11:42:38.278Z"
    graded_by: gemma-expert-executor
    content_hash: 9151dc13ea8d1c1e9959dab5996d12885aaf64336f042c213853df55550607e4
    categories:
      consistency:
        score: 100
      usability:
        score: 83
      architecture:
        score: 100
      quality:
        score: 100
    viewpoints:
      vp-arc-cross-document-consistency:
        level: 4
        score: 100
      vp-arc-conciseness:
        level: 3
        score: 75
      vp-arc-single-responsibility:
        level: 4
        score: 100
      vp-qe-verifiability:
        level: 4
        score: 100
      vp-qe-omissions-consistency:
        level: 4
        score: 100
      vp-qe-kata-conformance:
        level: 4
        score: 100
      vp-ux-readability:
        level: 3
        score: 75
      vp-ux-language-consistency:
        level: 4
        score: 100
      vp-arc-document-structure:
        level: 4
        score: 100
    findings:
      blocker: 0
      major: 0
      minor: 2
      note: 0
---

# 用語集（Glossary）作成ルール

本ドキュメントは、業務分析・要求定義・設計・テストで参照する **用語集（Glossary）を YAML 形式で記述する標準ルール**です。
用語集は、プロジェクト内で同じ言葉を同じ意味で使うための「辞書」であり、業務データ辞書（BDD）などの `glossaryTermId` が参照する **用語ID（`tm-...`）の正（正式な参照先）**になります。

## 1. メタデータ（ファイル単位）

用語集 YAML は、以下のメタデータを持つことを推奨します（運用しやすさのため）。

| 項目   | 説明                               | 必須 |
| ------ | ---------------------------------- | ---- |
| id     | 用語集ID（`gl-...`）               | 推奨 |
| title  | 用語集名（例: 用語集: 在庫・調達） | 推奨 |
| locale | 言語（例: `ja` / `en`）            | 推奨 |
| status | `draft`/`ready`/`deprecated`       | 任意 |
| terms  | 用語の配列                         | ○    |

### 1.1 ファイル命名（推奨）

- ファイル名: `gl-<対象領域>-<locale>.yaml`
  - 例: `gl-sales-ja.yaml`, `gl-inventory-ja.yaml`
- 多言語化する場合はファイルを分けます（ファイル内で言語を混在させない）。

## 2. 記載ルール・命名規則

- 形式は YAML とし、**トップレベルに `terms:`（配列）を必ず持つ**ようにします（`id` / `title` / `locale` などのメタデータを併記してよい）。
- 用語は **業務用語（日本語）**で記述し、UI文言や内部コード名の辞書化は必要最小限にします。
- 用語の定義は「一文で意味が通り、境界が分かる」ように書きます（同義語の説明にならないように）。
- BDD や BR、BPS、BAC で参照する用語は、先に用語集に登録して **ID を固定**します。

### 2.1 ID 規約

- 用語集ID: 正規表現 `^gl-[a-z0-9-]+$`
- 用語ID: 正規表現 `^tm-[a-z0-9-]+$`

推奨:

- `tm-` の命名は「名詞」を基本（例: `tm-reorder-point`）。
- 略語を使う場合は、業務用語集で一般的に通じるものに限定し、必要なら `definition` に補足。

## 3. 禁止事項

- 用語IDの重複、または ID を意味の違う用語に使い回すこと
- `definition` が曖昧（例: 「正しく処理される」「いい感じの在庫」など）
- 用語の説明に実装詳細（物理テーブル名、内部クラス名、SQL 等）を混ぜること
- 同じ概念を別名で重複登録し、`aliases` で統合しないこと
- ファイル内で言語を混在させること（多言語はファイル分割）

## 4. 用語（terms）の記載項目

### 4.1 terms の基本構造

| 項目         | 説明                                                      | 必須 |
| ------------ | --------------------------------------------------------- | ---- |
| id           | 用語ID（`tm-...`）                                        | ○    |
| term         | 用語（正式名称）                                          | ○    |
| aliases      | 別名（配列）                                              | 任意 |
| definition   | 定義（境界が分かる説明）                                  | ○    |
| notes        | 補足・運用メモ（前提、例外、使って良い文脈/ダメな文脈等） | 任意 |
| category     | 分類（推奨: 分類用の用語ID、例: `tm-inventory`）          | 任意 |
| relatedTerms | 関連用語ID（配列）                                        | 任意 |
| source       | 出典/参考（URL等）                                        | 任意 |
| status       | `official` / `deprecated` / `candidate` など              | 任意 |
| example      | 用例（短い例文）                                          | 任意 |

### 4.2 relatedTerms の運用

- `relatedTerms` は **用語ID（`tm-...`）** を列挙します。
- 関連が強い（同じ業務文脈でセットで出る）ものを中心にし、増やしすぎないことを推奨します。

## 5. 禁止事項

- 用語定義に実装詳細（クラス名、SQL、内部コード）を記載しない。
- 用語IDを未採番または重複させない。
- 曖昧語のみで定義を終えない。

<!-- specdojo:finding id=F001 severity=minor rule=vp-arc-conciseness 第5章の「禁止事項」が第3章の内容と重複しているため、統合が必要。 -->
<!-- specdojo:finding id=F002 severity=minor rule=vp-ux-readability 「禁止事項」の節が重複して存在しており、情報の配置として不自然である。 -->
