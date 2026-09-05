---
specdojo:
  id: specdojo:etc-index-sample
  type: project
  status: draft
  rulebook: specdojo:etc-index-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 55
    graded_at: "2026-09-05T03:15:54.908Z"
    graded_by: gemma-expert-executor
    content_hash: 6a5857cb87f35e03210ee25aa1d3635b87dbdab13c531376d7dcc7a9426a45e7
    categories:
      consistency: { score: 25 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 25 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 3, major: 3, minor: 0, note: 0 }
---

# [外部結合テスト](../rulebooks/etc-index-rulebook.md) サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=4 Frontmatter の type を rulebook の定義に従い `test` に修正してください。 -->
<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-kata-conformance line=4 Frontmatter の type を `test` に修正してください。 -->

本書は、外部システム連携を含む結合観点・条件を定義する（仕様）ための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/etc-index-rulebook.md`

## 3. 記述内容

- 主な内容: 対象I/F（API/ファイル/メッセージ）、契約（スキーマ/コード/制約）、正常/異常（タイムアウト・リトライ・冪等・順序）、セキュリティ（認証/認可）、性能/レート制限、監査ログ、合格基準
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                                                                                                                                | 備考                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [外部結合テスト](../rulebooks/etc-index-rulebook.md)                                                                                                                              | 最小サンプル                         |
| 目的         | 外部システム連携を含む結合観点・条件を定義する（仕様）                                                                                                                            | specdojo:deliverables-reference 準拠 |
| 主な内容     | 対象I/F（API/ファイル/メッセージ）、契約（スキーマ/コード/制約）、正常/異常（タイムアウト・リトライ・冪等・順序）、セキュリティ（認証/認可）、性能/レート制限、監査ログ、合格基準 | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=60 判定基準や合格基準の具体的にどのような表現を用いて定義すべきか、実例を記述してください。 -->
<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-omissions-consistency line=43 rulebook で規定された必須構成（1. 目的、2. 分割基準、3. 対象外、4. 観点、5. 条件、6. 採用/分配、7. 境界/依存/環境、8. 共通カラム）をすべて実装してください。 -->
<!-- specdojo:finding id=F005 severity=blocker rule=vp-qe-kata-conformance line=43 rulebook で定義された標準テンプレート構成（## 1. 〜 ## 8.）に従って構成を全面的に再構築してください。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-ux-readability line=60 項目を列挙するだけでなく、各節で具体的にどのように方針や基準を記述すべきか、詳細な例文を提示してください。 -->
