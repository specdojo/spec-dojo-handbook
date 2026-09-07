---
specdojo:
  id: specdojo:etc-sample
  type: project
  status: draft
  rulebook: specdojo:etc-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 48
    graded_at: "2026-09-05T03:32:48.942Z"
    graded_by: gemma-expert-executor
    content_hash: 5951beafcc22df89612b1b2e656fdfd9a73af2ca59a0087056bb36fccce53c31
    categories:
      consistency: { score: 25 }
      usability: { score: 75 }
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
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 2, major: 4, minor: 1, note: 0 }
---

<!-- specdojo:finding id=F002 severity=major rule=vp-arc-single-responsibility line=1 「完成例（sample）」としての責務ではなく「記述ガイド」として振る舞っており、成果物の正本としての形式をなしていない。 -->
<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-omissions-consistency line=1 rulebook で定義された必須の章構成（1〜6章）を完全に無視し、独自の章構成となっている。 -->
<!-- specdojo:finding id=F005 severity=blocker rule=vp-qe-kata-conformance line=1 ETC の完成例ではなく「記述のためのサンプル（ガイド）」となっており, rulebook で定義された成果物形式に準拠していない。 -->

# [外部結合テスト対象別](../rulebooks/etc-rulebook.md) サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F006 severity=major rule=vp-ux-readability line=5 具現化された例ではなく「〜するための最小サンプルである」という説明に留まっており、参照先としての価値を欠いている。 -->

本書は、外部結合テスト仕様を連携単位で分割して定義する（仕様）ための最小サンプルである。

## 2. 入力情報

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=11 rulebook への参照はあるが、必須とされる etc-index や tsp-index への参照が不足している。 -->

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/etc-rulebook.md`

## 3. 記述内容

<!-- specdojo:finding id=F007 severity=minor rule=vp-ux-language-consistency line=16 rulebook に定義のない「責任者」を必須観点として列挙している。 -->

- 主な内容: I/Fごとのテスト条件一覧（入力/期待/エラー）、前提（接続先・認証・テストデータ）、合格基準、関連する外部I/F仕様ID
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-verifiability line=24 具体的な値ではなく「要点のみ記載」という記述上の指示になっており、完成例としての役割を果たしていない。 -->

| 項目         | 値                                                                                                               | 備考                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [外部結合テスト対象別](../rulebooks/etc-rulebook.md)                                                             | 最小サンプル                         |
| 目的         | 外部結合テスト仕様を連携単位で分割して定義する（仕様）                                                           | specdojo:deliverables-reference 準拠 |
| 主な内容     | I/Fごとのテスト条件一覧（入力/期待/エラー）、前提（接続先・認証・テストデータ）、合格基準、関連する外部I/F仕様ID | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
