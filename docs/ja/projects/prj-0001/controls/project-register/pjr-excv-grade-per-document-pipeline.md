---
specdojo:
  id: prj-0001:pjr-excv-grade-per-document-pipeline
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: review
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
| 1   | 文書単位 3 段ループの script を書く            | ARC  | done | PJR-TA5C の primitive を使用   |
| 2   | 段ごとの agent と reference を引数化する       | ARC  | done | 1 段目は prj-overview 系に固定 |
| 2.1 | 評価対象の種別を絞り込めるようにする           | ARC  | done | 既定は rulebook                |
| 3   | 中断・再開の挙動を確認する                     | ARC  | done | 段単位 state の回帰テスト      |
| 4   | 少数サンプルで所要時間と rate limit を測定する | ARC  | open | `--limit` で実運用時に測定     |
| 5   | 実績を踏まえ CLI 内蔵の要否を判断する          | ARC  | open | 測定後に `grade run` を判断    |

## 4. 対応結果

- `tools/grade/run-per-document.sh` を追加し、1文書について reference ありのローカル評価、reference なしのローカル評価、条件付き codex 確認を完了してから次の文書へ進む経路を作成した。
- 各段の executor / reporter / reference を引数化した。1段目は `prj-overview` 系だけを受理し、既定値を `prj-overview-rulebook.md` に固定した。対象種別は `rulebook` / `recipe` / `sample` / `template` から選択でき、初回運用の既定値は `rulebook` とした。
- 文書・段ごとの state と `results.tsv` を run ID ごとに保存する。rate limit の終了コード75や割り込みでは現在段を未完了に保ち、同じ run ID で完了済みの段を飛ばして再開する。各段の所要秒数、status、verdict、score、finding 件数、agent、reference を後から確認できる。
- 2段目の保存済み結果が `pass`、score 96以上、finding 1件以下をすべて満たした場合だけ3段目を実行する。2段目が失敗した場合は結果を推測せず、3段目のスキップ理由を記録する。
- fake agent を用いた回帰テストで3段の順次適用、完了文書のスキップ、rate limit 後の段単位再開を確認した。実 agent を使う少数サンプルの時間・rate limit 測定と、測定結果に基づく CLI 内蔵判断は残課題である。
- [[specdojo:command-reference]] に実行例、引数、再開 state、計測結果の確認方法を記載した。

## 5. 関連ドキュメント

- [[prj-0001:pjr-ta5c-agent-run-primitive]]: 前提となる primitive。
- [[prj-0001:pjr-wzma-job-responsibility-boundary]]: 本経路の完成後に job を整理する。
- [[prj-0001:pjr-25f4-grade-two-stage-filter]]: 3 段構成の運用方針。
