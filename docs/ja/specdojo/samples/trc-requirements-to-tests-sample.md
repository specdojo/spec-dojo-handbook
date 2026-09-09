---
specdojo:
  id: specdojo:trc-requirements-to-tests-sample
  type: project
  status: draft
  rulebook: specdojo:trc-requirements-to-tests-rulebook
  based_on:
    - utc-index
    - itc-index
  supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 75
    graded_at: "2026-09-09T16:28:14.587Z"
    graded_by: gemma-expert-executor
    content_hash: 95bbc608891aece3e4d6b39c84257d22b3cfb2537598fd5f7dc529828ebaa7d4
    categories:
      consistency: { score: 50 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 63 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 3, minor: 2, note: 0 }
---

# トレーサビリティ（要求→テスト）サンプル

## 1. 目的と適用範囲

本書は、駄菓子屋の販売管理システムにおける主要要求と対応テストの関係を可視化し、要求漏れ・テスト漏れを防ぐためのトレーサビリティを示す。対象は 2026 年度第 1 リリースで扱う会計、在庫、値引き、監査の要求とテストとする。

## 2. トレース対象の前提

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=9 Frontmatter の `based_on` に記載された生成元が、本文で定義されている参照元（req-2026-r1, atc-* 等）を網羅しておらず不整合である。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=9 Frontmatter の `based_on` に、本文で参照されている要求一覧および受入テスト仕様の ID が漏れている。 -->

- 要求参照元: 要求一覧 `req-2026-r1`
- テスト参照元: 単体テスト `utc-*`、内部結合テスト `itc-*`、受入テスト `atc-*`
- トレース単位: 1 要求に対し 1 つ以上のテストを対応させる（1:N 許容）
- 対象外: 非機能性能試験（`ptc-*`）は本トレースの対象外とする

## 3. トレースマトリクス

| 要求ID     | 要求要約                         | 対応テストID                                | 充足状況 | ギャップ                                    | 備考                           |
| ---------- | -------------------------------- | ------------------------------------------- | -------- | ------------------------------------------- | ------------------------------ |
| req-r1-001 | レジ会計を 90 秒以内で完了する   | utc-pos-calc, itc-pos-flow, atc-cashier-001 | 充足     | なし                                        | 主要シナリオを各レベルで網羅   |
| req-r1-002 | 在庫引当をリアルタイムで更新する | utc-stock-update, itc-stock-message         | 一部充足 | _TODO_: 障害復旧時の再送ケースが未追加      | 失敗系ケースを IT 側へ追加予定 |
| req-r1-003 | キャンペーン値引きを適用する     | utc-discount-rule, atc-campaign-apply       | 充足     | なし                                        | 境界値ケースを UTC で確認済    |
| req-r1-004 | 監査ログを 1 年保持する          | itc-audit-log-persist                       | 未着手   | _UNDECIDED_: 保持期間検証の受入条件が未確定 | 受入観点を ATC 側で定義予定    |

## 4. 充足状況サマリ

| 充足状況 | 件数 |
| -------- | ---- |
| 充足     | 2    |
| 一部充足 | 1    |
| 未着手   | 1    |

優先対応は `req-r1-004`（監査要件）および `req-r1-002`（運用継続性）とする。

## 5. ギャップと対応方針

| 要求ID     | ギャップ内容                   | 解消方針                                            | 担当           | 期限       | 判定条件                            |
| ---------- | ------------------------------ | --------------------------------------------------- | -------------- | ---------- | ----------------------------------- |
| req-r1-002 | 障害復旧時の再送ケースが不足   | `itc-stock-message` に再送失敗/重複受信ケースを追加 | テスト設計担当 | 2026-05-12 | IT ケース表に該当ケースが追加される |
| req-r1-004 | 保持期間検証の受入条件が未確定 | 受入条件を `atc-audit-retention` として定義する     | 品質管理担当   | 2026-05-18 | ATC 観点に保持期間判定が追加される  |

## 6. 変更履歴と更新ルール

- 要求またはテストの更新が入った場合、同一レビュー単位で本トレースを更新する。
- 充足状況は削除せず、`未着手` / `一部充足` / `充足` の状態遷移で管理する。
- 更新時は備考欄に参照チケット ID を追記する。

<!-- specdojo:finding id=F002 severity=minor rule=vp-arc-cross-document-consistency line=78 担当者欄に Role code ではなく自由記述の役割名（テスト設計担当等）が使用されており、プロジェクト標準と不整合である。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=85 rulebook で禁止されている「ビューの手編集」を前提とした更新ルール（手動での充足状況管理やチケット ID 追記）が定義されており、成果物の型定義に違反している。 -->
<!-- specdojo:finding id=F005 severity=minor rule=vp-ux-language-consistency line=78 担当者欄における表記が Role code ではなく役職名・役割名の自由記述となっており、表記が不統一である。 -->
