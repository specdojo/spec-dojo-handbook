---
specdojo:
  id: specdojo:opd-incident-management-sample
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
    graded_at: "2026-09-05T12:53:23.314Z"
    graded_by: gemma-expert-executor
    content_hash: c6845f1b0f0c3f276a0382b5c98983a95a4710c795953d70d01a0a16d7757f9f
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

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-omissions-consistency line=1 Frontmatter の必須項目 `title` が不足している。 -->

# 運用方針・設計: 障害対応 サンプル

- 参照: `../rulebooks/opd-rulebook.md`

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=5 `opd-rulebook` の「5. 本文構成（標準テンプレ）」で定義されている必須見出し（2, 3, 4, 5, 7, 8, 9, 10, 11）が不足している。 -->
<!-- specdojo:finding id=F004 severity=minor rule=vp-ux-readability line=5 必須構成を省略しているため、`opd-＜term＞` 文書を正しく作成するためのサンプルとして不十分である。 -->

## 1. 概要（incident-management）

障害対応の優先度、停止判断、周知方針を `opd-index` の差分として具体化する。

## 2. 障害対応方針（優先度・停止判断・周知）

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance line=13 見出し番号が `opd-rulebook` の定義する順序（## 6. 障害対応方針 / ## 12. 関連ドキュメント導線）と不一致である。 -->

| 優先度 | 例                    | 目標（一次応答/復旧） | 停止判断                      | 周知                          |
| ------ | --------------------- | --------------------- | ----------------------------- | ----------------------------- |
| P1     | 全ユーザ影響/決済不可 | 30分/4h               | Ops Leadが即時→PO承認で停止可 | 全ユーザ（ステータス/メール） |
| P2     | 一部機能停止          | 2h/1d                 | Ops Lead判断、POへ共有        | 影響範囲のみ                  |
| P3     | 軽微/回避あり         | 1d/次リリース         | 停止しない                    | 原則なし                      |

## 3. 関連ドキュメント導線（`opr` 等）

| 種別 | ドキュメントID | 目的                         | 備考 |
| ---- | -------------- | ---------------------------- | ---- |
| 手順 | opr-incident   | 障害切り分け/復旧/報告の手順 | 必須 |
