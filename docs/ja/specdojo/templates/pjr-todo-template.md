---
specdojo:
  id: specdojo:pjr-todo-template
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
      item_type: todo
      item_status: open
      priority: medium
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 73
    graded_at: "2026-09-06T09:15:02.371Z"
    graded_by: codex-expert-executor
    content_hash: 1376184724af985cd8cd6ed0ecff77125e83af8424b5528df75a6ae2f07356a0
    categories:
      consistency: { score: 50 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 63 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 3, minor: 5, note: 0 }
---

# _PJR-XXXX_ _TODO_TITLE_

## 1. 概要

_TODO_: 実施すべき作業と、その作業が必要になった理由を 1〜3 文で記載する。

## 2. 完了条件

- _TODO_: 完了と判断できる具体的な条件を記載する。

## 3. 作業内容

| No  | 作業   | 担当   | 状態 | メモ |
| --- | ------ | ------ | ---- | ---- |
| 1   | _TODO_ | _TODO_ | open | -    |

## 4. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 5. 関連ドキュメント

- _TODO_: 根拠・影響先・追跡先を `[[doc-id]]` 形式で記載する。
