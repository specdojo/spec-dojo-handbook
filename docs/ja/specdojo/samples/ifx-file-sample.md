---
specdojo:
  id: specdojo:ifx-file-sample
  type: project
  status: draft
  rulebook: specdojo:ifx-file-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 69
    graded_at: "2026-09-05T07:10:20.721Z"
    graded_by: gemma-expert-executor
    content_hash: d2344354780abef4520184cf25b69544943b92594e8124bf3f5cbdee436deec3
    categories:
      consistency: { score: 63 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 38 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 3, minor: 1, note: 0 }
---

# [外部ファイル連携仕様](../rulebooks/ifx-file-rulebook.md) サンプル

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance line=2 成果物が YAML ファイルとして定義されているにもかかわらず、サンプルが Markdown の表形式で記述されており、完成例としての責務を果たしていない。 -->

## 1. 目的と適用範囲

本書は、外部システムとのファイル連携をYAMLで定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/ifx-file-rulebook.md`

## 3. 記述内容

- 主な内容: ファイル形式、伝送方法、スケジュール、ファイル項目一覧
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=19 rulebook で定義されている必須構造（x-spec-meta, file, direction 等）が一切含まれておらず、仕様としての整合性が欠落している。 -->
<!-- specdojo:finding id=F004 severity=minor rule=vp-ux-readability line=19 具体的な YAML 構造を示さず表形式で要点をまとめているため、実際の適用方法を直感的に理解しにくい。 -->

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-verifiability line=21 最小記述例の表内の値が抽象的であり、検証可能な具体的な設定値として機能していない。 -->

| 項目         | 値                                                        | 備考                                 |
| ------------ | --------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [外部ファイル連携仕様](../rulebooks/ifx-file-rulebook.md) | 最小サンプル                         |
| 目的         | 外部システムとのファイル連携をYAMLで定義する              | specdojo:deliverables-reference 準拠 |
| 主な内容     | ファイル形式、伝送方法、スケジュール、ファイル項目一覧    | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
