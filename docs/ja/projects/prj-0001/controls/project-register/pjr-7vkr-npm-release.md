---
specdojo:
  id: prj-0001:pjr-7vkr-npm-release
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: high
  owner: ARC
  registered_at: "2026-09-09T15:38:56Z"
  due_on: "2026-09-30"
---

# PJR-7VKR specdojo を npm へ公開する

## 1. 概要

`specdojo` 0.1.0 は 2026-04-05 に公開済みだが、別リポジトリの初期実装で現在とは実質別物である。
同梱範囲を確定して 0.2.0 を公開する。

競合分析は [[prj-0001:pjr-36qg-competitive-landscape-and-release]] が note として保持する。本項目は
公開作業を扱う。

## 2. 公開の現状と同梱範囲

### 2.1. 現状

`specdojo` は 2026-04-05 に公開済みである。名前空間は確保されている。

| 項目       | 公開版（0.1.0）                              | 現在                |
| ---------- | -------------------------------------------- | ------------------- |
| ファイル数 | 18                                           | 581                 |
| 展開サイズ | 97 KB                                        | 5.2 MB              |
| homepage   | `specdojo-handbook/tree/main/tools/specdojo` | `specdojo/specdojo` |

公開版は別リポジトリの初期実装で、現在とは実質別物である。

### 2.2. 同梱範囲

`package.json` の `files` は次を含む。

```text
dist / docs/ja/specdojo / docs/specdojo / tools/docs/src / tools/docs/tsconfig.json
templates / README.md / LICENSE
```

#### 2.2.1. サイズは制約にならない

当初は 5.2 MB を過大と見て、除外や初回取得の仕組みを検討した。これは展開後の値で、実際の
配信量は 1.3 MB である。

```text
npm notice package size: 1.3 MB
npm notice unpacked size: 5.2 MB
npm notice total files: 583
```

同種の CLI と比べて小さい部類にあたる。

| パッケージ |  配信量 |
| ---------- | ------: |
| typescript |  ~11 MB |
| prettier   | ~3.5 MB |
| eslint     | ~2.5 MB |
| specdojo   |  1.3 MB |

サイズを理由に分離する必要はない。

#### 2.2.2. 初回取得方式を採らない理由

kata を後から取得する方式は、次の理由で採らない。

| 問題       | 内容                                                        |
| ---------- | ----------------------------------------------------------- |
| オフライン | `register add` にネットワークが必要になる。現在は不要       |
| 取得元     | GitHub raw は暗黙の依存。レート制限やリポジトリ移動で壊れる |
| 版のずれ   | CLI の版と kata の版が一致しない                            |
| 完全性     | checksum や署名を自前で用意することになる                   |

PJR-KK07 により kata を配置しない最小構成でも `register add` と `build` が動作する。オフラインで
完結する性質を、取得方式は損なう。

将来分離が必要になった場合は、取得方式ではなくパッケージ分割を採る。npm が版管理・完全性・
キャッシュを担うため、自前の取得機構が不要になる。

#### 2.2.3. 各対象の判断

| 対象                 | 判断     | 理由                                                     |
| -------------------- | -------- | -------------------------------------------------------- |
| `dist`               | 同梱     | `bin` が参照する実行本体。`src` は不要                   |
| `docs/specdojo`      | 同梱     | schema。検証に必要                                       |
| `docs/ja/specdojo`   | 同梱     | kata・templates・exec-templates・defaults                |
| `docs/en/specdojo`   | **除外** | `.gitkeep` のみで実質空。整備後に追加する                |
| `templates`          | 同梱     | `exec scaffold --provider` が `packageRoot` から解決する |
| `tools/docs/src`     | **一部** | 検証系のみ。文書サイト系は分離する                       |
| `README` / `LICENSE` | 同梱     |                                                          |

実行時に必要な範囲は次のとおりである。`src` が参照するパスから確認した。

| 用途                             | ディレクトリ            | サイズ |
| -------------------------------- | ----------------------- | -----: |
| `register add` / `catalog build` | `templates`             |   560K |
| plan / result 生成               | `exec-templates`        |   216K |
| 各種検証                         | `docs/specdojo/schemas` |   244K |
| `grade` の観点                   | `defaults`              |    56K |

残る `rulebooks` / `recipes` / `samples` / `standards` / `guides` は agent と利用者が読む。CLI の
動作には不要だが、kata の網羅範囲が SpecDojo の中核であるため同梱する。

`tools/docs/src` の扱いは [[prj-0001:pjr-9s8f-split-docs-site-package]] と
[[prj-0001:pjr-a12b-remove-dead-lefthook-docs-build]] で扱う。Mermaid 生成は Chromium を要する
ため分離し、呼び出し元のないスクリプトは削除する。

#### 2.2.4. 公開前に残る確認

- 同梱物の実地検証。`npm pack` した tarball を別環境へ展開し、最小構成で `register` /
  `catalog` / `exec scaffold` が動作することを確かめる。
