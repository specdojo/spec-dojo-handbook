---
specdojo:
  id: prj-0001:pjr-ankr-grade-executor-reporter
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: medium
  owner: ARC
  registered_at: "2026-08-30T11:06:46Z"
  due_on: "2026-09-30"
  register_events:
    - v: 1
      id: reg_3b63a239d642481f976ce609d9f0bc00
      ts: "2026-08-30T11:06:46Z"
      action: add
      actor: manual
      from_status: null
      to_status: open
      reason: item added
      changes:
        - field: status
          from: ""
          to: open
        - field: title
          from: ""
          to: grade を executor と reporter の2段構成へ分ける
        - field: description
          from: ""
          to: grade は1つの agent へ分析と JSON 構造化の両方を求めているため、どちらかが犠牲になる。実測では qwen が分析能力に優れる一方で閉じ括弧の過剰により JSON が破損し、muse は素の JSON を返す一方で判定が横並びになった。分析能力と構造化能力は独立した軸である。exec の pipeline と同じく executor と reporter を分け、executor には JSON 契約を課さず各観点の level と finding を自由形式で述べさせ、reporter が GradeSubmission JSON へ構造化する。reporter には判定内容を変更せず忠実に構造化することだけを求める。gemma は reporter として十分な出力形式の安定性を持つ。初回比較で qwen が散文で終えた分析は claude に匹敵する質であり、この構成であれば救済できる。
        - field: type
          from: ""
          to: todo
        - field: priority
          from: ""
          to: medium
        - field: owner
          from: ""
          to: ARC
        - field: registered
          from: ""
          to: "2026-08-30"
        - field: due
          from: ""
          to: "2026-09-30"
---

# PJR-ANKR grade を executor と reporter の2段構成へ分ける

## 1. 概要

grade は1つの agent へ分析と JSON 構造化の両方を求めているため、どちらかが犠牲になる。

実測では、qwen が関連文書を読み込んで実在の不整合を発見する分析能力を示す一方、閉じ括弧の過剰により JSON が破損した。muse は前置きのない素の JSON を返す一方、8 観点中 7 つを level 3 とする横並びの判定となり、`major` と `blocker` を一度も出さなかった。分析能力と構造化能力は独立した軸である。

exec の pipeline と同じく executor と reporter を分ける。executor には JSON 契約を課さず、各観点の level と finding を自由形式で述べさせる。reporter は判定内容を変更せず GradeSubmission JSON へ構造化する。

## 2. 完了条件

- grade が executor と reporter の2段で動作する。
- executor 向けの plan に JSON 出力の契約がなく、各観点の level と finding を述べる指示がある。
- reporter が executor の判定を変更せずに構造化する。level と severity が executor の申告と一致する。
- reporter の出力が `grade apply` の検証を通過する。
- executor が JSON を出力できなくても評価が成立する。
- 既存の1段構成との互換性、または移行方法が定められている。
- `npm run check` が通る。

## 3. 作業内容

| No  | 作業                      | 担当   | 状態 | メモ                                       |
| --- | ------------------------- | ------ | ---- | ------------------------------------------ |
| 1   | 2段構成の設計             | ARC    | open | plan の分割、受け渡し形式                  |
| 2   | reporter への制約の設計   | ARC    | open | 判定を変更させない指示と検証               |
| 3   | executor 向け plan の変更 | _TODO_ | open | JSON 契約の削除、level と finding の指示   |
| 4   | reporter 段の実装         | _TODO_ | open | executor 出力の受け取りと構造化            |
| 5   | 検証                      | _TODO_ | open | qwen を executor、gemma を reporter とする |
| 6   | 規範文書の更新            | _TODO_ | open | command-reference、job 定義                |

### 3.1. 分離が有効な根拠

同一の plan で6つの agent を比較した結果である。

| agent | 分析能力                   | JSON 出力      |
| ----- | -------------------------- | -------------- |
| qwen  | 高い。実在の不整合を発見   | 構文破損あり   |
| muse  | 低い。判定が横並び         | 素の JSON      |
| gemma | 弁別が最良。blocker を出す | コードフェンス |
| codex | 網羅的                     | 素の JSON      |

現状は1つの agent へ両方を求めるため、qwen の分析能力を活かせていない。分離すれば executor に qwen、reporter に gemma を割り当てられる。

初回の比較で qwen は JSON を出力せず散文で終えたが、その内容は claude に匹敵する質だった。Frontmatter が指す rulebook と本文の参照が食い違うという実在の不整合を、関連する rulebook と authoring standard を読んだうえで指摘している。2段構成であればこの分析を構造化して利用できる。

### 3.2. reporter の要件

reporter の役割は構造化に限る。判定を変更させない。

- level と severity は executor の申告をそのまま用いる。
- executor が述べていない finding を追加しない。
- executor が述べた finding を省略しない。
- 構造化できない場合はエラーとし、推測で埋めない。

gemma は reporter として十分な出力形式の安定性を持つ。コードフェンスを伴うが、既存の抽出処理で除去できる。

### 3.3. 想定される課題

| 課題       | 内容                                               |
| ---------- | -------------------------------------------------- |
| 実行時間   | 2段になるため1件あたりの所要時間が増える           |
| 情報の欠落 | executor の自由記述から level を正確に抽出できるか |
| 判定の改変 | reporter が level や severity を変える恐れがある   |

判定の改変は grade の信頼性に直結する。reporter の出力と executor の申告を突き合わせる検証を設けるか、reporter への指示だけで足りるかを判断する必要がある。指示の遵守能力はモデルにより異なることが実測で判明しているため、機械的な検証を置くほうが確実である。

### 3.4. 未決の論点

- plan を executor 用と reporter 用に分けるか、1つの plan を両者が異なる観点で読むか。
- executor の出力形式をどこまで規定するか。完全に自由にすると reporter の抽出が難しくなり、規定しすぎると現状と変わらない。
- 既存の1段構成を残すか。codex のように単独で完結できる agent には2段構成が冗長になる。
- agent の選定基準が変わる。分析用と構造化用を別々に評価することになるため、PJR-VQB5 の推奨も見直しが要る。

## 4. 対応結果

-

## 5. 関連ドキュメント

- [[prj-0001:pjr-vqb5-agent-grade-comparison]]: 分析能力と構造化能力が独立していることを示す実測記録。
- [[prj-0001:pjr-akj4-agent-json-response]]: 応答からの JSON 抽出。reporter の出力にも適用される。
- [[prj-0001:pjr-4tz7-grade-per-document]]: plan の生成と保存。plan の分割はこの構造に影響する。
- [[specdojo:exec-operation-guide]]: exec の executor と reporter の pipeline。同じ設計を流用する。
