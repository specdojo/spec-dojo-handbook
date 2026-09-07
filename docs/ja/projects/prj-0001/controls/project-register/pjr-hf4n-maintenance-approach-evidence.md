---
specdojo:
  id: prj-0001:pjr-hf4n-maintenance-approach-evidence
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: waiting
  priority: high
  owner: ARC
  registered_at: "2026-09-07T11:42:57Z"
  due_on: "2026-09-30"
  block_reason: "agent exited with non-zero code: runner validation「test-unit」が failed（exec-plans.test.ts の4件の maintenance テンプレートテスト失敗）。"
---

# PJR-HF4N maintenance の根拠が finding の性質と噛み合わない

## 1. 概要

`<kind>-maintenance` は「成果物・review result・対象領域の慣行」を根拠に kata を見直す設計である。
一方 `grade` が記録する finding には、rulebook との構成不整合を指摘するものが含まれる。この場合
根拠は rulebook にあり、成果物ではない。

根拠の所在が噛み合わないため、agent は「根拠不足」と判断して修正を見送る。

## 2. 観測

[[prj-0001:pjr-t3vq-maintenance-plan-target-path]] の実行検証で確認した。

`br-sample.md`（`fail`、finding 8件）に対し `sample-maintenance` の plan を
`codex-expert-executor` へ渡した。

| 項目    | 結果       |
| ------- | ---------- |
| 章構成  | 変更なし   |
| finding | 8 件のまま |

agent の判断は次のとおりである。

```text
br-sample.md の finding は確認しましたが、根拠不足のため
推測による改訂やコメント削除はしていません
```

これは plan の指示どおりである。

```text
根拠不足のまま推測で sample を改訂しない。確証が得られた範囲に改訂を限定し、残りは…
```

コメントだけを削除する振る舞いは起きていない。指示は正しく守られている。

## 3. 問題の構造

対象の finding は次のとおりである。

```text
severity=blocker rule=vp-qe-kata-conformance line=9
ルールブックで定義された標準テンプレートに従っておらず、
ビジネスルールの書き方を示すサンプルとしての役割を果たしていない。
```

この指摘の根拠は rulebook の章構成にある。`br-rulebook.md` は
`概要 / 入力 / ルール / 出力 / 例外 / メモ` を定めるが、`br-sample.md` は
`目的と適用範囲 / 入力情報 / 記述内容 / 最小記述例 / 未解決事項` である。

修正に必要なのは rulebook の構成であり、成果物や review result ではない。

`sample-maintenance` の手順は次を根拠として指示する。

```text
2. 複数の成果物・review result・対象領域の慣行を根拠に、それらが完成例として適切かを見直す。
```

rulebook は「構造・必須項目・禁止事項は rulebook を正とする」という形で言及されるが、
根拠として読むよう指示されていない。

その結果、agent は「成果物と review result が不足している」と判断し、rulebook を根拠に修正
できる場面でも見送る。

## 4. 影響

`vp-qe-kata-conformance` は sample の blocker 12件のうち最多を占める観点である。sample 87件中
35件が `fail` で、その多くが同種の指摘を含む。

この状態では `maintenance` を回しても修正が進まない。137件の要修正が滞る。

## 5. 完了条件

- finding の指摘内容に応じて必要な根拠を読むよう指示されている。rulebook との不整合を指摘する
  finding では rulebook を根拠として扱う。
- 根拠不足の判定基準が明確である。どの資料を読んでも判断できない場合だけ見送る。
- 見送る場合は理由と不足している根拠を result へ記録する。
- `br-sample.md` に対し実行し、章構成が rulebook に沿って修正されることを確認している。
- 根拠が本当に不足する場合は、引き続き推測で改訂しない。

## 6. 検討事項

- 根拠の指定方法を決める。finding の `rule`（viewpoint ID）から必要な根拠を導く方法と、
  approach の手順へ「rulebook を根拠に含める」と明記する方法がある。前者は viewpoint と根拠の
  対応表が要る。
- `sample-maintenance` の設計意図を確認する。「成果物から sample を見直す」のが本来の目的で
  あれば、finding 由来の修正は別の approach が適する可能性がある。既存の approach を拡張するか、
  新しい approach を設けるかを判断する。
- 他の kind でも同じ問題が起きるかを確認する。`rulebook-maintenance` は成果物を根拠とするのが
  自然だが、`recipe` と `template` は rulebook との整合が主な論点になりうる。

## 7. 作業内容

| No  | 作業                                 | 担当 | 状態 | メモ                        |
| --- | ------------------------------------ | ---- | ---- | --------------------------- |
| 1   | finding の種類と必要な根拠を整理する | ARC  | open | viewpoint 別に見る          |
| 2   | 根拠の指定方法を決める               | ARC  | open | rule 由来か手順への明記か   |
| 3   | 4種の maintenance へ反映する         | ARC  | open | kind ごとに根拠が異なりうる |
| 4   | 根拠不足の判定基準を明確にする       | ARC  | open | 見送る条件を絞る            |
| 5   | `br-sample.md` で実行して確認する    | ARC  | open | 章構成が実際に直ること      |

## 8. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 9. 関連ドキュメント

- [[prj-0001:pjr-t3vq-maintenance-plan-target-path]]: 本問題が判明した実行検証。
- [[prj-0001:pjr-rp1k-maintenance-finding-instruction]]: finding を修正の根拠に据える記述。
- [[prj-0001:pjr-2w38-sample-quality-observation]]: 修正対象となる kata の品質観測。
