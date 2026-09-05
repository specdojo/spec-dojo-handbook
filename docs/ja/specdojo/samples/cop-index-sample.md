---
specdojo:
  id: specdojo:cop-index-sample
  type: project
  status: draft
  rulebook: specdojo:cop-index-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 58
    graded_at: "2026-09-05T00:37:34.888Z"
    graded_by: gemma-expert-executor
    content_hash: 702b4c20c3939e05d61eda655fa7a9965cc8d978e8e2840654b02f565aa97e76
    categories:
      consistency: { score: 50 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 25 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 2, major: 2, minor: 1, note: 0 }
---

# カットオーバー計画（本番切替手順） サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance line=4 Frontmatter の `type` が `project` となっており、ルールブックで定義された `migration` と矛盾している。 -->

本書は、カットオーバー計画の全体SSOT（`cop-index`）として、当日実行の共通判断と導線を定義する最小サンプルである。

## 2. 入力情報

<!-- specdojo:finding id=F002 severity=blocker rule=vp-qe-omissions-consistency line=9 ルールブックで定義された必須見出し（1.概要 〜 10.関連ドキュメント）がすべて欠落している。 -->
<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-kata-conformance line=9 成果物の構造（必須構成）を無視した概要説明になっており、完成例としての責務を果たしていない。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=9 必須構成が欠落し具体的記述がないため、成果物の正しい書き方を確認することができない。 -->

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/cop-index-rulebook.md`

## 3. 記述内容

- 主な内容: 全体タイムライン、共通GO/NO-GO、共通ロールバック方針、`cop-<term>` への導線
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                          | 備考                                 |
| ------------ | --------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | カットオーバー計画（本番切替手順）                                          | `cop-index` の最小サンプル           |
| 目的         | 当日実行の共通判断と導線を定義する                                          | specdojo:deliverables-reference 準拠 |
| 主な内容     | 全体タイムライン、共通GO/NO-GO、共通ロールバック方針、`cop-<term>` への導線 | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-verifiability line=32 「主な内容」の値が「要点のみ記載」となっており、具体的な記述例として不十分である。 -->
