# SpecDojo

SpecDojo は、仕様駆動開発のためのドキュメントフレームワークです。
プロダクトの構築・改修に必要な情報を体系化し、人と生成 AI が同じ成果物を作成・検証・更新できるようにします。

SpecDojo は、次のものをオープンソースのテンプレートリポジトリとして提供します。

- 成果物の記述規則、作成手順、テンプレート、サンプル
- プロジェクトとプロダクトの文書体系
- register、Schedule、実行、レビューを支援する CLI

日本語ドキュメントは [SpecDojo ドキュメントサイト](https://specdojo.github.io/specdojo/ja/) で公開しています。

## この README の役割

この README は、GitHub やパッケージページでリポジトリを訪れた人に、SpecDojo の概要、入手方法、詳しい文書への入口を示します。
文書体系や CLI 操作の詳細はここへ複製せず、ドキュメントサイトを正本とします。

## 使い始める

### npm で導入する

利用するプロジェクトのルートで、SpecDojo をローカル依存として導入し、設定を初期化します。

```sh
npm install specdojo
npx specdojo config init
```

`config init` は `.specdojo/specdojo.config.json` とその親ディレクトリを作成します。既定では
`prj-0001` と `docs/ja/projects/prj-0001/controls/project-register` を使う最小構成です。別の
project ID や配置を使う場合は、生成された設定の `current_project`、`projects` のキー、
`base_path` を次へ進む前に変更してください。

agent にタスクを実行させる場合は、利用する provider の設定を配置します。この手順は register
だけを使う最小構成では省略できます。

```sh
npx specdojo config scaffold --provider codex
```

`--provider` には `claude`、`codex`、`copilot`、`opencode` を指定できます。従来の
`npx specdojo exec scaffold --provider <name>` も互換入口として引き続き利用できます。

最初の登録簿と todo を作り、一覧を生成します。

```sh
npx specdojo register scaffold --project prj-0001
npx specdojo register add \
  --project prj-0001 \
  --type todo \
  --title "最初のタスク"
npx specdojo register build --project prj-0001
```

ここまでの手順は、利用側へ kata をコピーせずに実行できます。生成された todo の個票が編集対象、
`generated/pjr-index.md` が個票から作る一覧です。

### テンプレートリポジトリとして導入する

CLI だけでなく、プロジェクト文書体系一式を最初から配置する場合は、このリポジトリの
**Use this template** から新しいリポジトリを作成します。既存プロジェクトへ文書体系一式を
取り込む場合は、このリポジトリの `docs/ja/specdojo/` 配下を参照してください。

導入後の初期設定と、最初のタスクを完了するまでの手順は [Quick Start ガイド](https://specdojo.github.io/specdojo/ja/specdojo/guides/quick-start-guide.html) を参照してください。
全体像から確認する場合は [全体概要ガイド](https://specdojo.github.io/specdojo/ja/specdojo/guides/specdojo-overview-guide.html) を参照してください。

## ライセンス

本リポジトリは MIT ライセンスです。詳細は [LICENSE](LICENSE) を参照してください。

## フィードバック

Issue または Pull Request を歓迎します。
