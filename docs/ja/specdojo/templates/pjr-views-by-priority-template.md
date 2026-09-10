---
specdojo:
  id: specdojo:pjr-views-by-priority-template
  type: template
  status: draft
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:pjr-views-by-priority
      type: project
      status: ready
      rulebook: specdojo:pjr-rulebook
      part_of:
        - _PROJECT_ID_:pjr-index
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 100
    graded_at: "2026-09-10T07:09:47.758Z"
    graded_by: gemma-expert-executor
    content_hash: 3a10bd70e3b2dfce6e2b5bdf44d2cf6eb44dfa7c8958b248f731b3d268ed71a8
    categories:
      consistency: { score: 100 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 100 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 4, score: 100 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 0, note: 0 }
---

# 台帳ビュー（優先度別）

> このファイルは各 `pjr-XXXX-<topic>.md`（個票）から生成された派生ビューです。正本は個票の Frontmatter であり、このファイルは再生成可能です。

## 1. 優先度別

<!-- specdojo:view-slot=by-priority -->
