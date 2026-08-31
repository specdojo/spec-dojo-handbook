---
specdojo:
  id: prj-0001:pjr-21e8-grade-frontmatter-flow-style
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: review
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
    - v: 1
      id: reg_3148223ab2144cfcbeb282371001d0b0
      ts: "2026-08-31T23:16:55Z"
      action: start
      actor: codex-expert-executor
      from_status: open
      to_status: in-progress
      reason: work started
      changes:
        - field: status
          from: open
          to: in-progress
      previous_event_id: reg_b658ec796fbf4c90953e633edae057ed
    - v: 1
      id: reg_20a273c043d141ef8cfcee8c34a3b759
      ts: "2026-08-31T23:28:08Z"
      action: review
      actor: codex-expert-executor
      from_status: in-progress
      to_status: review
      reason: ready for review
      changes:
        - field: status
          from: in-progress
          to: review
      previous_event_id: reg_3148223ab2144cfcbeb282371001d0b0
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

| No  | 作業                  | 担当 | 状態 | メモ                                                                                          |
| --- | --------------------- | ---- | ---- | --------------------------------------------------------------------------------------------- |
| 1   | 適用範囲の設計        | ARC  | done | `specdojo.grade` を切り出して専用シリアライズし、他の Frontmatter へ `flowLevel` を適用しない |
| 2   | findings の扱いの決定 | ARC  | done | severity 別件数だけを個別に dump し、マッピング全体をフロースタイルで差し込む                 |
| 3   | 実装                  | ARC  | done | grade 専用シリアライズ、Prettier 正規形への整形、回帰テストを追加                             |
| 4   | 整形と検証の確認      | ARC  | done | Prettier、Markdown/Frontmatter lint、型検査、ESLint、CLI 検証を実施                           |

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

- `src/grade.ts` の Frontmatter シリアライズで `specdojo.grade` を一時的に切り出し、grade 専用の dump 設定を適用した。`categories` と `viewpoints` は collection のブロックスタイルを維持し、各項目の score または level / score だけをフロースタイルにした。
- `findings` は `flowLevel` の深さが他の2項目と異なるため個別に dump し、`{ blocker: 0, major: 0, minor: 1, note: 0 }` の形式で差し込むようにした。
- フローマッピング内側の空白と grade 内で引用が必要な文字列を Prettier の正規形に合わせた。Prettier 適用後も3項目のフロースタイルと評価内容が維持される。
- 同じ grade の連続適用がバイト単位で冪等であること、grade 外の深いマッピングがブロックスタイルのままであること、既存の severity / level 補正テストが新しい出力形式へ追随することを `tests/src/grade.test.ts` で固定した。
- [[specdojo:document-metadata-standard]] に grade のフロースタイルと適用範囲を規範として追記した。
- executor 内では Prettier、Markdown lint、Frontmatter lint、型検査、ESLint、grade のスモーク検証、カタログ・登録簿・索引・履歴リンク検証を通過した。unit / integration test と schema 検証は pipeline の親 runner が実行する。

## 5. 関連ドキュメント

- [[prj-0001:pjr-49d2-quality-assessment]]: grade の Frontmatter 構造を定めた項目。
- [[specdojo:document-metadata-standard]]: Frontmatter の記述規約。
