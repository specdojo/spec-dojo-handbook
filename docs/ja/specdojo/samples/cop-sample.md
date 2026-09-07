---
specdojo:
  id: specdojo:cop-sample
  type: project
  status: draft
  rulebook: specdojo:cop-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 48
    graded_at: "2026-09-05T01:00:09.969Z"
    graded_by: gemma-expert-executor
    content_hash: ce47cb9ee60662c8d82721fda36515704bffccfddbb649fde75ed8001452c520
    categories:
      consistency: { score: 25 }
      usability: { score: 58 }
      architecture: { score: 100 }
      quality: { score: 25 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 2, score: 50 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 2, major: 4, minor: 0, note: 0 }
---

# カットオーバー計画（本番切替手順） サンプル

## 1. 目的と適用範囲

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=4 Frontmatter の `type` が `project` となっており、ルールブックで定義されている `migration` と矛盾している。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-ux-language-consistency line=4 Frontmatter の `type` 定義が `project` となっており、ルールブックの規定（`migration`）と不整合である。 -->

本書は、対象別カットオーバー計画（`cop-<term>`）として、当日作業の詳細手順を定義する最小サンプルである。

## 2. 入力情報

<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-omissions-consistency line=9 ルールブックで必須とされている本文構成（見出し1〜10）がすべて欠落しており、成果物としての最低限の構成を満たしていない。 -->
<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-kata-conformance line=9 サンプルとしての責務（完成例の提示）を果たしておらず、ルールブックで定義された構造や記述ガイドを完全に無視した内容となっている。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=9 初見の読者が本サンプルを参考にしても、ルールブックが規定する切替計画の具体的な記述方法（タイムラインや判定ポイント等）を理解することができず、ガイドとして機能していない。 -->

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/cop-rulebook.md`

## 3. 記述内容

- 主な内容: 対象固有の切替手順、判定ポイント、ロールバック手順、責務分担
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                           | 備考                                 |
| ------------ | ------------------------------------------------------------ | ------------------------------------ |
| ドキュメント | カットオーバー計画（本番切替手順）                           | `cop-<term>` の最小サンプル          |
| 目的         | 当日作業の対象別詳細手順を定義する                           | specdojo:deliverables-reference 準拠 |
| 主な内容     | 対象固有の切替手順、判定ポイント、ロールバック手順、責務分担 | 要点のみ記載                         |

## 5. 未解決事項

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=28 最小記述例の「値」が抽象的な説明に留まっており、ルールブックが求める「分単位の時刻」や「具体的判定基準」などの検証可能な表現を提示できていない。 -->

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
