---
specdojo:
  id: prj-0001:pjr-t3vq-maintenance-plan-target-path
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: in-progress
  priority: high
  owner: ARC
  registered_at: "2026-09-07T11:07:50Z"
  due_on: "2026-09-30"
---

# PJR-T3VQ maintenance の plan が編集対象の kata パスを示さない

## 1. 概要

`<kind>-maintenance` の plan が示す `path` は成果物であり、編集対象である kata のパスを含まない。
agent は「対象成果物に紐づく kata」を自力で探す必要がある。

## 2. 現状

`exec plan --deliverable br-actor-assignment --approach sample-maintenance` で生成した plan の
記述である。

```text
## 2. 対象成果物

- `name`: アクター割り当てルール
- `path`: `docs/ja/product/010-business-specs/030-business-model/br-actor-assignment.md`
```

`sample-maintenance` は sample を編集する approach だが、編集対象である
`docs/ja/specdojo/samples/br-sample.md` のパスは plan に現れない。plan 本文は「対象 sample に
`specdojo.grade` と `specdojo:finding` がある場合は」と述べるが、その sample がどこにあるかを
示さない。

`rulebook` / `recipe` / `template` の各 maintenance も同じ構造である。

## 3. 問題

- 対象の特定が agent の推測に委ねられる。命名規則から `br-sample.md` を導けるとしても、規則が
  保証されているわけではない。
- finding へ到達できるかが不確実になる。[[prj-0001:pjr-rp1k-maintenance-finding-instruction]] で
  finding を修正の根拠に据える記述へ改めたが、対象へ到達できなければ機能しない。
- 誤った kata を編集する余地がある。同じ prefix を持つ kata が複数ある場合、どれを対象とするかが
  決まらない。

`sample` は 87 件中 35 件が `fail` で、修正が必要な対象が多い。到達の確実性は全件に影響する。

## 4. 完了条件

- `<kind>-maintenance` の plan に、編集対象である kata のパスが含まれる。
- 対象 kata が存在しない場合は、その旨が plan に示される。新規作成の指示と区別できる。
- 成果物のパスは引き続き示される。kata の見直しには成果物を根拠として読む必要があるため、
  両方が必要である。
- `bootstrap` でも、整備対象の kata のパスが示される。
- plan 生成の回帰テストで、kata パスの有無を検証している。

## 5. 検討事項

- kata のパスをどこから解決するかを決める。rulebook frontmatter の `sample` / `recipe` /
  `template` 宣言を使う方法と、命名規則から導く方法がある。前者は宣言が正本となるが、宣言の
  ない kata へ到達できない。
- 複数の kata が対応する場合の扱いを決める。1つの rulebook に複数の sample が紐づく構成が
  あり得る。
- plan の章構成を変えるか、既存の `対象成果物` 節へ追記するかを判断する。`maintenance` は
  編集対象が kata であるため、`対象成果物` という節名自体が実態と合っていない可能性がある。

## 6. 作業内容

| No  | 作業                                        | 担当 | 状態 | メモ                                                           |
| --- | ------------------------------------------- | ---- | ---- | -------------------------------------------------------------- |
| 1   | kata パスの解決方法を決める                 | ARC  | open | frontmatter 宣言か命名規則か                                   |
| 2   | plan へ kata パスを含める                   | ARC  | open | maintenance 4件と bootstrap                                    |
| 3   | 対象が存在しない場合の表示を定める          | ARC  | open | 新規作成と区別する                                             |
| 4   | 回帰テストを追加する                        | ARC  | open | kata パスの有無を検証                                          |
| 5   | 実行して finding が修正されることを確認する | ARC  | open | [[prj-0001:pjr-rp1k-maintenance-finding-instruction]] の未達分 |

## 7. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 8. 関連ドキュメント

- [[prj-0001:pjr-rp1k-maintenance-finding-instruction]]: finding を修正の根拠に据える記述。本項目の
  解決後に実行して検証する。
- [[prj-0001:pjr-2w38-sample-quality-observation]]: 修正対象となる kata の品質観測。
