---
specdojo:
  id: specdojo:nfr-security-safety-sample
  type: project
  status: draft
  rulebook: specdojo:nfr-security-safety-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 56
    graded_at: "2026-09-05T11:49:44.821Z"
    graded_by: gemma-expert-executor
    content_hash: 124422930ee58e2ca8fb07c7d7577e3d09a5d89508acd84444d8e20fa9f06395
    categories:
      consistency: { score: 63 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 13 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 1, major: 3, minor: 0, note: 0 }
---

# [非機能要件 / 機密性・安全性](../rulebooks/nfr-security-safety-rulebook.md) サンプル

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=3 ルールブックで定義された必須構成（見出し 1〜5）がすべて欠落している。 -->
<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-kata-conformance line=3 ルールブックで指定された順序固定の必須見出し構成に全く準拠していない。 -->

## 1. 目的と適用範囲

本書は、不正利用防止とセキュリティを定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/nfr-security-safety-rulebook.md`

## 3. 記述内容

- 主な内容: 認証・認可、脆弱性対応SLA、暗号化、アクセス制御
- 必須観点: 対象、条件、判定基準、責任者

<!-- specdojo:finding id=F004 severity=major rule=vp-ux-readability line=17 具体的な記述例ではなく抽象的な項目リストとなっており、実装ガイドとしての役割を果たしていない。 -->

## 4. 最小記述例

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-verifiability line=23 判定基準や具体的数値などの検証可能な表現が欠落しており、非機能要件のサンプルとして機能していない。 -->

| 項目         | 値                                                                          | 備考                                 |
| ------------ | --------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [非機能要件 / 機密性・安全性](../rulebooks/nfr-security-safety-rulebook.md) | 最小サンプル                         |
| 目的         | 不正利用防止とセキュリティを定義する                                        | specdojo:deliverables-reference 準拠 |
| 主な内容     | 認証・認可、脆弱性対応SLA、暗号化、アクセス制御                             | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
