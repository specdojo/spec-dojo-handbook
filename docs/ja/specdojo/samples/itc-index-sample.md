---
specdojo:
  id: specdojo:itc-index-sample
  type: project
  status: draft
  rulebook: specdojo:itc-index-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 57
    graded_at: "2026-09-05T08:51:30.730Z"
    graded_by: gemma-expert-executor
    content_hash: e4cd0a77c6226e08fd7ef35fa4c444828b668759fc98e54ddaceb4b87d1f4cbe
    categories:
      consistency: { score: 25 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 38 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 2, major: 2, minor: 1, note: 0 }
---

<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-kata-conformance line=1 rulebook で指定された構造および Frontmatter 定義に準拠しておらず、itc-index のサンプルとして不適切である。 -->

# [内部結合テスト](../rulebooks/itc-index-rulebook.md) サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=4 type は rulebook の定義に従い test とする必要がある。 -->

本書は、内部コンポーネント間の連携を確認する観点・条件を定義するための最小サンプルである。

## 2. 入力情報

<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-omissions-consistency line=11 rulebook で定義された必須構成（## 1 〜 ## 9 の固定見出し）が欠落している。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=9 必須構成に従っていないため、itc-index 作成時の参照サンプルとして機能していない。 -->

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/itc-index-rulebook.md`

## 3. 記述内容

- 主な内容: 対象コンポーネントと結合範囲、インターフェース（API/イベント/DB）観点、主要フロー/例外フロー、トランザクション・整合性、エラー処理、ログ/監視観点、合格基準
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                                                                                                          | 備考                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [内部結合テスト](../rulebooks/itc-index-rulebook.md)                                                                                                        | 最小サンプル                         |
| 目的         | 内部コンポーネント間の連携を確認する観点・条件を定義する                                                                                                    | specdojo:deliverables-reference 準拠 |
| 主な内容     | 対象コンポーネントと結合範囲、インターフェース（API/イベント/DB）観点、主要フロー/例外フロー、トランザクション・整合性、エラー処理、ログ/監視観点、合格基準 | 要点のみ記載                         |

## 5. 未解決事項

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-verifiability line=28 最小記述例の具体性が不十分であり、判定可能な合格基準や設定値の記述例を示す必要がある。 -->

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
