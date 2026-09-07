---
specdojo:
  id: specdojo:ntp-sample
  type: project
  status: draft
  rulebook: specdojo:ntp-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 69
    graded_at: "2026-09-05T12:15:53.886Z"
    graded_by: gemma-expert-executor
    content_hash: 1ce173393a8cfcb9b82f78de6c0d0ca94e8230d68e7b57f188533e758696ef67
    categories:
      consistency: { score: 75 }
      usability: { score: 67 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 2, score: 50 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 5, minor: 0, note: 0 }
---

# 移行テスト計画（リハーサル計画） サンプル

## 1. 目的と適用範囲

本書は、移行リハーサルの実施計画を定義し、切替前に妥当性を検証するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/ntp-rulebook.md`

## 3. 記述内容

- 主な内容: テスト範囲、シナリオ、環境、判定基準、是正計画
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-conciseness line=20 「4. 最小記述例」の内容が前節の内容の反復に留まっており、冗長である。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=20 rulebook で必須とされている「4. 検証観点」が欠落し、代わりに「4. 最小記述例」となっている。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=20 rulebook の本文構成（標準テンプレ）に準拠しておらず、サンプルとしての整合性が欠けている。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=20 サンプルとしての具体性に欠け、各項目の記述水準や具体例が不明確であるため、初見の読者が作成内容を判断できない。 -->

| 項目         | 値                                                         | 備考                                 |
| ------------ | ---------------------------------------------------------- | ------------------------------------ |
| ドキュメント | 移行テスト計画（リハーサル計画）                           | 最小サンプル                         |
| 目的         | 移行リハーサルの実施計画を定義し、切替前に妥当性を検証する | specdojo:deliverables-reference 準拠 |
| 主な内容     | テスト範囲、シナリオ、環境、判定基準、是正計画             | 要点のみ記載                         |

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=25 判定基準などの具体例が提示されておらず、rulebook が求める「判定可能な記述」の具体像を読者が把握できない。 -->

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
