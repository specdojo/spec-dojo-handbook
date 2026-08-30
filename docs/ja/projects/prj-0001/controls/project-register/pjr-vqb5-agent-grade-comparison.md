---
specdojo:
  id: prj-0001:pjr-vqb5-agent-grade-comparison
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: note
  item_status: open
  priority: medium
  owner: ARC
  registered_at: "2026-08-29T13:44:25Z"
  due_on: "2026-09-30"
  register_events:
    - v: 1
      id: reg_ff0f15ca90c84752bb54c675a9c19ac7
      ts: "2026-08-29T13:44:26Z"
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
          to: grade 判定の agent 比較結果（gemma / claude / qwen）
        - field: description
          from: ""
          to: 同一の grade plan を gemma-expert-executor、claude-expert-executor、qwen-expert-executor へ渡して判定結果を比較した実測記録。kata 4 件を対象とし、level 分布、finding の件数と質、grade apply の受理可否、指摘の正確性を評価した。claude のみが実用条件を満たし、gemma は finding の message が空で apply に拒否され、qwen は JSON を出力できなかった。バッチと単体の prompt サイズを変えた比較も行い、gemma の問題がコンテキスト量に起因しないことを確認した。
        - field: type
          from: ""
          to: note
        - field: priority
          from: ""
          to: medium
        - field: owner
          from: ""
          to: _TODO_
        - field: registered
          from: ""
          to: "2026-08-29"
        - field: due
          from: ""
          to: _TODO_
    - v: 1
      id: reg_f730d723f99444e18308158c23b20fe6
      ts: "2026-08-29T13:56:32Z"
      action: update
      actor: manual
      from_status: open
      to_status: open
      reason: 担当と期限を確定
      changes:
        - field: owner
          from: _TODO_
          to: ARC
        - field: due
          from: _TODO_
          to: "2026-09-30"
      previous_event_id: reg_ff0f15ca90c84752bb54c675a9c19ac7
---

# PJR-VQB5 grade 判定の agent 比較結果

## 1. メモ

同一の grade plan を6つの agent へ渡し、判定結果を比較した実測記録である。kata 285 件の定期評価にどの agent を使うかを判断するために行った。

### 1.1. 実行条件

| 項目           | 内容                                                       |
| -------------- | ---------------------------------------------------------- |
| 対象文書       | `dec-rulebook.md`（60 行）、`opr-batch-sample.md`（22 行） |
| plan           | 1文書単位・パス参照。9,165 文字と 9,865 文字               |
| 判定 viewpoint | 8 件（決定的観点は CLI が判定するため plan に含まれない）  |
| 実行日         | 2026-08-30                                                 |

`opr-batch-sample.md` は 483 行の `opr-rulebook.md` に対応する 22 行の sample であり、規範に対して完成例が大きく不足している。良い文書と問題のある文書を区別できるかを見る材料として選んだ。

### 1.2. 総合比較

`opr-batch-sample.md` に対する判定である。平均 level が低いほど厳格な評価を意味する。

| agent                    | 平均 level | finding | 出力形式       | 判定                   |
| ------------------------ | ---------- | ------- | -------------- | ---------------------- |
| `claude-expert-executor` | 1.88       | 19      | コードフェンス | 最も厳格かつ網羅的     |
| `codex-expert-executor`  | 2.38       | 7       | 素の JSON      | 網羅性と均衡が良い     |
| `codex-executor`         | 2.62       | 5       | 素の JSON      | 判定と根拠が不釣り合い |
| `gemma-expert-executor`  | 2.88       | 4       | コードフェンス | 弁別能力が最も高い     |
| `qwen-expert-executor`   | 3.25       | 5       | 前置きあり     | 甘めだが安定           |
| `claude-executor`        | 3.75       | 1       | コードフェンス | 検出できていない       |

### 1.3. 弁別能力

良い文書と問題のある文書をどれだけ区別できるかを示す。`dec-rulebook.md` と `opr-batch-sample.md` の平均 level の差である。

| agent                    | dec-rulebook | opr-batch-sample | 差       |
| ------------------------ | ------------ | ---------------- | -------- |
| `gemma-expert-executor`  | 4.00         | 2.88             | **1.12** |
| `claude-expert-executor` | 2.62         | 1.88             | 0.74     |
| `codex-expert-executor`  | 2.75         | 2.38             | 0.37     |
| `qwen-expert-executor`   | 3.62         | 3.25             | 0.37     |
| `codex-executor`         | 2.50         | 2.62             | -0.12    |
| `claude-executor`        | 3.50         | 3.75             | -0.25    |

