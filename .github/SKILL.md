# Skill Index

このファイルは `.github/skills` 配下の Skill 一覧です。

## Available Skills

- `rules-to-instructions`
  - Path: `.github/skills/rules-to-instructions/SKILL.md`
  - Purpose: `rules` から `instructions` を作成/更新する
  - Prompts:
    - `.github/prompts/upsert-test-instructions.md`（指定対象のみ）
    - `.github/prompts/upsert-all-instructions.md`（全rules一括）
    - `.github/prompts/upsert-changed-instructions.md`（変更rulesのみ）
    - `.github/prompts/upsert-last-commit-instructions.md`（直近コミット差分のみ）
