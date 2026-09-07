---
specdojo:
  id: specdojo:sysd-cross-cutting-policy-sample
  type: project
  status: draft
  rulebook: specdojo:sysd-cross-cutting-policy-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 51
    graded_at: "2026-09-06T02:59:08.418Z"
    graded_by: gemma-expert-executor
    content_hash: 8c795fb633401c9e3caa3c40cd6abd6a2f72d756e896420028c17bcd1cecb096
    categories:
      consistency: { score: 50 }
      usability: { score: 67 }
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
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 2, major: 2, minor: 1, note: 0 }
---

# 横断ルール サンプル

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-verifiability line=3 ルールブックで必須とされる検証手段（Enforcement）を含む具体的なルール定義が記述されておらず、検証可能性を担保できていない。 -->
<!-- specdojo:finding id=F002 severity=blocker rule=vp-qe-omissions-consistency line=3 ルールブックで必須とされる 5 つの構成章（概要、ルール一覧、各ルール詳細、例外、関連ドキュメント導線）がすべて欠落しており、文書として不成立である。 -->
<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-kata-conformance line=3 ルールブックで定義されている必須の見出し構成および順序を遵守しておらず、正しい成果物の完成例として機能していない。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-ux-readability line=3 ルールブックで定義された標準構造に従っていないため、成果物の記述方法を具体的に示すサンプルとしての役割を果たしていない。 -->

## 1. 目的と適用範囲

<!-- specdojo:finding id=F005 severity=minor rule=vp-ux-language-consistency line=4 Frontmatter の `type` が `project` となっているが、ルールブック 4.1 節および 8 節に基づき `architecture` とすべきである。 -->

本書は、実装全体に影響する共通ルールをSSOT化し、各所の実装ブレを防ぐための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/sysd-cross-cutting-policy-rulebook.md`

## 3. 記述内容

- 主な内容: エラー形式/例外分類、タイムアウト・リトライ、冪等キー、トランザクション境界、ログ/監査ログ、トレーシング、セキュリティ（認証・認可の実装原則）、バージョニング、設定の上書き階層
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                                                                                                                                               | 備考                                 |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | 横断ルール                                                                                                                                                                       | 最小サンプル                         |
| 目的         | 実装全体に影響する共通ルールをSSOT化し、各所の実装ブレを防ぐ                                                                                                                     | specdojo:deliverables-reference 準拠 |
| 主な内容     | エラー形式/例外分類、タイムアウト・リトライ、冪等キー、トランザクション境界、ログ/監査ログ、トレーシング、セキュリティ（認証・認可の実装原則）、バージョニング、設定の上書き階層 | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
