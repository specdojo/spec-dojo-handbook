---
specdojo:
  id: specdojo:mm-sample
  type: project
  status: draft
  rulebook: specdojo:mm-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 93
    graded_at: "2026-09-05T09:36:57.162Z"
    graded_by: gemma-expert-executor
    content_hash: 2465a3c8e7f9a0b83a3588a4da2e42f8827a678be4dddc00b7ca95ef8b305e2a
    categories:
      consistency: { score: 88 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 88 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 3, score: 75 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 2, note: 0 }
---

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-omissions-consistency line=1 Frontmatterのidがルールブックで定義された命名規則(mm-＜yyyy-mm-dd＞-＜nn＞)に準拠していない。 -->
<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-kata-conformance line=1 サンプルのidがルールブックの定義する形式に準拠しておらず、正解例としての役割を十分に果たしていない。 -->

# 議事録 サンプル

## 1. 会議情報

- 会議名: 在庫補充フロー改善 定例
- 日時: 2026-04-19 10:00-10:45
- 参加者: 店主、業務担当、開発担当

## 2. 議題

- 週次の欠品状況レビュー
- 補充タイミング見直し案の確認
- 次週リリース対象の最終確認

## 3. 決定事項

| No. | 決定事項                                      | 決定者   |
| --- | --------------------------------------------- | -------- |
| 1   | 補充判定のしきい値を「在庫3以下」に統一する。 | 店主     |
| 2   | 欠品速報の確認時間を毎日16:00に固定する。     | 業務担当 |

## 4. アクションアイテム

| No. | 内容                             | 担当者   | 期限       |
| --- | -------------------------------- | -------- | ---------- |
| 1   | 補充判定条件の更新案を作成する。 | 開発担当 | 2026-04-22 |
| 2   | 欠品速報運用ルールを周知する。   | 業務担当 | 2026-04-21 |
