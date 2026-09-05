---
specdojo:
  id: specdojo:cxd-sample
  type: project
  status: draft
  rulebook: specdojo:cxd-mermaid-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 58
    graded_at: "2026-09-05T02:04:16.161Z"
    graded_by: gemma-expert-executor
    content_hash: 69638d5faf99ceaced66602b15404e77c5153585b7dec14eb8a319678012b0dc
    categories:
      consistency: { score: 50 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 25 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 3, score: 75 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 4, minor: 1, note: 0 }
---

<!-- specdojo:finding id=F001 severity=minor rule=vp-arc-cross-document-consistency line=1 H1のリンク先がFrontmatterのrulebook指定と不整合である。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=1 具体的記述が欠落しているため、成功基準や品質基準の妥当性を検証できない。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=1 C4コンテキスト図として必須となる「Mermaidによる図」および「要素の詳細説明」が欠落している。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=1 サンプルとしての責務（完成例の提示）を果たしておらず、成果物のメタ記述に留まっている。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=1 具体的な記述例（図と文章の両方）が提示されていないため、成果物の品質基準や記載水準を理解することができない。 -->

# [C4コンテキスト図](../rulebooks/cxd-rulebook.md) サンプル

## 1. 目的と適用範囲

本書は、対象システムと「境界外」の人・外部システムとの関係を俯瞰的に定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/cxd-mermaid-rulebook.md`

## 3. 記述内容

- 主な内容: ユーザー、外部システム、本システムの関係図
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                   | 備考                                 |
| ------------ | -------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [C4コンテキスト図](../rulebooks/cxd-rulebook.md)                     | 最小サンプル                         |
| 目的         | 対象システムと「境界外」の人・外部システムとの関係を俯瞰的に定義する | specdojo:deliverables-reference 準拠 |
| 主な内容     | ユーザー、外部システム、本システムの関係図                           | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
