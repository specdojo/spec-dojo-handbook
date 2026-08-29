---
specdojo:
  id: prj-0001:pjr-zyfz-single-responsibility-viewpoint
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: medium
  owner: ARC
  registered_at: "2026-08-29T14:52:37Z"
  due_on: "2026-09-30"
  register_events:
    - v: 1
      id: reg_6f581f0538d14825901d8b38c9fe35e0
      ts: "2026-08-29T14:52:37Z"
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
          to: 文書責務の単一性を見る viewpoint を追加する
        - field: description
          from: ""
          to: 1つの文書が複数の独立した主題を同居させている状態を検出する観点が既存の viewpoint に存在しない。opr-rulebook は 6 章に障害対応、バックアップ、バッチ再実行、運用変更、アカウント付与など 9 種類の運用手順を並べ、対応する sample が 9 件存在する。483 行という分量と 22 行の sample との乖離はこの構造に起因する。vp-arc-conciseness は同一主張の反復を見る観点であり、主題の多さは判定できない。vp-arc-single-responsibility を追加し、章立ての独立性、対応する sample や template の数、対象読者と参照文脈の違いから分割の要否を判定する。分割が必要と判定された場合の対処は既存の maintenance approach の範囲を超えるため、扱いを別途決める。
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
---

# PJR-ZYFZ 文書責務の単一性を見る viewpoint を追加する

## 1. 概要

1つの文書が複数の独立した主題を同居させている状態を検出する観点が、既存の viewpoint に存在しない。

`opr-rulebook.md` は 6 章に障害対応、アラート対応、バックアップとリストア、バッチ再実行、運用変更作業、アカウント付与と剥奪、問い合わせ一次対応など 9 種類の運用手順を並べている。対応する sample も `opr-incident-sample` から `opr-access-control-sample` まで 9 件存在する。483 行という分量と、対応する `opr-batch-sample.md`（22 行）との乖離は、この構造に起因する。

障害対応とアカウント付与は、対象読者も実施タイミングも異なる別の運用である。1つの規範文書へ収める必然性がない。

`vp-arc-single-responsibility` を追加し、分割の要否を判定できるようにする。

## 2. 完了条件

- 文書責務の単一性を見る viewpoint が共通正本へ追加されている。
- 判定基準が category 単位のルーブリックと整合し、level 0-4 で判定できる。
- 既存の `vp-arc-conciseness` との判定範囲の違いが定義されている。
- `opr-rulebook.md` を評価したとき、複数主題の同居を検出できる。
- 分割が必要と判定された場合の対処方法が決まっている。
- `npm run check` が通る。

## 3. 作業内容

| No  | 作業                         | 担当   | 状態 | メモ                                   |
| --- | ---------------------------- | ------ | ---- | -------------------------------------- |
| 1   | viewpoint の定義             | ARC    | open | check、evidence、severity、評価属性    |
| 2   | ルーブリックの定義           | ARC    | open | level 0-4 の判定基準                   |
| 3   | 既存観点との境界の明確化     | ARC    | open | conciseness との違いを規範文書へ記載   |
| 4   | 分割が必要な場合の対処の決定 | ARC    | open | maintenance の範囲外である問題への対応 |
| 5   | 共通正本への追加             | _TODO_ | open | defaults/pm-review-viewpoints.yaml     |
| 6   | 判定の確認                   | _TODO_ | open | opr-rulebook を対象に検出できるか      |

### 3.1. 既存観点との違い

| 観点                          | 判定内容                           | 本項目との関係                               |
| ----------------------------- | ---------------------------------- | -------------------------------------------- |
| `vp-arc-conciseness`          | 同一主張の反復、規範を含まない散文 | 反復ではなく主題の多さを見る点で異なる       |
| `vp-qe-omissions-consistency` | 必須要素の抜け漏れ、矛盾           | 欠落ではなく過剰を見る点で異なる             |
| `vp-arc-document-structure`   | Frontmatter、ID、ファイル名、配置  | 構造の形式ではなく責務の範囲を見る点で異なる |

冗長性は「同じことを繰り返している」状態、責務の単一性は「異なることを1つに詰め込んでいる」状態である。前者は削れば解決するが、後者は分割しなければ解決しない。対処が異なるため観点を分ける。

### 3.2. 判定材料

- 章立ての独立性。各章が独立して参照・更新される単位になっているか。
- 対応する実践の型の数。1つの rulebook に対して sample が多数存在する場合、主題が分かれている兆候となる。この情報は plan の参考資料から機械的に得られる。
- 対象読者と実施タイミングの違い。
- 分量。分量そのものは判定基準ではないが、他の兆候と重なる場合は補強材料となる。

### 3.3. 分割が必要と判定された場合の問題

finding が「分割せよ」となった場合、既存の `<kind>-maintenance` approach の範囲を超える。maintenance は1つの実践の型を見直す作業であり、次の作業を想定していない。

- 新規ファイルの作成と ID の採番
- 成果物カタログへの登録
- 分割元を参照している文書の更新
- 対応する sample / recipe / template の再割り当て

人が判断して登録簿へ起票する運用とするか、分割専用の approach を設けるかを決める必要がある。grade は評価のみを行い修正しないという原則があるため、検出と対処の間に人の判断を挟む形が自然である。

### 3.4. 未決の論点

- 分割の粒度をどこまで grade が示すか。「分割すべき」までか、「この章とこの章を分けるべき」までか。
- 分割を判定する閾値。sample が何件あれば主題が分かれていると見なすかは、機械的な基準にすると誤検出を招く。
- 索引文書（`*-index-rulebook`）のように、複数主題をまとめること自体が目的の文書をどう扱うか。

## 4. 対応結果

-

## 5. 関連ドキュメント

- [[prj-0001:pjr-kce0-review-viewpoints-inheritance]]: 共通 viewpoint 正本の構成。追加先。
- [[prj-0001:pjr-49d2-quality-assessment]]: grade の設計。観点とルーブリックの共有方針。
- [[prj-0001:pjr-vqb5-agent-grade-comparison]]: opr-rulebook の構造問題を検出した実測記録。
