---
specdojo:
  id: prj-0001:pjr-0144-fmt-md-table-vs-code
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: medium
  owner: ARC
  due_on: "2026-10-31"
---

# PJR-0144 fmt-md-table を VS Code 拡張へ統合

## 1. 概要

現在 `.vscode/tasks.json` のタスク `Format Markdown Table` として提供している `fmt-md-table` を、
`tools/vscode-specdojo` 拡張のコマンドとして提供する。

[[prj-0001:pjr-gx9d-vscode-extension-consolidation]] で定めた集約方針の1番目にあたる。拡張の
機能が確定しないと Marketplace へ公開できないため、公開より先に実施する。

## 2. 現状

| 要素       | 内容                                                             |
| ---------- | ---------------------------------------------------------------- |
| 実体       | `tools/docs/src/fmt-md-table.ts`（Node 標準のみに依存）          |
| 起動       | `npx tsx tools/docs/src/fmt-md-table.ts "${file}" ${lineNumber}` |
| 呼び出し元 | `.vscode/tasks.json` の `Format Markdown Table`                  |
| 引数       | 対象ファイルとカーソル行                                         |

実体が Node 標準ライブラリだけに依存するため、拡張への取り込みに技術的な障害はない。

## 3. 完了条件

- 拡張のコマンドとして表整形を実行でき、カーソル位置の表が整形される。
- コマンドは `specdojo.` 接頭辞を持ち、既存の `specdojo.openById` と命名が揃っている。
- 整形結果が `tasks.json` 経由の実行と一致する。同じ入力に対し同じ出力を返す。
- 整形処理の実装が拡張側へ移り、`tools/docs/src/fmt-md-table.ts` が残っていない。実装を二重に
  持たない。
- `.vscode/tasks.json` のタスクは当面残す。移行期間として維持し、撤去時期は別途判断する。
- 拡張の README または `package.json` の説明に、追加したコマンドが記載されている。
- 拡張のビルドが通り、vsix を生成できる。

## 4. 検討事項

- CLI 経路は残さない。呼び出し元が `tasks.json` だけで、npm script、hook、CI からの参照がなく、
  `export` も持たないためである。エディタ上のヘルパーであり CLI から使う実態がない。実装は
  拡張へ移し、`tools/docs/src/fmt-md-table.ts` は削除する。
- コマンドの起動方法を決める。キーバインドを割り当てるか、コマンドパレットからの実行に留めるか。
  現在のタスクはキーバインドを持たない。
- 整形対象の決定方法を確認する。現在はカーソル行を引数で渡している。拡張では選択範囲や複数表への
  適用も可能だが、まずは現行と同じ振る舞いに揃える。

## 5. 作業内容

| No  | 作業                          | 担当 | 状態 | メモ                   |
| --- | ----------------------------- | ---- | ---- | ---------------------- |
| 1   | 整形処理の共有方法を決める    | ARC  | open | バンドル制約を踏まえる |
| 2   | 拡張へコマンドを追加する      | ARC  | open | `specdojo.` 接頭辞     |
| 3   | CLI 経路の動作を確認する      | ARC  | open | 出力の一致を確認する   |
| 4   | 拡張の説明へ追記する          | ARC  | open | README か package.json |
| 5   | vsix を生成して動作を確認する | ARC  | open | -                      |

## 6. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 7. 関連ドキュメント

- [[prj-0001:pjr-gx9d-vscode-extension-consolidation]]: 集約方針。本項目はその1番目。
- [[prj-0001:pjr-0143-vs-code-marketplace]]: 本項目の完了後に実施する。
- [[specdojo:docs-editing-guide]]: 現行のタスク利用手順の記載先。
