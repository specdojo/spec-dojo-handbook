---
specdojo:
  id: specdojo:opd-access-control-sample
  type: operations
  status: draft
  rulebook: specdojo:opd-rulebook
  based_on: []
  supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 82
    graded_at: "2026-09-05T12:36:10.176Z"
    graded_by: gemma-expert-executor
    content_hash: abcf98045ce49fbe133cd234795a56f1f1134a16e810c033537a42cc6ae9e771
    categories:
      consistency: { score: 63 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 2, minor: 2, note: 0 }
---

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-omissions-consistency line=1 Frontmatter の必須項目 `title` が不足している。 -->

# 運用方針・設計: 権限・アカウント サンプル

- 参照: `../rulebooks/opd-rulebook.md`

## 1. 概要（access-control）

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-omissions-consistency line=7 `opd-rulebook` の「5. 本文構成（標準テンプレ）」で定義されている必須見出し（2, 3, 4, 5, 6, 7, 8, 10, 11）が不足している。 -->
<!-- specdojo:finding id=F004 severity=minor rule=vp-ux-readability line=7 必須構成を省略しているため、`opd-＜term＞` 文書を正しく作成するためのサンプルとして不十分である。 -->

権限付与/剥奪、棚卸し、監査ログ、緊急権限を `opd-index` の差分として定義する。

## 2. 権限・アカウント運用（棚卸し・監査ログ）

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance line=12 見出し番号が `opd-rulebook` の定義する順序（## 9. 権限・アカウント運用... ## 12. 関連ドキュメント導線...）と不一致である。 -->

- 付与/剥奪はチケット起票を必須とし、承認者はOps Leadとする
- 棚卸しは月次で実施し、結果は監査ログ保管領域に保存する
- ブレークグラスは2名承認 + 24時間で自動失効（原則）

## 3. 関連ドキュメント導線（`opr` 等）

| 種別 | ドキュメントID     | 目的                           | 備考 |
| ---- | ------------------ | ------------------------------ | ---- |
| 手順 | opr-access-control | アカウント付与/剥奪/棚卸し手順 | 必須 |
