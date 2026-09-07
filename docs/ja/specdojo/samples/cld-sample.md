---
specdojo:
  id: specdojo:cld-sample
  type: project
  status: draft
  rulebook: specdojo:cld-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 73
    graded_at: "2026-09-04T23:51:07.476Z"
    graded_by: gemma-expert-executor
    content_hash: a152432dcbfb30f5392123b9928bb38f06673874c102b8540e626a1ff2b2a6f3
    categories:
      consistency: { score: 63 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 63 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 3, minor: 0, note: 0 }
---

# [業務データ辞書 / 分類定義](../rulebooks/cld-rulebook.md) サンプル

## 1. 目的と適用範囲

本書は、業務上の分類（カテゴリ、種別、区分など）を一覧で定義するための最小サンプルである。

## 2. 入力情報

<!-- specdojo:finding id=F003 severity=major rule=vp-ux-readability line=9 具体的な分類定義の例が提示されていないため、記述すべき粒度や形式が理解できず、サンプルとしての有用性が極めて低い。 -->

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/cld-rulebook.md`

## 3. 記述内容

- 主な内容: 分類定義名、種別、分類名、説明など
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                        | 備考                                 |
| ------------ | --------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [業務データ辞書 / 分類定義](../rulebooks/cld-rulebook.md) | 最小サンプル                         |
| 目的         | 業務上の分類（カテゴリ、種別、区分など）を一覧で定義する  | specdojo:deliverables-reference 準拠 |
| 主な内容     | 分類定義名、種別、分類名、説明など                        | 要点のみ記載                         |

## 5. 未解決事項

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-kata-conformance line=27 サンプルとしての責務（完成例の提示）を果たしておらず、具体的な分類定義や値一覧が記載されていないため、正本の適用方法を検証できない。 -->

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-omissions-consistency line=30 rulebook で規定されている必須構成要素（メタデータ、分類定義表、値一覧表）が欠落しており、最小サンプルとしての体裁をなしていない。 -->

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
