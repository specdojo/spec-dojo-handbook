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

4つの視点で比較する。判定は 2026-09-06 時点の公開情報に基づく。各ツールの内部実装まで確認して
いないため、「確認できなかった」は「存在しない」を意味しない。

### 3.1. 考え方のレベル

[[specdojo:specdojo-philosophy]] が掲げる3方針との対応である。

| 方針                   | Spec Kit           | Kiro                       | OpenSpec            | SpecDojo           |
| ---------------------- | ------------------ | -------------------------- | ------------------- | ------------------ |
| Docs as Code           | 仕様を Git で管理  | 仕様が正本、コードは生成物 | Markdown を repo へ | 同左               |
| Kata（実践の型）       | テンプレートあり   | steering files             | 規約は薄い          | 4種別を体系化      |
| Human & AI Readability | 構造化テンプレート | EARS 記法                  | 差分仕様            | Frontmatter + 本文 |

**類似**: 「仕様を正本とし、コードを生成物として扱う」思想は Kiro と一致する。Git で管理し
機械検証する点は3ツールとも共通で、独自性はない。

**独自**: philosophy を文書種別として持ち、規約の設計理由を standard と分離している点。他は
規約（何をするか）を持つが、判断原則（なぜそうするか）を独立した正本として扱う構造は確認
できなかった。`2.6. 簡潔さと文章量を責務に合わせる` のように、AI が冗長な文章を書く傾向へ
対処する原則を明文化している点も見当たらない。

**劣位**: 思想の記述量が多い。philosophy だけで 177 行あり、導入時の学習コストが Spec Kit の
`Spec → Plan → Tasks → Implement` の4語より明らかに高い。OpenSpec は「5コマンド、Markdown だけ」
を掲げており、参入障壁の低さで劣る。

### 3.2. kata / ryu / waza の体系

| 観点             | Spec Kit     | Kiro           | OpenSpec   | SpecDojo             |
| ---------------- | ------------ | -------------- | ---------- | -------------------- |
| 型の種別数       | テンプレート | steering files | 規約は最小 | 8種別（うち kata 4） |
| 参照度合いの制御 | 確認できず   | 確認できず     | 確認できず | `approach` で切替    |
| 型自体の品質管理 | 確認できず   | 確認できず     | 確認できず | `grade`              |

**類似**: 「AI へ持続的な文脈を与える」目的は Kiro の steering files と同じである。プロジェクト
の規約、採用ライブラリ、アーキテクチャ判断を Markdown で与え、毎回の説明を不要にする点は共通
する。

**独自**: 型を rulebook / recipe / sample / template の4種別へ分け、それぞれが答える問いを
区別している点。「何を書くか」「どう作るか」「どの形から始めるか」「完成形はどうなるか」を
別文書とする構造は他に見当たらない。`approach` で参照度合いを切り替え、成熟度に応じて
`fully-guided` から `retrofit` まで変える仕組みも確認できなかった。

型自体を継続評価する `grade` も独自である。他ツールはテンプレートを提供するが、その品質を測る
仕組みは持たない。

**劣位**: 種別が多い。8種別のうち kata 4種別を成果物ごとに揃える負担は大きい。本リポジトリで
301文書に達しており、走査で sample の40%が `fail` と判定された事実は、体系の維持コストが
高いことを示す。Spec Kit や OpenSpec の「テンプレート1つ」の方が導入は容易である。

### 3.3. 遂行体系

`register → exec / timeline → schedule → exec / routine / grade` の連携である。

| 機能           | Spec Kit   | Kiro         | OpenSpec       | SpecDojo          |
| -------------- | ---------- | ------------ | -------------- | ----------------- |
| 課題の登録簿   | 確認できず | 確認できず   | 確認できず     | `register`        |
| 実行の状態追跡 | 確認できず | 確認できず   | 提案/実行/保管 | 遷移イベント      |
| スケジュール   | 確認できず | タスク依存順 | 確認できず     | `schedule`（CPM） |
| 定期実行       | 確認できず | agent hooks  | 確認できず     | `routine`         |
| worktree 隔離  | 確認できず | 並列実行あり | 確認できず     | `exec --worktree` |
| 品質の継続評価 | 確認できず | 確認できず   | 確認できず     | `grade`           |

**類似**: OpenSpec の `propose` / `apply` / `archive` は状態遷移を持ち、提案・実行中・アーカイブ
済みの監査証跡を保つ。SpecDojo の登録簿の `open` → `close` に相当する。Kiro の agent hooks は
ファイル変更で agent タスクを起動する点で `routine` と目的が重なる。

