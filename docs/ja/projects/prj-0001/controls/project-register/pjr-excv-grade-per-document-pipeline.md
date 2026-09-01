---
specdojo:
  id: prj-0001:pjr-excv-grade-per-document-pipeline
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: high
  owner: ARC
  registered_at: "2026-09-01T12:02:27Z"
  due_on: "2026-09-30"
---

# PJR-EXCV grade の3段評価を文書単位で回す実行経路を作る

## 1. 概要

grade の 3 段評価（reference あり → reference なし → codex 確認）は、現在「段」を外側、
「文書」を内側にしたループで実行される。この順序では codex への呼び出しが最終段に集中し、
301 件が連続する burst となって rate limit を招く。また中断するとその段の進捗を失う。

ループを入れ替え、1 文書について 3 段を通しで実行する経路を作る。1 文書が完結単位に
なるため、結果は都度 frontmatter へ確定し、中断しても再開できる。

3 段目の絞り込み（`--verdict pass --min-score 96 --max-findings 1`）は `grade plan` の
選択フィルタであり、条件を満たさなければ plan が 0 件になる。これをスキップ判定として
利用できるため、条件分岐のための新規実装は要らない。

## 2. 完了条件

- 1 文書について 3 段を通しで実行する経路が存在し、段ごとに agent と reference を指定できる。
- 評価対象の種別を絞り込める。初回運用は rulebook のみを対象とする。
- 1 段目のリファレンスは `prj-overview` 系に固定する。無作為選定は使わない。
- 3 段目は 2 段目の結果が条件を満たす文書でのみ実行される。
- 中断後に再実行すると、未評価の文書から再開できる。
- 実行結果（各段の所要時間・verdict・score）を後から確認できる。
- まず shell script として実装し、手順が読める形にする。

リファレンスを固定するのは、実行のたびに選定が変わると評価の揺れが実装の差か
リファレンスの差か切り分けられないためである。初回を rulebook に限るのは、全 301 文書を
ローカル 2 段で処理すると約 65 時間かかり、閾値の妥当性を確かめる前に投じる時間としては
大きすぎるためである。

## 3. 作業内容

| No  | 作業                                           | 担当 | 状態 | メモ                           |
| --- | ---------------------------------------------- | ---- | ---- | ------------------------------ |
| 1   | 文書単位 3 段ループの script を書く            | ARC  | open | PJR-TA5C の primitive を使う   |
| 2   | 段ごとの agent と reference を引数化する       | ARC  | open | 1 段目は prj-overview 系に固定 |
| 2.1 | 評価対象の種別を絞り込めるようにする           | ARC  | open | 初回運用は rulebook のみ       |
| 3   | 中断・再開の挙動を確認する                     | ARC  | open | `--ungraded` で残りを拾う      |
| 4   | 少数サンプルで所要時間と rate limit を測定する | ARC  | open | 全件走査の前に見積もる         |
| 5   | 実績を踏まえ CLI 内蔵の要否を判断する          | ARC  | open | `grade run` として固めるか     |

## 4. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 5. 関連ドキュメント

- [[prj-0001:pjr-ta5c-agent-run-primitive]]: 前提となる primitive。
- [[prj-0001:pjr-wzma-job-responsibility-boundary]]: 本経路の完成後に job を整理する。
- [[prj-0001:pjr-25f4-grade-two-stage-filter]]: 3 段構成の運用方針。
