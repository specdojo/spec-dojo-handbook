---
specdojo:
  id: specdojo:opd-index-rulebook
  type: rulebook
  status: draft
  target_format: markdown
  recipe: undecided
  sample: specdojo:opd-index-sample
  template: undecided
  grade:
    rubric: grade-rubric-v1
    reference: specdojo:prj-overview-rulebook
    target: kata
    verdict: needs-work
    score: 79
    graded_at: "2026-08-31T11:42:38.478Z"
    graded_by: gemma-expert-executor
    content_hash: 210911bb35ee82e9d2954687596f4c6782fbf8a170ec42d8434485cdde5465d1
    categories:
      consistency:
        score: 38
      usability:
        score: 100
      architecture:
        score: 100
      quality:
        score: 75
    viewpoints:
      vp-arc-cross-document-consistency:
        level: 1
        score: 25
      vp-arc-conciseness:
        level: 4
        score: 100
      vp-arc-single-responsibility:
        level: 4
        score: 100
      vp-qe-verifiability:
        level: 4
        score: 100
      vp-qe-omissions-consistency:
        level: 2
        score: 50
      vp-qe-kata-conformance:
        level: 2
        score: 50
      vp-ux-readability:
        level: 4
        score: 100
      vp-ux-language-consistency:
        level: 4
        score: 100
      vp-arc-document-structure:
        level: 4
        score: 100
    findings:
      blocker: 0
      major: 4
      minor: 3
      note: 0
---

# 運用方針・設計 全体構成 作成ルール

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency サンプル `specdojo:opd-index-sample` における rulebook 参照 ID と本ルールの ID が不整合である。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-qe-kata-conformance サンプルとしての整合性がなく、rulebook としての機能（ exemplification ）を果たしていない。 -->

Operations Policy and Design Index Documentation Rules

本ドキュメントは、運用方針・設計の全体構成（`opd-index`）を統一形式で記述するためのルールを定義する。

<!-- specdojo:finding id=F006 severity=minor rule=vp-qe-kata-conformance recipe が undecided であり、具体的な記述手順への導線が未定義である。 -->

## 1. 全体方針

<!-- specdojo:finding id=F007 severity=minor rule=vp-qe-kata-conformance template が undecided であり、骨組みの提供がなされていない。 -->

- `opd-index` は恒常運用の方針と統制基準の SSOT とする。
- SLO/SLA/KPI、責任分界、変更管理、復旧方針を判定可能な粒度で記述する。
- 実行手順の詳細は `opr-*` に委譲し、方針と手順の責務を分離する。

## 2. 位置づけと用語定義

- `opd-index` は運用方針・設計ドキュメント群の入口である。
- `opd-<term>` は `opd-index` の差分（補足・具体化・例外）を記述する。
- `opr-index` / `opr-<term>` は手順書であり、実行手順と証跡を定義する。

## 3. ファイル命名・ID規則

- 対象ドキュメント ID は `opd-index` を使用する。
- ファイル名は `opd-index.md` を推奨する。
- 分冊時は `opd-<term>.md` を使用し、`<term>` は kebab-case とする。

## 4. 推奨 Frontmatter 項目

| 項目 | 説明        | 必須 |
| ---- | ----------- | ---- |
| `id` | `opd-index` | ○    |

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency 推奨されるファイル配置（ディレクトリパス）の定義が欠落している。 -->

| `type` | `operations` | ○ |
| `status` | `draft` / `ready` / `deprecated` | ○ |
| `rulebook` | `specdojo:opd-index-rulebook` | 任意 |
| `based_on` | 根拠仕様 ID 配列 | 任意 |
| `supersedes` | 置換関係 ID 配列 | 任意 |

<!-- specdojo:finding id=F004 severity=minor rule=vp-qe-omissions-consistency Frontmatter の参照スキーマ（deliverable-frontmatter.schema.yaml 等）への言及がなく、共通標準との整合性が不明確である。 -->

## 5. 本文構成（標準テンプレ）

| 章  | 内容                                               | 必須 |
| --- | -------------------------------------------------- | ---- |
| 1   | 概要（index）                                      | ○    |
| 2   | 運用の範囲・前提                                   | ○    |
| 3   | SLO・SLA・KPI                                      | ○    |
| 4   | 体制・責任分界（RACI・当番・エスカレーション）     | ○    |
| 5   | 監視・アラート方針（指標・閾値・通知先・初動）     | ○    |
| 6   | 障害対応方針（優先度・停止判断・周知）             | ○    |
| 7   | 変更管理（リリース・設定変更・承認・ロールバック） | ○    |
| 8   | バックアップ・リストア方針（RTO/RPO）              | ○    |
| 9   | 権限・アカウント運用（棚卸し・監査ログ）           | ○    |
| 10  | 定期運用方針（バッチ・点検）                       | ○    |

<!-- specdojo:finding id=F002 severity=major rule=vp-arc-cross-document-consistency 本ルールで12章すべてを必須としているが、対応するサンプルに実装されておらず、実効性に欠ける。 -->

| 11 | 問い合わせ運用方針（窓口・分類・SLA） | ○ |
| 12 | 関連ドキュメント導線（`opr-index` 等） | ○ |

## 6. 記述ガイド

- SLO/SLA/KPI は数値目標、測定方法、判定者、証跡をセットで記述する。
- 体制は RACI と優先度別エスカレーション条件を併記する。
- 監視・障害・変更管理は「条件」「判断者」「通知先」を明示する。
- バックアップ方針は RTO/RPO と検証頻度を明記する。
- 関連ドキュメント導線には `opr-index` を必ず含める。

## 7. 禁止事項

- 手順詳細（コマンド列、逐次チェックリスト）を本書へ大量記載しない。
- SLO/SLA/KPI を定量化せず曖昧語のみで記載しない。
- 責任分界やエスカレーション条件を未定義のまま確定しない。
- 変更承認条件とロールバック条件を省略しない。
