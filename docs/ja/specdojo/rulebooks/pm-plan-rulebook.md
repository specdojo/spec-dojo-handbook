---
specdojo:
  id: specdojo:pm-plan-rulebook
  type: rulebook
  status: ready
  target_format: markdown
  recipe: specdojo:pm-plan-recipe
  sample: specdojo:pm-plan-sample
  template: specdojo:pm-plan-template
  based_on:
    - specdojo:people-and-organization-definition-standard
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 62
    graded_at: "2026-09-03T04:06:27.979Z"
    graded_by: codex-expert-executor
    content_hash: c81464a0950a1913861ad96539e8bdeb78498387025c44fb51835d4d623a2f37
    categories:
      consistency: { score: 38 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 38 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 3, score: 75 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 10, minor: 4, note: 0 }
---

# プロジェクト管理計画 作成ルール

Project Management Plan Documentation Rulebook

プロジェクトの価値、スコープ、成功基準を、実行時の管理・判断・証跡へ接続するためのルールです。個別計画や管理台帳の内容を再掲せず、横断的な管理方針だけを定義します。

## 1. 全体方針

- 管理計画は、何を管理し、どの逸脱を、誰が、どの証跡で判断するかを示します。

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency プロジェクト概要・スコープ・成功基準を直接の根拠と定めている一方、`dct-project-management-template.yaml` の `pm-plan.depends_on` は空配列であり、前提成果物への依存が Schedule・scaffold に展開されないため、カタログまたは本書の依存方針を統一する必要がある。 -->

- プロジェクト概要、スコープ、成功基準を直接の根拠とし、作業完了ではなく期待価値の検証を管理目的にします。
- 小規模プロジェクトでは一つの統合表を基本とし、規模・契約・監査要件がある場合だけ個別計画へ展開します。
- 品質、コミュニケーション、組織、RACI、Schedule、登録簿は各正本へ委譲し、本書に一覧や詳細手順を複製しません。
- 現金支出、人の作業時間、継続運用負荷を区別し、人への負荷転嫁をコスト削減とみなしません。
- AI Agent は整理・更新・検証を支援できますが、優先順位、例外、公開、GO / Not GO の最終判断は人間が担います。

## 2. 位置づけと用語定義

| 用語             | 定義                                                                     |
| ---------------- | ------------------------------------------------------------------------ |
| 統合管理方針     | スコープ、Schedule、費用・負荷、品質、課題・リスク・変更を一表で扱う方針 |
| 判断ゲート       | 継続、公開、変更、停止などを人間が判断する時点と条件                     |
| 正本             | 状態、責任、判断根拠を最終的に確認する文書、YAML、登録簿、または記録     |
| 軽量プロファイル | 必要最小限の統合表と判断ゲートで管理する方式                             |
| 拡張プロファイル | 契約、監査、組織規模に応じ、個別計画や詳細手順を追加する方式             |

## 3. ファイル命名・ID規則

- 配置は `docs/ja/projects/<project-id>/030-project-management/pm-plan.md` を推奨します。
- ID は `<project-id>:pm-plan`、ファイル名は `pm-plan.md` とします。
- Role code、member、Schedule owner の識別規則は組織・ロールの正本に従います。

## 4. 推奨 Frontmatter 項目

| 項目     | 説明                             | 必須 |
| -------- | -------------------------------- | ---- |
| id       | `<project-id>:pm-plan`           | ○    |
| type     | `project`                        | ○    |
| status   | `draft` / `ready` / `deprecated` | ○    |
| rulebook | `specdojo:pm-plan-rulebook`      | ○    |

<!-- specdojo:finding id=F007 severity=major rule=vp-qe-omissions-consistency 全体方針では概要・スコープ・成功基準を直接の根拠と必須化し、template もそれらを `based_on` に生成する一方、本表では `based_on` を任意としているため、rulebook 単体利用時にも根拠参照が欠落しない必須条件へ統一する必要がある。 -->

