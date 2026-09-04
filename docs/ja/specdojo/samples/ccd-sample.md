---
specdojo:
  id: specdojo:ccd-sample
  type: project
  status: draft
  rulebook: specdojo:ccd-mermaid-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 75
    graded_at: "2026-09-04T22:16:44.056Z"
    graded_by: gemma-expert-executor
    content_hash: 9b499e01c04ec44361dea941ac4eb66ed258f3119dec4c3f0c68f97ea74570a5
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
    findings: { blocker: 0, major: 3, minor: 1, note: 0 }
---

# [概念クラス図](../rulebooks/ccd-mermaid-rulebook.md) サンプル

## 1. 目的と適用範囲

本書は、業務上のエンティティ関係を図で定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/ccd-mermaid-rulebook.md`

## 3. 記述内容

<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-kata-conformance line=16 概念クラス図のサンプルとして不適切な「必須観点（判定基準、責任者など）」が記述されており、成果物の責務と矛盾している。 -->

- 主な内容: 商品・在庫・発注・店舗などの概念と属性、関連（継承/親子/参照） など
- 必須観点: 対象、条件、判定基準、責任者

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-omissions-consistency line=18 rulebook が定義する成果物の具体例（Mermaid 構文によるクラス図）が完全に欠落している。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-kata-conformance line=18 概念クラス図のサンプルでありながら、肝心の Mermaid CCD 記述例（図）が一切含まれておらず、完成例として機能していない。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-ux-readability line=18 具体的な概念クラス図の記述が存在しないため、読者がどのような成果物を目指すべきか理解できない。 -->

## 4. 最小記述例

| 項目         | 値                                                                  | 備考                                 |
| ------------ | ------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [概念クラス図](../rulebooks/ccd-mermaid-rulebook.md)                | 最小サンプル                         |
| 目的         | 業務上のエンティティ関係を図で定義する                              | specdojo:deliverables-reference 準拠 |
| 主な内容     | 商品・在庫・発注・店舗などの概念と属性、関連（継承/親子/参照） など | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
