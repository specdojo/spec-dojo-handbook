---
specdojo:
  id: specdojo:utc-sample
  type: project
  status: draft
  rulebook: specdojo:utc-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 55
    graded_at: "2026-09-06T05:21:21.064Z"
    graded_by: gemma-expert-executor
    content_hash: 1bc0a11a1a8c7ec62f014efe507a5fab36250edcef7d03238af674ea18d4f55e
    categories:
      consistency: { score: 25 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 25 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 2, major: 3, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=1 Frontmatter の type が誤っており、必須項目 (title, based_on) が不足し、ID 形式がルールに準拠していない。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=1 具体的なテストケースと判定可能な期待値の記述例がなく、検証可能性の提示がなされていない。 -->
<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-kata-conformance line=1 ルールブックの標準テンプレートに従っておらず、UTC サンプルとしての正当な構成を満たしていない。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=1 ルールブックの構成と乖離しており, 正しく適用する方法を理解させるためのガイドとして機能していない。 -->

# [単体テスト対象別](../rulebooks/utc-rulebook.md) サンプル

<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-omissions-consistency line=3 ルールブックで規定された必須の本文構成 (概要〜テスト観点とケース) がすべて欠落している。 -->

## 1. 目的と適用範囲

本書は、単体テスト仕様を対象ごとに分割して定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/utc-rulebook.md`

## 3. 記述内容

- 主な内容: 個別対象の範囲、観点、代表条件（状態レベル）、合格基準とエビデンス（参照）
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                         | 備考                                 |
| ------------ | -------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [単体テスト対象別](../rulebooks/utc-rulebook.md)                           | 最小サンプル                         |
| 目的         | 単体テスト仕様を対象ごとに分割して定義する                                 | specdojo:deliverables-reference 準拠 |
| 主な内容     | 個別対象の範囲、観点、代表条件（状態レベル）、合格基準とエビデンス（参照） | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
