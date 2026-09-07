---
specdojo:
  id: prj-0001:pjr-rp1k-maintenance-finding-instruction
  type: project
  status: draft
  rulebook: specdojo:pjr-rulebook
  part_of:
    - prj-0001:pjr-index
  item_type: todo
  item_status: open
  priority: high
  owner: ARC
  registered_at: "2026-09-07T09:59:12Z"
  due_on: "2026-09-30"
---

# PJR-RP1K maintenance と bootstrap の plan で finding を修正の根拠に据える

## 1. 概要

`maintenance` と `bootstrap` の exec テンプレートは finding へ言及するが、記述が指示として弱い。
agent が finding コメントを削除するだけで完了と解釈する余地がある。

## 2. 現状の記述

`xep-sample-maintenance-template.md` の例である。他の4件も同じ構造を持つ。

```text
## 4. 進め方

1. 見直し対象の sample を読み込み、現状の粒度・文体・表の書き方を把握する。
2. 複数の成果物・review result・対象領域の慣行を根拠に、それらが完成例として適切かを見直す。
3. rulebook の必須項目・禁止事項を満たす最小の記述例になるよう再構成し、実成果物の丸写しを避ける。
4. 既存記述のうち、根拠と整合しない・陳腐化したものは見直し、整合するものは維持する。

対象 sample に `specdojo.grade` と `specdojo:finding` がある場合は、同じ viewpoint ID で根拠を
確認し、該当箇所を修正した finding コメントだけを削除する。修正後の再評価で構造・整合性が
劣化していないことを確認する。
```

## 3. 問題

### 3.1. finding が手順に入っていない

番号付き手順 1〜4 は finding へ触れない。根拠として示されるのは「成果物・review result・対象
領域の慣行」であり、finding は含まれない。finding への言及は手順の外にある1文だけである。

agent が手順に従って作業すると、finding を根拠にしない見直しが行われる。

### 3.2. 主動詞が「削除する」

該当文の構造は「〜finding コメントだけを削除する」であり、主動詞は削除である。修正は「該当
箇所を修正した」という修飾句に埋もれている。

「修正済みのコメントを削除せよ」とも読める。修正そのものを求める指示になっていない。

### 3.3. 順序が示されていない

「修正してから削除する」という順序が明示されない。削除だけが実行される余地が残る。

## 4. 実際のリスク

`br-sample.md` の blocker である。

```text
severity=blocker rule=vp-qe-kata-conformance line=9
ルールブックで定義された標準テンプレートに従っておらず、
ビジネスルールの書き方を示すサンプルとしての役割を果たしていない。
```

対象 sample の章構成は次のとおりで、rulebook が定める構成と一致しない。

```text
1. 目的と適用範囲 / 2. 入力情報 / 3. 記述内容 / 4. 最小記述例 / 5. 未解決事項
```

この finding は章構成の全面的な書き直しを求める。しかし現状の記述では、コメントを削除して
完了としても指示に反したとは言い切れない。

sample は 87 件中 35 件が `fail` で、同種の blocker を含む。全件で同じことが起こりうる。

## 5. 完了条件

- finding が番号付き手順の一部として組み込まれている。手順の外の補足ではない。
- 「finding を根拠に修正する」ことが主目的として示されている。削除は修正後の後処理として
  位置づけられる。
- 「修正 → 確認 → 削除」の順序が明示されている。
- 未解消の finding はコメントを残すことが示されている。判断できない場合の扱いも定める。
- 対象は `maintenance` 4件と `bootstrap` の計5テンプレートで、記述が揃っている。
- sample 数件で実行し、章構成が実際に修正されることを確認している。コメントだけが消えて本文が
  変わらない結果になっていない。

## 6. 検討事項

- finding を手順のどこへ置くかを決める。読み込みの直後に置いて根拠として扱うか、見直しの観点
  として各手順へ織り込むか。
- severity による扱いの差を設けるか。`blocker` と `major` は必ず対応し、`minor` は判断に委ねる
  という区別があり得る。
- 修正できない finding の扱いを定める。根拠が不足する場合、rulebook 側の問題である場合、
  判断を要する場合がある。コメントを残したうえで result へ理由を記録する形が考えられる。
- 検証の方法を決める。修正の前後で章構成が変わったかを機械的に確認できると確実だが、内容の
  妥当性までは測れない。再評価で finding が減ることを指標にする案もある。

## 7. 作業内容

| No  | 作業                                 | 担当 | 状態 | メモ                         |
| --- | ------------------------------------ | ---- | ---- | ---------------------------- |
| 1   | finding を手順へ組み込む位置を決める | ARC  | open | 5テンプレートで揃える        |
| 2   | 修正を主目的とする記述へ改める       | ARC  | open | 削除は後処理として位置づける |
| 3   | 未解消 finding の扱いを定める        | ARC  | open | 残す条件と result への記録   |
| 4   | 5テンプレートへ反映する              | ARC  | open | maintenance 4件と bootstrap  |
| 5   | sample 数件で実行して確認する        | ARC  | open | 本文が実際に変わること       |

## 8. 対応結果

_TODO_: 完了時に、実施内容・成果物・残課題を記載する。未完了の場合は `-` とする。

## 9. 関連ドキュメント

- [[prj-0001:pjr-9py9-maintenance-plan-findings]]: 誤った前提で起票し reject した項目。本項目は
  別の欠陥を扱う。
- [[prj-0001:pjr-2w38-sample-quality-observation]]: 修正対象となる kata の品質観測。
- [[prj-0001:pjr-49d2-quality-assessment]]: finding を記録する grade の起点。
