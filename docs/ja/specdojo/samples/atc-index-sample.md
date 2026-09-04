---
specdojo:
  id: specdojo:atc-index-sample
  type: project
  status: draft
  rulebook: specdojo:atc-index-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 66
    graded_at: "2026-09-04T20:02:16.697Z"
    graded_by: gemma-expert-executor
    content_hash: fabe56960bbd27844d3a097735a33f33fad69a65856ef8eee356db4d91fcc757
    categories:
      consistency: { score: 38 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 4, minor: 1, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=1 Frontmatter の type が 'project' となっており、ルールブックで指定された 'test' 固定の定義と矛盾している。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=1 ルールブックで定義されている必須見出し（特に2〜8章）が完全に欠落しており、成果物の構成として不十分である。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=1 ルールブック第5章で定義された標準テンプレの見出し構成および順序に準拠していない。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=1 ルールブックの必須構成を無視した形式となっており、正解例としての提示内容が不適切であるため、読者に誤解を与える。 -->

# [受入テスト](../rulebooks/atc-index-rulebook.md) サンプル

## 1. 目的と適用範囲

本書は、業務として受け入れ可能であることを確認する観点・条件を定義する（仕様）ための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/atc-index-rulebook.md`

## 3. 記述内容

- 主な内容: 業務受入シナリオ、受入条件（合格基準）、利用者視点の操作・期待結果、例外時の扱い、データ準備、役割分担、エビデンス要件、判定/承認フロー
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                                                                                      | 備考                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [受入テスト](../rulebooks/atc-index-rulebook.md)                                                                                        | 最小サンプル                         |
| 目的         | 業務として受け入れ可能であることを確認する観点・条件を定義する（仕様）                                                                  | specdojo:deliverables-reference 準拠 |
| 主な内容     | 業務受入シナリオ、受入条件（合格基準）、利用者視点の操作・期待結果、例外時の扱い、データ準備、役割分担、エビデンス要件、判定/承認フロー | 要点のみ記載                         |

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-verifiability line=26 表の「ドキュメント」項目の値にルールブックへのリンクが指定されており、具体的にどのような成果物を指すべきかの例示になっていない。 -->

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
