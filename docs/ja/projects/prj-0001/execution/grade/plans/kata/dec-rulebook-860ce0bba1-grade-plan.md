---
specdojo:
  id: prj-0001:grade-kata-860ce0bba137-plan
  type: exec-plan
  rulebook: none
  task_id: GRADE-KATA-860CE0BBA137
  name: "grade: docs/ja/specdojo/rulebooks/dec-rulebook.md"
  mode: review
  status: ready
  project_id: prj-0001
  targets:
    - specdojo:dec-rulebook
---

# Review Plan: GRADE-KATA-860CE0BBA137 grade: docs/ja/specdojo/rulebooks/dec-rulebook.md

この plan は grade pipeline の executor stage 用である。評価と根拠の記述だけを行い、GradeSubmission JSON は作成しない。後続の reporter が判定内容を変更せず JSON へ構造化する。

## 1. このタスクで行うこと

評価対象 `docs/ja/specdojo/rulebooks/dec-rulebook.md` を共通 viewpoint と category rubric で 0-4 判定する。deterministic viewpoint は CLI が判定するため、agent の出力には含めない。

## 2. 対象項目

- `target`: kata
- `rubric`: grade-rubric-v1
- `document_id`: specdojo:dec-rulebook
- `評価対象`: `docs/ja/specdojo/rulebooks/dec-rulebook.md`

### 参考資料

参考資料は評価対象ではなく、成果物間整合を判定するための材料である。参考資料自体を評価しない。

- `docs/ja/specdojo/samples/dec-sample.md`

## 3. 進め方

1. 評価対象をファイル読み取りツールで全文読み、実行ログに読み取り操作を残す。plan に対象本文は埋め込まれていないため、この手順を省略しない。
2. 参考資料がある場合は列挙された全ファイルを全文読み、実行ログに各パスの読み取り操作を残す。参考資料を評価対象と混同しない。
3. 評価対象を次の rubric と viewpoint に照らし、各 viewpoint を 0-4 で判定する。ある viewpoint の finding の有無から、ほかの viewpoint の判定を推論しない。
4. level 3 以下には finding を付ける。finding には severity（blocker / major / minor / note）、対象直前の本文行番号、具体的な修正理由を含める。line は Frontmatter を除く本文の1始まり（通常は H1 が1行目）とする。level 4 は finding なしとする。
5. 前回の指摘を対象の現在内容と照合し、解消済みか確認する。未解消なら前回の message を変更せず今回の finding に含め、severity は前回と同等以上を指定する。前回の rule は前回評価時の分類として扱い、各 viewpoint は現在の根拠から独立に評価する。前回の問題が解消され、別の軽微な問題だけが残るため severity を引き下げる場合は、その根拠を新しい finding の message に含める。
6. 前回の指摘の確認だけで終了せず、前回の指摘にない問題もすべての viewpoint で独立して検出する。

### 3.1. 前回の指摘

対象文書に現在記録されている finding の事実情報を示す。

- なし

### 3.2. Rubric

- 0 (不成立, review=changes_requested): blocker があり、その観点で文書が機能していない。
- 1 (不十分, review=changes_requested): major が複数、または観点の目的をほぼ果たしていない。
- 2 (要改善, review=changes_requested): major があり、誤用・誤読を招く箇所がある。
- 3 (軽微な課題, review=conditional_pass): minor のみで、実務上はそのまま利用できる。
- 4 (良好, review=pass): 指摘なし、または note のみである。

### 3.3. Viewpoints

