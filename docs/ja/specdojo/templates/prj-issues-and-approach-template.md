---
specdojo:
  id: specdojo:prj-issues-and-approach-template
  type: template
  status: ready
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:prj-issues-and-approach
      type: project
      status: draft
      rulebook: specdojo:prj-issues-and-approach-rulebook
      based_on:
        - _PROJECT_ID_:prj-overview
        - _PROJECT_ID_:prj-scope
        - _PROJECT_ID_:prj-assumptions-constraints-dependencies
      supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 91
    graded_at: "2026-09-06T14:18:39.861Z"
    graded_by: codex-expert-executor
    content_hash: ddb75240bfbbe8870ace8f11000314097c87057856ff87382ee6840cce1c587b
    categories:
      consistency: { score: 88 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 88 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 3, score: 75 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 6, note: 0 }
---

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-omissions-consistency line=1 Frontmatter のテンプレート自身の `status` が `ready` であり、Template 記述標準が指定する `specdojo.status: draft` と一致しないため、`draft` に変更する。 -->
<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-kata-conformance line=1 Frontmatter のテンプレート自身の `status` が `ready` であり、Template 記述標準が指定する `specdojo.status: draft` と一致しないため、`draft` に変更する。 -->

# プロジェクト課題と解決アプローチ: _PROJECT_NAME_

本書は、[[_PROJECT_ID_:prj-overview|プロジェクト概要]] で示した背景・必要性を起点とし、[[_PROJECT_ID_:prj-scope|プロジェクトスコープ]] と [[_PROJECT_ID_:prj-assumptions-constraints-dependencies|前提・制約・依存関係]] を前提に、_PROJECT_NAME_ の利用者が直面する主要課題と解決アプローチを整理する。詳細な設計・実装・テスト設計は扱わず、関係者が「何が課題で、どれを、どう解く方針か」を合意するための判断材料を示す。

_TODO_: 主要課題と解決方針の承認者、および利用ロールごとの利用目的を記述する。

<!-- specdojo:finding id=F005 severity=minor rule=vp-ux-language-consistency line=7 文書全体の合意対象を説明する導入部で「本章」と記しており、直前の「本書」および後続する7章全体との指示対象が揺れるため、「本書」に統一する。 -->

本章の合意対象は、優先して扱う主要課題、採用する解決アプローチ、先送りする事項、追加判断が必要な事項である。個別業務システムの設計、特定技術の採否、詳細な作業手順は本書の合意対象に含めない。

## 1. 課題一覧

_TODO_: 困っている現象を、解決策の先取りにせず記述する。各課題に影響と優先度を添える。

| 課題ID | 課題   | 影響   | 優先度 | 備考   |
| ------ | ------ | ------ | ------ | ------ |
| P-01   | _TODO_ | _TODO_ | _TODO_ | _TODO_ |
| P-02   | _TODO_ | _TODO_ | _TODO_ | _TODO_ |

## 2. 原因（仮説でも可）

_TODO_: 課題ごとの発生要因を、事実と仮説を区別して記述する。

| 課題ID | 原因区分 | 内容   | 根拠 / 補足 |
| ------ | -------- | ------ | ----------- |
| P-01   | _TODO_   | _TODO_ | _TODO_      |
| P-02   | _TODO_   | _TODO_ | _TODO_      |

## 3. 解決策候補

_TODO_: 2 件以上の方針を、案ID・代替または補完の関係・概要・期待できる効果・対応課題とともに記述する。単一案の押し付けにしない。同じ判断を置き換える一式の案を詳細比較する場合は `prj-comparison-of-alternatives` へ委譲する。

| 案ID | 案     | 関係   | 概要   | 期待できる効果 | 対応課題 |
| ---- | ------ | ------ | ------ | -------------- | -------- |
| A-01 | _TODO_ | _TODO_ | _TODO_ | _TODO_         | _TODO_   |
| A-02 | _TODO_ | _TODO_ | _TODO_ | _TODO_         | _TODO_   |

## 4. 採用アプローチと理由

採用アプローチは、_TODO_ の方針とする。

_TODO_: 補完策を組み合わせる場合は、各案が担う課題・原因と、単独では不足する理由を記述する。中核・補助または実行順序がある場合だけ、その関係も示す。

| 採用対象 | 判定   | 理由   |
| -------- | ------ | ------ |
| _TODO_   | _TODO_ | _TODO_ |
| _TODO_   | _TODO_ | _TODO_ |

_TODO_: 判断軸（効果/コスト/期間/リスク/再利用性など）のうち、今回重視する順序を 1 文で記述する。

## 5. トレードオフ/リスク

_TODO_: 捨てる・先送りするものと、起きうるリスクおよび軽減策を記述する。任意章のため不要なら削除する。

| 区分   | 内容   | 軽減策 |
| ------ | ------ | ------ |
| _TODO_ | _TODO_ | _TODO_ |

## 6. 次の検討事項（ToDo）

_TODO_: 追加調査・確認・承認が必要な事項と責任ロールを記述する。任意章のため不要なら削除する。

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-omissions-consistency line=63 ToDo欄が置換用の `_TODO_` だけで、recipeが最終成果物に求める `_TODO_:` または `_UNDECIDED_:` のラベルを保持する骨組みになっていないため、用途の区別と記入形式を明示する。 -->
<!-- specdojo:finding id=F004 severity=minor rule=vp-qe-kata-conformance line=63 ToDo欄が置換用の `_TODO_` だけで、recipeが最終成果物に求める `_TODO_:` または `_UNDECIDED_:` のラベルを保持する骨組みになっていないため、用途の区別と記入形式を明示する。 -->
<!-- specdojo:finding id=F006 severity=minor rule=vp-ux-language-consistency line=63 次の検討事項をすべて `_TODO_` で表す骨組みでは、recipeが区別する要確認・追記の `_TODO_:` と意思決定未了の `_UNDECIDED_:` の意味境界が伝わらないため、両ラベルの用途を明示する。 -->

| ToDo   | 目的   | 責任ロール |
| ------ | ------ | ---------- |
| _TODO_ | _TODO_ | _TODO_     |

## 7. 見直しと変更管理

_TODO_: 本書を見直す契機、確認する観点、対応方針を記述し、記録先と責任ロールを添える。任意章のため不要なら削除する。

| 見直しの契機 | 確認する観点 | 対応方針 |
| ------------ | ------------ | -------- |
| _TODO_       | _TODO_       | _TODO_   |
