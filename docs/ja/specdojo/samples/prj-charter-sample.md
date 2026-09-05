---
specdojo:
  id: specdojo:prj-charter-sample
  type: project
  status: ready
  rulebook: specdojo:prj-charter-rulebook
  based_on:
    - specdojo:prj-overview-sample
    - specdojo:prj-stakeholder-register-sample
  supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 78
    graded_at: "2026-09-05T22:16:14.979Z"
    graded_by: codex-expert-executor
    content_hash: 5fd8ba051c80f9b28119e416b5a608b63a07881be53edfa77c5c5dd98a0abe17
    categories:
      consistency: { score: 63 }
      usability: { score: 75 }
      architecture: { score: 100 }
      quality: { score: 75 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 3, score: 75 }
      vp-qe-omissions-consistency: { level: 3, score: 75 }
      vp-qe-kata-conformance: { level: 3, score: 75 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 2, score: 50 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 2, minor: 9, note: 0 }
---

# プロジェクト憲章: 駄菓子屋きぬや 販売管理システム

本書は、駄菓子屋きぬや 販売管理システム構築プロジェクトの立ち上げを正式に認可し、開発担当に要件整理、詳細計画、初期準備を進める権限を委譲するための憲章である。店主代表が PO として、目的、優先順位、公開の扱い、予算の境界を最終判断する。本書の承認は、本格実行開始、外部公開、追加支出、主要スコープ変更を承認するものではない。

## 1. 認可対象

<!-- specdojo:finding id=F007 severity=minor rule=vp-qe-kata-conformance line=13 参照先が作成済みであるにもかかわらず、直接根拠は相対Markdownリンク、成功基準・スコープ・成果物カタログ・管理文書などはバッククォートIDのままであるため、rulebook 6.1に従い実在するdocument_idへのwikilinkへ更新してください。 -->

| 項目            | 内容                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| プロジェクト名  | 駄菓子屋きぬや 販売管理システム構築                                                                                      |
| プロジェクト ID | `prj-0001`                                                                                                               |
| 認可対象        | 立ち上げ、詳細計画策定、初期準備                                                                                         |
| 認可しない範囲  | 本格実行開始、外部公開、追加支出、主要スコープ変更                                                                       |
| 直接根拠        | [プロジェクト概要サンプル](prj-overview-sample.md)、[ステークホルダー登録簿サンプル](prj-stakeholder-register-sample.md) |
| 承認責任        | 店主代表（`PO`）                                                                                                         |
| 認可条件        | 承認日と証跡リンクが確認できるまで、正式な認可済み扱いにしない                                                           |

## 2. プロジェクトの目的

プロジェクトの目的は、店主代表が無理なく使える仕組みで日々の販売、在庫、つけ残高を記録し、家族利用者が店番する場合も同じ手順で確認できる状態を作ることである。背景、必要性、目的の詳細は [プロジェクト概要サンプル](prj-overview-sample.md) を正とする。

認可判断における期待効果は次の観点で確認する。数値目標、測定方法、中長期指標は [プロジェクト概要サンプル](prj-overview-sample.md) の期待効果を正とし、本書では再掲しない。

| 観点     | 認可判断で確認する期待効果                 |
| -------- | ------------------------------------------ |
| 記録共有 | 販売、在庫、つけの記録を同じ基準で残せる   |
| 業務継続 | 店主代表が不在でも店番を続けやすい         |
| 残高確認 | つけ残高を短時間で確認できる               |
| 手順統一 | 店主代表と家族利用者が同じ操作手順で使える |

<!-- specdojo:finding id=F009 severity=minor rule=vp-ux-readability line=30 成功基準、スコープ、成果物カタログ、前提・制約、管理計画、組織定義、RACI、品質計画が作成済みでもクリック可能な参照になっていないため、表示名を伴うwikilinkへ置き換えて次に読む正本へ直接到達できるようにしてください。 -->

成功判定の観点と受入条件は `prj-success-criteria-and-acceptance-criteria` を正とする。

