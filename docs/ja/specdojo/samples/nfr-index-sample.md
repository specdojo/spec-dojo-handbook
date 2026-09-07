---
specdojo:
  id: specdojo:nfr-index-sample
  type: project
  status: draft
  rulebook: specdojo:nfr-index-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 75
    graded_at: "2026-09-05T10:20:27.910Z"
    graded_by: gemma-expert-executor
    content_hash: da59d6575b2582ed88fc28f98b5a2f5780bed4d06fc56f3fe538d0f2862ebfcb
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

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-omissions-consistency line=1 第5章で定義された必須見出し構成（1.概要〜5.関連導線）が含まれていない。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-kata-conformance line=1 ルールブックの定義に従っておらず、実例として不適切である。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-ux-readability line=1 ルールブックで定義された標準構成から逸脱しており、参照先としての役割・利用方法を正しく識別できない。 -->

# [非機能要件](../rulebooks/nfr-index-rulebook.md) サンプル

## 1. 目的と適用範囲

本書は、非機能要件を8カテゴリに分冊管理し、測定可能・検証可能な形で一元化するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/nfr-index-rulebook.md`

## 3. 記述内容

- 主な内容: 信頼性、可用性、保守性、完全性、機密性・安全性、性能、運用、操作性（各カテゴリの目的・代表指標・検証導線）
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                                                         | 備考                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [非機能要件](../rulebooks/nfr-index-rulebook.md)                                                           | 最小サンプル                         |
| 目的         | 非機能要件を8カテゴリに分冊管理し、測定可能・検証可能な形で一元化する                                      | specdojo:deliverables-reference 準拠 |
| 主な内容     | 信頼性、可用性、保守性、完全性、機密性・安全性、性能、運用、操作性（各カテゴリの目的・代表指標・検証導線） | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
