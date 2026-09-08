---
specdojo:
  id: specdojo:pjr-views-by-status-template
  type: template
  status: draft
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:pjr-views-by-status
      type: project
      status: ready
      rulebook: specdojo:pjr-rulebook
      part_of:
        - _PROJECT_ID_:pjr-index
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 86
    graded_at: "2026-09-06T09:56:06.966Z"
    graded_by: codex-expert-executor
    content_hash: 23181d4138df9440e78f71cf6be8bed62adebe41af6e7b6806e63cca752e30f8
    categories:
      consistency: { score: 63 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 88 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 3, score: 75 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 1, minor: 4, note: 0 }
---

# 台帳ビュー（状態別）

> このファイルは各 `pjr-XXXX-<topic>.md`（個票）から生成された派生ビューです。正本は個票の Frontmatter であり、このファイルは再生成可能です。

## 1. 状態別

<!-- specdojo:view-slot=by-status -->
