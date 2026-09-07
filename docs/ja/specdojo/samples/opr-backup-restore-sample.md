---
specdojo:
  id: specdojo:opr-backup-restore-sample
  type: operations
  status: draft
  rulebook: specdojo:opd-rulebook
  based_on:
    - opd-index
  supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 57
    graded_at: "2026-09-05T14:44:24.554Z"
    graded_by: gemma-expert-executor
    content_hash: 372f227fb13439d9b0c16e5728babc26c53fa526ca884e694d0d833de881377c
    categories:
      consistency: { score: 25 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 38 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 0, score: 0 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 3, major: 2, minor: 1, note: 0 }
---

<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-omissions-consistency line=1 Frontmatter の必須項目 `title` が不足している。 -->

# 運用手順: バックアップ確認・リストア サンプル

- 参照: `../rulebooks/opr-rulebook.md`

<!-- specdojo:finding id=F004 severity=blocker rule=vp-qe-omissions-consistency line=5 `opr-rulebook` で定義されている必須章（概要、適用範囲・前提、定期点検、障害対応、アラート対応、バッチ再実行、運用変更、アカウント付与・剥奪、問い合わせ一次対応、証跡、関連文書導線）がすべて欠落している。 -->
<!-- specdojo:finding id=F005 severity=blocker rule=vp-qe-kata-conformance line=5 見出し番号が `## 1` となっているが、ルール規定およびテンプレートの順序に従い `## 6` とすべきである。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-ux-readability line=5 必須構成を大幅に省略しているため、`opr-＜term＞` 文書を正しく作成するためのサンプルとして不十分である。 -->

## 1. バックアップ確認・リストア手順（演習含む）

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=6 Frontmatter の `rulebook` が `specdojo:opd-rulebook` となっており、手順書であるため `specdojo:opr-rulebook` とすべきである。 -->

- 確認（毎日）:
  - 最新バックアップの生成時刻とサイズを確認
  - 失敗があればチケット起票（P2）
- 演習（四半期）:
  - staging にリストア → 主要テーブルの件数/参照整合を確認
  - 所要時間を記録し、RTO/RPO達成可否を判定する

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-verifiability line=14 「主要テーブルの件数/参照整合を確認」などの判定基準が具体的に記述されておらず、検証不能である。 -->

証跡:

- 演習レポート（日時/所要時間/成功可否/ログURL）