<!-- specdojo:finding id=F004 severity=minor rule=vp-qe-omissions-consistency line=32 rulebookがハイレベルスコープに要求し、メンバー定義にも複数のagentが存在するAI Agentの支援範囲が記載されていないため、許可する支援作業と人間に残す判断責任を追加してください。 -->
<!-- specdojo:finding id=F008 severity=minor rule=vp-qe-kata-conformance line=32 rulebook 6.4が求めるAI Agentの支援範囲がハイレベルスコープの完成例へ反映されていないため、適用する支援範囲を具体値で示してください。 -->

## 3. ハイレベルスコープ

| 区分   | 内容                                                     | 詳細化先    |
| ------ | -------------------------------------------------------- | ----------- |
| 対象   | 単一店舗の店頭販売、在庫管理、常連客のつけ管理           | `prj-scope` |
| 対象   | 店主代表と家族利用者が使うタブレット前提の記録・確認手順 | `prj-scope` |
| 対象   | 初期リリースに必要な要件整理、計画、受入確認の準備       | `prj-scope` |
| 対象外 | EC、複数店舗管理、本格会計連携、仕入れ先とのシステム連携 | `prj-scope` |
| 未確定 | オフライン時の扱い、リリース目標日、費用上限の最終値     | 未決事項    |

成果物群と、憲章承認後に作成・詳細化する文書の一覧は、成果物カタログ（`dct-index`）を正とする。

## 4. 初期ステークホルダー

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=48 初期ステークホルダー表が直接根拠の登録簿と一致せず、`STH-SHOP-OWNER`を`STH-OWNER`、`STH-DEVELOPER`（`DEV`）を`STH-DEVELOPMENT`（`PM`）へ変更し, 家族利用者へ未登録の`BA`を割り当て、未登録の常連客・仕入れ先を追加する一方で技術メンターを欠落させているため、登録簿のID・Role code・掲載対象に合わせてください。 -->
<!-- specdojo:finding id=F010 severity=major rule=vp-ux-language-consistency line=48 店主代表、家族利用者、開発担当のID・名称・Role codeがステークホルダー登録簿およびメンバー定義と一致せず、特に開発担当の`DEV`と`PM`、家族利用者とagentの`BA`を区別できないため、正本に合わせて識別子とRole codeを統一してください。 -->

| ID                      | 関係者         | 関与区分                         | 対応 Role code | 認可判断における主な責任                         |
| ----------------------- | -------------- | -------------------------------- | -------------- | ------------------------------------------------ |
| `STH-OWNER`             | 店主代表       | スポンサー / 意思決定者 / 利用者 | `PO`           | 目的、優先順位、予算枠、リリース可否を判断する   |
| `STH-FAMILY-USER`       | 家族利用者代表 | 利用者                           | `BA`           | 店番時の操作性と引継ぎ方法を確認する             |
| `STH-DEVELOPMENT`       | 開発担当       | 実行担当者                       | `PM`           | 合意した対象範囲に従い、計画と変更影響を共有する |
| `STH-REGULAR-CUSTOMERS` | 常連客         | 影響受容者                       | なし           | つけ残高や販売方法の変更から影響を受ける         |
| `STH-SUPPLIER`          | 仕入れ先       | 外部協力者                       | なし           | 初期リリースでは現行連絡を継続する               |

詳細は [ステークホルダー登録簿サンプル](prj-stakeholder-register-sample.md) を参照する。

## 5. 権限委譲

| 項目         | 決裁者           | 実行責任者       | 協議先         | 証跡                 |
| ------------ | ---------------- | ---------------- | -------------- | -------------------- |
| 立ち上げ認可 | 店主代表（`PO`） | 開発担当（`PM`） | 家族利用者代表 | 本書の承認履歴       |
| 詳細計画策定 | 店主代表（`PO`） | 開発担当（`PM`） | 家族利用者代表 | `pm-plan`、議事録    |
| 本格実行開始 | 店主代表（`PO`） | 開発担当（`PM`） | 家族利用者代表 | GO / Not GO 決定記録 |

<!-- specdojo:finding id=F005 severity=minor rule=vp-qe-omissions-consistency line=64 rulebookがPO承認事項として必須化しているライセンス方針の確定が箇条書きから欠落しているため、承認対象へ追加してください。 -->

次の事項は店主代表（`PO`）の承認を必要とする。

- 初期対象範囲の変更
- 費用上限の確定または増額
- 外部サービス利用や機材購入
- 公開可否または公開対象の変更
- 本格実行開始の判断