**独自**: 実行を登録簿の状態遷移として記帳し、`start` の actor に実行した agent 名を残す構造。
本セッションで実際に、私が経路を外れて実装した際に記録が欠落し、やり直した経緯がある。この
検知が働くのは記帳が仕組みとして組み込まれているためである。

worktree の統合失敗から統合段だけを再試行する経路（PJR-Y0AH）、agent の設定変更を止めて申し
送りを自動記録する保護機構（PJR-VH6R）も確認できなかった。

CPM によるスケジュール生成は、SDD ツールというよりプロジェクト管理ツールの領域である。この
組み合わせ自体が特徴といえる。

**劣位**: 機能が多く、全体像の把握に時間がかかる。本セッションだけで統合の欠陥を3件（PJR-REDS、
PJR-E6QJ、PJR-G1QZ）発見しており、機能量に対して成熟度が追いついていない。Spec Kit は38統合、
OpenSpec は25以上の AI アシスタントへ対応するが、SpecDojo は `pm-members.yaml` で定義した
agent に限られる。

### 3.4. local LLM の活用

| 観点                   | Spec Kit   | Kiro           | OpenSpec   | SpecDojo             |
| ---------------------- | ---------- | -------------- | ---------- | -------------------- |
| agent 中立             | 38統合     | Bedrock 前提   | 25以上     | provider 設定で追加  |
| local LLM              | 確認できず | 確認できず     | 確認できず | opencode 経由で利用  |
| 役割別のモデル使い分け | 確認できず | Sonnet と Nova | 確認できず | executor/reporter 別 |
| 同時実行の制御         | 確認できず | 確認できず     | 確認できず | `max_concurrency`    |

**類似**: Kiro はタスク種別でモデルを切り替える。仕様生成に Claude Sonnet、コード生成に Amazon
Nova を使う。SpecDojo の executor と reporter の使い分けと発想が近い。

**独自**: local LLM を実運用の段として組み込んでいる点。本セッションの走査では、1段目と2段目を
gemma（Ollama）、3段目を codex で実行し、codex 呼び出しを rulebook で72%削減した。ローカル
モデルの制約（メモリ競合、モデルロード待ち）を `max_concurrency: 1` として設定へ落としている
点も、実運用での知見が反映されている。

Kiro は Bedrock 前提でベンダーロックインの指摘がある。Spec Kit と OpenSpec は agent 中立だが、
local LLM を前提とした段構成やリソース制御は確認できなかった。

**劣位**: 対応 agent 数で劣る。Spec Kit と OpenSpec は導入時に agent を選べば同じテンプレートが
動くが、SpecDojo は `pm-members.yaml` と `exec-defaults.yaml` の両方を設定する必要がある。

### 3.5. 成果物 kata の網羅範囲

競合3ツールが提供する文書は次のとおりである。

| ツール   | 提供する文書                                             |  数 |
| -------- | -------------------------------------------------------- | --: |
| Kiro     | `requirements.md`（EARS 記法）、`design.md`、`tasks.md`  |   3 |
| OpenSpec | `proposal.md`、`specs/`、`design.md`（任意）、`tasks.md` |   4 |
| Spec Kit | 仕様、計画、タスクのテンプレート                         |   3 |

いずれも「機能単位の変更」を1セットの文書で扱う設計である。要件、設計、タスクの3点セットが
基本形で、ツール間の差は記法（EARS）や粒度（差分仕様）にある。

SpecDojo の rulebook は 106 件あり、成果物の種類ごとに分かれている。

| 領域             | 例                                                                |
| ---------------- | ----------------------------------------------------------------- |
| 業務・要件       | `bac`（受入基準）、`br`（業務ルール）、`bes`/`bps`（業務モデル）  |
| 仕様             | `ifx-api`/`ifx-cmd`/`ifx-file`/`ifx-msg`（インタフェース）、`sac` |
| 設計             | `sysd`（システム設計）、`cxd`/`cnd`/`cpd`/`cdfd`（C4 各層）       |
| データ           | `bdd`/`ccd`/`cld`/`cstd`/`cdsd`（データモデル各種）               |
| 実装・テスト     | `imp-*`（実装方針5種）、`utc`/`itc`/`stc`/`atc`（テスト各層）     |
| トレーサビリティ | `trc-requirements-to-specs`、`trc-requirements-to-tests`          |
| プロジェクト管理 | `prj-*`（憲章、スコープ、前提制約）、`pm-*`（体制、計画、RACI）   |

