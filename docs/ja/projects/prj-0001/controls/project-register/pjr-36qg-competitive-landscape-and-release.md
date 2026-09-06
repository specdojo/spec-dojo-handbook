---
specdojo:
  id: prj-0001:pjr-36qg-competitive-landscape-and-release
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: note
  item_status: open
  priority: high
  owner: ARC
  registered_at: "2026-09-06T13:53:16Z"
---

# PJR-36QG 競合状況と公開の段取り

## 1. 概要

Spec-Driven Development（SDD）領域の競合状況と、npm および VS Code Marketplace への公開手順を
記録する。公開の判断材料とする。

本 note は状況の変化に応じて更新する。終端させない。調査は 2026-09-06 時点である。

## 2. 競合の状況

### 2.1. 主要な3つ

| ツール   | 提供元     | 形態                 | 配布                                  |
| -------- | ---------- | -------------------- | ------------------------------------- |
| Spec Kit | GitHub     | CLI（Python）        | `uv tool install specify-cli`         |
| Kiro     | AWS        | IDE（Code OSS 派生） | 製品として提供                        |
| OpenSpec | Fission-AI | CLI（Node）          | `npm install -g @fission-ai/openspec` |

いずれも 2026 年時点で活発である。SDD は既に確立した領域で、後発として参入する位置にある。

### 2.2. Spec Kit

最も広く採用されている。無償、MIT、agent 中立で 38 の統合を持つ。Claude Code、Copilot、Gemini、
Cursor などへ対応する。ワークフローは `Spec → Plan → Tasks → Implement` である。

機能ごとに独立した仕様ファイルを保ち、機能間の相互作用を分析できる。greenfield（0→1）に最適化
されている。

### 2.3. Kiro

Amazon Bedrock 経由の Claude で動く agentic IDE である。要件、設計、タスクを生成し、人の承認を
経てからコードを書く。仕様が正本でコードは生成物という位置づけを取る。

固有の機能として次を持つ。

- **agent hooks**: ファイル変更やパイプラインイベントで agent タスクを自動実行する。IDE 内で
  動く GitHub Actions に近い。
- **steering files**: プロジェクトの規約、採用ライブラリ、アーキテクチャ判断を Markdown で
  持続的に与える。毎回の説明を不要にする。

要件は EARS 記法で書き、タスクは要件へ紐づく。3 フェーズのゲート（要件、設計、タスクと実行）で
人が承認する。

AWS 外では MCP カタログと並列実行の利点を失う。ベンダーロックインの指摘がある。

### 2.4. OpenSpec

軽量な spec レイヤーである。5 コマンド、`openspec/changes/` 配下の Markdown、20 以上の AI
アシスタントへ対応する。

`propose` / `apply` / `archive` の3コマンドで、提案、実行、履歴への移動を行う。提案、実行中、
アーカイブ済みの監査証跡を保つ。変更が追加・変更・削除した内容だけを記録する差分仕様を生成する。

brownfield（1→n）に最適化されている。既存コードベースの進化を扱う設計で、greenfield には
向かないとされる。

## 3. SpecDojo との比較

### 3.1. 重なる領域

仕様から実装への流れは3ツールとも持つ。SpecDojo の catalog、schedule、exec の一部はこれと重なる。

Kiro の steering files は SpecDojo の rulebook や standard に近い。OpenSpec の archive は
SpecDojo の登録簿の終端に近い。

後発として、この領域だけで差別化するのは難しい。

### 3.2. SpecDojo に固有と見られる点

調査した範囲で、次に相当する機能は確認できなかった。

| 機能                     | 内容                                                     |
| ------------------------ | -------------------------------------------------------- |
| **grade**                | 文書品質をルーブリックで継続評価し、finding を本文へ記録 |
| **登録簿による状態追跡** | 実行を `start` / `wait` / `review` / `close` で記帳      |
| **保護機構**             | agent の設定変更を止め、申し送りを自動記録               |
| **統合段の再開**         | executor と reporter 成功後、統合だけを再試行            |

`grade` について、文書品質のルーブリック評価は学術、臨床、教育の分野に事例がある。しかし開発
文書を継続評価し、指摘を本文の注釈として蓄積する OSS ツールは見つからなかった。

