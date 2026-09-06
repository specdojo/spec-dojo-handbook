---
specdojo:
  id: specdojo:sf-index-sample
  type: project
  status: draft
  rulebook: specdojo:sf-index-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 68
    graded_at: "2026-09-06T01:06:01.735Z"
    graded_by: gemma-expert-executor
    content_hash: 7933e1e1039ce40759316ec4e91146d86dc09efebef0267c5b76e2e81b12c2f0
    categories:
      consistency: { score: 50 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 5, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=1 H1のリンク先が、定義されているルールブック(sf-index-rulebook.md)ではなく別ドキュメント(sf-rulebook.md)を指している。 -->

# [システム化機能一覧 / 全体構成](../rulebooks/sf-rulebook.md) サンプル

## 1. 目的と適用範囲

本書は、システムで実現する機能の全体構成と一覧を定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/sf-index-rulebook.md`

## 3. 記述内容

- 主な内容: 機能ID、機能名、概要、関連プロセス、関連仕様ID など
- 必須観点: 対象、条件、判定基準、責任者

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=18 必須章である「4. 検証観点」が欠落しており、判定基準の記述例が示されていない。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=18 ルールブックで必須と定義されている「4. 検証観点」章が欠落している。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=18 本文構成がルールブックの標準テンプレと異なり、「4. 検証観点」が「4. 最小記述例」に置換されている。 -->

## 4. 最小記述例

<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=20 「4. 最小記述例」の内容がドキュメントのメタデータ説明に留まっており、機能一覧としての具体的な記述例（機能IDや名称等の例）が示されていない。 -->

| 項目         | 値                                                           | 備考                                 |
| ------------ | ------------------------------------------------------------ | ------------------------------------ |
| ドキュメント | [システム化機能一覧 / 全体構成](../rulebooks/sf-rulebook.md) | 最小サンプル                         |
| 目的         | システムで実現する機能の全体構成と一覧を定義する             | specdojo:deliverables-reference 準拠 |
| 主な内容     | 機能ID、機能名、概要、関連プロセス、関連仕様ID など          | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
