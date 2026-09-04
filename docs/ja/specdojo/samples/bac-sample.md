---
specdojo:
  id: specdojo:bac-sample
  type: project
  status: draft
  rulebook: specdojo:bac-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 78
    graded_at: "2026-09-04T20:37:45.117Z"
    graded_by: gemma-expert-executor
    content_hash: d1133d986a5a11539578742d01e313436c3faf74ece2a5cbc081264fbbcc20e9
    categories:
      consistency: { score: 75 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 63 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 3, minor: 0, note: 0 }
---

# [業務受入条件](../rulebooks/bac-rulebook.md) サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-omissions-consistency line=4 Frontmatter の type は rulebook の定義に従い project ではなく test としてください。 -->

本書は、業務として受け入れ可能であることを示す条件を定義するための最小サンプルである。

## 2. 入力情報

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-kata-conformance line=11 rulebook 第5章で定義された必須構成（概要、受入条件、メモ/将来課題）に従っておらず、実際の BAC 成果物の完成例として提示されていないため、kata への適合性が低い。 -->

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/bac-rulebook.md`

<!-- specdojo:finding id=F003 severity=major rule=vp-ux-readability line=13 BAC の記述方法の解説に留まっており、具体的な受入条件の記述例（シナリオや期待結果）が示されていないため、参照サンプルとしての有用性が低い。 -->

## 3. 記述内容

- 主な内容: 業務シナリオ、受入条件、前提、操作、期待結果 など
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                   | 備考                                 |
| ------------ | ---------------------------------------------------- | ------------------------------------ |
| ドキュメント | [業務受入条件](../rulebooks/bac-rulebook.md)         | 最小サンプル                         |
| 目的         | 業務として受け入れ可能であることを示す条件を定義する | specdojo:deliverables-reference 準拠 |
| 主な内容     | 業務シナリオ、受入条件、前提、操作、期待結果 など    | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
