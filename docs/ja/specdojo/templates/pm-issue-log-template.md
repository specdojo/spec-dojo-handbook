---
specdojo:
  id: specdojo:pm-issue-log-template
  type: template
  status: ready
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:pm-issue-log
      type: project
      status: ready
      part_of:
        - _PROJECT_ID_:pjr-index
      rulebook: specdojo:pjr-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 59
    graded_at: "2026-09-10T15:32:17.642Z"
    graded_by: gemma-expert-executor
    content_hash: 645a294129e5c679cba78843e5c6a90643db256906aaf323222f5721788afafc
    categories:
      consistency: { score: 13 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 2, major: 3, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=1 Frontmatter の rulebook ID が `specdojo:pjr-rulebook` となっており, 正しくは `specdojo:pm-issue-log-rulebook` である。 -->
<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-omissions-consistency line=1 rulebook で必須とされている 6 つの構成章（概要、課題ログ一覧、優先度と期限、対応計画、進捗レビュー、関連ドキュメント）がすべて欠落している。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=1 べきある構成要素や入力ガイド（_TODO_ 等）が一切なく, 初見の読者が rulebook に沿って内容を記述するための手段が提供されていない。 -->

# 課題ログ

> このファイルは各 `pjr-XXXX-<topic>.md`（個票）から生成された派生ビューです。正本は個票の Frontmatter であり、このファイルは再生成可能です。

<!-- specdojo:view-slot=table -->

<!-- specdojo:finding id=F002 severity=major rule=vp-arc-cross-document-consistency line=11 本文中で文書を「派生ビュー」と定義しているが, 対応する rulebook および sample では手動作成の構造化文書として定義されており, 成果物間の整合性が取れていない。 -->
<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-kata-conformance line=11 rulebook で定義された構成を無視し, 自動生成ビューとしての定義となっているため, 作成用テンプレートとしての責務を果たしていない。 -->
