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

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=13 「作業内容」表の「担当」「状態」と既定値 `open` は、Frontmatter を唯一の正本とし担当・処理状態を本文へ重複記載しない `specdojo:pjr-rulebook` に反し、`owner` / `item_status` 更新後も本文が古い値を示し得るため、列を削除するか作業ステップ固有の別概念であることを明示する必要がある。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=13 「担当」「状態」を作業表へ保持する構成は、担当・処理状態を Frontmatter のみに保存する禁止事項と矛盾し、個票全体の値との不一致を招くため、重複列を除去するか作業ステップ固有フィールドとして責務境界を定義する必要がある。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-qe-kata-conformance line=13 テンプレートが Frontmatter の `owner` / `item_status` と区別できない「担当」「状態」を本文の固定列として生成するため、対応 rulebook の適用結果が構造化フィールドを重複保持しないという要件を満たさない。 -->
<!-- specdojo:finding id=F007 severity=minor rule=vp-ux-readability line=13 「担当」「状態」が個票全体の担当・処理状態なのか各作業行の担当・進捗なのか説明されておらず、初見の利用者が更新対象を判断できないため、列名または補足で適用範囲を明示する必要がある。 -->
<!-- specdojo:finding id=F008 severity=minor rule=vp-ux-language-consistency line=13 Frontmatter の `status`、`item_status` と本文表の「状態」が区別されず、既定値も `item_status` と同じ `open` であるため、作業行固有なら「作業ステップ進捗」などへ改称して値の意味を定義する必要がある。 -->

| No  | 作業   | 担当   | 状態 | メモ |
| --- | ------ | ------ | ---- | ---- |
| 1   | _TODO_ | _TODO_ | open | -    |

## 4. 対応結果

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-verifiability line=19 「対応結果」の記入指示に各完了条件の確認結果・検証根拠が含まれず、条件を満たしたかの pass / fail を成果物内で追跡できないため、完了条件ごとの確認結果または証跡を記載する指示を追加する必要がある。 -->
<!-- specdojo:finding id=F004 severity=minor rule=vp-qe-omissions-consistency line=19 `specdojo:pjr-rulebook` が結果・結論に求める「完了を判定した根拠と後続対応」のうち、記入指示は実施内容・成果物・残課題だけで完了判定根拠を要求していないため、必須内容を補う必要がある。 -->

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 5. 関連ドキュメント

<!-- specdojo:finding id=F006 severity=minor rule=vp-qe-kata-conformance line=23 `template-authoring-standard` は実在文書へのリンクを `[[id|title]]` 形式と定めているが、対象は `[[doc-id]]` 形式を指示しているため、タイトルを含む規定形式へ修正する必要がある。 -->

- _TODO_: 根拠・影響先・追跡先を `[[doc-id]]` 形式で記載する。
