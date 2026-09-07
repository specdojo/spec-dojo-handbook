---
specdojo:
  id: specdojo:ifx-api-rulebook
  type: rulebook
  status: draft
  target_format: yaml
  recipe: not-needed
  sample: specdojo:ifx-api-sample
  template: not-needed
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 71
    graded_at: "2026-09-02T17:52:02.840Z"
    graded_by: codex-expert-executor
    content_hash: 7d04f1f9f3b4907adaea2beb683ba66e2382e278cebdc00cd7a41e78fdf8118d
    categories:
      consistency: { score: 63 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 3, score: 75 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 3, minor: 7, note: 0 }
---

<!-- specdojo:finding id=F006 severity=minor rule=vp-qe-omissions-consistency Rulebook記述標準が求める独立した英語名と必須章への対応が明示されず、`## 4.1` も `## 4.` と同じ見出し階層になっているため、標準章構成へ整理するか省略理由を示し、メタ情報節を適切な下位見出しにする必要がある。 -->
<!-- specdojo:finding id=F008 severity=minor rule=vp-qe-kata-conformance Rulebook記述標準が指定するタイトル直下の独立した英語名、標準章構成、連続した章番号、適切な見出し階層を満たしていないため、規約内容を維持したままauthoring standard準拠の構成へ再編する必要がある。 -->

# 外部API仕様（External API Specification: EAPIS）作成ルール

外部システム（仕入先、会計、物流、決済など）と連携する **1つのREST APIインターフェース**を、**OpenAPI形式**（YAML 1ファイル）で定義します。

<!-- specdojo:finding id=F009 severity=minor rule=vp-ux-readability EAPISの上位参照元としてESILを示しているが文書ID・パス・参照先がなく、初見の読者が対応する一覧と `spec_ref` の正本を特定できないため、解決可能な関連文書参照を追加する必要がある。 -->

EAPIS は ESIL（外部システムIF一覧）から参照される「詳細仕様」です。
ESIL 側の `spec_ref: ifx-api-...` は、このEAPISのID（およびファイル名）と対応させます。

## 1. ファイル規約

- ファイル名: `ifx-api-<短い英小文字ハイフン>.yaml`
- ESILからの参照: `spec_ref: ifx-api-...`（例: `ifx-api-payment`）
- 1ファイル = 1つのAPI（1つの外部連携インターフェース）

## 2. OpenAPIバージョン

- **OpenAPI 3.0.3**（推奨）または **OpenAPI 3.1.x** を利用する
- 本リポジトリでは互換性のため **3.0.3** を第一候補とする

## 3. 記載方針（必須）

- **外部との合意に必要な最小十分**を記載する（内部実装の都合は書かない）
- `paths` は **実際に提供/利用するエンドポイントのみ**定義する
- `operationId` は英字で一意にする（例: `createPayment`）
- スキーマは `components/schemas` に集約し、`$ref` で参照して使い回す
- 認証は `components/securitySchemes` に定義し、`security` で適用する
- **メタ情報は `x-spec-meta` に集約**し、トレーサビリティを確保する
- **payloadのプロパティ名は snake_case を推奨**（例: `order_id`, `payment_status`）

禁止（書かない）:

- DB物理テーブル名・物理カラム名・SQL全文
- 実装クラス/関数名・内部モジュール構成
- UI操作の逐語列挙

<!-- specdojo:finding id=F003 severity=major rule=vp-qe-verifiability OpenAPI 3.0.3/3.1で必須の `info.version` と各Operationの `responses` が必須構造・記載方針に含まれず、このrulebookの条件をすべて満たしても無効なOpenAPI文書が成立するため、両項目の必須条件と検証方法を追加する必要がある。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-qe-omissions-consistency 必須構造から `info.version` およびOperationごとの `responses` が漏れており、宣言したOpenAPIバージョンの必須事項とrulebookの受入条件が整合しないため追加する必要がある。 -->
<!-- specdojo:finding id=F007 severity=major rule=vp-qe-kata-conformance `target_format: yaml` の必須キー定義から `info.version` とOperationの `responses` が欠落し、参照 sample も `info.version` を持たない無効なOpenAPI完成例になっているため、rulebookを正として必須条件を追加しsampleも同時に整合させる必要がある。 -->

## 4. 必須構造（OpenAPI YAML）

最低限、以下を必ず含めます。

- `openapi`
- `info`（`title`を含む）
- `x-spec-meta`（`id`, `type`, `status` を含む）
- `servers`（少なくとも1つ）
- `paths`（少なくとも1つ）

## 4.1 メタ情報（x-spec-meta）

仕様のトレーサビリティ管理のため、以下を `x-spec-meta` に含めます。

| キー | 説明 | 必須 |
| ---- | ---- | ---- |

<!-- specdojo:finding id=F001 severity=minor rule=vp-arc-cross-document-consistency 参照 sample の `x-spec-meta.id` は `specdojo:ifx-api-sample` であり、ここで規定する `ifx-api-...` および ESIL の `spec_ref` と対応するIDの完成例になっていないため、sample 用IDの例外を規定するかESIL連携用IDを別途例示する必要がある。 -->

| id | API仕様ID（`ifx-api-...`）、ESILの `spec_ref` と対応 | ○ |
| type | `api` 固定 | ○ |
| status | `draft` / `ready` / `deprecated` | ○ |
| based_on | 根拠となる他仕様のIDリスト（例: `["ifx-api-auth"]`） | 任意 |

<!-- specdojo:finding id=F004 severity=minor rule=vp-qe-verifiability 見出しはエラー定義を「推奨」とする一方、本文は列挙した応答を「少なくとも定義します」と必須表現にしておりpass/failを一意に判定できないため、必須・条件付き必須・推奨のいずれかへ統一する必要がある。 -->
<!-- specdojo:finding id=F010 severity=minor rule=vp-ux-language-consistency 「エラー定義（推奨）」と「少なくとも以下を定義します」が同じ節で異なる必須度を表し読み手を混乱させるため、「必須」「条件付き必須」「推奨」の用語を統一する必要がある。 -->

## 5. エラー定義（推奨）

<!-- specdojo:finding id=F002 severity=minor rule=vp-arc-cross-document-consistency 参照 sample は `400`・`401`・`500` だけを定義し、ここで「少なくとも」とする `403`・`404`・`409`・`429` を含まないため、必要な応答をsampleへ追加するか省略可能な条件をrulebookへ明記する必要がある。 -->

外部連携では、少なくとも以下のエラーレスポンスを定義します。

- `400`（入力不正）
- `401`（認証）/ `403`（認可）
- `404`（リソースなし）
- `409`（競合）
- `429`（レート制限）
- `500`（内部エラー）

共通形式（例: `components/schemas/ErrorResponse`）を用意し、各operationから参照する運用を推奨します。
