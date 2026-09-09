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
    verdict: pass
    score: 100
    graded_at: "2026-09-08T23:53:57.687Z"
    graded_by: codex-expert-executor
    content_hash: d61b018250e0c73e636e4c69812fe9ade85eff9e5ee3c502f11061e26bf6270a
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
