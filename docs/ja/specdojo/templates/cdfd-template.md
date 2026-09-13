---
specdojo:
  id: specdojo:cdfd-template
  type: template
  status: ready
  frontmatter_template:
    specdojo:
      id: _AUTHORITY_:cdfd-_DOMAIN_ID_
      type: flow
      status: draft
      rulebook: specdojo:cdfd-rulebook
      based_on:
        - _AUTHORITY_:cdfd-overview
      supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 55
    graded_at: "2026-09-09T17:45:44.993Z"
    graded_by: codex-expert-executor
    content_hash: e3496fe04240f5d809d83cd33f7f10a9d47dc9f0b9341340ef5d7aec784f76f0
    categories:
      consistency: { score: 25 }
      usability: { score: 67 }
      architecture: { score: 100 }
      quality: { score: 38 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 2, score: 50 }
      vp-ux-language-consistency: { level: 2, score: 50 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 16, minor: 0, note: 0 }
---

# 概念データフロー図（領域別）: _DOMAIN_NAME_

_TODO_: 全体概要のどの領域を詳細化し、誰が領域内フロー、必須・条件付きの境界、主要例外、領域外への委譲を合意・利用する CDFD かを 1〜3 文で記述する。

## 1. 目的

_TODO_: 誰が、領域内フロー、必須・条件付きの境界、主要例外、委譲境界のどれを合意または後続利用するかを 1〜3 文で記述する。「分かりやすくする」のような曖昧な表現ではなく、「〇〇が起動条件と例外の境界を承認する」のように利用結果を判定できる表現にする。

## 2. 適用範囲

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=11 rulebook が明示を求める組織境界とシステム境界を記入する指示がなく、開始イベント・終了状態と隣接領域だけで適用範囲を確定できてしまうため、対象となる組織およびシステムの境界を記入する欄または指示を追加する必要がある。 -->
<!-- specdojo:finding id=F006 severity=major rule=vp-qe-omissions-consistency line=11 必須の適用範囲要素である組織境界とシステム境界が TODO の確認対象から欠落しているため、両境界を明示する記入指示を追加する必要がある。 -->
<!-- specdojo:finding id=F010 severity=major rule=vp-qe-kata-conformance line=11 rulebook の適用範囲要件に含まれる組織境界とシステム境界を template が導出しないため、両境界の記入項目を追加する必要がある。 -->

- 対象: _TODO_: どのイベントから、どの出力または状態がそろうまでを対象にするかを記述する。
- 対象外: _TODO_: 隣接領域、補助操作、実装詳細のどこから先を対象外にするかを記述する。
- 責任分担: _TODO_: 人間と AI Agent の責任分担の原則を本文で再定義せず、対応する文書への参照を記述する（例: `[[_AUTHORITY_:prj-overview|プロジェクト概要]]`）。
- 用語: _TODO_: 特定プロジェクトの実行計画・スケジュール上のフェーズ名や、実装検討段階だけで使われる仮称を使わず、前提知識のない読者が読める語彙で記述する。

## 3. 領域内プロセス一覧

_TODO_: 主要入力・主要出力・データストアは「個別プロセス主要入出力」（5章）へ記載し、本章の列には含めない。

<!-- specdojo:finding id=F002 severity=major rule=vp-arc-cross-document-consistency line=23 必須性のプレースホルダーが `_REQUIRED_OR_CONDITIONAL_` で、rulebook の正規分類「必須／条件付き／選択」のうち「選択」を表現できないため、三分類へ統一する必要がある。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-qe-verifiability line=23 条件付きプロセスについて非起動時の扱いを記入する欄または指示がなく、そのプロセスを起動しない経路でも領域の必須出力がそろうかを pass／fail 判定できないため、必須性欄またはフロー指示に非起動時の正常完了条件を追加する必要がある。 -->
<!-- specdojo:finding id=F007 severity=major rule=vp-qe-omissions-consistency line=23 rulebook が必須性として認める「選択」がプレースホルダーから欠落しているため、「必須／条件付き／選択」の全分類を選べる骨組みに修正する必要がある。 -->
<!-- specdojo:finding id=F011 severity=major rule=vp-qe-kata-conformance line=23 rulebook の三分類に対して template が必須・条件付きの二分類だけを想定しているため、「選択」を含む正規の必須性分類へ合わせる必要がある。 -->
<!-- specdojo:finding id=F016 severity=major rule=vp-ux-language-consistency line=23 `_REQUIRED_OR_CONDITIONAL_` と本文中の「必須・条件付き」は rulebook の「必須／条件付き／選択」と一致せず、「選択」を条件付きと混同または欠落させるため、三分類の名称へ統一する必要がある。 -->
<!-- prettier-ignore -->
| プロセス ID    | プロセス       | 業務目的           | 主な担当     | 起動条件          | 必須性                    |
| -------------- | -------------- | ------------------ | ------------ | ----------------- | ------------------------- |
| `_PROCESS_ID_` | _PROCESS_NAME_ | _BUSINESS_PURPOSE_ | _OWNER_ROLE_ | _START_CONDITION_ | _REQUIRED_OR_CONDITIONAL_ |

