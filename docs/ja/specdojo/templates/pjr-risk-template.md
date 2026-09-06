---
specdojo:
  id: specdojo:pjr-risk-template
  type: template
  status: draft
  frontmatter_template:
    specdojo:
      id: _PJR_DOCUMENT_ID_
      type: project
      status: draft
      rulebook: specdojo:pjr-rulebook
      part_of:
        - _PROJECT_ID_:pjr-index
      item_type: risk
      item_status: open
      priority: medium
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 100
    graded_at: "2026-09-06T08:57:57.369Z"
    graded_by: codex-expert-executor
    content_hash: 8c0efbae1900d36cd1d4c2f20b2696e91e85abecfba01af27d3b95f5e55d90a4
    categories:
      consistency: { score: 100 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 100 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 4, score: 100 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 0, note: 0 }
---

# _PJR-XXXX_ _RISK_TITLE_

## 1. リスク内容

_TODO_: 将来発生し得る不確実な事象と、その原因を記載する。

## 2. 影響評価

| 項目     | 評価                |
| -------- | ------------------- |
| 発生確率 | high / medium / low |
| 影響度   | high / medium / low |
| 影響範囲 | _TODO_              |
| 兆候     | _TODO_              |

## 3. 対応方針

| 項目               | 内容                      |
| ------------------ | ------------------------- |
| 方針               | 回避 / 低減 / 転嫁 / 受容 |
| 対応策             | _TODO_                    |
| トリガー           | _TODO_                    |
| エスカレーション先 | _TODO_                    |

## 4. モニタリング

_TODO_: 監視周期、確認方法、状態更新の条件を記載する。

## 5. 関連ドキュメント

- _TODO_: 根拠・影響先・追跡先を `[[doc-id]]` 形式で記載する。