ただし検索の網羅性には限界がある。「存在しない」と断定はできない。

### 3.3. 位置づけの候補

SDD の入口機能では既存ツールに対抗しにくい。差別化の軸は「実行の記帳」と「品質の継続評価」に
あると考えられる。

- 実行を登録簿で追跡し、誰が何をいつ行ったかを残す。監査可能性を重視する組織に向く。
- 文書の品質を継続的に測り、劣化を検知する。長期運用する文書体系に向く。

この位置づけが妥当かは、実際の利用者の反応を見ないと判断できない。

## 4. npm への公開

### 4.1. 現状

`specdojo` は 2026-04-05 に公開済みである。名前空間は確保されている。

| 項目       | 公開版（0.1.0）                              | 現在                |
| ---------- | -------------------------------------------- | ------------------- |
| ファイル数 | 18                                           | 581                 |
| 展開サイズ | 97 KB                                        | 5.2 MB              |
| homepage   | `specdojo-handbook/tree/main/tools/specdojo` | `specdojo/specdojo` |

公開版は別リポジトリの初期実装で、現在とは実質別物である。

### 4.2. 同梱範囲の見直し

`package.json` の `files` は次を含む。

```text
dist / docs/ja/specdojo / docs/specdojo / tools/docs/src / tools/docs/tsconfig.json
templates / README.md / LICENSE
```

`docs/ja/specdojo` が 4.3 MB を占め、Markdown 380 件が含まれる。kata（rulebook、recipe、sample、
template）の全量である。

kata は SpecDojo の中核であり同梱は妥当だが、5.2 MB という規模が利用者にとって適切かは判断が
要る。除外する場合は、初回利用時に取得する仕組みが別途必要になる。

### 4.3. 手順

```sh
npm version minor          # 0.1.0 -> 0.2.0
npm run build
npm pack --dry-run         # 同梱範囲を確認する
npm publish
```

認証は `npm login` で行う。2FA を有効にしている場合は publish 時にワンタイムパスワードを求め
られる。

### 4.4. 公開前に確認する事項

- `files` の同梱範囲が意図どおりか。`npm pack --dry-run` で確認する。
- `dist` が最新か。`npm run build` を実行してから publish する。
- `bin` の `specdojo` が動作するか。`npm pack` した tarball をローカルへインストールして確認
  できる。
- README が npm のページとして成立するか。GitHub 向けの記述が残っていないか。

## 5. VS Code Marketplace への公開

詳細は [[prj-0001:pjr-0143-vs-code-marketplace]] に記載する。要点は次のとおりである。

- publisher ID は `specdojo` とする。Marketplace で未取得であることを確認済みである。
- 拡張の識別子 `publisher.name` は後から変更できない。
- Personal Access Token は Organization を All accessible organizations、Scopes を Marketplace の
  Manage で発行する。有効期限は既定 90 日である。
- `package.json` に `repository`、`license`、`icon` が未記載である。公開前に補う。

publisher の作成はブラウザ操作を要するため、人が行う。

## 6. 公開の判断

### 6.1. 急ぐ理由と急がない理由

急ぐ理由は、自分の他プロジェクトで使うためである。npm 経由でインストールできれば、リポジトリを
clone せずに利用できる。これは競合対策とは独立した動機である。

急がない理由は品質にある。kata の評価で sample の 40% が `fail`、要修正が 69 件（79%）である。
また [[prj-0001:pjr-9py9-maintenance-plan-findings]] が未解決で、評価はできるが修正へ渡す経路が
ない。

### 6.2. 判断

kata の品質は公開の阻害要因にしない。`grade` の結果が frontmatter に記録されており、利用者は
品質を把握できる。評価済みで改善中という状態を示せる。

先に行うべきは同梱範囲の見直しである。5.2 MB が適切かを判断してから publish する。

## 7. 関連ドキュメント

- [[prj-0001:pjr-0143-vs-code-marketplace]]: Marketplace 公開の手順と発行者 ID の決定。
- [[prj-0001:pjr-gx9d-vscode-extension-consolidation]]: VS Code 拡張の集約方針。
- [[prj-0001:pjr-2w38-sample-quality-observation]]: kata の品質観測。
- [[prj-0001:pjr-9py9-maintenance-plan-findings]]: 評価から修正への経路。
