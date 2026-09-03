---
specdojo:
  id: prj-0001:pjr-e6qj-worktree-generated-artifacts
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: high
  owner: ARC
  registered_at: "2026-09-03T10:21:23Z"
  due_on: "2026-09-30"
---

# PJR-E6QJ worktree 実行で生成物が用意されず親検証が失敗する

## 1. 概要

worktree 実行の準備処理は `npm ci` で依存を用意するが、生成物は作らない。生成物は
`.gitignore` の `docs/**/generated/*` により追跡対象外で、worktree へ複製されない。

そのため生成物の存在を前提とするテストが worktree では必ず失敗する。親 runner の
`test-unit` は成果物と無関係にこの失敗を検出し、agent の実行を block する。

PJR-5ERG で発生した。agent は成果物を1つも作らないまま停止し、result だけが残った。

```text
親 runner 検証 test-unit（npm run test:unit）が status=failed
  （tests/src/doc-index.test.ts ...）
```

```text
Generated project register index is missing or invalid:
  ja/projects/prj-0001/controls/project-register/generated/pjr-index.md
Run: specdojo register build before specdojo index build
```

PJR-VH6R でも同じ失敗が起きていた。そのときは orchestrator が worktree で
`register build` と `index build` を実行して回避し、テストが通ることを確認したが、
原因は残ったままだった。次の worktree 実行である PJR-5ERG で再発し、今度は agent が
着手前に停止した。

worktree を使うたびに再発する。実装の巧拙と無関係に実行が空振りするため、失敗の原因を
成果物の問題と切り分けにくい。

## 2. 影響範囲

現時点で worktree の `npm run test:unit` が失敗するのは1件である。

```text
tests/src/doc-index.test.ts > prj-0001 project register references
  > 個票の part_of と pjr-index wikilink が生成された登録台帳へ解決する
```

ただし生成物を参照するテストは他にもあり、対象が広がる可能性がある。

- `tests/src/register.test.ts`
- `tests/src/register-commands.test.ts`
- `tests/src/exec-register-worktree.integration.test.ts`

## 3. 完了条件

- worktree 実行で、生成物を前提とするテストが失敗しない。
- 準備処理の失敗が、成果物の問題と区別できる形で報告される。
- 生成にかかる時間が worktree の準備を著しく遅らせない。
- 既存の worktree 準備（`npm ci` など）の挙動を壊さない。

## 4. 検討事項

- 準備処理で `register build` と `index build` を実行する案が素直だが、生成対象が増えたときに
  追従が要る。どの生成物を用意するかを設定で持つか、`specdojo build` 相当をまとめて呼ぶかの
  判断が要る。
- テスト側を「生成物が無ければスキップ」へ変える案もあるが、生成物と個票の整合を検証する
  目的が失われる。検証を弱める方向は避けたい。
- 生成物を追跡対象へ戻す案は、`.gitignore` の意図（VitePress build で再生成するため追跡しない）
  と衝突する。

## 5. 作業内容

| No  | 作業                                         | 担当 | 状態 | メモ                           |
| --- | -------------------------------------------- | ---- | ---- | ------------------------------ |
| 1   | worktree 準備処理の現状を調べる              | ARC  | open | `npm ci` の前後どこで足すか    |
| 2   | 用意する生成物の範囲を決める                 | ARC  | open | 設定で持つか一括生成か         |
| 3   | 準備処理へ生成を追加する                     | ARC  | open | 失敗時の報告を分かる形にする   |
| 4   | worktree で `test:unit` が通ることを確認する | ARC  | open | 実際の worktree 実行で検証する |
| 5   | 回帰テストを追加する                         | ARC  | open | 準備処理の契約を固定する       |

## 6. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 7. 関連ドキュメント

- [[prj-0001:pjr-5erg-orchestrator-body-sync]]: 本問題で実行が停止している項目。
- [[prj-0001:pjr-vh6r-agent-config-write-handoff]]: 同じ失敗を手動で回避した実行。
