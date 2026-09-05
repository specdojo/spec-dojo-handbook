---
specdojo:
  id: specdojo:cstd-sample
  type: project
  status: draft
  rulebook: specdojo:cstd-mermaid-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 53
    graded_at: "2026-09-05T01:43:05.059Z"
    graded_by: gemma-expert-executor
    content_hash: 9a58594887f2315d8523aaff704b1abda53377ab296d504f2fa82da738134f1b
    categories:
      consistency: { score: 25 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 25 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 2, major: 3, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=1 ルールブックで指定されたサンプルでありながら、実際に定義されるべき概念状態遷移図（Mermaid等）が含まれておらず、参照関係が形式的なものに留まっている。 -->
<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-kata-conformance line=1 成果物の完成例を提示する役割を持つ sample であるが、実際の内容を用いた具体例（実装例）が記述されておらず、サンプルとして機能していない。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=1 具体的なMermaid記述や状態定義の例がないため、ルールブックを読んだ後に本サンプルを参照しても、実装イメージを具体化できない。 -->

# [概念状態遷移図](../rulebooks/cstd-rulebook.md) サンプル

## 1. 目的と適用範囲

本書は、業務オブジェクトの状態変化を図で定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/cstd-mermaid-rulebook.md`

## 3. 記述内容

- 主な内容: 対象、状態、遷移、イベント、条件など
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=20 最小記述例として表形式で要約されているが、検証可能な具体的な状態遷移定義（Mermaid記述等）が欠落しており, 具体例としての判定基準を提示できていない。 -->
<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-omissions-consistency line=20 標準テンプレートで必須とされる「概念状態遷移図（CSTD）」および「状態の説明」の章が欠落しており、成果物としての最低限の構成を満たしていない。 -->

| 項目         | 値                                              | 備考                                 |
| ------------ | ----------------------------------------------- | ------------------------------------ |
| ドキュメント | [概念状態遷移図](../rulebooks/cstd-rulebook.md) | 最小サンプル                         |
| 目的         | 業務オブジェクトの状態変化を図で定義する        | specdojo:deliverables-reference 準拠 |
| 主な内容     | 対象、状態、遷移、イベント、条件など            | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
