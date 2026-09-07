---
specdojo:
  id: specdojo:opr-index-rulebook
  type: rulebook
  status: draft
  target_format: markdown
  recipe: undecided
  sample: specdojo:opr-index-sample
  template: undecided
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 74
    graded_at: "2026-09-03T00:59:32.747Z"
    graded_by: gemma-expert-executor
    content_hash: c049bcd84678925eb57a529a6a88ef6d1ed300918bc4a85257c34916e12568a5
    categories:
      consistency: { score: 100 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 38 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 4, score: 100 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 4, minor: 2, note: 0 }
---

# 運用手順 全体構成 作成ルール

Operations Procedure Runbook Index Documentation Rules

本ドキュメントは、運用手順の全体構成（`opr-index`）を統一形式で記述するためのルールを定義する。

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-kata-conformance `recipe` および `template` が `undecided` のままであり、作成支援資産が不足している。 -->

## 1. 全体方針

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance 対応サンプル `specdojo:opr-index-sample` が本ルールブックに従っておらず、Frontmatter の `rulebook` 指定が誤っている（`opd-rulebook` になっている）。 -->

- `opr-index` は恒常運用の実行手順と証跡ルールの SSOT とする。
- 手順は再現可能性を重視し、実施条件・完了条件・証跡を明確化する。
- 方針・統制の定義は `opd-*` に委譲し、責務を分離する。

## 2. 位置づけと用語定義

- `opr-index` は運用手順ドキュメント群の入口である。
- `opr-<term>` は `opr-index` の差分（具体手順・個別判断）を記述する。
- `opd-index` は運用方針の参照元であり、手順は `opd` と整合させる。

## 3. ファイル命名・ID規則

- 対象ドキュメント ID は `opr-index` を使用する。
- ファイル名は `opr-index.md` を推奨する。
- 分冊時は `opr-<term>.md` を使用し、`<term>` は kebab-case とする。

## 4. 推奨 Frontmatter 項目

| 項目         | 説明                             | 必須 |
| ------------ | -------------------------------- | ---- |
| `id`         | `opr-index`                      | ○    |
| `type`       | `operations`                     | ○    |
| `status`     | `draft` / `ready` / `deprecated` | ○    |
| `rulebook`   | `specdojo:opr-index-rulebook`    | 任意 |
| `based_on`   | 根拠仕様 ID 配列                 | 任意 |
| `supersedes` | 置換関係 ID 配列                 | 任意 |

## 5. 本文構成（標準テンプレ）

| 章  | 内容                                             | 必須 |
| --- | ------------------------------------------------ | ---- |
| 1   | 概要（index）                                    | ○    |
| 2   | 手順適用範囲・前提                               | ○    |
| 3   | 日次/週次/月次点検手順                           | ○    |
| 4   | 障害対応手順（P1/P2…、切り分け、一次対応、復旧） | ○    |
| 5   | アラート対応手順（確認→暫定対応→恒久対応）       | ○    |
| 6   | バックアップ確認・リストア手順（演習含む）       | ○    |
| 7   | バッチ再実行・失敗時対応                         | ○    |
| 8   | 運用変更作業（設定変更・デプロイ・ロールバック） | ○    |
| 9   | アカウント付与/剥奪手順                          | ○    |

| 10 | 問い合わせ一次対応手順（テンプレ・ナレッジ） | ○ |
| 11 | 証跡（ログ、チケット、チェックリスト、実施記録） | ○ |

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-verifiability 本文構成表に「内容（要点）」や「記述基準」の列がなく、各章で具体的に何を記述すべきかの判定条件が不明確である。 -->

| 12 | 関連ドキュメント導線（`opd-index` 参照） | ○ |

<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance 本ルールブックで 12 章すべてを必須（○）としているが、対応サンプルでは 4 章分しか実装されておらず、整合していない。 -->

<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability 本文構成表に記述要点がなく、章タイトルから内容を推測させる形式となっており、作成者の判断に依存する。 -->

## 6. 記述ガイド

- 各手順に実施者、入力条件、完了条件、証跡を明示する。
- 障害対応は優先度別に初動 SLA とエスカレーションを定義する。
- バッチ再実行は上限回数と冪等性条件を記述する。
- 変更作業は承認者とロールバック条件を必ず記述する。
- 証跡章では保存先、保管期間、識別子（ticket_id/run_id 等）を明記する。

## 7. 禁止事項

- 「適宜」「必要に応じて」など判定不能な手順記述をしない。

- 優先度別障害対応を未定義のまま確定しない。
- 証跡要件（保存先・識別子）を省略しない。
- `opd` と矛盾する手順を独自に定義しない。

<!-- specdojo:finding id=F006 severity=minor rule=vp-ux-readability 12 章という多範な構成を要求していながら、記述ガイドが一部の章（障害対応、バッチ等）に限定されており、他の必須章に対するガイダンスが不足している。 -->
