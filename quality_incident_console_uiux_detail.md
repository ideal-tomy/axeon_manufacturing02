# Quality Incident Console — UI/UX詳細設計補足

この文書は `quality_incident_console_spec.md` の補足資料です。

目的：
- Hero文言を洗練する
- 各画面のワイヤーフレームを具体化する
- 不具合写真の構図を統一する
- Codexが迷わないコンポーネント構成に落とす

---

# 1. Hero用の文言をさらに洗練した版

## 推奨採用

**Eyebrow**

QUALITY INCIDENT CONSOLE

**Headline**

# 現場で見つかった異常を、
# 是正と再発防止までつなげる。

**Subcopy**

不具合写真、検査結果、設備履歴、類似事例。  
散らばった情報をひとつにつなぎ、原因調査から是正完了までを一連で進めます。

**Primary CTA**

コンソールを開く

**Secondary CTA**

AI分析を見る

## 代替案A：より短く印象的

# 異常を見つけた、その先まで。

検出、分析、原因調査、是正、承認。  
不具合対応の流れを、ひとつのコンソールに。

CTA：コンソールを開く

## 代替案B：より実務寄り

# 不具合対応を、
# 個別確認から一連の判断へ。

現場写真、検査記録、設備履歴、過去事例をまとめて確認。  
原因候補、是正処置、承認までを一つの流れで追えます。

CTA：不具合対応を体験する

## 文言ルール

- Heroだけは価値訴求してよい
- Console内部では説明コピーを大幅に減らす
- 「DX」「AI活用」「最適化」は前面に出しすぎない
- 実機画面は状態、写真、履歴、根拠、承認で語る

---

# 2. 全体ナビゲーション

Console以降は共通Shellを使用する。

```text
Quality Incident Console

ダッシュボード
不具合一覧
AI分析
原因調査
是正・承認

────────────
サンプル工場
デモデータ
```

方針：
- Heroは別レイアウト
- Console以降は同じサイドナビ
- ナビ選択状態を明確にする
- ページごとにShellを作り直さない
- 画面の変化は「中身」で出す

---

# 3. 各画面のワイヤーフレーム指示

## 3-1. Hero / Top

```text
┌──────────────────────────────────────────────────────────────┐
│ Logo / Quality Incident Console                  DEMO        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  QUALITY INCIDENT CONSOLE        ┌────────────────────────┐  │
│                                  │                        │  │
│  現場で見つかった異常を、       │   不具合写真          │  │
│  是正と再発防止までつなげる。   │                        │  │
│                                  │      [検出枠]          │  │
│  不具合写真、検査結果、          │                        │  │
│  設備履歴、類似事例。            │   要因調査中          │  │
│                                  │                        │  │
│  [コンソールを開く]             └────────────────────────┘  │
│  [AI分析を見る]                                               │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ 統合ダッシュボード │ AI分析 │ 原因調査 │ 是正・承認       │
└──────────────────────────────────────────────────────────────┘
```

### レイアウト
- 左46% / 右54%
- 不具合写真がHeroの主役
- CTAは左下
- 4機能カードは下部
- 画像上に小さなUI overlay

### 画像overlay
- `要因調査中`
- defect detection box
- `表面キズ`
- `14:08`
- severity badge

### 禁止
- KPIをHeroに大量配置
- 長文
- 写真を背景にして文字を大量に重ねる

---

## 3-2. 統合ダッシュボード

