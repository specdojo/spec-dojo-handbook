---
specdojo:
  id: specdojo:nfr-usability-sample
  type: project
  status: draft
  rulebook: specdojo:nfr-usability-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 60
    graded_at: "2026-09-05T12:03:16.338Z"
    graded_by: gemma-expert-executor
    content_hash: 63f1d1b9fc5d2b13b0c17ee2f3c6e8bcfb05971b8736c38b039c66d2358c81fb
    categories:
      consistency: { score: 63 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 25 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 4, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F004 severity=major rule=vp-ux-readability line=1 具体的な記述例（完成例）ではなく「記述内容の案内」になっており、サンプルとしての役割を果たしていない。 -->

# [非機能要件 / 操作性](../rulebooks/nfr-usability-rulebook.md) サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=5 ルールブックで必須と定義されている「操作性要件一覧」「測定・検証方法」「関連ドキュメント導線」の見出しと内容が欠落している。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance line=5 ルールブックで定義された必須の見出し構成（## 1. 概要... ## 5. 関連ドキュメント導線）に従っておらず、形式的に不適合である。 -->

本書は、使いやすさと誤操作防止を定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/nfr-usability-rulebook.md`

## 3. 記述内容

- 主な内容: タスク完了率、誤操作率、エラーメッセージ明確性
- 必須観点: 対象、条件、判定基準、責任者

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-verifiability line=18 指標名のみが記載されており、判定基準となる具体的な数値や状態が定義されていない。 -->

## 4. 最小記述例

| 項目         | 値                                                            | 備考                                 |
| ------------ | ------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [非機能要件 / 操作性](../rulebooks/nfr-usability-rulebook.md) | 最小サンプル                         |
| 目的         | 使いやすさと誤操作防止を定義する                              | specdojo:deliverables-reference 準拠 |
| 主な内容     | タスク完了率、誤操作率、エラーメッセージ明確性                | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
