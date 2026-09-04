---
specdojo:
  id: specdojo:pm-raci-recipe
  type: recipe
  status: ready
  rulebook: specdojo:pm-raci-rulebook
  sample: specdojo:pm-raci-sample
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 75
    graded_at: "2026-09-04T16:01:16.899Z"
    graded_by: codex-expert-executor
    content_hash: 4b288c2ccefa3acb73b13dd205d5c7d4b132f068ca89807d0559ce451c306c9f
    categories:
      consistency: { score: 63 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 3, minor: 3, note: 0 }
---

# RACI 作成レシピ

RACI Writing Recipe

責任衝突が起きやすい主要成果物と主要判断だけを、二つのマトリクスへ整理する作り方です。

## 1. このレシピの使い方

- 初期スコープから主要成果物と主要判断を選びます。
- 成果物別と判断・プロセス別のRACIを作ります。
- Schedule owner、member割り当てとの整合を確認します。
- 責任衝突や判断停滞の回避（Why）、対象となる主要成果物・判断（What）、RACI と owner 方針（How）を扱い、行名・Role code・Schedule owner の対応で追跡します（Trace）。member 割り当ては再掲しません。

## 2. 作成前に集める情報

| 項目      | 集める情報                             |
| --------- | -------------------------------------- |
| Role code | 採用済みの責任語彙                     |
| 成果物    | 初期スコープ、管理計画、公開対象       |
| 判断      | 価値、費用・負荷、変更、品質例外、公開 |
| 実行      | Schedule owner、主たる作業責任         |
| 割り当て  | member、兼務、Agent支援の正本          |

## 3. 全体の作成手順

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=30 Schedule ownerを常に主たる`R`と一致させる手順は、上位の人と組織の定義標準がWBS ownerを優先し、承認・レビューを独立Task/Milestoneにした場合は`A`または`C`をownerにできるとする規則と矛盾するため、タスク種別と正本の優先順を含む対応手順へ修正してください。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=28 `R`を一つ以上許容しながら、複数`R`から「主たる`R`」を識別する表記またはタスクactionに基づく選定手順がないため, Schedule ownerとの一致をpass/fail判定できる方法を定義してください。 -->

1. 責任衝突の可能性がある成果物・判断だけを選びます。
2. 使用するRole code列を必要最小限に絞ります。
3. 各行へ一つの`A`と一つ以上の`R`を置きます。
4. 相談が必要なRoleに`C`、結果共有だけのRoleに`I`を置きます。
5. Schedule ownerと主たる`R`を一致させます。
6. 生成ビューや通常手順の重複行を削除します。

<!-- specdojo:finding id=F005 severity=major rule=vp-qe-kata-conformance line=33 `各章の書き方`が指示文だけで、Recipe記述標準が必須とする「書き手が答えるべき問い」を一つも示していないため、各必須章に成果物固有の問いを追加してください。 -->

## 4. 各章の書き方

### 4.1. 適用方針

- 対象・省略範囲とRACI記号を簡潔に書きます。
- 兼務とAgent支援の扱いを示します。
- 未使用Role code列を置かない理由を示します。

### 4.2. 成果物別RACI

- 主要成果物と管理文書へ絞ります。
- 同じ正本から生成するビューはまとめます。
- 成果物の作業責任と内容の最終責任を区別します。

### 4.3. 判断・プロセス別RACI

- 最終判断者が異なる判断を行にします。
- 通常作業を網羅せず、価値・変更・品質・公開を優先します。
- 当事者確認が必要な場合は内部Roleだけで代替しません。

### 4.4. Schedule・実行主体との対応

- ownerと主たる`R`を一致させます。
- 個人やAgentはRACI列ではなくmember正本へ置きます。
- 不一致時の更新先を決めます。

## 5. 深掘り手順

1. 各行の`A`が本当に最終判断者か確認します。
2. `C`と`I`を必要最小限に減らします。
3. 同じ責任配置の行をグループ化します。
4. Scheduleに存在しない管理目的だけの行を削除します。

## 6. 良い例 / 悪い例

<!-- specdojo:finding id=F004 severity=minor rule=vp-qe-omissions-consistency line=67 rulebook で必須とされている「見直し条件」章の書き方ガイドが、「4. 各章の書き方」から漏れているため追加してください。 -->

| 観点 | 良い例                       | 悪い例                  |
| ---- | ---------------------------- | ----------------------- |
| 対象 | 主要成果物と公開判断へ絞る   | 全カタログ行を転記する  |
| 責任 | 一行に`A`を一つ置く          | `A`を複数置く           |
| 実行 | ownerと主たる`R`を一致させる | 個人名をownerと列に使う |

## 7. レビュー観点

<!-- specdojo:finding id=F006 severity=minor rule=vp-qe-kata-conformance line=76 `レビュー観点`が箇条書きであり、Recipe記述標準が必須とする表形式になっていないため、各観点と確認内容を列にした表へ変更してください。 -->

- 一行に`A`が一つ、`R`が一つ以上あるか。
- 未採用Roleや個人名を使っていないか。
- Schedule ownerと整合しているか。
- 責任境界が重要でない行を増やしていないか。

## 8. 仕上げチェック

- 成果物別、判断・プロセス別の二表がある。
- 省略範囲と見直し条件が明確である。
- member・Agent割り当てを再掲していない。
- Agentに`A`を割り当てていない。
- 各行の採用理由、`A` / `R`、Schedule owner または判断記録先の対応を追跡できる。

<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-verifiability line=89 仕上げチェックが各行の採用理由と判断記録先の追跡を求める一方、本文に記録先・識別子・照合手順がなくsample/templateにも対応欄がないため、追跡方法と確認手順を定義してください。 -->
