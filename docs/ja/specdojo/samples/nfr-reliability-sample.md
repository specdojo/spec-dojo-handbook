---
specdojo:
  id: specdojo:nfr-reliability-sample
  type: project
  status: draft
  rulebook: specdojo:nfr-reliability-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 55
    graded_at: "2026-09-05T11:35:47.352Z"
    graded_by: gemma-expert-executor
    content_hash: 319482e8057f8cdaf56bfb6ce5606c81c5c921b5ed63bd907004e5a1bf4dbe51
    categories:
      consistency: { score: 50 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 13 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 2, major: 2, minor: 0, note: 0 }
---

# [非機能要件 / 信頼性](../rulebooks/nfr-reliability-rulebook.md) サンプル

## 1. 目的と適用範囲

本書は、障害抑止と誤動作防止を定義するための最小サンプルである。

<!-- specdojo:finding id=F002 severity=blocker rule=vp-qe-omissions-consistency line=6 ルールブック第5章で定義された必須構成（概要、適用範囲、要件一覧、検証方法、導線）に準拠していない。 -->
<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-kata-conformance line=6 信頼性要件の具体例を示すべきサンプルでありながら、形式的な要約に留まっており、ルールブックを適用した成果物の正解例となっていない。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-ux-readability line=6 具体的かつ実用的な記述パターンが示されていないため、作成者が参照して模倣できるサンプルとして機能していない。 -->

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/nfr-reliability-rulebook.md`

## 3. 記述内容

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-verifiability line=16 信頼性要件に必須とされる測定可能な指標（数値基準など）や検証方法が具体的に記述されておらず、合否判定不可能な状態である。 -->

- 主な内容: 故障率、平均故障間隔(MTBF)、エラー率、データ検証ルール
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                              | 備考                                 |
| ------------ | --------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [非機能要件 / 信頼性](../rulebooks/nfr-reliability-rulebook.md) | 最小サンプル                         |
| 目的         | 障害抑止と誤動作防止を定義する                                  | specdojo:deliverables-reference 準拠 |
| 主な内容     | 故障率、平均故障間隔(MTBF)、エラー率、データ検証ルール          | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
