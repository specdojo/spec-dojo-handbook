---
specdojo:
  id: prj-0001:pjr-6pd7-cdfd-overview
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: in-progress
  priority: medium
  owner: BA
  registered_at: "2026-09-13T01:30:32Z"
  due_on: "2026-09-30"
---

# PJR-6PD7 詳細 CDFD をプロセスグループ別・ユースケース別へ再作成する

## 1. 概要

[[cdfd-overview]] を見直し、詳細化先を「領域別 CDFD（1 領域 1 文書）」から「プロセスグループ別 CDFD（Onboarding／Plan／Do／Check／Action／Orchestrator の 6 文書）＋横断ユースケース別 CDFD」へ改めた。これに伴い、プロセスグループ別 CDFD 6 件とユースケース別 CDFD 2 件（`cdfd-uc-register`: 登録簿起票から完了まで、`cdfd-uc-deliverable`: 成果物の作成から完了まで）を新規に作成し、現行の領域別 CDFD 10 件は対応するプロセスグループ別 CDFD へ統合したうえで非推奨化して `trash` へ退避する。

統合先の対応は次のとおり。`cdfd-routine` は定期実行・ジョブの定義部分を Plan、起動から Do への引き渡し部分を Orchestrator に分けて統合する。

| プロセスグループ | 統合先 CDFD         | 統合元（現行の領域別 CDFD）                                                                                     |
| ---------------- | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Onboarding       | `cdfd-onboarding`   | [[prj-0001:cdfd-init]]                                                                                          |
| Plan             | `cdfd-plan`         | [[prj-0001:cdfd-register-lifecycle]]、[[prj-0001:cdfd-catalog-planning]]、[[prj-0001:cdfd-routine]]（定義部分） |
| Do               | `cdfd-do`           | [[prj-0001:cdfd-task-execution]]、[[prj-0001:cdfd-multi-project]]                                               |
| Check            | `cdfd-check`        | [[prj-0001:cdfd-reporting]]、[[prj-0001:cdfd-derived-content]]                                                  |
| Action           | `cdfd-action`       | [[prj-0001:cdfd-agent-config-operation]]、[[prj-0001:cdfd-deprecation]]                                         |
| Orchestrator     | `cdfd-orchestrator` | [[prj-0001:cdfd-routine]]（起動部分）                                                                           |

統合にあたっての前提は次のとおり。

- プロセスグループ別 CDFD は、グループに属する領域の内部プロセス、起点イベント、状態遷移、例外・復旧、データストアの読み書きを定める正本とする。領域単位の入出力は [[cdfd-overview]] に置かず、統合先へ移す。
- データストア名は [[cdfd-overview]] の「データストア一覧」（稼働構成、Kata、成果物カタログ、スケジュール戦略、定期実行定義、ジョブ定義、登録簿、Schedule（track）、実行計画、実行記録、成果物、保管庫、評価結果、進捗報告、派生ビュー・索引）に統一する。旧文書の「プロジェクト定義・構成」「実行制御」「プロジェクトビュー」などの名称は引き継がない。
- 凡例は [[cdfd-overview]] の「凡例（本プロダクト共通）」を参照し、各文書で再掲しない。
- product 文書の `id` は `prj-0001:` などのプロジェクト修飾を付けない（例: `cdfd-plan`）。統合元の `id` は `prj-0001:` 付きのままなので、非推奨化時に参照元の wikilink を確認する。
- タイムライン（`<project-id>/timeline/`）の位置付けは cdfd-overview で Schedule（track）に含めている。`cdfd-plan` または `cdfd-check` の作成時に、生成物としての扱いと閲覧提供との関係を確定する。
- ユースケース別 CDFD は、複数のプロセスグループをまたぐ順序と引き渡し条件だけを定め、グループ内部のプロセスは再掲せずプロセスグループ別 CDFD を参照する。
- 本件は [[prj-0001:sch-track-data-flow]] で進めた領域別 CDFD 整備のやり直しにあたる。生成済みの track は直接編集しない運用のため、[[prj-0001:dct-data-flow]] へ新規成果物を追加したうえで新しい track（例: `data-flow-v2`）の `sch-strategy-<track>.yaml` を作成し、`specdojo schedule build` で track を生成して進める。既存の `data-flow` track は変更しない。

## 2. 完了条件

