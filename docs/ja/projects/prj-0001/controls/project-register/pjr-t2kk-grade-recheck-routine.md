---
specdojo:
  id: prj-0001:pjr-t2kk-grade-recheck-routine
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
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

## 5. 作業内容

| No  | 作業                                         | メモ                                         |
| --- | -------------------------------------------- | -------------------------------------------- |
| 1   | 選択結果を出力する手段を追加                 | `grade plan --list` 相当。plan を書かない    |
| 2   | スクリプトへ `--changed-only` / `--ungraded` | 上記の出力を受け取り find の結果と突き合わせ |
| 3   | スクリプトへ `--kind all`                    | 対象が 4 種別に散るため。既定は `rulebook`   |
| 4   | `job-grade-kata.yaml` へ入力を追加           | `changed_only` は boolean 型が使える         |
| 5   | 再評価用の routine 定義を新設                | 周期と `limit` を決める                      |
| 6   | 単体テストを追加                             |                                              |

## 6. 判断が要る点

- 1 回あたりの処理件数。3 段目は codex を使うため rate limit を考慮する。
- 週次の全件評価（`rtn-grade-kata`）と再評価を、別 routine にするか同一にするか。

## 7. 未解決の前提

`routine run --due` を起動する仕組みが存在しない。`package.json` にも `.github/workflows/` にも
登録がなく、既存 6 件の routine はすべて `enabled: false` である。本項目は routine 定義の整備
までを範囲とし、定期起動の仕組みは routine 全体の課題として切り分ける。

## 8. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 9. 関連ドキュメント

- [[prj-0001:pjr-20dv-grade-content-hash-normalization]]: `--changed-only` の信頼性を回復した項目。
- [[prj-0001:pjr-mbvm-grade-exclude-generated]]: `generated` を対象から外した項目。
- [[prj-0001:pjr-49d2-quality-assessment]]: 品質評価の全体方針。