```text
┌──────────────┬───────────────────────────────────────────────┐
│ Side Nav     │ Dashboard                                     │
│              │                                               │
│ Overview     │ 12          2          4          7            │
│ Incidents    │ 本日の不具合 重大度高  対応中     クローズ      │
│ AI Analysis  │                                               │
│ Root Cause   │ ┌──────────────────────┐ ┌──────────────────┐ │
│ Corrective   │ │ 優先対応中           │ │ 最近のイベント   │ │
│              │ │ [PHOTO]              │ │ 14:08 キズ検出    │ │
│              │ │ 主力部品 A-214       │ │ 14:12 類似照合    │ │
│              │ │ 表面キズ             │ │ 14:16 原因候補    │ │
│              │ │ 要因調査中           │ │ ...               │ │
│              │ │ [詳細を見る]         │ │                   │ │
│              │ └──────────────────────┘ └──────────────────┘ │
│              │                                               │
│              │ ┌───────────────────────────────────────────┐ │
│              │ │ 不具合一覧                                │ │
│              │ │ PHOTO  A-214 表面キズ  Cライン  要因調査 │ │
│              │ │ PHOTO  B-103 打痕      Aライン  確認待ち │ │
│              │ │ PHOTO  M-202 塗装ムラ  Bライン  完了     │ │
│              │ └───────────────────────────────────────────┘ │
└──────────────┴───────────────────────────────────────────────┘
```

### 主役
「優先対応中」のA-214。

### UIルール
- KPIは小さく整然と
- 写真付き優先案件を最も強く
- イベントフィードで時間の流れを出す
- 一覧にはサムネイルを必ず入れる
- 大見出しによる説明は不要

---

## 3-3. 不具合詳細 / AI分析

```text
┌──────────────┬───────────────────────────────────────────────┐
│ Side Nav     │ A-214 / 表面キズ                 要因調査中   │
│              ├───────────────────────────────────────────────┤
│              │                                               │
│              │ ┌────────────────────┐ ┌───────────────────┐ │
│              │ │                    │ │ AI ANALYSIS       │ │
│              │ │   LARGE PHOTO      │ │                   │ │
│              │ │                    │ │ 不良種別          │ │
│              │ │    [検出BOX]       │ │ 表面キズ          │ │
│              │ │                    │ │                   │ │
│              │ │                    │ │ 信頼度 91%        │ │
│              │ └────────────────────┘ │ 重大度 中          │ │
│              │ ┌───────┐ ┌───────┐   │                   │ │
│              │ │拡大1  │ │拡大2  │   │ 原因調査へ →      │ │
│              │ └───────┘ └───────┘   └───────────────────┘ │
│              │                                               │
│              │ ┌───────────────────────────────────────────┐ │
│              │ │ 関連情報                                  │ │
│              │ │ LOT / 工程 / 検査者 / 類似事例 / 設備    │ │
│              │ └───────────────────────────────────────────┘ │
└──────────────┴───────────────────────────────────────────────┘
```

### 視線順
1. 不具合写真
2. 検出箇所
3. AI判定
4. 関連情報

### 操作
- 画像クリック：拡大
- detection box hover：異常ラベル
- 類似画像クリック：比較表示
- CTA：原因調査へ

---

## 3-4. 原因調査 / 相関ビュー

```text
┌──────────────┬───────────────────────────────────────────────┐
│ Side Nav     │ Root Cause Analysis                           │
│              ├──────────────┬─────────────────┬─────────────┤
│              │ Timeline     │ Correlation     │ 原因候補    │
│              │              │                 │             │
│              │ 13:42        │ [搬送治具]      │ 1 接触痕    │
│              │ 加工完了     │     │           │   可能性高  │
│              │              │     ▼           │             │
│              │ 13:49        │ [Cライン]       │ 2 仮置き    │
│              │ 搬送         │    ↙  ↘         │             │
│              │              │ [検査] [類似]   │ 3 保管接触  │
│              │ 13:54        │      \ /        │             │
│              │ 外観検査     │    [AI分析]     │             │
│              │              │                 │             │
│              │ 14:08        │                 │             │
│              │ キズ検出     │                 │             │
│              ├──────────────┴─────────────────┴─────────────┤
│              │ 根拠: 類似画像 / 同一ライン3件 / 治具履歴   │
└──────────────┴───────────────────────────────────────────────┘
```

### 見た目
- 左：タイムライン
- 中央：相関ノード
- 右：原因候補ランキング
- 下：根拠カード

### Interaction
- node hover：関連線のみ強調
- 原因候補クリック：関連根拠のみhighlight
- timeline itemクリック：該当ノードへfocus

### Motion
timeline → correlation → cause ranking の順に軽く表示。  
派手な線アニメーションは禁止。

---

