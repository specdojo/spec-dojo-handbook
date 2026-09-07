---
specdojo:
  id: specdojo:pm-risk-register-rulebook
  type: rulebook
  status: draft
  sample: specdojo:pm-risk-register-sample
  template: specdojo:pm-risk-register-template
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 71
    graded_at: "2026-09-03T05:09:17.412Z"
    graded_by: gemma-expert-executor
    content_hash: 563f7d3698f5d14970989cbd6f6664e68a2b5d61214082bcd5e6df0019788712
    categories:
      consistency: { score: 50 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 1, major: 2, minor: 1, note: 0 }
---

# リスク登録簿 作成ルール

Risk Register Documentation Rules

本ドキュメントは、`リスク登録簿` を一貫した粒度で作成するためのルールを定義する。

## 1. 全体方針

- 識別済みリスクの評価、対応、監視を追跡可能に管理する。
- リスクごとに発生確率、影響度、優先度、対応策、責任者を明記する。
- 曖昧表現を避け、対応着手判断が可能な記述にする。

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency テンプレート側で参照される rulebook が `specdojo:pjr-rulebook` となっており、本ルールブックと矛盾している。 -->

## 2. 位置づけと用語定義（必要に応じて）

- `pm-plan`: 全体管理方針。
- `pm-risk-register`: 潜在リスクの管理。
- `pm-issue-log`: 顕在化後の課題管理。

## 3. ファイル命名・ID規則

- `id` は `pm-risk-register` を使用する。
- ファイル名は `pm-risk-register-リスク登録簿.md` など一意にする。

## 4. 推奨 Frontmatter 項目

<!-- specdojo:finding id=F004 severity=minor rule=vp-ux-language-consistency 見出しでは「推奨 Frontmatter 項目」としているが、表内では「必須：○」と定義されており、表記が矛盾している。 -->

| 項目       | 説明                             | 必須 |
| ---------- | -------------------------------- | ---- |
| id         | `pm-risk-register`               | ○    |
| type       | `project` 固定                   | ○    |
| status     | `draft` / `ready` / `deprecated` | ○    |
| based_on   | 根拠仕様ID（配列）               | 任意 |
| supersedes | 置換関係ID（配列）               | 任意 |

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency テンプレートに、本節で定義されている必須本文構成（概要〜関連ドキュメント）が含まれておらず、整合性が取れていない。 -->
<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-kata-conformance 手動作成を前提とした本文構成ルールを定義しているが、対応するテンプレートは自動生成ビューの定義となっており、成果物の種別と責務が根本的に矛盾している。 -->

## 5. 本文構成（標準テンプレ）

| 番号 | 見出し           | 必須 |
| ---- | ---------------- | ---- |
| 1    | 概要             | ○    |
| 2    | リスク登録簿一覧 | ○    |
| 3    | 評価基準         | ○    |
| 4    | 対応計画         | ○    |
| 5    | モニタリング     | ○    |
| 6    | 関連ドキュメント | ○    |

## 6. 記述ガイド

### 6.1. 概要

- 管理対象、見直し頻度、責任者を 1〜3 行で示す。

### 6.2. リスク登録簿一覧

- リスクID、内容、発生確率、影響度、優先度、対応策、担当、ステータスを一覧化する。

推奨フォーマット（表）:

| リスクID | 内容 | 発生確率 | 影響度 | 優先度 | 対応策 | 担当 | ステータス |
| -------- | ---- | -------- | ------ | ------ | ------ | ---- | ---------- |

### 6.3. 評価基準

- 評価スケール、優先度算定ルール、再評価条件を記載する。

### 6.4. 対応計画

- 回避、低減、受容、移転の方針と具体対応を記載する。

### 6.5. モニタリング

- 監視周期、トリガー、状態更新ルールを記載する。

### 6.6. 関連ドキュメント

- `pm-issue-log`、`pm-change-request-log` への導線を記載する。
- 関連がない場合でも `（本書のみ）` を明記する。

## 7. 禁止事項

| 禁止事項                       | 理由                   |
| ------------------------------ | ---------------------- |
| リスクIDなしで記録する         | 追跡不能になるため     |
| 評価基準なしで優先度を決める   | 判断が恣意的になるため |
| 対応責任者を未記載にする       | 対応遅延が発生するため |
| モニタリング周期を未定義にする | 兆候を見落とすため     |
