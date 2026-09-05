---
specdojo:
  id: specdojo:opd-sample
  type: project
  status: draft
  rulebook: specdojo:opd-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 53
    graded_at: "2026-09-05T13:51:23.651Z"
    graded_by: gemma-expert-executor
    content_hash: 86fde3c5026d413241550a71be530b8ad65a612a86957a4f26c57ee98d508500
    categories:
      consistency: { score: 50 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 13 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 3, major: 3, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=1 Frontmatter に必須項目 `title` が不足している。 -->
<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-omissions-consistency line=1 Frontmatter の `type` が `project` となっており、ルール規定の `operations` と不一致である。 -->
<!-- specdojo:finding id=F005 severity=blocker rule=vp-qe-kata-conformance line=1 成果物の具体例を示す「サンプル」としての責務を果たしておらず、ルールの適用例が提示されていない。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-ux-readability line=1 必須構成を省略し形式的な説明に留まっているため、読者が完成形のイメージを把握できず、サンプルとして機能していない。 -->

# [運用方針・設計](../rulebooks/opd-rulebook.md) サンプル

<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-omissions-consistency line=3 `opd-rulebook` で定義された必須構成（見出し 1〜12）がすべて欠落しており、独自の構成になっている。 -->

## 1. 目的と適用範囲

本書は、切替後の恒常運用を「あるべき姿」として定義し、運用品質（SLO/SLA・責任分界・統制）を SSOT 化するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/opd-rulebook.md`

## 3. 記述内容

- 主な内容: 運用の範囲・前提、SLO・SLA・KPI、体制・責任分界、監視・障害対応、変更管理、バックアップ、権限運用、問い合わせ運用、関連導線
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                        | 備考                                 |
| ------------ | --------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [運用方針・設計](../rulebooks/opd-rulebook.md)            | 最小サンプル                         |
| 目的         | 恒常運用の方針・統制を定義する                            | specdojo:deliverables-reference 準拠 |
| 主な内容     | SLO/SLA/KPI、責任分界、監視・障害対応、変更管理、関連導線 | 要点のみ記載                         |

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-verifiability line=26 SLO/SLA/KPI 等の判定基準が具体的に記述されておらず、検証不能である。 -->

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
