---
specdojo:
  id: specdojo:dec-sample
  type: project
  status: draft
  rulebook: specdojo:dec-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 89
    graded_at: "2026-09-05T02:24:31.407Z"
    graded_by: codex-expert-executor
    content_hash: 8e2a4e8344489106a6f277f93beea350da84dca231ed07b879028b47b60a6608
    categories:
      consistency: { score: 88 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 3, score: 75 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 3, note: 0 }
---

# [決定記録](../rulebooks/dec-rulebook.md) サンプル

## 1. 背景

- 管理画面の認証方式として、セッション認証を継続するかトークン認証へ切り替えるかを判断する必要がある。
- 既存運用では監査ログ要件が強く、失効制御と運用負荷の両立が課題になっている。

## 2. 検討した選択肢

| 選択肢 | 概要                                          | 利点                     | 懸念                     |
| ------ | --------------------------------------------- | ------------------------ | ------------------------ |
| A      | 既存セッション認証を継続                      | 変更コストが低い         | 外部連携時の拡張性が低い |
| B      | JWT ベースへ全面移行                          | 拡張性が高い             | 失効制御の運用が重い     |
| C      | 管理画面はセッション、外部公開 API はトークン | 境界に応じた最適化が可能 | 方式が 2 系統になる      |

## 3. 決定内容

- 選択肢 C を採択する。
- 管理画面は既存セッション認証を維持し、外部公開 API のみトークン認証を採用する。

## 4. 採択理由

- 品質: 管理画面の監査性を維持しつつ、外部連携の拡張性を確保できる。
- コスト: 既存機能への影響を最小化し、段階的移行が可能である。
- 運用性: 認証失効制御の運用範囲を API 側に限定できる。

## 5. 影響範囲

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-verifiability line=28 影響範囲の3項目に担当者・期限・完了条件または確認方法がなく、フォローアップの完了を pass / fail 判定できないため追記する必要がある。 -->
<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-omissions-consistency line=28 rulebook の全体方針が求める「決定後のフォローアップ」が独立項目または影響範囲内に示されていないため、実施事項・担当・状態を追記する必要がある。 -->
<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-kata-conformance line=28 完成例でありながら決定後のフォローアップを記載しておらず、rulebook の全体方針を対象成果物へ適用する方法を sample が実演できていないため追記する必要がある。 -->

- 仕様: 外部 IF 仕様書にトークン認証要件を追加する。
- 実装: API ゲートウェイに認証ミドルウェアを追加する。
- 運用: トークン失効手順と監査ログ確認手順を運用手順書へ追記する。
