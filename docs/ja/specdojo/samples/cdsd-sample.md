---
specdojo:
  id: specdojo:cdsd-sample
  type: project
  status: draft
  rulebook: specdojo:cdsd-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 53
    graded_at: "2026-09-04T23:33:13.373Z"
    graded_by: gemma-expert-executor
    content_hash: 9aa4b565ed9a81c1f34663f49e5884c9d7c0c8b6d4030d989b07eaf7392811e0
    categories:
      consistency: { score: 50 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 13 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 2, major: 2, minor: 0, note: 0 }
---

# [業務データ辞書 / 概念データストア定義](../rulebooks/cdsd-rulebook.md) サンプル

## 1. 目的と適用範囲

本書は、概念データストア（情報の保管場所）を一覧で定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/cdsd-rulebook.md`

## 3. 記述内容

- 主な内容: データストア名、対応プロセス、内容、更新タイミング、粒度、主な用途 など
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                      | 備考                                 |
| ------------ | ----------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [業務データ辞書 / 概念データストア定義](../rulebooks/cdsd-rulebook.md)  | 最小サンプル                         |
| 目的         | 概念データストア（情報の保管場所）を一覧で定義する                      | specdojo:deliverables-reference 準拠 |
| 主な内容     | データストア名、対応プロセス、内容、更新タイミング、粒度、主な用途 など | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-verifiability line=57 ルールブックで定義された標準列や語彙に基づく具体的な記述がなく、検証不可能な状態である。 -->
<!-- specdojo:finding id=F002 severity=blocker rule=vp-qe-omissions-consistency line=57 ルールブックで必須とされている「標準列（データストア名、対応プロセス等）」を含むデータストア一覧表が欠落している。 -->
<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-kata-conformance line=57 サンプルとして成果物の具体的な記述例を示す責務を果たしておらず、ルールブックの標準定義を全く適用していない。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-ux-readability line=52 成果物の具体的な記述例が欠落しており、初見の読者がどのように具体的に記述すべきかを理解できない。 -->