## 3-5. 是正処置 / 承認 / ナレッジ化

```text
┌──────────────┬───────────────────────────────────────────────┐
│ Side Nav     │ Corrective Action              是正完了       │
│              ├───────────────────────────────────────────────┤
│              │                                               │
│              │ ┌────────────────┐ ┌──────────────────────┐  │
│              │ │ 是正処置案     │ │ 実施記録             │  │
│              │ │ ✓ 治具点検     │ │ 担当 山本             │  │
│              │ │ ✓ 保護材交換   │ │ 15:20 実施            │  │
│              │ │ ✓ 検査追加     │ │ 再発なし              │  │
│              │ └────────────────┘ └──────────────────────┘  │
│              │                                               │
│              │ ┌────────────────────┐ ┌──────────────────┐  │
│              │ │ 報告書プレビュー   │ │ 承認・反映       │  │
│              │ │ [PHOTO]            │ │ ✓ 責任者確認     │  │
│              │ │ 不具合概要         │ │ ✓ 標準書反映     │  │
│              │ │ 原因 / 是正        │ │ ✓ ナレッジ登録   │  │
│              │ │ [PDF保存]          │ │ [承認済み]       │  │
│              │ └────────────────────┘ └──────────────────┘  │
└──────────────┴───────────────────────────────────────────────┘
```

### 最終演出
- 対応中 → 是正完了
- 承認待ち → 承認済み
- ナレッジ未登録 → 登録済み

Success greenはこのページだけ少し増やしてよい。

---

# 4. 不具合写真の参考構図案

## 4-1. Hero用写真

### 構図
- 金属製の精密部品を1点大きく配置
- 斜め45度程度
- 表面の金属質感が分かる
- 右上端部に細い擦り傷
- 背景は清潔な品質検査台
- 浅い被写界深度
- 人物不要
- UI overlayを置ける余白を確保

### 印象
- premium industrial photography
- Japanese precision manufacturing
- cool neutral tone
- controlled lighting
- clean and realistic

### 避ける
- 火花
- 工場夜景
- SFレーザー
- 大破した部品
- 汚すぎる環境

## 4-2. Detail用

同じA-214を使用。

- 全体写真
- 2倍拡大
- 5倍拡大

の3種類を用意。

異常箇所の周囲には余白を残し、後からUIの検出枠を重ねやすくする。

## 4-3. 類似事例

同一照明・同一素材感で以下3枚。

- 類似キズ1：位置が近い
- 類似キズ2：形状が近い
- 正常品：比較用

## 4-4. 原因調査用

### 搬送治具
- 金属治具
- 接触面が見える
- 部品が触れる箇所が分かる

### 仮置き工程
- 作業台に置かれた複数部品
- 人物は手元だけなら可
- 擦れが起きそうな関係が視覚化できる

### 外観検査
- 検査台または検査カメラ
- 部品が撮影対象になっている

---

# 5. 不具合写真生成用プロンプト

## Hero

```text
A premium industrial product inspection photograph.

Show a precision-machined aluminum component placed on a clean quality inspection table inside a modern Japanese factory.

The component has a subtle but clearly visible surface scratch near the upper-right edge.

Three-quarter angle, close-up composition.
Crisp metallic texture.
Soft diffused industrial lighting.
Clean inspection environment.
Very shallow background blur.
No workers.
No readable text.
No logos.
No futuristic effects.
No sparks.
No dramatic damage.

Modern Japanese precision manufacturing.
Professional quality-control photography.
Cool neutral tones.
High-end commercial photography.
Landscape 16:9.
Leave some visual breathing room for UI overlays.
```

## Detail

```text
Close-up quality inspection photograph of the same precision-machined aluminum component.

The same subtle surface scratch is clearly visible near the upper-right edge.

Neutral inspection lighting.
Very sharp surface texture.
Minimal background.
No hands.
No tools covering the defect.
No text.
No logos.
No futuristic UI.
High-detail industrial quality-control photography.
Landscape.
```

---

# 6. Codexがそのまま作れるコンポーネント分割案