<!-- specdojo:finding id=F003 severity=major rule=vp-arc-cross-document-consistency line=25 3章と5章の行追加注記が「3プロセス以上」の場合だけ追加を指示しており、2プロセスの場合に全プロセスを一行ずつ記載する rulebook の要件を満たせないため、「複数ある場合」または「2プロセス以上」に修正する必要がある。 -->
<!-- specdojo:finding id=F008 severity=major rule=vp-qe-omissions-consistency line=25 2プロセスの場合に2行目を追加する指示がなく、一覧および個別プロセス主要入出力からプロセスが欠落し得るため、3章と5章の注記をプロセスが複数あるすべての場合に適用する必要がある。 -->
<!-- specdojo:finding id=F012 severity=major rule=vp-qe-kata-conformance line=25 一つのプロセスを一行で表す型であるにもかかわらず、2プロセス時の行追加が指示されていないため、3章と5章の注記を全プロセスの列挙を保証する表現へ修正する必要がある。 -->
<!-- 領域内に3プロセス以上ある場合は、同じ形式で行を追加する。 -->

## 4. 概念データフロー

<!-- specdojo:finding id=F004 severity=major rule=vp-arc-cross-document-consistency line=29 rulebook と recipe が要求する条件付きプロセスの非起動時の正常完了経路を記述する指示がなく, 必須出力が成立する経路を追跡できない成果物を生成し得るため、非起動経路と領域完了条件を図示する指示を追加する必要がある。 -->
<!-- specdojo:finding id=F009 severity=major rule=vp-qe-omissions-consistency line=29 条件付きプロセスの非起動経路と、その場合の領域完了条件を図へ含める指示が欠落しているため、正常系を最後まで追跡できる記入要件を追加する必要がある。 -->
<!-- specdojo:finding id=F013 severity=major rule=vp-qe-kata-conformance line=29 recipe と rulebook が確認を求める条件付きプロセスの非起動時の正常完了経路を template が導出しないため、フロー作成 TODO に非起動経路と領域完了条件を追加する必要がある。 -->

_TODO_: 一覧の各行を一つのプロセスノードとして配置し、起点イベント、主要なデータストア、必要な外部主体、委譲先をつなぐ。プロセスの性質（必須・条件付きなど）によって図が追いにくい場合は、業務の性質が近いプロセスをまとめて複数の図に分割できる（例: 「4.1. 必須プロセスのフロー」「4.2. 条件付きプロセスのフロー」）。

<!-- 単一図で足りる場合は、以下の図・凡例をそのまま使う。図を分ける場合は、この単一図・凡例を削除し、4.1/4.2 の見出しで分割する。 -->

<!-- specdojo:finding id=F014 severity=major rule=vp-qe-kata-conformance line=47 委譲先ノードがプロセスと同じ角丸長方形で定義され、凡例では角丸長方形をプロセスと断定しているため、領域外委譲を内部プロセスとして表す不適合な完成物を生成しないよう、委譲先を別形状にするか凡例で明確に区別する必要がある。 -->
<!-- specdojo:finding id=F015 severity=major rule=vp-ux-readability line=47 委譲先がプロセスと同じ角丸長方形で描画される一方、凡例は角丸長方形を「一つのプロセス」と説明しており、領域外ノードを領域内プロセスと誤認するため、異なる形状または明示的な委譲先用凡例を使用する必要がある。 -->

```mermaid
flowchart LR
  classDef process fill:#e3f2fd,stroke:#1e88e5,color:#000
  classDef event fill:#fff3e0,stroke:#fb8c00,color:#000
  classDef store fill:#e8f5e9,stroke:#43a047,color:#000
  classDef actor fill:#f5f7fa,stroke:#607d8b,color:#000

  _EXTERNAL_ACTOR_NODE_ID_["_EXTERNAL_ACTOR_NAME_"]
  _START_EVENT_NODE_ID_{{"_START_EVENT_"}}

  _PROCESS_NODE_ID_("_PROCESS_ID_ _PROCESS_NAME_")

  _DATA_STORE_NODE_ID_[("_DATA_STORE_NAME_")]

  _DELEGATION_NODE_ID_("_DELEGATION_TARGET_")

  _EXTERNAL_ACTOR_NODE_ID_ -->|"_EVENT_INPUT_LABEL_"| _START_EVENT_NODE_ID_
  _START_EVENT_NODE_ID_ -->|"起動条件"| _PROCESS_NODE_ID_
  _DATA_STORE_NODE_ID_ -->|"_INPUT_FLOW_LABEL_"| _PROCESS_NODE_ID_
  _PROCESS_NODE_ID_ -->|"_OUTPUT_FLOW_LABEL_"| _DATA_STORE_NODE_ID_
  _PROCESS_NODE_ID_ -->|"_HANDOFF_FLOW_LABEL_"| _DELEGATION_NODE_ID_

  class _PROCESS_NODE_ID_ process
  class _START_EVENT_NODE_ID_ event
  class _DATA_STORE_NODE_ID_ store
  class _EXTERNAL_ACTOR_NODE_ID_ actor
```

