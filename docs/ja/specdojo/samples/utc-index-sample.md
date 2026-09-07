---
specdojo:
  id: specdojo:utc-index-sample
  type: project
  status: draft
  rulebook: specdojo:utc-index-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 63
    graded_at: "2026-09-06T05:04:17.291Z"
    graded_by: gemma-expert-executor
    content_hash: b0ae4837dd9f6b8f1c50545f24ce5603b7ebf1b17a45511ae56b0438468c92f7
    categories:
      consistency: { score: 25 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 2, major: 2, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=1 Frontmatter の id と type が、ルールブックで定義された固定値 (utc-index, test) と不整合である。 -->
<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-kata-conformance line=1 ルールブックで定義された必須の Frontmatter 設定および本文構成を遵守しておらず、種別としての責務を果たしていない。 -->

# [単体テスト](../rulebooks/utc-index-rulebook.md) サンプル

<!-- specdojo:finding id=F004 severity=major rule=vp-ux-readability line=3 見出し名がルールブックで指定された標準名称（例：本ドキュメントの目的と適用対象）から逸脱している。 -->

## 1. 目的と適用範囲

本書は、単体テストとして確認する観点・条件と分配を定義するための最小サンプルである。

<!-- specdojo:finding id=F002 severity=blocker rule=vp-qe-omissions-consistency line=7 ルールブックで定義された必須構成（第 2 章〜第 8 章）がすべて欠落している。 -->

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/utc-index-rulebook.md`

## 3. 記述内容

- 主な内容: 対象単位、テスト範囲と対象外、境界（モック/スタブ方針）、TPC の観点・条件の分配、合格基準とエビデンス（共通）
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                                                            | 備考                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [単体テスト](../rulebooks/utc-index-rulebook.md)                                                              | 最小サンプル                         |
| 目的         | 単体テストとして確認する観点・条件と分配を定義する                                                            | specdojo:deliverables-reference 準拠 |
| 主な内容     | 対象単位、テスト範囲と対象外、境界（モック/スタブ方針）、TPC の観点・条件の分配、合格基準とエビデンス（共通） | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
