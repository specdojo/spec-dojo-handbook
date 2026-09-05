---
specdojo:
  id: specdojo:pr-sample
  type: project
  status: draft
  rulebook: specdojo:pr-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 94
    graded_at: "2026-09-05T21:23:35.916Z"
    graded_by: gemma-expert-executor
    content_hash: 8fd677e9ee7f6a60a58ffdd74c13b8f16e55ec8da15217bdd2b41deecdf49db3
    categories:
      consistency: { score: 100 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 88 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 4, score: 100 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 2, note: 0 }
---

# 進捗報告 サンプル

## 1. 報告期間

- 2026-04-13 から 2026-04-19

## 2. 完了事項

| No. | 内容                                     | 成果物ID/タスクID |
| --- | ---------------------------------------- | ----------------- |
| 1   | 在庫補充判定ルールの見直し案を確定した。 | task-042          |
| 2   | 欠品アラート文面のレビューを完了した。   | doc-018           |

## 3. 進行中事項

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-verifiability line=17 「進捗60%」という表記は判定基準が曖昧であり、具体的にどの状態をもって 60% としたかの根拠または定義が必要である。 -->

- レジ締め手順の改訂案を作成中（進捗60%）。
- 日次報告テンプレートの項目統合を検討中。

<!-- specdojo:finding id=F002 severity=minor rule=vp-ux-readability line=18 「項目統合を検討中」という記述は抽象的であり、何を統合しようとしているか、またはどのような判断を検討しているかの具体性が不足している。 -->

## 4. リスク・課題

| 区分   | 内容                                 | 影響度 | 対応方針                                        |
| ------ | ------------------------------------ | ------ | ----------------------------------------------- |
| リスク | 欠品データの入力遅延が発生する可能性 | 中     | 入力締切を16:00に統一し、遅延時は即時連絡する。 |
| 課題   | 一部商品の補充責任者が未確定         | 中     | 2026-04-21 定例で担当を決定する。               |

## 5. 次期予定

| No. | 内容                                     | 担当者   | 期日       |
| --- | ---------------------------------------- | -------- | ---------- |
| 1   | 補充責任者の確定と周知を実施する。       | 店主     | 2026-04-21 |
| 2   | レジ締め改訂案の承認レビューを実施する。 | 業務担当 | 2026-04-24 |
