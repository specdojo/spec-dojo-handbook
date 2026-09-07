---
specdojo:
  id: specdojo:nfr-maintainability-sample
  type: project
  status: draft
  rulebook: specdojo:nfr-maintainability-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 62
    graded_at: "2026-09-05T10:49:14.991Z"
    graded_by: gemma-expert-executor
    content_hash: 0d65042792bb1c2247b64c90a7f5b7a5df09860bf704799f99c90498956dae2b
    categories:
      consistency: { score: 63 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 25 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 1, major: 4, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance line=1 Frontmatter に必須項目である `title` が記述されていない。 -->

# [非機能要件 / 保守性](../rulebooks/nfr-maintainability-rulebook.md) サンプル

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=3 rulebook で必須と定義されている「保守性要件一覧」「測定・検証方法」「関連ドキュメント導線」の各章が欠落している。 -->
<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-kata-conformance line=3 rulebook で定義された標準テンプレの見出し構成および順序を完全に無視しており、成果物の型に従っていない。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=3 対応する rulebook の必須構造や制約を反映しておらず、正解例としての役割を果たしていないため、利用者に誤解を与える。 -->

## 1. 目的と適用範囲

本書は、変更容易性と復旧容易性を定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/nfr-maintainability-rulebook.md`

## 3. 記述内容

- 主な内容: 平均修復時間(MTTR)、変更リードタイム、ログ粒度
- 必須観点: 対象、条件、判定基準、責任者

<!-- specdojo:finding id=F001 severity=major rule=vp-qe-verifiability line=18 要件の判定基準に定量的な閾値が記載されておらず、rulebook の禁止事項に抵触している。 -->

## 4. 最小記述例

| 項目         | 値                                                                  | 備考                                 |
| ------------ | ------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | [非機能要件 / 保守性](../rulebooks/nfr-maintainability-rulebook.md) | 最小サンプル                         |
| 目的         | 変更容易性と復旧容易性を定義する                                    | specdojo:deliverables-reference 準拠 |
| 主な内容     | 平均修復時間(MTTR)、変更リードタイム、ログ粒度                      | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
