---
specdojo:
  id: specdojo:prj-stakeholder-register-sample
  type: sample
  status: ready
  rulebook: specdojo:prj-stakeholder-register-rulebook
  based_on:
    - specdojo:prj-overview-sample
  supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 59
    graded_at: "2026-09-06T00:14:06.788Z"
    graded_by: codex-expert-executor
    content_hash: 17af56a5b53441e4d082f2a58eb09b3fd95e09189a8deea67daa25d269455286
    categories:
      consistency: { score: 25 }
      usability: { score: 67 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 3, score: 75 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 8, minor: 8, note: 0 }
---

# ステークホルダー登録簿（サンプル）: 駄菓子屋きぬや販売管理システム

本書は、駄菓子屋きぬやの販売管理システム構築プロジェクトに関わる関係者を整理する例である。店主代表の優先事項と利用者の操作負荷を明確にし、後続のコミュニケーション計画の入力とする。

<!-- specdojo:finding id=F012 severity=minor rule=vp-qe-kata-conformance line=5 対象を「責任を負う個人または組織だけ」と限定する説明は、rulebook が対象とする影響受容者・集団および本書自身の家族利用者と矛盾するため、関与または影響を受ける役割・組織・集団を対象とする説明へ修正する必要がある。 -->
<!-- specdojo:finding id=F014 severity=minor rule=vp-ux-readability line=5 「責任を負う個人または組織だけ」という対象説明と、影響受容者である家族利用者を掲載する本文が一致せず、登録対象の識別基準を誤読させるため、影響を受ける集団も含む説明に修正する必要がある。 -->

単一店舗・小規模開発のため、責任を負う個人または組織だけを記載し、「人物名」や連絡先は扱わない。

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=7 `based_on` の `prj-overview-sample` は常連顧客である子どもや近所の大人のつけ情報を管理対象としており成果の影響を受ける集団だが、関係者一覧に当該影響受容者がなく、期待・懸念・合意・情報要求を追跡できないため、役割名または集団名で追加する必要がある。 -->
<!-- specdojo:finding id=F007 severity=major rule=vp-qe-omissions-consistency line=7 上位概要でつけ情報を管理される常連顧客である子どもや近所の大人が影響受容者として欠落しており、当該集団の期待、懸念、必要な合意、情報要求を管理できないため、関係者一覧と後続各章へ追加する必要がある。 -->
<!-- specdojo:finding id=F010 severity=major rule=vp-qe-kata-conformance line=7 rulebook が成果から影響を受ける集団の登録を要求しているのに、上位概要でつけ情報を管理される常連顧客である子どもや近所の大人がなく、sample が影響受容者を洗い出す完成例として機能しないため追加する必要がある。 -->

## 1. 関係者一覧

| ID                | 関係者       | 関与区分                | 所属/組織      | 対応 Role code | 主な責任                                         | 備考                         |
| ----------------- | ------------ | ----------------------- | -------------- | -------------- | ------------------------------------------------ | ---------------------------- |
| `STH-SHOP-OWNER`  | 店主代表     | スポンサー / 意思決定者 | きぬや         | `PO`           | システムの目的、優先順位、最終的な業務判断を行う | システム作成を許可した決定者 |
| `STH-DEVELOPER`   | 開発担当     | 実行担当者              | きぬや（家族） | `DEV`          | 要件定義から実装までを行い、店主に確認する       | CoderDojo で学んだ知識を活用 |
| `STH-TECH-MENTOR` | 技術メンター | 外部協力者              | きぬや（外部） | -              | 設計方針の助言を行う                             | 週次相談                     |
| `STH-FAMILY-USER` | 家族利用者   | 利用者 / 影響受容者     | きぬや（周辺） | -              | 導入後に同じ手順で操作できるか確認する           | リリース時点で操作性を確認   |

## 2. 影響度/関心度分析

