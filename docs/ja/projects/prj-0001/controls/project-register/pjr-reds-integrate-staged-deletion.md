---
specdojo:
  id: prj-0001:pjr-reds-integrate-staged-deletion
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: in-progress
  priority: high
  owner: ARC
  registered_at: "2026-09-03T09:50:00Z"
  due_on: "2026-09-30"
---

# PJR-REDS 統合処理が削除ファイルを含む変更を commit できない

## 1. 概要

worktree 実行の統合処理は、commit 対象へ `git add -A -- <paths>` を実行する。対象に削除された
ファイルが含まれ、その削除が既に index へ入っている場合、この呼び出しが pathspec 不一致で
失敗する。

```text
integrate failed: git add failed:
  fatal: pathspec 'docs/ja/projects/prj-0001/jobs/job-grade-kata-expert-check.yaml' did not match any files
```

削除が staged 済みだと、そのパスは作業ツリーにも index にも存在しない。`git add` の pathspec
はこの2つを照合するため一致せず、`-A` を付けても致命的エラーになる。

| index の状態      | `git add -A -- <path>` |
| ----------------- | ---------------------- |
| 未 staged の削除  | 成功                   |
| staged 済みの削除 | fatal (exit 128)       |

統合処理は pre-commit hook による再整形へ収束させるため `git add` をやり直す。1回目で削除が
staged されるので、2回目で必ず失敗する。結果としてファイル削除を伴う変更は統合できない。

PJR-WZMA で発生した。3つの job を1つへ統合する設計のため削除が本質的に伴い、executor と
reporter が成功しても統合段で止まる。

PJR-TA5C の統合失敗も同じ原因の可能性が高い。当時は失敗理由が長さ上限で切り詰められて
特定できず、orchestrator による手動統合で回避した。原因が読めるようになったのは
[[prj-0001:pjr-fmz2-integrate-error-stderr]] の変更以降である。

## 2. 完了条件

- ファイルの削除を含む変更を統合できる。
- 削除が staged 済みの状態で統合を再試行しても失敗しない。
- 新規追加、変更、リネームの統合が従来どおり動作する。
- pre-commit hook による再整形後の再 stage が引き続き機能する。
- 削除を含む統合の回帰テストがある。

## 3. 検討事項

- `git add -A` を pathspec 付きで使う限りこの制約は残る。commit 対象の指定方法自体を見直すか、
  削除済みパスを除外して扱うかの判断が要る。
- `git commit -- <paths>` の pathspec commit も同じ照合規則に従うため、統合経路全体で
  削除パスの扱いを揃える必要がある。
- 対象を限定する目的（利用者の無関係な変更を巻き込まない）は維持する。全件 `git add -A` へ
  戻すと目的を損なう。

## 4. 作業内容

| No  | 作業                                   | 担当 | 状態 | メモ                     |
| --- | -------------------------------------- | ---- | ---- | ------------------------ |
| 1   | 統合経路で削除パスが通る箇所を洗い出す | ARC  | open | add と commit の両方     |
| 2   | 削除パスの扱いを決めて実装する         | ARC  | open | 対象限定の目的は維持する |
| 3   | 再試行時に失敗しないことを確認する     | ARC  | open | staged 済みでも通ること  |
| 4   | 回帰テストを追加する                   | ARC  | open | 削除・追加・変更の混在   |
| 5   | PJR-WZMA の統合を再開して確認する      | ARC  | open | `--resume` で統合段から  |

## 5. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 6. 関連ドキュメント

- [[prj-0001:pjr-wzma-job-responsibility-boundary]]: 本問題で統合が止まっている項目。
- [[prj-0001:pjr-fmz2-integrate-error-stderr]]: 原因を読めるようにした変更。
- [[prj-0001:pjr-y0ah-integrate-only-resume]]: 修正後に統合段から再開するための経路。
