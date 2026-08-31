---
specdojo:
  id: prj-0001:pjr-9s41-template-frontmatter-unification
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: low
  owner: ARC
  registered_at: "2026-08-31T21:38:14Z"
  due_on: "2026-10-31"
  register_events:
    - v: 1
      id: reg_ced76bdd8e324812a974133aa518f5c0
      ts: "2026-08-31T21:38:15Z"
      action: add
      actor: manual
      from_status: null
      to_status: open
      reason: item added
      changes:
        - field: status
          from: ""
          to: open
        - field: title
          from: ""
          to: exec 系テンプレートを frontmatter_template 形式へ統一する
        - field: description
          from: ""
          to: Markdown テンプレートに2つの形式が併存している。成果物テンプレートは自身の Frontmatter に frontmatter_template を持ち、exec と result のテンプレートは本文先頭の _FRONTMATTER_ を生成処理が置換する。後者は Frontmatter を持たないため、grade をはじめとする Frontmatter 前提のツールが扱えない。document-metadata-standard は両形式を併記するのみで、なぜ分けるかの理由を記していない。exec plan の Frontmatter は origin や owner や approach や on_critical_path が条件で増減するため、単純な雛形では表現できない。全項目を雛形へ並べて空値の行を除去する後処理を加えれば統一できる。ただし値が固定で存在自体が条件となる項目には別の工夫が要る。対象は 31 ファイル、生成処理は exec-plans と exec-results と exec-register と job に分散する。exec は中核機能であり慎重に進める。
        - field: type
          from: ""
          to: todo
        - field: priority
          from: ""
          to: low
        - field: owner
          from: ""
          to: ARC
        - field: registered
          from: ""
          to: "2026-09-01"
        - field: due
          from: ""
          to: "2026-10-31"
---

# PJR-9S41 exec 系テンプレートを frontmatter_template 形式へ統一する

## 1. 概要

Markdown テンプレートに2つの形式が併存している。成果物テンプレートは自身の Frontmatter に `frontmatter_template` を持ち、exec と result のテンプレートは本文先頭の `_FRONTMATTER_` を生成処理が置換する。

後者は Frontmatter を持たないため、Frontmatter を前提とするツールが扱えない。grade は全件走査で停止し、除外の実装（PJR-Q3JG）が必要になった。

`document-metadata-standard` は両形式を併記するのみで、なぜ分けるのかを記していない。形式を1つに統一すれば、規約の説明も除外の実装も不要になる。

## 2. 完了条件

- exec と result のテンプレートが Frontmatter を持ち、生成物の Frontmatter を `frontmatter_template` で表現する。
- 生成される plan と result の Frontmatter が現在と同じ内容になる。条件で増減する項目も再現される。
- `document-metadata-standard` から `_FRONTMATTER_` 方式の記述が消え、Markdown テンプレートの形式が1つになる。
- grade をはじめとする Frontmatter 前提のツールが除外なしで扱える。
- exec の plan 生成、result 生成、register 経由の生成、job 経由の生成がいずれも動作する。
- `npm run check` と統合テストが通る。

## 3. 作業内容

| No  | 作業                         | 担当   | 状態 | メモ                                         |
| --- | ---------------------------- | ------ | ---- | -------------------------------------------- |
| 1   | 条件付き項目の表現方法の決定 | ARC    | open | 空値削除か別の記法か                         |
| 2   | 移行方式の決定               | ARC    | open | 一括か段階的か                               |
| 3   | 生成処理の変更               | _TODO_ | open | exec-plans、exec-results、exec-register、job |
| 4   | テンプレート 31 件の移行     | _TODO_ | open | 生成結果の同一性を確認する                   |
| 5   | 規範文書の更新               | _TODO_ | open | document-metadata-standard                   |
| 6   | 除外実装の撤去               | _TODO_ | open | PJR-Q3JG で入れた除外が不要になる            |

### 3.1. 現状の2形式

| 項目               | 成果物テンプレート                | exec / result テンプレート         |
| ------------------ | --------------------------------- | ---------------------------------- |
| 自身の Frontmatter | あり                              | **なし**                           |
| 生成物の表現       | `frontmatter_template` フィールド | 本文先頭の `_FRONTMATTER_`         |
| 生成方法           | 雛形を de-indent して展開         | コードで組み立てた文字列を差し込む |
| 件数               | 多数                              | 31                                 |

### 3.2. 統一を妨げている構造

exec plan の Frontmatter は項目が条件で増減する。

```text
origin、owner、on_critical_path、approach は値がある場合だけ出力される
```

`frontmatter_template` はプレースホルダを実値へ置換する方式であり、項目自体が出たり出なかったりする状態を表現できない。

全項目を雛形へ並べ、置換後に空値となった行を削除する後処理を加えれば表現できる。ただし `on_critical_path: true` のように値が固定で存在自体が条件となる項目は、空値削除では扱えないため別の工夫が要る。

### 3.3. 統一の価値

- Markdown テンプレートの形式が1つになり、`document-metadata-standard` から例外の記述が消える。
- Frontmatter を前提とするツールが一律に扱える。grade の除外（PJR-Q3JG）が不要になる。
- テンプレートを読めば生成物の Frontmatter が分かる。現在は生成処理を読まないと分からない。

### 3.4. 慎重に進める理由

exec は SpecDojo の中核機能であり、plan と result の生成が壊れるとタスク実行が止まる。生成処理は `exec-plans`、`exec-results`、`exec-register`、`job` の4箇所に分散しており、いずれも `_FRONTMATTER_` を置換している。

移行前後で生成結果が同一になることを、実際の plan と result で確認する必要がある。

### 3.5. 未決の論点

- 値が固定で存在自体が条件となる項目の表現方法。空値削除では扱えない。
- 移行を一括で行うか、形式を併存させて段階的に移すか。併存させる場合は両方の生成経路を保つ必要がある。
- `metadata_template` を用いる YAML テンプレートとの関係。Markdown と YAML で別のフィールド名を使い分ける現状を維持するか。

## 4. 対応結果

-

## 5. 関連ドキュメント

- [[prj-0001:pjr-q3jg-grade-exclude-exec-templates]]: 除外による回避。本項目が完了すれば不要になる。
- [[specdojo:document-metadata-standard]]: テンプレート自身のメタ情報と生成物 Frontmatter の分離。
- [[specdojo:exec-operation-guide]]: plan と result の生成。
