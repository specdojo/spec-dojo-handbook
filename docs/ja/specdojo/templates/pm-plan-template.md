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
    target: kata
    verdict: needs-work
    score: 73
    graded_at: "2026-09-10T15:53:46.315Z"
    graded_by: codex-expert-executor
    content_hash: a36b622ab79aa2a719cc50161f99b9f4b015178218fc8a03fe3d0aefd99405e0
    categories:
      consistency: { score: 50 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 4, minor: 4, note: 0 }
---

# プロジェクト管理計画: _PROJECT_NAME_

## 1. 管理目的と適用方針

_TODO_: 検証する価値、対象期間、軽量・拡張プロファイル、人間とAI Agentの判断・実行境界を記述する。

## 2. 統合管理方針

_TODO_: 実際に管理する対象だけを記載する。費用を扱う場合は、現金支出、作業時間、継続運用負荷を分ける。

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=11 統合管理表に価値・リスクまたは根拠IDと証跡・正本を対応付ける列や結合IDがなく、recipeの仕上げ条件とrulebookの追跡要件を生成物へ保持できないため、各管理対象から根拠と証跡を一続きで追跡できる骨組みに修正する必要がある。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=11 管理対象ごとの根拠IDと証跡の対応欄がないため、「価値またはリスクから証跡まで一続きで追跡できる」という完了条件を各行単位でpass/fail判定できず、検証可能な列または結合IDを追加する必要がある。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=11 recipeが必須とする価値またはリスク、基準・上限、確認契機、逸脱時対応、証跡の連続した対応のうち、根拠と証跡を保持する項目が統合管理表から欠落しているため、必要項目を列または明示的な参照規則として追加する必要がある。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-qe-kata-conformance line=11 templateの統合管理表ではrecipeの仕上げチェックが要求する根拠から証跡までの追跡関係を記入できず、rulebook・recipeを適用した完成成果物の骨組みとして不足するため、根拠IDと証跡・正本を対応付ける欄または結合方式を追加する必要がある。 -->

| 管理対象 | 基準・上限 | 確認契機 | 逸脱時対応 | 責任   |
| -------- | ---------- | -------- | ---------- | ------ |
| _TODO_   | _TODO_     | _TODO_   | _TODO_     | _TODO_ |

## 3. 判断ゲートとエスカレーション

<!-- specdojo:finding id=F004 severity=minor rule=vp-qe-omissions-consistency line=17 判断ゲートが汎用プレースホルダーだけで、rulebookが要求する条件IDと条件不足時の扱いを記載する指示がないため、その2点を漏らさないTODOを追加する必要がある。 -->
<!-- specdojo:finding id=F007 severity=minor rule=vp-qe-kata-conformance line=17 rulebookとrecipeが求める条件IDおよび条件不足時の扱いがtemplateに案内されておらず、sampleで生じている総称的な判断条件を防げないため、判断ゲートの記入指示へ明記する必要がある。 -->

| ゲート | 判断条件 | 判断材料 | 起案・整理 | 最終判断 | 証跡   |
| ------ | -------- | -------- | ---------- | -------- | ------ |
| _TODO_ | _TODO_   | _TODO_   | _TODO_     | _TODO_   | _TODO_ |

## 4. 正本・報告・見直し

<!-- specdojo:finding id=F005 severity=minor rule=vp-qe-omissions-consistency line=23 正本表が汎用プレースホルダーだけで、rulebookとrecipeが明示するSchedule、RACI、費用・作業記録、品質証跡、登録簿を確認する指示がないため、必要な正本参照を漏らさないTODOまたは行例を追加する必要がある。 -->
<!-- specdojo:finding id=F008 severity=minor rule=vp-qe-kata-conformance line=23 rulebookとrecipeが正本として明示するRACI等の確認指示がtemplateにないため、sampleのような正本参照の欠落を防げる記入ガイドを追加する必要がある。 -->

| 情報   | 正本   | 更新・報告契機 | 主な確認者 |
| ------ | ------ | -------------- | ---------- |
| _TODO_ | _TODO_ | _TODO_         | _TODO_     |

_TODO_: 目的、スコープ、成功基準、体制、外部条件が変わった場合の見直し方針を記述する。

## 5. 未決事項

| 論点   | 現状                | 決定時期 | 判断者 |
| ------ | ------------------- | -------- | ------ |
| _TODO_ | _UNDECIDED_: _TODO_ | _TODO_   | _TODO_ |
