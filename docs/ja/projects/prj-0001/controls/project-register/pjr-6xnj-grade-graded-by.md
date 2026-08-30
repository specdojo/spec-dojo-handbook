---
specdojo:
  id: prj-0001:pjr-6xnj-grade-graded-by
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: medium
  owner: ARC
  registered_at: "2026-08-30T01:11:23Z"
  due_on: "2026-09-30"
  register_events:
    - v: 1
      id: reg_bf061ef2082c4715b3575858b7c3d8a0
      ts: "2026-08-30T01:11:23Z"
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
          to: grade の graded_by を CLI 側で確定させる
        - field: description
          from: ""
          to: GradeSubmission の graded_by は agent が自己申告するため値が安定しない。実測では codex が /root、qwen が executor-agent と specdojo-grade/qwen-expert-executor で揺れ、claude は claude と claude-sonnet-4-5 で異なった。同一 agent の連続実行でも値が変わるため、どの agent がどう判定したかを追跡できず、agent 別の傾向分析と再現性の検証が成立しない。plan で値を指定するか grade apply の実行時に CLI が確定させる方式へ変更する。
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

# PJR-6XNJ grade の graded_by を CLI 側で確定させる

## 1. 概要

GradeSubmission の `graded_by` は agent が自己申告するため、値が安定しない。同一 agent の連続実行でも異なる値が記録される。

どの agent がどう判定したかを追跡できないため、agent 別の傾向分析と再現性の検証が成立しない。plan で値を指定するか、`grade apply` の実行時に CLI が確定させる方式へ変更する。

## 2. 完了条件

- 同一 agent で繰り返し評価しても `graded_by` が同じ値になる。
- 値が `pm-members.yaml` の nickname など、agent を一意に識別できる語彙に基づいている。
- agent の自己申告が誤っていても、記録される値が正しい。
- 既存の grade 記録との互換性が保たれている。
- `npm run check` が通る。

## 3. 作業内容

| No  | 作業                     | 担当   | 状態 | メモ                                 |
| --- | ------------------------ | ------ | ---- | ------------------------------------ |
| 1   | 確定方法の決定           | ARC    | open | plan での指定か apply 実行時の付与か |
| 2   | 識別子の語彙の決定       | ARC    | open | nickname、モデル名、その両方         |
| 3   | 実装                     | _TODO_ | open | 自己申告値の扱いを含む               |
| 4   | 既存記録との互換性の確認 | _TODO_ | open | 既に書き込まれた grade をどう扱うか  |

### 3.1. 観測された値

6 つの agent で同一の plan を実行した際の実測値である。

| agent                    | 記録された `graded_by`                                        |
| ------------------------ | ------------------------------------------------------------- |
| `codex-expert-executor`  | `/root`                                                       |
| `codex-executor`         | `/root`                                                       |
| `qwen-expert-executor`   | `executor-agent` および `specdojo-grade/qwen-expert-executor` |
| `claude-expert-executor` | `claude`                                                      |
| `claude-executor`        | `claude-sonnet-4-5`                                           |
| `gemma-expert-executor`  | モデル名                                                      |

codex は実行環境のパスを返しており、agent を識別できない。qwen は同一 agent の2回の実行で異なる値を返した。claude は expert と normal で語彙が揃っていない。

### 3.2. 影響

- agent 別の傾向を集計できない。どの agent が甘くどの agent が厳格かを、記録された grade から追跡できない。
- 再現性を検証できない。同一文書を複数回評価したときのレベル差を測る際、実行主体を特定できない。
- 評価の妥当性を後から検討できない。品質の低い判定が見つかっても、どの agent によるものか判別できない。

### 3.3. 検討する方式

| 方式                        | 利点                         | 欠点                                      |
| --------------------------- | ---------------------------- | ----------------------------------------- |
| plan へ値を埋め込む         | agent は指示に従うだけでよい | agent が書き換える余地が残る              |
| `apply` の引数で受け取る    | 呼び出し側が確実に制御できる | 実行経路ごとに指定が必要                  |
| 実行時の agent 情報から導出 | 自動で正しい値になる         | grade が agent 起動の文脈を知る必要がある |

agent の自己申告を信用しない方式が望ましい。判定内容は agent に委ねるが、実行主体の記録は事実として CLI が持つべきである。

### 3.4. 未決の論点

- モデル名を併記するか。同じ nickname でも背後のモデルが更新されると判定傾向が変わるため、モデル名は追跡に有用である。ただし取得方法が provider ごとに異なる。
- 既に書き込まれた `graded_by` を再評価時に上書きするか、区別できる形で残すか。

## 4. 対応結果

-

## 5. 関連ドキュメント

- [[prj-0001:pjr-vqb5-agent-grade-comparison]]: 値の不安定さを観測した実測記録。
- [[prj-0001:pjr-49d2-quality-assessment]]: grade の設計と Frontmatter への記録形式。
