---
specdojo:
  id: specdojo:tsp-index-sample
  type: project
  status: draft
  rulebook: specdojo:tsp-index-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 37
    graded_at: "2026-09-06T04:32:47.927Z"
    graded_by: gemma-expert-executor
    content_hash: 470712c2d754fedfc6d11c4daf70f63208b5fe046f378876835d56a649cdbfd2
    categories:
      consistency: { score: 38 }
      usability: { score: 50 }
      architecture: { score: 63 }
      quality: { score: 13 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 1, score: 25 }
      vp-arc-single-responsibility: { level: 1, score: 25 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 1, major: 6, minor: 0, note: 0 }
---

# [テスト戦略・方針](../rulebooks/tsp-index-rulebook.md) サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=4 Frontmatter の type が project になっており、ルールブック指定の test と矛盾している。 -->

本書は、全体テストの考え方を示す（要件）ための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/tsp-index-rulebook.md`

## 3. 記述内容

- 主な内容: テストレベルと目的、対象/対象外（スコープ）、品質目標、体制/役割、環境、使用ツール、テストデータ方針、入口/出口条件、進め方・優先度、リスクと対策
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                                                                                                | 備考                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [テスト戦略・方針](../rulebooks/tsp-index-rulebook.md)                                                                                            | 最小サンプル                         |
| 目的         | 全体テストの考え方を示す（要件）                                                                                                                  | specdojo:deliverables-reference 準拠 |
| 主な内容     | テストレベルと目的、対象/対象外（スコープ）、品質目標、体制/役割、環境、使用ツール、テストデータ方針、入口/出口条件、進め方・優先度、リスクと対策 | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |

<!-- specdojo:finding id=F002 severity=major rule=vp-arc-conciseness line=42 サンプルとして具体的に示すべき各項目の記載内容が欠落しており、項目名の列挙にとどまっている。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-arc-single-responsibility line=52 成果物の実例を示すサンプルとしての責務ではなく、構成要素を説明するガイドとしての記述となっており、役割が混同している。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-verifiability line=60 テストレベルの目的や出口条件など, 具体的に pass/fail を判定できる表現が一切含まれていない。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-qe-omissions-consistency line=36 ルールブックで定義された必須構成（概要、テストレベル一覧、スコープ、入口／出口条件等）がすべて欠落している。 -->
<!-- specdojo:finding id=F006 severity=blocker rule=vp-qe-kata-conformance line=52 成果物の実例ではなく「何を書くべきか」の説明書となっており、サンプルの責務を全く果たしていない。 -->
<!-- specdojo:finding id=F007 severity=major rule=vp-ux-readability line=60 最小記述例として表形式で提示されているが、内容が抽象的（例：「要点のみ記載」）であり、具体的な書き方の指針が得られない。 -->
