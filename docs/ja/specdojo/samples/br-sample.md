---
specdojo:
  id: specdojo:br-sample
  type: rule
  title: 在庫不足判定
  status: draft
  rulebook: specdojo:br-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 61
    graded_at: "2026-09-04T22:01:05.022Z"
    graded_by: gemma-expert-executor
    content_hash: 79b7220b71b978bfadd7784a02af1af13ac4db92fc5965fe1c74de1757e4cabe
    categories:
      consistency: { score: 38 }
      usability: { score: 75 }
      architecture: { score: 88 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 3, score: 75 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 1, major: 4, minor: 3, note: 0 }
---

<!-- markdownlint-disable MD025 -->

# 在庫不足判定

<!-- markdownlint-enable MD025 -->

## 1. 概要

販売可能な在庫が発注点を下回っているかを判定する。

## 2. 入力

- 在庫: 在庫数と予約数を、有効在庫の算出に使用する。
- 商品: 発注点を、不足判定のしきい値として使用する。

## 3. ルール（判定/計算）

1. 有効在庫を `在庫数 − 予約数` で算出する。
2. 有効在庫が発注点を下回る場合は在庫不足と判定する。

## 4. 出力

- 不足フラグ: 在庫不足の場合は `true`、それ以外は `false`。

## 5. 例外 / 異常系

- 在庫数、予約数、発注点のいずれかが未設定の場合は判定せず、入力不備として通知する。
- 在庫数、予約数、発注点のいずれかが負数の場合は判定せず、値の矛盾として通知する。

## 6. メモ / 将来課題

- 将来、季節要因に応じて発注点を動的に変更する。
