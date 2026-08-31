---
specdojo:
  id: prj-0001:pjr-25f4-grade-two-stage-filter
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: medium
  owner: ARC
  registered_at: "2026-08-30T12:22:15Z"
  due_on: "2026-09-30"
  register_events:
    - v: 1
      id: reg_b85b0998a43c4611911b0fbed2b21304
      ts: "2026-08-30T12:22:15Z"
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
          to: grade の二段階フィルタ運用を設計する
        - field: description
          from: ""
          to: ローカルモデルは判定が甘く、単独では見落としが生じる。dec-rulebook.md はローカル構成（qwen executor と gemma reporter）で verdict pass、score 96 と判定されたが、codex-expert は単独で 12 件、claude-expert は 23 件の指摘を出している。一方で needs-work や fail と判定されたものは既に修正対象が確定しており、高性能 agent による再評価の価値は低い。定期評価をローカルで全件回し、pass と判定されたものだけを codex-expert で再確認する二段階フィルタとすることで、API コストを抑えつつ見落としを拾える。score による絞り込みも併用し、高得点ほど見落としの疑いが強いという性質を利用する。フィルタの閾値と codex の対象範囲は、サンプル評価で得た pass 率と score 分布から決める。
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
          to: "2026-08-30"
        - field: due
          from: ""
          to: "2026-09-30"
---

# PJR-25F4 grade の段階的な運用を設計する

## 1. 概要

ローカルモデルは判定が甘く、単独では見落としが生じる。`dec-rulebook.md` はローカル構成（qwen を executor、gemma を reporter）で verdict が `pass`、score が 96 と判定されたが、`codex-expert-executor` は単独で 12 件、`claude-expert-executor` は 23 件の指摘を出している。

一方で `needs-work` や `fail` と判定されたものは、既に修正対象が確定しており、高性能 agent による再評価の価値は低い。

定期評価をローカルで全件回し、`pass` と判定されたものだけを codex-expert で再確認する二段階フィルタとすることで、API コストを抑えつつ見落としを拾える。

## 2. 完了条件

- ローカル評価の結果から再確認対象を選び出せる。
- 再確認の対象範囲を決める基準が定義されている。verdict だけでなく score も用いる。
- 二段階目の評価が一段階目の finding を引き継ぎ、severity を維持する。
- 運用手順が規範文書へ記載されている。
- サンプル評価の結果から閾値が根拠づけられている。

## 3. 作業内容

| No  | 作業                       | 担当   | 状態 | メモ                                     |
| --- | -------------------------- | ------ | ---- | ---------------------------------------- |
| 1   | サンプル評価による分布把握 | ARC    | open | rulebook を対象に pass 率と score を測る |
| 2   | フィルタ基準の決定         | ARC    | open | verdict と score の組み合わせ            |
| 3   | 対象選択の実装             | _TODO_ | open | grade plan での絞り込み                  |
| 4   | 運用手順の文書化           | _TODO_ | open | routine 運用ガイド                       |

### 3.1. 見落としの実例

`dec-rulebook.md` に対する評価結果である。

| 評価者                    | verdict / 平均 level | finding |
| ------------------------- | -------------------- | ------- |
| ローカル（qwen と gemma） | pass / score 96      | 1       |
| `codex-expert-executor`   | 平均 level 2.75      | 12      |
| `claude-expert-executor`  | 平均 level 2.62      | 23      |

ローカルが問題なしと判定した文書に対し、codex は 12 件の指摘を出した。ローカルの `pass` は信頼できない。

### 3.2. 3 段構成

実測を踏まえ、次の順序で実行する。

| 回  | 構成                              | ERROR 率 | 役割                           |
| --- | --------------------------------- | -------- | ------------------------------ |
| 1   | ローカル、リファレンスあり        | 33%      | 深い指摘を取る                 |
| 2   | ローカル、リファレンスなし        | 11%      | 1 回目の失敗を拾い、指摘を確認 |
| 3   | `codex-expert-executor`、条件付き | 低い     | 見落としの最終確認             |

リファレンスありは精度が高いが失敗しやすい。2 回目の安定性で 1 回目の失敗を補う。実測では 1 回目に失敗した `pr` と `cdsd` が、リファレンスなしでは成功している。

2 回目で判定が緩まないことは severity の維持（PJR-Z8T1）が保証する。1 回目にリファレンスありで検出した `major` は、2 回目で `minor` へ格下げされない。

### 3.3. 3 回目の対象

| 条件                          | 根拠                                                                                            |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| `pass` かつ finding が 0-1 件 | `ifx-index` は 2 回とも score 100、finding 0 件。問題がないのか検出できていないのか判別できない |
| 2 回とも失敗し未評価          | `opr` は 3 回とも失敗し記録が残っていない                                                       |

`needs-work` と `fail` は修正すべき指摘が確定しているため対象外とする。score だけで絞ると `gl`（score 96 だが `needs-work`）を取りこぼすため、verdict と finding 件数を組み合わせる。

実測 9 件を当てはめると 2 件から 3 件が対象となり、kata 285 件では 60 件から 85 件に相当する。

### 3.3. 効率の見積もり

削減効果はローカルの `pass` 率に依存する。

| `pass` 率 | codex の対象（285 件中） | 削減効果     |
| --------- | ------------------------ | ------------ |
| 20%       | 57 件                    | 大きい       |
| 50%       | 143 件                   | 中程度       |
| 80%       | 228 件                   | ほとんどない |

ローカルモデルは判定が甘い傾向にあるため、`pass` 率が高くなる可能性がある。サンプル評価で実測してから基準を決める。

### 3.5. 前提となる機能

本項目の運用には次の 2 つが要る。いずれも別項目で扱う。

- routine が複数段を順に実行できること。現在の `action` は単一オブジェクトのみを受け付ける。cron の時刻をずらす方法では実行時間が読めず順序を保証できない。PJR-GA2K で扱う。
- 判定結果で対象を絞れること。現在は `--path` と `--changed-only` しかなく、`verdict` や finding 件数で選べない。PJR-3D7Q で扱う。

### 3.6. 未決の論点

- 3 回目で問題が見つからなかった文書を次回以降どう扱うか。毎回確認すると削減効果が失われる。
- 3 回目に用いる agent。`codex-expert-executor` は major を 8 件出し、`claude-expert-executor` は 19 件を出した。コストと網羅性の均衡で選ぶ。
- 種別による差。rulebook と sample では文書の性質が異なるため、条件を分ける必要があるか。
- リファレンスありの ERROR 率 33% をどう下げるか。全文ではなく抜粋を渡す、分量の小さい文書にだけ付けるなどの案がある。

## 4. 対応結果

-

## 5. 関連ドキュメント

- [[prj-0001:pjr-vqb5-agent-grade-comparison]]: agent ごとの検出能力の差と、ローカル構成の実測記録。
- [[prj-0001:pjr-ankr-grade-executor-reporter]]: ローカルで grade を回すための2段構成。
- [[prj-0001:pjr-x40m-grade-previous-findings]]: 前回 finding の引き継ぎ。二段階目でも指摘を保つ。
- [[prj-0001:pjr-z8t1-grade-finding-severity]]: severity の維持。二段階目で格下げが起きない前提となる。
