---
specdojo:
  id: specdojo:pm-raci-rulebook
  type: rulebook
  status: ready
  target_format: markdown
  recipe: specdojo:pm-raci-recipe
  sample: specdojo:pm-raci-sample
  template: specdojo:pm-raci-template
  based_on:
    - specdojo:people-and-organization-definition-standard
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 68
    graded_at: "2026-09-03T04:49:07.178Z"
    graded_by: codex-expert-executor
    content_hash: 897b6a6a602e4ea1289eb2e1cbab57eaf9ffcd3b3f7a90fa8e7264e24efc2ba5
    categories:
      consistency: { score: 50 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 3, score: 75 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 4, minor: 4, note: 0 }
---

# RACI 作成ルール

RACI Documentation Rulebook

主要成果物と主要判断の責任境界を、最小限のマトリクスで示すためのルールです。成果物カタログ全体やRole codeの定義を複製せず、責任衝突の可能性がある対象へ絞ります。

## 1. 全体方針

- RACI は、誰が作業し、誰が最終責任を持つかを明確にするために使います。
- 全成果物を網羅せず、主要成果物、価値判断、変更、公開など責任境界が重要な対象へ絞ります。
- 成果物別と判断・プロセス別の二表を基本とし、重複する行は統合します。
- 各行の `A` は一つの Role code に限定し、主たる実作業者に `R` を置きます。
- Role code はロール定義、実行主体・兼務はメンバー定義、Schedule owner はScheduleを正本とします。
- Agent は `R` または `C` を支援できますが、`A` は担いません。

## 2. 位置づけと用語定義

| 記号 | 意味        | 定義                               |
| ---- | ----------- | ---------------------------------- |
| R    | Responsible | 主たる実作業を担う                 |
| A    | Accountable | 最終責任を持ち、承認または判断する |
| C    | Consulted   | 作業前・判断前に相談または確認する |
| I    | Informed    | 結果または変更の共有を受ける       |

## 3. ファイル命名・ID規則

- 配置は `docs/ja/projects/<project-id>/030-project-management/pm-raci.md` を推奨します。
- ID は `<project-id>:pm-raci`、ファイル名は `pm-raci.md` とします。
- 列には採用済み Role code、行には成果物 ID または明確な判断・プロセス名を使います。

## 4. 推奨 Frontmatter 項目

| 項目       | 説明                             | 必須 |
| ---------- | -------------------------------- | ---- |
| id         | `<project-id>:pm-raci`           | ○    |
| type       | `project`                        | ○    |
| status     | `draft` / `ready` / `deprecated` | ○    |
| rulebook   | `specdojo:pm-raci-rulebook`      | ○    |
| based_on   | 組織定義、ロール定義などの ID    | 任意 |
| supersedes | 置き換え対象の旧文書 ID          | 任意 |

<!-- specdojo:finding id=F003 severity=minor rule=vp-arc-conciseness Frontmatterでtemplateを宣言しているにもかかわらず見出し骨格を本文構成表へ再掲し、主要制約も後続節で反復しているため、本文要件には各章の目的・必須性・判定規則だけを残し、骨格はtemplateへ集約してください。 -->
<!-- specdojo:finding id=F007 severity=minor rule=vp-qe-kata-conformance templateを文書IDで宣言した系統では骨組みをtemplateの正本とするRulebook記述標準に反して同じ見出し一覧を再掲しているため、章の目的と必須性だけを残して構造の正本をtemplateへ統一してください。 -->

## 5. 本文構成（標準テンプレ）

| 番号 | 見出し                     | 必須 | 内容                                         |
| ---- | -------------------------- | ---- | -------------------------------------------- |
| 1    | 適用方針                   | ○    | 対象範囲、記号、Role code、兼務・Agentの扱い |
| 2    | 成果物別 RACI              | ○    | 主要成果物の責任マトリクス                   |
| 3    | 判断・プロセス別 RACI      | ○    | 価値判断、変更、品質、公開等の責任マトリクス |
| 4    | Schedule・実行主体との対応 | ○    | `R`、Schedule owner、member割り当ての関係    |
| 5    | 見直し条件                 | ○    | 更新トリガーと確認内容                       |

## 6. 記述ガイド

### 6.1. 適用方針

- 対象とする主要成果物・判断と、省略する対象を示します。
- `R` / `A` / `C` / `I` の意味を簡潔に示し、プロジェクト固有の補足だけを書きます。
- 使用する列は採用済み Role code に絞り、省略理由を示します。