`gemma` は差が最も大きいが、`dec-rulebook.md` を全観点 level 4 と判定しており、中程度の問題を見落とす。他の5 agent はいずれも `dec-rulebook.md` に問題を検出している。

`codex-executor` と `claude-executor` は差が負であり、問題のある文書ほど高い level を付けている。品質評価として成立していない。

### 1.4. proficiency による差

同一 provider で proficiency だけが異なる組み合わせを比較する。

| 組み合わせ                 | expert の平均 level | normal の平均 level | expert の finding | normal の finding |
| -------------------------- | ------------------- | ------------------- | ----------------- | ----------------- |
| claude（opr-batch-sample） | 1.88                | 3.75                | 19                | 1                 |
| codex（opr-batch-sample）  | 2.38                | 2.62                | 7                 | 5                 |

**proficiency の差は provider 間の差より大きい。** claude は expert と normal で平均 level が 1.87、finding が 18 件も違う。grade には expert が必要である。

`codex-executor` は `dec-rulebook.md` の3観点へ level 1 を付けながら finding は各1件であり、重い判定に対して根拠が薄い。

### 1.5. 全 agent が検出した不整合

`opr-batch-sample.md` の Frontmatter が `rulebook: specdojo:opd-rulebook`（運用方針）を指す一方、本文は `../rulebooks/opr-rulebook.md`（運用手順）を参照している。系統が食い違う実在の不整合であり、6 agent すべてが検出した。

明白な不整合は agent を問わず捉えられる。差が出るのは網羅性である。

### 1.6. 出力形式

| provider | 形式                                   |
| -------- | -------------------------------------- |
| codex    | 素の JSON。4回すべてで契約を守った     |
| claude   | コードフェンスで囲む                   |
| opencode | コードフェンス、または作業経過の前置き |

契約で「JSON だけを出力する」と指示しても、codex 以外は付加物を伴う。PJR-AKJ4 で実装した抽出処理により、いずれの形式でも受理できる。

### 1.7. gemma の評価が変わった経緯

初回の比較では gemma を不採用と判断した。finding の `message` がすべて空で `grade apply` に拒否され、prompt を 46,673 文字から 7,271 文字へ縮小しても解消しなかったため、限界は言語化能力にあると結論づけた。

この結論は誤りだった。PJR-AKJ4 で plan へ最終応答契約を明示した後に再測定したところ、`message` が記述され apply も受理された。原因は能力ではなく plan の指示不足だった。唯一 `blocker` severity を出した agent でもある。

agent の評価は plan の指示品質に強く依存する。指示を改善せずに agent の能力を判断すると誤った結論に至る。

## 2. 背景・文脈

kata 285 件を定期評価するにあたり、ローカルモデルで運用できれば API コストなしで全件を回せる。その可否と、どの agent をどの用途に使うかを判断するために比較した。

## 3. フォローアップ

用途別の推奨は次のとおりである。

| 用途                | 推奨 agent                          | 理由                                       |
| ------------------- | ----------------------------------- | ------------------------------------------ |
| 全 285 件の定期評価 | `codex-expert-executor`             | 網羅性・弁別・整合性の均衡が良い           |
| 重要な kata の精査  | `claude-expert-executor`            | 最も厳格で網羅的                           |
| ローカル無償運用    | `gemma-expert-executor`             | 弁別能力が最も高く、深刻な問題の検出に有効 |
| 補助的な二次評価    | `qwen-expert-executor`              | 甘いが安定している                         |
| 不採用              | `claude-executor`、`codex-executor` | 判定と根拠が釣り合わない                   |

- `graded_by` が agent の自己申告のため値が安定しない。agent 別の傾向分析の前提となるため PJR-6XNJ で扱う。
- 合格閾値 70 の妥当性は未確定である。agent により平均 level が 1.88 から 3.75 まで分かれるため、閾値を agent 別に変える必要があるかを全件評価の分布を見て判断する。
- `gemma-expert-executor` の agent 定義へ、plan の契約を優先する記述を追加した。qwen と同等の条件になったため、次回の測定では結果が変わる可能性がある。

## 4. 関連ドキュメント

- [[prj-0001:pjr-49d2-quality-assessment]]: grade の設計と実装。本比較はその agent 選定にあたる。
- [[prj-0001:pjr-4tz7-grade-per-document]]: 1文書単位の評価と plan 保存。本比較で用いた plan 方式。
- [[prj-0001:pjr-akj4-agent-json-response]]: 最終応答契約と JSON 抽出。gemma の評価が変わった要因。
- [[prj-0001:pjr-6xnj-grade-graded-by]]: `graded_by` の不安定さ。
- [[prj-0001:pjr-zyfz-single-responsibility-viewpoint]]: 判定に用いた文書責務の単一性の観点。