| ID                | 関係者       | 影響度 | 関心度 | 主な期待                                 | 主な懸念                                         | 必要な合意                             | 評価根拠                                   |
| ----------------- | ------------ | ------ | ------ | ---------------------------------------- | ------------------------------------------------ | -------------------------------------- | ------------------------------------------ |
| `STH-SHOP-OWNER`  | 店主代表     | High   | High   | 日常的な操作だけで在庫と販売管理を行える | システムが複雑になり、日々の記録が行われなくなる | システムの目的、優先機能、リリース範囲 | プロジェクト全体の方向性を決定し判断する   |
| `STH-DEVELOPER`   | 開発担当     | Medium | High   | 要件が決まってから設計・実装を行える     | 変更による手戻りが発生                           | 機能範囲、完了定義、確認方法           | 品質と進捗に直接的な影響を持つ             |
| `STH-TECH-MENTOR` | 技術メンター | Medium | Low    | 設計方針が共有されれば補完が進む         | 無理のない開発範囲で作成されているか             | データモデルと画面構造の方向性         | 週次相談で影響するが、日常運用は関与しない |
| `STH-FAMILY-USER` | 家族利用者   | High   | Medium | 習熟なしでも既存手順に近い操作ができる   | システムに慣れることができなくなる               | UI の操作性検証結果と手順書            | 導入後の継続利用を左右する                 |

## 3. エンゲージメント方針

<!-- specdojo:finding id=F002 severity=major rule=vp-arc-cross-document-consistency line=32 `STH-FAMILY-USER` の試利用時点が、`prj-overview-sample` の「初期リリース前」および本書41行の「リリース前」に対して「リリース後」となっているため, 受入確認の実施時点を初期リリース前に統一する必要がある。 -->
<!-- specdojo:finding id=F003 severity=minor rule=vp-arc-cross-document-consistency line=31 rulebook と recipe が詳細な会議日時や配信頻度をコミュニケーション計画へ委譲する一方、「週次相談／週次」が関係者一覧、エンゲージメント方針、コミュニケーション要件で重複管理されているため、登録簿に残す期限条件の範囲を統一する必要がある。 -->
<!-- specdojo:finding id=F004 severity=minor rule=vp-arc-conciseness line=31 技術メンターの「週次相談／週次」が関係者一覧、エンゲージメント方針、コミュニケーション要件で反復され、同じ行でも対応方針と期限に頻度を重ねているため、登録簿には期限条件を一か所だけ残し詳細頻度はコミュニケーション計画へ委譲する必要がある。 -->
<!-- specdojo:finding id=F005 severity=minor rule=vp-qe-verifiability line=30 `STH-DEVELOPER` の目標「要件に基づいた着実な進捗」は、完了状態、判定時点、確認対象のいずれも特定できず pass / fail を判定できないため、観測可能な進捗状態に置き換える必要がある。 -->
<!-- specdojo:finding id=F006 severity=minor rule=vp-qe-verifiability line=32 `STH-FAMILY-USER` の目標「システムで店番を行える」と証跡「Issue」だけでは、どの操作をどの支援条件で完了すれば達成か判定できないため、上位概要の販売記録・在庫確認・つけ残高確認の初期公開指標に対応付ける必要がある。 -->
<!-- specdojo:finding id=F008 severity=major rule=vp-qe-omissions-consistency line=32 `STH-FAMILY-USER` の対応方針は「リリース後に試利用させる」だが、同じ ID の備考は「リリース時点」、コミュニケーション要件は「リリース前の試利用」としており、受入確認をいつ実施するか一意に判断できないため、時点を統一する必要がある。 -->
<!-- specdojo:finding id=F013 severity=major rule=vp-ux-readability line=32 家族利用者の操作性確認が「リリース時点」「リリース後」「リリース前」と章ごとに異なり、読者が試利用を受入確認としていつ実施すべきか判断できないため、初期リリース前の一つの時点へ統一する必要がある。 -->

