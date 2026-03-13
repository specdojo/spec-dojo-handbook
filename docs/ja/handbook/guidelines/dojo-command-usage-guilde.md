---
id: dojo-command-usage-guide
type: guide
status: draft
---

# dojoコマンド利用ガイド

本ドキュメントでは、SpecDojo における **Gitベースのプロジェクト実行管理ツール `dojo` CLI** の利用方法を説明します。

`dojo` は以下を Git リポジトリ内で管理することを目的としています。

- スケジュール定義（`sch-*.yaml`）
- 実行イベント（`exec/events/*.json`）
- 実行状態・CPM等の生成物（`generated/`）

## 1. 概要

`dojo` は以下の機能を提供します。

- スケジュール定義の検証
- 実行イベントの記録
- 実行状態の生成
- Readyタスク抽出
- CPM（Critical Path Method）計算
- クリティカルパス算出
- スケジュール差分検出
- Agent安全実行（排他ロック）

## 2. ディレクトリ構成

例:

```text
repo-root/
├─ dojo.config.json
├─ .env
├─ docs/
│  └─ ja/
│     └─ sdh-ja-projects/
│        └─ prj-0001/
│           ├─ 060-schedule/
│           │  ├─ sch-milestones.yaml
│           │  ├─ sch-governance.yaml
│           │  ├─ sch-design.yaml
│           │  └─ sch-design-structure.yaml
│           │
│           └─ 070-execution/
│              ├─ exec/
│              │  ├─ events/
│              │  └─ .locks/
│              │
│              └─ generated/
│
└─ tools/
   └─ dojo/
```

## 3. 設定

### 3.1. dojo.config.json

複数プロジェクトを扱うための **プロジェクトレジストリ**です。

例:

```json
{
  "version": 1,
  "projects": {
    "shj-0001": {
      "schedule_path": "docs/ja/sdh-ja-projects/prj-0001/060-schedule",
      "execution_path": "docs/ja/sdh-ja-projects/prj-0001/070-execution"
    }
  }
}
```

`projects.<id>` には `schedule_path` と `execution_path` を必ず指定する。

`execution_path` は必須であり、`exec/events` / `generated` / `exec/.locks` の出力先を表す。

---

### 3.2. .env（任意）

ローカル開発者用の簡易設定。

```bash
DOJO_PROJECT=shj-0001
```

または

```bash
DOJO_SCHEDULE_PATH=docs/ja/sdh-ja-projects/prj-0001/060-schedule
DOJO_EXECUTION_PATH=docs/ja/sdh-ja-projects/prj-0001/070-execution
```

---

### 3.3. プロジェクトパス解決順序

`dojo` は schedule path と execution path を同じ入力元から解決します。

1. `--project` で指定したプロジェクト ID を `dojo.config.json` から解決
2. `DOJO_SCHEDULE_PATH` と `DOJO_EXECUTION_PATH` をセットで解決
3. `DOJO_PROJECT` で指定したプロジェクト ID を `dojo.config.json` から解決

- `--project` を使う場合は、`dojo.config.json` の `projects.<id>.schedule_path` と `projects.<id>.execution_path` を使う。
- `DOJO_PROJECT` を使う場合も、`dojo.config.json` に定義済みのプロジェクト ID から両方を解決する。
- 直接環境変数で指定する場合は、`DOJO_SCHEDULE_PATH` と `DOJO_EXECUTION_PATH` を両方指定する。

片方だけでは解決しない。

---

## 4. スケジュールファイル

スケジュールは YAML で管理します。

例:

```bash
sch-milestones.yaml
sch-auth.yaml
sch-auth-api.yaml
```

内容例:

```yaml
tasks:
  - id: T-AUTH-API-020
    name: implement login api
    duration_days: 2
    depends_on:
      - T-AUTH-API-010
```

---

## 5. 実行イベント

作業履歴は **append-only JSONイベント**として保存されます。

保存場所:

```bash
exec/events/
```

例:

```json
{
  "v": 1,
  "ts": "2026-03-05T03:10:00Z",
  "type": "claim",
  "task_id": "T-AUTH-API-020",
  "by": "agent-1",
  "msg": "start implementation"
}
```

## 6. 生成ファイル

`dojo exec build` により以下が生成されます。

```bash
generated/
├─ exec.jsonl
├─ state.json
├─ ready.md
├─ ready.json
├─ claim-next.json
├─ cpm.json
├─ cpm.md
├─ critical-path.md
├─ schedule-hash.json
├─ schedule-diff.md
└─ metadata.json
```

## 7. 初期セットアップ

`npm link` は使いません。

このリポジトリでは `npm install` 後に `tools/dojo` がビルドされ、VS Code 統合ターミナルでは `node_modules/.bin` が `PATH` に追加されます。新しいターミナルを開けば、以降は `npx` なしで `dojo` を直接実行できます。

