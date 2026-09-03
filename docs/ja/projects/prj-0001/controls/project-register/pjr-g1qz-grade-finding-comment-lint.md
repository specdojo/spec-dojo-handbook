---
specdojo:
  id: prj-0001:pjr-g1qz-grade-finding-comment-lint
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: waiting
  priority: high
  owner: ARC
  registered_at: "2026-09-02T21:30:13Z"
  due_on: "2026-09-30"
  block_reason: "agent exited with non-zero code: agent exited with non-zero code: agent-config-write: protected configuration changes detected; paths=package.json; agent must record the required change in the result …"
---

# PJR-G1QZ grade の finding コメントが Markdown lint を壊さないようにする

## 1. 概要

`grade apply` は指摘箇所を `specdojo:finding` の HTML コメントとして本文へ挿入する。挿入位置
によっては Markdown の構造を壊し、`lint:md` が失敗する。

rulebook 走査中に `cxd-rulebook.md` で発生した。親項目と入れ子項目の間にコメントが挿入され、
リストが分断されて入れ子側が独立したリストと解釈される。

```markdown
- Frontmatter:

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-omissions-consistency ... -->

- `id`: 小文字ハイフン形式（例: `cxd-candy-shop-sales-context`）
- `title`: 「〇〇のC4コンテキスト図」のように対象が分かる表現
```

```text
cxd-rulebook.md:66:1 MD007/ul-indent Unordered list indentation [Expected: 0; Actual: 2]
cxd-rulebook.md:67:1 MD007/ul-indent Unordered list indentation [Expected: 0; Actual: 2]
```

構造の分断だけでなく、コメント前後の空行が過剰になる違反も出る。走査を進める間に対象は
4文書へ増え、違反は2種類になった。

| 違反                       | 件数 | 内容                                   |
| -------------------------- | ---- | -------------------------------------- |
| `MD012/no-multiple-blanks` | 3    | コメント前後に連続空行が生じる         |
| `MD007/ul-indent`          | 2    | リストが分断され入れ子が独立扱いになる |

rulebook 106件の走査が進行中であり、成果物とプロジェクト文書へ
対象を広げれば発生件数は増える。`lint:md` は pre-commit hook に含まれるため、壊れた文書が
残ると以後の commit が失敗する。評価の実施が commit を妨げる状態は運用を止める。

## 2. 完了条件

- finding コメントの挿入が Markdown の構造を壊さない。
- 挿入後の文書が `lint:md` を通る。
- 指摘行との対応が読み手に分かる位置へ挿入される。
- 既存の finding コメントを持つ文書が引き続き解析できる。
- 走査で壊れた文書を検出し修正できる。

## 3. 検討事項

- 挿入位置をリストや表の途中にしない規則が要る。直前の空行だけでは足りず、対象行が入れ子
  構造の内側にある場合は親の外側まで遡る必要がある。
- 行番号との対応を保ちながら位置をずらすと、`line` の意味が曖昧になる。コメント内の `line`
  属性を正とし、挿入位置は構造上安全な場所とする案が考えられる。
- 本文へ挿入せず、frontmatter またはサイドカーへ集約する案もある。ただし修正時に該当箇所を
  見つけにくくなるため、本文注釈の利点は失われる。

## 4. 作業内容

| No  | 作業                                     | 担当 | 状態 | メモ                         |
| --- | ---------------------------------------- | ---- | ---- | ---------------------------- |
| 1   | 構造を壊す挿入位置と空行の扱いを洗い出す | ARC  | open | MD007 と MD012 の両方        |
| 2   | 安全な挿入位置の規則を決める             | ARC  | open | line 属性との対応を保つ      |
| 3   | 挿入処理を修正する                       | ARC  | open | 既存コメントの解析を壊さない |
| 4   | 単体テストを追加する                     | ARC  | open | 入れ子リストへの挿入を含める |
| 5   | 走査で壊れた既存文書を修正する           | ARC  | open | `cxd-rulebook.md` ほか       |

## 5. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 6. 関連ドキュメント

- [[prj-0001:pjr-49d2-quality-assessment]]: grade コマンドの起点。
- [[prj-0001:pjr-excv-grade-per-document-pipeline]]: 問題が発生した走査の実行経路。
