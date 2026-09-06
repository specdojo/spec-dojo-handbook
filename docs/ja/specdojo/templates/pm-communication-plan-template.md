---
specdojo:
  id: specdojo:pm-communication-plan-template
  type: template
  status: ready
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:pm-communication-plan
      type: project
      status: draft
      rulebook: specdojo:pm-communication-plan-rulebook
      based_on:
        - _PROJECT_ID_:pm-plan
        - _PROJECT_ID_:prj-stakeholder-register
      supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 100
    graded_at: "2026-09-06T10:28:45.961Z"
    graded_by: codex-expert-executor
    content_hash: e1d35b89a1f923a27aff0789c1640ac103e9fba947c4b5ac49304a20b9635d69
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

# コミュニケーション計画: _PROJECT_NAME_

## 1. 方針と適用範囲

_TODO_: 対象とする主要な合意・確認、同期・非同期の方針、人間とAI Agentの境界を記述する。関係者一覧は再掲しない。

## 2. コミュニケーション機会

| 対象・機会 | 伝える・確認する内容 | タイミング | 手段   | 責任   | 証跡   |
| ---------- | -------------------- | ---------- | ------ | ------ | ------ |
| _TODO_     | _TODO_               | _TODO_     | _TODO_ | _TODO_ | _TODO_ |

## 3. エスカレーション

| 条件   | 一次対応 | 最終判断 | 証跡   |
| ------ | -------- | -------- | ------ |
| _TODO_ | _TODO_   | _TODO_   | _TODO_ |

## 4. 情報管理と公開

| 情報区分 | 取扱い | 記録先 |
| -------- | ------ | ------ |
| _TODO_   | _TODO_ | _TODO_ |

## 5. 見直し条件と未決事項

_TODO_: ステークホルダー、判断ゲート、公開方針、連絡手段が変わった場合の見直しを記述する。

- _UNDECIDED_: 未決事項があれば、決定時期と判断者を添える。
