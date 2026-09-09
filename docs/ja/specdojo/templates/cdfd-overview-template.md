---
specdojo:
  id: specdojo:cdfd-overview-template
  type: template
  status: ready
  frontmatter_template:
    specdojo:
      id: _AUTHORITY_:cdfd-overview
      type: flow
      status: draft
      rulebook: specdojo:cdfd-overview-rulebook
      based_on: []
      supersedes: []
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 53
    graded_at: "2026-09-09T17:17:11.749Z"
    graded_by: codex-expert-executor
    content_hash: 6adca7b3f4da8ce90f5310ac3219a25dbc0fb4dd577fda26c8fea2d3e70a4eba
    categories:
      consistency: { score: 25 }
      usability: { score: 58 }
      architecture: { score: 100 }
      quality: { score: 38 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 1, score: 25 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 1, score: 25 }
      vp-ux-readability: { level: 1, score: 25 }
      vp-ux-language-consistency: { level: 2, score: 50 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 16, minor: 3, note: 0 }
---

# 概念データフロー図（全体概要）: _TARGET_NAME_

_TODO_: 誰が、どの業務または運用の対象境界と領域間フローを合意するために使う全体概要かを 1〜3 文で記述する。

## 1. 目的

_TODO_: この全体概要を使用する対象者（対象範囲を承認する役割、領域別 CDFD を設計入力として使う役割、領域分割の重複・欠落を確認する役割等）と、利用場面（承認、領域別詳細化、設計入力、網羅性確認等）を結び付けて 1〜3 文で記述する。「分かりやすくする」のような曖昧な表現ではなく、利用結果を判定できる表現にする。

## 2. 適用範囲

- 対象: _TODO_: 開始点、終了点、対象業務、組織、システム境界を記述する。
- 対象外・補助操作: _TODO_: 補助操作、領域内の手順、実装詳細、別成果物や外部主体へ委譲する事項を記述する。
- 責任分担: _TODO_: 人間と AI Agent の責任分担の原則を本文で再定義せず、対応する文書への参照を記述する（例: `[[_AUTHORITY_:prj-overview|プロジェクト概要]]`）。

## 3. プロセス領域

_TODO_: 業務がいくつのプロセス領域に分かれるかを一文で記述する（例: "業務は N のプロセス領域に分かれる"）。主要入力・主要出力・データストアは「個別プロセス領域主要入出力」、委譲境界は「委譲境界」に記載する。

<!-- prettier-ignore -->
| 領域 ID | プロセス領域 | 業務目的 | 主な担当 | 起点イベント | 領域別 CDFD |
| --- | --- | --- | --- | --- | --- |
| `_PROCESS_AREA_ID_` | _PROCESS_AREA_NAME_ | _BUSINESS_PURPOSE_ | _OWNER_ROLE_ | _START_EVENT_ | `_DETAIL_CDFD_ID_` |
| `_PROCESS_AREA_ID_` | _PROCESS_AREA_NAME_ | _BUSINESS_PURPOSE_ | _OWNER_ROLE_ | _START_EVENT_ | `_DETAIL_CDFD_ID_` |

<!-- 領域が3件以上ある場合は、同じ形式で行を追加する。 -->

## 4. 概念データフロー（概要）

