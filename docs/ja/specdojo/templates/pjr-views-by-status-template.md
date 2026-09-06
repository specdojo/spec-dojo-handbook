---
specdojo:
  id: specdojo:pjr-views-by-status-template
  type: template
  status: draft
  frontmatter_template:
    specdojo:
      id: _PROJECT_ID_:pjr-views-by-status
      type: project
      status: ready
      rulebook: specdojo:pjr-rulebook
      part_of:
        - _PROJECT_ID_:pjr-index
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 86
    graded_at: "2026-09-06T09:56:06.966Z"
    graded_by: codex-expert-executor
    content_hash: a0390a3251498a866b2c1913cdaf3e99ca5cbc77b654c2312ad40ab0b25d8fcf
    categories:
      consistency: { score: 63 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 88 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 3, score: 75 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 1, minor: 4, note: 0 }
---

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=1 `frontmatter_template.specdojo.id` が `_PROJECT_ID_:pjr-views-by-status` で生成処理・rulebook も `pjr-views-by-status.md` を出力する一方、成果物カタログ `dct-project-management-template.yaml` は `local_id: pjr-by-status` / `path: pjr-by-status.md` を定義しており、カタログ参照と実生成物が一致しないため、正本の名称に統一する必要がある。 -->
<!-- specdojo:finding id=F004 severity=minor rule=vp-qe-kata-conformance line=1 `specdojo:pjr-rulebook` が `template: not-needed` を宣言する一方、このファイルは生成処理が必須ロードする `type: template` であり、著述標準上の template 要否・所在の正本と実際の適用資産が一致しないため、複数テンプレートを解決できる宣言方式を定めて参照関係を整合させる必要がある。 -->

# 台帳ビュー（状態別）

<!-- specdojo:finding id=F002 severity=minor rule=vp-arc-cross-document-consistency line=3 「正本は個票の Frontmatter」と断定しているが、`pjr-rulebook` はタイトルを個票の H1、説明を個票本文、その他の列を Frontmatter から生成すると定義しているため、項目ごとの正本を正確に記述する必要がある。 -->
<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-omissions-consistency line=3 「再生成可能」だけでは `pjr-rulebook` の派生ビュー直接編集禁止と再生成時の上書きが明示されず、手編集を保持できると誤認し得るため、`specdojo register build` で変更が失われる旨を追記する必要がある。 -->
<!-- specdojo:finding id=F005 severity=minor rule=vp-ux-readability line=3 タイトル・説明を含む項目別の正本と再生成コマンド、上書き挙動が示されず、初見の読者がどこを修正して次に何を実行すべきか判断しにくいため、H1・本文・Frontmatter の役割と `specdojo register build` への導線を追記する必要がある。 -->

> このファイルは各 `pjr-XXXX-<topic>.md`（個票）から生成された派生ビューです。正本は個票の Frontmatter であり、このファイルは再生成可能です。

## 1. 状態別

<!-- specdojo:view-slot=by-status -->
