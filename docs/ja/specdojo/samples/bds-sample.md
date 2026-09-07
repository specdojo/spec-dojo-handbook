---
specdojo:
  id: specdojo:bds-sample
  type: project
  status: draft
  rulebook: specdojo:bds-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 48
    graded_at: "2026-09-04T20:55:39.025Z"
    graded_by: gemma-expert-executor
    content_hash: fae3b977519690437525780b4fcb04e1998917fc4148c3bc5a27b20501eee5b0
    categories:
      consistency: { score: 25 }
      usability: { score: 58 }
      architecture: { score: 100 }
      quality: { score: 25 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 2, score: 50 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 3, major: 4, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F005 severity=blocker rule=vp-qe-kata-conformance line=1 本文書は BDS のサンプルとして定義されているが、BDS ルールブックの構成案および命名規則に一切準拠していない。 -->

# [帳票仕様](../rulebooks/bds-rulebook.md) サンプル

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=3 ID `specdojo:bds-sample` がルールブックで規定された命名形式（bds-xxx）に準拠していない。 -->

## 1. 目的と適用範囲

<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-omissions-consistency line=4 Frontmatter の `type: project` がルールブック指定の `domain` / `data` と矛盾している。 -->
<!-- specdojo:finding id=F007 severity=major rule=vp-ux-language-consistency line=4 Frontmatter の `type` に、ルールブックで定義されていない `project` が使用されており、表記が統一されていない。 -->

本書は、業務ユーザー視点の帳票の利用目的や表示項目を定義するための最小サンプルである。

## 2. 入力情報

<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-omissions-consistency line=11 ルールブックで定義された必須構成（概要、利用者/利用目的、出力タイミング等）がすべて省略されており、BDS としての形式を成していない。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-ux-readability line=11 ルールブックの標準構成に従わない独自の見出し構成となっており、正しい BDS の記述方法を理解させるためのガイドとして機能していない。 -->

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/bds-rulebook.md`

## 3. 記述内容

- 主な内容: 帳票概要、利用目的、表示項目、出力タイミング など
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                   | 備考                                 |
| ------------ | ---------------------------------------------------- | ------------------------------------ |
| ドキュメント | [帳票仕様](../rulebooks/bds-rulebook.md)             | 最小サンプル                         |
| 目的         | 業務ユーザー視点の帳票の利用目的や表示項目を定義する | specdojo:deliverables-reference 準拠 |
| 主な内容     | 帳票概要、利用目的、表示項目、出力タイミング など    | 要点のみ記載                         |

## 5. 未解決事項

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=31 目的の記述例が抽象的であり、具体的かつ検証可能な判定基準を提示するサンプルとしての機能が不十分である。 -->

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
