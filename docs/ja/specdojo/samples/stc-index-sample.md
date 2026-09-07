---
specdojo:
  id: specdojo:stc-index-sample
  type: project
  status: draft
  rulebook: specdojo:stc-index-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 67
    graded_at: "2026-09-06T01:52:28.682Z"
    graded_by: gemma-expert-executor
    content_hash: 8d81482735d5139da089d048d8ea7f15bddfb9b2c34f3861e0fa4680d73f06c9
    categories:
      consistency: { score: 63 }
      usability: { score: 67 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 3, score: 75 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 4, minor: 2, note: 0 }
---

# [総合テスト](../rulebooks/stc-index-rulebook.md) サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=4 Frontmatter の `type` が `project` となっており, rulebook 第 4.1 節の「`test` 固定」というルールに違反している。 -->

本書は、システム全体として業務シナリオが成立することを定義する（仕様）ための最小サンプルである。

## 2. 入力情報

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=9 rulebook で定義された必須見出し構成（## 1 〜 ## 8）に従っておらず、第 2 章から 第 8 章までの必須項目がすべて欠落している。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-qe-kata-conformance line=9 rulebook で定義された標準テンプレの見出し構成を無視しており、kata（種別）としての責務を果たすサンプルになっていない。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-ux-readability line=9 記述が抽象的すぎて、STC Index の具体的な書き方（特に共通ルールや判定基準の定義方法）を学習するためのガイドとして機能していない。 -->

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/stc-index-rulebook.md`

## 3. 記述内容

- 主な内容: エンドツーエンドの業務シナリオ、画面/API/バッチ/外部連携の通し観点、運用観点（ジョブ・監視・障害時）、非機能の観点（代表値）、合格基準
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-verifiability line=20 判定基準の具体例がなく、verifiability（検証可能性）を担保する記述方法のサンプルとして不十分である。 -->

| 項目         | 値                                                                                                                                     | 備考                                 |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [総合テスト](../rulebooks/stc-index-rulebook.md)                                                                                       | 最小サンプル                         |
| 目的         | システム全体として業務シナリオが成立することを定義する（仕様）                                                                         | specdojo:deliverables-reference 準拠 |
| 主な内容     | エンドツーエンドの業務シナリオ、画面/API/バッチ/外部連携の通し観点、運用観点（ジョブ・監視・障害時）、非機能の観点（代表値）、合格基準 | 要点のみ記載                         |

## 5. 未解決事項

<!-- specdojo:finding id=F001 severity=minor rule=vp-arc-conciseness line=29 「主な内容」の記述が前の節の内容をそのまま反復しており、冗長である。 -->

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
