---
specdojo:
  id: specdojo:pm-plan-template
  type: template
  status: ready
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:pm-plan
      type: project
      status: draft
      rulebook: specdojo:pm-plan-rulebook
      based_on:
        - _PROJECT_ID_:prj-overview
        - _PROJECT_ID_:prj-scope
        - _PROJECT_ID_:prj-success-criteria-and-acceptance-criteria
        - _PROJECT_ID_:pm-organization
      supersedes: []
  grade:
    rubric: grade-rubric-v1
    reference: specdojo:prj-overview-template
    target: kata
    verdict: pass
    score: 100
    graded_at: "2026-09-06T11:24:39.124Z"
    graded_by: gemma-expert-executor
    content_hash: a36b622ab79aa2a719cc50161f99b9f4b015178218fc8a03fe3d0aefd99405e0
    categories:
      consistency: { score: 100 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 100 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 4, score: 100 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 0, note: 0 }
---

# プロジェクト管理計画: _PROJECT_NAME_

## 1. 管理目的と適用方針

_TODO_: 検証する価値、対象期間、軽量・拡張プロファイル、人間とAI Agentの判断・実行境界を記述する。

## 2. 統合管理方針

_TODO_: 実際に管理する対象だけを記載する。費用を扱う場合は、現金支出、作業時間、継続運用負荷を分ける。

| 管理対象 | 基準・上限 | 確認契機 | 逸脱時対応 | 責任   |
| -------- | ---------- | -------- | ---------- | ------ |
| _TODO_   | _TODO_     | _TODO_   | _TODO_     | _TODO_ |

## 3. 判断ゲートとエスカレーション

| ゲート | 判断条件 | 判断材料 | 起案・整理 | 最終判断 | 証跡   |
| ------ | -------- | -------- | ---------- | -------- | ------ |
| _TODO_ | _TODO_   | _TODO_   | _TODO_     | _TODO_   | _TODO_ |

## 4. 正本・報告・見直し

| 情報   | 正本   | 更新・報告契機 | 主な確認者 |
| ------ | ------ | -------------- | ---------- |
| _TODO_ | _TODO_ | _TODO_         | _TODO_     |

_TODO_: 目的、スコープ、成功基準、体制、外部条件が変わった場合の見直し方針を記述する。

## 5. 未決事項

| 論点   | 現状                | 決定時期 | 判断者 |
| ------ | ------------------- | -------- | ------ |
| _TODO_ | _UNDECIDED_: _TODO_ | _TODO_   | _TODO_ |
