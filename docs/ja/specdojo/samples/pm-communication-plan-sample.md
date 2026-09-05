---
specdojo:
  id: specdojo:pm-communication-plan-sample
  type: project
  status: ready
  rulebook: specdojo:pm-communication-plan-rulebook
  based_on:
    - specdojo:pm-plan-sample
    - specdojo:prj-stakeholder-register-sample
  grade:
    rubric: grade-rubric-v1
    target: kata
    verdict: needs-work
    score: 66
    graded_at: "2026-09-05T19:09:52.471Z"
    graded_by: codex-expert-executor
    content_hash: 3c7a415729e2af30f05dba4c52ba555ed78e4d9e896c33b908b2b17dac0aaacf
    categories:
      consistency: { score: 38 }
      usability: { score: 83 }
      architecture: { score: 100 }
      quality: { score: 50 }
    viewpoints:
      vp-arc-cross-document-consistency: { level: 2, score: 50 }
      vp-arc-conciseness: { level: 4, score: 100 }
      vp-arc-single-responsibility: { level: 4, score: 100 }
      vp-qe-verifiability: { level: 2, score: 50 }
      vp-qe-omissions-consistency: { level: 1, score: 25 }
      vp-qe-kata-conformance: { level: 2, score: 50 }
      vp-ux-readability: { level: 3, score: 75 }
      vp-ux-language-consistency: { level: 3, score: 75 }
      vp-arc-document-structure: { level: 4, score: 100 }
    findings: { blocker: 0, major: 5, minor: 9, note: 0 }
---

# コミュニケーション計画: 駄菓子屋きぬや 販売管理システム

## 1. 方針と適用範囲

<!-- specdojo:finding id=F006 severity=minor rule=vp-qe-omissions-consistency line=5 必須の「方針と適用範囲」に、人間と AI Agent の責任境界が記載されていないため、Agent は整理・草案を支援しても合意・承認・公開判断を行わないことを明記してほしい。 -->
<!-- specdojo:finding id=F009 severity=major rule=vp-qe-kata-conformance line=5 完成 sample でありながらテンプレートが方針章に求める人間と AI Agent の境界と、ルールブックが求める秘密・個人情報の Agent 入力禁止が具体化されていないため、実運用可能な方針として補完してほしい。 -->
<!-- specdojo:finding id=F012 severity=minor rule=vp-ux-readability line=5 「各正本」がどの文書を指すか本文から解決できず、Schedule・課題・決定記録などの参照先も示されていないため、関連文書の ID または参照先を簡潔に列挙してほしい。 -->

店主、家族利用者、開発担当が、営業を妨げずに初期リリースと店頭試用を判断できるようにする。非同期の記録を基本とし、会議は利用者確認または意思決定が必要な場合だけ行う。役割や連絡先の一覧は各正本へ委譲する。

## 2. コミュニケーション機会

<!-- specdojo:finding id=F001 severity=major rule=vp-arc-cross-document-consistency line=9 `prj-stakeholder-register-sample` がコミュニケーション計画への反映を求める開発担当のイテレーション末確認と技術メンターの週次相談について、対象・契機・証跡を識別できる行がないため追加してほしい。 -->
<!-- specdojo:finding id=F003 severity=major rule=vp-qe-verifiability line=11 「重大変更時」「重大な懸念」「重大な影響」の判定基準がなく通知・エスカレーション要否を再現可能に判定できないため、正本の数値・状態条件への参照または具体的な閾値を記載してほしい。 -->
<!-- specdojo:finding id=F004 severity=major rule=vp-qe-omissions-consistency line=9 ステークホルダー登録簿で後続計画への反映が明記された開発担当と技術メンターのコミュニケーション要件が機会表から欠落しているため、対応する対象・内容・時期・手段・責任・証跡を追加してほしい。 -->
<!-- specdojo:finding id=F010 severity=minor rule=vp-qe-kata-conformance line=9 ルールブックは関係者をステークホルダー ID または Role code で記述するよう求めているが、機会表が「店主」「家族利用者」などの名称だけを使用しているため、登録簿の ID に対応させてほしい。 -->
<!-- specdojo:finding id=F013 severity=minor rule=vp-ux-readability line=13 「進捗共有」と「受入確認」は「対象・機会」列に受信者がなく、誰への共有・確認か初見で判断できないため、対象となるステークホルダー ID または Role code を明記してほしい。 -->
<!-- specdojo:finding id=F014 severity=minor rule=vp-ux-language-consistency line=11 登録簿の正式な「店主代表」および `STH-SHOP-OWNER` に対して「店主」を使用し、家族利用者も ID を省略しているため、関係者ラベルを登録簿の名称と ID に統一してほしい。 -->

