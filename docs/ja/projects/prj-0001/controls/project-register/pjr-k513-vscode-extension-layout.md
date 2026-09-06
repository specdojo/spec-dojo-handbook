---
specdojo:
  id: prj-0001:pjr-k513-vscode-extension-layout
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: medium
  owner: ARC
  registered_at: "2026-09-06T00:09:45Z"
  due_on: "2026-09-30"
---

# PJR-K513 VS Code 拡張の配置とビルド成果物の扱いを整える

## 1. 概要

`tools/vscode-specdojo` の配置とビルド成果物の扱いが他と揃っていない。Marketplace へ公開する
前に整える。[[prj-0001:pjr-gx9d-vscode-extension-consolidation]] の前提となる。

## 2. 現状

### 2.1. ビルド成果物が git 管理下にある

`vsix` が追跡対象に含まれる。

```text
tools/vscode-specdojo/package-lock.json
tools/vscode-specdojo/package.json
tools/vscode-specdojo/src/extension.ts
tools/vscode-specdojo/tsconfig.json
tools/vscode-specdojo/vscode-specdojo-0.1.0.vsix   ← ビルド成果物
```

同じディレクトリの他の成果物は除外されている。

| 対象                                  | `.gitignore` | 実際     |
| ------------------------------------- | ------------ | -------- |
| `tools/vscode-specdojo/node_modules/` | あり         | 除外     |
| `tools/vscode-specdojo/out/`          | あり         | 除外     |
| `*.tsbuildinfo`                       | あり         | 除外     |
| **`*.vsix`**                          | **なし**     | **追跡** |

ビルド成果物の扱いが一貫していない。vsix はバージョンごとにファイル名が変わるため、公開を
重ねるとリポジトリに古い成果物が積み上がる。バイナリのため差分も取れない。

### 2.2. ルートからビルドできない

`tools/vscode-specdojo` はルートの package.json に属さない独立 package である。`tools/` 配下で
独立 package を持つのはここだけで、他はルートの script から実行されるスクリプト群である。

| 経路                          | 状態                                      |
| ----------------------------- | ----------------------------------------- |
| `tsconfig.json` の references | 含まれる。`npm run typecheck` の対象      |
| npm workspaces                | 未設定。依存は個別に `npm install` が要る |
| ルートのビルド script         | なし                                      |

型検査だけがルートから届き、依存インストールとビルドは手作業になる。公開のたびに手順を
思い出す必要があり、再現性がない。

### 2.3. 配置そのものの妥当性

`tools/` は補助スクリプトの置き場であり、配布物の置き場ではない。拡張は Marketplace で配布する
独立した成果物であり、性質が異なる。ただし配置を変えると `tsconfig.json` の references や
`.gitignore` の記述も追従が要るため、移動の是非は費用と便益で判断する。

## 3. 完了条件

- `vsix` が git の追跡対象から外れている。既存の追跡ファイルも削除されている。
- `.gitignore` に `*.vsix` が追加され、他のビルド成果物と扱いが揃っている。
- ルートから拡張の依存インストールとビルドを実行できる。手順が npm script として存在する。
- vsix の生成もルートの script から実行できる。
- 配置を変えるかどうかが判断され、根拠が記録されている。変えない場合もその理由を残す。
- `npm run typecheck` が引き続き通る。

## 4. 検討事項

- npm workspaces を導入するか、拡張用の script をルートへ追加するだけに留めるかを決める。
  workspaces は依存の巻き上げが起きるため、拡張の vsix 生成に影響しうる。
- 配置を `tools/` から移すかを判断する。候補は `extensions/` や `packages/` だが、リポジトリに
  独立 package が1つしかない現状で階層を増やす利点は小さい。移動する場合は references と
  `.gitignore` の追従が要る。
- 既存の `vscode-specdojo-0.1.0.vsix` を履歴から除くかを決める。追跡を外すだけなら履歴に残る。
  公開前の成果物であり実害は小さいため、履歴の書き換えは行わない判断もありうる。

## 5. 作業内容

| No  | 作業                                | 担当 | 状態 | メモ                           |
| --- | ----------------------------------- | ---- | ---- | ------------------------------ |
| 1   | `.gitignore` へ `*.vsix` を追加する | ARC  | open | 他の成果物と揃える             |
| 2   | 追跡中の vsix を削除する            | ARC  | open | 履歴の扱いは検討事項で判断する |
| 3   | ルートからのビルド経路を用意する    | ARC  | open | workspaces か script か        |
| 4   | 配置の是非を判断して記録する        | ARC  | open | 変えない場合も理由を残す       |
| 5   | typecheck とビルドを確認する        | ARC  | open | -                              |

## 6. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 7. 関連ドキュメント

- [[prj-0001:pjr-gx9d-vscode-extension-consolidation]]: 集約方針。本項目はその前提。
- [[prj-0001:pjr-0143-vs-code-marketplace]]: 公開前に本項目を済ませる。
