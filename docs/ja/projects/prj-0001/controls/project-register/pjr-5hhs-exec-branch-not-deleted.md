---
specdojo:
  id: prj-0001:pjr-5hhs-exec-branch-not-deleted
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: issue
  item_status: open
  priority: medium
  owner: ARC
  registered_at: "2026-09-07T22:56:33Z"
  due_on: "2026-09-30"
---

# PJR-5HHS 統合後に exec ブランチが削除されず蓄積する

## 1. 概要

`exec run --worktree` の統合後に `exec/prj-0001-PJR-XXXX` ブランチが残る。worktree は削除されて
いるが、ブランチだけが残存する。確認時点で 8 本が蓄積していた。

## 2. 観測した事実

削除した 8 本はいずれも `project/prj-0001/develop` に統合済みで、未統合コミットは 0 件であった。

```text
exec/prj-0001-PJR-0148  exec/prj-0001-PJR-5ERG
exec/prj-0001-PJR-FMZ2  exec/prj-0001-PJR-G1QZ
exec/prj-0001-PJR-HF4N  exec/prj-0001-PJR-K513
exec/prj-0001-PJR-QM88  exec/prj-0001-PJR-TA5C
```

実装には削除の指定が存在する。

| 箇所                       | 内容                                              |
| -------------------------- | ------------------------------------------------- |
| `src/exec-worktree-ops.ts` | `if (params.deleteBranch) git branch -d <branch>` |
| `src/exec-run.ts`          | 2 箇所で `deleteBranch: true` を設定              |

`deleteBranch: true` は 2026-08-01 の commit `79c063a2` で導入済みである。一方、残存ブランチの
最終コミットは 2026-09-01 から 2026-09-07 で、すべて導入より後にあたる。フラグは有効だが削除が
行われていない。

## 3. 推定原因

`git branch -d` は未統合ブランチの削除を拒否する。worktree の削除とブランチ削除が統合より前に
実行されていれば、その時点では develop へ未統合であるため失敗する。失敗が握りつぶされていれば
外形上は正常終了に見える。

実行順序と、`gitOutput` が失敗した場合の扱いを確認する必要がある。

## 4. 影響

残骸が増え続け、どのブランチが未統合か判別しにくくなる。PJR-23DT の worktree が不要かを判断
する際、登録簿の状態・未コミット変更・未統合コミットを個別に確認する必要があった。

## 5. 完了条件

- 統合に成功した `exec run --worktree` の実行後、対応する exec ブランチが残らない。
- ブランチ削除に失敗した場合、失敗した事実と理由が実行ログに出力される。
- 未統合のブランチは削除されない（`-d` の安全性を保つ）。
- 統合後にブランチが削除されることを検証するテストを追加する。

## 6. 作業内容

| No  | 作業                                        | メモ                 |
| --- | ------------------------------------------- | -------------------- |
| 1   | worktree 削除とブランチ削除の実行順序を確認 | 統合より前かどうか   |
| 2   | `git branch -d` 失敗時の扱いを確認          | 握りつぶしていないか |
| 3   | 統合後に削除されるよう修正                  |                      |
| 4   | 統合後のブランチ削除を検証するテストを追加  |                      |

## 7. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 8. 関連ドキュメント

- [[prj-0001:pjr-9qz2-exec-stale-running-stage]]: 同じ worktree 運用で判明した状態残留の問題。
