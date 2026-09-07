---
specdojo:
  id: specdojo:sld-sample
  type: project
  status: draft
  rulebook: specdojo:sld-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 46
    graded_at: "2026-09-06T01:34:40.059Z"
    graded_by: gemma-expert-executor
    content_hash: 8ab4223cf905d037781dd213128707069486847ff7da250e46cb7e9168744baa
    categories:
      consistency: { score: 25 }
      usability: { score: 50 }
      architecture: { score: 100 }
      quality: { score: 25 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 1, score: 25 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 6, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=1 メタデータの id 形式および type (`project`) がルールブックの規定に準拠していない。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-ux-language-consistency line=1 ルールブックの「保管場所一覧」と名称が不一致であり、読み手を混乱させる。 -->

# [業務データ辞書 / 保管場所定義](../rulebooks/sld-rulebook.md) サンプル

## 1. 目的と適用範囲

本書は、業務対象となる物の物理的な保管場所を一覧で定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/sld-rulebook.md`

## 3. 記述内容

- 主な内容: 保管場所名、保管対象、内容・目的、関連プロセス、管理頻度 など
- 必須観点: 対象、条件、判定基準、責任者

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=18 ルールブックで必須とされる「保管場所一覧」の具体例が欠落しており、正しく記述できているか判定不能である。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=18 ルールブックに定義された標準列を持つ「保管場所一覧」表が欠落している。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=18 成果物の完成例ではなく、構成要素の説明に留まっており、sample としての責務を果たしていない。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=18 具体的かつ完全な一覧表の例がないため、読者が作成方法を正しく理解できない。 -->

## 4. 最小記述例

| 項目         | 値                                                            | 備考                                 |
| ------------ | ------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [業務データ辞書 / 保管場所定義](../rulebooks/sld-rulebook.md) | 最小サンプル                         |
| 目的         | 業務対象となる物の物理的な保管場所を一覧で定義する            | specdojo:deliverables-reference 準拠 |
| 主な内容     | 保管場所名、保管対象、内容・目的、関連プロセス、管理頻度 など | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
