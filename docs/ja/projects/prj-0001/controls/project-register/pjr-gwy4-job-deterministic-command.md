---
specdojo:
  id: prj-0001:pjr-gwy4-job-deterministic-command
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: waiting
  priority: high
  owner: ARC
  registered_at: "2026-09-08T13:38:47Z"
  due_on: "2026-09-30"
  block_reason: rate limit reached
---

# PJR-GWY4 job のコマンド実行を決定論的にする

## 1. 概要

job の実行は、agent が `description` を解釈してシェルコマンドを組み立て、実行する形になって
いる。コマンドの実行自体は決定論的であり、agent の判断を要しない。

## 2. 現状

決定論的にコマンドを実行する経路が存在しない。

| 層                    | 選択肢                                                          |
| --------------------- | --------------------------------------------------------------- |
| `task.mode`           | `edit` / `review`。どちらも agent 駆動                          |
| routine `action.kind` | `register` / `exec-auto` / `exec-resume` / `exec-cycle` / `job` |

実行の流れは次のとおりである。

```text
routine → job → plan 生成 → agent が plan を読む
                          → description を解釈
                          → シェルコマンドを組み立てて実行
                          → 結果を判断して報告
```

### 2.1. 設計の歪みが記述に現れている

`job-grade-kata.yaml` の `description` には、agent の逸脱を防ぐ指示が必要になっている。

```text
手順を分解して個別のコマンドへ置き換えない。
`--specdojo-bin` は省略しない。
```

決定論的に実行するなら、これらの但し書きは不要である。引数を1つ落としても外からは分からず、
実行ログの記述からしか追えない。

## 3. 分離すべき境界

| 処理                               | 性質       |
| ---------------------------------- | ---------- |
| `npm run build`                    | 決定論的   |
| スクリプトをテンプレート引数で実行 | 決定論的   |
| 終了コードと `results.tsv` の取得  | 決定論的   |
| rate limit か実失敗かの切り分け    | 判断が要る |
| 3段目の閾値見直しの要否            | 判断が要る |
| 再開可能かの判定                   | 判断が要る |

コマンドの実行は完全に決定論的で、判断が要るのは結果の解釈だけである。

## 4. 観測した具体的な不都合

### 4.1. sandbox の制約を受ける

`tools/grade/run-per-document.sh` を codex の sandbox 内で実行したところ、既定の `npx tsx` が
IPC ソケットを作成できず `EPERM` で失敗した。

```text
tsx の IPC ソケット作成が sandbox の EPERM で失敗
Job Run failed: JBR-grade-kata-af81b6da6930
```

回避のため `--specdojo-bin dist/specdojo.js` を指定し、あわせてビルド手順を description へ
追加した。runner が直接実行していれば sandbox の制約を受けず、この回避策自体が不要である。

### 4.2. コマンドが plan へ凍結される

上記の回避策を job 定義へ入れたが、次の実行にも反映されなかった。冪等キーが同一のため既存の
Job Run が再利用され、plan が凍結されたままであった。

```yaml
idempotency_key: "{{job_id}}:{{inputs.kind}}:{{inputs.period}}:{{inputs.limit}}:{{inputs.changed_only}}:{{inputs.ungraded}}"
```

plan の凍結は再現性のために正しい。ただし現在はコマンドと判断指示が同じ plan へ混在するため、
コマンドだけを直したい場合も新しい run を作る必要がある。入力を変えて `period` を変更し、
ようやく反映された。

### 4.3. 入れ子の agent 起動が成立しない

`--specdojo-bin` の回避策によりスクリプト自体は終了コード 0 で完了したが、スクリプトが起動
する内側の agent が動作しなかった。全 15 段（5 文書 × 3 段）が 1 秒で失敗した。

```text
Unknown: FileSystem.open (/home/node/.local/share/opencode/log/opencode.log)
agent failed: gemma-expert-executor exit=1
```

構成は次のとおりである。

```text
codex（sandbox: workspace-write、network_access: false）
  └─ run-per-document.sh
       └─ opencode（gemma）  ← ホームディレクトリへ書けず即座に失敗
```

`workspace-write` は作業ディレクトリ以外への書き込みを許さないため、opencode が自身のログを
開けない。

個別の回避を重ねても解決しない。ホームディレクトリへの書き込みを許可しても、gemma は
Ollama への通信を要し、codex は `network_access: false` である。agent の sandbox 内で別の
agent を起動する構成そのものが成立しない。

