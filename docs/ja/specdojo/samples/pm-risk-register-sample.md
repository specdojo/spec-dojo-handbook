---
specdojo:
  id: specdojo:pm-risk-register-sample
  type: project
  status: draft
  rulebook: specdojo:pm-risk-register-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 73
    graded_at: "2026-09-05T21:08:23.208Z"
    graded_by: gemma-expert-executor
    content_hash: 8627560c0098555c71f9b9e94b38a689aea303a4db01de50db5f9747dca5594e
    categories:
      consistency: { score: 75 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 38 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 1, major: 1, minor: 4, note: 0 }
---

<!-- specdojo:finding id=F006 severity=blocker rule=vp-qe-kata-conformance line=1 本書は rulebook に基づき手動作成の形式をとっているが、対応するテンプレート（specdojo:pm-risk-register-template）では自動生成ビューとして定義されており、成果物の種別と責務が根本的に矛盾している。 -->

# リスク登録簿 サンプル

## 1. 概要

本書は、駄菓子屋の販売管理システム構築プロジェクトの潜在リスクと対応策を管理する最小サンプルである。

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=6 概要に「見直し頻度」と「責任者」の記述が不足している。 -->

## 2. リスク登録簿一覧

| リスクID | 内容             | 発生確率 | 影響度 | 優先度 | 対応策           | 担当       | ステータス |
| -------- | ---------------- | -------- | ------ | ------ | ---------------- | ---------- | ---------- |
| RK-001   | 繁忙期の性能劣化 | 中       | 高     | 高     | 負荷試験追加     | 開発リード | 対応中     |
| RK-002   | 業務側確認の遅延 | 高       | 中     | 高     | 合意期限の前倒し | PM         | 監視中     |

## 3. 評価基準

<!-- specdojo:finding id=F004 severity=minor rule=vp-qe-omissions-consistency line=17 評価基準に「再評価条件」の記述が不足している。 -->

- 発生確率: 低/中/高
- 影響度: 低/中/高
- 優先度: 発生確率と影響度の積で判定

## 4. 対応計画

| リスクID | 対応方針 | 対応策           | 期限       | 完了条件 |
| -------- | -------- | ---------------- | ---------- | -------- |
| RK-001   | 低減     | 負荷試験追加     | 2026-04-15 | 閾値以内 |
| RK-002   | 回避     | 合意期限の前倒し | 2026-04-10 | 合意完了 |

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-verifiability line=27 「閾値以内」という表現は具体的数値や判定基準が不明確であり、客観的な検証可能性が低い。 -->

## 5. モニタリング

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-verifiability line=28 「合意完了」という表現は、誰が誰に、何を合意すれば完了とするのかが不明確である。 -->

- 監視周期: 週次
- 更新トリガー: 新規兆候発生、期限超過、影響度変更

## 6. 関連ドキュメント

<!-- specdojo:finding id=F005 severity=minor rule=vp-qe-omissions-consistency line=33 モニタリングに「状態更新ルール」の記述が不足している。 -->

- `pm-issue-log`
- `pm-change-request-log`
