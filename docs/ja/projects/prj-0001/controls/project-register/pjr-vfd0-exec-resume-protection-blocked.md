---
specdojo:
  id: prj-0001:pjr-vfd0-exec-resume-protection-blocked
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: issue
  item_status: open
  priority: medium
  owner: ARC
  registered_at: "2026-09-09T22:38:32Z"
  due_on: "2026-09-30"
---

# PJR-VFD0 保護機構でブロックされた executor を再開できない

## 1. 概要

`agent-config-write` が保護対象の設定変更を検知すると executor 段が `failed` となり、
`--resume` が拒否される。

```text
PJR-9M5N: not resumable (executor stage is "failed" for run 20260909T214936163Z-23368095;
          re-run the item instead)
```

## 2. ブロックは失敗と性質が異なる

executor は作業を完了したうえで、ゲートで止められている。

PJR-9M5N では次の状態であった。

| 項目            | 状態                        |
| --------------- | --------------------------- |
| worktree の成果 | 12 ファイル・231 行         |
| `typecheck`     | 成功                        |
| `test:unit`     | 1425 件すべて成功           |
| 停止した理由    | `package.json` の変更を検知 |

成果は揃っており、必要だったのは申し送りの適用判断だけである。

保護機構の申し送りには「適用するかどうかは人または後続 agent が判断する」と記録される。判断の
後に再開する経路が想定されているが、実際には `--resume` が使えない。

## 3. 影響

正規の経路は `--force-restart` のみで、worktree の成果と codex 呼び出し 1 回分を捨てる。設定
変更は珍しくないため、そのつど損失が生じる。

PJR-9M5N では orchestrator が reporter 相当の検証と統合を代行した。人手を要する回避であり、
無人実行では成立しない。

## 4. 関連する先行の対応

同種の再開不可は段階的に解消してきた。

| 項目     | 対象                                  | 対応                            |
| -------- | ------------------------------------- | ------------------------------- |
| PJR-6VFN | reporter の `rate_limited` / `failed` | executor 成功後の reporter 再開 |
| PJR-9QZ2 | executor の `running`                 | 既存 worktree で再開            |
| PJR-TX1G | executor の `rate_limited`            | executor 段から再開             |
| 本項目   | executor の保護ブロック               | 未対応                          |

`failed` を一律に再開可能とするのは適切でない。実装の誤りで失敗した場合は、そのまま再開しても
同じ結果になる。ブロックによる停止を、他の失敗と区別できる形が要る。

## 5. 完了条件

- 保護機構のブロックで停止した run を、申し送りの適用後に再開できる。
- 再開先が executor 段である。ブロックの解消後に executor が作業を続けられる。
- 実装の誤りによる `failed` は従来どおり再開できない。ブロックと失敗が区別されている。
- 申し送りを適用していない状態で再開した場合の挙動が定義されている。再びブロックするか、
  適用済みかを確認するか。
- 既存 worktree と成果物が保持される。
- 上記を検証するテストがある。

## 6. 作業内容

| No  | 作業                                   | メモ                          |
| --- | -------------------------------------- | ----------------------------- |
| 1   | ブロックを失敗と区別できる状態を設ける | pipeline-state の表現を決める |
| 2   | 再開判定へブロック状態を追加する       | executor 段へ固定する         |
| 3   | 申し送り未適用時の扱いを決める         |                               |
| 4   | 回帰テストを追加する                   |                               |

## 7. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 8. 関連ドキュメント

- [[prj-0001:pjr-9m5n-npm-onboarding-path]]: この事象が発生した項目。
- [[prj-0001:pjr-tx1g-exec-resume-rate-limited-executor]]: rate limit による中断からの再開。
- [[prj-0001:pjr-9qz2-exec-stale-running-stage]]: 中断した executor の状態残留。
- [[prj-0001:pjr-m35p-protection-false-positive-generated]]: 保護機構の誤検知。
