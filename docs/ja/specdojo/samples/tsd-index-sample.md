---
specdojo:
  id: specdojo:tsd-index-sample
  type: architecture
  status: draft
  rulebook: specdojo:tsd-index-rulebook
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 79
    graded_at: "2026-09-06T04:01:22.726Z"
    graded_by: codex-expert-executor
    content_hash: 1b673dd2dd91e9e344d0fd576212e82e18398b579e93b3c5b1bbba4137b7de78
    categories:
      consistency: { score: 50 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 3, minor: 1, note: 0 }
---

# [技術スタック定義（TSD Index）](../rulebooks/tsd-index-rulebook.md) サンプル

## 1. 技術スタック一覧

| 区分               | 採用技術        | 担当責務                                     |
| ------------------ | --------------- | -------------------------------------------- |
| 言語               | TypeScript 5.x  | フロントエンド・バックエンドの共通実装言語   |
| ランタイム         | Node.js 22.x    | サーバーサイドの実行環境                     |
| Web フレームワーク | Next.js 14.x    | 販売・在庫・顧客管理画面の提供とサーバー処理 |
| DB                 | PostgreSQL 16.x | 販売履歴・在庫・顧客データの永続化           |
| ORM                | Prisma 5.x      | スキーマ定義・マイグレーション・型安全クエリ |
| コードフォーマット | Prettier 3.x    | TypeScript ファイルの書式統一                |
| テスト             | Vitest 2.x      | ユニットテスト・統合テストの実行環境         |
| ソースコード管理   | GitHub          | リポジトリ管理・レビュー・ブランチ戦略       |
| CI/CD              | GitHub Actions  | テスト自動実行・本番デプロイの自動化         |
| ホスティング       | Fly.io          | 販売管理サービスのコンテナ実行・ルーティング |

## 2. 補足

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=20 `tsd-database.md` と `tsd-hosting.md` を参照先として示しているが、該当文書が存在せず Markdown リンクにもなっていないため、実在する詳細成果物へのリンクを追加するか、未作成・例示上の参照であることを明記してください。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-qe-omissions-consistency line=20 rulebook が要求する詳細文書へのリンクが欠落し、記載された2つの参照先も存在しないため、利用可能な Markdown リンクを設けるか、参照記述を現在の成果物構成に合わせて修正してください。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-kata-conformance line=20 完成例の補足がファイル名のコード表記だけで、rulebook の「詳細ドキュメントへのリンクを記載する」を実演していないため、実在する sample 詳細文書への Markdown リンクとして提示してください。 -->
<!-- specdojo:finding id=F004 severity=minor rule=vp-ux-readability line=20 次に見る文書名は識別できるもののリンクとして移動できないため、参照先を Markdown リンクにして読者が詳細へ辿れるようにしてください。 -->

- DB の詳細設定・バージョン固定手順は `tsd-database.md` を参照。
- ホスティング構成・デプロイ手順は `tsd-hosting.md` を参照。
