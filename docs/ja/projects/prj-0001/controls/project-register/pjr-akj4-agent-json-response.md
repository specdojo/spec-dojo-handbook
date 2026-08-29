---
specdojo:
  id: prj-0001:pjr-akj4-agent-json-response
  type: project
  status: ready
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: done
  priority: medium
  owner: ARC
  registered_at: "2026-08-29T13:44:26Z"
  due_on: "2026-09-30"
  completed_at: "2026-08-29T23:41:32Z"
  block_reason: "agent exited with non-zero code: JSON出力契約の実装および静的検証は完了したが、Ollama接続不可のため、実モデルを用いた最終的な動作検証が未完了である。"
  conclusion: plan へ最終応答契約を追加して agent 定義の最終報告指示に優先させ、qwen が GradeSubmission JSON を出力するようにした。あわせて src/agent-response.ts の extractJsonText を追加し、grade と exec-reporter の両方でコードフェンスや前置きを伴う応答から JSON 本体を取り出すようにした。抽出できない応答は従来どおりエラーとし、schema 検証と既存の検証規則は緩めていない。qwen の生出力が手作業なしで grade apply に受理されることを実モデルで確認した。
  register_events:
    - v: 1
      id: reg_e5a8e0d95fb24107846317ebd0d8490d
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
          to: qwen が GradeSubmission JSON を出力できない問題に対処する
        - field: description
          from: ""
          to: qwen-expert-executor は grade の判定そのものは完了しながら、最終ステップの GradeSubmission JSON 出力に到達せず散文で応答を終えた。分析品質は claude に匹敵し、opr-batch-sample の rulebook 宣言と本文参照の不一致という実在の不整合を発見している。出力形式を強制できればローカルモデルでの grade 運用が可能になり、API コストなしで全 kata を評価できる。opencode agent 定義での出力形式指定、JSON スキーマによる制約、plan 側の指示強化のいずれで解決するかを検証する。
        - field: type
          from: ""
          to: todo
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
      id: reg_e895465abb1241f486eedc12ddb996d2
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
      previous_event_id: reg_e5a8e0d95fb24107846317ebd0d8490d
    - v: 1
      id: reg_c2d5e37d255b4e4590c3cca3dd0d06f3
      ts: "2026-08-29T15:25:53Z"
      action: start
      actor: codex-expert-executor
      from_status: open
      to_status: in-progress
      reason: work started
      changes:
        - field: status
          from: open
          to: in-progress
      previous_event_id: reg_e895465abb1241f486eedc12ddb996d2
    - v: 1
      id: reg_24b620ec3ed74494806026dce594ab0e
      ts: "2026-08-29T15:38:32Z"
      action: wait
      actor: codex-expert-executor
      from_status: in-progress
      to_status: waiting
      reason: "agent exited with non-zero code: 実モデル（Qwen API）への接続ができず、JSON 出力が実際に得られるか、およびそれが `grade apply` で受理されるかの検証が完了していないため。"
      changes:
        - field: status
          from: in-progress
          to: waiting
        - field: block_reason
          from: "-"
          to: "agent exited with non-zero code: 実モデル（Qwen API）への接続ができず、JSON 出力が実際に得られるか、およびそれが `grade apply` で受理されるかの検証が完了していないため。"
      previous_event_id: reg_c2d5e37d255b4e4590c3cca3dd0d06f3
    - v: 1
      id: reg_ec416a7badaa4cf29f781bc8865c25af
      ts: "2026-08-29T16:38:51Z"
      action: start
      actor: codex-expert-executor
      from_status: waiting
      to_status: in-progress
      reason: work started
      changes:
        - field: status
          from: waiting
          to: in-progress
      previous_event_id: reg_24b620ec3ed74494806026dce594ab0e
    - v: 1
      id: reg_dce0a599920444cd925140206d0269a8
      ts: "2026-08-29T16:48:29Z"
      action: wait
      actor: codex-expert-executor
      from_status: in-progress
      to_status: waiting
      reason: "agent exited with non-zero code: JSON出力契約の実装および静的検証は完了したが、Ollama接続不可のため、実モデルを用いた最終的な動作検証が未完了である。"
      changes:
        - field: status
          from: in-progress
          to: waiting
        - field: block_reason
          from: "agent exited with non-zero code: 実モデル（Qwen API）への接続ができず、JSON 出力が実際に得られるか、およびそれが `grade apply` で受理されるかの検証が完了していないため。"
          to: "agent exited with non-zero code: JSON出力契約の実装および静的検証は完了したが、Ollama接続不可のため、実モデルを用いた最終的な動作検証が未完了である。"
      previous_event_id: reg_ec416a7badaa4cf29f781bc8865c25af
    - v: 1
      id: reg_773f7c17016046c4be8d88c997314dba
      ts: "2026-08-29T23:35:35Z"
      action: update
      actor: manual
      from_status: waiting
      to_status: waiting
      reason: reporter でも同じ問題が生じており、qwen 固有ではなく agent 共通の応答解析の課題であるため
      changes:
        - field: id
          from: prj-0001:pjr-akj4-qwen-json-output
          to: prj-0001:pjr-akj4-agent-json-response
        - field: title
          from: qwen が GradeSubmission JSON を出力できない問題に対処する
          to: agent の JSON 応答を確実に解析できるようにする
      previous_event_id: reg_dce0a599920444cd925140206d0269a8
    - v: 1
      id: reg_8f0bffbb95484132818bc07903dc625e
      ts: "2026-08-29T23:41:32Z"
      action: review
      actor: manual
      from_status: waiting
      to_status: review
      reason: 共通の JSON 抽出処理を実装し実モデルで検証したため
      changes:
        - field: status
          from: waiting
          to: review
      previous_event_id: reg_773f7c17016046c4be8d88c997314dba
    - v: 1
      id: reg_ba94b9b395ae406a8c845a7c219a7f9b
      ts: "2026-08-29T23:41:32Z"
      action: close
      actor: manual
      from_status: review
      to_status: done
      reason: 実装・検証・レビューが完了したため
      changes:
        - field: status
          from: review
          to: done
        - field: completed
          from: "-"
          to: "2026-08-30"
        - field: conclusion
          from: "-"
          to: plan へ最終応答契約を追加して agent 定義の最終報告指示に優先させ、qwen が GradeSubmission JSON を出力するようにした。あわせて src/agent-response.ts の extractJsonText を追加し、grade と exec-reporter の両方でコードフェンスや前置きを伴う応答から JSON 本体を取り出すようにした。抽出できない応答は従来どおりエラーとし、schema 検証と既存の検証規則は緩めていない。qwen の生出力が手作業なしで grade apply に受理されることを実モデルで確認した。
      previous_event_id: reg_8f0bffbb95484132818bc07903dc625e
