---
specdojo:
  id: specdojo:bes-sample
  type: project
  status: draft
  rulebook: specdojo:bes-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 39
    graded_at: "2026-09-04T21:30:01.882Z"
    graded_by: gemma-expert-executor
    content_hash: 4e41240403f2ad168b081f24d94cbc245468da0e8c6bdfafd94692bcf3b523f4
    categories:
      consistency: { score: 25 }
      usability: { score: 50 }
      architecture: { score: 63 }
      quality: { score: 25 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 1, score: 25 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 1, score: 25 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 8, minor: 0, note: 0 }
---

# [業務イベント / 業務イベント仕様](../rulebooks/bes-rulebook.md) サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=4 `bes-rulebook.md` が定義する BES インスタンスとしての形式に従っておらず、参照先として不適切である。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-omissions-consistency line=4 Frontmatter の `type` が `domain` ではなく `project` となっており、ルールブックの制約に違反している。 -->
<!-- specdojo:finding id=F008 severity=major rule=vp-ux-language-consistency line=4 `type` の値が `domain` ではなく `project` となっており、用語・ラベルの統一性が欠けている。 -->

本書は、業務上で発生する主要なイベントを個別に定義するための最小サンプルである。

## 2. 入力情報

<!-- specdojo:finding id=F002 severity=major rule=vp-arc-single-responsibility line=9 BES の具体例を提示するサンプルとしての責務を果たさず、サンプルの解説書となっている。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-qe-omissions-consistency line=9 ルールブックで定義されている必須の構成項目（1. 何が起きたか, 2. いつ, 3. 誰が／何が, 4. 発生条件, 5. 事実データ）がすべて欠落している。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-qe-kata-conformance line=9 成果物の完成例（インスタンス）を提示するという `sample` の責務を果たしておらず、ルールブックの形式を模倣して適用するための具体例となっていない。 -->

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/bes-rulebook.md`

## 3. 記述内容

- 主な内容: イベントID、イベント名、何が起きたか、いつ、発生条件 など
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

<!-- specdojo:finding id=F007 severity=major rule=vp-ux-readability line=23 記述内容が項目名の列挙に留まっており、具体的にどのような値を書き込むべきかという判断基準が示されていない。 -->

| 項目         | 値                                                              | 備考                                 |
| ------------ | --------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [業務イベント / 業務イベント仕様](../rulebooks/bes-rulebook.md) | 最小サンプル                         |
| 目的         | 業務上で発生する主要なイベントを個別に定義する                  | specdojo:deliverables-reference 準拠 |
| 主な内容     | イベントID、イベント名、何が起きたか、いつ、発生条件 など       | 要点のみ記載                         |

## 5. 未解決事項

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-verifiability line=28 具体的な業務イベントの定義（判定基準や事実データ）が具体的に記述されておらず、検証不可能な状態である。 -->

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
