---
specdojo:
  id: specdojo:prj-scope-template
  type: template
  status: ready
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:prj-scope
      type: project
      status: draft
      rulebook: specdojo:prj-scope-rulebook
      based_on:
        - _PROJECT_ID_:prj-overview
      supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 84
    graded_at: "2026-09-06T15:00:40.532Z"
    graded_by: codex-expert-executor
    content_hash: 050f2b64cee07879f11c0a30d813736541ef5f1635b7946eac315760a8aa3624
    categories:
      consistency: { score: 75 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 3, score: 75 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 3, score: 75 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 6, note: 0 }
---

# プロジェクトスコープ: _PROJECT_NAME_

_TODO_: プロジェクト概要で示した背景・必要性・期待効果を受け、関係者が対象範囲と対象外を合意できるようにスコープを定義する一文を記述する。

## 1. 対象業務

_TODO_: 対象とする業務、活動領域、利用場面を記述する。対象利用者、利用者影響、何を運用・管理できる状態にするかを含める。

- _TODO_: 対象業務または活動領域 1
- _TODO_: 対象業務または活動領域 2
- _TODO_: 対象業務または活動領域 3

## 2. 対象システム

_TODO_: 対象となるシステム、成果物、文書体系、実行ツール、管理データ、生成物、基盤、外部連携範囲を、粒度を揃えて記述する。正本と生成物、直接編集の可否、外部サービスとの責務境界を示し、UI、API、DB、個別設計の詳細は書かない。

| 対象   | 内容   | 境界   |
| ------ | ------ | ------ |
| _TODO_ | _TODO_ | _TODO_ |
| _TODO_ | _TODO_ | _TODO_ |

## 3. 対象期間

_TODO_: 初期対象期間、判断イベント、継続改善との切り分けを記述する。日付が未確定の場合はイベント基準で記述し、決定する文書またはタイミングを添える。

- _TODO_: 初期対象期間
- _TODO_: 初期リリースまたは初回公開前に含めること
- _TODO_: 初期リリースまたは初回公開後に扱うこと
- _UNDECIDED_: 具体日付が未確定の場合は、決定タイミングを記述する。

## 4. スコープ外

<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-omissions-consistency line=33 rulebook が利用者影響の大きい対象外項目に求める後続で扱う条件または再検討タイミングが「補足」だけでは識別できないため、該当時に記述する内容として明示する必要がある。 -->

_TODO_: 今回やらないことを明示し、理由と補足を添える。対象外の未記載により誤解されやすい項目を優先して書く。

| 対象（Out） | 理由   | 補足   |
| ----------- | ------ | ------ |
| _TODO_      | _TODO_ | _TODO_ |
| _TODO_      | _TODO_ | _TODO_ |

<!-- specdojo:finding id=F001 severity=minor rule=vp-arc-cross-document-consistency line=40 rulebook では「境界の判断基準」と「スコープ変更方針」が任意章だが、テンプレートでは通常の TODO 章として配置され必須章と区別できないため、両章に任意であることと不要時の削除条件を明示する必要がある。 -->
<!-- specdojo:finding id=F005 severity=minor rule=vp-qe-kata-conformance line=40 template の骨組みが rulebook の必須・任意区分を伝えておらず、第5章と第6章を常に記入すべき章として誤用させるため、両章を任意と表示し採用・削除の条件を TODO に含める必要がある。 -->
<!-- specdojo:finding id=F006 severity=minor rule=vp-ux-readability line=40 初見の利用者が第5章と第6章を必須章と任意章のどちらとして扱うか判断できないため、見出しまたは直下の説明に「任意」と不要時の削除可否を明記する必要がある。 -->

## 5. 境界の判断基準

_TODO_: 含めるか外すかで迷ったときの判断原則を記述する。優先順位がある場合は番号付きリストにする。

1. _TODO_: 判断基準 1
2. _TODO_: 判断基準 2
3. _TODO_: 判断基準 3

## 6. スコープ変更方針

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-verifiability line=50 「影響評価」だけでは完了判定に必要な観点が特定できないため、業務価値、利用者影響、工数・費用、期日、運用、リスク、および影響を受ける成果物の確認を記入条件として明示する必要がある。 -->
<!-- specdojo:finding id=F004 severity=minor rule=vp-qe-omissions-consistency line=50 rulebook と recipe が変更方針に求める「影響を受ける成果物」の確認が記入指示と表にないため、成果物カタログ、スケジュール、RACI、管理計画などへの影響を記録する欄または指示を追加する必要がある。 -->

_TODO_: スコープを追加・削除・変更するときの入口、影響評価、承認者、記録先を記述する。

| 項目     | 内容   |
| -------- | ------ |
| 変更入口 | _TODO_ |
| 影響評価 | _TODO_ |
| 承認者   | _TODO_ |
| 記録先   | _TODO_ |

_TODO_: 初期リリース前にスコープを追加する場合のトレードオフ確認方針を記述する。
