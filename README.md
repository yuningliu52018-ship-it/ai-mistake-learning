# Eva的資料庫

收藏日文文法漫畫、互動學習單元與錯題筆記的學習資料庫。首頁提供四個資源入口，採暖白與鼠尾草綠配色。原有錯題資料、同步碼儲存鍵與後端 API 均維持相容。

手機延續既有拍照建檔模式，並可閱讀日文漫畫；互動教材與完整錯題整理功能使用桌機。

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

## 日文文法漫畫

首頁「日文文法漫畫」連到獨立的 `japanese-comics.html`，手機與電腦皆可閱讀。

- 第1課 5 張、第2課 4 張、第3課 6 張、第4課 7 張、第5課 6 張，另有跨課補充 1 張（共 29 張）（原例句出自第3課）
- 依課程篩選；點選放大；上一張／下一張、鍵盤方向鍵及 Esc；瀏覽器返回可關閉閱讀
- 預覽採縮圖，閱讀採全尺寸無損 WebP，可另開完整原圖 WebP（與 PNG 來源像素完全一致）
- 原句與補充例句標示保留，不包含私人筆記頁面或私人連結
- 已瀏覽的漫畫可由瀏覽器快取讀取；首次閱讀未快取的圖片仍需網路
- 漫畫頁不讀寫錯題資料，也不使用後端或同步碼

靜態回歸檢查（Node.js 18 以上）：

`node --test tests/japanese-comics.test.cjs`

本機預覽可於專案根目錄執行 `python3 -m http.server 8765`，再開啟 `http://localhost:8765/japanese-comics.html`。

## 第1張有聲漫畫

`voiced-comic.html` 只為第1課「〜てもらえませんか」加入逐格閱讀與日語合成朗讀。沿用既有完整 WebP，29 張漫畫數量不變。可由第1張卡片或放大閱讀工具列進入。

- 沿用原日文網站 `japanese-ai-learning/js/lesson.js` 的 Google Translate 日語線上音源，以 HTML Audio 播放。只在使用者按播放後連線；不產生匯出音檔或錄音。
- 一般 0.95／慢速 0.82；連續聽、逐句跟讀停頓、暫停、停止、重頭播放與本句重播。
- 姓氏字幕保留「林さん」，送往 Google 朗讀的台詞為「りんさん」。第1格只有中文情境，不添加日文台詞。
- 使用者按下播放才開始；同一個 Audio 元素用於後續句子。暫停後繼續會從本句重播。
- 只有收到音訊開始與結束事件才推進。載入失敗、播放被擋或逾時均停在本句並提供重試；完全沒有裝置語音替代。
- 切換格數／離頁／進背景會取消或暫停音訊；取消會清除事件與計時器，避免過期事件切換句子。
- 語音需要網路，來源可用性受 Google 服務影響。iPhone 使用者若遇到播放限制，可直接在 Safari 按「重試播放」。

完整靜態與播放器狀態測試：`node --test tests/*.test.cjs`。
