---
specdojo:
  id: prj-0001:pjr-21e8-grade-frontmatter-flow-style
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: medium
  owner: ARC
  registered_at: "2026-08-31T11:26:50Z"
  due_on: "2026-09-30"
  register_events:
    - v: 1
      id: reg_b658ec796fbf4c90953e633edae057ed
      ts: "2026-08-31T11:26:50Z"
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
          to: grade の Frontmatter をフロースタイルで出力する
        - field: description
          from: ""
          to: grade を記録すると Frontmatter が 51 行になり、本文より長くなる文書が生じる。categories と viewpoints は各項目が level と score だけを持つため、1 項目あたり 2 行を占める。viewpoints は観点数だけ繰り返され 18 行、categories が 8 行、findings が 5 行である。これらをフロースタイルへ変更すれば 51 行から 24 行程度へ縮む。js-yaml の flowLevel 4 で categories と viewpoints の中身がフロー化されること、prettier がフロースタイルを保持することを実測で確認した。ただし frontmatter の書き戻しは grade 以外でも使う共通処理であり、無条件に適用すると他の成果物へ波及する。grade 配下だけを対象とする。findings は深さが浅く flowLevel では対象にならないため個別に扱う。lint と schema 検証への影響も確認する。
        - field: type
          from: ""
          to: todo
        - field: priority
          from: ""
          to: medium
        - field: owner
          from: ""
          to: ARC
        - field: registered
          from: ""
          to: "2026-08-31"
        - field: due
          from: ""
          to: "2026-09-30"
---

# PJR-21E8 grade の Frontmatter をフロースタイルで出力する

## 1. 概要

grade を記録すると Frontmatter が 51 行になり、本文より長くなる文書が生じる。`categories` と `viewpoints` は各項目が `level` と `score` だけを持つため、1 項目あたり 2 行を占める。

`viewpoints` は観点数だけ繰り返されて 18 行、`categories` が 8 行、`findings` が 5 行である。これらをフロースタイルへ変更すれば 24 行程度へ縮む。

grade 以外の Frontmatter へ影響させないため、grade 配下だけを対象とする。

## 2. 完了条件

- grade の `categories` と `viewpoints` がフロースタイルで出力される。
- `findings` もフロースタイルで出力される。
- grade 以外の Frontmatter の出力が変わらない。
- `prettier` と `lint:fm` を通過し、整形で崩れない。
- schema 検証を通過する。
- 既に記録済みの grade を再出力しても内容が変わらない。
- `npm run check` が通る。

## 3. 作業内容

| No  | 作業                  | 担当   | 状態 | メモ                                   |
| --- | --------------------- | ------ | ---- | -------------------------------------- |
| 1   | 適用範囲の設計        | ARC    | open | grade 配下に限定する方法               |
| 2   | findings の扱いの決定 | ARC    | open | flowLevel の対象外となるため個別に扱う |
| 3   | 実装                  | _TODO_ | open | dump 後の整形か部分的な生成か          |
| 4   | 整形と検証の確認      | _TODO_ | open | prettier、lint:fm、schema              |

### 3.1. 現状の分量

`mm-rulebook.md` に grade を記録した場合の内訳である。

| 区分         | 行数  |
| ------------ | ----- |
| 基本項目     | 8 行  |
| `categories` | 8 行  |
| `viewpoints` | 18 行 |
| `findings`   | 5 行  |
| 合計         | 51 行 |

観点が増えるほど `viewpoints` が伸びる。現在は 8 観点だが、PJR-ZYFZ で `vp-arc-single-responsibility` を追加しており、今後も増える見込みである。

### 3.2. 検証済みの事実

- `js-yaml` の `flowLevel: 4` で `categories` と `viewpoints` の中身がフロー化される。`findings` は深さが浅いため対象にならない。
- `prettier` はフロースタイルを保持し、ブロックスタイルへ戻さない。

### 3.3. 影響範囲

Frontmatter の書き戻しは `src/grade.ts` の共通処理で行われ、grade 以外の更新でも使われる。`yaml.dump` へ無条件に `flowLevel` を渡すと、他の成果物の Frontmatter もフロー化される。

`catalog-generate`、`catalog-scaffold`、`catalog-plan` も同じ `yaml.dump` を使うが、それぞれ独立した呼び出しであり、grade の変更は波及しない。

### 3.4. 未決の論点

- 適用方法。dump 時に `flowLevel` を渡して grade 以外を元へ戻すか、grade 部分だけを個別に生成して差し込むか。
- `findings` のフロー化。`flowLevel` の対象外であるため、別の手段が要る。
- 可読性。フロースタイルは行数を減らすが、差分レビューでは 1 行の変更として現れる。level が変わった観点を差分から特定しにくくなる可能性がある。

## 4. 対応結果

-

## 5. 関連ドキュメント

- [[prj-0001:pjr-49d2-quality-assessment]]: grade の Frontmatter 構造を定めた項目。
- [[specdojo:document-metadata-standard]]: Frontmatter の記述規約。
