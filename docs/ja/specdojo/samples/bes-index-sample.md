---
specdojo:
  id: specdojo:bes-index-sample
  type: project
  status: draft
  rulebook: specdojo:bes-index-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 75
    graded_at: "2026-09-04T21:10:42.008Z"
    graded_by: gemma-expert-executor
    content_hash: 18ac8245ff392e1329d69926da97f6888859e5b2b697676168feeba1ac317956
    categories:
      consistency: { score: 63 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 63 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 3, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-kata-conformance line=1 標準テンプレートに準拠しておらず、核心となる業務イベント一覧の具体例が示されていないため、サンプルとしての役割を果たしていない。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-ux-readability line=1 ルールブックが定める主要な記述内容（イベント一覧表）が含まれておらず、初見の読者が正しい記載水準を理解できない。 -->

# [業務イベント / 業務イベント仕様 全体構成](../rulebooks/bes-index-rulebook.md) サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-omissions-consistency line=4 必須章である「業務イベント一覧（表）」およびルールブックで定義された必須項目が欠落しており、構成要件を満たしていない。 -->

本書は、業務上で発生する主要なイベントを一覧で定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/bes-index-rulebook.md`

## 3. 記述内容

- 主な内容: イベントID、イベント名、何が起きたか、いつ、発生条件 など
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                             | 備考                                 |
| ------------ | ------------------------------------------------------------------------------ | ------------------------------------ |
| ドキュメント | [業務イベント / 業務イベント仕様 全体構成](../rulebooks/bes-index-rulebook.md) | 最小サンプル                         |
| 目的         | 業務上で発生する主要なイベントを一覧で定義する                                 | specdojo:deliverables-reference 準拠 |
| 主な内容     | イベントID、イベント名、何が起きたか、いつ、発生条件 など                      | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
