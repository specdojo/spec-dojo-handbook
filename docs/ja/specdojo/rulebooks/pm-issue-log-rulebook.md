---
specdojo:
  id: specdojo:pm-issue-log-rulebook
  type: rulebook
  status: draft
  sample: specdojo:pm-issue-log-sample
  template: specdojo:pm-issue-log-template
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 80
    graded_at: "2026-09-03T03:02:21.178Z"
    graded_by: gemma-expert-executor
    content_hash: 6aa58ddb78754ce33b3679d2ef7e32aa775729128e9ede3f71e79acbb5ad1b97
    categories:
      consistency: { score: 63 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 63 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 4, score: 100 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 2, minor: 0, note: 0 }
---

# 課題ログ 作成ルール

Issue Log Documentation Rules

本ドキュメントは、`課題ログ` を一貫した粒度で作成するためのルールを定義する。

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency 参照先の template (`specdojo:pm-issue-log-template`) が異なる rulebook ID を指定しており、かつ構造（派生ビュー）が本ルールブックの記述ルールと根本的に矛盾している。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-kata-conformance 連携するテンプレートファイルの内容が、本ルールブックで定義する構成を無視して自動生成ビューとして定義されており、実効的な乖離がある。 -->

## 1. 全体方針

- 発生課題の特定、優先度判断、対応状況を追跡可能に管理する。
- 課題ごとにID、期限、担当、状態、次アクションを明確にする。
- 曖昧表現を避け、未解決課題の判定が可能な記述にする。

## 2. 位置づけと用語定義（必要に応じて）

- `pm-plan`: 全体管理方針。
- `pm-risk-register`: 潜在リスクの管理。
- `pm-issue-log`: 顕在化した課題の管理。

## 3. ファイル命名・ID規則

- `id` は `pm-issue-log` を使用する。
- ファイル名は `pm-issue-log-課題ログ.md` など一意にする。

## 4. 推奨 Frontmatter 項目

| 項目       | 説明                             | 必須 |
| ---------- | -------------------------------- | ---- |
| id         | `pm-issue-log`                   | ○    |
| type       | `project` 固定                   | ○    |
| status     | `draft` / `ready` / `deprecated` | ○    |
| based_on   | 根拠仕様ID（配列）               | 任意 |
| supersedes | 置換関係ID（配列）               | 任意 |

## 5. 本文構成（標準テンプレ）

| 番号 | 見出し           | 必須 |
| ---- | ---------------- | ---- |
| 1    | 概要             | ○    |
| 2    | 課題ログ一覧     | ○    |
| 3    | 優先度と期限     | ○    |
| 4    | 対応計画         | ○    |
| 5    | 進捗レビュー     | ○    |
| 6    | 関連ドキュメント | ○    |

## 6. 記述ガイド

### 6.1. 概要

- 管理対象、レビュー頻度、更新責任者を 1〜3 行で示す。

### 6.2. 課題ログ一覧

- 課題ID、発生日、内容、優先度、対応策、担当、期限、ステータスを一覧化する。

推奨フォーマット（表）:

| 課題ID | 発生日 | 内容 | 優先度 | 対応策 | 担当 | 期限 | ステータス |
| ------ | ------ | ---- | ------ | ------ | ---- | ---- | ---------- |

### 6.3. 優先度と期限

- 優先度基準、期限設定ルール、期限超過時対応を明記する。

### 6.4. 対応計画

- 対応策、依存事項、完了条件を明記する。

### 6.5. 進捗レビュー

- レビュー周期、判定観点、更新ルールを明記する。

### 6.6. 関連ドキュメント

- `pm-risk-register`、`pm-change-request-log` への導線を記載する。
- 関連がない場合でも `（本書のみ）` を明記する。

## 7. 禁止事項

| 禁止事項                     | 理由                       |
| ---------------------------- | -------------------------- |
| 課題IDなしで記録する         | 追跡不能になるため         |
| 優先度・期限を未記載にする   | 対応順序が判断できないため |
| 状態更新ルールを未定義にする | 管理の一貫性が崩れるため   |
| 根拠のない完了判定を記載する | 品質低下を招くため         |
