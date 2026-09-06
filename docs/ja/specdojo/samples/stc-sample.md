---
specdojo:
  id: specdojo:stc-sample
  type: project
  status: draft
  rulebook: specdojo:stc-rulebook
  grade:
    rubric: grade-rubric-v1
    reference: specdojo:prj-overview-sample
    target: kata
    verdict: fail
    score: 37
    graded_at: "2026-09-06T02:00:36.251Z"
    graded_by: gemma-expert-executor
    content_hash: 8d2abb69cf5e6baa60971a7fab2dab84f186cbcbe8bed9bd12c9b4bafe61235f
    categories:
      consistency: { score: 13 }
      usability: { score: 58 }
      architecture: { score: 75 }
      quality: { score: 13 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 2, score: 50 }
      vp-arc-single-responsibility: { level: 2, score: 50 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 3, major: 3, minor: 2, note: 0 }
---

<!-- specdojo:finding id=F003 severity=minor rule=vp-arc-single-responsibility line=1 「STCの作成ガイド」と「STCの具体例」の役割が混在しており、主題が不明確である。 -->
<!-- specdojo:finding id=F005 severity=blocker rule=vp-qe-omissions-consistency line=1 Frontmatter の `type` が不適切で、必須項目 `title` および `based_on` が欠落している。 -->
<!-- specdojo:finding id=F008 severity=major rule=vp-ux-readability line=1 具体的な STC の構成例が示されていないため、ルールブック適用時の参考にならない。 -->

# [総合テスト対象別](../rulebooks/stc-rulebook.md) サンプル

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=3 参照先 `stc-rulebook.md` で定義された必須構成（章番号および項目）と矛盾している。 -->
<!-- specdojo:finding id=F006 severity=blocker rule=vp-qe-omissions-consistency line=3 ルールブックで定義された必須章（2〜6）がすべて欠落している。 -->
<!-- specdojo:finding id=F007 severity=blocker rule=vp-qe-kata-conformance line=3 `stc-rulebook` が規定する固定順序の見出し構成を完全に無視しており、サンプルとしての責務を果たしていない。 -->

## 1. 目的と適用範囲

本書は、総合テスト仕様をシナリオ/業務単位で分割して定義する（仕様）ための最小サンプルである。

<!-- specdojo:finding id=F002 severity=minor rule=vp-arc-conciseness line=7 具体例を提示せず記述項目の列挙に留まっており、実例としての有用性が低い。 -->

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/stc-rulebook.md`

## 3. 記述内容

<!-- specdojo:finding id=F004 severity=major rule=vp-qe-verifiability line=15 判定基準を列挙しているが、具体的な判定可能な値や状態が記述されておらず検証不能である。 -->

- 主な内容: 個別シナリオの前提、データ準備、テスト条件、期待結果、合格基準、関連する業務仕様ID/受入条件ID/入条件ID
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                                                     | 備考                                 |
| ------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| ドキュメント | [総合テスト対象別](../rulebooks/stc-rulebook.md)                                                       | 最小サンプル                         |
| 目的         | 総合テスト仕様をシナリオ/業務単位で分割して定義する（仕様）                                            | specdojo:deliverables-reference 準拠 |
| 主な内容     | 個別シナリオの前提、データ準備、テスト条件、期待結果、合格基準、関連する業務仕様ID/受入条件ID/入条件ID | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
