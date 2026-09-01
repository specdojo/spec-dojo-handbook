---
specdojo:
  id: prj-0001:pjr-y0ah-integrate-only-resume
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: high
  owner: ARC
  registered_at: "2026-09-01T13:48:31Z"
  due_on: "2026-09-30"
---

# PJR-Y0AH 統合段のみを再試行できる再開経路を設ける

## 1. 概要

worktree 実行では、executor と reporter が成功しても最後の統合（commit と merge）が
失敗することがある。この状態から回復する経路が現状ない。

`--resume` は「executor 成功・reporter 未完」だけを対象とし、reporter が成功済みだと
`not resumable` として拒否する。残る手段は `--force-restart` による全面再実行で、
成果物が worktree に揃っていても executor からやり直すことになる。

PJR-TA5C で実際にこの状態になった。実装もテストも完成し worktree は clean だったが、
runner では回復できず orchestrator が手動で commit と merge を行った。agent が担う
べき実行と、runner が担うべき記帳の境界が、統合の失敗時にだけ崩れる。

## 2. 完了条件

- executor と reporter が成功済みで統合だけ失敗した run を、統合から再試行できる。
- 再試行は executor と reporter を起動せず、既存の worktree と evidence を再利用する。
- 再試行の成否が register の状態遷移とイベントへ記録される。
- 再試行できない状態（executor 未完など）は、理由を示して拒否する。
- 既存の `--resume` の対象範囲を壊さない。

## 3. 作業内容

| No  | 作業                                     | 担当 | 状態 | メモ                              |
| --- | ---------------------------------------- | ---- | ---- | --------------------------------- |
| 1   | pipeline-state に統合段の状態を持たせる  | ARC  | open | executor / reporter と同じ粒度    |
| 2   | 統合段から再開する経路を実装する         | ARC  | open | `--resume` の拡張か別フラグか     |
| 3   | 再開可否の判定と拒否理由を定める         | ARC  | open | 現行の not resumable と整合させる |
| 4   | 単体テストを追加する                     | ARC  | open | -                                 |
| 5   | command-reference と運用ガイドへ追記する | ARC  | open | -                                 |

## 4. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 5. 関連ドキュメント

- [[prj-0001:pjr-ta5c-agent-run-primitive]]: 本問題が実際に発生した項目。
- [[prj-0001:pjr-fmz2-integrate-error-stderr]]: 統合失敗の原因追跡に関する項目。
