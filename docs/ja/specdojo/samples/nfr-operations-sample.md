---
specdojo:
  id: specdojo:nfr-operations-sample
  type: project
  status: draft
  rulebook: specdojo:nfr-operations-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 62
    graded_at: "2026-09-05T11:05:06.216Z"
    graded_by: gemma-expert-executor
    content_hash: b9e313a2676d995946c32528ec09d654f83603d59598733bd2b86f1fafe30eec
    categories:
      consistency: { score: 50 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 38 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 3, score: 75 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 4, minor: 2, note: 0 }
---

# [非機能要件 / 運用](../rulebooks/nfr-operations-rulebook.md) サンプル

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=2 Frontmatter に必須項目である `title` が欠落している。 -->

<!-- specdojo:finding id=F001 severity=minor rule=vp-arc-cross-document-consistency line=4 Frontmatter `type: project` は不適切であり、NFR 定義書として妥当な `architecture` 等であるべき。 -->

## 1. 目的と適用範囲

<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=5 ルールブック第5節で定義された必須の見出し構成（概要、適用範囲・体制前提、運用要件一覧、測定・検証方法、関連ドキュメント導線）に一切準拠しておらず、サンプルとして不適切である。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=5 参照ルールブックの構成を無視した記述となっており、初見の読者が正しい運用要件書の書き方を理解できず、サンプルとしての目的を果たしていない。 -->
<!-- specdojo:finding id=F006 severity=minor rule=vp-ux-language-consistency line=5 見出し名称（例：「目的と適用範囲」）が、ルールブックで指定された標準名称（例：「概要（対象・目的）」）と乖離しており、統一されていない。 -->

本書は、監視・手順・継続運用を定義するための最小サンプルである。

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/nfr-operations-rulebook.md`

## 3. 記述内容

- 主な内容: アラート検知率、復旧達成率、運用手順充実度
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

| 項目         | 値                                                           | 備考                                 |
| ------------ | ------------------------------------------------------------ | ------------------------------------ |
| ドキュメント | [非機能要件 / 運用](../rulebooks/nfr-operations-rulebook.md) | 最小サンプル                         |
| 目的         | 監視・手順・継続運用を定義する                               | specdojo:deliverables-reference 準拠 |
| 主な内容     | アラート検知率、復旧達成率、運用手順充実度                   | 要点のみ記載                         |

## 5. 未解決事項

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-verifiability line=32 「アラート検知率」などの指標が挙げられているが、pass/fail を判定できる具体的な基準値（例: 10分以内）が記述されておらず、検証可能性が示せていない。 -->

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