<!-- specdojo:finding id=F002 severity=major rule=vp-arc-cross-document-consistency line=29 単一図の選択条件に物理保管との受け渡しを含めているが, 単一図の骨組みには物理保管ノードと現物エッジがなく, 現物がある場合に物理保管を図示する recipe の規則と一致しない。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-arc-cross-document-consistency line=29 プロセスグループを角丸の代表ノードにする一方, 包含先の `cdfd-mermaid-rulebook` はプロセスグループを `subgraph` と定義し, `subgraph` は代表ノードの代替にならないとしているため, 表現規則が競合している。 -->
<!-- specdojo:finding id=F005 severity=major rule=vp-qe-verifiability line=29 プロセスグループを代表ノードにできる一方, グループ ID, 構成領域, 一覧行および複数の領域別 CDFD との対応欄がないため, 各領域が図へ一度ずつ反映されたかを pass / fail 判定できない。 -->
<!-- specdojo:finding id=F006 severity=minor rule=vp-qe-verifiability line=29 グループ化条件の「おおむね7〜9件を超える」は上限を一意に定めず, recipe の良い例・悪い例では9件をグループ化対象としているため, 代表ノードが9件の場合の判定条件を統一する必要がある。 -->
<!-- specdojo:finding id=F008 severity=major rule=vp-qe-omissions-consistency line=29 物理保管を含む受け渡しを単一図で扱えるとしているのに, 単一図には物理保管ノード, 現物エッジ, 対応する線種の骨組みがない。 -->
<!-- specdojo:finding id=F009 severity=major rule=vp-qe-omissions-consistency line=29 プロセスグループ使用時に必要なグループ ID, 名称, 構成領域, 代表ノードと領域別 CDFD の対応方法が定義されていない。 -->
<!-- specdojo:finding id=F012 severity=major rule=vp-qe-kata-conformance line=29 recipe は現物の受け渡しがある場合に物理保管を図示するよう求めるが, template の単一図にはその適用欄がなく, 単一図を選ぶと recipe 準拠成果物を生成できない。 -->
<!-- specdojo:finding id=F013 severity=major rule=vp-qe-kata-conformance line=29 template のプロセスグループ代表ノード方式と, 包含先の `cdfd-mermaid-rulebook` が定義する `subgraph` 方式が競合し, グループ化した成果物を kata 一式へ同時準拠させられない。 -->
<!-- specdojo:finding id=F015 severity=major rule=vp-ux-readability line=29 複数領域を一つのグループ代表ノードへまとめる際の ID, 構成領域, 詳細化先との対応表示が示されておらず, 領域数が多い読者は一覧・図・詳細化先を追跡できない。 -->

_TODO_: 代表ノードの数がおおむね7〜9件を超える場合は、業務の性質が近い領域をプロセスグループへまとめ、代表ノードをグループ単位にする。外部主体・物理保管・データストアとの受け渡しを一つの図で追える場合は、下記の単一図をそのまま使う。一画面で追いにくい場合だけ、「4.1. 外部主体と物理保管に着目した概要フロー」「4.2. データストアに着目した概要フロー」に分ける。

<!-- 単一図で足りる場合は、以下の図・凡例をそのまま使い、4.1/4.2 の見出しごと削除する。二図に分ける場合は、この単一図・凡例を削除し、4.1/4.2 を使う。 -->

```mermaid
flowchart LR
  classDef process fill:#e3f2fd,stroke:#1e88e5,color:#000
  classDef store fill:#e8f5e9,stroke:#43a047,color:#000
  classDef actor fill:#f5f7fa,stroke:#607d8b,color:#000

  _EXTERNAL_ACTOR_NODE_ID_["_EXTERNAL_ACTOR_NAME_"]

  _PROCESS_AREA_NODE_ID_("_PROCESS_AREA_ID_ _PROCESS_AREA_NAME_")

  _DATA_STORE_NODE_ID_[("_DATA_STORE_NAME_")]

  _EXTERNAL_ACTOR_NODE_ID_ -->|"_INPUT_LABEL_"| _PROCESS_AREA_NODE_ID_
  _PROCESS_AREA_NODE_ID_ -->|"_OUTPUT_FLOW_LABEL_"| _DATA_STORE_NODE_ID_

  class _PROCESS_AREA_NODE_ID_ process
  class _DATA_STORE_NODE_ID_ store
  class _EXTERNAL_ACTOR_NODE_ID_ actor
```

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=53 概要図では起点イベントを省略すると明記しているが, recipe は起点イベントの図への配置を求め, 包含先の `cdfd-mermaid-rulebook` もイベントを各図の必須要素としているため, 同時に準拠できない。 -->
<!-- specdojo:finding id=F007 severity=major rule=vp-qe-omissions-consistency line=53 起点イベントを一覧表へ委譲して全概要図から省略する骨組みになっており, recipe と包含先の Mermaid rulebook が必須とするイベントノードおよび起動条件エッジが欠落している。 -->
<!-- specdojo:finding id=F011 severity=major rule=vp-qe-kata-conformance line=53 recipe が求める起点イベント付き概要図に対し, template は起点イベントの省略を明記しているため, 作成手順を骨組みに適用した結果が一致しない。 -->
<!-- specdojo:finding id=F017 severity=major rule=vp-ux-language-consistency line=53 本文では「プロセスグループ」を角丸の代表ノードとして扱う一方, 参照先の `cdfd-mermaid-rulebook` は同じ語を `subgraph` として定義しており, プロセスグループとサブグラフの用語境界が統一されていない。 -->

