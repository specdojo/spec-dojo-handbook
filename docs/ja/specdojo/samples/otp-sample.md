---
specdojo:
  id: specdojo:otp-sample
  type: project
  status: draft
  rulebook: specdojo:otp-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 91
    graded_at: "2026-09-05T18:24:32.725Z"
    graded_by: gemma-expert-executor
    content_hash: e5ed0b2a532803f5cf818294cc146c004f82aa4eb3fc2bdc9814c3a840e2b979
    categories:
      consistency: { score: 75 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 88 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 1, minor: 5, note: 0 }
---

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=1 Frontmatter に必須項目である `title` を追加すること。 -->

# 運用切替計画（ハイパーケア含む） サンプル

## 1. 概要（hypercare）

本書はハイパーケアの対象別運用切替計画（`otp-<term>`）として、初期不具合・問合せ増への対応体制を定義する最小サンプルである。

## 2. 監視/アラート

| 監視対象 | 指標/閾値 | 通知先 | 初動ルール           | 備考    |
| -------- | --------- | ------ | -------------------- | ------- |
| API      | 5xx > 1%  | #ops   | P1は30分以内一次応答 | 5分平均 |
| バッチ   | 失敗=1回  | #ops   | 影響範囲を即共有     | 日次    |

## 3. バックアップ/リストア

<!-- specdojo:finding id=F004 severity=minor rule=vp-qe-omissions-consistency line=15 第3章「バックアップ/リストア」において、リストア時の完了基準（整合性確認等）を明記すること。 -->

- 方式: 夜間フル + 日中差分（保持30日）
- リストア責任者: 運用責任者

## 4. 権限/アカウント移行

- 追加権限: ハイパーケア担当に限定付与（期間終了で剥奪）
- 検証: 当番ロールで監視/ログ参照/障害対応が可能であること

## 5. 運用手順の変更点

| 手順       | 旧     | 新       | 変更理由    | 影響         | 参照               |
| ---------- | ------ | -------- | ----------- | ------------ | ------------------ |
| 問合せ受付 | メール | #support | 集約/可視化 | チャネル統一 | （運用手順リンク） |

## 6. 問合せ窓口/一次対応

<!-- specdojo:finding id=F005 severity=minor rule=vp-qe-omissions-consistency line=32 第6章「問合せ窓口/一次対応」において、エスカレーション条件（一次で止めない条件）を明記すること。 -->

- 受付: #support / 09:00-18:00（期間中は延長運用あり）
- 一次対応: 既知不具合案内、ログ採取依頼、再現条件ヒアリング

## 7. 障害対応フロー

- 指揮: 運用責任者（必要に応じてPO）
- 連絡: #ops → #po → 利用者告知（#comms）

## 8. 初期増員体制（期間・当番・SLA）

| 期間        | 体制（当番/時間帯）                             | SLA目安                | 判断者     | 備考                     |
| ----------- | ----------------------------------------------- | ---------------------- | ---------- | ------------------------ |
| 切替後2週間 | 8:00-20:00は常駐（Ops2 + Biz1）/ 夜間オンコール | P1:30分一次連絡、P2:2h | 運用責任者 | 延長はクローズ条件で判断 |

## 9. 旧システムの停止/参照方針

- 参照依頼は一次窓口で受付し、参照手順に従い対応する
- 参照期間終了後はアーカイブ照会手順に切替える

## 10. 移行完了後のクローズ条件

<!-- specdojo:finding id=F006 severity=minor rule=vp-qe-omissions-consistency line=54 第10章「移行完了後のクローズ条件」において、クローズ判断者および最終報告物を明記すること。 -->

- P1=0が30日、P2が収束傾向、問い合わせが基準以下
- 既知不具合一覧がクローズし、運用引継ぎが完了

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-verifiability line=56 完了条件における「基準以下」の具体的な数値や定義を明記し、判定を可能にすること。 -->

## 11. 関連ドキュメント（必須）

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-verifiability line=57 「運用引継ぎが完了」の状態を定義するチェックリストや成果物を明記し、客観的に判定可能にすること。 -->

- `otp-index`: 運用切替計画のSSOT
- `mip-index`: 移行計画
- `cop-index`: 切替当日の計画
