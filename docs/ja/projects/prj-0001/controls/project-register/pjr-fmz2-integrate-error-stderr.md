---
specdojo:
  id: prj-0001:pjr-fmz2-integrate-error-stderr
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: medium
  owner: ARC
  registered_at: "2026-09-01T13:48:32Z"
  due_on: "2026-09-30"
---

# PJR-FMZ2 統合失敗時のエラーに git stderr を残す

## 1. 概要

統合の失敗理由は `git <args> failed: <stderr>` の形で組み立てられるが、`args` に
commit 対象の pathspec が全件並ぶため文字列が長くなり、記録先で切り詰められて末尾の
stderr が失われる。

PJR-TA5C の統合失敗では、register イベントの `reason`、result の `block_reason`、
実行ログの一覧行のいずれも `-- docs/ja/proj…` で終わっており、git が何を理由に
失敗したのかを事後に特定できなかった。同じ commit を後から実行すると成功したため、
再現による切り分けもできなかった。

失敗の記録が原因を含まないと、一過性か再現性かの判断ができず、対処が推測になる。

## 2. 完了条件

- 統合が失敗した場合、git の stderr が切り詰められずに記録される。
- pathspec の長さが stderr の記録を圧迫しない。
- register イベントの `reason`、result の `block_reason`、実行ログの一覧で
  失敗理由を確認できる。
- 既存の成功時の出力を冗長にしない。

## 3. 作業内容

| No  | 作業                                         | 担当 | 状態 | メモ                               |
| --- | -------------------------------------------- | ---- | ---- | ---------------------------------- |
| 1   | git 失敗メッセージの構成を見直す             | ARC  | open | pathspec は件数などへ要約する      |
| 2   | 記録先ごとの長さ制限と切り詰め位置を確認する | ARC  | open | 原因が先頭に来るようにする         |
| 3   | 単体テストを追加する                         | ARC  | open | 長い pathspec で stderr が残ること |

## 4. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 5. 関連ドキュメント

- [[prj-0001:pjr-ta5c-agent-run-primitive]]: 本問題が実際に発生した項目。
- [[prj-0001:pjr-y0ah-integrate-only-resume]]: 統合失敗からの回復に関する項目。
