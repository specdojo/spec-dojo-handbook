---
specdojo:
  id: prj-0001:pjr-mbvm-grade-exclude-generated
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: medium
  owner: ARC
  registered_at: "2026-09-07T13:45:36Z"
  due_on: "2026-09-30"
---

# PJR-MBVM grade の対象選択から generated 配下を除外する

## 1. 概要

`grade validate` / `grade plan` の文書選択が `docs/ja/specdojo/*/generated/` 配下を対象に含めて
いる。`--changed-only` の走査で 47 件が `specdojo.grade is missing` として報告される。

`generated` は生成物であり評価対象ではない。`tools/grade/run-per-document.sh` は find で
`-not -path '*/generated/*'` を指定して除外済みだが、`grade` 側の選択には反映されていない。

## 2. 完了条件

- `grade validate` / `grade plan` の文書選択が `generated` 配下を対象に含めない。
- `--path` で `generated` 配下を明示指定した場合の扱いを決め、その動作を実装する。
- `grade validate --target kata --changed-only` の出力に `generated` 配下が現れない。
- 除外を検証する単体テストを追加する。

## 3. 作業内容

| No  | 作業                                        | メモ                               |
| --- | ------------------------------------------- | ---------------------------------- |
| 1   | CLI の選択ロジックへ `generated` 除外を追加 | スクリプト側の find と規則を揃える |
| 2   | `--path` 明示指定時の扱いを決める           | 拒否するか、警告のうえ対象とするか |
| 3   | 単体テストを追加                            |                                    |

## 4. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 5. 関連ドキュメント

- [[prj-0001:pjr-20dv-grade-content-hash-normalization]]: 同じ走査で判明したハッシュの問題。