---

# PJR-AKJ4 agent の JSON 応答を確実に解析できるようにする

## 1. 概要

agent に JSON を返させる箇所で、生の応答をそのまま解析していたため、前置きやコードフェンスが付くと失敗していた。plan で「JSON だけを出力する」と契約しても、provider やモデルによって前後に文字列が付く。

対象は `grade.ts` の GradeSubmission 解析と `exec-reporter.ts` の ReporterOutput 解析の2箇所である。当初は qwen が GradeSubmission JSON を出力しない問題として起票したが、reporter でも同じ事象が生じており、agent 共通の応答解析の課題であることが判明したため対象を広げた。

## 2. 完了条件

- 前置きやコードフェンスを伴う応答から JSON 本体を取り出せる。
- `grade` と `exec-reporter` の両方が同じ処理を共有する。
- 抽出できない応答は従来どおりエラーとなり、不正な内容を受け入れない。
- schema 検証と既存の検証規則を緩めない。
- 実モデルの出力で動作を確認する。
- `npm run check` が通る。

## 3. 作業内容

| No  | 作業                       | 担当 | 状態 | メモ                                         |
| --- | -------------------------- | ---- | ---- | -------------------------------------------- |
| 1   | 未出力の原因の切り分け     | ARC  | done | agent 定義と plan の指示が競合していた       |
| 2   | 最終応答契約の明示         | ARC  | done | plan の契約を agent 定義の指示より優先させる |
| 3   | 実モデルでの確認           | ARC  | done | qwen が JSON を出力するようになった          |
| 4   | 共通の JSON 抽出処理の実装 | ARC  | done | `src/agent-response.ts` を追加               |
| 5   | 両呼び出し箇所への適用     | ARC  | done | `grade.ts` と `exec-reporter.ts`             |
| 6   | テストの追加と更新         | ARC  | done | 抽出処理8件、reporter の期待値を更新         |

