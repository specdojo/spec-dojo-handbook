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

# PJR-25F4 grade の二段階フィルタ運用を設計する

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

### 3.2. フィルタの考え方

| ローカルの結果           | 扱い                                   |
| ------------------------ | -------------------------------------- |
| `fail`                   | 修正へ。再評価しない                   |
| `needs-work`             | 修正へ。再評価しない                   |
| `pass` かつ score が低め | 境界的だが問題が検出されている。修正へ |
| `pass` かつ score が高い | 見落としの疑いが強い。codex で再確認   |

高得点ほど疑わしいという性質を利用する。ローカルが「ほぼ完璧」と判定したものほど、実際には検出できていない可能性が高い。

### 3.3. 効率の見積もり

削減効果はローカルの `pass` 率に依存する。

| `pass` 率 | codex の対象（285 件中） | 削減効果     |
| --------- | ------------------------ | ------------ |
| 20%       | 57 件                    | 大きい       |
| 50%       | 143 件                   | 中程度       |
| 80%       | 228 件                   | ほとんどない |

ローカルモデルは判定が甘い傾向にあるため、`pass` 率が高くなる可能性がある。サンプル評価で実測してから基準を決める。

### 3.4. 未決の論点

- score の閾値をどこに置くか。サンプル評価の分布を見て決める。
- 再確認で問題が見つからなかった文書を、次回以降どう扱うか。毎回 codex で確認すると削減効果が失われる。
- 二段階目に用いる agent を codex に固定するか、claude を含めるか。claude-expert は codex より多くの指摘を出すが、コストも高い。
- 種別による差。rulebook と sample では文書の性質が異なるため、閾値を分ける必要があるか。

## 4. 対応結果

-

## 5. 関連ドキュメント

- [[prj-0001:pjr-vqb5-agent-grade-comparison]]: agent ごとの検出能力の差と、ローカル構成の実測記録。
- [[prj-0001:pjr-ankr-grade-executor-reporter]]: ローカルで grade を回すための2段構成。
- [[prj-0001:pjr-x40m-grade-previous-findings]]: 前回 finding の引き継ぎ。二段階目でも指摘を保つ。
- [[prj-0001:pjr-z8t1-grade-finding-severity]]: severity の維持。二段階目で格下げが起きない前提となる。
