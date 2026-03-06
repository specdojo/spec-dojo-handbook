---
id: specdojo-wbs-granularity
type: guide
status: draft
---

---

# SpecDojo WBS粒度設計（AI向け）

本ドキュメントは SpecDojo における **AI Agent 実行前提のWBS粒度設計**を定義する。

従来のPMBOKでは

> 人間が管理可能な粒度

が推奨されるが、SpecDojoでは

> **AI Agent が安全に自律実行できる粒度**

を採用する。

---

## 1. 基本原則

SpecDojoのWBSは次の原則に従う。

### 1.1. Deliverable Driven

タスクは **成果物を生成する単位**とする。

```text
Task = Deliverable生成
```

---

### 1.2. Atomic Execution

タスクは **1回の実行で完了可能な単位**とする。

AI Agentが

```text
claim → work → complete
```

を一度で実行できるサイズ。

---

### 1.3. Deterministic

タスクは **成功条件が明確**である必要がある。

例

```text
曖昧 ❌
APIを実装する

明確 ✔
login APIを実装する
```

---

### 1.4. File-Oriented

理想的には

```text
1 task = 1〜数ファイル変更
```

である。

---

## 2. 推奨タスクサイズ

SpecDojoでは次を推奨する。

| 粒度         | 推奨        |
| ------------ | ----------- |
| 作業時間     | 10分〜2時間 |
| 変更ファイル | 1〜5        |
| コード行数   | 10〜200     |
| テスト       | 必須        |

---

## 3. WBS階層

SpecDojoのWBSは **3階層**を推奨する。

```text
Milestone
Domain
Task
```

---

### 3.1. Milestone

大日程。

例

```text
MVP Release
User Authentication
Payment Integration
```

---

### 3.2. Domain

中日程。

例

```text
Auth API
Auth UI
Auth DB
```

---

### 3.3. Task

小日程。

例

```text
T-AUTH-API-010 create login endpoint
T-AUTH-API-020 validate password
T-AUTH-API-030 generate jwt token
```

---

## 4. 良いタスク例

例

```yaml
tasks:
  - id: T-AUTH-API-010
    name: create login endpoint
    duration_days: 0.25
    produces:
      - src/auth/login-controller.ts
```

理由

- 明確
- 小さい
- Deliverableあり

---

## 5. 悪いタスク例

例

```text
ユーザー認証を実装
```

問題

- 巨大
- 不明確
- 成果物不明

---

## 6. Task ID規則

推奨フォーマット

```text
T-<domain>-<component>-<number>
```

例

```text
T-AUTH-API-010
T-AUTH-API-020
T-AUTH-API-030
```

---

## 7. TaskとDeliverable

タスクは成果物を生成する。

例

```yaml
tasks:
  - id: T-AUTH-API-020
    produces:
      - src/auth/login-service.ts
      - tests/auth/login-service.test.ts
```

---

## 8. AI Agent実行モデル

AI Agentは次の手順で動作する。

```text
read ready.md
↓
claim task
↓
read produces
↓
generate files
↓
run tests
↓
complete
```

---

## 9. タスク分割指針

次の場合は **タスクを分割する**

### 9.1. ファイル数 > 5

### 9.2. 作業時間 > 2h

### 9.3. 複数責務

例

```text
Bad
create auth system

Good
create login endpoint
validate password
generate token
```

---

## 10. 自動タスク生成

SpecDojoでは将来的に

```text
Spec → WBS
```

の自動生成を想定する。

AIは

- API spec
- DB schema
- UI spec

からタスクを生成する。

---

## 11. 推奨タスク密度

目安

| プロジェクト | タスク数 |
| ------------ | -------- |
| 小           | 50       |
| 中           | 200      |
| 大           | 1000     |

---

## 12. Readyタスク最適化

Readyタスクは

```text
5〜20
```

程度が理想。

理由

- Agent並列実行
- 競合回避

---

## 13. Anti-pattern

避けるべき設計。

### 13.1. 巨大タスク

```text
Implement authentication system
```

### 13.2. 不明確タスク

```text
Improve performance
```

### 13.3. Deliverable不明

```text
Investigate bug
```

---

## 14. SpecDojo WBSの特徴

従来

```text
Task = 作業
```

SpecDojo

```text
Task = Deliverable生成
```

---

## 15. まとめ

SpecDojoのWBSは

```text
Small
Deterministic
Deliverable Driven
AI Executable
```

である必要がある。

これにより

```text
AI Agent 自律開発
```

が可能になる。

---