検証は 3 回行い、段階的に別の制約へ当たった。

| 回  | 結果 | 原因                                           |
| --- | ---- | ---------------------------------------------- |
| 1   | 失敗 | `npx tsx` の IPC ソケットが `EPERM`            |
| 2   | 失敗 | 既存 Job Run の再利用により修正が未反映        |
| 3   | 失敗 | 内側の opencode がホームディレクトリへ書けない |

### 4.4. コスト

シェルコマンドを起動するためだけに codex を呼び出している。rate limit を消費し、実行時間も
伸びる。

## 5. 提案する形

```yaml
task:
  mode: command
  command: |
    npm run build
    tools/grade/run-per-document.sh --run-id {{job_id}} --kind {{inputs.kind}} ...
  analysis:
    agent: gemma-reporter
    description: |
      results.tsv と終了コードから、rate limit・実失敗・閾値の偏りを切り分ける。
```

runner がコマンドを実行して evidence へ記録し、判断が要る場合だけ agent へ渡す。

## 6. 完了条件

- job がシェルコマンドを決定論的に実行できる。agent の解釈を経ない。
- 実行したコマンド、終了コード、標準出力・標準エラーが evidence へ記録される。
- コマンドが失敗した場合、終了コードから直接失敗と判定される。
- 判断が要る処理だけを agent へ渡せる。コマンドの実行と結果の解釈が分離されている。
- `job-grade-kata.yaml` から逸脱防止の指示（手順を分解しない、`--specdojo-bin` を省略しない）
  を削除しても同じ結果になる。
- コマンドが sandbox の制約を受けない。`--specdojo-bin` の回避策なしで動作する。
- コマンドがさらに agent を起動する場合でも動作する。`tools/grade/run-per-document.sh` が
  内側で opencode と codex を起動し、3 段評価が完走することを確認する。
- 既存の `edit` / `review` の job が従来どおり動作する。

## 7. 作業内容

| No  | 作業                                        | メモ                             |
| --- | ------------------------------------------- | -------------------------------- |
| 1   | job schema へ決定論的な実行方式を追加       | 既存 mode との互換を保つ         |
| 2   | runner にコマンド実行と evidence 記録を実装 | 終了コード・標準出力・標準エラー |
| 3   | 判断段を任意で agent へ渡す経路を実装       | コマンド結果を入力とする         |
| 4   | `job-grade-kata.yaml` を新方式へ移行        | 逸脱防止の指示と回避策を削除する |
| 5   | 単体テストを追加                            |                                  |

## 8. 判断が要る点

- 既存の `mode: edit` / `review` と、新しい実行方式の関係。mode を増やすか、別のキーとするか。
- コマンドの実行者と権限。runner が直接実行する場合、agent の sandbox と同等の制限を課すか。
- plan へ何を凍結するか。コマンドを凍結しない場合、再現性をどう担保するか。
- コマンドを job と routine のどちらへ置くか。job へ置くことを想定している。コマンドは
  「何をするか」であり、スケジュールとは独立である。routine 側へ寄せると、複数の routine
  から同じコマンドを再利用できなくなる。`job-grade-kata` は既に 2 つの routine から異なる
  入力で呼ばれており、この再利用は実際に機能している。

## 8.1. 将来の統合を妨げない設計にする

本項目の実装は、routine の `action.kind` を job へ統合する
[[prj-0001:pjr-78mq-routine-action-kind-unification]] の前提になる。

`action.kind` の 5 種（`register` / `exec-auto` / `exec-resume` / `exec-cycle` / `job`）は
いずれも引数を組み立てて自分自身を spawn するだけで、実装の構造が同じである。job がコマンドを
決定論的に実行できれば、すべてを job として表現できる。

したがってコマンド実行の仕組みを grade 専用へ寄せない。任意のコマンドを入力付きで実行し、
終了コードと出力を evidence へ記録できる汎用の形にする。`{{inputs.*}}` の展開も、grade の
引数だけでなく一般の入力に使えるようにする。

## 9. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 10. 関連ドキュメント

- [[prj-0001:pjr-t2kk-grade-recheck-routine]]: この問題が表面化した routine 化の項目。
- [[prj-0001:pjr-ta5c-agent-run-primitive]]: agent 起動を決定論的にした先行項目。
