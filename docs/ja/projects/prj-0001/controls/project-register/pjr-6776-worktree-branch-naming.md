---
specdojo:
  id: prj-0001:pjr-6776-worktree-branch-naming
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: low
  owner: ARC
  registered_at: "2026-09-10T13:16:40Z"
  due_on: "2026-09-30"
---

# PJR-6776 エージェント作業用 worktree のブランチ命名を統一する

## 1. 概要

エージェント作業用 worktree のブランチ名が揺れている。接頭辞の有無が agent によって異なり、
script の指定と実際のブランチが一致しない箇所もある。

## 2. 現状

| worktree       | script              | script の指定  | 実際のブランチ         | 整合  |
| -------------- | ------------------- | -------------- | ---------------------- | ----- |
| `claude-work`  | `orch:sonnet:work`  | `claude-work`  | `worktree-claude-work` | ○     |
| `codex-work`   | `orch:terra:work`   | `codex-work`   | `worktree-codex-work`  | **×** |
| `copilot-work` | `orch:copilot:work` | `copilot-work` | `copilot-work`         | ○     |
| `qwen-work`    | `orch:qwen:work`    | `qwen-work`    | `qwen-work`            | ○     |
| `gemma-work`   | `orch:gemma:work`   | `gemma-work`   | 未作成                 | —     |

`opencode-work` は script に存在せず、使用もされていなかったため削除した。

### 2.1. 原因は作成方法が 2 系統あること

Claude Code の `--worktree` は接頭辞を自動で付ける。

```json
"orch:sonnet:work": "claude --agent specdojo-orchestrator --model sonnet --worktree claude-work"
```

`claude-work` と指定して `worktree-claude-work` が作られる。配置も `.claude/worktrees/` 配下に
なる。

他は `git worktree add` で、ディレクトリ名がそのままブランチ名になる。

```json
"orch:copilot:work": "git worktree add ../worktrees/copilot-work 2>/dev/null; copilot ..."
```

`worktree-codex-work` は script から作られたものではない。script は `codex-work` を指定して
おり、実在するブランチと一致しない。過去に Claude Code 経由で作られたか手動で作られたものと
推測する。

## 3. 命名規則の案

リポジトリは既にスラッシュ区切りの名前空間を使っている。

```text
exec/prj-0001-PJR-BKQ0
project/prj-0001/develop
feature/prj-0001/register-item-file-as-ssot
docs/revise-contents-guilde
```

`worktree-claude-work` だけがハイフン区切りで、この慣例から外れる。

| 案                         | 例                        | 評価                   |
| -------------------------- | ------------------------- | ---------------------- |
| 接頭辞なし                 | `codex-work`              | 用途が名前から読めない |
| `worktree-` ハイフン       | `worktree-codex-work`     | 既存の慣例と不一致     |
| **`worktree/` スラッシュ** | **`worktree/codex-work`** | **`exec/` と揃う**     |

スラッシュを推す理由は 3 点ある。

**名前空間が一貫する**。`exec/` が一時ブランチ、`worktree/` が常設の作業ブランチとして用途が
読める。

**git のツールが名前空間として扱える**。`git branch --list "worktree/*"` で一括列挙できる。
`exec/*` では実際にこの方法で残骸を検出した実績がある。

**補完とフィルタが効く**。多くの git UI がスラッシュを階層として表示する。

## 4. 判断が要る点

Claude Code の `--worktree` は接頭辞を強制する。`worktree/claude-work` にできない可能性が高い。

| 案                                    | 内容                            |
| ------------------------------------- | ------------------------------- |
| Claude も `git worktree add` へ揃える | `--worktree` を使わず自前で作る |
| Claude だけ例外とする                 | `worktree-claude-work` のまま   |

前者を推すが、`--worktree` が持つ機能（自動 cd など）を失う可能性があり実機での検証が要る。

## 5. 完了条件

- エージェント作業用 worktree のブランチ命名規則が決まっている。
- 既存のブランチが規則に従っている。`worktree-codex-work` と script の不整合が解消している。
- `package.json` の script が規則に沿って worktree を作る。script の指定と実際のブランチ名が
  一致する。
- Claude Code の `--worktree` の扱いが決まっている。規則から外れる場合はその理由が記録されて
  いる。
- 命名規則が規範文書に記述されている。
- `tools/worktree/sync.sh` が改名後も動作する。

## 6. 作業内容

| No  | 作業                                     | メモ                      |
| --- | ---------------------------------------- | ------------------------- |
| 1   | 命名規則を決める                         | `worktree/` を推す        |
| 2   | Claude Code の `--worktree` の挙動を検証 | 接頭辞を回避できるか      |
| 3   | 既存ブランチを改名する                   | worktree の付け替えを伴う |
| 4   | `package.json` の script を揃える        |                           |
| 5   | 規範文書へ命名規則を記述する             |                           |
| 6   | `sync.sh` の動作を確認する               |                           |

## 7. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 8. 関連ドキュメント

- [[prj-0001:pjr-5hhs-exec-branch-not-deleted]]: `exec/*` ブランチの整理。名前空間の活用例。
