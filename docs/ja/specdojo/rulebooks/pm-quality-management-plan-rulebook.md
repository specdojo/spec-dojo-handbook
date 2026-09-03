---
specdojo:
  id: specdojo:pm-quality-management-plan-rulebook
  type: rulebook
  status: ready
  target_format: markdown
  recipe: specdojo:pm-quality-management-plan-recipe
  sample: specdojo:pm-quality-management-plan-sample
  template: specdojo:pm-quality-management-plan-template
  based_on:
    - specdojo:people-and-organization-definition-standard
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 71
    graded_at: "2026-09-03T04:28:19.769Z"
    graded_by: codex-expert-executor
    content_hash: 6a85bb541094f5a30028e2c54c3dbed2e34fd9aecea082f14327b65d07866283
    categories:
      consistency: { score: 50 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 63 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 3, score: 75 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 2, score: 50 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 3, minor: 8, note: 0 }
---

# 品質管理計画 作成ルール

Quality Management Plan Documentation Rulebook

利用者価値と成果物品質を、少数の品質ゲート、証跡、是正方法で管理するためのルールです。成功基準、rulebook、検証手順を再掲せず、いつ何を確認するかを定義します。

## 1. 全体方針

- 品質は、利用者価値の成立と、それを支える成果物・技術条件の両方で判定します。
- 成功基準の条件 ID、成果物rulebook、検証コマンドを正本とし、本書には判定の接続方法だけを書きます。
- 品質目標、メトリクス、検査基準を重複させず、品質ゲートへ統合します。
- 小規模プロジェクトでは、代表試行、主要レビュー、公開前確認など必要なゲートだけを置きます。
- 低コストや継続性を価値に置く場合は、現金支出、作業時間、継続運用負荷を品質判断に含めます。

<!-- specdojo:finding id=F010 severity=minor rule=vp-ux-language-consistency 同じ判断主体を「AI Agent」「人と AI」「Agent」と表記しているため、「AI Agent」など一つの用語へ統一し、人間との判断境界を同じ名称で記述する必要がある。 -->

- AI Agent は検証や指摘整理を支援できますが、利用者価値、例外、公開可否の最終判断は人間が行います。

## 2. 位置づけと用語定義

| 用語       | 定義                                                           |
| ---------- | -------------------------------------------------------------- |
| 品質ゲート | 所定の時点で、条件・証跡・判断者をそろえて合否を確認する仕組み |
| 価値品質   | 利用者・業務・社会に期待する変化が成立したかを示す品質         |
| 成果物品質 | 構造、整合、検証、公開適性など価値提供を支える品質             |
| 不適合     | 品質ゲートの合格条件を満たさない状態                           |

## 3. ファイル命名・ID規則

- 配置は `docs/ja/projects/<project-id>/030-project-management/pm-quality-management-plan.md` を推奨します。
- ID は `<project-id>:pm-quality-management-plan`、ファイル名は `pm-quality-management-plan.md` とします。
- 判定条件は成功基準 ID、受入条件 ID、成果物 ID など安定した識別子で参照します。

## 4. 推奨 Frontmatter 項目

| 項目       | 説明                                           | 必須 |
| ---------- | ---------------------------------------------- | ---- |
| id         | `<project-id>:pm-quality-management-plan`      | ○    |
| type       | `project`                                      | ○    |
| status     | `draft` / `ready` / `deprecated`               | ○    |
| rulebook   | `specdojo:pm-quality-management-plan-rulebook` | ○    |
| based_on   | 管理計画、成功基準など直接根拠となる ID        | 任意 |
| supersedes | 置き換え対象の旧文書 ID                        | 任意 |

<!-- specdojo:finding id=F002 severity=minor rule=vp-arc-conciseness 宣言済み template が見出し・表・記入欄の骨組みの正本であるのに、「本文構成（標準テンプレ）」で番号と見出し順を再掲し、記述ガイドでも関連する表骨格を重ねているため、本章は各章の目的・必須性・記述規約に限定する必要がある。 -->
<!-- specdojo:finding id=F007 severity=major rule=vp-qe-kata-conformance template を文書 ID で宣言しているにもかかわらず rulebook が「標準テンプレ」として見出し骨格を再掲し、さらにその必須内容が template と sample に反映されていないため、骨組みは template、意味要件は rulebook、完成例は全必須要件を埋めた sample という種別境界へ修正する必要がある。 -->
<!-- specdojo:finding id=F009 severity=minor rule=vp-ux-readability 「本文構成（標準テンプレ）」、6章の表、別ファイルの template に同じ構造情報が分散しているため、template を骨組みの参照先とし、rulebook には判断理由・必須性・例外だけを残して読み分けを明確にする必要がある。 -->

## 5. 本文構成（標準テンプレ）

| 番号 | 見出し | 必須 | 内容 |
| ---- | ------ | ---- | ---- |

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency 本文要件で「対象期間、人と AI の境界」と「レビューの出口条件、記録先」を必須とする一方、宣言済み template は対象期間を記入させず、sample は対象期間・AI 判断境界・レビュー出口条件を明示せず列名も変えているため, rulebook・template・sample の必須項目を同一にそろえる必要がある。 -->

