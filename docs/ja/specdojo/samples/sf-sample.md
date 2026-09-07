---
specdojo:
  id: specdojo:sf-sample
  type: project
  status: draft
  rulebook: specdojo:sf-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 30
    graded_at: "2026-09-06T01:21:00.683Z"
    graded_by: gemma-expert-executor
    content_hash: 10fdb69f6285c5b74cb0d3b99a5c8f0058d2df1f9586a30297b42533058b056a
    categories:
      consistency: { score: 0 }
      usability: { score: 50 }
      architecture: { score: 63 }
      quality: { score: 13 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 0, score: 0 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 1, score: 25 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 1, score: 25 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 4, major: 4, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F001 severity=blocker rule=vp-arc-cross-document-consistency line=1 参照ルールブックで定義されている「機能一覧（表形式）」ではなく、「個別機能定義」のサンプルとなっており、整合性が完全に失われている。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-arc-single-responsibility line=1 ルールブックが規定する「機能一覧」のサンプルではなく、「個別機能定義」のサンプルとなっており、期待される役割を果たしていない。 -->
<!-- specdojo:finding id=F007 severity=major rule=vp-ux-readability line=1 タイトルに「個別」とあり、内容も個別定義となっているが、SFLルールブックのサンプルとして提示されているため、正解となる記述形式が不明確である。 -->

# [システム化機能一覧 / 個別](../rulebooks/sf-rulebook.md) サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-omissions-consistency line=4 メタデータの type がルールブック指定の domain ではなく project となっている。 -->
<!-- specdojo:finding id=F008 severity=major rule=vp-ux-language-consistency line=4 メタデータ type の値が, ルールブックで定義されている domain ではなく project と表記されており, 不整合である。 -->

本書は、個別のシステム化機能の概要・関連仕様を定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/sf-rulebook.md`

## 3. 記述内容

- 主な内容: 機能概要、関連プロセス、関連画面、関連IF、関連ルール など
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                        | 備考                                 |
| ------------ | --------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [システム化機能一覧 / 個別](../rulebooks/sf-rulebook.md)  | 最小サンプル                         |
| 目的         | 個別のシステム化機能の概要・関連仕様を定義する            | specdojo:deliverables-reference 準拠 |
| 主な内容     | 機能概要、関連プロセス、関連画面、関連IF、関連ルール など | 要点のみ記載                         |

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-verifiability line=26 表内の「値」がメタ記述となっており、具体的で検証可能な機能定義の例となっていない。 -->
<!-- specdojo:finding id=F005 severity=blocker rule=vp-qe-omissions-consistency line=26 ルールブックで必須とされている「機能一覧（1行1機能の表形式）」が記載されていない。 -->
<!-- specdojo:finding id=F006 severity=blocker rule=vp-qe-kata-conformance line=26 ルールブックで定義された標準列（機能ID, 機能名等）を持たない表形式となっており、作成ルールに全く準拠していない。 -->

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
