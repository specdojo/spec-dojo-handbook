---
specdojo:
  id: prj-0001:pjr-9s41-exec-templates-separation
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: waiting
  priority: medium
  owner: ARC
  registered_at: "2026-08-31T21:38:14Z"
  due_on: "2026-09-30"
  block_reason: "agent exited with non-zero code: agent exited with non-zero code: agent-config-write: protected configuration changes detected; paths=lefthook.yml; agent must record the required change in the result …"
  register_events:
    - v: 1
      id: reg_ced76bdd8e324812a974133aa518f5c0
      ts: "2026-08-31T21:38:15Z"
      action: add
      actor: manual
      from_status: null
      to_status: open
      reason: item added
      changes:
        - field: status
          from: ""
          to: open
        - field: title
          from: ""
          to: exec 系テンプレートを frontmatter_template 形式へ統一する
        - field: description
          from: ""
          to: Markdown テンプレートに2つの形式が併存している。成果物テンプレートは自身の Frontmatter に frontmatter_template を持ち、exec と result のテンプレートは本文先頭の _FRONTMATTER_ を生成処理が置換する。後者は Frontmatter を持たないため、grade をはじめとする Frontmatter 前提のツールが扱えない。document-metadata-standard は両形式を併記するのみで、なぜ分けるかの理由を記していない。exec plan の Frontmatter は origin や owner や approach や on_critical_path が条件で増減するため、単純な雛形では表現できない。全項目を雛形へ並べて空値の行を除去する後処理を加えれば統一できる。ただし値が固定で存在自体が条件となる項目には別の工夫が要る。対象は 31 ファイル、生成処理は exec-plans と exec-results と exec-register と job に分散する。exec は中核機能であり慎重に進める。
        - field: type
          from: ""
          to: todo
        - field: priority
          from: ""
          to: low
        - field: owner
          from: ""
          to: ARC
        - field: registered
          from: ""
          to: "2026-09-01"
        - field: due
          from: ""
          to: "2026-10-31"
    - v: 1
      id: reg_af8fd462f0264d1c9b1952c86919a419
      ts: "2026-08-31T22:51:32Z"
      action: update
      actor: manual
      from_status: open
      to_status: open
      reason: 役割の違いを構造へ反映する方針へ転換したため
      changes:
        - field: id
          from: prj-0001:pjr-9s41-template-frontmatter-unification
          to: prj-0001:pjr-9s41-exec-templates-separation
        - field: title
          from: exec 系テンプレートを frontmatter_template 形式へ統一する
          to: exec 系テンプレートを成果物テンプレートから分離する
        - field: description
          from: Markdown テンプレートに2つの形式が併存している。成果物テンプレートは自身の Frontmatter に `frontmatter_template` を持ち、exec と result のテンプレートは本文先頭の `_FRONTMATTER_` を生成処理が置換する。
          to: exec と result のテンプレート 31 件は、成果物テンプレートと役割が異なるにもかかわらず同じ docs/ja/specdojo/templates/ に置かれている。成果物テンプレートは rulebook から template として宣言され kata の一部を成すが、exec 系を宣言する rulebook は 0 件である。exec 系は plan と result を生成するための実行基盤の内部テンプレートであり、対応する成果物を持たない。grade が kata として評価しようとすること自体が誤りである。docs/ja/specdojo/exec-templates/ へ移し、template-authoring-standard の適用範囲を成果物テンプレートに限定する。ディレクトリで分かれるため grade の除外も単純になる。当初は frontmatter_template 形式への統一を検討したが、役割が違うものを同じ形式にする理由がないため方針を転換した。_FRONTMATTER_ 方式は維持する。
        - field: priority
          from: low
          to: medium
        - field: due
          from: "2026-10-31"
          to: "2026-09-30"
      previous_event_id: reg_ced76bdd8e324812a974133aa518f5c0
    - v: 1
      id: reg_bb57ccc07d7d4da9b9de986f139f398a
      ts: "2026-08-31T22:57:32Z"
      action: start
      actor: codex-expert-executor
      from_status: open
      to_status: in-progress
      reason: work started
      changes:
        - field: status
          from: open
          to: in-progress
      previous_event_id: reg_af8fd462f0264d1c9b1952c86919a419
    - v: 1
      id: reg_46649e0dc50b44f6bdfb2685dee7195b
      ts: "2026-08-31T23:09:36Z"
      action: wait
      actor: codex-expert-executor
      from_status: in-progress
      to_status: waiting
      reason: "agent exited with non-zero code: agent exited with non-zero code: agent-config-write: protected configuration changes detected; paths=lefthook.yml; agent must record the required change in the result …"
      changes:
        - field: status
          from: in-progress
          to: waiting
        - field: block_reason
          from: "-"
          to: "agent exited with non-zero code: agent exited with non-zero code: agent-config-write: protected configuration changes detected; paths=lefthook.yml; agent must record the required change in the result …"
      previous_event_id: reg_bb57ccc07d7d4da9b9de986f139f398a
---

