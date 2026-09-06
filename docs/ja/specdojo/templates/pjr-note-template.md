---
specdojo:
  id: specdojo:pjr-note-template
  type: template
  status: draft
  frontmatter_template:
    specdojo:
      id: _PJR_DOCUMENT_ID_
      type: project
      status: draft
      rulebook: specdojo:pjr-rulebook
      part_of:
        - _PROJECT_ID_:pjr-index
      item_type: note
      item_status: open
      priority: medium
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 77
    graded_at: "2026-09-06T08:29:14.341Z"
    graded_by: codex-expert-executor
    content_hash: e0f182d405c8d6f770a04f14febd0469c498733750d6e834c85d14b2970a9586
    categories:
      consistency: { score: 50 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 4, minor: 0, note: 0 }
---

# _PJR-XXXX_ _NOTE_TITLE_

## 1. メモ

_TODO_: 後で参照するために残す情報、気づき、補足を記載する。

## 2. 背景・文脈

_TODO_: このメモを残す理由、関連する経緯、参照時の注意点を記載する。

## 3. フォローアップ

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=13 「対応が必要な場合は内容を記載する」では note 内で対応を追跡できるように読め、pjr-rulebook の「別の todo / question / decision を起票し note は参照元として保持する」規則と矛盾するため、別項目の起票と追跡先リンクを案内する記述へ修正する必要がある。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=13 対応・回答・判断が必要になった場合に別の register item を起票し、その文書 ID を追跡先として記載する要件が欠けているため、このままでは note 内だけで対応を管理して PJR の責務境界から逸脱する。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance line=13 note template が対応内容そのものの記載を促しており、対応が必要なら目的に合う別項目を起票するという note 固有の適用方法を表現できていないため、起票対象の種別と追跡先の記載方法を placeholder に明示する必要がある。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-ux-readability line=13 初見の利用者には「対応が必要ならこの節へ対応内容を書く」と読め、別の todo / question / decision を起票して追跡する次の手順が分からないため、別項目の起票とそのリンクだけを記録する旨へ明確化する必要がある。 -->

_TODO_: 対応が必要な場合は内容を記載する。参照のみの場合は `-` とする。

## 4. 関連ドキュメント

- _TODO_: 根拠・影響先・追跡先を `[[doc-id]]` 形式で記載する。
