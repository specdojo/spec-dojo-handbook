---
specdojo:
  id: prj-0001:pjr-q3jg-grade-exclude-exec-templates
  type: project
  status: ready
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: done
  priority: medium
  owner: ARC
  registered_at: "2026-08-31T14:01:41Z"
  due_on: "2026-09-30"
  completed_at: "2026-08-31T22:53:11Z"
  conclusion: PJR-9S41 へ統合し単独では対応しない。grade 側で本文の先頭を判定して除外する方針だったが、exec 系テンプレートを exec-templates ディレクトリへ分離すればディレクトリ単位で対象から外せる。成果物テンプレートは rulebook から宣言され実践の型の一部を成すが、exec 系を宣言する rulebook は 0 件であり、kata として評価する前提が成り立たない。分離が根本解決にあたるため除外だけを別に実装する意味がない。
  register_events:
    - v: 1
      id: reg_164284675786499a889919bb27c45131
      ts: "2026-08-31T14:01:41Z"
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
          to: exec 系テンプレートを grade の対象から除外する
        - field: description
          from: ""
          to: xep / xer / xrp / xrr 系のテンプレート 31 件は先頭が _FRONTMATTER_ のプレースホルダであり、生成時に置換される設計である。document-metadata-standard も exec と result のテンプレートは本文先頭の _FRONTMATTER_ を用いると定めている。しかし grade は kata の template としてこれらを対象に含めるため、全件走査が Markdown frontmatter is required で停止する。これらは exec の内部テンプレートであり品質評価の対象ではない。frontmatter を追記すると生成物が壊れるため、grade 側で除外する。_FRONTMATTER_ で始まる文書を除く方法と、接頭辞で判定する方法がある。
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
      id: reg_0ebca77bac974f76a7b4a853dfd0f446
      ts: "2026-08-31T22:52:24Z"
      action: close
      actor: manual
      from_status: open
      to_status: done
      reason: PJR-9S41 の分離により解決するため統合した
      changes:
        - field: status
          from: open
          to: done
        - field: completed
          from: "-"
          to: "2026-09-01"
        - field: conclusion
          from: "-"
          to: PJR-9S41 へ統合し単独では対応しない。grade 側で本文の先頭を判定して除外する方針だったが、exec 系テンプレートを exec-templates ディレクトリへ分離すればディレクトリ単位で対象から外せる。判定が単純になり除外のための特別な実装が不要になる。成果物テンプレートは rulebook から宣言され実践の型の一部を成すが、exec 系を宣言する rulebook は 0 件であり、kata として評価する前提が成り立たない。分離が根本解決にあたるため除外だけを別に実装する意味がない。
      previous_event_id: reg_164284675786499a889919bb27c45131
    - v: 1
      id: reg_ee34780e71824df4ab8d82dd6feb0aed
      ts: "2026-08-31T22:53:11Z"
      action: reopen
      actor: manual
      from_status: done
      to_status: open
      reason: status を ready へ昇格させるため一度戻す
      changes:
        - field: status
          from: done
          to: open
        - field: completed
          from: "2026-09-01"
          to: "-"
      previous_event_id: reg_0ebca77bac974f76a7b4a853dfd0f446
    - v: 1
      id: reg_53c706107741428a9dc570a3a7e5f8ec
      ts: "2026-08-31T22:53:11Z"
      action: close
      actor: manual
      from_status: open
      to_status: done
      reason: PJR-9S41 の分離により解決するため統合した
      changes:
        - field: status
          from: open
          to: done
        - field: completed
          from: "-"
          to: "2026-09-01"
        - field: conclusion
          from: PJR-9S41 へ統合し単独では対応しない。grade 側で本文の先頭を判定して除外する方針だったが、exec 系テンプレートを exec-templates ディレクトリへ分離すればディレクトリ単位で対象から外せる。判定が単純になり除外のための特別な実装が不要になる。成果物テンプレートは rulebook から宣言され実践の型の一部を成すが、exec 系を宣言する rulebook は 0 件であり、kata として評価する前提が成り立たない。分離が根本解決にあたるため除外だけを別に実装する意味がない。
          to: PJR-9S41 へ統合し単独では対応しない。grade 側で本文の先頭を判定して除外する方針だったが、exec 系テンプレートを exec-templates ディレクトリへ分離すればディレクトリ単位で対象から外せる。成果物テンプレートは rulebook から宣言され実践の型の一部を成すが、exec 系を宣言する rulebook は 0 件であり、kata として評価する前提が成り立たない。分離が根本解決にあたるため除外だけを別に実装する意味がない。
      previous_event_id: reg_ee34780e71824df4ab8d82dd6feb0aed
