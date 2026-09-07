---
specdojo:
  id: specdojo:mm-rulebook
  type: rulebook
  status: draft
  recipe: not-needed
  sample: specdojo:mm-sample
  template: not-needed
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 91
    graded_at: "2026-09-02T21:28:56.236Z"
    graded_by: gemma-expert-executor
    content_hash: 3c0d4876858d8cca32d7172f31bfe55b1d22f6f65d4284b5105de8c62a9f7ae5
    categories:
      consistency: { score: 88 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 88 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 3, score: 75 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 3, note: 0 }
---

# 議事録 作成ルール

Meeting Minutes Documentation Rulebook

本ドキュメントは、議事録（`mm-<yyyy-mm-dd>-<nn>`）を統一形式で記述するためのルールを定義する。

## 1. 全体方針

- 会議の決定事項とアクションを追跡可能に記録する。
- 誰が、何を、いつまでに行うかを明確化する。
- 議論要旨よりも決定と宿題を優先して残す。

## 2. 位置づけと用語定義（必要に応じて）

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-omissions-consistency 「位置づけ」の記述が不十分であり、プロジェクト全体の成果物体系やトラックにおける役割が明示されていない。 -->

- 議事録は会議の公式記録として扱う。
- 進捗報告や課題ログと相互参照する。

## 3. ファイル命名・ID規則

- 推奨: `mm-<yyyy-mm-dd>-<nn>.md`
- 日付はISO形式、連番は2桁ゼロ埋めを推奨する。

## 4. 推奨 Frontmatter 項目

| 項目 | 説明                   | 必須 |
| ---- | ---------------------- | ---- |
| id   | `mm-<yyyy-mm-dd>-<nn>` | ○    |

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-kata-conformance サンプル (`mm-sample.md`) の ID が、本書で必須と定義している形式 (`mm-＜yyyy-mm-dd＞-＜nn＞`) に準拠していない。 -->

| type | `project` | ○ |
| status | `draft` / `ready` / `deprecated` | ○ |

## 5. 本文構成（標準テンプレ）

| 番号 | 見出し   | 必須 |
| ---- | -------- | ---- |
| 1    | 会議情報 | ○    |
| 2    | 議題     | ○    |

| 3 | 決定事項 | ○ |
| 4 | アクションアイテム | ○ |

## 6. 記述ガイド

<!-- specdojo:finding id=F003 severity=minor rule=vp-ux-readability 「記述ガイド」の内容が簡潔すぎるため、具体的にどのような記述が「良い/悪い」のかを判断するための例示や詳細な基準が不足している。 -->

- 決定事項には決定者を明記する。
- アクションには担当者と期限を必ず付与する。
- 保留事項は次回確認日を記載する。

## 7. 禁止事項

- 結論不明の議論のみを羅列しない。
- 担当者未記載のアクションを残さない。

- 実装詳細を議事録本文へ過度に記載しない。
