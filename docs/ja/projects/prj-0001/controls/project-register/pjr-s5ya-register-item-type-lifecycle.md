---
specdojo:
  id: prj-0001:pjr-s5ya-register-item-type-lifecycle
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: in-progress
  priority: medium
  owner: ARC
  registered_at: "2026-08-31T22:45:16Z"
  due_on: "2026-09-30"
---

# PJR-S5YA 登録簿の type 別に状態遷移の指針を定める

## 1. 概要

`pjr-rulebook` は文書成熟度を示す `status` の遷移基準を定めているが、`item_type` ごとに `item_status` の終端をどう扱うかを定めていない。

`note` は記録であり事実を蓄積し続けるため終端しない。PJR-VQB5 は 10 回以上の追記を重ねており、`done` にすると追記しにくくなる。一方 `question` は問いであり、答えが出たら `decided` で閉じて `conclusion` へ結論を残す。

運用として合意していても規約に無ければ、人や agent によって解釈が分かれる。agent が register を操作する場面では判断基準が要る。

## 2. 完了条件

- `item_type` ごとの終端の扱いが `pjr-rulebook` へ記載されている。
- `note` が終端しないこと、その `open` が未対応ではなく生きている記録を意味することが明記されている。
- `question` と `decision` が `decided` で終端することが明記されている。
- 既存の登録項目が新しい指針と矛盾しない。
- `npm run check` が通る。

## 3. 作業内容

| No  | 作業                 | 担当   | 状態 | メモ                       |
| --- | -------------------- | ------ | ---- | -------------------------- |
| 1   | type 別の指針の決定  | ARC    | open | 終端の有無と終端ステータス |
| 2   | 既存項目との整合確認 | ARC    | open | 指針に反する項目がないか   |
| 3   | 規範文書への記載     | _TODO_ | open | pjr-rulebook               |

### 3.1. 現状の曖昧さ

次の点が定まっていない。

- `note` を `done` にしてよいか。
- `question` は `decided` と `done` のどちらで閉じるか。
- `note` の `open` が「未対応」を意味するのか「生きている記録」を意味するのか。

schema の `ClosedItemStatus` は `decided` / `done` / `rejected` を終端として定義し、完了日時を必須とする。`decided` が用意されているのは `question` と `decision` のためと読めるが、対応関係が明文化されていない。

### 3.2. 想定する指針

| type             | 終端                | 備考                                 |
| ---------------- | ------------------- | ------------------------------------ |
| `todo`           | `done`              | 完了条件を満たしたとき               |
| `question`       | `decided`           | 結論を `conclusion` へ記載する       |
| `decision`       | `decided`           | 決定内容を記録する                   |
| `note`           | 終端しない          | `open` のまま内容を更新し続ける      |
| `risk`           | `done` / `rejected` | 顕在化して対処したか、対象外としたか |
| `issue`          | `done` / `rejected` | 解決したか、対応しないと判断したか   |
| `change-request` | `done` / `rejected` | 反映したか、却下したか               |

### 3.3. note を終端させない理由

記録は完結しない。新しい事実が得られれば追記する性質を持つ。PJR-VQB5 は agent 比較の実測記録であり、評価のたびに知見が加わっている。

`done` にすると「もう更新しない」という意味になり、追記の妨げになる。一覧では `分類` 列で `todo` と区別できるため、`open` のまま残しても対応漏れとは読まれない。

### 3.4. 未決の論点

- `note` を意図的に閉じたい場合の扱い。内容が陳腐化した、対象が消滅したなどの理由で更新を止めるとき、`deferred` や `rejected` を使うか、別の表現を設けるか。
- `question` が答えの出ないまま不要になった場合。`rejected` とするか `deferred` とするか。
- 派生ビュー（`pjr-views-by-status.md`）での見え方。`note` が `open` に並び続けることで、対応が必要な項目が埋もれないか。type 別のビューを設ける必要があるか。

## 4. 対応結果

-

## 5. 関連ドキュメント

- [[specdojo:pjr-rulebook]]: 個票の状態と遷移の規約。記載先。
- [[prj-0001:pjr-vqb5-agent-grade-comparison]]: 終端しない note の実例。