| 1 | 品質方針と適用範囲 | ○ | 価値品質、成果物品質、対象期間、人と AI の境界 |
| 2 | 品質ゲート | ○ | 観点、合格条件、方法・証跡、時期、確認・承認責任 |
| 3 | レビューと証跡 | ○ | 対象、観点、実施責任、出口条件、記録先 |
| 4 | 不適合と是正 | ○ | 区分、対応、再判定、記録先 |
| 5 | 見直し条件と未決事項 | 任意 | 見直しトリガー、未決論点、判断者 |

## 6. 記述ガイド

<!-- specdojo:finding id=F005 severity=major rule=vp-qe-omissions-consistency 本文要件で対象期間を必須とする一方、品質方針と適用範囲の記述ガイド、template の記入欄、sample の完成例に対象期間がなく必須要件を満たしたか確認できないため、適用開始・終了または適用フェーズの記入規則を追加する必要がある。 -->
<!-- specdojo:finding id=F008 severity=minor rule=vp-qe-kata-conformance 宣言済み recipe の「各章の書き方」が書き手の答える問いではなく指示文だけで構成され、「レビュー観点」も authoring standard が求める表になっていないため、成果物固有の問いと表形式の確認観点へ整える必要がある。 -->

### 6.1. 品質方針と適用範囲

- 成功基準から、利用者価値として確認する品質を要約します。
- 構造、整合、検証、公開適性など、価値提供を支える成果物品質を示します。
- 詳細な条件やコマンドは正本へ委譲し、本文へ複製しません。

### 6.2. 品質ゲート

<!-- specdojo:finding id=F006 severity=minor rule=vp-qe-omissions-consistency `people-and-organization-definition-standard` を根拠に持ちながら確認者・承認者・実施責任を組織定義や RACI の Role code と照合する規則がないため、責任欄には定義済み Role code を用い RACI と整合させる条件を明記する必要がある。 -->

| ゲート | 品質観点 | 合格条件 | 方法・証跡 | 時期 | 確認者 / 承認者 |
| ------ | -------- | -------- | ---------- | ---- | --------------- |

- 価値品質と成果物品質を区別し、両方を必要なゲートへ配置します。
- 合格条件は成功基準 ID、受入条件 ID、検証結果などを参照します。
- 費用・負荷を扱う場合は、現金支出、作業時間、継続運用負荷を分けます。

### 6.3. レビューと証跡

<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-verifiability 「出口条件・証跡」を一つの列にまとめた結果、sample と生成成果物では証跡だけが記載されレビューの pass / fail 条件が欠落しているため、出口条件と証跡を分離するか両方を必須と明記する必要がある。 -->
<!-- specdojo:finding id=F011 severity=minor rule=vp-ux-language-consistency rulebook と template の「対象・実施責任・出口条件・証跡」に対して sample は「レビュー・実施者・証跡」と異なるラベルを使い意味範囲も狭いため、列名と用語を統一する必要がある。 -->

| 対象 | 主な観点 | 実施責任 | 出口条件・証跡 |
| ---- | -------- | -------- | -------------- |

- レビュー種別を増やすより、対象ごとの主要観点と出口条件を示します。
- 指摘は差分、レビュー記録、登録簿など追跡できる場所へ残します。
- 生成物は正本から再生成し、直接編集を品質是正に使いません。

### 6.4. 不適合と是正

<!-- specdojo:finding id=F004 severity=minor rule=vp-qe-verifiability 「再判定」が再判定する条件・ゲートを指すのか実施責任者を指すのか定義されず、sample と生成成果物では Role code が記載されているため、再判定条件と再判定責任を別々に判定できる列へ分ける必要がある。 -->

| 区分 | 対応 | 再判定 | 記録先 |
| ---- | ---- | ------ | ------ |

- 軽微な修正、価値不適合、構造・検証不適合、公開不適合など対応が異なる区分だけを置きます。
- 是正後は、未達だった条件またはゲートを再判定します。
- 目的・スコープ・成功基準に影響する場合は変更要求または決定として扱います。

### 6.5. 見直し条件と未決事項

- 成功基準、公開範囲、成果物構造、検証方法、重大不適合の傾向が変わった場合に見直します。
- 未決事項は _UNDECIDED_: とし、決定時期と判断者を添えます。
- 品質課題の個票は本書に残さず、登録簿やレビュー記録へ移します。

## 7. 禁止事項

| 禁止事項                                               | 理由                               |
| ------------------------------------------------------ | ---------------------------------- |
| 成功基準、rulebook、検証手順を本文へ複製する           | 判定条件の正本が分散するため       |
| 品質目標、メトリクス、検査基準へ同じ条件を重複記載する | 更新量と不整合が増えるため         |
| 技術検証だけで利用者価値の品質を代替する               | プロジェクト成功を判定できないため |
| 現金支出だけを確認し、人の負荷を除外する               | 負荷転嫁を見逃すため               |
| 生成物を直接修正して不適合を解消する                   | 再生成時に修正が失われるため       |
| Agent に価値、例外、公開可否の最終判断を委ねる         | 人間の判断責任を代替するため       |
