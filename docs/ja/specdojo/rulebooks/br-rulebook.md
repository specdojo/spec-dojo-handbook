---
specdojo:
  id: specdojo:br-rulebook
  type: rulebook
  status: draft
  recipe: undecided
  sample: specdojo:br-sample
  template: undecided
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 79
    graded_at: "2026-09-08T23:20:58.711Z"
    graded_by: codex-expert-executor
    content_hash: 04f19adc6a0f3bd9775f8caddb43e1df1be7753fc5853aa7ce739079ebe8ff9a
    categories:
      consistency: { score: 50 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 3, minor: 2, note: 0 }
---

# ビジネスルール 作成ルール

Business Rule (BR) Documentation Rules

本ドキュメントは、業務分析・要求定義のために **ビジネスルールを統一形式で記述する標準ルール**です。ビジネスルールは、複数の業務プロセス（BPS）から参照される横断的な判断・条件・計算ロジックを定義します。

## 1. 全体方針

- 対象は「判断・条件・計算ロジック」であり、**概念レベルの入力条件＋判定結果（または出力）** を明確化する。
- 実装詳細（例: 物理テーブル名、SQL、UI操作、実装クラス/関数名）は記載しない（詳細は「9. 禁止事項」参照）。
- 1ファイル = 1 ビジネスルール。複雑な場合はサブルールへ分解し、親子関係はサブルール側の `part_of` で表現する。

## 2. 用語定義

| 用語           | 定義                                                                 |
| -------------- | -------------------------------------------------------------------- |
| ビジネスルール | 業務上の判断・制約・計算ロジック。複数プロセスで共通に参照される定義 |
| 入力           | ルールが参照する概念データ・前提条件                                 |
| 判定           | 真偽またはカテゴリ分類の結果                                         |
| 出力           | 計算値・カテゴリ・フラグなど、ルールの適用結果                       |
| 例外           | 入力不備・矛盾・外部参照失敗など                                     |

## 3. ファイル命名・ID規則

- ファイル名: `br-<番号>-<短い日本語名>.md` （例: `br-0010-在庫不足判定.md`）
- Frontmatter:
  - `id`: `br-low-stock-judgment` のように小文字ハイフン形式。
  - `title`: 「在庫不足判定」など。
  - サブルールへ分割する場合: `br-low-stock-threshold`, `br-stock-reservation-deduction` などの id を付与し、サブルール側で `part_of: [br-low-stock-judgment]` を指定。

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=31 第4節の Frontmatter 定義は、共通メタデータ標準と参照 sample が必須とする `specdojo:` 名前空間および `rulebook` を示さず、スキーマで許可されない `title` を必須としているため、この規則から作成した BR が成果物 Frontmatter 検証に失敗する。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=31 第4節と第11節は、成果物 Frontmatter の必須キー `rulebook` と `specdojo:` 名前空間を欠き、共通スキーマで未定義の `title` を必須化しているため、必須キー一覧と最小例を `deliverable-frontmatter.schema.yaml` に合わせて修正する必要がある。 -->

## 4. 推奨 Frontmatter 項目

| 項目 | 説明 | 必須 |
| ---- | ---- | ---- |

<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-omissions-consistency line=36 第4節の ID 形式の記述 `(br-xxx-xxxx)` が、第3節や第11節で例示されているセマンティックな ID 形式 `br-low-stock-judgment` と矛盾している。 -->
<!-- specdojo:finding id=F005 severity=minor rule=vp-ux-language-consistency line=37 `id` の説明だけが `(br-xxx-xxxx)` となっており、第3節、NG/OK例、第11節で一貫して使用する `br-low-stock-judgment` 型のセマンティックな kebab-case 表記と統一されていない。 -->

| id | ルールID (br-xxx-xxxx) | ○ |
| type | `rule` 固定 | ○ |
| title | ルール名 | ○ |
| status | `draft`/`ready`/`deprecated` | ○ |
| part_of | 親ルールID（サブルールの場合） | 任意 |
| based_on | 根拠となる仕様ID（BPS/UIS/BEL/BES 等） | 任意 |
| supersedes | 置き換え関係（古仕様→新仕様） | 任意 |

### NG/OK例（抜粋）

- NG例: `type: api`（列挙外）, `id: BR_LowStock`（大文字/アンダースコアNG）, `extra: foo`（未定義プロパティNG）
- OK例: `type: rule`, `id: br-low-stock-judgment`, `status: ready`

