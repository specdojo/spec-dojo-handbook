# 直近コミット差分の rules から input templates をアップサート

@file:.github/skills/rules-to-input/SKILL.md

`HEAD~1..HEAD` の差分に含まれる
`/docs/ja/handbook/rules/*-rules.md` のみを対象に、
対応する `/docs/ja/handbook/templates/*-input-template.md` を作成または更新してください。

## 対象抽出

1. `HEAD~1..HEAD` の変更ファイルを取得する（`HEAD~1` が存在しない場合は `HEAD` 単体の変更として扱う）
1. `docs/ja/handbook/rules/*-rules.md` に一致するものだけを対象にする（`meta-*-rules.md` は対象外）
1. 対象が0件なら「更新不要」と明示して終了する

## 対応ルール

- 対応先は `rules` と同名の `<name>-input-template.md`
  - 例: `utc-index-rules.md` → `utc-index-input-template.md`
- `meta-*-rules.md` は `*-input-template.md` 作成/更新の対象外とする
- 対応する input template が存在しない場合は新規作成
- 存在する場合はアップサート（不足項目追記・不整合修正）

## 生成要件

- 見出し順・必須章・記述ガイド・禁止事項・最終チェックを rules と整合
- ルール本文の丸写しは避け、人間の記入用シートとして再構成
- 曖昧語を避け、記入者が判断できるガイダンスにする
- 空欄を許容せず、不明項目は `未確定` と明記する方針を維持

## 出力

- 対象 rules ファイル一覧
- 変更した input template ファイル一覧
- 各ファイルの反映要点（1〜3行）
- lint結果（`npm run -s lint:md`）
