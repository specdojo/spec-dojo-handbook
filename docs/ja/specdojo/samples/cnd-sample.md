---
specdojo:
  id: specdojo:cnd-sample
  type: project
  status: draft
  rulebook: specdojo:cnd-mermaid-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 53
    graded_at: "2026-09-05T00:16:12.693Z"
    graded_by: gemma-expert-executor
    content_hash: 95881d3c2f9ab0d72bbd5889b45b3597351eb6e0205672f733191d7c6e6ea435
    categories:
      consistency: { score: 25 }
      usability: { score: 58 }
      architecture: { score: 100 }
      quality: { score: 38 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 0, score: 0 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 3, major: 1, minor: 3, note: 0 }
---

<!-- specdojo:finding id=F002 severity=major rule=vp-arc-cross-document-consistency line=1 本文中のルールブック参照先が Frontmatter の指定 (`cnd-mermaid-rulebook`) と不整合である。 -->
<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-omissions-consistency line=1 標準構成で必須とされる「C4コンテナ図（Mermaid）」および「要素の説明」の章が完全に欠落している。 -->
<!-- specdojo:finding id=F005 severity=blocker rule=vp-qe-kata-conformance line=1 rulebook の必須要素（Mermaid図および要素説明）を満たしておらず、最小完成例となっていない。 -->
<!-- specdojo:finding id=F006 severity=blocker rule=vp-ux-readability line=1 実際の Mermaid 図面が提示されていないため、成果物の完成イメージを把握できず、利用者が目的（図の作成）を達成するための手段を理解できない。 -->
<!-- specdojo:finding id=F007 severity=minor rule=vp-ux-language-consistency line=1 準拠ルールブックの表記が Frontmatter と本文で不整合である。 -->

# [C4コンテナ図](../rulebooks/cnd-rulebook.md) サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F001 severity=minor rule=vp-arc-cross-document-consistency line=4 Frontmatter の `type` は `architecture` である必要がある。 -->

本書は、対象システムを主要実行/配備単位に分割し、利用者・外部システム・データストアとの関係を定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/cnd-mermaid-rulebook.md`

## 3. 記述内容

- 主な内容: Webアプリ、API、バッチ、DB、メッセージ基盤など
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                                            | 備考                                 |
| ------------ | --------------------------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [C4コンテナ図](../rulebooks/cnd-rulebook.md)                                                  | 最小サンプル                         |
| 目的         | 対象システムを主要実行/配備単位に分割し、利用者・外部システム・データストアとの関係を定義する | specdojo:deliverables-reference 準拠 |
| 主な内容     | Webアプリ、API、バッチ、DB、メッセージ基盤など                                                | 要点のみ記載                         |

<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-verifiability line=26 サンプルとして、判定基準（Pass/Fail）を具体的にどう記述すべきかの例示が不足している。 -->

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
