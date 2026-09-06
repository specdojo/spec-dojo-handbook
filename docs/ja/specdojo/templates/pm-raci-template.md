---
specdojo:
  id: specdojo:pm-raci-template
  type: template
  status: ready
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:pm-raci
      type: project
      status: draft
      rulebook: specdojo:pm-raci-rulebook
      based_on:
        - specdojo:people-and-organization-definition-standard
        - _PROJECT_ID_:pm-organization
      supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 80
    graded_at: "2026-09-06T12:14:53.908Z"
    graded_by: gemma-expert-executor
    content_hash: c611f84044aeb0ce69e318b82b77be113f20b4dfeb24dfc55a4725a3ac3518b0
    categories:
      consistency: { score: 75 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 63 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 4, score: 100 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 2, minor: 2, note: 0 }
---

# RACI: _PROJECT_NAME_

## 1. 適用方針

_TODO_: 対象とする主要成果物・判断、省略範囲、使用するRole code、兼務とAgent支援の扱いを記述する。

- `R`: 主たる実作業
- `A`: 最終責任・承認・判断
- `C`: 作業前または判断前の相談・確認
- `I`: 結果または変更の共有

## 2. 成果物別 RACI

| 成果物 | PO     | PM     | BA     | ARC    | QE     |
| ------ | ------ | ------ | ------ | ------ | ------ |
| _TODO_ | _TODO_ | _TODO_ | _TODO_ | _TODO_ | _TODO_ |

## 3. 判断・プロセス別 RACI

| 判断・プロセス | PO     | PM     | BA     | ARC    | QE     |
| -------------- | ------ | ------ | ------ | ------ | ------ |
| _TODO_         | _TODO_ | _TODO_ | _TODO_ | _TODO_ | _TODO_ |

## 4. Schedule・実行主体との対応

- _TODO_: Schedule ownerを主たる`R`と一致させる方針を記述する。
- _TODO_: member、兼務、Agent支援の割り当て先となる正本を記述する。
- _TODO_: 不一致時に更新する正本を記述する。

## 5. 見直し条件

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=31 固定Role列の提示により、プロジェクトで採用されていないロールが混入し、組織定義等の正本と矛盾する成果物が生成されるリスクがある。 -->
<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-verifiability line=31 マトリクス内で「主たるR」を識別するための表記例がなく、Schedule ownerとの整合性を判定する基準が不明確である。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance line=31 rulebookの採用済みRole codeのみを使用する規則に反して固定Role列が定義されており、可変プレースホルダー化が必要である。 -->
<!-- specdojo:finding id=F004 severity=minor rule=vp-ux-readability line=31 固定Role列が例示である旨の注記がなく、必須構造であると誤認させる恐れがある。 -->

| トリガー | 確認すること |
| -------- | ------------ |
| _TODO_   | _TODO_       |
