---
specdojo:
  id: specdojo:opr-sample
  type: project
  status: draft
  rulebook: specdojo:opr-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 61
    graded_at: "2026-09-05T17:13:21.775Z"
    graded_by: gemma-expert-executor
    content_hash: 1943b8e6d0f4ad8fa4306dc1eebb7005acc8edda392411a8f0dd1d4a78e478e4
    categories:
      consistency: { score: 25 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 1, major: 4, minor: 1, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=1 Frontmatter の `type` が `project` となっており、`opr-rulebook` の定義（operations）と矛盾している。 -->
<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-verifiability line=1 手順の具体例が記述されておらず、判定条件や完了条件の具体的な記述水準（verifiability）を提示できていない。 -->
<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-omissions-consistency line=1 `opr-rulebook` で定義されている必須章（概要〜関連文書導線）がすべて欠落しており、運用手順書の構成として不成立である。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-omissions-consistency line=1 Frontmatter の必須項目 `title` が不足している。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-qe-kata-conformance line=1 成果物の完成例ではなく「記述すべき内容のリスト」となっており、OPR のサンプルとしての責務（完成例の提示）を果たしていない。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-ux-readability line=1 具体的な記述例ではなくメタ記述（項目リスト）となっているため、執筆時の具体水準を把握するためのリファレンスとして不十分である。 -->

# [運用手順](../rulebooks/opr-rulebook.md) サンプル

## 1. 目的と適用範囲

本書は、運用作業を再現可能な手順として定義し、誰が実施しても同じ結果になる状態を作るための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/opr-rulebook.md`

## 3. 記述内容

- 主な内容: 点検手順、障害対応、アラート対応、バックアップ/復旧、バッチ再実行、変更作業、アカウント運用、問い合わせ一次対応、証跡、関連導線
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                         | 備考                                 |
| ------------ | ------------------------------------------ | ------------------------------------ |
| ドキュメント | [運用手順](../rulebooks/opr-rulebook.md)   | 最小サンプル                         |
| 目的         | 再現可能な運用手順を定義する               | specdojo:deliverables-reference 準拠 |
| 主な内容     | 優先度別障害対応、証跡、変更管理、関連導線 | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
