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

出力形式の安定性は agent により異なる。qwen は同一の plan に対して、正常な JSON を返す場合と、閉じ括弧が過剰で構文として成立しない JSON を返す場合があった。後者は抽出処理でも救済できず、`grade apply` が拒否する。壊れた結果が記録されることは防げているが、評価そのものが失敗するため再実行が必要になる。

本記録の総合比較にある「甘めだが安定」という qwen の評価は判定内容についてのものであり、出力形式の安定性は別である。定期実行で用いる場合、失敗時の再試行を運用へ組み込む必要がある。codex は 4 回の実行すべてで素の JSON を返しており、この点では最も安定している。

### 1.7. gemma の評価が変わった経緯

初回の比較では gemma を不採用と判断した。finding の `message` がすべて空で `grade apply` に拒否され、prompt を 46,673 文字から 7,271 文字へ縮小しても解消しなかったため、限界は言語化能力にあると結論づけた。

この結論は誤りだった。PJR-AKJ4 で plan へ最終応答契約を明示した後に再測定したところ、`message` が記述され apply も受理された。原因は能力ではなく plan の指示不足だった。唯一 `blocker` severity を出した agent でもある。

agent の評価は plan の指示品質に強く依存する。指示を改善せずに agent の能力を判断すると誤った結論に至る。

### 1.8. 指示の強化では出力形式を保証できない

gemma の agent 定義へ qwen と同等の契約優先の記述を追加し、同一 plan で再測定した。追加した記述は Markdown コードフェンスを加えないことを明示している。

結果は変わらなかった。gemma は agent 定義と plan の両方でコードフェンスを禁じられているにもかかわらず、コードフェンスで囲んだ応答を返し続けた。qwen では同じ記述の追加により JSON を出力するようになったのとは対照的である。

指示の遵守能力はモデルごとに異なり、指示を強化しても出力形式は保証できない。応答から JSON を抽出する処理を受け側に置く設計が妥当であることを裏づける。効果がないため、gemma の agent 定義は元の記述へ戻した。

### 1.9. 判定の再現性

同一 plan に対する gemma の判定を2回測定した。agent 定義の変更は出力形式に関するもので、判定基準には触れていない。

| 対象                  | 1回目の平均 level | 2回目の平均 level | 一致した判定 |
| --------------------- | ----------------- | ----------------- | ------------ |
| `dec-rulebook.md`     | 4.00              | 4.00              | 8 / 8        |
| `opr-batch-sample.md` | 2.88              | 2.88              | 8 / 8        |

16 判定すべてで level と finding 件数が完全に一致した。ローカルモデルは温度設定が低いか決定的であることが再現性に寄与していると考えられる。API 経由の agent で同様かは測定していない。

### 1.10. 複数 agent を重ねると精度が上がる

単独実行では agent ごとに網羅性が大きく異なるが、前回の指摘を引き継げば結果が変わる。最も甘い `claude-executor` へ `gemma-expert-executor` の finding 4 件を前回の指摘として渡し、`opr-batch-sample.md` を再評価した。level と score は渡していない。

| 指標         | claude-executor 単独 | 前回指摘つき | gemma-expert-executor 単独 |
| ------------ | -------------------- | ------------ | -------------------------- |
| 平均 level   | 3.75                 | 2.75         | 2.88                       |
| finding 件数 | 1                    | 5            | 4                          |

引き継いだ 4 件をいずれも未解消と正しく判定し、gemma 単独を上回った。さらに gemma が出していない指摘を 1 件追加している。再実行上限の判断基準が未定義であるという内容で、`claude-expert-executor` も単独で指摘していた問題である。前回指摘の確認に埋没せず、独立検出が機能した。

この性質により、単一の agent の網羅性が運用品質の上限を決めるわけではなくなる。安価な agent で繰り返しても、指摘が積み上がることで網羅性が向上する。引き継ぎの実装は PJR-X40M で完了している。

### 1.11. 複数 agent を組み合わせる運用

指摘が累積するため、性質の異なる agent を順に回す運用が成立する。

| 順序の例                             | 狙い                                                                       |
| ------------------------------------ | -------------------------------------------------------------------------- |
| qwen の後に gemma                    | ローカルで完結する。qwen は指摘が安定し、gemma は弁別と blocker 判定に強い |
| ローカルの後に codex                 | ローカルで積み上げた指摘を API 系が確認し、網羅性を補う                    |
| 定期は同一 agent、随時 claude-expert | 通常は安価に回し、重要な kata のみ精査する                                 |

qwen と gemma は指摘の重複が少ない。qwen は Frontmatter の矛盾とエスカレーション条件の曖昧さを、gemma は必須章の欠落を `blocker` として指摘しており、着目点が異なる。両者を重ねれば単独より広い範囲を覆える。

順序については、厳格な agent を先に置くと以降の実行でもその水準が保たれることを確認した。`codex-expert-executor` で評価した後に `gemma-expert-executor` で再評価したところ、major 8 件と verdict、score のいずれも変化しなかった。未解消の指摘は severity を維持する仕組み（PJR-Z8T1）が働くため、後続の agent が甘く判定しても水準が下がらない。

したがって1段目には厳格な agent を置くことが望ましい。`codex-expert-executor` は major を 8 件出しており、`qwen-expert-executor` の 5 件より厳格である。ただし解消されない指摘が世代を越えて蓄積し続ける可能性があり、その扱いは PJR-X40M の論点として残っている。

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
- API 経由の agent における判定の再現性は測定していない。サンプリングにより判定が揺れる場合、同じ文書を再評価するたびにスコアが変動する。運用上の影響を見極める必要がある。
- 複数 agent を重ねる場合の順序による効果の差は測定していない。厳格な agent を先に置くか後に置くかで結果が変わるかを確認する余地がある。

## 4. 関連ドキュメント

- [[prj-0001:pjr-49d2-quality-assessment]]: grade の設計と実装。本比較はその agent 選定にあたる。
- [[prj-0001:pjr-4tz7-grade-per-document]]: 1文書単位の評価と plan 保存。本比較で用いた plan 方式。
- [[prj-0001:pjr-akj4-agent-json-response]]: 最終応答契約と JSON 抽出。gemma の評価が変わった要因。
- [[prj-0001:pjr-6xnj-grade-graded-by]]: `graded_by` の不安定さ。
- [[prj-0001:pjr-zyfz-single-responsibility-viewpoint]]: 判定に用いた文書責務の単一性の観点。