```bash
npm install
dojo config init
```

VS Code 統合ターミナル以外では `PATH` が通らないため、必要に応じて以下を使ってください。

```bash
./node_modules/.bin/dojo config init
```

### config作成

```bash
dojo config init
```

### プロジェクト一覧

```bash
dojo project list
```

例:

```bash
shj-0001    docs/ja/sdh-ja-projects/prj-0001/060-schedule    docs/ja/sdh-ja-projects/prj-0001/070-execution
```

---

## 8. パス確認

```bash
dojo exec where --project shj-0001
```

出力例:

```bash
schedule-path: /repo/.../060-schedule
execution-path: /repo/.../070-execution
exec/events : .../070-execution/exec/events
generated   : .../070-execution/generated
scheduler-lock: .../070-execution/exec/.locks/scheduler.lock
```

---

## 9. 検証

```bash
dojo exec validate --project shj-0001
```

検証内容:

- スケジュール依存関係
- 循環依存
- イベントJSON構造
- task_id存在チェック

## 10. 生成

```bash
dojo exec build --project shj-0001
```

生成:

- state snapshot
- ready list
- ordered ready queue JSON
- next claim target JSON
- CPM
- schedule diff

`ready.md` は人間向けの ready 一覧で、`critical-first` の順序と `fifo` の順序を併記する。

`ready.json` は機械向けの ready キューで、strategy ごとの順序付き task ID と CPM 情報を持つ。

`claim-next.json` は strategy ごとの次の claim 対象を持つ。

## 11. 実行イベントコマンド

### claim

タスク開始

```bash
dojo exec claim \
  --project shj-0001 \
  --task T-AUTH-API-020 \
  --by agent-1 \
  --msg "start implementation"
```

### complete

タスク完了

```bash
dojo exec complete \
  --project shj-0001 \
  --task T-AUTH-API-020 \
  --by agent-1 \
  --msg "done"
```

### block

タスク停止

```bash
dojo exec block \
  --project shj-0001 \
  --task T-AUTH-API-020 \
  --by agent-1 \
  --msg "waiting for spec"
```

### unblock

停止解除

```bash
dojo exec unblock \
  --project shj-0001 \
  --task T-AUTH-API-020 \
  --by agent-2 \
  --msg "spec clarified"
```

### cancel

タスク取消

```bash
dojo exec cancel \
  --project shj-0001 \
  --task T-AUTH-API-020 \
  --by agent-1 \
  --msg "scope removed"
```

## 12. scheduler

自動タスク取得。

```bash
dojo exec scheduler --project shj-0001 --by agent-1
```

`dojo exec scheduler` は `critical-first` または `fifo` の戦略で `ready.json` / `claim-next.json` と同じ順序規則を使って claim 対象を選ぶ。

Dry-run:

```bash
dojo exec scheduler --dry-run
```

## 13. ロック

以下コマンドは **プロジェクトロック**を使用します。

- claim
- complete
- block
- unblock
- cancel
- scheduler

ロック位置:

```bash
exec/.locks/scheduler.lock
```

## 14. 状態遷移

状態:

```bash
todo
doing
blocked
done
cancelled
```

## 状態遷移表

| current | command  | next      | guard       |
| ------- | -------- | --------- | ----------- |
| todo    | claim    | doing     | 依存完了    |
| doing   | block    | blocked   | 同一actor   |
| blocked | unblock  | todo      | blockedのみ |
| doing   | complete | done      | 同一actor   |
| todo    | cancel   | cancelled | 可          |
| doing   | cancel   | cancelled | 同一actor   |
| blocked | cancel   | cancelled | 可          |

## 遷移図

```mermaid
stateDiagram-v2
[*] --> todo
todo --> doing : claim
doing --> blocked : block
blocked --> todo : unblock
doing --> done : complete
todo --> cancelled : cancel
doing --> cancelled : cancel
blocked --> cancelled : cancel
```

## 15. 推奨ワークフロー

```bash
dojo exec validate
dojo exec build
dojo exec scheduler --by agent-1
dojo exec complete ...
dojo exec build
```

## 16. lefthook例

```yaml
pre-commit:
  commands:
    validate:
      run: ./node_modules/.bin/dojo exec validate --project shj-0001

pre-push:
  commands:
    build:
      run: ./node_modules/.bin/dojo exec build --project shj-0001
```

## 17. Agent利用ガイド

推奨利用方法:

- schedulerで取得
- claimで開始
- completeで終了
- blockで停止

actor例:

```bash
agent-backend
agent-docs
agent-test
```

## 18. まとめ

`dojo` は以下を実現します。

- Gitネイティブなプロジェクト管理
- append-only実行ログ
- deterministic生成物
- safe multi-agent execution
- CPM / Critical Path計算
- schedule diff検出
- AI Agent向けタスク取得