- [[prj-0001:dct-data-flow]] に新規成果物 8 件が登録され、新しい track の strategy と生成済み track が存在する。
- 六つのプロセスグループ別 CDFD（`cdfd-onboarding`、`cdfd-plan`、`cdfd-do`、`cdfd-check`、`cdfd-action`、`cdfd-orchestrator`）と二つのユースケース別 CDFD（`cdfd-uc-register`、`cdfd-uc-deliverable`）が `docs/ja/product/010-business-specs/010-data-flow/` に作成され、`status: ready` になっている。
- 統合元の領域別 CDFD 10 件が持つプロセス、起点イベント、例外、データストアの内容が、対応する統合先へ漏れなく移されている。
- 統合元 10 件が非推奨化され、`docs/ja/product/trash/` へ退避されている。統合元を参照していた wikilink が統合先へ付け替えられている。
- [[cdfd-overview]] の「詳細 CDFD 一覧」の ID が実際の文書 ID と一致している。
- `npm run -s lint:md` と `npm run docs:build` がエラーなしで通る。

## 3. 作業内容

| No  | 作業                                                                                                                                              | 担当 | 状態 | メモ                                                                                                                                                                                                                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | [[prj-0001:dct-data-flow]] に新規成果物 8 件を追加し、新しい track の `sch-strategy-<track>.yaml` を作成して `schedule build` で track を生成する | PM   | open | 既存の `data-flow` track は変更しない                                                                                                                                                                                  |
| 2   | プロセスグループ別・ユースケース別 CDFD の rulebook・template を整備する（`cdfd-overview-rulebook` の改訂含む）                                   | BA   | done | cdfd-overview-rulebook、cdfd-mermaid-rulebook、template、sample、recipe を新構成へ改訂済み（2026-09-13）。グループ別・ユースケース別 CDFD 自体の rulebook・sample は作業 3 以降で cdfd-rulebook / cdfd-sample を改める |
| 3   | `cdfd-onboarding` を作成し `cdfd-init` を統合する                                                                                                 | BA   | open | repository から setup、既存 prj から setup、Detached Unit の複数ケースを扱う                                                                                                                                           |
| 4   | `cdfd-plan` を作成し登録簿・カタログ計画・routine（定義）を統合する                                                                               | BA   | open | 5 領域を含むため分量に注意                                                                                                                                                                                             |
| 5   | `cdfd-do` を作成しタスク実行・並行処理を統合する                                                                                                  | BA   | open | -                                                                                                                                                                                                                      |
| 6   | `cdfd-check` を作成し報告・派生生成を統合する                                                                                                     | BA   | open | 成果物評価（grade）は新規記述                                                                                                                                                                                          |
| 7   | `cdfd-action` を作成し構成変更・非推奨化を統合する                                                                                                | BA   | open | タスク完了は新規記述                                                                                                                                                                                                   |
| 8   | `cdfd-orchestrator` を作成し routine（起動）を統合する                                                                                            | BA   | open | 対話型運転は新規記述                                                                                                                                                                                                   |
| 9   | `cdfd-uc-register`（登録簿起票から完了まで）を作成する                                                                                            | BA   | open | Plan → Do → Check → Action の引き渡し条件のみ                                                                                                                                                                          |
| 10  | `cdfd-uc-deliverable`（成果物の作成から完了まで）を作成する                                                                                       | BA   | open | 同上                                                                                                                                                                                                                   |
| 11  | 統合元 10 件を非推奨化して `trash` へ退避し、参照元の wikilink を付け替える                                                                       | BA   | open | `deliverable trash` を使用                                                                                                                                                                                             |
| 12  | [[cdfd-overview]] の「詳細 CDFD 一覧」の ID を確定値に更新する                                                                                    | BA   | open | -                                                                                                                                                                                                                      |

## 4. 対応結果

-

## 5. 関連ドキュメント

- [[cdfd-overview]]
- [[prj-0001:dct-data-flow]]
- [[prj-0001:sch-strategy-data-flow]]
- [[prj-0001:sch-track-data-flow]]
- [[prj-0001:cdfd-init]]
- [[prj-0001:cdfd-register-lifecycle]]
- [[prj-0001:cdfd-catalog-planning]]
- [[prj-0001:cdfd-routine]]
- [[prj-0001:cdfd-task-execution]]
- [[prj-0001:cdfd-multi-project]]
- [[prj-0001:cdfd-reporting]]
- [[prj-0001:cdfd-derived-content]]
- [[prj-0001:cdfd-agent-config-operation]]
- [[prj-0001:cdfd-deprecation]]
- `specdojo:cdfd-overview-rulebook`
