---
specdojo:
  id: specdojo:pr-rulebook
  type: rulebook
  status: draft
  recipe: not-needed
  sample: specdojo:pr-sample
  template: not-needed
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 91
    graded_at: "2026-09-03T05:49:11.261Z"
    graded_by: gemma-expert-executor
    content_hash: 55437f966b114a2ea148b64ec2e2a83a220c46085a251d1faac0afa665df1e4d
    categories:
      consistency: { score: 88 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 88 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 5, note: 0 }
---

# 進捗報告 作成ルール

Progress Report Documentation Rulebook

本ドキュメントは、進捗報告（`pr-<yyyy-mm-dd>-<nn>`）を統一形式で記述するためのルールを定義する。

## 1. 全体方針

- 報告期間の進捗、リスク、次アクションを定点観測できる形で記録する。
- 完了事項と未完了事項を区別して報告する。
- 判断に必要な数値・根拠を明示する。

<!-- specdojo:finding id=F004 severity=minor rule=vp-ux-readability 位置づけにおいて、報告のサイクル（頻度）および想定読者を明記し、運用の目的を明確にすることを推奨する。 -->

## 2. 位置づけと用語定義（必要に応じて）

- 進捗報告は定期レビューの基礎資料として扱う。
- 議事録、課題ログ、変更要求ログと整合を取る。

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-omissions-consistency ファイル命名規則だけでなく、推奨される配置ディレクトリ（例: `docs/ja/projects/＜project-id＞/progress-reports/`）を明記することを推奨する。 -->

## 3. ファイル命名・ID規則

- 推奨: `pr-<yyyy-mm-dd>-<nn>.md`
- 日付はISO形式、連番は2桁ゼロ埋めを推奨する。

## 4. 推奨 Frontmatter 項目

| 項目 | 説明 | 必須 |

<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-omissions-consistency 推奨 Frontmatter 項目表に、適用ルールを明示するための `rulebook` 項目を追加することを推奨する。 -->

| ------ | -------------------------------- | ---- |
| id | `pr-<yyyy-mm-dd>-<nn>` | ○ |

| type | `project` | ○ |
| status | `draft` / `ready` / `deprecated` | ○ |

## 5. 本文構成（標準テンプレ）

| 番号 | 見出し       | 必須 |
| ---- | ------------ | ---- |
| 1    | 報告期間     | ○    |
| 2    | 完了事項     | ○    |
| 3    | 進行中事項   | ○    |
| 4    | リスク・課題 | ○    |
| 5    | 次期予定     | ○    |

## 6. 記述ガイド

- 完了事項は成果物IDまたはタスクIDと紐づける。

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-verifiability 記述ガイドにおいて、完了事項やリスクなどの報告における「根拠」として具体的に何を提示すべきか（成果物ID、定量値など）の基準を明記することを推奨する。 -->
<!-- specdojo:finding id=F005 severity=minor rule=vp-ux-readability 記述ガイドにおいて、各項目の書き方のポイントや、避けるべき具体例などを詳細に記述し、作成者の迷いを減らす工夫をすることを推奨する。 -->

- リスク・課題は影響度と対応方針を明記する。
- 次期予定は担当者と期日を設定する。

## 7. 禁止事項

- 進捗率のみで根拠なく報告しない。
- リスクを抽象語のみで記載しない。

- 予定に期限や責任者を欠いたまま確定しない。
