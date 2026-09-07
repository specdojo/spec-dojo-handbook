---
specdojo:
  id: specdojo:sysd-index-sample
  type: project
  status: draft
  rulebook: specdojo:sysd-index-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: fail
    score: 65
    graded_at: "2026-09-06T03:16:57.460Z"
    graded_by: gemma-expert-executor
    content_hash: 7091b902267836a1a4ac35ab0a727914dfae46318dcdacc8a10f387d6c4829e1
    categories:
      consistency: { score: 63 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 38 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 0, score: 0 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 1, major: 2, minor: 2, note: 0 }
---

<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=1 Frontmatter の title 不足、および必須章（SSOT一覧, 変更の入口, 関連ドメイン導線）と更新責任（Owner）が欠落している。 -->
<!-- specdojo:finding id=F003 severity=blocker rule=vp-qe-kata-conformance line=1 rulebook 第5節で定義された必須見出し構成および順序に準拠していない。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-ux-readability line=1 rulebook が定義する SSOT 一覧表などの核心的要素が実装されておらず、作成サンプルとしての有用性を欠いている。 -->

# 全体構成（リンク集） サンプル

## 1. 目的と適用範囲

本書は、システム設計のSSOTへの導線を1箇所に集約し、設計情報を迷子にしないための最小サンプルである。

<!-- specdojo:finding id=F005 severity=minor rule=vp-ux-language-consistency line=7 見出し名が規定の「概要（対象範囲・更新責任）」ではなく「目的と適用範囲」となっている。 -->

## 2. 入力情報

- 対象: 駄菓子屋の販売管理システム
- 前提: プロジェクト文脈は handbook の共通方針に準拠する
- 参照: `../rulebooks/sysd-index-rulebook.md`

## 3. 記述内容

- 主な内容: 内部API定義（OpenAPI等）/イベント定義（AsyncAPI等）/DBスキーマ（migration等）/バッチ定義（workflow/cron等）/設定スキーマ（config schema等）/コード配置規約（モジュール境界）
- 必須観点: 対象、条件、判定基準、責任者

## 4. 最小記述例

<!-- specdojo:finding id=F001 severity=minor rule=vp-qe-verifiability line=23 「最小記述例」の内容が成果物自体のメタデータに留まっており、具体的な SSOT 定義の書き方を示す検証可能な例になっていない。 -->

| 項目         | 値                                                                                                                                                                           | 備考                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| ドキュメント | 全体構成（リンク集）                                                                                                                                                         | 最小サンプル                         |
| 目的         | システム設計のSSOTへの導線を1箇所に集約し、設計情報を迷子にしない                                                                                                            | specdojo:deliverables-reference 準拠 |
| 主な内容     | 内部API定義（OpenAPI等）/イベント定義（AsyncAPI等）/DBスキーマ（migration等）/バッチ定義（workflow/cron等）/設定スキーマ（config schema等）/コード配置規約（モジュール境界） | 要点のみ記載                         |

## 5. 未解決事項

| 論点           | 処理方針                 |
| -------------- | ------------------------ |
| 要件詳細の補強 | 実案件適用時に具体化する |
