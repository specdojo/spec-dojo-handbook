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
    verdict: needs-work
    score: 68
    graded_at: "2026-09-06T06:40:03.041Z"
    graded_by: codex-expert-executor
    content_hash: 3836ae74057c7212d7797c12c0ea59147bc4e7e0853a1789bcea698c57c04586
    categories:
      consistency: { score: 38 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 4, score: 100 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 5, minor: 1, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=1 対応 rulebook は `target_format: yaml` で sample も `dct-index.yaml` の完成例を示す一方、本ファイルは `generated/dct-index.md` の Markdown 外枠であり、対象成果物である YAML 正本の template として利用できない。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-omissions-consistency line=1 YAML 正本に必須の `title`、`project_id`、`size`、`groups` と配下の `name`・`domains`／`groups` の骨組みがなく、rulebook と schema が要求する `dct-index.yaml` をこの template から作成できない。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-qe-kata-conformance line=1 `target_format: yaml` の成果物テンプレートであるにもかかわらず Markdown の生成ビュー外枠と view-slot を提供しており、template の「対象成果物の作成開始点」という責務を満たさないため、YAML 雛形を別途用意して rulebook の `template` 宣言を付け替えるか、本ファイルを実践の型から分離する必要がある。 -->

# 成果物カタログ

Project Deliverables Catalog

> このファイルは `dct-index.yaml` と各 `dct-*.yaml` から生成された一覧ビューです。表示名・概要・順序・グループの正本は `dct-index.yaml` であり、このファイルを手編集しても次回の `specdojo catalog build` で失われます。

SpecDojo プロジェクトで作成する成果物とその説明をまとめたプロジェクト成果物カタログです。
ドメイン別成果物カタログへの参照先を一元管理し、成果物体系の参照起点を明確にします。
個別成果物の詳細情報は各 `dct-<domain>.md` に集約し、本書では共通ルールとドメイン一覧を管理します。

## 1. 共通ルール

<!-- specdojo:finding id=F002 severity=major rule=vp-arc-cross-document-consistency line=14 `DOMAIN` と `ARTIFACT` を Schedule で使う短縮名としているが、現行 Schedule は `T-＜TRACK＞-＜local_id＞-＜phase_suffix＞` と `local_id` を使用し、両短縮名の定義項目も存在しないため、識別子規則が Schedule と矛盾している。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-verifiability line=22 `根拠` と `based_on` は「必要に応じて差分があってもよい」とするだけで許容条件を示しておらず、同一プロジェクトの `based_on` が `depends_on` の推移閉包内にあることや参照が解決可能であることを pass / fail 判定できない。 -->
<!-- specdojo:finding id=F006 severity=minor rule=vp-ux-language-consistency line=14 `DOMAIN`／`ARTIFACT` と正規キー `domain`／`local_id` の対応が定義されず、本文ではさらに `local-id` 表記を用いているため、廃止済み短縮名を削除して正規キーへ統一するか明示的な対応表を設ける必要がある。 -->

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
