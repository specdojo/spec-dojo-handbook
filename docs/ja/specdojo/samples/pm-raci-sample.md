---
specdojo:
  id: specdojo:pm-raci-sample
  type: project
  status: ready
  rulebook: specdojo:pm-raci-rulebook
  based_on:
    - specdojo:pm-organization-sample
    - specdojo:pm-roles-sample
    - specdojo:pm-members-sample
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 98
    graded_at: "2026-09-05T20:49:23.750Z"
    graded_by: gemma-expert-executor
    content_hash: 54eec4689387779511a1ee3d778d86bb7c004ed37480ae7109d1b16c81ba6bd9
    categories:
      consistency: { score: 88 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 100 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 2, note: 0 }
---

# RACI: 駄菓子屋きぬや 販売管理システム

## 1. 適用方針

初期リリースと店頭試用に必要な責任境界だけを示す。小規模な兼務体制のため `PO`、`PM`、`BA`、`DEV`、`QE` を使用し、各行の `A` は1ロールとする。AI Agent は `R` または `C` を支援できるが、`A` は担わない。

| 記号 | 意味                     |
| ---- | ------------------------ |
| R    | 実作業を担当する         |
| A    | 最終承認または判断を行う |
| C    | 事前に相談・レビューする |
| I    | 結果の共有を受ける       |

## 2. 成果物別 RACI

| 成果物                               | PO  | PM  | BA  | DEV | QE  |
| ------------------------------------ | --- | --- | --- | --- | --- |
| プロジェクト概要・スコープ・成功基準 | A   | C   | R   | C   | C   |
| 管理計画・組織定義・RACI             | C   | A/R | C   | I   | C   |
| 利用者要求・操作設計                 | A   | C   | R   | C   | C   |
| 実装・データ設計                     | C   | I   | C   | A/R | C   |
| 品質計画・試験結果                   | A   | C   | C   | C   | R   |
| リリース候補                         | A   | R   | C   | R   | C   |

## 3. 判断・プロセス別 RACI

| 判断・プロセス             | PO  | PM  | BA  | DEV | QE  |
| -------------------------- | --- | --- | --- | --- | --- |
| 価値、範囲、優先順位の判断 | A   | R   | C   | C   | C   |
| 費用・参加時間上限の判断   | A   | R   | C   | C   | C   |
| 作業順序、課題・リスク管理 | C   | A/R | C   | C   | C   |
| 利用者確認                 | A   | C   | R   | C   | C   |
| 受入・品質ゲート判定       | A   | C   | C   | C   | R   |
| 変更要求・リリース判断     | A   | R   | C   | C   | C   |

## 4. Schedule・実行主体との対応

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-omissions-consistency line=40 Schedule・実行主体との対応において、RACI と Schedule owner が不一致となった場合にどちらを正本として更新するかの方針が不足している。 -->

- Schedule の `owner` は、その作業を主導する `R` の Role code と一致させる。
- 実行主体と兼務は `pm-members.yaml` で管理し、本書へ個人名や agent 名を記載しない。
- 成果物を統合・分割した場合も、各作業の `A` が不明にならないようにする。
- 同じ実行主体が `A` と `R` を兼ねる場合も、判断と作業の証跡を分ける。

## 5. 見直し条件

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-omissions-consistency line=45 見直し条件において、更新トリガーのみが記載されており、ルールブックで例示されている「確認すること（確認内容）」の記述が不足している。 -->

採用 Role code、成果物区分、Schedule の owner、主要判断、兼務の継続可能性が変わった場合に見直す。