## 5. 本文構成（標準テンプレ）

各 BR ファイルは以下見出しを順番に並べる。

1. 概要
2. 入力
3. ルール（判定/計算）
4. 出力
5. 例外 / 異常系
6. メモ / 将来課題

## 6. 記述ガイド詳細

### 6.1 概要

短い一文で、何を判断/計算するルールかを業務用語で記述する。

### 6.2 入力

- 業務データ辞書のエンティティ・論理名を列挙し、利用目的を簡潔に付記。
  - 例: エンティティ:在庫、項目:在庫数・予約数、目的:不足判定の基準
- 必要に応じて用語集の用語ID（tm-xxx-xxx）や外部 IF 仕様の ID を併記。

- 入力は概念レベルで記述する（詳細は「9. 禁止事項」参照）。

### 6.3 ルール（判定/計算）

- 箇条書きで条件式と意味をセットで記述する。
- 数式や条件式は業務用語に沿って表現し、必要なら TypeScript 風の擬似コードで補足してもよい。

例：

1. 不足判定: `在庫数 − 予約数 < 発注点` → 真なら不足
2. 優先度分類: 定番商品は高優先、季節商品は中優先、その他は低優先

擬似コード例：

```ts
type 商品 = { 商品ID: string; 定番: boolean; 発注点: number };
type 在庫 = { 商品ID: string; 在庫数: number; 予約数: number };

function 在庫不足判定(商品: 商品, 在庫: 在庫): boolean {
  return 在庫.在庫数 - 在庫.予約数 < 商品.発注点;
}
```

### 6.4 出力

- 判定結果（真偽/カテゴリ/数値）を列挙。
- 他プロセスが参照するための概念的な出力定義（例: 「不足フラグ」「優先度ランク」）。

### 6.5 例外 / 異常系

- 入力欠損・値の矛盾（発注点 < 0 等）・外部参照失敗など。
- 失敗時挙動（スキップ/再試行/警告ログ/オペ通知）を記述。

### 6.6 メモ / 将来課題

既知の改善余地（閾値動的化、季節要因考慮など）。

## 7. 命名・記述スタイル

- ルール名は「名詞＋判断/計算」: 例 `在庫不足判定`, `発注優先度算定`。
- 条件は簡潔に（禁止事項は「9. 禁止事項」参照）。
- 数式は意味説明と併記し、業務用語で読み下せるようにする。

## 8. 階層分解ガイド

| シグナル               | サブルールへ分割検討 |
| ---------------------- | -------------------- |
| 条件が5種以上          | ルール別に分離       |
| 出力が多種（>3）       | 目的別再編           |
| 複数ドメインに跨る参照 | 参照境界で分割       |

親子関係は、サブルール側で `part_of` を指定します（親ルール側に子を列挙しない）。

## 9. 禁止事項

| 項目                     | 理由                 |
| ------------------------ | -------------------- |
| 物理テーブル名・SQL全文  | 概念レベル逸脱       |
| 画面操作手順             | 概念レベル逸脱       |
| 実装クラス・関数名の列挙 | 実装依存・メンテ不能 |
| ビジネスルール重複記述   | 変更時不整合リスク   |
| 未定義略語乱用           | 用語集との整合欠如   |

## 10. よくある誤りと対策

- 複雑なロジックを長文で記述 → サブルールへ分割し参照。
- 物理データ項目を記載 → 概念データ辞書の論理名に置換。
- BPSの手順を流用 → 本ドキュメントでは判断・計算のみを記述。

## 11. サンプル（簡易）

<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=144 第11節の最小例は、成果物 Frontmatter を `specdojo:` 配下に置かず必須の `rulebook` と H1 を欠き、規定した見出し名「例外 / 異常系」「メモ / 将来課題」も短縮しているため, rulebook の適用例として成立していない。 -->

```markdown
---
id: br-low-stock-judgment
type: rule
title: 在庫不足判定
status: draft
part_of: []
based_on: []
---

## 概要

在庫数から予約数を差し引いた有効在庫が発注点を下回るか判定する。

## 入力

- 在庫（在庫数・予約数）
- 商品（発注点）

## ルール（判定/計算）

1. `(在庫数 − 予約数) < 発注点` → 不足

## 出力

- 不足フラグ（boolean）

## 例外

- 発注点未設定: ログ WARN, 商品スキップ

## メモ

将来: 閾値を曜日別に動的化
```
