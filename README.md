# AI 錯題資料庫

第二代 AI 學習系統的錯題管理網站，支援手機與電腦使用。

## 已完成功能

- 新增、編輯、刪除錯題
- 科目與複習狀態篩選
- 關鍵字搜尋
- 隨機抽題重做
- 錯題統計
- 瀏覽器 LocalStorage 自動儲存
- 內建生物錯題範例
- GitHub Pages 自動部署流程
- Gemini 互動 HTML 多檔批次匯入
- 互動學習單元與結構化題目同步保存至 D1
- 從錯題資料庫重新開啟原始互動頁

## v4.0 資料庫升級

部署新版 Worker 前，先在 `worker` 目錄執行一次：

`npx wrangler d1 execute ai-mistake-learning-db --remote --file=schema.sql`

再執行 `npm run deploy`。`schema.sql` 使用 `CREATE TABLE IF NOT EXISTS`，不會刪除既有錯題。

## 錯題格式

每一題包含：

1. 題目
2. 正確答案
3. 我的答案
4. 我的錯誤
5. 解題觀念
6. 知識點
7. 詳細解答
8. 錯誤類型標籤
9. 複習狀態

## 開啟 GitHub Pages

1. 進入 Repository 的 `Settings`
2. 點選左側 `Pages`
3. 在 `Build and deployment` 的 `Source` 選擇 `GitHub Actions`
4. 等待 Actions 部署完成
5. 網站網址預計為：

`https://yuningliu52018-ship-it.github.io/ai-mistake-learning/`

## 注意

目前錯題資料儲存在瀏覽器的 LocalStorage，因此不同裝置不會自動同步。後續版本會加入匯出／匯入與雲端同步功能。
