---
specdojo:
  id: specdojo:br-sample
  type: project
  status: draft
  rulebook: specdojo:br-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 61
    graded_at: "2026-09-04T22:01:05.022Z"
    graded_by: gemma-expert-executor
    content_hash: 79b7220b71b978bfadd7784a02af1af13ac4db92fc5965fe1c74de1757e4cabe
    categories:
      consistency: { score: 38 }
      usability: { score: 75 }
      architecture: { score: 88 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 3, score: 75 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 1, major: 4, minor: 3, note: 0 }
---

# [ビジネスルール](../rulebooks/br-rulebook.md) サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=4 Frontmatter の type が 'project' となっているが、ビジネスルールの標準に従い 'rule' とすべきである。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-omissions-consistency line=4 Frontmatter に必須項目である 'title' が不足している。 -->

本書は、複数プロセスから参照される横断的な判断を定義するための最小サンプルである。

## 2. 入力情報

<!-- specdojo:finding id=F002 severity=minor rule=vp-arc-single-responsibility line=9 ビジネスルールの具体例を提示するサンプル文書でありながら、メタ的な説明（目的や記述内容の解説）に終始しており、責務が不明確である。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=9 ルールブック第 5 節で定義された標準テンプレート（概要・入力・ルール・出力・例外・メモ）が適用されておらず、必須構成要素がすべて欠落している。 -->
<!-- specdojo:finding id=F005 severity=blocker rule=vp-qe-kata-conformance line=9 ルールブックで定義された標準テンプレートに従っておらず、ビジネスルールの書き方を示すサンプルとしての役割を果たしていない。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-ux-readability line=9 ルールブックの標準構成と乖離した独自の見出し構成となっており、正本に従った記述方法を学習することができない。 -->
<!-- specdojo:finding id=F007 severity=minor rule=vp-ux-language-consistency line=11 見出しに '目的と適用範囲' と記載されているが、標準テンプレートの '概要' と統一すべきである。 -->

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/br-rulebook.md`

## 3. 記述内容

<!-- specdojo:finding id=F008 severity=minor rule=vp-ux-language-consistency line=15 見出しに '入力情報' と記載されているが、標準テンプレートの '入力' と統一すべきである。 -->

- 主な内容: ルール概要、入力、ルール、出力、例外 など
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                               | 備考                                 |
| ------------ | ------------------------------------------------ | ------------------------------------ |
| ドキュメント | [ビジネスルール](../rulebooks/br-rulebook.md)    | 最小サンプル                         |
| 目的         | 複数プロセスから参照される横断的な判断を定義する | specdojo:deliverables-reference 準拠 |
| 主な内容     | ルール概要、入力、ルール、出力、例外 など        | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
