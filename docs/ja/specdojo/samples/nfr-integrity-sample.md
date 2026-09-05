---
specdojo:
  id: specdojo:nfr-integrity-sample
  type: project
  status: draft
  rulebook: specdojo:nfr-integrity-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 58
    graded_at: "2026-09-05T10:33:51.992Z"
    graded_by: gemma-expert-executor
    content_hash: 14d009d754eb1b1a757414b8c4248999b9acfb5a36dc74d95b0c6191c7e517f4
    categories:
      consistency: { score: 63 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 13 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 1, major: 4, minor: 0, note: 0 }
---

# [非機能要件 / 完全性](../rulebooks/nfr-integrity-rulebook.md) サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=5 Frontmatter に必須項目である `title` が定義されていない。 -->

本書は、データ正確性と改ざん防止を定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/nfr-integrity-rulebook.md`

## 3. 記述内容

- 主な内容: 整合性検証、監査証跡、トランザクション境界
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                            | 備考                                 |
| ------------ | ------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [非機能要件 / 完全性](../rulebooks/nfr-integrity-rulebook.md) | 最小サンプル                         |
| 目的         | データ正確性と改ざん防止を定義する                            | specdojo:deliverables-reference 準拠 |
| 主な内容     | 整合性検証、監査証跡、トランザクション境界                    | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-verifiability line=58 完全性要件の具体的内容、指標、判定基準が記述されておらず、検証不能である。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=36 rulebook Section 5 で定義された必須の見出し構成（概要、適用範囲、要件一覧、検証方法、導線）が全て欠落している。 -->
<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-kata-conformance line=36 rulebook 指定の必須見出し構成（## 1. 概要（対象・目的）〜 ## 5. 関連ドキュメント導線）を完全に無視した構成となっている。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=36 ルールブックの標準構成と乖離した独自構成となっており, 正解例としての案内機能に欠けている。 -->
