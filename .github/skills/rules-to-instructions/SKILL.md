# SKILL: rules-to-instructions

`docs/ja/handbook/rules` の更新内容を、
`docs/ja/handbook/instructions` の `*-instruction.md` へ反映するための Skill です。

## 使いどころ

- `*-rules.md` 更新後に instruction を同期したいとき
- 差分アップサートで既存 instruction を保守したいとき
- 全 rules を一括で同期したいとき

## 前提

- 共通運用ルール: `@file:.github/instructions/rules-to-instructions.instructions.md`
- 命名対応: `<name>-rules.md` → `<name>-instruction.md`

## 実行フロー

1. 対象範囲を決める（個別/複数/全件）
2. rules を読み、必須章・必須表・禁止事項・最終チェックを抽出
3. 対応する instruction を新規作成またはアップサート
4. 命名・章番号・責務境界（index vs term）を整合
5. `npm run -s lint:md` で検証

## 推奨プロンプト

- 指定対象のみ: `@file:.github/prompts/upsert-test-instructions.md`
- 全rules一括: `@file:.github/prompts/upsert-all-instructions.md`
- 変更rulesのみ: `@file:.github/prompts/upsert-changed-instructions.md`
- 直近コミット差分のみ: `@file:.github/prompts/upsert-last-commit-instructions.md`

## 注意事項

- rules 本文の丸写しではなく、生成AIへの実行指示として再構成する
- 既存 instruction は全置換せず、差分アップサートを優先する
- 実装依存の詳細（SQL全文、具体クラス名等）は追加しない