**独自**: この網羅範囲を持つ競合は確認できなかった。競合は「機能単位の変更」を扱うのに対し、
SpecDojo は「プロジェクト全体の成果物体系」を型化している。C4 モデルの各層、データモデルの
5種類、テストの4層、トレーサビリティ行列をそれぞれ独立した kata として持つ構成は見当たらない。

さらに各 rulebook に recipe / sample / template が対応し、1つの成果物種別あたり最大4文書の
kata が用意される。「どう書くか」「完成形はどうか」「どの形から始めるか」を分けて提供する
構造も他にない。

**劣位**: 網羅範囲の広さが維持負担に直結する。237 件の kata を評価した結果、要修正は 137 件
（58%）であった。競合の3〜4文書に対し、SpecDojo は桁が違う量を保守する必要がある。

また利用者から見ると、106 種類の成果物のうちどれを使うかの判断が要る。競合は「まず
requirements.md を書く」で始められるが、SpecDojo は成果物カタログの設計から入る。

### 3.6. 開始の容易さ

「いつでもどこからでも始められる」という利点について検討する。

**そのとおりである根拠**:

- `approach` に `retrofit` があり、既存の成果物を後から型へ寄せられる。OpenSpec も brownfield
  対応を掲げるが、こちらは「変更を差分仕様として記録する」方式で、既存文書そのものを型へ
  合わせる仕組みではない。
- 成果物カタログで必要な成果物だけを宣言できる。106 種類すべてを作る必要はない。
- philosophy の `2.7. 小さく始めて、必要に応じて拡張する` が方針として明記されている。

**留保が要る点**:

- 「どこからでも」は成果物カタログを設計してからである。`dct-*.yaml` で何を作るかを宣言する
  工程が先にあり、ここが競合の「まず requirements.md を書く」より重い。
- 106 種類から選ぶ判断が利用者に委ねられる。選定を助ける仕組み（推奨セット、規模別の
  プリセット）は確認していない。
- 本セッションで確認した限り、最小構成で始める手順を示した文書は見当たらない。
  [[specdojo:waza-guide]] が全体像を扱うが、これは「小さく始める」ための導線とは異なる。

したがって「いつでもどこからでも始められる」は設計思想としては正しいが、**それを支える導線が
現状では弱い**。retrofit や最小構成の手順を示せれば、競合に対する優位として主張できる。

### 3.7. 総合

| 区分         | 内容                                                                            |
| ------------ | ------------------------------------------------------------------------------- |
| 独自性が高い | 実行の記帳、品質の継続評価、local LLM の段構成、保護機構、**kata の網羅範囲**   |
| 類似         | 仕様を正本とする思想、型による文脈供給、状態遷移による追跡                      |
| 劣位         | 学習コスト、体系の維持負担、対応 agent 数、機能量に対する成熟度、**開始の導線** |

SDD の入口機能では既存ツールに対抗しにくい。差別化の軸は次の3つと考えられる。

1. **成果物 kata の網羅範囲**。競合は機能単位の3〜4文書を扱うが、SpecDojo はプロジェクト全体の
   成果物体系を型化する。C4 各層、データモデル5種、テスト4層、トレーサビリティを含む。
2. **実行の記帳**。誰が何をいつ行ったかを登録簿の状態遷移として残す。監査可能性を要する組織に
   向く。
3. **品質の継続評価**。文書の劣化を検知する。長期運用する文書体系に向く。

一方、小規模で素早く始めたい用途では OpenSpec や Spec Kit が適する。SpecDojo は「小さく始める」
ことを philosophy で掲げているが、それを支える導線が弱い。ここを整えれば、網羅範囲の広さと
開始の容易さを両立できる。

この位置づけが妥当かは実際の利用者の反応を見ないと判断できない。

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

急がない理由は品質にある。kata の評価で全4種別の要修正が 137 件（58%）、うち sample は 69 件
（79%）である。

修正へ渡す経路は `maintenance` と `bootstrap` の exec テンプレートに存在する。ただし実際に
回した実績はなく、機能するかは未検証である。

### 6.2. 判断

kata の品質は公開の阻害要因にしない。`grade` の結果が frontmatter に記録されており、利用者は
品質を把握できる。評価済みで改善中という状態を示せる。

先に行うべきは同梱範囲の見直しである。5.2 MB が適切かを判断してから publish する。

## 7. 関連ドキュメント

- [[prj-0001:pjr-0143-vs-code-marketplace]]: Marketplace 公開の手順と発行者 ID の決定。
- [[prj-0001:pjr-gx9d-vscode-extension-consolidation]]: VS Code 拡張の集約方針。
- [[prj-0001:pjr-2w38-sample-quality-observation]]: kata の品質観測。
