---
specdojo:
  id: specdojo:pjr-change-request-template
  type: template
  status: draft
  frontmatter_template:
    specdojo:
      id: _PJR_DOCUMENT_ID_
      type: project
      status: draft
      rulebook: specdojo:pjr-rulebook
      part_of:
        - _PROJECT_ID_:pjr-index
      item_type: change-request
      item_status: open
      priority: medium
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 94
    graded_at: "2026-09-06T07:30:26.431Z"
    graded_by: gemma-expert-executor
    content_hash: be8579d4c964a9f9414c550d0a993553eb2d6aaf63524e5e11d4964b8875a4be
    categories:
      consistency: { score: 100 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 88 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 4, score: 100 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 3, note: 0 }
---

# _PJR-XXXX_ _CHANGE_REQUEST_TITLE_

## 1. 変更要求

| 項目     | 内容   |
| -------- | ------ |
| 要求内容 | _TODO_ |
| 申請者   | _TODO_ |
| 申請日   | _TODO_ |
| 変更理由 | _TODO_ |

## 2. 影響評価

| 観点         | 影響   |
| ------------ | ------ |
| スコープ     | _TODO_ |
| スケジュール | _TODO_ |
| コスト       | _TODO_ |
| 品質         | _TODO_ |
| 運用         | _TODO_ |

## 3. 審査・決定

| 項目     | 内容                              |
| -------- | --------------------------------- |
| 審査結果 | 承認 / 条件付き承認 / 却下 / 保留 |
| 決定者   | _TODO_                            |
| 決定日   | _TODO_                            |
| 実施条件 | _TODO_                            |

## 4. 実施追跡

| 項目     | 内容   |
| -------- | ------ |
| 実施担当 | _TODO_ |
| 実施期限 | _TODO_ |
| 完了条件 | _TODO_ |
| 対応結果 | _TODO_ |

## 5. 関連ドキュメント

- _TODO_: 根拠・影響先・追跡先を `[[doc-id]]` 形式で記載する。
