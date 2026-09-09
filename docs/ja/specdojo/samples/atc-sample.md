---
specdojo:
  id: specdojo:atc-sample
  type: project
  status: draft
  rulebook: specdojo:atc-rulebook
  relations:
    verifies:
      - bac-order-registration
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 46
    graded_at: "2026-09-08T23:36:15.813Z"
    graded_by: gemma-expert-executor
    content_hash: d0642df96248b14257d8722739e219a47213b04f791cda8651b0f5c475794731
    categories:
      consistency: { score: 25 }
      usability: { score: 67 }
      architecture: { score: 100 }
      quality: { score: 13 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 1, score: 25 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 4, major: 3, minor: 1, note: 0 }
---

# [受入テスト対象別](../rulebooks/atc-rulebook.md) サンプル

<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-omissions-consistency line=2 Frontmatter に必須項目である `title` および `based_on` が欠落している。 -->

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=3 id が rulebook で定義された `atc-＜term＞` 形式に従っていない。 -->

<!-- specdojo:finding id=F005 severity=blocker rule=vp-qe-kata-conformance line=4 Frontmatter の `type` が `test` ではなく `project` となっている。 -->

## 1. 目的と適用範囲

本書は、受入テスト仕様を業務シナリオ/受入条件単位で分割して定義する（仕様）ための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/atc-rulebook.md`

## 3. 記述内容

- 主な内容: 個別受入シナリオの前提、テスト条件、期待結果、合格基準、関連する業務受入条件ID/システム受入条件ID
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                                                | 備考                                 |
| ------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [受入テスト対象別](../rulebooks/atc-rulebook.md)                                                  | 最小サンプル                         |
| 目的         | 受入テスト仕様を業務シナリオ/受入条件単位で分割して定義する（仕様）                               | specdojo:deliverables-reference 準拠 |
| 主な内容     | 個別受入シナリオの前提、テスト条件、期待結果、合格基準、関連する業務受入条件ID/システム受入条件ID | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=57 受入カタログのサンプルでありながら、判定基準やテストケースの具体的記述例が全く含まれていない。 -->
<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-omissions-consistency line=42 rulebook で定義された必須構成（見出し 1〜6）がすべて欠落している。 -->
<!-- specdojo:finding id=F006 severity=blocker rule=vp-qe-kata-conformance line=42 本文構成が rulebook の標準テンプレ（## 1. 概要 〜 ## 6. 受入観点とケース）に準拠していない。 -->
<!-- specdojo:finding id=F007 severity=major rule=vp-ux-readability line=37 ATCの具体的な書き方を示すサンプルとして機能しておらず, 初見の読者が作成方法を理解できない。 -->
<!-- specdojo:finding id=F008 severity=minor rule=vp-ux-language-consistency line=37 成果物名（タイトル）が rulebook で定義された形式に準拠していない。 -->
