# 全 rules から input templates を一括アップサート

@file:.github/skills/rules-to-input/SKILL.md

`/docs/ja/handbook/rules` 配下の **すべての `*-rules.md`** を対象に、
対応する `/docs/ja/handbook/templates/*-input-template.md` を作成または更新してください。

## 対応ルール

- 対応先は `rules` と同名の `<name>-input-template.md` とする
  - 例: `utc-index-rules.md` → `utc-index-input-template.md`
- `meta-*-rules.md` は `*-input-template.md` 作成/更新の対象外とする
- 対応する input template が存在しない場合は新規作成
- 存在する場合はアップサート（不足項目追記・不整合修正）

## 生成要件

- 見出し順・必須章・記述ガイド・禁止事項・最終チェックを rules と整合させる
- ルール本文の丸写しは避け、人間の記入用シートとして再構成する
- 曖昧語を避け、記入者が判断できるガイダンスにする
- 空欄を許容せず、不明項目は `未確定` と明記する方針を維持する

## 進め方

1. `rules` 配下の `*-rules.md` を列挙（`meta-*-rules.md` を除外）
2. `templates` 側の対応ファイル有無を判定
3. 新規作成/アップサートを実施
4. 変更一覧と反映要点を出力
5. `npm run -s lint:md` を実行して結果を報告

## 出力形式

- 変更ファイル一覧
- ファイルごとの反映要点（1〜3行）
- lint結果