### 3.1. 観測された挙動

比較実験で3つの agent すべてが素の JSON を返さなかった。

| agent  | 出力形式                 | 生出力での解析 |
| ------ | ------------------------ | -------------- |
| claude | コードフェンスで囲む     | 失敗           |
| gemma  | コードフェンスで囲む     | 失敗           |
| qwen   | 作業経過の前置きを付ける | 失敗           |

当初 qwen は JSON をまったく出力せず、判定結果を散文で述べて終了していた。原因は agent 定義の「変更ファイルと検証結果を最終応答へ残す」という指示と、grade の「JSON のみを出力する」要求が競合していたことである。plan へ最終応答契約を追加し、agent 定義の最終報告指示に優先すると明示したことで、JSON を出力するようになった。

ただし作業経過の前置きは残った。指示の強化だけでは形式を保証できないことが実証された。

### 3.2. Ollama の出力形式強制を採らない理由

Ollama には出力を JSON へ強制する指定がある。しかし次の理由で採らない。

- provider 固有である。claude と codex には適用できず、provider ごとに対策を持つことになる。
- thinking を有効化した agent と競合しうる。qwen が実在の不整合を発見できたのは関連文書を読んで思考した結果であり、この能力を損なうリスクがある。
- 新しいモデルを追加するたびに固有の設定を調べる必要が生じる。

応答からの抽出は provider に依存せず、1箇所の実装で全 agent に効く。両者は排他ではないため、必要になれば provider 固有の最適化を併用できる。

### 3.3. 実装

`src/agent-response.ts` に `extractJsonText` を追加した。コードフェンスがあれば中身を取り出し、続いて最初の `{` から最後の `}` までを抽出する。取り出せない場合は入力をそのまま返し、解析の失敗は呼び出し側の検証に委ねる。

抽出後も schema 検証と既存の検証規則はそのまま働くため、不正な内容を受け入れることはない。level 3 以下の viewpoint に非空の `message` を持つ finding を要求する grade の検証も維持される。

`exec-reporter` のテストはコードフェンス付きの応答を拒否することを期待していたが、agent が実際にコードフェンスを付ける以上、拒否すると reporter が動作しない。受理する挙動へ更新し、意図をテスト内に記載した。schema 検証を緩めていないことは、追加プロパティを拒否する検証で担保している。

### 3.4. 検証結果

qwen の生出力（前置きを含む）をそのまま `grade apply` へ渡し、受理されることを確認した。従来は手作業で前置きを除去する必要があった。

## 4. 対応結果

- plan へ最終応答契約を追加し、agent 定義や共通指示の最終報告指示に優先することを明示した。qwen の agent 定義にも、plan が機械可読な最終応答形式を示す場合はそれを優先する旨を追加した。
- `src/agent-response.ts` に `extractJsonText` を追加し、`grade.ts` と `exec-reporter.ts` の両方から呼び出すようにした。
- 抽出処理のテストを8件追加し、`exec-reporter` のテストをコードフェンスを受理する挙動へ更新した。
- qwen の生出力が手作業なしで `grade apply` に受理されることを実モデルで確認した。

## 5. 関連ドキュメント

- [[prj-0001:pjr-vqb5-agent-grade-comparison]]: 3つの agent がいずれも素の JSON を返さないことを観測した実測記録。
- [[prj-0001:pjr-49d2-quality-assessment]]: grade の設計と GradeSubmission の検証規則。
- [[prj-0001:pjr-4tz7-grade-per-document]]: grade plan の構造。最終応答契約の記載先。
