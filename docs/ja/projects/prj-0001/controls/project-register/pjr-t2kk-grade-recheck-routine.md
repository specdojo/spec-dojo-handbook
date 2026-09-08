---
specdojo:
  id: prj-0001:pjr-t2kk-grade-recheck-routine
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: waiting
  priority: medium
  owner: ARC
  registered_at: "2026-09-07T23:00:00Z"
  due_on: "2026-09-30"
  block_reason: grade list / --changed-only / --kind all と routine 定義は完成したが、routine 経由の実行が成立しない。job のコマンドが agent の sandbox 内で走るため、スクリプトが起動する内側の opencode がホームディレクトリへ書けず全段が失敗する。完了条件の routine run --id で再評価できることを満たさない。PJR-GWY4 の実装を待つ。
---

# PJR-T2KK 修正済み文書の再評価を routine で実行できるようにする

## 1. 概要

finding に沿って修正した文書を再評価する作業が手動のまま残っている。これを routine から起動
できるようにする。

## 2. 対応前の現状

必要な部品はほぼ揃っており、欠けているのは選択機能とスクリプトの接続である。

| 部品            | 状態                                                        |
| --------------- | ----------------------------------------------------------- |
| 変更検知        | あり。`grade plan` / `validate` の `--changed-only`         |
| 未評価の選択    | あり。`--ungraded`                                          |
| 3段パイプライン | あり。`tools/grade/run-per-document.sh`                     |
| job 定義        | あり。`job-grade-kata.yaml`                                 |
| routine 定義    | あり。`rtn-grade-kata.yaml`（週次・全件・`enabled: false`） |
| **両者の接続**  | **なし**                                                    |

スクリプトは kind ディレクトリを find で走査して独自に選択しており、`grade` 側のフィルタを
使っていない。

```sh
mapfile -t selected_paths < <(
  find "$target_root" -type f -name '*.md' -not -path '*/generated/*' -print | LC_ALL=C sort
)
```

`grade plan --path <document>` は文書ごとの個別呼び出しであるため、選択だけがスクリプト側に
閉じている。

## 3. 前提の解消

`--changed-only` は当初、評価済み文書 197 件をすべて変更ありと誤報しており、この上に routine を
組むと毎回ほぼ全件を再評価する状態であった。[[prj-0001:pjr-20dv-grade-content-hash-normalization]]
と [[prj-0001:pjr-mbvm-grade-exclude-generated]] により解消済みである。

| 時点                         | 報告件数 |
| ---------------------------- | -------: |
| 当初                         |      253 |
| ハッシュ正規化と貼り直しの後 |       58 |
| `generated` 除外の後         |       11 |

現在の内訳は `grade is missing` 9 件、`findings` 不整合 4 件、`content changed` 2 件である。
対象規模が小さいため、当初懸念していた rate limit の制約はほぼ解消している。

## 4. 完了条件

- `routine run --id <id>` で、変更のあった文書と未評価の文書だけを再評価できる。
- 内容を変更していない文書が再評価の対象にならない。
- 対象が 0 件の場合に no-op として正常終了する。
- 1 回の実行で処理する件数を設定で制限できる。
- `generated` 配下が対象にならない。
- routine 定義が `routine validate` を通る。
- 再評価用 routine が `enabled: true` である。
- cron が稼働し、`routine run --due` が定刻に起動することを実行ログで確認できる。
- cron が停止していた原因が特定され、再発時に気づける手段がある。

## 5. 作業内容

| No  | 作業                                         | メモ                                       |
| --- | -------------------------------------------- | ------------------------------------------ |
| 1   | 選択結果を出力する手段を追加                 | `grade plan --list` 相当。plan を書かない  |
| 2   | スクリプトへ `--changed-only` / `--ungraded` | 上記の出力を find の結果と突き合わせる     |
| 3   | スクリプトへ `--kind all`                    | 対象が 4 種別に散るため。既定は `rulebook` |
| 4   | `job-grade-kata.yaml` へ入力を追加           | `changed_only` は boolean 型が使える       |
| 5   | 再評価用の routine 定義を新設                | 周期と `limit` を決める                    |
| 6   | cron 停止の原因を特定する                    | `post-start.sh` の実行有無と cron の状態   |
| 7   | routine を有効化し定刻起動を確認する         | 実行ログで確認する                         |
| 8   | 単体テストを追加                             |                                            |

## 6. 判断が要る点

- 1 回あたりの処理件数は 5 件とした。3 段目の codex 利用量を抑えつつ、起票時の対象 11 件を
  3 回以内に処理できる値である。
- 週次の全件評価（`rtn-grade-kata`）とは別に `rtn-grade-recheck` を設けた。全件評価の既定値を
  変えず、変更済み・未評価だけを有効な routine として運用するためである。

## 7. 定期起動の前提

起票時に「`routine run --due` を起動する仕組みが存在しない」と記述したが、誤りである。
`package.json` と `.github/workflows/` しか確認していなかった。devcontainer に cron の定義が
存在する。

```text
/etc/cron.d/specdojo-routine
0 1,6 * * *  node ... specdojo.js routine run --project prj-0001 --due
             （Asia/Tokyo の 01:00 と 06:00）
```

配置は `.devcontainer/post-start.sh` が行い、同スクリプトが `service cron start` で起動する。

