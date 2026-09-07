---
specdojo:
  id: specdojo:bps-sample
  type: project
  status: draft
  rulebook: specdojo:bps-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 61
    graded_at: "2026-09-04T21:47:44.770Z"
    graded_by: gemma-expert-executor
    content_hash: 4d51296724d12d26c9c479cb455a9bcf593a1c1ca5f79e628d1c2fb09f8d58a2
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
    findings: { blocker: 1, major: 4, minor: 2, note: 0 }
---

# [業務プロセス仕様](../rulebooks/bps-rulebook.md) サンプル

<!-- specdojo:finding id=F002 severity=minor rule=vp-arc-single-responsibility line=2 成果物のサンプルとしてではなく、サンプルの構成を説明するメタ文書となっており、責務が不明確である。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-omissions-consistency line=2 rulebook で定義された本文構成（8つの必須見出し）が完全に欠落しており、不十分な構成である。 -->
<!-- specdojo:finding id=F005 severity=blocker rule=vp-qe-kata-conformance line=2 サンプルでありながら参照先の rulebook の記述形式（構成・項目）を全く遵守しておらず、サンプルとしての機能を果たしていない。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-ux-readability line=2 具体的な業務プロセスの記述例がなく、読者が BPS の書き方を理解するためのリファレンスとして機能していない。 -->

## 1. 目的と適用範囲

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=4 Frontmatter の `type: project` は rulebook で指定された `domain` と矛盾している。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=4 Frontmatter に必須項目である `title` が欠落している。 -->
<!-- specdojo:finding id=F007 severity=minor rule=vp-ux-language-consistency line=4 Frontmatter の `type` に `project` が指定されており、BPS としての用語定義に反している。 -->

本書は、業務プロセスの処理内容を定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/bps-rulebook.md`

## 3. 記述内容

- 主な内容: 業務プロセス概要、トリガー、前提、入力、処理、出力 など
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                      | 備考                                 |
| ------------ | ------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [業務プロセス仕様](../rulebooks/bps-rulebook.md)        | 最小サンプル                         |
| 目的         | 業務プロセスの処理内容を定義する                        | specdojo:deliverables-reference 準拠 |
| 主な内容     | 業務プロセス概要、トリガー、前提、入力、処理、出力 など | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
