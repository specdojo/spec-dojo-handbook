---
specdojo:
  id: specdojo:pm-organization-sample
  type: project
  status: ready
  rulebook: specdojo:pm-organization-rulebook
  based_on:
    - specdojo:prj-overview-sample
    - specdojo:prj-stakeholder-register-sample
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 64
    graded_at: "2026-09-05T19:46:51.191Z"
    graded_by: codex-expert-executor
    content_hash: c9ae215fcfd6da49907b26289c91f4355bd140e900f8660c69ecc2b696581302
    categories:
      consistency: { score: 38 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 7, minor: 4, note: 0 }
---

# 組織定義: 駄菓子屋きぬや 販売管理システム

## 1. 組織モデル

店主を人間の最終判断者とし、家族利用者、開発担当、必要に応じた AI Agent が協働する小規模な兼務体制とする。専任部署を前提にせず、次の責任領域が欠けないことを優先する。

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=10 「計画・調整」の最終判断を PM に一括しているが、`pm-raci-sample.md` では費用・参加時間上限の A は PO、作業順序・課題・リスク管理の A は PM であるため、判断項目を分割して最終判断者を一致させてください。 -->
<!-- specdojo:finding id=F002 severity=major rule=vp-arc-cross-document-consistency line=11 「実現・品質」の最終判断を PO に一括しているが、`pm-raci-sample.md` では実装・データ設計の A/R は DEV、品質計画・試験結果の A は PO であるため、実現と品質を分けて責任割当を一致させてください。 -->
<!-- specdojo:finding id=F011 severity=minor rule=vp-ux-language-consistency line=9 「実行・確認」欄で Role code の `BA` と Role code を持たないステークホルダー名の「家族利用者」を同列に記載しているため、内部 Role と利用者による確認を別列または注記で区別してください。 -->

| 責任領域   | 設計方針                                 | 最終判断 | 実行・確認     |
| ---------- | ---------------------------------------- | -------- | -------------- |
| 価値・業務 | 店舗課題、優先順位、利用継続を判断する   | PO       | BA、家族利用者 |
| 計画・調整 | 作業順序、課題、費用・時間上限を管理する | PM       | PM             |
| 実現・品質 | 実装、検証、是正、公開適性を分けて扱う   | PO       | DEV、QE        |

AI Agent は草案、整理、実装、検証を支援できるが、費用、受入、公開、継続の最終判断は行わない。

## 2. ロール・owner方針

<!-- specdojo:finding id=F003 severity=major rule=vp-arc-cross-document-consistency line=17 `pm-roles.yaml` を使用可能 Role code の正本としているため、組織定義が採用／未採用 Role と使用可能な owner を保持する上位標準の責務に反し、`pm-roles-sample.yaml` の8ロールと5ロールだけを使う RACI の関係も判定できないので、本書に採用判断と owner 可否を明示してください。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-verifiability line=17 使用可能な owner を具体的な Role code で確定していないため, Schedule の owner と RACI 列を pass / fail 判定できないので、採用 Role と owner 使用可否の一覧を本書に追加してください。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-qe-omissions-consistency line=17 上位標準が必須とする採用 Role、未採用 Role と代替方針、使用可能な owner が欠落しているため、プロジェクト固有の採用判断を `pm-roles.yaml` へ委譲せず本書に追加してください。 -->
<!-- specdojo:finding id=F009 severity=major rule=vp-qe-kata-conformance line=17 sample が採用／未採用 Role と使用可能 owner を `pm-roles.yaml` へ委譲する完成例を示しており、上位標準が `pm-organization.md` に求める適用方法と矛盾するため、プロジェクト固有の採用判断を埋めた例へ修正してください。 -->
<!-- specdojo:finding id=F010 severity=major rule=vp-ux-readability line=17 組織定義の中心判断である採用／未採用 Role と使用可能 owner が示されず、読者が `pm-roles.yaml`、責任領域表、RACI の関係を読み分けられないため、本書に採用結果と owner 可否を明示してください。 -->

- 使用可能な Role code は `pm-roles.yaml` を正本とする。
- 実行主体と兼務割り当ては `pm-members.yaml` を正本とする。
- Schedule の `owner` には Role code だけを使用し、個人名や agent 名は使用しない。
- 小規模運用では1人が複数ロールを兼務できるが、判断責任と作業責任は RACI 上で区別する。

## 3. 正本と責任境界

<!-- specdojo:finding id=F007 severity=minor rule=vp-qe-omissions-consistency line=24 正本表に `specdojo:people-and-organization-definition-standard` への参照がなく、Role・Member・owner・RACI の共通定義へ到達できないため、関連文書として追加してください。 -->

| 情報                   | 正本                   |
| ---------------------- | ---------------------- |
| Role code と責務       | `pm-roles.yaml`        |
| 実行主体と兼務         | `pm-members.yaml`      |
| 成果物・判断の責任     | `pm-raci.md`           |
| 関係者の関心・情報要求 | ステークホルダー登録簿 |

本書には人物一覧や詳細な RACI を複製しない。

## 4. 見直し条件

<!-- specdojo:finding id=F005 severity=minor rule=vp-qe-verifiability line=35 「兼務による滞留」と「必要な責務から先に分離する」には判定条件、確認事項、更新先がなく見直し実施を再現できないため、観測可能なトリガーと確認方法、更新対象、判断者を明記してください。 -->
<!-- specdojo:finding id=F008 severity=minor rule=vp-qe-omissions-consistency line=35 rulebook・recipe・template が見直し条件に求める更新先と判断者が欠落しているため、各トリガーについて確認事項、更新先、判断者を記載してください。 -->

参加者の増減、兼務による滞留、新しい責任領域、公開・運用責任の発生時に見直す。見直し時も、人間の PO に最終判断を残し、必要な責務から先に分離する。