| based_on | 概要、スコープ、成功基準、組織定義など直接根拠となる ID | 任意 |
| supersedes | 置き換え対象の旧文書 ID | 任意 |

<!-- specdojo:finding id=F005 severity=minor rule=vp-arc-conciseness Frontmatter で `pm-plan-template` を宣言しているにもかかわらず、同じ見出し順と必須区分を「本文構成（標準テンプレ）」として再掲しており、template を骨組みの正本とする Rulebook 記述標準に従って章固有の意味要件だけへ整理する必要がある。 -->
<!-- specdojo:finding id=F008 severity=minor rule=vp-qe-kata-conformance template 宣言済みの系統で見出し・表の骨組みを rulebook に再掲しており、rulebook は意味要件、template は骨組みという種別責務を明確に分離する必要がある。 -->
<!-- specdojo:finding id=F014 severity=minor rule=vp-ux-readability 「本文構成（標準テンプレ）」が宣言済み template の見出し一覧を重複して示すため、読者がどちらを骨組みの正本として参照すべきか迷わないよう、章を意味要件中心へ改める必要がある。 -->

## 5. 本文構成（標準テンプレ）

| 番号 | 見出し                       | 必須 | 内容                                                   |
| ---- | ---------------------------- | ---- | ------------------------------------------------------ |
| 1    | 管理目的と適用方針           | ○    | 価値、対象期間、軽量・拡張プロファイル、人と AI の境界 |
| 2    | 統合管理方針                 | ○    | 管理対象、基準・上限、確認契機、逸脱時対応、責任       |
| 3    | 判断ゲートとエスカレーション | ○    | 判断条件、材料、起案者、最終判断者、証跡               |
| 4    | 正本・報告・見直し           | ○    | 情報別の正本、報告契機、見直しトリガー                 |
| 5    | 未決事項                     | 任意 | 未決論点、決定時期、判断者                             |

## 6. 記述ガイド

### 6.1. 管理目的と適用方針

- 概要・スコープ・成功基準から、管理対象となる価値と期間を要約します。
- 軽量プロファイルか拡張プロファイルかを明記し、拡張する条件を示します。
- 人間と AI Agent の判断・実行境界を 1〜3 文で示します。

### 6.2. 統合管理方針

管理領域ごとに別章を作らず、次の一表へ統合します。品質やコミュニケーションの詳細は個別計画へ委譲します。

<!-- specdojo:finding id=F006 severity=major rule=vp-qe-verifiability 統合管理表に価値・リスクまたは根拠 ID と証跡・正本を結ぶ列や結合 ID がなく、冒頭で要求する「どの証跡で判断するか」と recipe の管理対象単位の Trace を pass / fail 判定できないため、各行から根拠と証跡を追跡できる構造を定義する必要がある。 -->
<!-- specdojo:finding id=F009 severity=major rule=vp-qe-kata-conformance recipe の仕上げチェックは管理対象ごとに価値またはリスクから証跡まで一続きで追跡することを要求するが、rulebook と template の統合管理表にはその対応を保持する欄がなく、適用方法が一致していない。 -->

| 管理対象 | 基準・上限 | 確認契機 | 逸脱時対応 | 責任 |
| -------- | ---------- | -------- | ---------- | ---- |

<!-- specdojo:finding id=F002 severity=major rule=vp-arc-cross-document-consistency 成果物カタログの `pm-plan` 完了条件は構成管理・技術管理の観点を要求しているが、統合管理方針の管理対象にその観点も委譲先もなく、rulebook に従った成果物がカタログの完了条件を満たせないため整合させる必要がある。 -->

- スコープ、Schedule、費用・負荷、品質、課題・リスク・変更のうち、実際に管理する対象だけを行にします。

<!-- specdojo:finding id=F010 severity=major rule=vp-qe-kata-conformance 現金支出・作業時間・継続運用負荷を分ける規則に対し、sample は「参加者の時間」一行へ試用準備時間と日常操作負荷を混在させているため、完成例でも三者を区別する必要がある。 -->

