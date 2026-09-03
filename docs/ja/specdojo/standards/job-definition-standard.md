---
specdojo:
  id: specdojo:job-definition-standard
  type: standard
  status: draft
---

# Job 定義標準

Job Definition Standard

`job-*.yaml` が担う責務の境界と、`task` の記述・agent 指名・検証の規約を定義します。Job は agent へ委譲する判断を定義するものとし、決定論的な手順は script または CLI へ置きます。

## 1. 目的・適用範囲

- 対象: プロジェクトの `jobs_path` 配下に置くすべての `job-*.yaml`。
- 目的: Job が「何を agent へ委譲するか」だけを表すようにし、手順の解釈へ agent の判断力を使わせないこと。
- 位置づけ: 本標準は Job Definition の規範を定める。実行モデル（Job Run、冪等性、checkpoint）の設計は `sysd-job-execution`、運用手順は `routine-operation-guide` と `command-reference` に委譲する。
- 機械検証: `docs/specdojo/schemas/v1/job.schema.yaml` を SSOT とし、本文では制約を二重定義しない。

## 2. 基本方針

- Job の責務は、agent への委譲単位を定義することに限る。実行順序、対象の列挙、繰り返しは Job の責務ではない。
- 決定論的な手順（分岐条件が事前に確定し、実行結果が入力から一意に決まる手順）は script または CLI へ実装し、Job からはその入口を1つ呼ぶ。
- 判断（観測した結果の解釈、失敗の切り分け、次の行動の提案）は agent へ委譲し、`task.description` にはその判断内容を書く。
- 委譲先の agent は nickname で指名する。`capabilities` / `proficiency` による間接指定は、指名が不要な場合に限る。
- 同じ入力に対して同じ Run を作れるよう、Job が使う値は `inputs`、`job_id`、`scheduled_at`、前回成功 checkpoint に限定する。

### 2.1. 判断と手順の切り分け基準

次の表で「手順」に該当する記述は `task.description` へ書かず、script または CLI へ移す。

| 区分 | 判定基準                                                   | 記述場所           | 例                                               |
| ---- | ---------------------------------------------------------- | ------------------ | ------------------------------------------------ |
| 手順 | 実行前に条件と順序が確定し、結果が入力から一意に決まる     | script / CLI       | 対象文書の列挙、段の順序制御、1件ごとの CLI 実行 |
| 手順 | 同じ操作を対象ごとに繰り返す                               | script / CLI       | 全件ループ、対象0件時の分岐                      |
| 判断 | 観測した結果を解釈し、複数の説明のどれが妥当かを選ぶ       | `task.description` | 失敗が rate limit か agent の失敗かの切り分け    |
| 判断 | 事実から次の行動（再開・見直し・エスカレーション）を決める | `task.description` | 閾値の見直し要否、再開可否の判断                 |
| 委譲 | どの agent に任せるか                                      | `task.agent`       | executor / reporter の nickname 指名             |

## 3. 規範本体

### 3.1. task.description の規約

- `task.description` には、agent が下すべき判断と、判断の根拠にする入力（コマンドの出力、生成ファイル）を書く。
- 決定論的な手順を自然言語で列挙してはならない。呼び出す入口（script または CLI）は1つに限り、その引数は `inputs` から解決する。
- 手順を分解して個別コマンドへ置き換えないことを明示する。これがない場合、agent は入口を再実装しうる。
- 判断できない事象について、推測で埋めず、観測した事実と未確認範囲を分けて報告することを求める。
- 対象が0件の場合の扱い（no-op）を記述する。

### 3.2. agent 指名の規約

- `task.agent.executor` に、成果物の編集・検証・コマンド実行を担当する agent の nickname を書く。
- result を executor が書かない構成（stage_role を持つ pipeline member）では、`task.agent.reporter` に reporter の nickname を書く。両方を指名した Run は executor → reporter の2段で実行され、result は reporter が書く。
- `task.agent.reporter` を省略した場合、executor が Job Run の result まで記入する。result を書かない agent を単独で指名してはならない。
- nickname は `pm-members.yaml` に登録済みの `type: agent` のメンバーと完全一致させる。`job validate` は書式のみを検査するため、実在確認は `exec run --job --dry-run` で行う。
- `exec run --by` は単一 agent 実行としての単発の差し替え、`--executor-by` / `--reporter-by` は段ごとの差し替えとして、いずれも Job の指名より優先する。

