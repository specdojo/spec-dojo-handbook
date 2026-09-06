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
    content_hash: 10426e7ad92c351061581a570d15515172433dec4b897844731813bacc5e14cf
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

<!-- specdojo:finding id=F006 severity=minor rule=vp-ux-readability line=5 各章の _TODO_ 指導文が項目列挙に留まっており、良質な実例のような「どのような視点で書くべきか」という具体指針や、正本表における代表的な記入例が欠けているため、執筆者の迷いが生じやすい。 -->

_TODO_: プロジェクト規模、兼務方針、当事者・利用者の確認、人間とAI Agentの境界を記述する。

| 責任領域 | 設計方針 | 最終判断 | 実行・確認 |
| -------- | -------- | -------- | ---------- |
| _TODO_   | _TODO_   | _TODO_   | _TODO_     |

## 2. ロール・owner方針

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=12 「ロール・owner方針」は採用済み Role code の利用規則だけを示し、上位標準が pm-organization.md を正本とする採用／未採用 Role と使用可能な owner を記録できないため、これらの欄を追加して Schedule・RACI との整合を判定可能にしてください。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=12 採用 Role と使用可能な owner を具体的な Role code で記録する欄がなく、生成物から Schedule owner と RACI 列の適否を pass / fail 判定できないため、Role code と owner 可否を明示する表を追加してください。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=12 上位標準が必須とする採用 Role、未採用 Role と代替方針、使用可能な owner の固定記入欄がなく、関連文書として pm-members.yaml、pm-raci.md、同標準への参照も保証されないため、必須項目として追加してください。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=12 テンプレートが上位標準で pm-organization.md に必須の採用／未採用 Role と使用可能 owner の骨組みを持たず、プレースホルダを埋めても標準へ適合する生成物にならないため、rulebook・recipe とともに対象成果物への適用方法を修正してください。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=12 採用／未採用 Role と使用可能 owner の記入箇所がなく、初見の執筆者がロール定義、組織定義、Schedule、RACI の責務関係と本書で確定すべき主要判断を理解できないため、判断結果を記録する明示的な表と参照先を追加してください。 -->

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
