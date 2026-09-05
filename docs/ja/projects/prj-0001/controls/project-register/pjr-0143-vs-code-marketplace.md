---
specdojo:
  id: prj-0001:pjr-0143-vs-code-marketplace
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

# PJR-0143 VS Code拡張のMarketplace登録

## 1. 概要

`tools/vscode-specdojo` 拡張を Visual Studio Marketplace へ公開する。

[[prj-0001:pjr-gx9d-vscode-extension-consolidation]] で定めた集約方針の2番目にあたる。
[[prj-0001:pjr-0144-fmt-md-table-vs-code]] で拡張の機能が確定してから実施する。公開先が定まって
いないと導入手順を書けないため、[[prj-0001:pjr-0142-vs-code-specdojo]] より先に行う。

## 2. 現状

| 項目       | 内容                                    |
| ---------- | --------------------------------------- |
| 拡張名     | `vscode-specdojo`                       |
| バージョン | 0.1.0                                   |
| 配布       | `vscode-specdojo-0.1.0.vsix` の手動配布 |
| 発行者     | 未登録                                  |

利用者は vsix を入手して手動でインストールする必要がある。更新の通知も届かない。

## 3. 完了条件

- Visual Studio Marketplace に発行者が登録されている。
- 拡張が公開され、VS Code の拡張検索から見つかる。
- `package.json` に公開へ必要な項目（`publisher`、`repository`、`license`、`icon` など）が
  揃っている。
- 公開手順が文書化され、次回以降のバージョン更新を再現できる。
- 公開に使う認証情報の管理方法が定まっている。リポジトリへ含めない。
- 公開後の拡張をインストールし、`[[id]]` のリンク表示と表整形が動作することを確認している。

## 4. 検討事項

- 発行者アカウントの所有者を決める。個人か組織かで、以後の運用と権限移譲が変わる。
- バージョン付与の方針を決める。拡張のバージョンを SpecDojo 本体と揃えるか、独立させるか。
- 公開の自動化の要否を判断する。手動公開で始め、頻度が上がってから CI を検討してもよい。
- ライセンスと利用条件を確認する。Marketplace の公開には明示が要る。

## 5. 作業内容

| No  | 作業                              | 担当 | 状態 | メモ                       |
| --- | --------------------------------- | ---- | ---- | -------------------------- |
| 1   | 発行者を登録する                  | ARC  | open | 所有者を先に決める         |
| 2   | `package.json` の公開項目を揃える | ARC  | open | publisher、repository ほか |
| 3   | 認証情報の管理方法を定める        | ARC  | open | リポジトリへ含めない       |
| 4   | 公開して動作を確認する            | ARC  | open | インストールして検証する   |
| 5   | 公開手順を文書化する              | ARC  | open | 再現できる形にする         |

## 6. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 7. 関連ドキュメント

- [[prj-0001:pjr-gx9d-vscode-extension-consolidation]]: 集約方針。本項目はその2番目。
- [[prj-0001:pjr-0144-fmt-md-table-vs-code]]: 先行して完了させる。
- [[prj-0001:pjr-0142-vs-code-specdojo]]: 本項目の完了後に実施する。
