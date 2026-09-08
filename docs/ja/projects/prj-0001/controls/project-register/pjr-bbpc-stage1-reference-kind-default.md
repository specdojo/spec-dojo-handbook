---
specdojo:
  id: prj-0001:pjr-bbpc-stage1-reference-kind-default
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: in-progress
  priority: medium
  owner: ARC
  registered_at: "2026-09-04T11:51:15Z"
  due_on: "2026-09-30"
---

# PJR-BBPC 3段評価の既定リファレンスが対象種別に追従しない

## 1. 概要

`tools/grade/run-per-document.sh` は `--kind` で評価対象の種別を選ぶが、1段目の既定リファレンス
は種別に追従せず `prj-overview-rulebook.md` のままである。

```text
--kind recipe    reference=docs/ja/specdojo/rulebooks/prj-overview-rulebook.md
--kind sample    reference=docs/ja/specdojo/rulebooks/prj-overview-rulebook.md
--kind template  reference=docs/ja/specdojo/rulebooks/prj-overview-rulebook.md
```

種別ごとの `prj-overview` 系はいずれも存在する。

```text
docs/ja/specdojo/recipes/prj-overview-recipe.md
docs/ja/specdojo/samples/prj-overview-sample.md
docs/ja/specdojo/templates/prj-overview-template.md
```

リファレンスは記載水準を比較する基準である。recipe を rulebook と比べると、求める構成も粒度も
異なるため基準を誤る。[[prj-0001:pjr-excv-grade-per-document-pipeline]] は種別を跨ぐ選定を行わない
方針で実装され、`reference_for` が種別ごとに解決する。既定値だけがこの方針から外れている。

`--stage-1-reference` を明示すれば回避できるが、指定を忘れると誤った基準のまま評価が進む。
評価は1文書あたり十数分かかるため、誤りに気づくのは走査後になる。

## 2. 完了条件

- `--kind` に応じて1段目の既定リファレンスが対応する `prj-overview` 系へ解決される。
- `--stage-1-reference` の明示指定は従来どおり優先される。
- 指定されたリファレンスが対象種別と異なる場合、警告するか拒否する。
- 対応する `prj-overview` 系が存在しない種別では、リファレンスなしで続行し警告する。
- `--dry-run` で解決結果を確認できる。

## 3. 作業内容

| No  | 作業                                     | 担当 | 状態 | メモ                       |
| --- | ---------------------------------------- | ---- | ---- | -------------------------- |
| 1   | 既定リファレンスを種別から解決する       | ARC  | open | `reference_for` と同じ規則 |
| 2   | 種別と異なる指定への扱いを決める         | ARC  | open | 警告か拒否か               |
| 3   | 存在しない場合のフォールバックを実装する | ARC  | open | 警告してリファレンスなし   |
| 4   | 回帰テストを追加する                     | ARC  | open | 4種別すべて                |
| 5   | command-reference の記述を合わせる       | ARC  | open | 既定値の説明               |

## 4. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 5. 関連ドキュメント

- [[prj-0001:pjr-excv-grade-per-document-pipeline]]: 種別ごとの解決方針を定めた項目。
- [[specdojo:command-reference]]: 既定値を記載する参照先。
