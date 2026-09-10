---
specdojo:
  id: specdojo:pm-decision-log-template
  type: template
  status: ready
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:pm-decision-log
      type: project
      status: ready
      part_of:
        - _PROJECT_ID_:pjr-index
      rulebook: specdojo:pjr-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 79
    graded_at: "2026-09-10T08:02:49.593Z"
    graded_by: codex-expert-executor
    content_hash: be713dcc14b74513845a581f862b4b51e138f8cb8d5ee8e94a038b537f3040a4
    categories:
      consistency: { score: 50 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 3, minor: 1, note: 0 }
---

# 決定記録

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=3 「正本は個票の Frontmatter」と断定しているが、`pjr-rulebook` と生成処理ではタイトルは個票の H1、説明は個票本文を正本として表へ導出するため、構造化フィールドだけが Frontmatter の正本であることと本文由来列の修正先を明記する必要がある。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=3 `pjr-rulebook` が生成ビューの直接編集を禁止し、`register-operation-guide` が手編集は次回の `register build` で失われると定める一方、本注記は「再生成可能」としか示さず禁止事項・修正先・再生成コマンドを欠くため、個票を修正して `specdojo register build —project ＜project-id＞` を実行する手順を明記する必要がある。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance line=3 template が生成物へ出力する正本説明は、`pjr-rulebook` が定める「構造化現在値は Frontmatter、タイトルは H1、説明・根拠等は本文」という責務分担を表現しておらず、生成された決定記録の適用方法を誤らせるため, rulebook と同じ正本境界へ修正する必要がある。 -->
<!-- specdojo:finding id=F004 severity=minor rule=vp-ux-readability line=3 初見の読者が修正先と次の操作を判断できるよう、個票を更新対象とすること、手編集は失われること、`register-operation-guide` または `specdojo register build` への導線を注記へ追加する必要がある。 -->

> このファイルは各 `pjr-XXXX-<topic>.md`（個票）から生成された派生ビューです。正本は個票の Frontmatter であり、このファイルは再生成可能です。

<!-- specdojo:view-slot=table -->