| 対象・機会             | 伝える・確認する内容                 | タイミング           | 手段                    | 責任 | 証跡               |
| ---------------------- | ------------------------------------ | -------------------- | ----------------------- | ---- | ------------------ |
| 店主への計画確認       | 対象範囲、試用日、費用・時間上限     | 着手前、重大変更時   | 対面または記録コメント  | PM   | 承認記録           |
| 家族利用者との試用準備 | 操作方法、確認項目、困り事の伝え方   | 試用前               | 短時間の実演            | BA   | 確認メモ           |
| 進捗共有               | 完了、次の作業、ブロック、必要な判断 | 節目または状態変化時 | Schedule と記録コメント | PM   | Schedule、課題     |
| 受入確認               | 受入条件、試験結果、未解決事項       | リリース前           | レビュー                | QE   | レビュー結果       |
| 試用結果の確認         | 利用継続、追加負担、改善候補         | 試用終了時           | 店主・家族への聞き取り  | BA   | 試用結果、決定記録 |

## 3. エスカレーション

<!-- specdojo:finding id=F002 severity=minor rule=vp-arc-cross-document-consistency line=23 `pm-plan-sample` は品質・個人情報の重大懸念時の PO 判断材料整理を PM に割り当て, `pm-raci-sample` は変更要求・リリース判断を PM=R、QE=C とするため, 品質・個人情報・公開適性を QE の一次対応一行に統合せず PM/QE の分担を明記してほしい。 -->

| 条件                                 | 一次対応                        | 最終判断 | 証跡               |
| ------------------------------------ | ------------------------------- | -------- | ------------------ |
| 利用者価値または受入条件が曖昧       | BA が事実と選択肢を整理する     | PO       | 確認メモ、決定記録 |
| 費用・参加時間の上限を超える見込み   | PM が縮小案と中止案を整理する   | PO       | 課題、決定記録     |
| 品質、個人情報、公開適性に重大な懸念 | QE が対象を隔離し影響を整理する | PO       | レビュー、決定記録 |
| 範囲または試用日へ重大な影響         | PM が代替案と推奨案を整理する   | PO       | 変更要求、決定記録 |

## 4. 情報管理と公開

<!-- specdojo:finding id=F005 severity=major rule=vp-qe-omissions-consistency line=29 顧客情報、つけ残高、連絡先、認証情報について公開資料と一般共有チャネルだけを禁止しており、ルールブックが禁止する AI Agent 入力が対象外になっているため、Agent 入力にも含めないことを明記してほしい。 -->
<!-- specdojo:finding id=F007 severity=minor rule=vp-qe-omissions-consistency line=28 「正本」という総称だけでは情報区分ごとの取扱いと記録先を確認できないため、必要な情報区分と具体的な正本または参照 ID の対応を示してほしい。 -->

- 判断、課題、リスク、変更は、後から理由と次の行動を追える形で正本へ記録する。
- 顧客の氏名、つけ残高、連絡先、認証情報は公開資料や一般共有チャネルへ記載しない。
- 公開情報は匿名化し、店舗運営に不要な内部事情を含めない。
- 口頭で決まった事項は、PM が決定記録または該当する正本へ反映する。

## 5. 見直し条件と未決事項

<!-- specdojo:finding id=F008 severity=minor rule=vp-qe-omissions-consistency line=35 未決事項にルールブック所定の `_UNDECIDED_:` ラベルがなく機械的・視覚的に識別できないため、決定時期と判断者を保持したまま所定の形式へ直してほしい。 -->
<!-- specdojo:finding id=F011 severity=minor rule=vp-qe-kata-conformance line=35 rulebook の未決事項形式である `_UNDECIDED_:` を使用していないため、template に沿った完成例へ修正してほしい。 -->

参加者、試用方法、公開範囲、主な連絡手段が変わった場合に本計画を見直す。営業時間外の緊急連絡手段は、店頭試用の開始前に PO が決定する。
