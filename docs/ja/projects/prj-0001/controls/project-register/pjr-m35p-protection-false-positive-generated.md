---
specdojo:
  id: prj-0001:pjr-m35p-protection-false-positive-generated
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: issue
  item_status: in-progress
  priority: high
  owner: ARC
  registered_at: "2026-09-07T22:29:10Z"
  due_on: "2026-09-30"
  block_reason: "agent exited with non-zero code: runner validation 'test-unit' failed: tests/src/exec-agent-protected-config.test.ts (21 tests / 1 failed) - records a git failure reason without copying the whole file"
---

# PJR-M35P 保護機構が gitignore 済みの生成物を設定変更として検知する

## 1. 概要

`agent-config-write` が `.specdojo/doc-index.json` の変更を保護対象の設定改変として検知し、
PJR-MBVM の統合をブロックした。

```text
blocked: agent-config-write: protected configuration changes detected;
paths=.specdojo/doc-index.json; agent must record the required handoff
```

同ファイルは `.gitignore` 済みの生成物である。`index build` が再生成するキャッシュであり、
commit されることもない。

```text
.gitignore:92             .specdojo/doc-index.json
src/exec-worktree.ts:300  // 生成物（docs/**/generated と .specdojo/doc-index.json）は .gitignore 済み
```

plan が `index build` を指示すれば必然的に変更されるため、同じブロックが繰り返し発生する。

## 2. 影響

PJR-MBVM は executor と reporter を完了していたが、統合前で停止した。成果物は worktree に
未コミットのまま残り、`--resume` による再開を要した。実装内容に問題はなく、保護機構の判定
だけが原因である。

自動記録された申し送りにも「変更理由: agent の記入なし」と残る。agent が意図的に設定を変えた
わけではないため、記入すべき意図が存在しない。申し送りとして情報価値がない記録が積まれる。

## 3. 併発する問題

保護機構が差分を取得しようとして失敗している。

```text
git diff failed: warning: Not a git repository. Use --no-index to compare two paths outside a working tree
```

差分を取得できず、代わりに対象ファイルの全内容を申し送りへ書き出している。生成物は大きい
ため、申し送りが読めなくなる。

```text
# .specdojo/doc-index.json: git 差分を取得できなかったため現在の内容を出力
--- /dev/null
+++ b/.specdojo/doc-index.json
```

## 4. 完了条件

- `agent-config-write` が `.gitignore` 済みの生成物を保護対象に含めない。
- `.specdojo/doc-index.json` を再生成する plan を実行しても、統合がブロックされない。
- 保護対象の判定基準が、追跡対象か生成物かを区別できる形で定義されている。
- 差分取得に失敗した場合に、全内容ではなく取得できなかった事実と理由を申し送りへ記録する。
- 上記を検証する単体テストを追加する。

## 5. 作業内容

| No  | 作業                                          | メモ                           |
| --- | --------------------------------------------- | ------------------------------ |
| 1   | 保護対象の判定から gitignore 済み生成物を除外 | 追跡対象かどうかで判定する     |
| 2   | 差分取得失敗時の申し送り出力を見直す          | 全内容の出力をやめる           |
| 3   | `git diff failed` の原因を特定して解消        | 実行時の作業ディレクトリを確認 |
| 4   | 単体テストを追加                              |                                |

## 6. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 7. 関連ドキュメント

- [[prj-0001:pjr-mbvm-grade-exclude-generated]]: このブロックで統合が止まった項目。
