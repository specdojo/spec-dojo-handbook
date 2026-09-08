---
specdojo:
  id: specdojo:pm-organization-template
  type: template
  status: ready
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:pm-organization
      type: project
      status: draft
      rulebook: specdojo:pm-organization-rulebook
      based_on:
        - _PROJECT_ID_:prj-overview
        - _PROJECT_ID_:prj-stakeholder-register
      supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 68
    graded_at: "2026-09-06T11:17:05.005Z"
    graded_by: codex-expert-executor
    content_hash: 6fc581b32807aa4bc69df0268b8ca3929024402efced39d84ed425a6fcd6bda6
    categories:
      consistency: { score: 50 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 5, minor: 1, note: 0 }
---

# 組織定義: _PROJECT_NAME_

## 1. 組織モデル

_TODO_: プロジェクト規模、兼務方針、当事者・利用者の確認、人間とAI Agentの境界を記述する。

| 責任領域 | 設計方針 | 最終判断 | 実行・確認 |
| -------- | -------- | -------- | ---------- |
| _TODO_   | _TODO_   | _TODO_   | _TODO_     |

## 2. ロール・owner方針

- _TODO_: Schedule ownerとRACI列には採用済みRole codeだけを使う。
- _TODO_: Role codeの採用と専任member配置を区別する。
- _TODO_: 実行主体、兼務、Agent利用はメンバー定義へ委譲する。

## 3. 正本と責任境界

| 情報   | 正本   | 本書で扱うこと |
| ------ | ------ | -------------- |
| _TODO_ | _TODO_ | _TODO_         |

## 4. 見直し条件

| トリガー | 確認すること | 更新先 | 判断者 |
| -------- | ------------ | ------ | ------ |
| _TODO_   | _TODO_       | _TODO_ | _TODO_ |