---

# PJR-Q3JG exec 系テンプレートを grade の対象から除外する

## 1. 概要

`xep` / `xer` / `xrp` / `xrr` 系のテンプレート 31 件は、先頭が `_FRONTMATTER_` のプレースホルダである。生成時に実際の Frontmatter へ置換される設計であり、テンプレート自体は Frontmatter を持たない。

しかし grade は kata の template としてこれらを対象に含めるため、全件走査が `Markdown frontmatter is required` で停止する。

これらは exec の内部テンプレートであり、品質評価の対象ではない。grade 側で除外する。

## 2. 完了条件

- exec 系テンプレートが grade の対象に含まれない。
- 成果物のテンプレート（`opr-template` など）は引き続き対象となる。
- 全件走査がエラーで停止しない。
- 除外の判定方法が規範文書へ記載されている。
- `npm run check` が通る。

## 3. 作業内容

| No  | 作業           | 担当 | 状態      | メモ                                     |
| --- | -------------- | ---- | --------- | ---------------------------------------- |
| 1   | 判定方法の決定 | ARC  | done      | ディレクトリ分離により判定が不要になった |
| 2   | 実装           | ARC  | cancelled | PJR-9S41 へ統合                          |
| 3   | 規範文書の更新 | ARC  | cancelled | PJR-9S41 へ統合                          |

### 3.1. 対象となるテンプレート

| 接頭辞 | 用途          | 件数 |
| ------ | ------------- | ---- |
| `xep`  | exec plan     | 15   |
| `xer`  | exec result   | 4    |
| `xrp`  | review plan   | 10   |
| `xrr`  | review result | 2    |

いずれも本文の先頭が `_FRONTMATTER_` である。

### 3.2. Frontmatter を追記してはならない

`document-metadata-standard` は次のとおり定めている。

> Markdown 成果物テンプレートは `frontmatter_template` フィールド、exec / result テンプレートは本文先頭の `_FRONTMATTER_` を用いる

成果物のテンプレートは自身の Frontmatter に `frontmatter_template` を持ち、生成物の Frontmatter をそこへ記述する。一方 exec 系は本文先頭の置換で表現する。設計として区別されており、Frontmatter を追記すると生成物が壊れる。

### 3.3. 判定方法の候補

| 方法                         | 利点                     | 欠点                                       |
| ---------------------------- | ------------------------ | ------------------------------------------ |
| 本文の先頭が `_FRONTMATTER_` | 設計上の性質で判定できる | 将来プレースホルダの表記が変わると壊れる   |
| 接頭辞（`xep` など）で判定   | 単純                     | 命名規約に依存し、新しい接頭辞へ追随が要る |
| ディレクトリで判定           | —                        | 同じ `templates/` に両方が置かれており不可 |

本文の先頭で判定するほうが、命名ではなく実体に基づく。

### 3.4. 未決の論点

- 除外した文書を利用者へ知らせるか。黙って除外すると、評価されていないことに気づけない。
- 成果物のテンプレートは評価対象として妥当か。`frontmatter_template` を持つため Frontmatter は読めるが、本文はプレースホルダを含む。rubric の適用が適切かは別途検討が要る。

## 4. 対応結果

本項目は PJR-9S41 へ統合し、単独では対応しない。

grade 側で本文の先頭を判定して除外する方針だったが、exec 系テンプレートを `docs/ja/specdojo/exec-templates/` へ分離すれば、ディレクトリ単位で対象から外せる。判定は単純になり、除外のための特別な実装が不要になる。

分離の根拠は役割の違いである。成果物テンプレートは rulebook から `template` として宣言され実践の型の一部を成すが、exec 系を宣言する rulebook は 0 件である。exec 系は plan と result を生成する実行基盤の内部テンプレートであり、kata として評価する前提が成り立たない。

同じ問題への対処であり、分離が根本解決にあたるため、除外だけを別に実装する意味がない。

## 5. 関連ドキュメント

- [[prj-0001:pjr-3d7q-grade-target-filter]]: grade の対象選択。除外の実装先。
- [[specdojo:document-metadata-standard]]: テンプレート自身のメタ情報と生成物 Frontmatter の分離。