### 6.2. 成果物別 RACI

<!-- specdojo:finding id=F002 severity=minor rule=vp-arc-cross-document-consistency 採用済みRole codeだけを列に使う規則に対し,rulebookとtemplateが`PO`、`PM`、`BA`、`ARC`、`QE`の固定列を示し,sampleは`DEV`を採用して`ARC`を省略しているため,列を可変プレースホルダーにするか例示であることを明記してください。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-qe-kata-conformance rulebookが採用済みRole codeだけを列に使うよう求める一方、対応templateは固定Role列を編集対象として示しておらず未採用Roleを含む成果物を生成し得るため、templateの列を可変プレースホルダー化し追加・削除手順をrecipeへ明記してください。 -->
<!-- specdojo:finding id=F008 severity=minor rule=vp-ux-readability `PO`、`PM`、`BA`、`ARC`、`QE`の表が例示か必須構造か示されず、採用済みRole codeだけを使うという直前の規則と読み分けにくいため、「列は例であり採用Roleに置換する」と表の直前に明記してください。 -->

| 成果物 | PO  | PM  | BA  | ARC | QE  |
| ------ | --- | --- | --- | --- | --- |

<!-- specdojo:finding id=F005 severity=major rule=vp-qe-omissions-consistency 成果物カタログの`pm-raci`完了条件が要求する業務・技術・品質の各観点の責任分担を確認する網羅条件がないため、対象を絞る場合でも三観点それぞれの責任境界を確認できることを必須要件へ追加してください。 -->

- 初期スコープの主要成果物、管理計画、公開対象など責任衝突があり得る単位へ絞ります。
- 生成ビューは正本と責任が同じ場合に独立行を作りません。

<!-- specdojo:finding id=F004 severity=major rule=vp-qe-verifiability 一つ以上の`R`を許容する一方で複数`R`から主たる`R`を識別する表記または選定規則がなく、Schedule ownerとの一致をpass/fail判定できないため、主担当の明示方法かタスクactionに基づく選定手順を定義してください。 -->

- 各行に一つの `A` と一つ以上の `R` があることを確認します。

### 6.3. 判断・プロセス別 RACI

| 判断・プロセス | PO  | PM  | BA  | ARC | QE  |
| -------------- | --- | --- | --- | --- | --- |

- 当事者価値、費用・負荷、変更、品質例外、公開など最終判断者が異なる対象を分けます。
- 成果物作成と成果物内容の最終判断を混同しません。
- 通常の作業手順を網羅せず、責任境界が必要なプロセスだけを置きます。

### 6.4. Schedule・実行主体との対応

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency Schedule ownerを常に主たる`R`と一致させる規則は、上位標準が承認・レビューを独立タスク化した場合に`A`または`C`をownerにできるとする例外、およびSchedule rulebookが一致対象を成果物作成・更新タスクに限定する規則と矛盾するため、タスク種別ごとの対応規則へ修正してください。 -->

- Schedule owner は成果物行またはプロセス行の主たる `R` と一致させます。
- 実際のmember・兼務はメンバー定義で割り当て、RACIへ個人名を記載しません。
- 不一致がある場合にどの正本を更新するかを示します。

### 6.5. 見直し条件

| トリガー | 確認すること |
| -------- | ------------ |

- スコープ、採用Role code、主要成果物、判断ゲート、Schedule ownerが変わった場合に見直します。
- 兼務で作業・判断が滞留した場合は、まず責任分担とエスカレーションを見直します。
- RACIの行追加は、責任衝突を防ぐ必要がある場合だけ行います。

## 7. 禁止事項

| 禁止事項                                         | 理由                             |
| ------------------------------------------------ | -------------------------------- |
| 成果物カタログ全体や生成ビューを機械的に列挙する | 保守量が増え、主要責任が埋もれる |
| 未採用Role code、member、人名、agent名を列に使う | 正本と責任語彙が一致しないため   |
| `A`を省略する、または一行に複数置く              | 最終責任が不明になるため         |
| Agentに`A`を割り当てる                           | 人間の説明責任を代替するため     |
| Schedule ownerと主たる`R`を矛盾させる            | 実作業責任を追跡できないため     |
| 兼務を理由に責任境界を統合する                   | 判断と作業の区別が失われるため   |
