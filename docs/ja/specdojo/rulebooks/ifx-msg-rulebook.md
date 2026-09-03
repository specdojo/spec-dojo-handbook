---
specdojo:
  id: specdojo:ifx-msg-rulebook
  type: rulebook
  status: draft
  target_format: yaml
  recipe: not-needed
  sample: specdojo:ifx-msg-sample
  template: not-needed
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: pass
    score: 98
    graded_at: "2026-09-02T18:57:39.385Z"
    graded_by: gemma-expert-executor
    content_hash: 2cbbd5289d4f20f84a0109cdd758106decbbb6baeb1f2a229b49ea29881826fa
    categories:
      consistency: { score: 100 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 100 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 4, score: 100 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 4, score: 100 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 0, minor: 2, note: 0 }
---

# 外部メッセージ仕様（External Message Specification: EMS）作成ルール

外部システム（物流、決済、会計など）との非同期連携のために、**メッセージング仕様**を定義します。

EMS は ESIL（外部システムIF一覧）から参照される「詳細仕様」です。
ESIL 側の `spec_ref: ifx-msg-...` は、このEMSのID（およびファイル名）と対応させます。

この章では **表ではなく YAML 1ファイル**で EMS を管理します。
フォーマットは **AsyncAPI + CloudEvents**（YAML）を正とします。

## 1. ファイル規約

- ファイル名: `ifx-msg-<短い英小文字ハイフン>.yaml`
- ESILからの参照: `spec_ref: ifx-msg-...`（例: `ifx-msg-stock-changed`）
- 1ファイル = 1つのメッセージング仕様（1つのイベント群/チャネル群）

## 2. バージョン

- **AsyncAPI 2.6.0**（推奨）を第一候補とする（ツール互換性が高いため）
- CloudEvents は **1.0** を前提とする

## 3. 記載方針（必須）

- **外部との合意に必要な最小十分**を記載する（内部実装の都合は書かない）
- メッセージのエンベロープは **CloudEvents** とし、イベント属性を明示する
- チャネル（topic/queue）や方向（publish/subscribe）を明確にする
- payload（`data`）のスキーマは `components/schemas` に集約し、参照で使い回す
- **メタ情報は `x-spec-meta` に集約**し、トレーサビリティを確保する

禁止（書かない）:

- DB物理テーブル名・物理カラム名・SQL全文
- 実装クラス/関数名・内部モジュール構成
- UI操作の逐語列挙

## 4. 必須構造（AsyncAPI YAML）

最低限、以下を必ず含めます。

- `asyncapi`
- `info`（`title`, `version` を含む）

<!-- specdojo:finding id=F001 severity=minor rule=vp-ux-readability 成果物の位置づけについて言及があるが、関連するルールブックやガイドへのリンクがなく、ナビゲーションが不十分である。 -->

- `x-spec-meta`（`id`, `type`, `status` を含む）
- `channels`（少なくとも1つ）
- `components/messages`（少なくとも1つ）

## 4.1 メタ情報（x-spec-meta）

仕様のトレーサビリティ管理のため、以下を `x-spec-meta` に含めます。

| キー     | 説明                                                        | 必須 |
| -------- | ----------------------------------------------------------- | ---- |
| id       | メッセージ仕様ID（`ifx-msg-...`）、ESILの `spec_ref` と対応 | ○    |
| type     | `message` 固定                                              | ○    |
| status   | `draft` / `ready` / `deprecated`                            | ○    |
| based_on | 根拠となる他仕様のIDリスト（例: `["ifx-api-auth"]`）        | 任意 |

## 5. CloudEventsルール（必須）

CloudEventsの「属性」は仕様で名前が固定です（snake_caseに変換しません）。最低限、以下を含めます。

- `specversion`: `"1.0"`
- `type`: イベント種別（例: `com.kinuya.stock.changed.v1`）
- `source`: イベント発生元（URI形式推奨、例: `"/inventory"`）
- `id`: イベントID（重複しない）
- `time`: 発生時刻（RFC3339）
- `datacontenttype`: `application/json`
- `subject`: 任意（推奨。対象を識別できる文字列）

<!-- specdojo:finding id=F002 severity=minor rule=vp-ux-readability 禁止事項に理由（例：設計詳細への委譲など）が記載されていないため、記述範囲の境界判断が困難である。 -->

- `data`: 業務ペイロード（この中のプロパティ名は snake_case 推奨）
