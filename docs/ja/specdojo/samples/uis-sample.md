---
specdojo:
  id: specdojo:uis-sample
  type: project
  status: draft
  rulebook: specdojo:uis-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 56
    graded_at: "2026-09-09T16:47:56.552Z"
    graded_by: gemma-expert-executor
    content_hash: c851bf7452abff8f4db1b2773740aeffa78e780aab33267253dfb2495661ada2
    categories:
      consistency: { score: 50 }
      usability: { score: 67 }
      architecture: { score: 100 }
      quality: { score: 25 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 3, score: 75 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 2, score: 50 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 1, major: 6, minor: 1, note: 0 }
---

# [画面仕様](../rulebooks/uis-rulebook.md) サンプル

<!-- specdojo:finding id=F005 severity=major rule=vp-qe-omissions-consistency line=3 ルールブック第 5 章で定義された標準構成（概要、対象ユーザー/利用目的等）に従っておらず、構成が完全に異なる。 -->

## 1. 目的と適用範囲

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=4 Frontmatter の type が `project` となっており、ルールブックで指定された `screen` と矛盾している。 -->
<!-- specdojo:finding id=F008 severity=major rule=vp-ux-language-consistency line=4 Frontmatter の type 指定値がルールブックの定義（screen）と不整合である。 -->

本書は、業務ユーザー視点の画面の利用目的や表示項目、操作を定義するための最小サンプルである。

<!-- specdojo:finding id=F004 severity=major rule=vp-qe-omissions-consistency line=7 Frontmatter に必須項目である `title` が欠落している。 -->

<!-- specdojo:finding id=F001 severity=minor rule=vp-arc-cross-document-consistency line=8 サンプルとしての具体性を欠いており、特定の画面を対象とした仕様として記述すべきである。 -->
<!-- specdojo:finding id=F006 severity=blocker rule=vp-qe-kata-conformance line=8 本文書は「画面仕様の書き方」を記述した解説書になっており、ルールブックが定義する「完成例（sample）」としての責務を果たしていない。 -->

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/uis-rulebook.md`

## 3. 記述内容

- 主な内容: 画面概要、利用目的、表示項目、操作、遷移、エラー表示 など
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                         | 備考                                 |
| ------------ | ---------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [画面仕様](../rulebooks/uis-rulebook.md)                   | 最小サンプル                         |
| 目的         | 業務ユーザー視点の画面の利用目的や表示項目、操作を定義する | specdojo:deliverables-reference 準拠 |
| 主な内容     | 画面概要、利用目的、表示項目、操作、遷移、エラー表示 など  | 要点のみ記載                         |

## 5. 未解決事項

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=29 期待される成果物である「画面仕様」における判定基準や検証方法の記述例が示されておらず、完成例として機能していない。 -->
<!-- specdojo:finding id=F007 severity=major rule=vp-ux-readability line=29 「最小記述例」として要点を列挙しているが、実際のドキュメント構造を用いた具体例ではないため、読者が適用方法を理解しにくい。 -->

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
