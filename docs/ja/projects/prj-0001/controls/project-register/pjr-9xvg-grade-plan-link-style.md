---
specdojo:
  id: prj-0001:pjr-9xvg-grade-plan-link-style
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: in-progress
  priority: medium
  owner: ARC
  registered_at: "2026-08-29T14:58:09Z"
  due_on: "2026-09-30"
  register_events:
    - v: 1
      id: reg_d6fd27ccfd7741778008543b3af97b0d
      ts: "2026-08-29T14:58:09Z"
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
          to: grade plan を全文埋め込みからパス参照へ変更し exec plan と構造を揃える
        - field: description
          from: ""
          to: grade plan は評価対象と参考資料の全文を埋め込むため、サイズが対象の分量に依存する。opr-batch-sample を対象にした場合 63,631 文字となり、旧バッチ方式の 46,673 文字を上回った。exec plan は対象をパスで示し agent が読む方式であり、grade plan だけが異なる構造を持つ理由がない。パス参照へ変更すれば plan はほぼ静的になり、対象文書を更新しても再生成が不要になる。本文の重複も解消する。frontmatter と章構成も exec plan へ揃える。agent がファイルを読むことが前提となるため、参考資料を必ず読む旨を plan へ明記し、実行ログで読み込みを確認する。読まない agent は grade に使えないと判断する。
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
          to: "2026-08-29"
        - field: due
          from: ""
          to: "2026-09-30"
    - v: 1
      id: reg_b403ddd990de41b4ad195c0fcf77b382
      ts: "2026-08-29T15:07:17Z"
      action: start
      actor: codex-expert-executor
      from_status: open
      to_status: in-progress
      reason: work started
      changes:
        - field: status
          from: open
          to: in-progress
      previous_event_id: reg_d6fd27ccfd7741778008543b3af97b0d
---

# PJR-9XVG grade plan を全文埋め込みからパス参照へ変更し exec plan と構造を揃える

## 1. 概要

grade plan は評価対象と参考資料の全文を埋め込む。そのためサイズが対象の分量に依存し、`opr-batch-sample.md`（22 行）を対象にした場合は参考資料の `opr-rulebook.md`（483 行）を含めて 63,631 文字となった。旧バッチ方式の 46,673 文字を上回っており、評価単位を1文書へ縮小した意図が損なわれている。

exec plan は対象をパスで示し、agent がそれを読む方式である。grade plan だけが異なる構造を持つ理由がない。パス参照へ変更し、frontmatter と章構成も exec plan へ揃える。

## 2. 完了条件

- grade plan が評価対象と参考資料をパスで示し、本文を埋め込まない。
- plan のサイズが対象の分量に依存せず、ほぼ一定になる。
- 対象文書を更新しても plan の再生成が不要である。
- frontmatter の項目と章構成が exec plan と揃っている。
- 参考資料を読むことが plan に明記され、評価対象と参考資料の区別が保たれている。
- agent が実際にファイルを読んでいることを実行ログで確認できる。
- `npm run check` が通る。

## 3. 作業内容

| No  | 作業                         | 担当   | 状態 | メモ                                       |
| --- | ---------------------------- | ------ | ---- | ------------------------------------------ |
| 1   | exec plan との構造対応の決定 | ARC    | open | frontmatter 項目と章構成の対応づけ         |
| 2   | 参考資料の提示方法の決定     | ARC    | open | パスの列挙、読む順序、対象との区別の示し方 |
| 3   | plan 生成の実装変更          | _TODO_ | open | 全文埋め込みの除去とパス参照への置き換え   |
| 4   | agent の読み込み確認         | _TODO_ | open | 実行ログでファイル読み取りを検証           |
| 5   | 判定精度への影響確認         | _TODO_ | open | 埋め込み方式との level 差を比較            |
| 6   | 規範文書の更新               | _TODO_ | open | command-reference ほか                     |

### 3.1. exec plan との対応

| 項目         | exec plan                                                            | 現在の grade plan | 変更後             |
| ------------ | -------------------------------------------------------------------- | ----------------- | ------------------ |
| 対象の示し方 | パス                                                                 | 全文を埋め込み    | パス               |
| frontmatter  | `id` / `type` / `task_id` / `mode` / `project_id` / `owner` ほか     | 一部のみ          | exec plan へ揃える |
| 章構成       | このタスクで行うこと / 対象項目 / 進め方 / 完了手順 / 異常終了の条件 | 独自              | exec plan へ揃える |
| サイズ       | 対象の分量に依存しない                                               | 依存する          | 依存しない         |

### 3.2. 変更による効果

| 観点         | 全文埋め込み（現状）                    | パス参照               |
| ------------ | --------------------------------------- | ---------------------- |
| plan サイズ  | 対象と参考資料の分量に比例（最大 63KB） | 数 KB で一定           |
| 陳腐化       | 対象を更新すると plan が古くなる        | しない                 |
| 内容の重複   | 同じ本文が2箇所に存在する               | ない                   |
| 再生成の頻度 | 対象が変わるたびに必要                  | 対象や観点の増減時のみ |

plan がほぼ静的になる点が大きい。内容が「対象パス、参考資料パス、観点、ルーブリック」だけになるため、対象文書の更新で再生成する必要がなくなり、冪等性が徹底される。

### 3.3. 検証が必要な点

agent がファイルを読まない可能性がある。比較実験では claude がファイル読み取りツールを使わずに判定していた。plan に全文が含まれていたため読む必要がなかったと考えられるが、確証はない。qwen は関連文書をツールで読み込んでいた。

パス参照へ変更した後、実行ログでファイル読み取りを確認する。読まない agent は評価対象の内容を把握できないため、grade には使えないと判断する。

### 3.4. 再現性の考え方

全文埋め込みは plan が入力を完全に固定するため、同じ plan なら同じ入力になる。パス参照では対象文書の変更により入力が変わる。

ただし grade は現在の状態を観測するものであり、評価時点の最新を読むことが正しい挙動である。`exec trial` で複数 agent を比較する場合も、同時刻に実行すれば条件は揃う。再現性の低下は許容する。

### 3.5. 未決の論点

- 参考資料の提示方法。パスの列挙だけとするか、どの観点でどれを参照するかまで示すか。
- 参考資料の件数に上限を設けるか。対応する実践の型が多い文書では読む対象が増える。
- 対象文書が巨大な場合の扱い。パス参照にしても agent が読む量は変わらないため、`opr-rulebook.md` のような文書では依然としてコンテキストを圧迫する。文書側の分割は PJR-ZYFZ で扱う。

## 4. 対応結果

-

## 5. 関連ドキュメント

- [[prj-0001:pjr-4tz7-grade-per-document]]: 1文書単位の評価と plan 保存。本項目はその plan 構造を見直す。
- [[prj-0001:pjr-zyfz-single-responsibility-viewpoint]]: 文書分割の判定。対象自体が巨大な問題を扱う。
- [[prj-0001:pjr-vqb5-agent-grade-comparison]]: agent ごとのファイル読み取り挙動の実測記録。
- [[specdojo:exec-operation-guide]]: exec plan の構造と運用。