# PJR-9S41 exec 系テンプレートを成果物テンプレートから分離する

## 1. 概要

exec と result のテンプレート 31 件は、成果物テンプレートと役割が異なるにもかかわらず同じ `docs/ja/specdojo/templates/` に置かれている。

成果物テンプレートは rulebook から `template` として宣言され、実践の型の一部を成す。一方 exec 系を宣言する rulebook は 0 件である。exec 系は plan と result を生成するための実行基盤の内部テンプレートであり、対応する成果物を持たない。

grade は kata の template として `templates/` 配下を評価するため、exec 系まで対象に含めてしまう。これらは Frontmatter を持たないため走査が停止する。役割が違うものを同じ場所に置いていることが原因である。

`docs/ja/specdojo/exec-templates/` へ移し、`template-authoring-standard` の適用範囲を成果物テンプレートに限定する。

## 2. 完了条件

- exec と result のテンプレートが `docs/ja/specdojo/exec-templates/` へ移されている。
- `template-authoring-standard` の適用範囲が成果物テンプレートに限定され、exec 系の位置づけが記載されている。
- grade が `exec-templates/` を対象に含めず、全件走査が停止しない。
- plan と result の生成が従来どおり動作する。
- 生成処理とテスト、規範文書の参照が新しい配置へ追随している。
- `npm run check` と統合テストが通る。

## 3. 作業内容

| No  | 作業                      | 担当 | 状態 | メモ                                         |
| --- | ------------------------- | ---- | ---- | -------------------------------------------- |
| 1   | 移動対象の確定            | ARC  | done | xep / xer / xrp / xrr の 31 件               |
| 2   | standard の記載方針の決定 | ARC  | done | 適用範囲と exec 系の扱い                     |
| 3   | ディレクトリの移動        | ARC  | done | 参照の追随を含む                             |
| 4   | 生成処理の参照更新        | ARC  | done | exec-plans、exec-results、exec-register、job |
| 5   | grade の対象範囲の調整    | ARC  | done | `exec-templates/` を除く                     |
| 6   | 規範文書の更新            | ARC  | done | template-authoring-standard ほか             |

### 3.1. 役割の違い

| 観点                | 成果物テンプレート     | exec / result テンプレート  |
| ------------------- | ---------------------- | --------------------------- |
| rulebook からの宣言 | される                 | されない（0 件）            |
| 実践の型の一部か    | はい                   | いいえ                      |
| 対応する成果物      | あり                   | なし。plan と result を生成 |
| 利用者              | 成果物を書く人と agent | exec の生成処理             |
| grade の対象        | 妥当                   | 不適切                      |
| 生成物 Frontmatter  | `frontmatter_template` | 本文先頭の `_FRONTMATTER_`  |
| 件数                | 61                     | 31                          |

実践の型は rulebook / recipe / sample / template が対応関係を持つ組である。exec 系はこの関係の外にあり、kata として評価する前提が成り立たない。

### 3.2. 統一ではなく分離を選ぶ理由

当初は `frontmatter_template` 形式への統一を検討した。しかし役割が違うものを同じ形式にする理由がない。

分離であれば `_FRONTMATTER_` 方式を維持でき、生成処理 4 箇所の書き換えと 31 ファイルの形式変換が不要になる。exec は中核機能であり、plan と result の生成が壊れるとタスク実行が止まるため、変更は小さいほうがよい。

grade の除外もディレクトリ単位で判定でき、本文の先頭を見る必要がなくなる。

### 3.3. grade の除外を本項目へ統合する

当初は grade 側で除外する対処を PJR-Q3JG として別に起票していたが、ディレクトリ分離により除外の実装が単純になるため本項目へ統合する。`exec-templates/` を走査対象から外すだけでよい。

### 3.4. 判断結果

- exec 系の配置とメタ情報方式は `document-metadata-standard` と `plan-result-lifecycle-guide` を正本とし、独立した authoring standard は追加しない。
- `xep-job-template.md` は plan を生成する実行基盤の部品のため、31 件の exec 系に含める。
- 生成処理、テスト fixture、規範文書、ガイドのリンク、pre-commit 対象を新しい配置へ追随させる。

## 4. 対応結果

- exec / result テンプレート 31 件を `docs/ja/specdojo/exec-templates/` へ移動した。
- exec plan、review plan、result、register plan、job plan の生成処理とテスト fixture を新パスへ追随させた。
- `template-authoring-standard` の適用範囲を成果物テンプレートに限定し、exec 系の位置づけを関連規範文書とガイドに反映した。
- grade の kata 探索が成果物テンプレートを含み、`exec-templates/` を含まないことをテストで固定した。

## 5. 関連ドキュメント

- [[specdojo:template-authoring-standard]]: 適用範囲を限定する対象。
- [[specdojo:document-metadata-standard]]: テンプレート自身のメタ情報と生成物 Frontmatter の分離。
- [[specdojo:exec-operation-guide]]: plan と result の生成。
- [[prj-0001:pjr-49d2-quality-assessment]]: grade の対象範囲。