凡例: 角丸長方形はプロセス領域またはプロセスグループ（内訳は「プロセス領域」の一覧表を参照）、円柱はデータストア、四角は外部主体、`-->` は情報の流れを表す。個々の領域の起点イベントは「プロセス領域」の一覧表に記載し、本図では省略する。本図は情報の流れを対象とし、現物の流れは対象外とする。色・絵文字の割り当ては、「凡例（本プロダクト共通）」を設けた場合はそちらを参照し、設けない場合はこの凡例内で完結させる。

### 4.1. 外部主体と物理保管に着目した概要フロー

```mermaid
flowchart LR
  classDef process fill:#e3f2fd,stroke:#1e88e5,color:#000
  classDef store fill:#e8f5e9,stroke:#43a047,color:#000
  classDef actor fill:#f5f7fa,stroke:#607d8b,color:#000

  _EXTERNAL_ACTOR_NODE_ID_["_EXTERNAL_ACTOR_NAME_"]

  _PROCESS_AREA_NODE_ID_("_PROCESS_AREA_ID_ _PROCESS_AREA_NAME_")

  _PHYSICAL_STORAGE_NODE_ID_(["_PHYSICAL_STORAGE_NAME_"])

  _EXTERNAL_ACTOR_NODE_ID_ ==>|"_PHYSICAL_INPUT_LABEL_"| _PROCESS_AREA_NODE_ID_
  _PROCESS_AREA_NODE_ID_ ==>|"_PHYSICAL_OUTPUT_LABEL_"| _PHYSICAL_STORAGE_NODE_ID_

  class _PROCESS_AREA_NODE_ID_ process
  class _PHYSICAL_STORAGE_NODE_ID_ store
  class _EXTERNAL_ACTOR_NODE_ID_ actor
```

<!-- specdojo:finding id=F010 severity=major rule=vp-qe-omissions-consistency line=77 「凡例（本プロダクト共通）」は条件により削除できるのに, 二つの分割図の凡例は同章を無条件に参照し, 削除時に色・絵文字の説明を各図内で完結させる記入欄もない。 -->
<!-- specdojo:finding id=F016 severity=major rule=vp-ux-readability line=77 共通凡例章を削除できる構成にもかかわらず, 分割図の凡例は同章を無条件に参照しているため, その分岐では初見の読者が色・絵文字の意味と参照先を確認できない。 -->
<!-- specdojo:finding id=F018 severity=minor rule=vp-ux-language-consistency line=77 グループ代表ノードを許容しているのに, 二つの分割図の凡例は角丸長方形を「プロセス領域」とだけ説明しており, グループ化時の同じ形状の名称と一致しない。 -->

凡例: 角丸長方形はプロセス領域（内訳は「プロセス領域」の一覧表を参照）、スタジアム形は物理保管、四角は外部主体、`==>` は現物・現金の流れを表す。情報の流れはデータストアに着目した概要フロー（4.2）を参照する。色・絵文字の割り当ては「凡例（本プロダクト共通）」を参照する。

### 4.2. データストアに着目した概要フロー