- vp-arc-cross-document-consistency [consistency/agent]: 成果物カタログ、Schedule、RACI、組織定義、メンバー定義、生成物と矛盾していないか。 Evidence: local_id、depends_on、owner、roles、RACI、関連文書、生成元。
- vp-arc-conciseness [usability/agent]: 各節が固有の判断または手順に寄与し、同じ主張の反復、一般論、正本の過剰な再掲がなく、必要な背景・制約・例外を保った必要十分な記述か。 Evidence: 反復する段落、表と本文の重複、正本への参照で置換できる再掲、削除または統合しても判断情報を失わない箇所。
- vp-arc-single-responsibility [architecture/agent]: 文書の中心主題と責務境界が一つに定まり、各章がその責務に直接寄与しているか。独立して参照・更新できる主題が複数あり、対象読者・利用時点が異なる、または別々の sample・recipe・template に対応する場合は分割を検討する。分量や対応する実践の型の数だけでは不備とせず、複数主題の案内自体を責務とする index・catalog・overview は分割対象から除外する。同一主張の反復や正本の過剰な再掲は vp-arc-conciseness で判定し、この観点では扱わない。 Evidence: 文書の目的、章ごとの主題と相互依存、章が参照・更新される単位、対象読者、利用時点、対応する sample・recipe・template、index・catalog・overview としての集約責務、分割後も独立して成立する境界候補。分割が必要な finding には境界候補と参照・カタログへの影響を記録する。
- vp-qe-verifiability [quality/agent]: 成功基準、受入条件、品質基準、設定値が pass / fail を判定できる表現になっているか。 Evidence: 判定条件、数値、状態、必須項目、チェック手順。
- vp-qe-omissions-consistency [consistency/agent]: 必須章、必須キー、参照、責務、禁止事項に抜け漏れや矛盾がないか。 Evidence: rulebook、schema、関連文書、禁止事項、レビュー履歴。
- vp-qe-kata-conformance [quality/agent]: rulebook、recipe、sample、template が種別ごとの責務を守り、相互参照と対象成果物への適用方法が矛盾なく定義されているか。 Evidence: authoring standard、rulebook の型宣言、recipe の問い、sample の完成例、template の骨組み、対象成果物との対応。
- vp-ux-readability [usability/agent]: 説明を持つ成果物では、初見の読者が、成果物固有の目的または上位文書への参照からなぜ扱うかを把握し、目的と手段を区別して、対象、主要な判断、次に見る文書を理解できるか。そのうえで、同じ主張の反復、判断に不要な一般論、表と本文の内容重複、正本からの過剰な再掲がなく、必要な背景、判断理由、例外、制約、done_criteria を保った必要十分な記述になっているか。長さだけでは fail にせず、冗長箇所を特定できる場合は minor、冗長さによって主旨または主要な判断点を読み取れない場合は major とする。構造・設定中心の成果物では、名称、メタデータ、参照から役割と利用先を識別できるか。 Evidence: 導入文、目的・理由、主要な成果・方針との対応、上位文書への参照、見出し、表、用語、関連ドキュメント、補足説明、段落・箇条書きの長さと論点数、反復・重複箇所、表と本文の役割分担、正本への参照と再掲範囲、保持すべき背景・判断理由・例外・制約・done_criteria、削除候補・参照置換候補。
- vp-ux-language-consistency [usability/agent]: 用語、Role code、成果物名、状態、ラベルが読み手を混乱させない形で統一されているか。 Evidence: 用語定義、表記ゆれ、Role code、local_id、status、ラベル。

## 4. 完了手順

1. すべての agent viewpoint の判定と、必要な finding が揃っていることを確認する。
2. 最終応答では各 viewpoint を次のマーカーで1回ずつ宣言する。マーカー間には根拠や検討過程を自由形式で詳しく記述してよい。JSON、Markdown コードフェンス、GradeSubmission は出力しない。
3. `LEVEL` と各 `FINDING` は reporter が忠実性を機械検証する申告値である。message は1行で具体的に記し、reporter が一字一句コピーできるようにする。finding がない場合は `FINDING` 行を記さない。
4. すべての viewpoint marker、0-4 の level、level 3 以下の finding、severity と非空 message が揃っていることを確認する。

```text
[VIEWPOINT vp-arc-cross-document-consistency]
LEVEL: <0-4>
根拠を自由形式で記述する。
FINDING <severity> line=<line>: level 3 以下の場合だけ、具体的な修正理由を1行で記述する。
[END VIEWPOINT]

[VIEWPOINT vp-arc-conciseness]
LEVEL: <0-4>
根拠を自由形式で記述する。
FINDING <severity> line=<line>: level 3 以下の場合だけ、具体的な修正理由を1行で記述する。
[END VIEWPOINT]

[VIEWPOINT vp-arc-single-responsibility]
LEVEL: <0-4>
根拠を自由形式で記述する。
FINDING <severity> line=<line>: level 3 以下の場合だけ、具体的な修正理由を1行で記述する。
[END VIEWPOINT]

[VIEWPOINT vp-qe-verifiability]
LEVEL: <0-4>
根拠を自由形式で記述する。
FINDING <severity> line=<line>: level 3 以下の場合だけ、具体的な修正理由を1行で記述する。
[END VIEWPOINT]

[VIEWPOINT vp-qe-omissions-consistency]
LEVEL: <0-4>
根拠を自由形式で記述する。
FINDING <severity> line=<line>: level 3 以下の場合だけ、具体的な修正理由を1行で記述する。
[END VIEWPOINT]

[VIEWPOINT vp-qe-kata-conformance]
LEVEL: <0-4>
根拠を自由形式で記述する。
FINDING <severity> line=<line>: level 3 以下の場合だけ、具体的な修正理由を1行で記述する。
[END VIEWPOINT]

[VIEWPOINT vp-ux-readability]
LEVEL: <0-4>
根拠を自由形式で記述する。
FINDING <severity> line=<line>: level 3 以下の場合だけ、具体的な修正理由を1行で記述する。
[END VIEWPOINT]

[VIEWPOINT vp-ux-language-consistency]
LEVEL: <0-4>
根拠を自由形式で記述する。
FINDING <severity> line=<line>: level 3 以下の場合だけ、具体的な修正理由を1行で記述する。
[END VIEWPOINT]

```

## 5. 異常終了の条件

- 評価対象または参考資料を読み取れない場合は、内容を推測せず異常終了する。
- rubric または viewpoint に不足があり、全項目を判定できない場合は異常終了する。
- すべての viewpoint の level と finding を申告できない場合は異常終了する。
