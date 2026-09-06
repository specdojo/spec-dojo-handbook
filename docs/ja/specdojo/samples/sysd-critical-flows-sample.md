---
specdojo:
  id: specdojo:sysd-critical-flows-sample
  type: project
  status: draft
  rulebook: specdojo:sysd-critical-flows-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 50
    graded_at: "2026-09-06T02:43:15.913Z"
    graded_by: gemma-expert-executor
    content_hash: 9faa70d07bb15a2bc6855a1f90990ba55757855aa3043a1cf62f7539bfc4d89c
    categories:
      consistency: { score: 25 }
      usability: { score: 83 }
      architecture: { score: 75 }
      quality: { score: 25 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 2, score: 50 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 2, major: 4, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=1 rulebook で必須とされている「5. 関連ドキュメント導線」章が欠落しており、他成果物との整合性を確認できない。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-arc-single-responsibility line=1 成果物の完成例（sample）としての責務ではなく、書き方のガイドとしての記述になっており、役割が不適切である。 -->
<!-- specdojo:finding id=F005 severity=blocker rule=vp-qe-kata-conformance line=1 rulebook が定義する構成に従っておらず、具体的な完成例として機能していないため, sample として不適格である。 -->

# 重要フロー サンプル

<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-omissions-consistency line=3 rulebook で順序固定とされている5章構成（概要、一覧、詳細、観測性、導線）を無視し、必須項目がほぼすべて欠落している。 -->

## 1. 目的と適用範囲

本書は、“読まないと事故る”フローだけを可視化し、実装・テスト・運用の共通理解を作るための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/sysd-critical-flows-rulebook.md`

## 3. 記述内容

- 主な内容: 最大5フロー（冪等/補償/非同期/順序/整合性/外部I/F障害など）について、境界・永続化点・再実行性・失敗時挙動を図または箇条書きで定義
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-verifiability line=21 冪等性や失敗時挙動など, pass/fail を判定可能な具体的な設定値や基準の例が記載されていない。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-ux-readability line=21 「最小記述例」の内容がドキュメントのメタ情報に留まっており、初見の読者が重要フローの書き方を理解できる具体例になっていない。 -->

| 項目         | 値                                                                                                                                | 備考                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | 重要フロー                                                                                                                        | 最小サンプル                         |
| 目的         | “読まないと事故る”フローだけを可視化し、実装・テスト・運用の共通理解を作る                                                        | specdojo:deliverables-reference 準拠 |
| 主な内容     | 最大5フロー（冪等/補償/非同期/順序/整合性/外部I/F障害など）について、境界・永続化点・再実行性・失敗時挙動を図または箇条書きで定義 | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
