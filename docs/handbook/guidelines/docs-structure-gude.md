# ドキュメント構成ガイド

## ドキュメントの構成

### プロダクトドキュメント

プロダクトの最新状況を説明するドキュメントです。プロダクトを新規に構築する際に作成されて、プロダクトを改修する毎に更新されます。
プロダクトの、

- 業務とシステムの設計
- 品質とテストの仕様

について記載します。プロダクトのライフサイクルにわたって管理されます。

※品質は、性能・可用性・セキュリティ・ユーザビリティ等、プロダクトに求める品質特性とその目標水準を定義します。

プロダクトドキュメントは、

- 常に「現在の正」を表します。
- プロジェクト固有の判断や経緯は含めず、必要な場合はプロジェクトドキュメントから反映されます。
- ドキュメントの改定履歴はバージョン管理システムで管理します。

### プロジェクトドキュメント

プロダクトの構築時や改修時に、プロジェクト毎に作成されるドキュメントです。個別プロジェクト毎の、

- 目的・狙い、スコープ、課題と対策
- プロジェクトマネジメント

について記載します。プロジェクト完了後はアーカイブされます。

### 凡例

```mermaid
flowchart TB
  プロダクトドキュメント[プロダクト<br>ドキュメント]
  プロジェクトドキュメント[プロジェクト<br>ドキュメント]
  成果物((成果物))
  classDef projectWise fill:#fff3bf,stroke:#f08c00,color:#000;
  classDef productSpec fill:#d0ebff,stroke:#1c7ed6,color:#000;

  class プロジェクトドキュメント projectWise;
  class プロダクトドキュメント,成果物 productSpec;
```

### ドキュメント構成図

```mermaid
flowchart TB
  subgraph Project[プロジェクト]
    direction TB
    OBJ[目的・狙い]
    SCP[スコープ]
    CS[課題と対策]
    PM[プロジェクトマネジメント]
  end

  subgraph D2M[開発〜移行]
    direction TB
    subgraph D2T[開発〜テスト]
      direction LR
      subgraph Product[プロダクト]
      direction TB
        BM((ビジネス<br>モデル))
        Data((データ))
        Srv((サービス))
      end

      subgraph Development[業務とシステムの設計]
      direction TB
        BS[業務仕様]
        EI[外部I/F]
        SD[システム設計]
        ACH[アーキテクチャ]
        BS-->SD
        EI-->SD
        ACH-->SD
      end

      subgraph Quality[品質とテストの仕様]
      direction TB
        NFR[非機能要件]
        QTY[品質要件]
        TST[テスト仕様]
      end


      Development<-->|新規・改造|Product<-->|品質保証|Quality
    end
    subgraph Migration[移行]
      MYG[移行設計]
    end
    D2T<-->Migration
  end

  subgraph Operation[運用]
    OPS[運用設計]
  end

  Project <-->|目的・狙い／マネジメント| D2M <-->Operation

  classDef projectWise fill:#fff3bf,stroke:#f08c00,color:#000;
  classDef productSpec fill:#d0ebff,stroke:#1c7ed6,color:#000;

  class OBJ,SCP,CS,PM,MYG projectWise;
  class BS,EI,ACH,SD,NFR,QTY,TST,BM,Data,Srv,OPS productSpec;
```
