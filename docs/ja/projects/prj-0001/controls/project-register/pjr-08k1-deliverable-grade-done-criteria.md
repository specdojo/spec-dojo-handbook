---
specdojo:
  id: prj-0001:pjr-08k1-deliverable-grade-done-criteria
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: in-progress
  priority: medium
  owner: ARC
  registered_at: "2026-09-10T11:42:54Z"
  due_on: "2026-09-30"
---

# PJR-08K1 成果物の評価を grade へ寄せ review result の同期問題を解消する

## 1. 概要

kata は grade が定期的に変更を検知し、出来栄えの確認から次のアクションへ繋がる。成果物には
同じ循環がない。review は一度きりで、対象が後から変わっても気づけない。

## 2. 現状の問題

### 2.1. review result が成果物と同期しない

review result に `content_hash` がない。対象成果物が後から変更されても検知できない。

実例を確認した。

```text
review 完了      : 2026-08-12T03:52:22Z
成果物の最終更新 : 2026-08-13T20:34:04+09:00
```

`cdfd-agent-config-operation` は review の翌日に更新されている。この review result が現在の
成果物を評価したものかを判定する手段がない。

| 記録    | `content_hash` | 変更検知 |
| ------- | -------------- | -------- |
| `grade` | あり           | 可能     |
| review  | **なし**       | **不可** |

grade が `content_hash` で解いた問題を、review は抱えたままである。

### 2.2. 実行ごとにファイルが増え、最新が判別できない

review result は実行ごとに別ファイルとして残る。同じ成果物を再 review すれば別ファイルが増え、
古い result が有効に見え続ける。現在 26 件あり、どれが最新の評価かを知る手段がない。

### 2.3. 成果物側に評価の手がかりがない

成果物の frontmatter には review の結果が一切記録されない。成果物を読む人が、評価済みか、
いつの評価か、現在の内容に対するものかを判断できない。

## 3. 接続できる根拠

grade は `--target deliverable` に対応し、catalog から成果物を収集する。

```typescript
for (const loaded of loadCatalogDocs(resolve(root, catalog))) {
  collectResolvedDeliverables(..., resolved);
  for (const item of resolved) {
    ... item.resolvedPath ...
  }
}
```

`item` の型は `DctDeliverableItem` で `done_criteria?: CriteriaItem[]` を持つ。grade は
**この情報を手にしながらパスだけを使い、残りを捨てている**。

```typescript
export type CriteriaItem = {
  text: string;
  roles: string[];
  viewpoint: string;
};
```

`viewpoint` が両者を繋ぐ。grade は観点別に判定して `specdojo.grade.viewpoints` へ記録するため、
`done_criteria` の `viewpoint` と照合すれば、どの完了条件が満たされたかが分かる。新しい観点
体系を作る必要はない。

## 4. 分量の制約

`done_criteria` の結果を frontmatter へ全量書き込むことはできない。

| 項目                  | 行数 |
| --------------------- | ---: |
| `specdojo.grade` 全体 |   58 |
| うち `viewpoints`     |   10 |
| 本文（`br-sample`）   |   65 |

既にメタ情報が本文とほぼ同量である。`done_criteria` は成果物あたり平均 5 件、最大 80 件あり、
全量を加えると本文より長いメタ情報になる。

したがって成果物側には要約と参照のみを置き、詳細は外部ファイルへ残す。

```yaml
grade:
  verdict: pass
  score: 98
  content_hash: d61b01...
  done_criteria:
    satisfied: 5
    total: 6
    detail_ref: <詳細ファイルへの参照>
```

要点は `content_hash` を成果物側が持つことである。詳細ファイルが古くなっても、成果物を見れば
評価が現在の内容に対するものかを判定できる。

## 5. 判定の分離

score と `done_criteria` の充足を合成しない。

| score | done_criteria | 扱い                         |
| ----- | ------------- | ---------------------------- |
| 98    | 6/6           | 受け入れ可                   |
| 98    | **5/6**       | **不可**。条件未充足         |
| 79    | 6/6           | 条件は満たすが品質に指摘あり |

score の閾値で `done_criteria` を上書きできない形にする。文書としての水準と、個別の完了条件の
充足は別の軸である。

`unsatisfied` に `roles` を含めれば、誰の確認が残っているかが分かる。`G-*-review-pass` ゲートが
束ねていた役割別の責任を保てる。

## 6. 判断が要る点

- 詳細ファイルを実行ごとに残すか、成果物ごとに 1 ファイルとして上書きするか。後者なら時点の
  記録は git 履歴が担う。grade が採る方式であり、`br-sample` の改善を履歴から辿れた実績がある。
- review を置き換えるか併存させるか。併存は二重評価になり、置き換えは 090 タスクと
  `G-*-review-pass` ゲートの再設計を伴う。
- `done_criteria` 未充足を検知したとき、誰へどう伝えるか。
- 既存 26 件の review result の扱い。

## 7. 完了条件

- `grade --target deliverable` が `done_criteria` を評価に取り込む。
- 成果物の frontmatter に `done_criteria` の充足状況が要約として記録される。全量は書き込まない。
- 成果物側の `content_hash` により、評価が現在の内容に対するものかを判定できる。
- score と `done_criteria` の充足が別の軸として保たれている。score の閾値が充足判定を上書き
  しない。
- 未充足の条件について、担当ロールが分かる。
- 同じ成果物を再評価したとき、最新の評価が一意に判別できる。
- routine から定期実行でき、変更のあった成果物だけを再評価できる。
- review との関係が決まっている。置き換える場合は 090 タスクとゲートの扱いが示されている。

## 8. 作業内容

| No  | 作業                                      | メモ                   |
| --- | ----------------------------------------- | ---------------------- |
| 1   | 詳細ファイルの方式を決める                | 実行ごとか成果物ごとか |
| 2   | review との関係を決める                   | 置き換えか併存か       |
| 3   | `done_criteria` を grade の評価へ取り込む | `viewpoint` で照合する |
| 4   | frontmatter へ要約と参照を記録する        | 分量を抑える           |
| 5   | score と充足を分離して判定する            |                        |
| 6   | 既存 26 件の review result の扱いを決める |                        |
| 7   | テストを追加する                          |                        |

## 9. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 10. 関連ドキュメント

- [[specdojo:review-guide]]: review の位置づけと PJR への転記条件。
- [[prj-0001:pjr-20dv-grade-content-hash-normalization]]: `content_hash` による変更検知。
- [[prj-0001:pjr-t2kk-grade-recheck-routine]]: 変更のあった文書の定期再評価。
