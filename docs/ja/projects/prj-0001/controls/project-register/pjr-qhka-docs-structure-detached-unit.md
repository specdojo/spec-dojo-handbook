---
specdojo:
  id: prj-0001:pjr-qhka-docs-structure-detached-unit
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: medium
  owner: ARC
  registered_at: "2026-09-02T22:48:28Z"
  due_on: "2026-09-30"
---

# PJR-QHKA 別リポジトリ構成（Detached Unit）のドキュメント化

## 1. 概要

アプリのcommit履歴を汚さずにSpecdojoで管理する別リポジトリ構成（app1-specdojo/）のガイド・事例をdocs-structure-guide.mdに追記する。resultにapp commit hashを記録するトレーサビリティ方式も合わせて規定する。

## 2. 完了条件

- `docs-structure-guide.md` に「別リポジトリ構成（Detached Unit）」の節が追加されている。
- 別リポジトリ構成の概要・採用条件・ディレクトリレイアウト例が記載されている。
- result ファイルへの app commit hash 記録によるトレーサビリティ方式が記載されている。
- `npm run -s lint:md` が通る。

## 3. 作業内容

| No  | 作業                                              | 担当 | 状態 | メモ |
| --- | ------------------------------------------------- | ---- | ---- | ---- |
| 1   | docs-structure-guide.md に Detached Unit 節を追記 | ARC  | open | -    |
| 2   | commit hash によるトレーサビリティ方式の記述      | ARC  | open | -    |
| 3   | lint 確認                                         | ARC  | open | -    |

## 4. 対応結果

-

## 5. 関連ドキュメント

- [[specdojo:docs-structure-guide]]