- 費用を扱う場合は、現金支出、作業時間、継続運用負荷を分けます。
- 課題・リスク・変更・決定は登録簿へ記録し、本文に個票を持ちません。

### 6.3. 判断ゲートとエスカレーション

| ゲート | 判断条件 | 判断材料 | 起案・整理 | 最終判断 | 証跡 |
| ------ | -------- | -------- | ---------- | -------- | ---- |

- 公開、主要変更、例外、継続・停止など、人間の判断が必要なゲートだけを記載します。

<!-- specdojo:finding id=F003 severity=major rule=vp-arc-cross-document-consistency `pm-plan-sample.md` の判断ゲートは実在する `SC-01` と `AC-01`〜`AC-04` を条件 ID で参照せず、条件不足時の扱いも示していないため、本書が要求する成功基準との追跡方法を完成例へ適用する必要がある。 -->
<!-- specdojo:finding id=F011 severity=major rule=vp-qe-kata-conformance 条件 ID と不足時の扱いを要求しているのに、sample の判断ゲートは「初期成功基準と受入条件」などの総称だけを記載しており、rulebook の適用例として成立していない。 -->

- 成功基準を再掲せず、参照する条件 ID と不足時の扱いを示します。
- 「必要に応じて」ではなく、エスカレーションする条件を判定可能にします。

### 6.4. 正本・報告・見直し

| 情報 | 正本 | 更新・報告契機 | 主な確認者 |
| ---- | ---- | -------------- | ---------- |

<!-- specdojo:finding id=F004 severity=major rule=vp-arc-cross-document-consistency 本書と組織定義 sample は成果物責任の正本を RACI としているが、`pm-plan-sample.md` は「作業順序・担当」の正本を Schedule のみとし RACI を示していないため, Task owner と成果物責任の正本が混同されないよう統一する必要がある。 -->
<!-- specdojo:finding id=F012 severity=major rule=vp-qe-kata-conformance RACI を正本として示す要件に対し、sample の正本表は担当情報を Schedule のみに割り当てて RACI を欠いており、組織定義 sample とも適用結果が矛盾している。 -->

- Schedule、RACI、費用・作業記録、品質証跡、登録簿などの正本を示します。
- 定期報告を必須にせず、判断・逸脱・作業節目など必要な契機を定めます。
- 目的、スコープ、成功基準、体制、外部条件が変わった場合の見直し先を示します。

### 6.5. 未決事項

<!-- specdojo:finding id=F013 severity=minor rule=vp-qe-kata-conformance 未決事項に `_UNDECIDED_:` を付ける規則と template の「現状」欄に対し、sample は未決論点をラベルなしで記載しているため、完成例へ共通ラベルを適用する必要がある。 -->

- 未決事項は _UNDECIDED_: とし、決定時期と判断者を添えます。
- 期限を過ぎた未決事項は、課題または判断事項として登録簿へ移します。
- 継続的に追跡する事項を本文へ残さず、正本となる管理記録へ委譲します。

## 7. 禁止事項

| 禁止事項                                               | 理由                             |
| ------------------------------------------------------ | -------------------------------- |
| 個別計画、RACI、Role code 一覧、登録簿の内容を再掲する | 正本が分散し、更新量が増えるため |
| 管理対象を網羅目的で増やし、基準や逸脱時対応を置かない | 実行時の判断に使えないため       |
| 現金支出だけを費用とし、人の作業・運用負荷を除外する   | 負荷転嫁を見逃すため             |
| 成功基準を本文へ複製する                               | 判定条件の正本が分散するため     |
| Agent に例外、公開、GO / Not GO の最終判断を委ねる     | 人間の説明責任を代替するため     |
| 個人情報、認証情報、秘密情報、実装詳細を記載する       | 公開適性と文書責務に反するため   |