| ID                | 関係者       | 現状                       | 目標                                 | 対応方針                                                       | 責任者 | 期限               | 証跡                |
| ----------------- | ------------ | -------------------------- | ------------------------------------ | -------------------------------------------------------------- | ------ | ------------------ | ------------------- |
| `STH-SHOP-OWNER`  | 店主代表     | データや記録に頼っている   | システム利用へ切り替わる             | 優先機能ごとに確認・承認を行い、操作方法を簡易手順書で共有する | `PO`   | イテレーション末   | Issue, Pull Request |
| `STH-DEVELOPER`   | 開発担当     | 実装を行う                 | 要件に基づいた着実な進捗             | 機能範囲と確認方法を明確にし、設計・結果を店主に提示する       | `DEV`  | タスク単位         | Pull Request        |
| `STH-TECH-MENTOR` | 技術メンター | メンター参加レベルの支援中 | スコープに影響しない範囲で助言を行う | 週次相談を行い、判断と責務を開発担当に委譲する                 | `DEV`  | 週次               | チャット, Issue     |
| `STH-FAMILY-USER` | 家族利用者   | ソフト使用経験なし         | システムで店番を行える               | リリース後に試利用させる                                       | `PO`   | リリース準備完了後 | Issue               |

## 4. コミュニケーション要件

| ID                | 関係者       | 情報要求                         | 希望チャネル           | 合意・報告の必要性                 | 証跡要件              | コミュニケーション計画への反映 |
| ----------------- | ------------ | -------------------------------- | ---------------------- | ---------------------------------- | --------------------- | ------------------------------ |
| `STH-SHOP-OWNER`  | 店主代表     | スコープと UI に影響する変更内容 | Issue                  | 優先機能の追加・削除を確認         | Issue / Pull Request  | 判断依頼項目                   |
| `STH-DEVELOPER`   | 開発担当     | 機能定義とテスト完了確認         | チャット, Pull Request | デザイン方針と実装結果を共有       | Pull Request          | イテレーション末               |
| `STH-TECH-MENTOR` | 技術メンター | データフローと画面構造案         | チャット               | アーキテクチャの方向性について確認 | Issue                 | 週次相談                       |
| `STH-FAMILY-USER` | 家族利用者   | システム操作方法と変更による影響 | 簡易手順書, Issue      | リリース前の試利用に参加           | Issue, フィードバック | リリース準備                   |

<!-- specdojo:finding id=F009 severity=major rule=vp-qe-omissions-consistency line=43 rulebook と template が見直し対象とする体制、公開・利用方針、主要な利用者影響の変更トリガーがなく、該当変更時に登録簿を更新する責務と証跡が欠落しているため、見直し条件に追加する必要がある。 -->
<!-- specdojo:finding id=F011 severity=major rule=vp-qe-kata-conformance line=43 rulebook と template が要求する体制、公開・利用方針、主要な利用者影響の変更に対する見直し条件が欠落しており、必須要件を満たす完成例になっていないため追加する必要がある。 -->

## 5. 見直し条件

<!-- specdojo:finding id=F015 severity=minor rule=vp-ux-language-consistency line=48 見直し条件の責任者に、関係者一覧で定義されていない Role code `BA` が指定されているため、定義済みの Role code に統一する必要がある。 -->
<!-- specdojo:finding id=F016 severity=minor rule=vp-ux-language-consistency line=48 「利害団体」「利用者群体」は、他章と rulebook で用いる「関係者」「利用者」「影響受容者」「集団」と一致しない未定義語で更新対象を誤読させるため、定義済みの用語に統一する必要がある。 -->

| トリガー                                 | 見直し内容                                       | 責任者 | 承認者 | 証跡                |
| ---------------------------------------- | ------------------------------------------------ | ------ | ------ | ------------------- |
| プロジェクトの目的やスコープを変更した   | 関係者の追加・削除と合意対象の見直し             | `PO`   | -      | Issue, Pull Request |
| 新しい利害団体や利用者群体が登場した場合 | 新しいステークホルダーを登録し関与方針を整備する | `BA`   | `PO`   | Issue               |
| リリース範囲を変更した                   | 影響を受ける関係者の合意対象と証跡要件を更新     | `DEV`  | `PO`   | Pull Request        |