### 3.3. 責務境界と粒度

- 1つの Job は1つの委譲単位に対応させる。同じ処理を条件違いで繰り返すために Job を分割してはならない。条件差は `inputs` で表す。
- 実行順序を Job の分割で表現してはならない。順序は script または CLI が持ち、routine の `action` 配列は独立した委譲単位の並びにだけ使う。
- Job は起動時刻を持たない。時刻条件は routine または外部スケジューラが持つ。
- Job は agent 実行エンジンを持たない。plan 生成、agent 選択、result、worktree、commit は `exec` 実行基盤へ委ねる。

### 3.4. inputs と冪等性

- `inputs` には、Run を一意にする値（期間、対象種別、上限件数）だけを置く。
- `run.idempotency_key` には、同じ論理実行を判別できる `inputs` をすべて含める。
- script の再開キー（run id 相当）に `inputs` を使う場合、その値が script 側の書式制約を満たすことを確認する。ISO 8601 の `scheduled_at` は記号を含むため、そのまま再開キーへ使わない。

## 4. 値制約・判定基準

| 項目                   | 必須 | 判定基準                                                           |
| ---------------------- | ---- | ------------------------------------------------------------------ |
| `id`                   | ○    | `job-<slug>` 形式で、ファイル名の拡張子を除いた部分と一致する      |
| `task.mode`            | ○    | `edit` または `review`                                             |
| `task.description`     | ○    | 判断内容を含み、決定論的手順の列挙を含まない                       |
| `task.targets` `paths` | ○    | いずれか一方以上が1件以上の文字列リスト                            |
| `task.agent.executor`  | 任意 | `pm-members.yaml` の nickname 書式（`^[a-z0-9][a-z0-9_-]{0,62}$`） |
| `task.agent.reporter`  | 任意 | 同上。executor が result を書かない構成では必須                    |
| `run.idempotency_key`  | ○    | 空文字へ解決されず、Run を一意にする `inputs` を含む               |

## 5. 記述例

```yaml
task:
  mode: edit
  owner: ARC
  agent:
    executor: claude-expert-executor
    reporter: claude-reporter
  description: |
    次のコマンドをリポジトリルートで1回だけ実行する。対象の選択と繰り返しは
    このスクリプトの責務であるため、手順を分解して個別のコマンドへ置き換えない。

    tools/grade/run-per-document.sh --run-id {{job_id}}-{{inputs.period}}

    実行後に results.tsv と終了コードを読み、未完了の段の有無、失敗の切り分け、
    閾値の見直し要否を判断して報告する。対象が0件の場合は no-op と判断する。
  paths:
    - docs/ja/specdojo/rulebooks
```

## 6. 禁止事項

- 対象文書の列挙、段の順序制御、1件ごとの CLI 実行を `task.description` へ書かない。自然言語で書かれた script は Job の責務ではない。
- 実行順序を表すためだけに Job を分割しない（例: 1段目・2段目・3段目を別 Job にする）。
- `task.agent` を省略したまま、`capabilities` の間接指定だけで pipeline member を選ばせない。auto 選択の対象は stage_role を持たない agent に限られるため、指名なしでは解決できない。
- result を更新しない agent を `task.agent.reporter` なしで指名しない。Run が常に未記入 result で失敗する。
- `task.description` へ認証情報、秘密鍵、token を書かない。
- 検証済みでない外部入力（環境変数、任意コード実行）をテンプレート式で展開しない。

## 7. 運用・見直しルール

- `job-*.yaml` を変更した場合は `specdojo job validate --project <project-id>` を実行する。
- agent の指名を変更した場合は `specdojo exec run --job <job-id> --dry-run` で、解決された nickname とコマンドを確認する。
- Job を統廃合した場合は、参照する routine の `action` と運用ガイドの記述を同じ変更で更新する。
- script または CLI へ手順を移した場合は、移し先の入口と引数を `command-reference` に記載し、Job からはその入口だけを呼ぶ。
