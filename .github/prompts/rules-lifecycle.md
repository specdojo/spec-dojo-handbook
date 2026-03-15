# ルールと派生成果物のライフサイクル実行

@file:.github/skills/rules-lifecycle/SKILL.md

指定された対象の `*-rules.md` と、その派生成果物（instruction / input-template）を
2 フェーズのレビューサイクルで完成させてください。

## 対象の決定

- 開いているファイルが `*-rules.md` の場合 → そのファイルを Phase 1 の対象とする
- 開いているファイルが `*-instruction.md` / `*-input-template.md` の場合 → 対応する `*-rules.md` を特定し Phase 1 から開始
- 開いているファイルが成果物（sample-gcs-product 配下等）の場合 → 対応する `*-rules.md` を特定し Phase 1 から開始
- 開いているファイルが `meta-*-rules.md` の場合 → 対象外として処理を中止する

## 進め方

### Phase 1: Rules

1. **① agent draft** — `upsert-rules` Skill で `*-rules.md` を作成/更新し、lint 検証する
2. **② human modify** — ドラフトの要約と改善候補を提示し、人間の修正を待つ
3. **③ agent review** — 章構成整合・禁止事項・リンク有効性をレビューする
4. **④ human approve** — 人間の承認を受けて `status: ready` に更新する

### Phase 2: Derivatives

1. **⑤ agent draft** — instruction と input-template を一括作成し、lint 検証する
2. **⑥ agent review** — rules との整合性・責務境界・曖昧語をレビューする
3. **⑦ human approve** — 人間の承認を受けて全ファイルの `status: ready` に更新する

## 注意

- 各ステップの完了には人間の明示的な承認が必要
- Phase 2 は Phase 1 の `status: ready` を前提とする
- 進捗は TODO リストで管理する
