---
specdojo:
  id: specdojo:imp-test-sample
  type: project
  status: draft
  rulebook: specdojo:imp-test-rulebook
  based_on:
    - cr-2026-004
  part_of:
    - prj-0001
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 65
    graded_at: "2026-09-09T15:10:05.915Z"
    graded_by: gemma-expert-executor
    content_hash: 6ec937a37bae05c733a971f108dccb9eecf3f97b74b90865e7bdf1a60e87732c
    categories:
      consistency: { score: 63 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 38 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 4, score: 100 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 2, score: 50 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 9, minor: 2, note: 0 }
---

# 影響調査（テスト）サンプル

## 1. 目的と適用範囲

本書は、変更要求 `cr-2026-004` が駄菓子屋の販売管理システムのテストへ与える影響を判断するための文書である。
対象は「単体テスト」「結合テスト」「業務受入テスト」「回帰テスト」の 4 テスト領域とする。

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=7 対象期間の記載が漏れている。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-qe-kata-conformance line=7 必須要素である対象期間が欠落しており、完成最小例として不十分である。 -->

## 2. 変更要求の概要

- 背景: バーコード会計とキャンペーン値引きの導入で、既存検証ケースでは網羅不足が懸念される。
- 要求内容: 変更箇所に応じた観点・条件・ケースの追加と、実行優先度の再整理。
- 狙い: リリース前の欠陥流出リスクを抑え、期限内に必要な検証を完了する。

## 3. 影響分析サマリ

<!-- specdojo:finding id=F002 severity=major rule=vp-arc-cross-document-consistency line=15 成功条件の記述が漏れている。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-verifiability line=15 成功条件に指標・状態・閾値などの判定基準がなく、検証不可能な状態である。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-qe-kata-conformance line=15 必須要素である成功条件が欠落しており、完成最小例として不十分である。 -->

評価観点は、欠陥流出リスク、回帰範囲、実行コストの 3 点とする。

| 影響度 | 件数 | 主な対象テスト             | 優先対応 |
| ------ | ---- | -------------------------- | -------- |
| 高     | 2    | 結合テスト、業務受入テスト | 要       |
| 中     | 1    | 回帰テスト                 | 要       |
| 低     | 1    | 単体テスト                 | 否       |

<!-- specdojo:finding id=F003 severity=major rule=vp-arc-cross-document-consistency line=24 影響度の判定尺度（高・中・低の定義）を定めずに使用しており、禁止事項に抵触している。 -->
<!-- specdojo:finding id=F007 severity=major rule=vp-qe-kata-conformance line=24 影響度の判定尺度を定義せずに使用しており、rulebook の禁止事項に抵触している。 -->
<!-- specdojo:finding id=F009 severity=minor rule=vp-ux-readability line=24 影響度の判定基準が不明確であり、判断に曖昧さが残る。 -->

## 4. 影響詳細一覧

| 影響対象テスト | 変更要否 | 影響度 | 対応方針 | 判断根拠                                                                             | 備考                           |
| -------------- | -------- | ------ | -------- | ------------------------------------------------------------------------------------ | ------------------------------ |
| 結合テスト     | 要       | 高     | 実施     | 値引き適用と売上集計の連携確認が不足すると、本番で差異が検出される可能性が高いため。 | 新規ケース 8 件を追加する。    |
| 業務受入テスト | 要       | 高     | 実施     | 店舗運用手順の変更を反映しないと、受入判定基準を満たせないため。                     | 店舗担当の同席レビューを行う。 |
| 回帰テスト     | 要       | 中     | 代替     | 全ケース再実行は工数過多のため、影響分析に基づく重点ケースへ絞る必要があるため。     | 重点 20 ケースを優先実行する。 |
| 単体テスト     | 否       | 低     | 見送り   | 既存のカバレッジが維持され、今回の変更で新規分岐が限定的なため。                     | 実装差分増加時に再評価する。   |

## 5. 対応方針

| 優先度 | 対応項目               | 実施時期        | 担当                 | 前提条件                   |
| ------ | ---------------------- | --------------- | -------------------- | -------------------------- |
| 高     | 結合テストケース追加   | 2026-05-16 まで | QE 担当（井上）      | 連携仕様の最終確定         |
| 高     | 受入テスト観点更新     | 2026-05-20 まで | 業務受入担当（高橋） | 店舗手順の改訂版確定       |
| 中     | 回帰テスト重点化       | 2026-05-24 まで | テスト管理（山本）   | 優先順位基準の合意         |
| 低     | 単体テスト見送り再評価 | 2026-07-31      | 開発リード（佐藤）   | 実装差分レビュー結果の確認 |

## 6. 未解決事項

<!-- specdojo:finding id=F008 severity=major rule=vp-qe-kata-conformance line=48 担当者欄に個人名を使用しており、sample 記述標準の禁止事項に抵触している。 -->
<!-- specdojo:finding id=F010 severity=major rule=vp-ux-language-consistency line=48 定義外の役割ラベルおよび個人名が使用されており、識別子として統一されていない。 -->
<!-- specdojo:finding id=F011 severity=minor rule=vp-ux-language-consistency line=46 「影響度」と「優先度」という用語が使い分けられており、概念の整合性が不明確である。 -->

| 論点                     | 不足情報                         | 決定期限   | 担当               | 処理方針                                      |
| ------------------------ | -------------------------------- | ---------- | ------------------ | --------------------------------------------- |
| 重点回帰ケースの確定     | 変更箇所と既存障害履歴の突合結果 | 2026-05-11 | テスト管理（山本） | 障害履歴を参照して対象ケースを確定する。      |
| 受入判定基準の更新範囲   | 店舗運用側の必須判定項目         | 2026-05-13 | 業務受入（高橋）   | 現場ヒアリングを反映して判定基準を更新する。  |
| 連携系テストデータの準備 | 値引き条件の代表データセット     | 2026-05-14 | QE 担当（井上）    | 代表パターンを 6 件作成しレビューで確定する。 |