凡例: 角丸長方形は一つのプロセス、六角形は起点イベント、円柱はデータストア、四角は外部主体、`-->` は情報の流れを表す。色・絵文字の割り当ては、対象プロダクトの全体概要が「凡例（本プロダクト共通）」を設けている場合はそちらを参照し、設けていない場合はこの凡例内で完結させる。_TODO_: 領域外ノード（委譲先）は代表ノードだけを示し、内部処理を対象外と明記する。現物の流れを扱う場合は `==>` の意味を追記し、扱わない場合は「本図は現物の流れを扱わない」と明記する。

<!-- プロセスの性質によって図を分ける場合は、単一図を削除し、以下のように分割する。両図に登場する共通ノードは、いずれかの凡例で同一の対象を指すことを明記する。

### 4.1. 必須プロセスのフロー

（上記と同様の Mermaid 図・凡例を必須プロセスだけで構成する）

### 4.2. 条件付きプロセスのフロー

（条件付きプロセスだけで構成し、必須プロセスのフローと共有するノードがあれば凡例で明記する）

-->

## 5. 個別プロセス主要入出力

<!-- プロセスグループを設けない場合は、以下のグループ見出し（5.1、5.2）を省略し、表だけを直接並べる。概念データフロー（4章）を複数図に分けた場合は、同じ単位でグループ化する。 -->

### 5.1. _PROCESS_GROUP_NAME_（_PROCESS_ID_ 〜 _PROCESS_ID_）

_TODO_: グループが扱う範囲を数行で要約する。業務目的、主な担当、起動条件、必須性は「領域内プロセス一覧」（3章）と重複させず記載しない。

<!-- prettier-ignore -->
| プロセス ID | プロセス | 主要入力 | 主要出力 | データストア |
| --- | --- | --- | --- | --- |
| `_PROCESS_ID_` | _PROCESS_NAME_ | _MAIN_INPUTS_ | _MAIN_OUTPUTS_ | _DATA_STORES_ |

<!-- グループ内に3プロセス以上ある場合は、同じ形式で行を追加する。 -->

### 5.2. _PROCESS_GROUP_NAME_（_PROCESS_ID_ 〜 _PROCESS_ID_）

_TODO_: グループが扱う範囲を数行で要約する。

<!-- prettier-ignore -->
| プロセス ID | プロセス | 主要入力 | 主要出力 | データストア |
| --- | --- | --- | --- | --- |
| `_PROCESS_ID_` | _PROCESS_NAME_ | _MAIN_INPUTS_ | _MAIN_OUTPUTS_ | _DATA_STORES_ |

<!-- グループが3件以上ある場合は、5.3として「グループ要約＋表」の構成を繰り返す。 -->

## 6. 主要例外と領域外への委譲

### 6.1. 主要例外

| 例外 ID          | 対象プロセス   | 検出条件              | 本領域での扱い       | 継続・再開条件                |
| ---------------- | -------------- | --------------------- | -------------------- | ----------------------------- |
| `_EXCEPTION_ID_` | `_PROCESS_ID_` | _DETECTION_CONDITION_ | _EXCEPTION_HANDLING_ | _RESUME_OR_HANDOFF_CONDITION_ |

<!-- 主要例外が複数ある場合は、同じ形式で行を追加する。 -->

### 6.2. 領域外への委譲

| 委譲先                | 委譲する事項               | 引き渡す情報          | 本領域へ戻す条件   |
| --------------------- | -------------------------- | --------------------- | ------------------ |
| `_DELEGATION_TARGET_` | _DELEGATED_RESPONSIBILITY_ | _HANDOFF_INFORMATION_ | _RETURN_CONDITION_ |

<!-- 委譲先が複数ある場合は、同じ形式で行を追加する。委譲先に対応する領域別 CDFD がある場合は、委譲先名にその CDFD への参照を併記する。 -->

<!-- 未決事項がある場合のみ、以下の章を追加する。ない場合は章ごと削除する。

## 7. 未決事項

| 論点                | 影響するプロセス・例外・委譲 | 決定者          | 決定時期          |
| ------------------- | ---------------------------- | --------------- | ----------------- |
| _UNDECIDED_: _TODO_ | _IMPACTED_IDS_OR_TARGETS_    | _DECISION_ROLE_ | _DECISION_TIMING_ |

-->
