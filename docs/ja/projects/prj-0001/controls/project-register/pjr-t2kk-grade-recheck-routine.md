---
specdojo:
  id: prj-0001:pjr-t2kk-grade-recheck-routine
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: in-progress
  priority: medium
  owner: ARC
  registered_at: "2026-09-07T23:00:00Z"
  due_on: "2026-09-30"
---

# PJR-T2KK 修正済み文書の再評価を routine で実行できるようにする

## 1. 概要

finding に沿って修正した文書を再評価する作業が手動のまま残っている。これを routine から起動
できるようにする。

## 2. 現状

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

- 1 回あたりの処理件数。3 段目は codex を使うため rate limit を考慮する。
- 週次の全件評価（`rtn-grade-kata`）と再評価を、別 routine にするか同一にするか。

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

ただし自動実行には次の3つがすべて必要で、現状はいずれも満たしていない。

| No  | 条件                            | 現状                               |
| --- | ------------------------------- | ---------------------------------- |
| 1   | 再評価用の routine 定義         | 未作成。本項目の範囲               |
| 2   | その routine が `enabled: true` | 既存 6 件はすべて `enabled: false` |
| 3   | cron デーモンの稼働             | 停止している                       |

`logs/routine-exec-cycle.log` の最終書き込みは 2026-08-29 06:00 で、以降 10 日間動いていない。
稼働していた期間も、routine が無効であるため `no due routines — exit` を繰り返していた。

```text
[routine] no due routines — exit
[routine] no due routines — exit
```

cron が停止した原因は特定していない。`post-start.sh` が実行されなかったのか、cron が異常終了
したのかを確認する必要がある。原因が分からないまま routine を有効化しても動かない。

なお、コンテナが起動し続けていることも前提になる。開発機がスリープすれば cron も動かない。

## 8. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 9. 関連ドキュメント

- [[prj-0001:pjr-20dv-grade-content-hash-normalization]]: `--changed-only` の信頼性を回復した項目。
- [[prj-0001:pjr-mbvm-grade-exclude-generated]]: `generated` を対象から外した項目。
- [[prj-0001:pjr-49d2-quality-assessment]]: 品質評価の全体方針。