```text
components/
  quality-incident/
    shell/
      ConsoleShell.tsx
      ConsoleSidebar.tsx
      ConsoleHeader.tsx
      DemoBadge.tsx

    hero/
      HeroSection.tsx
      HeroCopy.tsx
      HeroInspectionVisual.tsx
      HeroFeatureNav.tsx

    dashboard/
      DashboardPage.tsx
      KpiRow.tsx
      PriorityIncidentCard.tsx
      IncidentTable.tsx
      IncidentRow.tsx
      EventFeed.tsx
      LineStatusChart.tsx

    incident/
      IncidentDetailPage.tsx
      IncidentHeader.tsx
      DefectImageViewer.tsx
      DefectZoomStrip.tsx
      DetectionOverlay.tsx
      AiAnalysisPanel.tsx
      IncidentMetadata.tsx
      SimilarCases.tsx

    root-cause/
      RootCausePage.tsx
      IncidentTimeline.tsx
      CorrelationGraph.tsx
      CorrelationNode.tsx
      CauseRanking.tsx
      EvidenceStrip.tsx

    corrective/
      CorrectiveActionPage.tsx
      CorrectivePlan.tsx
      ActionRecord.tsx
      ReportPreview.tsx
      ApprovalPanel.tsx
      KnowledgeStatus.tsx

    primitives/
      Surface.tsx
      StatusBadge.tsx
      Metric.tsx
      Thumbnail.tsx
      SectionHeader.tsx
      PrimaryButton.tsx
      SecondaryButton.tsx

data/
  qualityIncidentDemo.ts

hooks/
  useQualityIncidentDemo.ts

types/
  quality-incident.ts

styles/
  quality-incident-tokens.css
```

---

# 7. 型定義案

```ts
export type IncidentStatus =
  | "detected"
  | "analyzing"
  | "root_cause_review"
  | "corrective_action"
  | "approved"
  | "closed";

export type Severity = "low" | "medium" | "high";

export interface Incident {
  id: string;
  partName: string;
  defectType: string;
  line: string;
  process: string;
  lot: string;
  detectedAt: string;
  severity: Severity;
  status: IncidentStatus;
  image: string;
  zoomImages: string[];
}

export interface CauseCandidate {
  id: string;
  title: string;
  confidence: number;
  evidenceIds: string[];
}

export interface CorrectiveAction {
  id: string;
  title: string;
  completed: boolean;
}
```

---

# 8. 状態管理

backend不要。React reducerで十分。

```ts
type DemoPage =
  | "hero"
  | "dashboard"
  | "incident"
  | "root-cause"
  | "corrective";

interface DemoState {
  page: DemoPage;
  activeIncidentId: string;
  selectedCauseId?: string;
  correctiveCompleted: boolean;
  approved: boolean;
  knowledgeRegistered: boolean;
}
```

---

# 9. 実装順序

## Phase 1
- Shell
- Hero
- design tokens
- sample data

## Phase 2
- Dashboard
- incident photo assets
- Incident Detail

## Phase 3
- Root Cause
- correlation graph
- evidence cards

## Phase 4
- Corrective
- report preview
- approval transitions

## Phase 5
- motion
- responsive
- visual polish
- browser QA

---

# 10. Codexへの実装ルール

1. 大見出しで説明しすぎない
2. Hero以外はUIそのものが説明になること
3. 各画面で主役を1つ決める
4. 写真は装飾ではなく情報として使う
5. 全画面で同じA-214案件を通す
6. 画面ごとの視覚構成を変える
7. KPIカード大量配置を避ける
8. 表だけの画面にしない
9. 1画面1つ以上の視覚的な“変化”を作る
10. 最後まで仕事が進んだことを可視化する

---

# 11. 完成時の感情設計

```text
Hero
↓
「製品として良さそう」

Dashboard
↓
「状況が見やすそう」

Incident Detail
↓
「写真とAIで不具合が分かりやすい」

Root Cause
↓
「情報がつながって原因を追える」

Corrective
↓
「対応・承認・再発防止まで終わる」
```

最終ゴールは、

**「この製品なら自社の不具合対応を置き換えられそう」**

と感じてもらうこと。
