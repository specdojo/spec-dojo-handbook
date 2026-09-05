---
specdojo:
  id: specdojo:opd-index-sample
  type: operations
  status: draft
  rulebook: specdojo:opd-rulebook
  based_on: []
  supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 73
    graded_at: "2026-09-05T13:12:05.422Z"
    graded_by: gemma-expert-executor
    content_hash: c85556fc7e32aaf6a672dac24da21b277c267e27a7e1ee94f67afa67635a9004
    categories:
      consistency: { score: 50 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 63 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 3, score: 75 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 6, minor: 2, note: 0 }
---

# 運用方針・設計: 全体 サンプル

- 参照: `../rulebooks/opd-rulebook.md`

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=5 必須章（2, 5, 6, 7, 8, 9, 10, 11）が大幅に欠落している。 -->
<!-- specdojo:finding id=F007 severity=major rule=vp-qe-kata-conformance line=5 ルールブックで定義された必須構成に従っておらず、サンプルとしての整合性が欠如している。 -->
<!-- specdojo:finding id=F008 severity=major rule=vp-ux-readability line=5 必須構成の大幅な省略により、運用方針の SSOT としての十分な情報を備えておらず、可読性と完結性に欠ける。 -->

## 1. 概要（index）

<!-- specdojo:finding id=F001 severity=minor rule=vp-arc-cross-document-consistency line=6 Frontmatter の rulebook 参照 ID が specdojo:opd-index-rulebook と不整合である。 -->
<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-omissions-consistency line=6 Frontmatter の必須項目 title が不足している。 -->

恒常運用の品質基準と統制方針を定義し、運用判断の基準を一元化する（本書がSSOT）。

<!-- specdojo:finding id=F004 severity=major rule=vp-qe-omissions-consistency line=9 章番号が不整合であり、SLO・SLA・KPI は ## 3 であるべきだが ## 2 となっている。 -->

## 2. SLO・SLA・KPI

| 指標        | 目標値       | 測定期間 | 測定方法                 | 証跡         | 判定者         |
| ----------- | ------------ | -------- | ------------------------ | ------------ | -------------- |
| 可用性      | 99.9%以上    | 月次     | 監視SaaSの稼働率集計     | 監視レポート | 運用責任者     |
| API応答時間 | p95 < 300ms  | 週次     | APMのp95集計             | APMレポート  | 運用責任者     |
| 一次応答    | P1: 30分以内 | 月次     | チケット初回応答時刻集計 | 問合せ台帳   | サポート責任者 |

<!-- specdojo:finding id=F005 severity=major rule=vp-qe-omissions-consistency line=17 章番号が不整合であり、体制・責任分界 は ## 4 であるべきだが ## 3 となっている。 -->

## 3. 体制・責任分界（RACI・当番・エスカレーション）

| 対象          | R（実行） | A（責任） | C（相談） | I（共有） | 備考           |
| ------------- | --------- | --------- | --------- | --------- | -------------- |
| 監視/一次対応 | Ops       | Ops Lead  | Dev Lead  | PO        | P1は即時連絡   |
| 障害復旧      | Ops       | Ops Lead  | Dev       | Biz/PO    | 復旧後に報告   |
| 仕様判断      | Biz       | PO        | Ops/Dev   | -         | 停止判断を含む |

<!-- specdojo:finding id=F006 severity=major rule=vp-qe-omissions-consistency line=25 章番号が不整合であり、関連ドキュメント導線 は ## 12 であるべきだが ## 4 となっている。 -->

## 4. 関連ドキュメント導線（`opr` 等）

| 種別 | ドキュメントID | 目的                     | 備考       |
| ---- | -------------- | ------------------------ | ---------- |
| 手順 | opr-index      | 運用手順の全体構成       | 必須       |
| 手順 | opr-incident   | 障害一次対応/復旧手順    | 該当時     |
| 移行 | otp-index      | ハイパーケア体制（参考） | 必要時のみ |
