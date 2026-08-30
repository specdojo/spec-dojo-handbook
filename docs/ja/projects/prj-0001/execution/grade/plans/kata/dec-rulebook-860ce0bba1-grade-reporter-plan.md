---
specdojo:
  id: prj-0001:grade-kata-860ce0bba137-reporter-plan
  type: exec-plan
  rulebook: none
  task_id: GRADE-KATA-860CE0BBA137-REPORTER
  name: "grade reporter: docs/ja/specdojo/rulebooks/dec-rulebook.md"
  mode: review
  status: ready
  project_id: prj-0001
  targets:
    - specdojo:dec-rulebook
---

# Reporter Plan: GRADE-KATA-860CE0BBA137-REPORTER grade: docs/ja/specdojo/rulebooks/dec-rulebook.md

この plan は grade pipeline の reporter stage 用である。executor の最終応答が `<grade_executor_output>` としてこの plan と一緒に渡される。評価やファイル読み取りは行わず、申告済みの判定を GradeSubmission JSON へ忠実に構造化する。

## 1. このタスクで行うこと

executor が申告した全 viewpoint の level と finding を、追加・省略・変更せず GradeSubmission JSON へ写す。

## 2. 対象項目

- `target`: kata
- `rubric`: grade-rubric-v1
- `document_id`: specdojo:dec-rulebook
- `評価対象`: `docs/ja/specdojo/rulebooks/dec-rulebook.md`

## 3. 進め方

1. `<grade_executor_output>` の `[VIEWPOINT <id>]` ごとに `LEVEL` とすべての `FINDING` を読み取る。対象文書や参考資料は読まない。
2. level、severity、line、message を executor の申告どおりにコピーする。message の要約、言い換え、校正を行わない。
3. executor が述べていない finding を追加せず、述べた finding を省略しない。finding の `id` は出力しない。
4. marker が欠けている、値が曖昧、または GradeSubmission の検証規則と矛盾する場合は推測せず異常終了する。

## 4. 完了手順

1. facts である `rubric` と `path` を次のテンプレートから変更しない。
2. すべての agent viewpoint が1回ずつあり、level と finding が executor の申告と一致することを確認する。
3. 正常終了時の最終応答は GradeSubmission JSON オブジェクト1個だけとする。前置き、要約、Markdown コードフェンスを含めない。

```json
{
  "rubric": "grade-rubric-v1",
  "documents": [
    {
      "path": "docs/ja/specdojo/rulebooks/dec-rulebook.md",
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

- `<grade_executor_output>` が渡されていない、または marker 契約を解析できない場合は異常終了する。
- executor の申告を変更しなければ GradeSubmission の契約を満たせない場合は異常終了する。
