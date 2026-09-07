---
specdojo:
  id: specdojo:sac-sample
  type: project
  status: draft
  rulebook: specdojo:sac-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 57
    graded_at: "2026-09-06T00:49:53.215Z"
    graded_by: gemma-expert-executor
    content_hash: bf4551da4ca1ee515269cf6d9f0c69e112a6a113254220d0e4d9a20f2a8bc5f5
    categories:
      consistency: { score: 38 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 25 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 5, minor: 0, note: 0 }
---

# [システム受入条件](../rulebooks/sac-rulebook.md) サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=4 type は specdojo:sac-rulebook の定義に従い test とすべきである。 -->

本書は、システム全体としての合格基準を定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/sac-rulebook.md`

## 3. 記述内容

- 主な内容: 機能・非機能・障害・移行などの受け入れ条件
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                               | 備考                                 |
| ------------ | ------------------------------------------------ | ------------------------------------ |
| ドキュメント | [システム受入条件](../rulebooks/sac-rulebook.md) | 最小サンプル                         |
| 目的         | システム全体としての合格基準を定義する           | specdojo:deliverables-reference 準拠 |
| 主な内容     | 機能・非機能・障害・移行などの受け入れ条件       | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=57 受入条件の具体例として、数値や単位を含む検証可能な判定基準（例：「3秒以内」など）を提示すべきである。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=36 rulebook の 5 節で定義された標準構成（概要、受入条件、メモ/将来課題）に従って記述すべきである。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=34 SAC の具体例ではなく解説書となっているため、実際に運用可能な SAC 文書の形式で完成例を提示すべきである。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=57 最小記述例として表形式ではなく, rulebook で推奨されるシナリオ形式（前提・操作・期待結果）を用いた具体例を記載すべきである。 -->
