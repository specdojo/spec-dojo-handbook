---
specdojo:
  id: specdojo:stsd-sample
  type: project
  status: draft
  rulebook: specdojo:stsd-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 44
    graded_at: "2026-09-06T02:25:44.411Z"
    graded_by: gemma-expert-executor
    content_hash: 61c3c940bddaa9cad92af6241f786eadfff1819c56b66dd145e61cf4ec4d36b5
    categories:
      consistency: { score: 25 }
      usability: { score: 58 }
      architecture: { score: 100 }
      quality: { score: 13 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 2, score: 50 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 2, major: 4, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=1 メタデータの `id` および `type` が rulebook の規約に準拠していない。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-ux-language-consistency line=1 メタデータの `type` の値が rulebook の定義と不整合である。 -->

# [業務データ辞書 / ステータス定義](../rulebooks/stsd-rulebook.md) サンプル

<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-omissions-consistency line=2 必須構成要素である「ステータス定義」および「ステータス一覧」の章および表が欠落している。 -->
<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-kata-conformance line=2 本文構成が rulebook の標準テンプレに従っておらず、成果物の正本例となっていない。 -->

## 1. 目的と適用範囲

本書は、業務上のエンティティが取り得る状態（ステータス）を一覧で定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/stsd-rulebook.md`

## 3. 記述内容

- 主な内容: 対象、ステータス名、呼称、説明 など
- 必須観点: 対象、条件、判定基準、責任者

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=19 ステータス説明に含めるべき「成立条件」および「終了条件」の具体例が不足している。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=19 成果物の完成例（具体的な表形式と内容）が提示されておらず、サンプルとして不十分である。 -->

## 4. 最小記述例

| 項目         | 値                                                               | 備考                                 |
| ------------ | ---------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [業務データ辞書 / ステータス定義](../rulebooks/stsd-rulebook.md) | 最小サンプル                         |
| 目的         | 業務上のエンティティが取り得る状態（ステータス）を一覧で定義する | specdojo:deliverables-reference 準拠 |
| 主な内容     | 対象、ステータス名、呼称、説明 など                              | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
