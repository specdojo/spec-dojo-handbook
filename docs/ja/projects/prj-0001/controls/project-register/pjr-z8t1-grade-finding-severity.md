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

| No  | 作業                     | 担当 | 状態 | メモ                                          |
| --- | ------------------------ | ---- | ---- | --------------------------------------------- |
| 1   | 維持の判定方法の決定     | ARC  | done | CLI が同一 message を突き合わせて強制する     |
| 2   | 引き下げを許す条件の決定 | ARC  | done | 別の残存問題として根拠を新しい message に記す |
| 3   | 実装                     | ARC  | done | 前回 severity と viewpoint level を補正する   |
| 4   | 累積実行での検証         | ARC  | done | qwen から gemma への格下げ事象を回帰テスト化  |

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

### 3.4. 実装方針

- plan は、未解消の finding を前回と同じ message、同等以上の severity で提出するよう agent へ指示する。
- `grade apply` は対象本文に残る前回 finding と今回の finding を message で照合する。同じ message の severity が軽くなった場合は前回値へ戻し、viewpoint level も severity 上限まで補正する。rule が変わっても message が同じなら維持対象とする。
- 前回の問題が解消され、別の軽微な問題だけが残る場合は別 finding として扱い、severity を引き下げる根拠を新しい message に含める。これにより過大評価の訂正経路を残す。
- 最新スナップショットだけを次回へ引き継ぐ既存仕様を維持する。未解消 finding は各世代で残るため severity も継続して維持され、解消された finding は次回以降の照合対象から外れる。

## 4. 対応結果

- grade plan に、未解消 finding の message を変更せず severity を前回と同等以上にする指示と、別の軽微な問題へ引き下げる場合は根拠を message に含める指示を追加した。
- `grade apply` の Markdown 更新処理で前回と今回の finding を照合し、未解消 finding の severity と、その severity が課す viewpoint level 上限を CLI 側で維持するようにした。
- 前回と今回で rule が変わっても message が同一なら severity を維持する回帰テストと、根拠を含む別の残存問題は低い severity で記録できる回帰テストを追加した。
- コマンドリファレンスと文書メタデータ標準へ、未解消 finding の照合・補正と severity 引き下げ時の記録規則を反映した。

## 5. 関連ドキュメント

- [[prj-0001:pjr-x40m-grade-previous-findings]]: 前回 finding の引き継ぎ。本問題の発生源となる仕組み。
- [[prj-0001:pjr-vqb5-agent-grade-comparison]]: agent ごとの判定傾向と累積効果の記録。
- [[prj-0001:pjr-49d2-quality-assessment]]: severity と level の拘束、verdict の判定規則。
