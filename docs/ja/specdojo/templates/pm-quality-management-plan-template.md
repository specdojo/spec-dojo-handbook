---
specdojo:
  id: specdojo:pm-quality-management-plan-template
  type: template
  status: ready
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:pm-quality-management-plan
      type: project
      status: draft
      rulebook: specdojo:pm-quality-management-plan-rulebook
      based_on:
        - _PROJECT_ID_:pm-plan
        - _PROJECT_ID_:prj-success-criteria-and-acceptance-criteria
      supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 80
    graded_at: "2026-09-06T11:50:10.027Z"
    graded_by: gemma-expert-executor
    content_hash: b6f9314dc9866943f625649365e5eb03a98ef0f7bb58a6fd737f407d28b62405
    categories:
      consistency: { score: 63 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 63 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 4, minor: 0, note: 0 }
---

# 品質管理計画: _PROJECT_NAME_

## 1. 品質方針と適用範囲

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-omissions-consistency line=5 「品質方針と適用範囲」において、必須項目である「対象期間」の記述誘導が欠落している。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance line=5 rulebook で必須とされる「対象期間」の記入欄または誘導が不足している。 -->

_TODO_: 利用者価値として確認する品質、価値提供を支える成果物品質、人間とAI Agentの判断境界を記述する。

## 2. 品質ゲート

| ゲート | 品質観点 | 合格条件 | 方法・証跡 | 時期   | 確認者 / 承認者 |
| ------ | -------- | -------- | ---------- | ------ | --------------- |
| _TODO_ | _TODO_   | _TODO_   | _TODO_     | _TODO_ | _TODO_          |

## 3. レビューと証跡

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=15 「レビューと証跡」の表において, 必須項目である「記録先」が欠落しており、また「出口条件」と「証跡」が統合されており rulebook の定義と矛盾している。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=15 「レビューと証跡」の表構成が rulebook の必須項目定義（対象、観点、実施責任、出口条件、記録先）と乖離している。 -->

| 対象   | 主な観点 | 実施責任 | 出口条件・証跡 |
| ------ | -------- | -------- | -------------- |
| _TODO_ | _TODO_   | _TODO_   | _TODO_         |

## 4. 不適合と是正

| 区分   | 対応   | 再判定 | 記録先 |
| ------ | ------ | ------ | ------ |
| _TODO_ | _TODO_ | _TODO_ | _TODO_ |

## 5. 見直し条件と未決事項

_TODO_: 成功基準、公開範囲、成果物構造、検証方法、重大不適合の傾向が変わった場合の見直しを記述する。

- _UNDECIDED_: 未決事項があれば、決定時期と判断者を添える。
