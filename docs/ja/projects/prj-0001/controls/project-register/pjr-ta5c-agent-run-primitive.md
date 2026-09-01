---
specdojo:
  id: prj-0001:pjr-ta5c-agent-run-primitive
  type: project
  status: ready
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: done
  priority: high
  owner: ARC
  registered_at: "2026-09-01T12:02:19Z"
  due_on: "2026-09-30"
  completed_at: "2026-09-01T12:11:24Z"
  conclusion: agent run を追加し、plan を指定 agent へ渡して stdout を得る primitive を公開した。
---

# PJR-TA5C plan を agent へ渡し stdout を得る agent run を公開する

## 1. 概要

grade の 3 段評価を shell script 化するために必要な primitive が CLI として公開されていない。
「plan を指定した agent へ渡し、その stdout をファイルへ得る」操作である。

内部実装は `src/exec-run.ts` の `runAgentCommand` として既に存在し、stdout を捕捉して
rate limit 検出にも用いている。しかし CLI から呼べないため、現在は job の agent が
自然言語の手順を解釈して手作業で代行している。

## 2. 完了条件

- `specdojo agent run --plan <path> --by <nickname> --out <file>` で、指定 agent に plan を
  渡し stdout をファイルへ保存できる。
- agent は `pm-members.yaml` の nickname で一意に決まり、選択に揺れがない。
- rate limit を検出した場合は既存の `exec-limit` の判定と同じ扱いになり、終了コードで
  呼び出し側が中断を判別できる。
- `--dry-run` で解決後のコマンドを実行せずに確認できる。
- 単体テストで agent 解決と stdout 保存の契約を検証している。

## 3. 作業内容

| No  | 作業                                       | 担当 | 状態 | メモ                           |
| --- | ------------------------------------------ | ---- | ---- | ------------------------------ |
| 1   | `runAgentCommand` の呼び出し境界を整理する | ARC  | open | 既存の exec run 経路を壊さない |
| 2   | `agent run` サブコマンドを追加する         | ARC  | open | -                              |
| 3   | rate limit 検出と終了コードの契約を定める  | ARC  | open | exec-limit を再利用する        |
| 4   | 単体テストを追加する                       | ARC  | open | -                              |
| 5   | command-reference へ追記する               | ARC  | open | -                              |

## 4. 対応結果

`specdojo agent run --plan <path> --by <nickname> --out <file>` を追加した。

`exec-run.ts` に閉じていた `executeAgent` と `isRateLimitError` を `src/agent-process.ts` へ
切り出し、`exec run` と `agent run` が同じ実装を共有する。stdout の捕捉と rate limit 検出の
挙動は従来と変わらない。`--out` 指定時は端末への tee を止め、親の標準出力を進捗表示に残す。

agent は nickname で一意に解決し、`type: agent` 以外と `disabled: true` を拒否する。
`capabilities` / `proficiency` による絞り込みを行わないため担当が揺れない。

終了コードは成功 0、失敗 1、rate limit 75 とした。rate limit を通常の失敗と区別することで、
呼び出し側は対象を評価済みとせずに中断し再開できる。

検証は単体テスト 11 件の追加、既存 1315 件の通過、および `gemma-expert-executor` での
end-to-end 実行（stdout のファイル保存）まで確認した。

## 5. 関連ドキュメント

- [[prj-0001:pjr-excv-grade-per-document-pipeline]]: 本 primitive を前提とする実行経路。
- [[prj-0001:pjr-wzma-job-responsibility-boundary]]: job から手順を追い出す前提。
- [[prj-0001:pjr-49d2-quality-assessment]]: grade コマンドの起点。
