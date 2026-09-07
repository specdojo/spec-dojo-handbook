---
specdojo:
  id: specdojo:ntp-rulebook
  type: rulebook
  status: draft
  sample: specdojo:ntp-sample
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 69
    graded_at: "2026-09-03T00:10:07.747Z"
    graded_by: gemma-expert-executor
    content_hash: af67163f85178a759e517d20bc2b2c4408a9535cf50e72b3d289227d54508d77
    categories:
      consistency: { score: 75 }
      usability: { score: 67 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 2, score: 50 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 5, minor: 0, note: 0 }
---

# 移行テスト計画（リハーサル計画） 作成ルール

Migration Test Plan Documentation Rules

本ドキュメントは、`移行テスト計画（リハーサル計画）` を一貫した粒度で作成するためのルールを定義する。

## 1. 全体方針

- 目的: 移行リハーサルの実施計画を定義し、切替前に妥当性を検証する
- 主な内容: テスト範囲、シナリオ、環境、判定基準、是正計画
- 曖昧表現を避け、判定可能な記述にする。

## 2. 位置づけと用語定義（必要に応じて）

- 上位方針・関連成果物との責務境界を明確化する。
- 必要に応じて用語を定義し、命名ゆれを防ぐ。

## 3. ファイル命名・ID規則

- 推奨ファイル名: `ntp`
- ドキュメントID: `ntp-<term>` または用途に応じた識別子

## 4. 推奨 Frontmatter 項目

| 項目     | 値                                                | 必須 |
| -------- | ------------------------------------------------- | ---- |
| id       | 一意なID                                          | ○    |
| type     | project / spec / test / architecture / operations | ○    |
| status   | draft / ready / deprecated                        | ○    |
| rulebook | `ntp-rulebook`                                    | 任意 |

## 5. 本文構成（標準テンプレ）

| 章                | 必須 | 内容                   |
| ----------------- | ---- | ---------------------- |
| 1. 目的と適用範囲 | ○    | 対象、目的、適用境界   |
| 2. 入力情報       | ○    | 前提、参照元、制約     |
| 3. 記述内容       | ○    | 主要項目、構成、記述順 |
| 4. 検証観点       | ○    | 完了条件、確認観点     |

| 5. 未解決事項 | 任意 | 課題、決定期限、担当 |

## 6. 記述ガイド

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability 「判定可能な記述にする」という方針はあるが、移行テスト計画における具体的な判定基準や成功条件の例示がなく、検証可能性が担保されていない。 -->

- 事実と判断を分離し、根拠を併記する。
- 表は列見出しを固定し、欠損値の扱いを明示する。
- 章参照は章番号ではなく章タイトルで記述する。

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-conciseness 「責務境界を明確化する」等の記述が、具体的ルールではなくrulebook作成者向けの指示（プレースホルダー）となっている。 -->

## 7. 禁止事項

- 実装依存の詳細を記載しない。
- 判定不能な曖昧語を使わない。
- 参照元不明の値を断定しない。

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency 標準テンプレで定義されている「4. 検証観点」が、対応するサンプル (ntp-sample.md) では「4. 最小記述例」となっており整合していない。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance 推奨される本文構成の「4. 検証観点」が、サンプル (ntp-sample.md) に適用されておらず、相互参照と適用方法に矛盾がある。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability 本文構成の定義に留まり、「移行テスト計画」として何を記述すべきかという具体的なガイドラインが欠落しており、初見の読者が作成内容を判断できない。 -->