## 6. 主要前提・制約

前提・制約の全量は `prj-assumptions-constraints-dependencies` を正とし、本書では認可判断に直結する事項だけを示す。

<!-- specdojo:finding id=F006 severity=minor rule=vp-qe-omissions-consistency line=80 rulebookが公開文書の制約として要求する秘密情報および非公開組織情報の禁止がなく、個人情報だけに限定されているため、公開対象外となる情報区分を補完してください。 -->

| 区分 | 内容                                                                                   | 詳細化先                                   |
| ---- | -------------------------------------------------------------------------------------- | ------------------------------------------ |
| 前提 | 店主代表が業務の最終判断を行い、システムは記録と確認を支援する                         | `prj-assumptions-constraints-dependencies` |
| 制約 | 費用上限は _UNDECIDED_: 詳細計画策定時に店主代表が承認する。承認前の外部支出は行わない | 未決事項                                   |
| 制約 | 顧客情報は必要最小限にし、公開サンプルには個人情報を含めない                           | `prj-assumptions-constraints-dependencies` |

## 7. 本格実行開始の GO / Not GO 判断

本書の承認後、次の観点が確認できるまで、本格実行開始と外部公開の最終判断は保留する。

<!-- specdojo:finding id=F002 severity=minor rule=vp-qe-verifiability line=88 GO / Not GO表の「矛盾しない」「責任範囲が確認できる」「整っている」には判定項目や必須状態がなくpass / failが一意にならないため、照合対象、必須承認、必要なstatusやgrade verdictなどの合格条件を明示してください。 -->

| 判断観点 | 確認内容                                                         | 記録先                        |
| -------- | ---------------------------------------------------------------- | ----------------------------- |
| 目的整合 | 成果物体系、公開対象、優先順位がプロジェクトの目的と矛盾しない   | `pm-plan` / 決定記録          |
| 公開適性 | 公開してよい情報だけで構成され、公開範囲が承認されている         | 決定記録 / Pull Request       |
| 予算枠   | 追加支出、外部サービス利用、運用負担の上限が承認されている       | 決定記録                      |
| 体制     | PO、PM、BA の責任範囲が確認できる                                | `pm-organization` / `pm-raci` |
| 品質     | 初期公開に必要な rulebook、recipe、sample、template が整っている | `pm-quality-management-plan`  |

## 8. 承認

| 承認日      | 承認者           | 承認対象                                       | 証跡リンク  |
| ----------- | ---------------- | ---------------------------------------------- | ----------- |
| _UNDECIDED_ | 店主代表（`PO`） | 立ち上げ認可、詳細計画策定と初期準備の権限委譲 | _UNDECIDED_ |

<!-- specdojo:finding id=F011 severity=minor rule=vp-ux-language-consistency line=100 Frontmatterの`status: ready`に対して本文が無限定に「本書はドラフト」と記して文書状態が矛盾して見えるため、本文を「立ち上げ認可は未承認」などに改め、成果物の成熟度とプロジェクト認可状態を区別してください。 -->

本書はドラフトであり、承認日と証跡リンクが確定するまでは正式な立ち上げ認可文書として扱わない。

## 9. 未決事項

<!-- specdojo:finding id=F003 severity=minor rule=vp-qe-verifiability line=106 未決事項4件の期限がすべて`_UNDECIDED_`で解消期限を判定できないため、日付が未確定でも「詳細計画承認前」「初期運用開始前」など確認可能な期限条件を記載してください。 -->

| 論点               | 期限        | 担当             | 対応方針                                                        |
| ------------------ | ----------- | ---------------- | --------------------------------------------------------------- |
| 初回承認日         | _UNDECIDED_ | 店主代表（`PO`） | 憲章初版の承認時に記録する                                      |
| 費用上限           | _UNDECIDED_ | 店主代表（`PO`） | 詳細計画策定時に外部支出と機材購入の要否を確認する              |
| リリース目標日     | _UNDECIDED_ | 開発担当（`PM`） | スコープと見積もりを確認したうえで店主代表と合意する            |
| オフライン時の扱い | _UNDECIDED_ | 開発担当（`PM`） | 初期スコープに含めるか、対象外にするかを `prj-scope` で整理する |
