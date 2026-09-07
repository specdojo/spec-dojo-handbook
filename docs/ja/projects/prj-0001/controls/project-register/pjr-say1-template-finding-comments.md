---
specdojo:
  id: prj-0001:pjr-say1-template-finding-comments
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: high
  owner: ARC
  registered_at: "2026-09-07T13:14:06Z"
  due_on: "2026-09-30"
---

# PJR-SAY1 同梱テンプレートから finding コメントを除去する

## 1. 概要

docs/ja/specdojo/templates 配下の 26 件に specdojo:finding コメントが残っている。register 単体構成の実測で、finding コメントが生成された登録簿の要約欄へ流入することを確認した。テンプレート本体から除去するか、生成時に除去する。npm 公開の前提条件である。

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
