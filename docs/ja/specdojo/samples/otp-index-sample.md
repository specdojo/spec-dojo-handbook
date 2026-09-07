---
specdojo:
  id: specdojo:otp-index-sample
  type: project
  status: draft
  rulebook: specdojo:otp-index-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 86
    graded_at: "2026-09-05T18:04:46.586Z"
    graded_by: gemma-expert-executor
    content_hash: 8e4dcf40df4f524427a088e17106a513a99cd03f59a2f3fd4e0be7aa6573b4df
    categories:
      consistency: { score: 75 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 2, minor: 4, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-omissions-consistency line=1 Frontmatter に必須項目である `title` が定義されていない。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-qe-kata-conformance line=1 Frontmatter の `type` が `project` となっており、ルールブックで指定された `migration` と矛盾している。 -->

# 運用切替計画（ハイパーケア含む） サンプル

## 1. 概要（index）

本書は運用切替計画の入口（`otp-index`）として、共通運用方針と対象別計画への導線を定義する最小サンプルである。

## 2. 監視/アラート

| 監視対象 | 指標/閾値 | 通知先 | 初動ルール           | 備考    |
| -------- | --------- | ------ | -------------------- | ------- |
| API      | 5xx > 1%  | #ops   | P1は30分以内一次応答 | 5分平均 |

## 3. バックアップ/リストア

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-omissions-consistency line=15 「3. バックアップ/リストア」において、記述ガイド 6.3 で求められている「保管先」の明記が不足している。 -->

- バックアップ: 夜間フル、日中差分（保持30日）
- リストア責任者: 運用責任者

## 4. 権限/アカウント移行

<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-omissions-consistency line=20 「4. 権限/アカウント移行」において、記述ガイド 6.4 で求められている「旧/新の拳限差分」の明記が不足している。 -->

- 移行タイミング: 切替前日 20:00
- 検証: 主要ロールでログイン/代表操作を確認

## 5. 運用手順の変更点

| 手順     | 旧   | 新       | 変更理由 | 影響         | 参照             |
| -------- | ---- | -------- | -------- | ------------ | ---------------- |
| 障害連絡 | 電話 | チャット | 初動短縮 | 連絡経路変更 | （手順書リンク） |

## 6. 問合せ窓口/一次対応

<!-- specdojo:finding id=F004 severity=minor rule=vp-qe-omissions-consistency line=31 「6. 問合せ窓口/一次対応」において、記述ガイド 6.6 で求められている「エスカレーション条件」の明記が不足している。 -->

- 受付: #support（09:00-18:00）
- 優先度: P1/P2/P3

## 7. 障害対応フロー

- エスカレーション: 一次対応 → 運用責任者 → PO

## 8. 初期増員体制（期間・当番・SLA）

| 期間        | 体制（当番/時間帯）                               | SLA目安             | 判断者     | 備考                         |
| ----------- | ------------------------------------------------- | ------------------- | ---------- | ---------------------------- |
| 切替後2週間 | Ops 2名 + Biz 1名（8:00-20:00）/ 夜間はオンコール | P1:30分以内一次連絡 | 運用責任者 | 期間延長はクローズ条件で判断 |

## 9. 旧システムの停止/参照方針

- 停止: 切替後7日でログイン停止
- 参照: 90日間は参照専用、その後アーカイブ

## 10. 移行完了後のクローズ条件

<!-- specdojo:finding id=F005 severity=minor rule=vp-qe-omissions-consistency line=51 「10. 移行完了後のクローズ条件」において、記述ガイド 6.10 で求められている「クローズ判断者」および「最終報告物」の明記が不足している。 -->

- 重大障害0件が30日継続
- 問合せが日次平均5件以下

## 11. 関連ドキュメント（必須）

- `otp-hypercare`: ハイパーケア詳細
- `cop-index`: 切替当日の実行手順
- `mip-index`: 移行計画