```mermaid
flowchart LR
  classDef process fill:#e3f2fd,stroke:#1e88e5,color:#000
  classDef store fill:#e8f5e9,stroke:#43a047,color:#000
  classDef actor fill:#f5f7fa,stroke:#607d8b,color:#000

  _EXTERNAL_ACTOR_NODE_ID_["_EXTERNAL_ACTOR_NAME_"]

  _PROCESS_AREA_NODE_ID_("_PROCESS_AREA_ID_ _PROCESS_AREA_NAME_")

  _DATA_STORE_NODE_ID_[("_DATA_STORE_NAME_")]

  _EXTERNAL_ACTOR_NODE_ID_ -->|"_INPUT_LABEL_"| _PROCESS_AREA_NODE_ID_
  _PROCESS_AREA_NODE_ID_ -->|"_OUTPUT_FLOW_LABEL_"| _DATA_STORE_NODE_ID_

  class _PROCESS_AREA_NODE_ID_ process
  class _DATA_STORE_NODE_ID_ store
  class _EXTERNAL_ACTOR_NODE_ID_ actor
```

凡例: 角丸長方形はプロセス領域（内訳は「プロセス領域」の一覧表を参照）、円柱はデータストア、四角は外部主体、`-->` は情報の流れを表す。現物の流れは外部主体と物理保管に着目した概要フロー（4.1）を参照する。色・絵文字の割り当ては「凡例（本プロダクト共通）」を参照する。

## 5. 個別プロセス領域主要入出力

<!-- プロセスグループを設けない場合は、以下のグループ見出し（5.1、5.2）を省略し、表だけを直接並べる。 -->

### 5.1. _AREA_GROUP_NAME_（_PROCESS_AREA_ID_ 〜 _PROCESS_AREA_ID_）

_TODO_: グループが扱う範囲を数行で要約する。業務目的、主な担当、起点イベントは「プロセス領域」（3章）と重複させず記載しない。

<!-- prettier-ignore -->
| 領域 ID | プロセス領域 | 主要入力 | 主要出力 | データストア |
| --- | --- | --- | --- | --- |
| `_PROCESS_AREA_ID_` | _PROCESS_AREA_NAME_ | _MAIN_INPUTS_ | _MAIN_OUTPUTS_ | _DATA_STORES_ |
| `_PROCESS_AREA_ID_` | _PROCESS_AREA_NAME_ | _MAIN_INPUTS_ | _MAIN_OUTPUTS_ | _DATA_STORES_ |

<!-- グループ内に領域が3件以上ある場合は、同じ形式で行を追加する。 -->

### 5.2. _AREA_GROUP_NAME_（_PROCESS_AREA_ID_ 〜 _PROCESS_AREA_ID_）

_TODO_: グループが扱う範囲を数行で要約する。

<!-- prettier-ignore -->
| 領域 ID | プロセス領域 | 主要入力 | 主要出力 | データストア |
| --- | --- | --- | --- | --- |
| `_PROCESS_AREA_ID_` | _PROCESS_AREA_NAME_ | _MAIN_INPUTS_ | _MAIN_OUTPUTS_ | _DATA_STORES_ |

<!-- グループが3件以上ある場合は、5.3 として「グループ要約＋表」の構成を繰り返す。 -->

## 6. 委譲境界

_TODO_: 各領域が対象外として他領域へ委ねる境界を記述する。詳細化先（正本としての役割を持つ領域別 CDFD）は「プロセス領域」（3章）の領域別 CDFD 列を参照する前提とし、本章では再掲しない。

<!-- prettier-ignore -->
| 領域 ID             | プロセス領域        | 委譲境界              |
| ------------------- | ------------------- | --------------------- |
| `_PROCESS_AREA_ID_` | _PROCESS_AREA_NAME_ | _DELEGATION_BOUNDARY_ |
| `_PROCESS_AREA_ID_` | _PROCESS_AREA_NAME_ | _DELEGATION_BOUNDARY_ |

<!-- 一覧表の全領域を、グループ分けせず領域 ID 順の一つの表にまとめる。3件以上ある場合は同じ形式で行を追加する。 -->

_TODO_: 本プロダクトに複数の領域別 CDFD があり、共通の凡例を参照させる場合のみ、以下の「7. 凡例（本プロダクト共通）」章を残す。単一の CDFD しかない場合は、この章ごと削除する。

## 7. 凡例（本プロダクト共通）

_TARGET_NAME_ の全 CDFD（本書および領域別 CDFD）が共通して参照するノード形状・色・絵文字の対応を示す。個々の CDFD は、以下の定義を再掲せず、本章への参照に留める。

