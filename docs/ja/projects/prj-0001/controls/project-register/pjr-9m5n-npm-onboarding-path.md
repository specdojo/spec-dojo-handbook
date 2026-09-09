---
specdojo:
  id: prj-0001:pjr-9m5n-npm-onboarding-path
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: high
  owner: ARC
  registered_at: "2026-09-09T15:30:18Z"
  due_on: "2026-09-30"
---

# PJR-9M5N npm 導入後のセットアップ導線を整備する

## 1. 概要

`npm install specdojo` で導入した利用者が、インストール後に何をすればよいか分からない。
コマンドの配置と README の双方に問題がある。

## 2. 現状

### 2.1. コマンドの発見性

agent 設定を配置する機能が `exec` の下にある。

```sh
specdojo exec scaffold --provider <name>
```

`templates/<provider>/` を利用リポジトリへ複製する処理で、初期セットアップにあたる。しかし
`exec`（タスク実行）の配下にあるため、セットアップを探す利用者が到達しにくい。`config init` の
隣か、`init` 相当の入口が自然である。

`config` の配下には `init` しかなく、設定ファイルを作った後に何をするかの導線がない。

### 2.2. README が npm 利用を想定していない

`使い始める` の記載は次の 2 つのみである。

| 記載されている方法                                | npm 利用者にとって       |
| ------------------------------------------------- | ------------------------ |
| Use this template から作成する                    | 無関係                   |
| リポジトリを取得し `docs/ja/specdojo/` を取り込む | npm install の意味を失う |

`npm install` にも `specdojo` コマンドの実行にも言及がない。npm のページに表示されるのはこの
README であり、導入直後の利用者が最初に読む文書である。

## 3. 必要な導線

インストールから最初の成果までを一連で示す必要がある。

```text
npm install specdojo
specdojo config init
specdojo exec scaffold --provider <name>   ← 位置の見直し対象
specdojo register add --type todo --title "..."
specdojo register build
```

PJR-KK07 により、kata を配置しない最小構成でも `register add` と `register build` が動作する。
この事実を導線として示せる。

## 4. 完了条件

- README に npm 経由の導入手順がある。`npm install` から最初の `register add` までを通しで示す。
- agent 設定を配置するコマンドが、セットアップの導線として発見できる位置にある。
- 既存の `exec scaffold --provider` を移動または別名で公開する場合、従来の呼び出しが壊れないか、
  移行方法が示されている。
- `config init` の後に何をするかが、コマンドの出力または README から辿れる。
- 最小構成の利用者（kata を使わず register だけを使う）向けの導線が示されている。
- 記載した手順を実際に空のリポジトリで実行し、通ることを確認している。

## 5. 作業内容

| No  | 作業                                 | メモ                             |
| --- | ------------------------------------ | -------------------------------- |
| 1   | セットアップ系コマンドの配置を決める | `init` の新設か `config` 配下か  |
| 2   | 移行方法を決める                     | 既存呼び出しの互換               |
| 3   | README へ npm 導入手順を追加する     | npm ページに表示される前提で書く |
| 4   | 空のリポジトリで手順を実地確認する   |                                  |

## 6. 判断が要る点

- `init` を新設するか、`config init` を拡張するか。後者は「設定ファイル生成」という現在の
  責務を超える。
- README をどこまで詳しくするか。詳細はガイドへ委ね、README は導線に徹する案がある。
- 英語 README の要否。npm の利用者層を考えると検討に値する。

## 7. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 8. 関連ドキュメント

- [[prj-0001:pjr-kk07-template-resolution-fallback]]: 同梱テンプレートの解決。最小構成の成立。
- [[prj-0001:pjr-36qg-competitive-landscape-and-release]]: npm 公開の段取り。