- 注意書き付きの規範文書を同梱する判断。`docs-structure-guide.md` の
  `result によるトレーサビリティ` は見直し中である。
- kata の品質。`specdojo.grade` に記録済みで、評価済み・改善中として示せる。

### 2.3. 手順

```sh
npm version minor          # 0.1.0 -> 0.2.0
npm run build
npm pack --dry-run         # 同梱範囲を確認する
npm publish
```

認証は `npm login` で行う。2FA を有効にしている場合は publish 時にワンタイムパスワードを求め
られる。

### 2.4. 公開前に確認する事項

- `files` の同梱範囲が意図どおりか。`npm pack --dry-run` で確認する。
- `dist` が最新か。`npm run build` を実行してから publish する。
- `bin` の `specdojo` が動作するか。`npm pack` した tarball をローカルへインストールして確認
  できる。
- README が npm のページとして成立するか。GitHub 向けの記述が残っていないか。

## 3. VS Code Marketplace

詳細は [[prj-0001:pjr-0143-vs-code-marketplace]] に記載する。要点は次のとおりである。

- publisher ID は `specdojo` とする。Marketplace で未取得であることを確認済みである。
- 拡張の識別子 `publisher.name` は後から変更できない。
- Personal Access Token は Organization を All accessible organizations、Scopes を Marketplace の
  Manage で発行する。有効期限は既定 90 日である。
- `package.json` に `repository`、`license`、`icon` が未記載である。公開前に補う。

publisher の作成はブラウザ操作を要するため、人が行う。

## 4. 公開の判断

### 4.1. 急ぐ理由と急がない理由

急ぐ理由は、自分の他プロジェクトで使うためである。npm 経由でインストールできれば、リポジトリを
clone せずに利用できる。これは競合対策とは独立した動機である。

急がない理由は品質にある。kata の評価で全4種別の要修正が 137 件（58%）、うち sample は 69 件
（79%）である。

修正へ渡す経路は `maintenance` と `bootstrap` の exec テンプレートに存在する。ただし実際に
回した実績はなく、機能するかは未検証である。

### 4.2. 判断

kata の品質は公開の阻害要因にしない。`grade` の結果が frontmatter に記録されており、利用者は
品質を把握できる。評価済みで改善中という状態を示せる。

同梱範囲は `同梱範囲` で確定した。配信量は 1.3 MB で、サイズは阻害要因にならない。

publish の前に残るのは次の 2 点である。

- **導入後の導線**。README が npm 経由の利用を想定しておらず、`npm install` した利用者が次に
  何をすればよいか分からない。[[prj-0001:pjr-9m5n-npm-onboarding-path]] で扱う。導線がないまま
  公開すると、インストールした利用者が何もできない。
- **同梱物の実地検証**。`npm pack` した tarball を別環境で展開し、最小構成で動作することを
  確かめる。

文書サイト機能の分離（[[prj-0001:pjr-9s8f-split-docs-site-package]]）は publish の前提とはしない。
現状のまま公開しても動作する。ただし利用者が Mermaid 生成で Chromium の取得に直面するため、
早い段階で整理する価値はある。

## 5. 完了条件

- `files` の同梱範囲が `同梱範囲` の判断どおりに設定されている。`docs/en/specdojo` を含めず、
  `tools/docs/src` は検証系に限る。
- `npm pack` した tarball を別環境へ展開し、最小構成で `config init` / `register add` /
  `register build` / `exec scaffold --provider` が動作することを確認している。
- README から npm 経由の導入手順を辿れる。[[prj-0001:pjr-9m5n-npm-onboarding-path]] の完了が前提。
- `package.json` に `repository` / `license` が記載されている。
- 0.2.0 が npm へ公開され、`npm install specdojo` で導入できる。
- 導入した環境で `specdojo --help` が動作する。

## 6. 作業内容

| No  | 作業                            | メモ                               |
| --- | ------------------------------- | ---------------------------------- |
| 1   | `files` を確定する              | `docs/en/specdojo` を除外          |
| 2   | 同梱物を別環境で実地検証する    | tarball を展開して最小構成で動かす |
| 3   | `package.json` のメタ情報を補う | `repository` / `license`           |
| 4   | README の導線を確認する         | PJR-9M5N の完了を待つ              |
| 5   | 0.2.0 を publish する           |                                    |
| 6   | 導入して動作を確認する          |                                    |

## 7. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 8. 関連ドキュメント

- [[prj-0001:pjr-36qg-competitive-landscape-and-release]]: 競合状況の観測。
- [[prj-0001:pjr-9m5n-npm-onboarding-path]]: 導入後の導線。公開の前提。
- [[prj-0001:pjr-9s8f-split-docs-site-package]]: 文書サイト機能の分離。公開の前提としない。
- [[prj-0001:pjr-0143-vs-code-marketplace]]: VS Code 拡張の公開。