自動実行に必要な条件への対応は次のとおりである。

| No  | 条件                            | 対応                                                        |
| --- | ------------------------------- | ----------------------------------------------------------- |
| 1   | 再評価用の routine 定義         | `rtn-grade-recheck.yaml` を追加                             |
| 2   | その routine が `enabled: true` | `enabled: true` で追加                                      |
| 3   | cron デーモンの稼働             | 起動時の status 失敗を無視せず、5 分間隔の heartbeat を追加 |

`logs/routine-exec-cycle.log` の最終書き込みは 2026-08-29 06:00 で、以降 10 日間動いていない。
稼働していた期間も、routine が無効であるため `no due routines — exit` を繰り返していた。

```text
[routine] no due routines — exit
[routine] no due routines — exit
```

過去の停止時には cron 自体のログと生存記録がなく、終了原因を事後に特定できなかった。また、
`post-start.sh` が `service cron status` の失敗を `|| true` で無視していたため、起動失敗も正常な
起動と区別できなかった。直接の再発防止として status 失敗を起動失敗として扱い、起動後の停止を
検出するため `.devcontainer/specdojo-routine.cron` が `logs/routine-cron-heartbeat.log` を 5 分ごとに
更新するようにした。10 分以上更新されなければ cron 停止またはコンテナ停止として検知できる。

なお、コンテナが起動し続けていることも前提になる。開発機がスリープすれば cron も動かない。

## 7.1. 実装後の検証結果

CLI と定義は完成したが、routine 経由の実行が成立しないため `waiting` とした。

### 7.1.1. 完成した部分

| 追加                     | 確認                                                     |
| ------------------------ | -------------------------------------------------------- |
| `specdojo grade list`    | `--changed-only` で 25 件を出力。`grade validate` と一致 |
| `--kind all`             | 4 種別を横断して選択する                                 |
| `--specdojo-bin`         | `npx tsx` を回避して起動できる                           |
| `rtn-grade-recheck.yaml` | `routine validate` を通る                                |

`--kind all --limit 2 --changed-only=true --ungraded=true` の dry-run で、種別ごとの
リファレンス（`reference=per-kind`）が選ばれることも確認した。

### 7.1.2. 成立しない部分

`routine run --id rtn-grade-recheck` を 3 回試み、いずれも失敗した。

| 回  | 結果 | 原因                                           |
| --- | ---- | ---------------------------------------------- |
| 1   | 失敗 | `npx tsx` の IPC ソケットが `EPERM`            |
| 2   | 失敗 | 既存 Job Run の再利用により修正が未反映        |
| 3   | 失敗 | 内側の opencode がホームディレクトリへ書けない |

3 回目でスクリプト自体は終了コード 0 になったが、スクリプトが起動する agent が動作しない。
全 15 段（5 文書 × 3 段）が 1 秒で失敗した。

```text
Unknown: FileSystem.open (/home/node/.local/share/opencode/log/opencode.log)
agent failed: gemma-expert-executor exit=1
```

job のコマンドが agent の sandbox 内で実行されるため、内側の agent が制約を受ける。個別の
回避を重ねても解決しない。詳細は [[prj-0001:pjr-gwy4-job-deterministic-command]] に記録した。

### 7.1.3. 途中で行った是正

- job の agent を `claude-expert-executor` / `claude-reporter` から
  `codex-expert-executor` / `gemma-reporter` へ変更した。claude は CLI と TUI を同時に
  動かすと `~/.claude.json` の書き込みが競合するため、無人実行に適さない。
- job の手順へ `npm run build` と `--specdojo-bin dist/specdojo.js` を追加した。いずれも
  PJR-GWY4 の実装後は不要になる暫定の回避策である。
- `rtn-grade-recheck.yaml` を `enabled: false` に戻した。動作しない routine を有効のまま
  にすると、定刻に失敗し続ける。

## 8. 対応結果

- `grade list` を追加し、plan を生成せずに共通フィルタの選択結果を取得できるようにした。
- `run-per-document.sh` に `--changed-only`、`--ungraded`、`--kind all` を追加した。2つのフィルタは
  和集合として扱い、`generated` 配下を除外し、初回選択を保存して中断後も同じ対象を再開する。
- `job-grade-kata` に選択入力を追加し、変更済み・未評価の4種別を最大5件処理する
  `rtn-grade-recheck` を毎週火曜日6時（Asia/Tokyo）、`enabled: true` で追加した。
- grade CLI、スクリプトの選択・no-op・再開、Job/Routine 定義に対するテストを追加・更新した。
- cron の起動失敗を見逃さないようにし、5分間隔の heartbeat で起動後の停止も判別可能にした。
- 実時刻での初回起動ログ確認は、次回の火曜日6時の実行後に
  `logs/routine-exec-cycle.log` と `logs/routine-cron-heartbeat.log` で行う。

## 9. 関連ドキュメント

- [[prj-0001:pjr-20dv-grade-content-hash-normalization]]: `--changed-only` の信頼性を回復した項目。
- [[prj-0001:pjr-mbvm-grade-exclude-generated]]: `generated` を対象から外した項目。
- [[prj-0001:pjr-49d2-quality-assessment]]: 品質評価の全体方針。
