---
specdojo:
  id: specdojo:itc-sample
  type: project
  status: draft
  rulebook: specdojo:itc-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 61
    graded_at: "2026-09-05T09:08:08.600Z"
    graded_by: gemma-expert-executor
    content_hash: 530bcb2b129f91bf8303d62621408e12749bbbf38778510d89a26e78812c6b3e
    categories:
      consistency: { score: 13 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 2, major: 3, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-kata-conformance line=1 sample 種別の責務である「完成例」を提示せず、記述内容の抽象的な説明に留まっており、実例として不適切である。 -->

# [内部結合テスト対象別](../rulebooks/itc-rulebook.md) サンプル

<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-omissions-consistency line=3 Rulebook 第 5 節で定義された必須見出し構成（1.概要 〜 6.テスト観点とケース）に従っておらず、必要な章がすべて不足している。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=3 文書構造が rulebook の定義と乖離しており, 初見の読者が正しい作成手順や構成を把握できない。 -->

## 1. 目的と適用範囲

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=4 Frontmatter `type` は `test` 固定である必要があるが `project` となっている。 -->

本書は、内部結合テスト仕様を対象（機能/連携）ごとに分割して定義するための最小サンプルである。

<!-- specdojo:finding id=F002 severity=major rule=vp-arc-cross-document-consistency line=7 必須項目である `title` および `based_on` が Frontmatter に不足している。 -->

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/itc-rulebook.md`

## 3. 記述内容

- 主な内容: 個別結合範囲、前提、テスト条件（シナリオ）一覧、合格基準、関連する仕様ID/機能ID
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                              | 備考                                 |
| ------------ | ------------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [内部結合テスト対象別](../rulebooks/itc-rulebook.md)                            | 最小サンプル                         |
| 目的         | 内部結合テスト仕様を対象（機能/連携）ごとに分割して定義する                     | specdojo:deliverables-reference 準拠 |
| 主な内容     | 個別結合範囲、前提、テスト条件（シナリオ）一覧、合格基準、関連する仕様ID/機能ID | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
