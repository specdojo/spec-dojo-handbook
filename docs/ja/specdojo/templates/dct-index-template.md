---
specdojo:
  id: specdojo:dct-index-template
  type: template
  status: draft
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:dct-index
      type: project
      status: _STATUS_
      rulebook: specdojo:dct-index-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 100
    graded_at: "2026-09-09T18:02:58.057Z"
    graded_by: codex-expert-executor
    content_hash: 3836ae74057c7212d7797c12c0ea59147bc4e7e0853a1789bcea698c57c04586
    categories:
      consistency: { score: 100 }
      usability: { score: 100 }
      architecture: { score: 100 }
      quality: { score: 100 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 4, score: 100 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 0, note: 0 }
---

# 成果物カタログ

Project Deliverables Catalog

> このファイルは `dct-index.yaml` と各 `dct-*.yaml` から生成された一覧ビューです。表示名・概要・順序・グループの正本は `dct-index.yaml` であり、このファイルを手編集しても次回の `specdojo catalog build` で失われます。

SpecDojo プロジェクトで作成する成果物とその説明をまとめたプロジェクト成果物カタログです。
ドメイン別成果物カタログへの参照先を一元管理し、成果物体系の参照起点を明確にします。
個別成果物の詳細情報は各 `dct-<domain>.md` に集約し、本書では共通ルールとドメイン一覧を管理します。

## 1. 共通ルール

- Frontmatter の `id` は `<project-id>:<local-id>` とします。
- `ドメイン` は成果物の分類を示すために使用します。また、`DOMAIN` はその短縮名で、Schedule などで使用します。
- Frontmatter の `based_on` には、直接根拠として参照した文書のみを記載します。
- `local-id` は成果物の論理名を表し、ファイル名および Frontmatter の `id` の基礎として使用します（例: `prj-overview`）。
- `ARTIFACT` は `local-id` の短縮名で、Schedule などで使用します。
- ファイルは以下の形式で命名し、`配置先` に保存します。
  - Markdown の場合は、`<local-id>.md` もしくは `<成果物名>.md`
  - YAML の場合は、`<local-id>.yaml` もしくは `<成果物名>.yaml`
- `根拠` には、その成果物の検討・作成における主要な依存関係を記載します。
- `根拠` と `based_on` は原則として一致させますが、必要に応じて差分があっても構いません。
- 種別は、`work`（作成する成果物）、`control`（管理用のドキュメント）、`generated`（自動生成したドキュメント等）とします。スケジュールへの展開対象は `work` のみです。

## 2. 成果物カタログ一覧

<!-- specdojo:view-slot=domain-tables -->
