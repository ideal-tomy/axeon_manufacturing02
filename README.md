# Quality Incident Console

製造現場の品質インシデントを、発見から是正・ナレッジ化まで一つの流れで確認できる新規デモです。既存の `axeon_manufacturing` とは分離した実装です。

## 起動

```powershell
npm run dev
```

ブラウザで <http://localhost:5190/quality-incident-console> を開きます。

## デプロイ（Vercel）

静的サイトとして配信します。ローカル用の `local-dev.mjs` は Vercel では使いません（`server.mjs` / `*server.mjs` だと Vercel が Node サーバ入口と誤検出するため）。

- ルート `/` と `/quality-incident-console` の両方で同じ `index.html` が開きます
- GitHub の `main` へ push すると自動デプロイされます

## 画面フロー

1. Hero: A-214の異常を起点に品質インシデントの全体像を提示（紹介アニメあり）
2. Dashboard: KPI、ライン状態、異常一覧を確認
3. Incident Detail: 検出画像、AI分析、時系列を確認
4. Root Cause: 相関候補と根本要因を整理
5. Corrective: 是正措置、承認、ナレッジ登録を確認

Hero の「使い方を見てみる」は、優先案件→写真とAI→原因と根拠→是正・承認の流れを約55秒で再生します（型B・PCコンソールのみ）。台本は `src/demo-intro/README.md`。

画面内の `ダッシュボードへ`, `AI分析を見る`, `根本要因を見る`, `是正措置へ` から順に遷移できます。

## 検証

```powershell
npm run check
node qa/smoke.mjs
node qa/hero.mjs
```

Playwrightで1440pxと390pxを確認し、横方向のオーバーフロー、画像読み込み、コンソールエラー、主要導線を検証しています。スクリーンショットは `qa/screens` に出力されます。
