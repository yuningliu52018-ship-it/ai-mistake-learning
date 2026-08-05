# Vision AI 後端部署

本專案的 GitHub Pages 是公開的靜態網站，因此不可把 OpenAI API Key 寫在前端。`worker/` 提供 Cloudflare Worker 後端，金鑰只存放在 Cloudflare Secret。

## 1. 準備環境

安裝 Node.js 後，在專案目錄執行：

```bash
cd worker
npm install
npx wrangler login
```

## 2. 設定 OpenAI API Key

```bash
npx wrangler secret put OPENAI_API_KEY
```

依畫面提示貼上 API Key。不要把 API Key 寫入 GitHub、`wrangler.jsonc` 或任何前端 JavaScript。

## 3. 部署 Worker

```bash
npm run deploy
```

完成後會得到類似網址：

```text
https://ai-mistake-learning-vision.<你的 Cloudflare 子網域>.workers.dev
```

## 4. 連接 GitHub Pages

編輯根目錄的 `config.js`：

```js
window.AI_MISTAKE_CONFIG = {
  visionEndpoint: "https://ai-mistake-learning-vision.<你的 Cloudflare 子網域>.workers.dev"
};
```

Worker 已限制只接受 `https://yuningliu52018-ship-it.github.io` 的瀏覽器請求。若網站網域改變，請同步修改 `worker/wrangler.jsonc` 的 `ALLOWED_ORIGIN`。

## 5. 本機測試

在 `worker/` 建立不會提交 Git 的 `.dev.vars`：

```text
OPENAI_API_KEY=你的金鑰
```

然後執行：

```bash
npm run dev
```

## 安全提醒

- `.dev.vars`、`.env` 與 API Key 不可提交到 GitHub。
- 前端只保存 Worker 網址，不保存 OpenAI API Key。
- Origin 限制可降低一般濫用，但不是完整身分驗證。公開給大量使用者前，應再加入 Cloudflare Turnstile、Access 或使用者登入與用量限制。
- 圖片會傳送到設定的 AI API 進行辨識；請避免上傳含姓名、准考證號或其他個人資料的完整考卷。
