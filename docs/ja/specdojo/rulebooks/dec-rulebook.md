---
specdojo:
  id: specdojo:dec-rulebook
  type: rulebook
  status: draft
  target_format: markdown
  sample: specdojo:dec-sample
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 96
    graded_at: "2026-09-02T16:04:46.577Z"
    graded_by: gemma-expert-executor
    content_hash: 4c6a64d8b91edfeb2a21e4edc89fc7ebb0e47cce0e37d9313cb85d56406cdd43
    categories:
      consistency: { score: 88 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 100 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 3, note: 0 }
---

# 決定記録 作成ルール

Decision Log Documentation Rulebook

本ドキュメントは、決定記録（`dec-<NNNN>-<topic>`）を統一形式で記述するためのルールを定義する。

## 1. 全体方針

- 重要な判断の背景、選択肢、採択理由を追跡可能に残す。
- 決定後の影響範囲とフォローアップを明示する。
- 結論だけでなく判断根拠を残す。

## 2. 位置づけと用語定義（必要に応じて）

<!-- specdojo:finding id=F002 severity=minor rule=vp-ux-readability 「位置づけ」において、成果物リファレンス等の上位ガイドへの参照を記述し、プロジェクト全体における役割を明確にすべきである。 -->

- 決定記録はプロジェクト運営・設計判断の証跡である。
- 課題ログ、変更要求ログと相互参照する。

## 3. ファイル命名・ID規則

- 推奨: `dec-<NNNN>-<topic>.md`
- 連番は4桁ゼロ埋めとする（例: `dec-0001-auth`）。

## 4. 推奨 Frontmatter 項目

| 項目 | 説明 | 必須 |
| ---- | ---- | ---- |

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-omissions-consistency Frontmatter 必須項目に rulebook ID の指定を追加し、成果物とルールのトレーサビリティを確保すべきである。 -->

| id | `dec-<NNNN>-<topic>` | ○ |
| type | `project` | ○ |
| status | `draft` / `ready` / `deprecated` | ○ |

## 5. 本文構成（標準テンプレ）

| 番号 | 見出し         | 必須 |
| ---- | -------------- | ---- |
| 1    | 背景           | ○    |
| 2    | 検討した選択肢 | ○    |
| 3    | 決定内容       | ○    |
| 4    | 採択理由       | ○    |
| 5    | 影響範囲       | ○    |

## 6. 記述ガイド

- 選択肢は少なくとも2案以上を記載する。

<!-- specdojo:finding id=F003 severity=minor rule=vp-ux-readability 「記述ガイド」の具体性が不足しており、「判断軸」の書き方や曖昧さを排除する記述方法など、作成者が迷わないための具体的な指針を追記すべきである。 -->

- 採択理由は判断軸とともに記載する。
- 影響範囲は仕様・実装・運用の観点で示す。

## 7. 禁止事項

- 根拠なしで結論のみを記載しない。
- 実装断片の貼り付けで説明を代替しない。
- 影響範囲未記載のまま確定しない。