<!-- specdojo:finding id=F019 severity=minor rule=vp-ux-language-consistency line=164 同じ `==＞` の意味を「現物の流れ」「現物・現金の流れ」「物の流れ」と呼び分けているため, 一つの正式名称へ統一する必要がある。 -->

```mermaid
flowchart LR
  classDef process fill:#e3f2fd,stroke:#1e88e5,color:#000
  classDef event fill:#fff3e0,stroke:#fb8c00,color:#000
  classDef store fill:#e8f5e9,stroke:#43a047,color:#000
  classDef actor fill:#f5f7fa,stroke:#607d8b,color:#000

  _EXTERNAL_ACTOR_NODE_ID_["_EXTERNAL_ACTOR_EMOJI_ 外部主体"]
  _START_EVENT_NODE_ID_{{"_EVENT_EMOJI_ 起点イベント"}}
  _PROCESS_AREA_NODE_ID_("_PROCESS_EMOJI_ プロセス／プロセスグループ")
  _DATA_STORE_NODE_ID_[("_STORE_EMOJI_ データストア")]
  _PHYSICAL_STORAGE_NODE_ID_(["_PHYSICAL_STORAGE_EMOJI_ 物理保管"])

  _EXTERNAL_ACTOR_NODE_ID_ -->|"情報の流れ"| _PROCESS_AREA_NODE_ID_
  _START_EVENT_NODE_ID_ -->|"起動条件"| _PROCESS_AREA_NODE_ID_
  _PROCESS_AREA_NODE_ID_ -->|"更新"| _DATA_STORE_NODE_ID_
  _PROCESS_AREA_NODE_ID_ ==>|"物の流れ"| _PHYSICAL_STORAGE_NODE_ID_

  class _PROCESS_AREA_NODE_ID_ process
  class _START_EVENT_NODE_ID_ event
  class _DATA_STORE_NODE_ID_,_PHYSICAL_STORAGE_NODE_ID_ store
  class _EXTERNAL_ACTOR_NODE_ID_ actor
```

<!-- prettier-ignore -->
| 概念 | 形状 | 色 | 絵文字例 |
| --- | --- | --- | --- |
| プロセス／プロセスグループ | 角丸長方形 | 青（`#e3f2fd` / `#1e88e5`） | _TODO_: 業務内容が伝わる絵文字例 |
| 起点イベント | 六角形 | 橙（`#fff3e0` / `#fb8c00`） | _TODO_: 出来事が伝わる絵文字例 |
| データストア | 円柱 | 緑（`#e8f5e9` / `#43a047`） | _TODO_: 保管物が伝わる絵文字例 |
| 物理保管 | スタジアム形 | 緑（データストアと同じ） | _TODO_: 保管場所が伝わる絵文字例 |
| 外部主体 | 四角 | グレー（`#f5f7fa` / `#607d8b`） | _TODO_: 主体が伝わる絵文字例 |
| 情報の流れ | ラベル付き `-->` | — | — |
| 物の流れ | ラベル付き `==>` | — | — |

ノード形状・線種そのものの記法は `specdojo:cdfd-mermaid-rulebook` に従う。本章は、その記法に基づき _TARGET_NAME_ が実際に採用する色・絵文字の割り当てを固定する。

<!-- specdojo:finding id=F004 severity=major rule=vp-arc-cross-document-consistency line=185 template は条件付きの「未決事項」章を提供し recipe も同章への分離を求めるが, overview rulebook の本文構成と記述ガイドには同章が定義されておらず, 適用経路によって成果物構成が変わる。 -->
<!-- specdojo:finding id=F014 severity=major rule=vp-qe-kata-conformance line=185 recipe と template が扱う条件付きの未決事項章を overview rulebook が定義しておらず, recipe-guided と fully-guided で適用可能な章構成が一致しない。 -->
<!-- 未決事項がある場合のみ、以下の章を追加する。ない場合は章ごと削除する。

## 8. 未決事項

| 論点 | 影響 | 決定者 | 決定時期 |
| --- | --- | --- | --- |
| _UNDECIDED_: _TODO_ | _IMPACT_ | _DECISION_ROLE_ | _DECISION_TIMING_ |

-->
