---
id: specdojo-execution-model
type: guide
status: draft
---

# SpecDojo実行モデル

SpecDojo実行モデルは、以下を統合した **AI時代のプロジェクト実行モデル**である。

- PMBOK
- Git
- Event Sourcing
- AI Agent

SpecDojoでは、プロジェクトの実行状態を **すべてGit上の構造化データとして管理する**。

## 1. 設計思想

SpecDojoは次の原則に基づく。

### 1.1. Gitを唯一の真実（SSOT）とする

すべての情報はGitに保存する。

対象：

- 仕様
- スケジュール
- 実行履歴
- 意思決定
- 進捗状態

外部ツールへの依存は最小化する。

### 1.2. 実行状態はイベントソーシング

タスクの状態は **イベントログから再構築**する。

```text
exec/events/*.json
```

例

```bash
claim
block
complete
cancel
```

これにより

- 完全履歴
- 再現性
- AI解析

が可能になる。

### 1.3. スケジュールは宣言的

スケジュールは **YAMLで宣言**する。

```bash
sch-*.yaml
```

例

```bash
sch-milestones.yaml
sch-auth.yaml
sch-auth-api.yaml
```

ここには

- タスク
- 依存関係
- duration

を記述する。

### 1.4. 実行状態は生成物

実行状態は **生成物**であり、直接編集しない。

生成物：

```bash
generated/
```

例

```bash
state.json
ready.md
cpm.md
critical-path.md
```

## 2. データモデル

SpecDojoは **3層モデル**を採用する。

```bash
Plan Layer
Event Layer
Derived Layer
```

## 3. Plan Layer

Plan Layer は **計画情報**である。

```bash
sch-*.yaml
```

内容

- タスク
- milestone
- 依存関係
- duration

例

```yaml
tasks:
  - id: T-AUTH-API-020
    name: implement login api
    duration_days: 2
    depends_on:
      - T-AUTH-API-010
```

Plan Layerは **人間が編集する唯一の構造データ**である。

## 4. Event Layer

Event Layerは **実行履歴**である。

```bash
exec/events/*.json
```

イベントは **append-only**である。

例

```json
{
  "type": "claim",
  "task_id": "T-AUTH-API-020",
  "by": "agent-backend"
}
```

イベント種類

| type     | 意味       |
| -------- | ---------- |
| claim    | 作業開始   |
| complete | 完了       |
| block    | 停止       |
| unblock  | 停止解除   |
| cancel   | 取消       |
| note     | メモ       |
| link     | 外部リンク |
| estimate | 見積       |

## 5. Derived Layer

Derived Layerは **生成物**である。

```bash
generated/
```

生成例

```bash
state.json
ready.md
cpm.md
critical-path.md
schedule-diff.md
```

これは

```bash
Plan + Events
```

から生成される。

## 6. 状態モデル

タスクは次の状態を持つ。

```bash
todo
doing
blocked
done
cancelled
```

### 6.1. 状態遷移

| current | command  | next      |
| ------- | -------- | --------- |
| todo    | claim    | doing     |
| doing   | block    | blocked   |
| blocked | unblock  | todo      |
| doing   | complete | done      |
| todo    | cancel   | cancelled |
| doing   | cancel   | cancelled |
| blocked | cancel   | cancelled |

## 7. Readyタスク

Readyタスクとは

```plainText
依存タスクがすべてdone
```

のタスクである。

生成物

```bash
generated/ready.md
```

## 8. CPM（Critical Path Method）

SpecDojoはスケジュールから

```bash
ES
EF
LS
LF
Slack
```

を計算する。

生成物

```bash
generated/cpm.md
generated/critical-path.md
```

## 9. スケジュール差分

スケジュール変更はハッシュ比較で検出する。

```bash
generated/schedule-diff.md
```

これにより

- scope creep
- 変更履歴

を追跡できる。

## 10. 実行コマンド

主要コマンド

```bash
dojo exec validate
dojo exec build
dojo exec claim
dojo exec complete
dojo exec block
dojo exec cancel
dojo exec scheduler
```

## 11. Scheduler

Schedulerは **次に実行すべきタスクを決定する**。

戦略

```bash
critical-first
fifo
```

通常は

```bash
critical-first
```

を使用する。

## 12. 排他制御

複数Agentが同時実行できるように

```bash
exec/.locks/
```

でロック管理する。

対象コマンド

- claim
- complete
- block
- cancel
- scheduler

## 13. AI Agent統合

SpecDojoはAI Agentと自然に統合できる。

Agentの基本動作

```plainText
scheduler
↓
claim
↓
work
↓
complete
```

Agentは

```bash
ready.md
state.json
```

を読み取り判断する。

## 14. PMBOKとの対応

| PMBOK         | SpecDojo      |
| ------------- | ------------- |
| WBS           | sch-\*.yaml   |
| Schedule      | sch-\*.yaml   |
| Progress      | exec/events   |
| Issue log     | block         |
| Change log    | schedule diff |
| Status report | generated     |

## 15. 従来ツールとの違い

| 従来ツール   | SpecDojo        |
| ------------ | --------------- |
| Jira         | Git             |
| Issue        | Task YAML       |
| Activity log | Event log       |
| Dashboard    | Generated files |

## 16. 利点

SpecDojoは以下を実現する。

### 16.1. 再現性

すべてGitにある。

### 16.2. AI適合

AIが読みやすい。

### 16.3. 自動分析

CPM計算可能。

### 16.4. 分散開発

Git mergeで統合可能。

## 17. 典型的ワークフロー

```bash
dojo exec validate
dojo exec build

dojo exec scheduler --by agent-1
dojo exec claim ...

work

dojo exec complete ...

dojo exec build
```

## 18. 将来拡張

予定している拡張

- burn-down生成
- velocity計算
- AI planning
- risk detection
- auto replanning

## 19. まとめ

SpecDojoは

```plainText
Git + Event Sourcing + CPM + AI Agent
```

を統合した

**AI時代のプロジェクト実行モデル**

である。
