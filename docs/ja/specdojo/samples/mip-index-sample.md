---
specdojo:
  id: specdojo:mip-index-sample
  type: project
  status: draft
  rulebook: specdojo:mip-index-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 60
    graded_at: "2026-09-05T09:22:54.915Z"
    graded_by: gemma-expert-executor
    content_hash: e9e9b1b295e75fed7d93e0755049c16b95d6caea30dc931030cf35cb6d8bd553
    categories:
      consistency: { score: 50 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 25 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 2, major: 3, minor: 0, note: 0 }
---

# 移行計画 サンプル

<!-- specdojo:finding id=F002 severity=blocker rule=vp-qe-omissions-consistency line=3 ルールブック 5 節で定義された必須章（1〜9章）がすべて不足している。 -->
<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-kata-conformance line=3 見出し構成がルールブックで定義された必須構成（1〜9章の順序固定）に従っていない。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=3 ルールブックで定義された標準構成から著しく乖離しており、正しく作成するための実例として機能していない。 -->

## 1. 目的と適用範囲

<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=4 Frontmatter の `type` が `project` となっており、ルールブック 4.1 節の規定（`migration` 固定）と矛盾している。 -->

本書は、変更対象の移行方針と全体計画を定義し、切替リスクを管理するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/mip-index-rulebook.md`

## 3. 記述内容

- 主な内容: 移行範囲、移行方式、体制、スケジュール、リスクと対策
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                         | 備考                                 |
| ------------ | ---------------------------------------------------------- | ------------------------------------ |
| ドキュメント | 移行計画                                                   | 最小サンプル                         |
| 目的         | 変更対象の移行方針と全体計画を定義し、切替リスクを管理する | specdojo:deliverables-reference 準拠 |
| 主な内容     | 移行範囲、移行方式、体制、スケジュール、リスクと対策       | 要点のみ記載                         |

## 5. 未解決事項

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-verifiability line=28 サンプルの記述例において、判定基準や成功条件に具体的な数値や検証可能な状態（pass/failを判定できる表現）が含まれていない。 -->

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
