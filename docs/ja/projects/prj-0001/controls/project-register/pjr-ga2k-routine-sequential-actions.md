---
specdojo:
  id: prj-0001:pjr-ga2k-routine-sequential-actions
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: in-progress
  priority: medium
  owner: ARC
  registered_at: "2026-08-31T12:41:15Z"
  due_on: "2026-09-30"
  register_events:
    - v: 1
      id: reg_7430da9a2dd047ddb990cdc01967402f
      ts: "2026-08-31T12:41:15Z"
      action: add
      actor: manual
      from_status: null
      to_status: open
      reason: item added
      changes:
        - field: status
          from: ""
          to: open
        - field: title
          from: ""
          to: routine の action で複数段の順次実行を可能にする
        - field: description
          from: ""
          to: routine の action は単一オブジェクトのみを受け付けるため、複数の処理を順に実行できない。grade を段階的に回す運用では、リファレンスありで評価し、続いてリファレンスなしで失敗分を拾い、最後に条件を満たしたものだけを高性能 agent で確認する流れが要る。cron の時刻をずらす方法では実行時間が読めず順序を保証できない。実測では1件あたり 5 分から 11 分かかり、失敗時の再試行でさらに延びる。action を oneOf で配列も受け付ける形へ拡張し、配列の場合は先頭から順に実行する。既存の 6 件はすべて単一であり、rulebook frontmatter の sample と同じく単一を基本として配列も許容する形とすることで移行を不要にする。
        - field: type
          from: ""
          to: todo
        - field: priority
          from: ""
          to: medium
        - field: owner
          from: ""
          to: ARC
        - field: registered
          from: ""
          to: "2026-08-31"
        - field: due
          from: ""
          to: "2026-09-30"
    - v: 1
      id: reg_d107df2705f1478ebbae89c96a934a5a
      ts: "2026-08-31T12:47:16Z"
      action: start
      actor: codex-expert-executor
      from_status: open
      to_status: in-progress
      reason: work started
      changes:
        - field: status
          from: open
          to: in-progress
      previous_event_id: reg_7430da9a2dd047ddb990cdc01967402f
---

# PJR-GA2K routine の action で複数段の順次実行を可能にする

## 1. 概要

`routine` の `action` は単一オブジェクトのみを受け付けるため、複数の処理を順に実行できない。

grade を段階的に回す運用では、リファレンスありで評価し、続いてリファレンスなしで失敗分を拾い、最後に条件を満たしたものだけを高性能 agent で確認する流れが要る。

`action` を `oneOf` で配列も受け付ける形へ拡張し、配列の場合は先頭から順に実行する。

## 2. 完了条件

- `action` に配列を指定でき、先頭から順に実行される。
- 既存の単一オブジェクト形式がそのまま動作する。
- 途中の段が失敗した場合の扱いが定義されている。
- 段ごとに異なる引数を指定できる。
- `npm run check` が通る。

## 3. 作業内容

| No  | 作業               | 担当   | 状態 | メモ                     |
| --- | ------------------ | ------ | ---- | ------------------------ |
| 1   | 失敗時の扱いの決定 | ARC    | open | 中断するか後続を続けるか |
| 2   | schema の拡張      | _TODO_ | open | `oneOf` へ配列を追加     |
| 3   | 実行処理の実装     | _TODO_ | open | 順次実行と結果の記録     |
| 4   | 規範文書の更新     | _TODO_ | open | routine 運用ガイド       |

### 3.1. cron による代替が成立しない理由

時刻をずらして複数の routine を定義する方法では、順序を保証できない。

grade の実測では1件あたり 5 分から 11 分かかり、失敗時の再試行でさらに延びる。kata 285 件を対象にすると1段階で 24 時間から 52 時間を要する計算になる。`--changed-only` で絞っても、初回や rubric の更新後は全件が対象になる。

`policy.overlap: skip` により重複実行は防げるが、2段目が1段目の未完了分を無視して走るため、順序の意味が失われる。

### 3.2. 単数形を保つ理由

`action` は単一を基本とし、必要な場合に配列も受け付ける形とする。キー名は単数形のままとする。

既存の routine 6 件はすべて単一であり、複数段が要るのは grade の運用に限られる。rulebook の Frontmatter における `sample` も、単一を基本としつつ `oneOf` で配列を許容し、キー名は単数形である。同じ形にすることで既存 routine の移行が不要になる。

常に複数となる `categories` や `findings` とは性質が異なる。

### 3.3. 未決の論点

- 途中の段が失敗した場合に後続を実行するか。grade の運用では2段目が1段目の失敗分を拾うため、続行が望ましい。一方で前段の成功を前提とする処理では中断すべきである。段ごとに指定できるようにするか、routine 全体の方針とするか。
- 段ごとの実行結果をどこへ記録するか。どの段まで完了したかが分からないと、途中で中断した場合の再開ができない。
- 段の間に待機を挟む必要があるか。ローカルモデルは同時実行数が制限されており、連続実行で負荷が集中する可能性がある。

## 4. 対応結果

-

## 5. 関連ドキュメント

- [[prj-0001:pjr-25f4-grade-two-stage-filter]]: 段階的な grade 運用。本項目を前提とする。
- [[prj-0001:pjr-3d7q-grade-target-filter]]: 判定結果による対象選択。段ごとに対象を変えるために要る。
- [[specdojo:routine-operation-guide]]: routine の運用手順。
