---
specdojo:
  id: specdojo:otp-index-rulebook
  type: rulebook
  status: draft
  recipe: undecided
  sample: specdojo:otp-index-sample
  template: undecided
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 76
    graded_at: "2026-09-03T01:37:37.628Z"
    graded_by: gemma-expert-executor
    content_hash: d28091bae60763f285be38115f0339cdd0d2e2a096d2c8bc41fd18b938b63581
    categories:
      consistency: { score: 75 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 3, minor: 1, note: 0 }
---

# 運用切替計画（ハイパーケア含む） 作成ルール

Operations Transition Plan Documentation Rules

本ドキュメントは、`otp-index`（運用切替計画の入口・共通SSOT）を一貫した粒度で作成するためのルールを定義する。

## 1. 全体方針

- `otp-index` は運用切替計画の入口（共通SSOT）として、運用安定化に必要な共通方針と判断軸を定義する。
- 個別領域の詳細は `otp-<term>` に委譲し、`otp-index` では共通運用と導線を定義する。
- 曖昧表現を避け、一次応答条件・SLA・クローズ条件が判定可能な記述にする。

## 2. 位置づけと用語定義（必要に応じて）

- `mip-index`: 移行計画・成功条件・ハイパーケア方針の合意
- `cop-index`: 当日切替の実行計画（Runbook）
- `otp-index`: 運用切替の共通設計（本書）
- `otp-<term>`: 対象別の運用詳細（監視、窓口、当番、手順差分）
- `mtp-index` / `mtp-<term>`: リハーサル計画と証跡

## 3. ファイル命名・ID規則

- `id` は `otp-index` を使用する。
- ファイル名は `otp-index-運用切替計画.md` など、プロジェクト内で一意になるように命名する。

## 4. 推奨 Frontmatter 項目

| 項目 | 説明 | 必須 |
| ---- | ---- | ---- |

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency ID指定が `otp-index` とのみされており、プロジェクト識別子（`＜project-id＞:`）を付与する標準的な ID 命名規則に準拠していない。 -->

| id | `otp-index` | ○ |

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-verifiability Frontmatter `type` に `migration` 固定と記述されているが、提供サンプル では `project` となっており、正解が不明確で検証不能である。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance サンプル `specdojo:otp-index-sample` が、本ルールブックで定義した Frontmatter の `type: migration` 固定の制約を遵守していない。 -->

| type | `migration` 固定 | ○ |
| title | `運用切替計画: 全体` | ○ |

| status | `draft` / `ready` / `deprecated` | ○ |
| based_on | 根拠となる仕様ID（ID配列。未指定は `[]` 可） | 任意 |
| supersedes | 置き換え関係（ID配列。未指定は `[]` 可） | 任意 |

## 5. 本文構成（標準テンプレ）

| 番号 | 見出し | 必須 |
| ---- | ------ | ---- |

| 1 | 概要（index） | ○ |
| 2 | 監視/アラート | ○ |
| 3 | バックアップ/リストア | ○ |
| 4 | 権限/アカウント移行 | ○ |
| 5 | 運用手順の変更点 | ○ |
| 6 | 問合せ窓口/一次対応 | ○ |
| 7 | 障害対応フロー | ○ |
| 8 | 初期増員体制（期間・当番・SLA） | ○ |
| 9 | 旧システムの停止/参照方針 | ○ |
| 10 | 移行完了後のクローズ条件 | ○ |
| 11 | 関連ドキュメント（必須） | ○ |

## 6. 記述ガイド

### 6.1. 概要（index）

<!-- specdojo:finding id=F004 severity=minor rule=vp-ux-readability 記述ガイドが項目の列挙に留まっており、良例（`prj-overview-rulebook.md`）のような「事実と仮説を混ぜない」等の具体的な記述品質への指針が不足している。 -->

- 運用安定化の目的と適用範囲を 1〜3 行で示す。
- 本書が入口（SSOT）であり、詳細は `otp-<term>` にあることを明記する。

### 6.2. 監視/アラート

- 監視対象、指標/閾値、通知先、初動ルールを明記する。

### 6.3. バックアップ/リストア

- バックアップ頻度、保管先、保持期間、リストア責任者を明記する。

### 6.4. 権限/アカウント移行

- 旧/新の権限差分、移行タイミング、検証方法を明記する。

### 6.5. 運用手順の変更点

- 旧手順との差分、理由、影響を明記し、詳細はリンク参照とする。

### 6.6. 問合せ窓口/一次対応

- 受付時間、チャネル、優先度分類、エスカレーション条件を明記する。

### 6.7. 障害対応フロー

- 判断/連絡/復旧/報告の流れと指揮系統を明記する。

### 6.8. 初期増員体制（期間・当番・SLA）

- ハイパーケア期間、当番体制、SLA、終了判断者を明記する。

### 6.9. 旧システムの停止/参照方針

- 停止時期、参照可否、アーカイブ方針を明記する。

### 6.10. 移行完了後のクローズ条件

- 完了条件、クローズ判断者、最終報告物を明記する。

### 6.11. 関連ドキュメント（必須）

- 各 `otp-<term>` への導線を必ず記載する。
- 分冊が無い場合でも `（本書のみ）` を明記する。

## 7. 禁止事項

- `otp-<term>` に委譲すべき個別運用詳細を `otp-index` に重複記載しない。
- 監視/窓口/SLA/クローズ条件を未定義にしない。
- `otp-<term>` への導線を欠落させない。
- 実装依存の長大な手順やコードを本文に記載しない。
