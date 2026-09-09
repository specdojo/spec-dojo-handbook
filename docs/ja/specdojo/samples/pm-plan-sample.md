---
specdojo:
  id: specdojo:pm-plan-sample
  type: project
  status: ready
  rulebook: specdojo:pm-plan-rulebook
  based_on:
    - specdojo:prj-overview-sample
    - specdojo:prj-scope-sample
    - specdojo:prj-success-criteria-and-acceptance-criteria-sample
    - specdojo:pm-organization-sample
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 68
    graded_at: "2026-09-09T15:55:32.496Z"
    graded_by: gemma-expert-executor
    content_hash: 6c7c2a143916d1fdc41b1078b8e70c913fca95bea0cbef077f645bdc371c3f03
    categories:
      consistency: { score: 38 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 5, minor: 4, note: 0 }
---

# プロジェクト管理計画: 駄菓子屋きぬや 販売管理システム

## 1. 管理目的と適用方針

販売・在庫・つけ管理の初期リリースと2週間の店頭試用を、店主と家族が無理なく判断・実行できるように管理する。小規模案件向けの軽量運用とし、詳細は各正本へ委譲する。AI Agent は草案や検証を支援できるが、費用、範囲、受入、公開の最終判断は人間の PO が行う。

## 2. 統合管理方針

| 管理対象           | 基準・上限                                                     | 確認契機                           | 逸脱時対応                                | 責任 |
| ------------------ | -------------------------------------------------------------- | ---------------------------------- | ----------------------------------------- | ---- |
| スコープ           | 初期対象は販売・在庫・つけ管理。EC、会計連携、複数店舗は対象外 | 追加要望の発生時                   | 変更要求として影響を整理する              | PM   |
| スケジュール       | 初期リリース後に2週間の店頭試用を行う                          | 節目または後続作業へ影響する遅延時 | 優先順位と試用日を再計画する              | PM   |
| 現金支出           | PO が着手前に承認した上限内                                    | 有償サービスの追加前               | 無償代替、範囲縮小、中止を比較する        | PO   |
| 参加者の時間       | 店舗営業や学業を圧迫しない。日常操作の追加負担は1日10分以内    | 試用準備時と試用中                 | 機能または確認手順を減らす                | PM   |
| 品質               | 初期受入条件と短期成功基準を満たす                             | リリース前と試用終了時             | 是正後に再判定する                        | QE   |
| 課題・リスク・変更 | 判断者、期限、次の行動を記録する                               | 発生または顕在化時                 | PO 判断が必要な事項をエスカレーションする | PM   |

## 3. 判断ゲートとエスカレーション

| ゲート         | 判断条件                                 | 判断材料                    | 起案・整理 | 最終判断 | 証跡                   |
| -------------- | ---------------------------------------- | --------------------------- | ---------- | -------- | ---------------------- |
| 初期リリース   | 初期成功基準と受入条件を満たす           | 試験結果、未解決事項        | QE、PM     | PO       | レビュー結果、決定記録 |
| 店頭試用の継続 | 記録継続と日常負担が許容範囲内           | 2週間の利用記録、利用者所感 | BA、PM     | PO       | 試用結果、決定記録     |
| 重大変更       | 範囲、費用、試用日、利用者価値へ影響する | 影響、代替案、推奨案        | PM         | PO       | 変更要求、決定記録     |

品質・費用・個人情報に重大な懸念がある場合、担当ロールは作業を止め、PM が PO の判断材料を整理する。

<!-- specdojo:finding id=F007 severity=major rule=vp-qe-kata-conformance line=27 現金支出、作業時間、運用負荷を区別して管理する規則 (6.2) が適用されず、「参加者の時間」に混在している。 -->

## 4. 正本・報告・見直し

<!-- specdojo:finding id=F002 severity=major rule=vp-arc-cross-document-consistency line=35 判断ゲートの条件に成功基準等の ID（SC-01等）による参照がなく、正本との追跡可能性が欠如している。 -->
<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-verifiability line=35 判断条件が総称的であり、具体的にどの項目で pass/fail を判定するかが不明確である。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-qe-kata-conformance line=35 判断ゲートにおいて条件 ID を参照せず総称で記載しており、rulebook (6.3) に違反している。 -->
<!-- specdojo:finding id=F009 severity=minor rule=vp-ux-readability line=35 判断ゲートの条件が抽象的であり、参照先を即座に特定できないため、可読性が低い。 -->

| 情報                     | 正本                   | 更新・報告契機         | 主な確認者 |
| ------------------------ | ---------------------- | ---------------------- | ---------- |
| 目的・範囲・成功条件     | プロジェクト定義成果物 | 基準変更時             | PO、PM     |
| 作業順序・担当           | Schedule               | 節目、遅延、依存変更時 | PM         |
| 課題・リスク・変更・決定 | プロジェクト登録簿     | 発生時、状態変更時     | PM、PO     |
| 品質結果                 | レビュー・試験記録     | 各判断ゲート前         | QE、PO     |
| 費用・参加時間           | 支出・作業記録         | 上限接近時、試用終了時 | PM、PO     |

本計画は、価値仮説、初期範囲、成功基準、費用・時間上限、体制のいずれかが変わったときに見直す。

## 5. 未決事項

| 論点                                 | 決定期限           | 判断者 |
| ------------------------------------ | ------------------ | ------ |
| 現金支出と試用準備時間の具体的な上限 | 初期リリース着手前 | PO     |

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=46 正本表に RACI が含まれておらず、責任の正本が不明確である。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-omissions-consistency line=46 正本表に RACI が欠落している。 -->
<!-- specdojo:finding id=F005 severity=minor rule=vp-qe-omissions-consistency line=55 未決事項表に template で定義されている「現状」列が欠落している。 -->
<!-- specdojo:finding id=F008 severity=minor rule=vp-qe-kata-conformance line=57 未決事項に _UNDECIDED_: ラベルが付与されておらず、rulebook (6.5) に違反している。 -->
