---
specdojo:
  id: prj-0001:pjr-wzma-job-responsibility-boundary
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: medium
  owner: ARC
  registered_at: "2026-09-01T12:02:27Z"
  due_on: "2026-09-30"
---

# PJR-WZMA job の責務を agent への委譲に限定する

## 1. 概要

grade 系 3 つの job の `task.description` を読むと、対象文書の選択、agent の呼び分け、
1 件ごとの `grade apply` 実行、段の順序制御がすべて自然言語で書かれている。判断を要する
記述は一つもなく、実質は日本語で書かれた shell script である。

この構造では agent が手順の解釈にも判断力を使うため、実行するか、引数が正しいかが
agent 依存になる。判断のために確保すべき rate limit を手順の解釈が消費し、301 文書の
ループを 1 セッションが抱えるため中断時の損失も大きい。

job の責務を「agent へ委譲する判断の定義」に限定し、決定論的な手順は script または CLI へ
移す。あわせて agent を nickname で指定できるようにし、選択の揺れをなくす。

## 2. 完了条件

- job の責務境界が standard に明記され、決定論的手順を description へ書かない旨が定まっている。
- job から agent を nickname で指定でき、`capabilities` による間接指定に依存しない。
- grade 系 3 job が新しい責務境界に沿って整理されている。
- `rtn-grade-kata` が整理後の構成で動作する。

## 3. 作業内容

| No  | 作業                                     | 担当 | 状態 | メモ                            |
| --- | ---------------------------------------- | ---- | ---- | ------------------------------- |
| 1   | job の責務境界を standard へ記述する     | ARC  | open | 判断と手順の切り分けを示す      |
| 2   | job schema へ agent の直接指定を追加する | ARC  | open | executor / reporter の nickname |
| 3   | grade 系 3 job を整理する                | ARC  | open | PJR-EXCV の経路へ寄せる         |
| 4   | `rtn-grade-kata` を追従させる            | ARC  | open | -                               |

## 4. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 5. 関連ドキュメント

- [[prj-0001:pjr-excv-grade-per-document-pipeline]]: 手順の移し先。
- [[prj-0001:pjr-ta5c-agent-run-primitive]]: 手順を script 化するための primitive。
- [[prj-0001:pjr-ga2k-routine-sequential-actions]]: routine の順次実行。
