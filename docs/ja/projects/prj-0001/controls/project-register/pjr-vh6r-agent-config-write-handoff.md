---
specdojo:
  id: prj-0001:pjr-vh6r-agent-config-write-handoff
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: in-progress
  priority: medium
  owner: ARC
  registered_at: "2026-09-02T13:25:25Z"
  due_on: "2026-09-30"
  block_reason: "integrate failed: git merge-base failed: fatal: detected dubious ownership in repository at '/workspaces/specdojo-workspace/worktrees/prj-0001-PJR-VH6R' To add an exception for this directory, call:  …"
---

# PJR-VH6R 保護機構の block 時に申し送りの記入を強制する

## 1. 概要

`agent-config-write` は、agent が `package.json` / `lefthook.yml` / `.specdojo/exec-defaults.yaml`
などの検証設定を自ら書き換えることを防ぐ保護機構である。agent は変更を提案するだけに留め、
人または対話型 orchestrator が確認して適用する。

規約は、block する際に対象パス、変更理由、提案差分、変更後に必要な検証を result の申し送りへ
記載することを求めている。しかし現状はこの記載がなくても block できてしまう。

PJR-QM88 の実行で実際に発生した。agent は `package.json` へ script を登録しようとして block
されたが、result の申し送りは `_TODO_` のまま残った。

```text
agent-config-write: protected configuration changes detected; paths=package.json
```

そのため orchestrator は、何をどう変更しようとしたのかを worktree の `git diff` から直接
読み取る必要があった。申し送りが機能していれば、result を読むだけで判断できたはずである。

同じことが PJR-FMZ2 の実行でも起きた。こちらは `agent-config-write` ではなく
`agent-git-state-write` が block したが、申し送りは同様に `_TODO_` のままだった。

```text
agent-git-state-write: Git state changes detected; fields=HEAD, local-config
```

問題は特定の保護機構に固有ではなく、block 経路全体で申し送りの記入が保証されていない点に
ある。本項目の対象は `agent-config-write` に限らず、agent の変更を止めて人の判断へ引き渡す
保護機構全体とする。

保護機構の目的は変更を止めることではなく、人の判断へ引き渡すことにある。引き渡す情報が
欠けると、止めた意味が半減する。

## 2. 完了条件

- 保護機構が block する際、申し送りが未記入なら agent へ差し戻すか、機構側で最低限の情報を
  result へ記録する。
- 記録される情報に、対象パス、変更理由、提案差分、変更後に必要な検証が含まれる。
- orchestrator や人が result を読むだけで、適用の可否を判断できる。
- 既存の block 経路と終了コードの契約を壊さない。

## 3. 検討事項

- agent の記入に依存する方式は、モデルの遵守に左右される。機構側が検出した差分から自動で
  記録する方式のほうが確実だが、agent が意図した理由までは自動生成できない。
- 両者の併用が現実的と考えられる。差分と対象パスは機構が記録し、理由と必要な検証は agent へ
  求める。agent が書かない場合も、最低限の情報は残る。

## 4. 作業内容

| No  | 作業                                     | 担当 | 状態 | メモ                           |
| --- | ---------------------------------------- | ---- | ---- | ------------------------------ |
| 1   | 現行の block 経路と result 更新を調べる  | ARC  | open | どこで申し送りを書く想定か     |
| 2   | 機構側で記録する情報の範囲を決める       | ARC  | open | 差分と対象パスは自動記録できる |
| 3   | agent への要求と機構の記録を組み合わせる | ARC  | open | 未記入時も最低限を残す         |
| 4   | 単体テストを追加する                     | ARC  | open | 未記入時の挙動を固定する       |
| 5   | 規約の記述を実態へ合わせる               | ARC  | open | 何が保証されるかを明記する     |

## 5. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 6. 関連ドキュメント

- [[prj-0001:pjr-qm88-rulebook-schema-enum-lint]]: `agent-config-write` で発生した実行。
- [[prj-0001:pjr-fmz2-integrate-error-stderr]]: `agent-git-state-write` で発生した実行。
