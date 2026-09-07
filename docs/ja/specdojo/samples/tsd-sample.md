---
specdojo:
  id: specdojo:tsd-sample
  type: project
  status: draft
  rulebook: specdojo:tsd-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 27
    graded_at: "2026-09-06T04:16:51.347Z"
    graded_by: gemma-expert-executor
    content_hash: 6c95a23c2d479933e14cc8740db370893be3b19fbd932bf1fc84a0cb66398acc
    categories:
      consistency: { score: 0 }
      usability: { score: 67 }
      architecture: { score: 50 }
      quality: { score: 0 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 0, score: 0 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 0, score: 0 }
      vp-qe-verifiability: { level: 0, score: 0 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 0, score: 0 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 6, major: 0, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F002 severity=blocker rule=vp-arc-single-responsibility line=1 特定領域詳細定義のサンプルとしての責務を放棄し、インデックス形式のメタ記述となっており、主題と責務が乖離している。 -->
<!-- specdojo:finding id=F005 severity=blocker rule=vp-qe-kata-conformance line=1 rulebook が定義する「特定領域詳細定義」の構成を無視し、「技術スタック一覧（インデックス）」の構成となっており、種別としての責務を守っていない。 -->
<!-- specdojo:finding id=F006 severity=blocker rule=vp-ux-readability line=1 詳細定義のサンプルとして機能しておらず, 読者が正解となる記述形式を理解できないため、実用上の blocker となる。 -->

# [技術スタック一覧](../rulebooks/tsd-rulebook.md) サンプル

<!-- specdojo:finding id=F001 severity=blocker rule=vp-arc-cross-document-consistency line=3 ID `specdojo:tsd-sample` は rulebook で規定された `tsd-＜term＞` パターン（例: `tsd-ollama`）に準拠していない。 -->

## 1. 目的と適用範囲

<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-omissions-consistency line=4 Frontmatter の `type` が `architecture` ではなく `project` となっており、かつ必須項目 `part_of` が欠落している。 -->

本書は、システムで採用する技術（言語、フレームワーク、DB、メッセージ基盤、キャッシュ等）を、一覧として定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/tsd-rulebook.md`

## 3. 記述内容

- 主な内容: プログラミング言語、フレームワーク、ミドルウェア など
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                                                     | 備考                                 |
| ------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| ドキュメント | [技術スタック一覧](../rulebooks/tsd-rulebook.md)                                                       | 最小サンプル                         |
| 目的         | システムで採用する技術（言語、フレームワーク、DB、メッセージ基盤、キャッシュ等）を、一覧として定義する | specdojo:deliverables-reference 準拠 |
| 主な内容     | プログラミング言語、フレームワーク、ミドルウェア など                                                  | 要点のみ記載                         |

<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-verifiability line=26 TSD詳細定義に必須となる具体的な設定値や動作確認手順などの検証可能な基準が全く記載されていない。 -->

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
