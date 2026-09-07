---
specdojo:
  id: specdojo:opr-batch-sample
  type: operations
  status: draft
  rulebook: specdojo:opd-rulebook
  based_on:
    - opd-index
  supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 75
    graded_at: "2026-09-05T15:07:27.906Z"
    graded_by: gemma-expert-executor
    content_hash: a8b90757673892f2b2daaeeb8951cee6b5188922f66599f295e729d39c3884f2
    categories:
      consistency: { score: 38 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 5, minor: 0, note: 0 }
---

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=1 Frontmatter の必須項目 `title` が不足している。 -->

# 運用手順: バッチ再実行・失敗対応 サンプル

- 参照: `../rulebooks/opr-rulebook.md`

## 1. バッチ再実行・失敗時対応

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=6 Frontmatter の `rulebook` 指定が `specdojo:opd-rulebook` となっており、成果物種別（operations/OPR）と矛盾している。 -->

- 失敗検知: 監視アラート or ジョブ管理の失敗通知
- 再実行条件:
  - 同一run_idで再実行可否を確認（冪等性方式に従う）
  - 再実行上限: 1回（2回目はOps Lead判断）
- エスカレーション:
  - データ不整合の可能性がある場合は P1 として `opr-incident` に切替

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=45 `opr-rulebook` 第 5 章で定義されている必須章（概要、適用範囲・前提、定期点検、障害対応、アラート対応、バックアップ・リストア、運用変更、アカウント付与・剥奪、問い合わせ一次対応、証跡、関連文書導線）がすべて省略されており、ルールに違反している。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=45 見出し番号が `## 1` となっているが、ルールおよびテンプレートの定義に従い `## 7` とすべきである。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=45 必須構成を大幅に省略しており、`opr-＜term＞` 文書を正しく作成するためのサンプルとして不十分である。 -->
