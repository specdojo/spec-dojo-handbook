---
specdojo:
  id: specdojo:mtp-sample
  type: project
  status: draft
  rulebook: specdojo:mtp-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 58
    graded_at: "2026-09-09T15:33:44.853Z"
    graded_by: gemma-expert-executor
    content_hash: 0a2517f47bc0a8ea178b3fcff6d1d4a0b153cda24323e1bb7279be3748614166
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
    findings: { blocker: 2, major: 3, minor: 1, note: 0 }
---

# 移行テスト計画（リハーサル計画） サンプル

<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-kata-conformance line=3 Frontmatter に必須項目である `title` が欠落している。 -->

## 1. 目的と適用範囲

<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=4 Frontmatter の type が `project` となっているが、ルールブックの定義に従い `migration` 固定とする必要がある。 -->

本書は、移行リハーサルの実施計画を定義し、切替前に妥当性を検証するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/mtp-rulebook.md`

## 3. 記述内容

- 主な内容: テスト範囲、シナリオ、環境、判定基準、是正計画
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                         | 備考                                 |
| ------------ | ---------------------------------------------------------- | ------------------------------------ |
| ドキュメント | 移行テスト計画（リハーサル計画）                           | 最小サンプル                         |
| 目的         | 移行リハーサルの実施計画を定義し、切替前に妥当性を検証する | specdojo:deliverables-reference 準拠 |
| 主な内容     | テスト範囲、シナリオ、環境、判定基準、是正計画             | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-verifiability line=61 サンプルの例示として、判定基準を具体的にどう記述すべきか（Pass/Failが客観的に判定可能な表現）が示されておらず、検証可能性の例として不十分である。 -->
<!-- specdojo:finding id=F002 severity=blocker rule=vp-qe-omissions-consistency line=37 ルールブックで定義されている必須構成（## 1.概要 〜 ## 9.関連ドキュメント）がすべて欠落しており、ルールを無視した独自の構成となっている。 -->
<!-- specdojo:finding id=F005 severity=blocker rule=vp-qe-kata-conformance line=37 本文構成がルールブックで指定された順序固定の必須見出しに従っておらず、具体例としての責務を果たしていない。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-ux-readability line=37 ルールブックと全く異なる構成で記述されているため、初見の読者が正しい MTP の書き方を理解できず、誤った形式を模倣させるリスクがある。 -->
