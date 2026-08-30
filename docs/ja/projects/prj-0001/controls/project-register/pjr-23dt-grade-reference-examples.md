---
specdojo:
  id: prj-0001:pjr-23dt-grade-reference-examples
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: in-progress
  priority: medium
  owner: ARC
  registered_at: "2026-08-30T13:07:19Z"
  due_on: "2026-09-30"
  register_events:
    - v: 1
      id: reg_b2f09dd55ac94235b5324e2761b2bd99
      ts: "2026-08-30T13:07:20Z"
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
          to: grade plan へ良い実例をリファレンスとして渡す
        - field: description
          from: ""
          to: 記載水準の判定には比較対象が要る。現在の plan は対応する実践の型と抽象的な rubric しか含まず、level 4 と level 3 を分ける具体的な基準がない。同系統で status が ready の文書をリファレンスとして渡せば、この水準が ready であるという具体的な基準が得られる。rulebook は 102 件中 19 件が ready であり比較対象は足りている。生成より比較のほうが負荷が小さいため、ローカルモデルほど効果が見込める。リファレンスを実行ごとにランダムへ選べば、特定文書への過適合を防ぎつつ、実行ごとに異なる観点の指摘が得られる。前回 finding の引き継ぎと組み合わせることで、繰り返すほど網羅性が上がる。ready は品質保証ではないため、grade の運用が進んだ後は verdict が pass かつ高性能 agent で確認済みの文書へ切り替える。
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
    - v: 1
      id: reg_6b2e7af059c3498986927785bf094933
      ts: "2026-08-30T13:32:04Z"
      action: start
      actor: codex-expert-executor
      from_status: open
      to_status: in-progress
      reason: work started
      changes:
        - field: status
          from: open
          to: in-progress
      previous_event_id: reg_b2f09dd55ac94235b5324e2761b2bd99
---

# PJR-23DT grade plan へ良い実例をリファレンスとして渡す

## 1. 概要

記載水準の判定には比較対象が要る。現在の plan は対象文書、対応する実践の型、抽象的な rubric、viewpoint の定義を含むが、良い文書の実例を含まない。

rubric は「各章が固有情報を持ち、削れる段落がない」といった抽象的な記述であり、level 4 と level 3 を分ける具体的な基準にならない。同系統で `status` が `ready` の文書をリファレンスとして渡せば、この水準が ready であるという基準が得られる。

生成より比較のほうが負荷が小さいため、ローカルモデルほど効果が見込める。

## 2. 完了条件

- plan に同系統の良い実例がリファレンスとして含まれる。
- リファレンスは評価対象ではなく比較材料であることが plan に明記されている。
- リファレンスが実行ごとに選び直され、特定文書への過適合が起きない。
- どの文書をリファレンスとしたかが記録される。
- plan のサイズが対象と参考資料の合計で一定の範囲に収まる。
- リファレンスなしの場合と比較して判定が変化することを確認する。

## 3. 作業内容

| No  | 作業             | 担当   | 状態 | メモ                            |
| --- | ---------------- | ------ | ---- | ------------------------------- |
| 1   | 選定基準の決定   | ARC    | open | status、種別、将来は grade 結果 |
| 2   | 選択方法の決定   | ARC    | open | ランダムの範囲と件数、記録方法  |
| 3   | サイズ上限の設計 | ARC    | open | 大きい文書を引いた場合の扱い    |
| 4   | plan 生成の実装  | _TODO_ | open | リファレンスの解決と埋め込み    |
| 5   | 効果の確認       | _TODO_ | open | リファレンスなしとの判定比較    |

### 3.1. 現状の plan に欠けているもの

plan の構成は「対象項目」「参考資料」「前回の指摘」「Rubric」「Viewpoints」「完了手順」である。参考資料は対象に対応する rulebook / recipe / sample / template であり、規範を示すものであって良い実例ではない。

`status` の分布は rulebook で draft が 83 件、ready が 19 件である。比較対象は足りている。

### 3.2. リファレンスなしで観測された症状

サンプル評価では、ローカル構成（qwen を executor、gemma を reporter）の判定が高得点に偏った。

| 対象  | verdict | score | severity |
| ----- | ------- | ----- | -------- |
| `dec` | pass    | 96    | minor 1  |
| `ntp` | pass    | 98    | minor 1  |
| `mm`  | pass    | 87    | minor 5  |

`major` と `blocker` が出ていない。同じ `dec-rulebook.md` に対して `codex-expert-executor` は 12 件、`claude-expert-executor` は 23 件の指摘を出しており、判定の差は大きい。

抽象的な基準だけでは、どの程度の不足を major とするかを判断できていない可能性がある。

### 3.3. ランダム選択の意義

リファレンスを固定すると、その文書に似ているかどうかだけを見るようになる恐れがある。実行ごとに選び直せば、異なる観点からの指摘が得られる。

前回 finding の引き継ぎと組み合わせると、繰り返すほど網羅性が上がる。同一 agent を2回実行しても新しい指摘が出なかった実測があるが、リファレンスが変われば同じ agent でも別の観点が生まれうる。

### 3.4. リファレンスの品質

`status: ready` は文書の成熟度を示すが品質を保証しない。当面は ready を代用し、grade の運用が進んだ後は verdict が `pass` かつ高性能 agent で確認済みの文書へ切り替えることが望ましい。

誤った基準の伝播に注意する。リファレンス自体に問題があれば、それが水準として扱われる。

### 3.5. 未決の論点

- リファレンスの件数。1 件で足りるか、複数を並べて幅を示すか。
- 種別をまたぐか。rulebook の評価に sample を混ぜる意味があるか。
- plan サイズの上限。rulebook は 2 KB から 28 KB まで幅があり、大きい文書を引くと plan が膨張する。抜粋を渡すか、サイズで選定から除外するか。
- リファレンスの記録先。`specdojo.grade` へ残すか、plan にのみ残すか。判定の再現性に関わる。

## 4. 対応結果

-

## 5. 関連ドキュメント

- [[prj-0001:pjr-4tz7-grade-per-document]]: plan の生成と参考資料の解決。リファレンスの追加先。
- [[prj-0001:pjr-x40m-grade-previous-findings]]: 前回 finding の引き継ぎ。ランダム選択と組み合わせて効果を高める。
- [[prj-0001:pjr-vqb5-agent-grade-comparison]]: agent ごとの判定の差と、ローカル構成の高得点への偏り。
- [[prj-0001:pjr-25f4-grade-two-stage-filter]]: 二段階フィルタ。リファレンスにより一段階目の精度が上がれば対象が絞れる。
