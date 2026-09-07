---
specdojo:
  id: specdojo:cpd-sample
  type: project
  status: draft
  rulebook: specdojo:cpd-mermaid-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 54
    graded_at: "2026-09-05T01:23:28.122Z"
    graded_by: gemma-expert-executor
    content_hash: 595c372b9c532187c55154f659c0ed8cd40379744a7d6b00a97ea26589511e79
    categories:
      consistency: { score: 0 }
      usability: { score: 67 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 0, score: 0 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 0, score: 0 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 5, major: 0, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-kata-conformance line=1 C4コンポーネント図 (Mermaid) の具体例が完全に欠落しており、サンプルとしての責務を果たしていない。 -->

# [C4コンポーネント図](../rulebooks/cpd-rulebook.md) サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F002 severity=blocker rule=vp-qe-omissions-consistency line=4 Frontmatter の type が 'project' となっているが、CPD ルールに従い 'architecture' とする必要がある。 -->

本書は、対象コンテナ内の主要コンポーネントに分解し、外部要素との関係を定義ための最小サンプルである。

## 2. 入力情報

<!-- specdojo:finding id=F001 severity=blocker rule=vp-arc-cross-document-consistency line=9 参照している CPD ルールブックで規定された標準構成に従っておらず、文書構造に矛盾がある。 -->

<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-omissions-consistency line=11 ルールブックで規定された必須章（概要、C4コンポーネント図、要素の説明、補足）がすべて欠落している。 -->

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/cpd-mermaid-rulebook.md`

<!-- specdojo:finding id=F005 severity=blocker rule=vp-ux-readability line=13 具体的な記述例（図と説明）がなく、どのような内容をどのように記載すべきかが理解できない。 -->

## 3. 記述内容

- 主な内容: 人/ロール、対象コンテナ境界、DB、外部システムなど、と主要コンポーネントとの依存関係
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                                  | 備考                                 |
| ------------ | ----------------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [C4コンポーネント図](../rulebooks/cpd-rulebook.md)                                  | 最小サンプル                         |
| 目的         | 対象コンテナ内の主要コンポーネントに分解し、外部要素との関係を定義                  | specdojo:deliverables-reference 準拠 |
| 主な内容     | 人/ロール、対象コンテナ境界、DB、外部システムなど、と主要コンポーネントとの依存関係 | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
