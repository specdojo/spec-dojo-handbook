---
specdojo:
  id: specdojo:pjr-issue-template
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
      item_type: issue
      item_status: open
      priority: medium
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 96
    graded_at: "2026-09-06T08:13:56.639Z"
    graded_by: codex-expert-executor
    content_hash: b890ff86791961a799547dbe5467d55e71fb036ca817f2cff14015176e5170fc
    categories:
      consistency: { score: 100 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 100 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 3, score: 75 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 4, score: 100 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 2, note: 0 }
---

# _PJR-XXXX_ _ISSUE_TITLE_

## 1. 課題内容

<!-- specdojo:finding id=F001 severity=minor rule=vp-arc-conciseness line=5 第1節の記述ガイドに含まれる「影響」は第2節の影響範囲表と重複するため, 第1節から削除して課題の現象・発生日の記述に集中させることが望ましい。 -->
<!-- specdojo:finding id=F002 severity=minor rule=vp-ux-readability line=5 課題内容の記述ガイドにおいて「影響」への言及があるが、第2節で詳述するため冗長である。また、現象と問題の切り分けなど、記載品質を揃えるための具体的なガイドを具体化することが望ましい。 -->

_TODO_: すでに顕在化している問題、発生日、影響を記載する。

## 2. 影響範囲

| 観点         | 影響   |
| ------------ | ------ |
| スコープ     | _TODO_ |
| スケジュール | _TODO_ |
| コスト       | _TODO_ |
| 品質         | _TODO_ |
| 関係者       | _TODO_ |

## 3. 対応方針

| 項目     | 内容   |
| -------- | ------ |
| 原因     | _TODO_ |
| 対応策   | _TODO_ |
| 依存事項 | _TODO_ |
| 完了条件 | _TODO_ |

## 4. 対応結果

_TODO_: 解決内容、確認結果、再発防止策を記載する。未解決の場合は `-` とする。

## 5. 関連ドキュメント

- _TODO_: 根拠・影響先・追跡先を `[[doc-id]]` 形式で記載する。
