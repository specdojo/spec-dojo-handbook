---
specdojo:
  id: prj-0001:pjr-z8t1-grade-finding-severity
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: in-progress
  priority: high
  owner: ARC
  registered_at: "2026-08-30T04:12:52Z"
  due_on: "2026-09-30"
  register_events:
    - v: 1
      id: reg_4cfad8c46dec4cf789c1dfbaa3f97424
      ts: "2026-08-30T04:12:52Z"
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
          to: 未解消の finding は前回の severity を維持する
        - field: description
          from: ""
          to: grade を累積実行すると severity が格下げされ、繰り返すほど評価が甘くなる。qwen で評価した後に gemma で再評価した実測では、引き継いだ 9 件の指摘がすべて minor へ再分類され、blocker と major が 0 件になった結果 verdict が pass、score 80 となった。gemma は単独評価では同じ文書へ blocker を出しており、必須章の欠落という深刻な問題は解消されていない。plan は前回の rule を前回評価時の分類として扱い各観点を独立に評価するよう指示しており、この指示が severity にも作用している。指摘の数は保たれるが重みが保証されないため、累積するほど深刻度が薄まる。未解消と判定された指摘については前回の severity を維持する。
        - field: type
          from: ""
          to: todo
        - field: priority
          from: ""
          to: high
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
      id: reg_aed8a914896442feb68c988396e42dd4
      ts: "2026-08-30T04:13:51Z"
      action: start
      actor: codex-expert-executor
      from_status: open
      to_status: in-progress
      reason: work started
      changes:
        - field: status
          from: open
          to: in-progress
      previous_event_id: reg_4cfad8c46dec4cf789c1dfbaa3f97424
---

# PJR-Z8T1 未解消の finding は前回の severity を維持する

## 1. 概要

grade を累積実行すると severity が格下げされ、繰り返すほど評価が甘くなる。

qwen で評価した後に gemma で再評価した実測では、引き継いだ 9 件の指摘がすべて `minor` へ再分類された。`blocker` と `major` が 0 件になった結果、verdict は `pass`、score は 80 となった。gemma は単独評価では同じ文書へ `blocker` を出しており、必須章の欠落という深刻な問題は解消されていない。

未解消と判定された指摘については、前回の severity を維持する。解消されていない問題の深刻度が下がる理由はない。

## 2. 完了条件

- 前回の指摘が未解消と判定された場合、その finding の severity が前回以上に保たれる。
- severity を引き下げる場合は、引き下げの根拠が message に含まれる。
- 累積実行を繰り返しても verdict が不当に緩まない。
- 実測で用いた `opr-batch-sample.md` を qwen と gemma で連続評価し、`blocker` または `major` が保持されることを確認する。
- `npm run check` が通る。

## 3. 作業内容

| No  | 作業                     | 担当   | 状態 | メモ                                         |
| --- | ------------------------ | ------ | ---- | -------------------------------------------- |
| 1   | 維持の判定方法の決定     | ARC    | open | agent の申告を採るか CLI が強制するか        |
| 2   | 引き下げを許す条件の決定 | ARC    | open | 過大評価の訂正をどう扱うか                   |
| 3   | 実装                     | _TODO_ | open | 前回 severity との突き合わせ                 |
| 4   | 累積実行での検証         | _TODO_ | open | qwen から gemma の順で severity が保たれるか |

### 3.1. 観測された事象

`opr-batch-sample.md` を対象に、qwen で評価して結果を書き込み、続いて gemma で再評価した。2 段目の plan には前回の指摘 9 件が自動で引き継がれている。

| 段階   | agent | finding 件数 | severity の内訳         | verdict |
| ------ | ----- | ------------ | ----------------------- | ------- |
| 1 段目 | qwen  | 9            | blocker と major を含む | -       |
| 2 段目 | gemma | 9            | minor 9 件のみ          | pass    |

指摘の件数は保たれたが、severity がすべて `minor` へ下がった。level の最低は 2 であり、`minor` が level 上限 3 を課す規則とは矛盾しない。判定規則そのものは正しく動作しており、severity の判定が甘くなったことが原因である。

対象文書は rulebook が必須とする 12 章のうち 1 章しかなく、Frontmatter は別系統の rulebook を指し、証跡と実施者と完了条件が欠落している。単独評価では `claude-expert-executor` が平均 level 1.88、`gemma-expert-executor` が 2.88 と判定した文書である。

### 3.2. 原因

plan は「前回の rule は前回評価時の分類として扱い、各 viewpoint は現在の根拠から独立に評価する」と指示している。これは観点割り当ての引きずりを防ぐための指示だが、severity にも作用している。

引き継ぎは指摘の数を保つが重みを保証しない。累積するほど深刻度が薄まり、繰り返すほど評価が緩む逆効果が生じる。定期実行では毎週この処理が走るため、影響は累積する。

### 3.3. 検討した代替案

| 案                              | 内容                                     | 判断                                   |
| ------------------------------- | ---------------------------------------- | -------------------------------------- |
| severity の引き下げに根拠を要求 | message へ理由を含めさせる               | agent の遵守に依存し確実性がない       |
| 最も重い severity を採用        | CLI が前回と今回を比較して重いほうを残す | 正当な引き下げもできなくなる           |
| severity を引き継がない         | rule と message のみ渡す                 | 毎回独立に判定されるため問題が再発する |
| 未解消なら前回を維持            | 解消と判定されない限り severity を保つ   | 採用                                   |

採用案でも、agent が誤って解消と判定した場合は severity が失われる。ただし解消の誤判定は finding 自体が消える問題であり、severity に限った話ではない。

### 3.4. 未決の論点

- 維持を CLI が強制するか、plan の指示に委ねるか。指示の遵守能力はモデルにより異なることが実測で判明しているため、CLI 側で強制するほうが確実である。
- 前回が過大評価だった場合の訂正手段。維持を強制すると、誤って `blocker` と判定された指摘が永続する。
- 何世代にわたって維持するか。解消されない指摘の severity が引き継がれ続けると、文書の改善が進んでも評価が変わらない可能性がある。

## 4. 対応結果

-

## 5. 関連ドキュメント

- [[prj-0001:pjr-x40m-grade-previous-findings]]: 前回 finding の引き継ぎ。本問題の発生源となる仕組み。
- [[prj-0001:pjr-vqb5-agent-grade-comparison]]: agent ごとの判定傾向と累積効果の記録。
- [[prj-0001:pjr-49d2-quality-assessment]]: severity と level の拘束、verdict の判定規則。
