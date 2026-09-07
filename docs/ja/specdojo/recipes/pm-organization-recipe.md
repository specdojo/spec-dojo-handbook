---
specdojo:
  id: specdojo:pm-organization-recipe
  type: recipe
  status: ready
  rulebook: specdojo:pm-organization-rulebook
  sample: specdojo:pm-organization-sample
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 93
    graded_at: "2026-09-04T14:39:32.873Z"
    graded_by: gemma-expert-executor
    content_hash: ab44f3dd254996a03dca47324d425e3c21092428de99463c659be147d659b213
    categories:
      consistency: { score: 75 }
      usability: { score: 92 }
      architecture: { score: 100 }
      quality: { score: 100 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 4, score: 100 }
      vp-qe-omissions-consistency: { level: 4, score: 100 }
      vp-qe-kata-conformance: { level: 4, score: 100 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 4, score: 100 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 1, minor: 1, note: 0 }
---

# 組織定義 作成レシピ

Organization Definition Writing Recipe

目的達成に必要な意思決定・実行・確認の分担を、最小体制として設計する作り方です。

## 1. このレシピの使い方

- 目的、関係者、主要判断から必要な責任領域を抽出します。
- 兼務可能な最小組織モデルを定めます。
- ロール・member・RACIの正本へ責務を委譲します。
- プロジェクトの目的と主要判断（Why）、必要な責任領域と最終判断先（What）、最小組織モデルと owner 方針（How）を扱い、正本の対応と見直し条件で追跡します（Trace）。Role code 全量や member 割り当ては各正本へ委譲します。

## 2. 作成前に集める情報

| 項目     | 集める情報                                             |
| -------- | ------------------------------------------------------ |
| 規模     | 参加者数、外部関係者、継続運用の有無                   |
| 判断     | 当事者価値、優先順位、費用・負荷、品質、公開           |
| 実行     | 仕様化、開発、検証、運用、AI支援                       |
| 正本     | ロール定義、メンバー定義、RACI、ステークホルダー登録簿 |
| 拡張条件 | 滞留、参加者増加、外部責任、専門性の必要性             |

## 3. 全体の作成手順

1. 必要な責任領域と最終判断を整理します。
2. 実行・確認を誰が兼務できるか決めます。
3. 人間とAI Agentの境界を明記します。
4. Schedule ownerに使うRole codeの方針を示します。
5. 情報ごとの正本を一表で示します。
6. 体制を拡張する見直し条件を定めます。

## 4. 各章の書き方

### 4.1. 組織モデル

- 全Role codeではなく、価値判断、実行、確認、公開など必要な責任領域を示します。
- 当事者・利用者の確認と内部ロールを区別します。
- 兼務しても責任境界は分けます。

### 4.2. ロール・owner方針

<!-- specdojo:finding id=F002 severity=minor rule=vp-ux-readability line=44 各章の書き方において, 良質な実例（prj-overview-recipe）のような「問い」と「書き方（コツ）」の形式を採用し, 執筆者が具体的に何を記述すべきか導く構成にしてください。 -->

- Role codeの採用と専任member配置を区別します。
- Schedule ownerは採用済みRole codeに限定します。
- 実行主体と兼務はメンバー定義へ委譲します。

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=46 採用判断を組織定義に残す責務境界として記述するよう誘導し、全Role codeを列挙しない方針との矛盾を解消してください。 -->

### 4.3. 正本と責任境界

- ロール、member、RACI、関係者の正本を分けます。
- 一覧を再掲せず、本書が扱う設計判断だけを書きます。
- 更新時にどの正本を変えるか明確にします。

### 4.4. 見直し条件

- 作業・判断の滞留、参加者増加、公開・運用責任の増加をトリガーにします。
- Role code追加前に既存責任の再配分を検討します。
- 更新先と判断者を明記します。

## 5. 深掘り手順

1. その責任領域がどの価値・判断に必要か確認します。
2. 専任化せず兼務できる領域を特定します。
3. 一人へ集中している判断と作業を分けます。
4. 一覧・定義の重複を削除します。

## 6. 良い例 / 悪い例

| 観点  | 良い例                               | 悪い例                     |
| ----- | ------------------------------------ | -------------------------- |
| 体制  | 小規模兼務で開始し、滞留時に分担する | すべてのRoleへ専任者を置く |
| Agent | 草案・検証を支援し、人間が判断する   | Agentを承認者にする        |
| 正本  | member割当はYAMLへ委譲する           | 本文にも同じ一覧を書く     |

## 7. レビュー観点

- 目的に必要な責任領域へ絞られているか。
- 最終判断と実行・確認を区別できるか。
- 正本を再掲していないか。
- 拡張条件が判断可能か。

## 8. 仕上げチェック

- 組織モデル、owner方針、正本、見直し条件がある。
- Role codeと実行主体を混同していない。
- 個人情報・連絡先を記載していない。
- Agentに最終判断を委ねていない。
- 各責任領域が目的または主要判断に対応し、owner 方針と委譲先を追跡できる。
