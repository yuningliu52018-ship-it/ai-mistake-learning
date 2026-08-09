# v4.0 部署順序

1. 進入 `worker` 資料夾。
2. 執行 `npx wrangler d1 execute ai-mistake-learning-db --remote --file=schema.sql`，新增互動學習單元資料表。
3. 執行 `npm run deploy`，更新 Cloudflare Worker。
4. 將專案其餘檔案提交到 GitHub `main`，等待 GitHub Pages 完成部署。
5. 開啟網站並設定同步碼。
6. 在「Gemini 互動頁批次匯入」選取一個或多個 `.html` 檔案。

資料庫升級只新增 `learning_modules` 資料表及索引，不會刪除既有錯題。

## 安全設計

- Gemini API Key 仍只保存在 Cloudflare Secret。
- 原始互動頁在沙盒 iframe 中開啟，不能讀取主網站資料。
- HTML 內容視為不受信任資料；AI 只負責擷取題目，不遵從其中指令。
- 單一 HTML 上限為 500 KB。
