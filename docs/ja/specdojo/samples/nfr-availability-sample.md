---
specdojo:
  id: specdojo:nfr-availability-sample
  type: project
  status: draft
  rulebook: specdojo:nfr-availability-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 53
    graded_at: "2026-09-05T10:07:42.435Z"
    graded_by: gemma-expert-executor
    content_hash: 28f91a4e37e570c422928b75feff0f3322cfa4243dbba7a770a7de8ccb36e762
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
    findings: { blocker: 2, major: 2, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F002 severity=blocker rule=vp-qe-omissions-consistency line=1 必須章（概要、適用範囲・除外条件、可用性要件一覧、測定・検証方法、関連ドキュメント導線）がすべて欠落している。 -->
<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-kata-conformance line=1 rulebook Section 5 で定義された必須の見出し構成に準拠しておらず、完成例としての責務を果たしていない。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-ux-readability line=1 具体的な記述例を欠いたメタ記述のみとなっており、初見の読者が「どのように書くべきか」を理解できるサンプルとしての機能を果たしていない。 -->

# [非機能要件 / 可用性](../rulebooks/nfr-availability-rulebook.md) サンプル

## 1. 目的と適用範囲

本書は、システム稼働の継続性を定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/nfr-availability-rulebook.md`

## 3. 記述内容

- 主な内容: 稼働率、RTO/RPO、フェイルオーバー、冗長化、バックアップ
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-verifiability line=21 可用性要件の核心である定量的な判定基準（稼働率 % や RTO/RPO の値など）が一切記述されておらず、検証不能である。 -->

| 項目         | 値                                                               | 備考                                 |
| ------------ | ---------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [非機能要件 / 可用性](../rulebooks/nfr-availability-rulebook.md) | 最小サンプル                         |
| 目的         | システム稼働の継続性を定義する                                   | specdojo:deliverables-reference 準拠 |
| 主な内容     | 稼働率、RTO/RPO、フェイルオーバー、冗長化、バックアップ          | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
