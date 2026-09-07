---
specdojo:
  id: specdojo:opr-incident-sample
  type: operations
  status: draft
  rulebook: specdojo:opd-rulebook
  based_on:
    - opd-incident-management
  supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 75
    graded_at: "2026-09-05T15:59:06.080Z"
    graded_by: gemma-expert-executor
    content_hash: 61d5df1e19d9ff2d67d89cb0f1aa7cd9bb5f1a28f5c1ed55ed9dfd9573ea70b1
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

# 運用手順: 障害対応 サンプル

- 参照: `../rulebooks/opr-rulebook.md`

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-omissions-consistency line=5 `opr-rulebook` 第 5 章で定義された必須章（適用範囲・前提、定期点検、アラート対応、バックアップ、バッチ、変更、アカウント、問い合わせ）が省略されており、理由（なし/参照先）の記載もないためルールに違反している。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-ux-readability line=5 必須構成を大幅に省略し、かつ標準の番号付けを無視しているため、`opr-＜term＞` 文書を作成するための完成形サンプルとして不十分である。 -->

## 1. 概要（incident）

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=6 Frontmatter の `rulebook` が `specdojo:opd-rulebook` となっており、成果物種別と矛盾しているため `specdojo:opr-rulebook` とすべきである。 -->

障害対応の切り分け・一次対応・復旧・報告を `opr-index` の具体手順として定義する。

## 2. 障害対応手順（P1/P2…、切り分け、一次対応、復旧）

<!-- specdojo:finding id=F004 severity=major rule=vp-qe-kata-conformance line=11 見出し番号が `opr-rulebook` および `opr-template.md` で定義された固定順序（障害対応は ## 4, 証跡は ## 11, 導線は ## 12）に従っておらず、## 2, ## 3, ## 4 となっている。 -->

| 優先度 | 初動SLA | 切り分け                   | 一次対応                  | 復旧                 | エスカレーション        |
| ------ | ------- | -------------------------- | ------------------------- | -------------------- | ----------------------- |
| P1     | 30分    | 監視→直近変更→主要依存確認 | 影響遮断（機能停止/迂回） | 復旧作業→確認        | Ops Lead→PO（停止判断） |
| P2     | 2時間   | ログ/メトリクス確認        | 回避策提示                | 恒久対応チケット起票 | Ops Lead→Dev Lead       |
| P3     | 1営業日 | 再現条件整理               | 影響が小さければ保留      | 次リリースで対応     | Ops Leadへ共有          |

## 3. 証跡（ログ、チケット、チェックリスト、実施記録）

- 必須: ticket_id、影響範囲、発生/検知時刻、一次対応内容、復旧時刻、原因、再発防止
- 保存先: 障害チケット（template: INC-01）

## 4. 関連ドキュメント導線

| 種別 | ドキュメントID          | 目的                     | 備考   |
| ---- | ----------------------- | ------------------------ | ------ |
| 方針 | opd-incident-management | 優先度/停止判断/周知基準 | 必須   |
| 手順 | opr-monitoring          | アラート起点の切り分け   | 該当時 |
