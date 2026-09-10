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
    graded_at: "2026-09-10T07:31:28.943Z"
    graded_by: codex-expert-executor
    content_hash: a0390a3251498a866b2c1913cdaf3e99ca5cbc77b654c2312ad40ab0b25d8fcf
    categories:
      consistency: { score: 63 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 100 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 2, score: 50 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 2, minor: 3, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=1 成果物カタログは状態別ビューを `pjr-by-status` / `pjr-by-status.md` と定義する一方、このテンプレート・PJR rulebook・生成実装は `pjr-views-by-status` / `pjr-views-by-status.md` を使用しているため、カタログ側を統一しないと成果物 ID と生成先の解決が食い違う。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-language-consistency line=1 同じ状態別ビューについて成果物カタログの `pjr-by-status` とテンプレート・rulebook・生成実装の `pjr-views-by-status` が併存しているため、local_id とファイル名を一つの表記へ統一する必要がある。 -->

# 台帳ビュー（状態別）

<!-- specdojo:finding id=F002 severity=minor rule=vp-arc-cross-document-consistency line=3 PJR rulebook はタイトルを個票 H1、説明を個票本文の正本とし、生成実装も両者を状態別ビューへ出力するため、「正本は個票の Frontmatter」という記述を「個票の Frontmatter・H1・本文」等へ改めて生成元を正確に示す必要がある。 -->
<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-omissions-consistency line=3 状態別ビューのタイトルと説明は個票の H1・本文からも生成されるため、正本を Frontmatter のみに限定した注記へ H1・本文を追加し、生成元の責務を漏れなく示す必要がある。 -->
<!-- specdojo:finding id=F004 severity=minor rule=vp-ux-readability line=3 タイトルは個票 H1、説明は個票本文から生成されることを注記に含め、表示内容を修正するときに確認すべき場所を初見の読者が誤認しないようにする必要がある。 -->

> このファイルは各 `pjr-XXXX-<topic>.md`（個票）から生成された派生ビューです。正本は個票の Frontmatter であり、このファイルは再生成可能です。

## 1. 状態別

<!-- specdojo:view-slot=by-status -->
