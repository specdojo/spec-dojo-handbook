---
specdojo:
  id: prj-0001:grade-kata-0e1384b32eef-plan
  type: exec-plan
  rulebook: none
  task_id: GRADE-KATA-0E1384B32EEF
  name: "grade: docs/ja/specdojo/samples/opr-batch-sample.md"
  mode: review
  status: ready
  project_id: prj-0001
  targets:
    - specdojo:opr-batch-sample
---

# Review Plan: GRADE-KATA-0E1384B32EEF grade: docs/ja/specdojo/samples/opr-batch-sample.md

最終応答契約（最優先）: 正常終了時の最終応答は、後述する GradeSubmission JSON オブジェクト1個だけとする。この契約は、agent 定義や共通指示にある変更ファイル、検証結果、根拠、未確認範囲などの最終報告指示に優先する。根拠は `findings[].message` に含める。途中経過、タスクリスト、前置き、要約、Markdown コードフェンスを最終応答へ含めない。最初の文字を `{`、最後の文字を `}` とし、JSON を出力したら応答を終了する。

## 1. このタスクで行うこと

評価対象 `docs/ja/specdojo/samples/opr-batch-sample.md` を共通 viewpoint と category rubric で 0-4 判定する。deterministic viewpoint は CLI が判定するため、agent の出力には含めない。

## 2. 対象項目

- `target`: kata
- `rubric`: grade-rubric-v1
- `document_id`: specdojo:opr-batch-sample
- `評価対象`: `docs/ja/specdojo/samples/opr-batch-sample.md`

### 参考資料

参考資料は評価対象ではなく、成果物間整合を判定するための材料である。GradeSubmission の `documents` へ追加しない。

- `docs/ja/specdojo/rulebooks/opd-rulebook.md`
- `docs/ja/specdojo/rulebooks/opr-rulebook.md`
- `docs/ja/specdojo/samples/opd-access-control-sample.md`
- `docs/ja/specdojo/samples/opd-incident-management-sample.md`
- `docs/ja/specdojo/samples/opd-monitoring-sample.md`
- `docs/ja/specdojo/samples/opd-sample.md`
- `docs/ja/specdojo/samples/opr-access-control-sample.md`
- `docs/ja/specdojo/samples/opr-backup-restore-sample.md`
- `docs/ja/specdojo/samples/opr-change-sample.md`
- `docs/ja/specdojo/samples/opr-incident-sample.md`
- `docs/ja/specdojo/samples/opr-monitoring-sample.md`
- `docs/ja/specdojo/samples/opr-sample.md`
- `docs/ja/specdojo/samples/opr-support-sample.md`
- `docs/ja/specdojo/templates/opr-template.md`

## 3. 進め方

1. 評価対象をファイル読み取りツールで全文読み、実行ログに読み取り操作を残す。plan に対象本文は埋め込まれていないため、この手順を省略しない。
2. 参考資料がある場合は列挙された全ファイルを全文読み、実行ログに各パスの読み取り操作を残す。参考資料を評価対象と混同しない。
3. 評価対象を次の rubric と viewpoint に照らし、各 viewpoint を 0-4 で判定する。
4. level 3 以下には finding を付ける。finding には severity（blocker / major / minor / note）、対象直前の本文行番号、具体的な修正理由を含める。line は Frontmatter を除く本文の1始まり（通常は H1 が1行目）とする。

### 3.1. Rubric

- 0 (不成立, review=changes_requested): blocker があり、その観点で文書が機能していない。
- 1 (不十分, review=changes_requested): major が複数、または観点の目的をほぼ果たしていない。
- 2 (要改善, review=changes_requested): major があり、誤用・誤読を招く箇所がある。
- 3 (軽微な課題, review=conditional_pass): minor のみで、実務上はそのまま利用できる。
- 4 (良好, review=pass): 指摘なし、または note のみである。

### 3.2. Viewpoints

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
2. facts である `path` と `rubric` を変更せず、次のテンプレートを満たす GradeSubmission JSON を作る。`graded_by` は実行中の agent ID に置き換え、判定結果を各 `level` と `findings` へ反映する。
3. JSON が `rubric`、非空の `graded_by`、対象1件、すべての agent viewpoint を含むこと、level 3 以下の各 viewpoint に非空の `message` を持つ finding があることを確認する。
4. 最終応答には確認済みの JSON オブジェクトだけを出力する。コードフェンスや JSON 外の説明を加えない。

```json
{
  "rubric": "grade-rubric-v1",
  "graded_by": "<agent-id>",
  "documents": [
    {
      "path": "docs/ja/specdojo/samples/opr-batch-sample.md",
      "viewpoints": [
        {
          "id": "vp-arc-cross-document-consistency",
          "level": 4,
          "findings": []
        },
        {
          "id": "vp-arc-conciseness",
          "level": 4,
          "findings": []
        },
        {
          "id": "vp-arc-single-responsibility",
          "level": 4,
          "findings": []
        },
        {
          "id": "vp-qe-verifiability",
          "level": 4,
          "findings": []
        },
        {
          "id": "vp-qe-omissions-consistency",
          "level": 4,
          "findings": []
        },
        {
          "id": "vp-qe-kata-conformance",
          "level": 4,
          "findings": []
        },
        {
          "id": "vp-ux-readability",
          "level": 4,
          "findings": []
        },
        {
          "id": "vp-ux-language-consistency",
          "level": 4,
          "findings": []
        }
      ]
    }
  ]
}
```

## 5. 異常終了の条件

- 評価対象または参考資料を読み取れない場合は、内容を推測せず異常終了する。
- rubric または viewpoint に不足があり、全項目を判定できない場合は異常終了する。
- GradeSubmission JSON の契約を満たせない場合は異常終了する。
