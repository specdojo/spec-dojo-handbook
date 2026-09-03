---
specdojo:
  id: specdojo:sf-index-rulebook
  type: rulebook
  status: draft
  recipe: undecided
  sample: specdojo:sf-index-sample
  template: undecided
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 70
    graded_at: "2026-09-03T09:39:09.863Z"
    graded_by: gemma-expert-executor
    content_hash: 48b58ea4b0901b03747b56f289099a99179518496609f2ed2478b76d780c6a20
    categories:
      consistency: { score: 38 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 63 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 5, minor: 1, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency H1に成果物名の代わりに別ドキュメントへのリンクが記述されており、成果物の識別を混乱させる。 -->

# [システム化機能一覧 / 全体構成](../rulebooks/sf-rulebook.md) 作成ルール

System Functions Index Documentation Rules

本ドキュメントは、`[システム化機能一覧 / 全体構成](../rulebooks/sf-rulebook.md)` を一貫した粒度で作成するためのルールを定義する。

<!-- specdojo:finding id=F006 severity=major rule=vp-ux-readability 成果物の位置づけや責務境界が具体化されていないため、作成者が判断に迷う。 -->

## 1. 全体方針

- 目的: システムで実現する機能の全体構成と一覧を定義する
- 主な内容: 機能ID、機能名、概要、関連プロセス、関連仕様ID など

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-verifiability 判定可能な記述を求める指示はあるが, 具体的にどのような状態が「判定可能」であるかの基準が不足している。 -->

- 曖昧表現を避け、判定可能な記述にする。

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency 「2. 位置づけと用語定義」がテンプレートの指示文のままであり、実際の定義が記載されていない。 -->

## 2. 位置づけと用語定義（必要に応じて）

- 上位方針・関連成果物との責務境界を明確化する。
- 必要に応じて用語を定義し、命名ゆれを防ぐ。

## 3. ファイル命名・ID規則

- 推奨ファイル名: `sf-index`
- ドキュメントID: `sf-index-<term>` または用途に応じた識別子

## 4. 推奨 Frontmatter 項目

| 項目     | 値                                                | 必須 |
| -------- | ------------------------------------------------- | ---- |
| id       | 一意なID                                          | ○    |
| type     | project / spec / test / architecture / operations | ○    |
| status   | draft / ready / deprecated                        | ○    |
| rulebook | `sf-index-rulebook`                               | 任意 |

## 5. 本文構成（標準テンプレ）

<!-- specdojo:finding id=F004 severity=major rule=vp-qe-omissions-consistency 第5節で定義した必須章（目的、入力情報、記述内容、検証観点）に対する具体的な記述ガイドが不足している。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-qe-kata-conformance 本文構成の定義（必須章）と、対応するサンプルの構成が矛盾しており、適用方法が不透明である。 -->

| 章                | 必須 | 内容                   |
| ----------------- | ---- | ---------------------- |
| 1. 目的と適用範囲 | ○    | 対象、目的、適用境界   |
| 2. 入力情報       | ○    | 前提、参照元、制約     |
| 3. 記述内容       | ○    | 主要項目、構成、記述順 |
| 4. 検証観点       | ○    | 完了条件、確認観点     |
| 5. 未解決事項     | 任意 | 課題、決定期限、担当   |

## 6. 記述ガイド

- 事実と判断を分離し、根拠を併記する。
- 表は列見出しを固定し、欠損値の扱いを明示する。
- 章参照は章番号ではなく章タイトルで記述する。

## 7. 禁止事項

- 実装依存の詳細を記載しない。
- 判定不能な曖昧語を使わない。
- 参照元不明の値を断定しない。
