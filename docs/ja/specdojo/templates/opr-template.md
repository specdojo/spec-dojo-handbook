---
specdojo:
  id: specdojo:opr-template
  type: template
  status: draft
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:_LOCAL_ID_
      type: operations
      status: draft
      rulebook: specdojo:opr-rulebook
      based_on: _BASED_ON_
      supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 95
    graded_at: "2026-09-06T07:16:51.764Z"
    graded_by: gemma-expert-executor
    content_hash: 76f9f6d085fb3ae3b59bf4e981be31243bb940d5a8e8e0682f3147c2169e0cae
    categories:
      consistency: { score: 75 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 100 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 1, minor: 0, note: 0 }
---

# _DELIVERABLE_NAME_

_DELIVERABLE_OVERVIEW_

## 1. 概要

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-omissions-consistency line=7 Frontmatter の必須項目 `title` が `frontmatter_template` に不足しており、`opr-rulebook` の定義（4.1）に違反している。 -->

_TODO_: 対象となる運用作業と、この手順によって再現可能にする結果を記述する。`opr-<term>` の場合は `opr-index` のどの共通規約を参照し、何を具体化する文書かを明示する。

## 2. 手順適用範囲・前提

| 項目     | 内容   |
| -------- | ------ |
| 対象     | _TODO_ |
| 対象外   | _TODO_ |
| 時間帯   | _TODO_ |
| 必要権限 | _TODO_ |
| 使用手段 | _TODO_ |
| 連絡先   | _TODO_ |

## 3. 日次・週次・月次点検手順

| 頻度   | 手順   | 実施者 | 完了条件 | 証跡   |
| ------ | ------ | ------ | -------- | ------ |
| _TODO_ | _TODO_ | _TODO_ | _TODO_   | _TODO_ |

## 4. 障害対応手順

| 優先度 | 初動目標 | 切り分け | 一次対応 | 復旧   | エスカレーション |
| ------ | -------- | -------- | -------- | ------ | ---------------- |
| _TODO_ | _TODO_   | _TODO_   | _TODO_   | _TODO_ | _TODO_           |

## 5. アラート対応手順

| 段階   | 手順   | 完了条件 | 証跡   |
| ------ | ------ | -------- | ------ |
| _TODO_ | _TODO_ | _TODO_   | _TODO_ |

## 6. バックアップ確認・リストア手順

_TODO_: バックアップ確認、リストア、演習の順に、実施条件、完了条件、証跡を記述する。RTO / RPO がある場合は達成可否の判定方法を含める。

## 7. バッチ再実行・失敗時対応

_TODO_: 失敗の検知方法、再実行条件、再実行上限、重複実行の防止条件、エスカレーション先を記述する。

## 8. 運用変更作業

| 変更種別 | 承認者 | 実施条件 | 完了条件 | ロールバック条件 | 証跡   |
| -------- | ------ | -------- | -------- | ---------------- | ------ |
| _TODO_   | _TODO_ | _TODO_   | _TODO_   | _TODO_           | _TODO_ |

## 9. アカウント付与・剥奪手順

_TODO_: 申請、承認、実施、検証、記録の流れを記述する。定期棚卸しや緊急権限がある場合は、その手順と証跡も含める。

## 10. 問い合わせ一次対応手順

_TODO_: 問い合わせの分類、一次対応、ナレッジの参照、開発・業務・運用への引き継ぎ条件を記述する。

## 11. 証跡

| 証跡種別 | 保存先 | 保管期間 | 参照権限 | 最低限残す識別子 |
| -------- | ------ | -------- | -------- | ---------------- |
| _TODO_   | _TODO_ | _TODO_   | _TODO_   | _TODO_           |

## 12. 関連ドキュメント導線

| 種別   | ドキュメント ID | 目的   | 備考   |
| ------ | --------------- | ------ | ------ |
| _TODO_ | _TODO_          | _TODO_ | _TODO_ |
