const MAX_BODY_BYTES = 8 * 1024 * 1024;

function corsHeaders(origin, allowedOrigin) {
  const allowed = origin === allowedOrigin ? origin : allowedOrigin;
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
    "Content-Type": "application/json; charset=utf-8"
  };
}

function json(data, status, origin, allowedOrigin) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders(origin, allowedOrigin) });
}

function parseDataUrl(image) {
  const match = String(image || "").match(/^data:image\/(png|jpeg|jpg|webp);base64,(.+)$/i);
  if (!match) return null;
  return {
    mimeType: match[1].toLowerCase() === "jpg" ? "image/jpeg" : `image/${match[1].toLowerCase()}`,
    data: match[2]
  };
}

function extractGeminiText(payload) {
  return (payload?.candidates || []).flatMap(c => c?.content?.parts || []).map(p => p?.text || "").join("\n").trim();
}

function parseJsonText(text) {
  const cleaned = String(text || "").trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  return JSON.parse(cleaned);
}

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(String(value));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, "0")).join("");
}

async function getSyncHash(body) {
  const key = String(body?.syncKey || "").trim();
  if (key.length < 8 || key.length > 128) throw new Error("同步碼需為 8 到 128 個字元");
  return sha256Hex(key);
}

async function ensureAccount(env, syncHash) {
  await env.DB.prepare(`INSERT INTO sync_accounts (sync_key_hash, updated_at) VALUES (?, CURRENT_TIMESTAMP)
    ON CONFLICT(sync_key_hash) DO UPDATE SET updated_at = CURRENT_TIMESTAMP`).bind(syncHash).run();
}

async function handleSync(body, env) {
  if (!env.DB) throw new Error("Server is missing D1 binding DB");
  const syncHash = await getSyncHash(body);
  await ensureAccount(env, syncHash);

  if (body.action === "syncPull") {
    const result = await env.DB.prepare("SELECT payload, updated_at FROM questions WHERE sync_key_hash = ? AND deleted_at IS NULL ORDER BY updated_at DESC")
      .bind(syncHash).all();
    const questions = (result.results || []).map(row => {
      try { return JSON.parse(row.payload); } catch { return null; }
    }).filter(Boolean);
    return { questions, syncedAt: new Date().toISOString() };
  }

  if (body.action === "syncPush") {
    const items = Array.isArray(body.questions) ? body.questions.slice(0, 50) : [];
    if (!items.length) return { saved: 0 };
    const statements = items.map(item => {
      const id = String(item?.id || "").trim();
      if (!id) throw new Error("題目缺少 id");
      const updatedAt = String(item?.updatedAt || item?.createdAt || new Date().toISOString());
      return env.DB.prepare(`INSERT INTO questions (sync_key_hash, id, payload, updated_at, deleted_at)
        VALUES (?, ?, ?, ?, NULL)
        ON CONFLICT(sync_key_hash, id) DO UPDATE SET
          payload = excluded.payload,
          updated_at = excluded.updated_at,
          deleted_at = NULL
        WHERE excluded.updated_at >= questions.updated_at`)
        .bind(syncHash, id, JSON.stringify(item), updatedAt);
    });
    await env.DB.batch(statements);
    return { saved: items.length, syncedAt: new Date().toISOString() };
  }

  if (body.action === "syncDelete") {
    const id = String(body?.id || "").trim();
    if (!id) throw new Error("缺少題目 id");
    const deletedAt = String(body?.deletedAt || new Date().toISOString());
    await env.DB.prepare(`INSERT INTO questions (sync_key_hash, id, payload, updated_at, deleted_at)
      VALUES (?, ?, '{}', ?, ?)
      ON CONFLICT(sync_key_hash, id) DO UPDATE SET updated_at = excluded.updated_at, deleted_at = excluded.deleted_at
      WHERE excluded.updated_at >= questions.updated_at`)
      .bind(syncHash, id, deletedAt, deletedAt).run();
    return { deleted: id, syncedAt: new Date().toISOString() };
  }

  throw new Error("Unknown sync action");
}

async function callGemini(env, prompt, responseSchema, extraParts = []) {
  const model = env.GEMINI_MODEL || "gemini-3.6-flash";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY)}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }, ...extraParts] }],
      generationConfig: { temperature: 0.2, responseMimeType: "application/json", responseSchema }
    })
  });
  const raw = await response.json();
  if (!response.ok) throw new Error(raw?.error?.message || "Unknown Gemini API error");
  return parseJsonText(extractGeminiText(raw));
}

const QUESTION_SCHEMA = {
  type: "OBJECT",
  properties: {
    subject: { type: "STRING", enum: ["國文", "英文", "數學", "自然", "社會"] },
    chapter: { type: "STRING" }, questionType: { type: "STRING" }, difficulty: { type: "INTEGER" },
    questionNumber: { type: "STRING" }, question: { type: "STRING" },
    options: { type: "OBJECT", properties: { A:{type:"STRING"}, B:{type:"STRING"}, C:{type:"STRING"}, D:{type:"STRING"} }, required:["A","B","C","D"] },
    studentAnswer: { type: "STRING" }, correctAnswer: { type: "STRING" }, mistake: { type: "STRING" },
    concept: { type: "STRING" }, knowledge: { type: "STRING" }, explanation: { type: "STRING" },
    tags: { type: "ARRAY", items: { type: "STRING" } }, confidence: { type: "INTEGER" }, notes: { type: "STRING" }
  },
  required: ["subject","chapter","questionType","difficulty","questionNumber","question","options","studentAnswer","correctAnswer","mistake","concept","knowledge","explanation","tags","confidence","notes"]
};

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigin = env.ALLOWED_ORIGIN || "https://yuningliu52018-ship-it.github.io";
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(origin, allowedOrigin) });
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, origin, allowedOrigin);
    if (origin !== allowedOrigin) return json({ error: "Origin not allowed" }, 403, origin, allowedOrigin);
    if (Number(request.headers.get("Content-Length") || 0) > MAX_BODY_BYTES) return json({ error: "Request is too large" }, 413, origin, allowedOrigin);

    let body;
    try { body = await request.json(); }
    catch { return json({ error: "Invalid JSON body" }, 400, origin, allowedOrigin); }

    try {
      if (["syncPull", "syncPush", "syncDelete"].includes(body?.action)) {
        return json(await handleSync(body, env), 200, origin, allowedOrigin);
      }

      if (!env.GEMINI_API_KEY) return json({ error: "Server is missing GEMINI_API_KEY" }, 500, origin, allowedOrigin);

      if (body?.action === "generateSimilar") {
        const source = body?.question || {};
        const prompt = `你是台灣國中會考命題老師。請根據以下錯題，生成 3 題同核心觀念但情境、數字或敘述不同的四選一練習題。\n\n科目：${String(source.subject || "未知").slice(0,20)}\n章節：${String(source.chapter || "").slice(0,80)}\n題型：${String(source.questionType || "").slice(0,40)}\n原題：${String(source.question || "").slice(0,5000)}\n正確答案：${String(source.correctAnswer || "").slice(0,500)}\n核心觀念：${String(source.concept || "").slice(0,1500)}\n知識點：${String(source.knowledge || "").slice(0,1500)}\n\n規則：\n1. 每題都必須有 A、B、C、D 四個選項。\n2. 不能只是換選項順序，要真正改變題目情境。\n3. 難度可分成原題相近、稍簡單、稍困難各一題。\n4. correctAnswer 只填 A、B、C 或 D。\n5. explanation 要清楚說明答案與其他選項。\n6. 全部使用繁體中文。`;
        const schema = { type:"OBJECT", properties:{ questions:{ type:"ARRAY", items:{ type:"OBJECT", properties:{
          subject:{type:"STRING",enum:["國文","英文","數學","自然","社會"]}, chapter:{type:"STRING"}, questionType:{type:"STRING"}, difficulty:{type:"INTEGER"}, question:{type:"STRING"},
          options:{type:"OBJECT",properties:{A:{type:"STRING"},B:{type:"STRING"},C:{type:"STRING"},D:{type:"STRING"}},required:["A","B","C","D"]},
          correctAnswer:{type:"STRING"}, concept:{type:"STRING"}, knowledge:{type:"STRING"}, explanation:{type:"STRING"}, tags:{type:"ARRAY",items:{type:"STRING"}}
        }, required:["subject","chapter","questionType","difficulty","question","options","correctAnswer","concept","knowledge","explanation","tags"] } } }, required:["questions"] };
        const result = await callGemini(env, prompt, schema);
        result.questions = (result.questions || []).slice(0, 3).map(q => ({ ...q, difficulty: Math.max(1, Math.min(5, Number(q.difficulty) || 3)) }));
        return json(result, 200, origin, allowedOrigin);
      }

      const parsedImage = parseDataUrl(body?.image);
      const subjectHint = String(body?.subject || "未知").slice(0, 20);
      const ocrDraft = String(body?.ocrText || "").slice(0, 6000);
      if (!parsedImage) return json({ error: "A PNG, JPEG, or WebP data URL is required" }, 400, origin, allowedOrigin);
      const prompt = `你是台灣國中會考的專業錯題老師。請閱讀考卷圖片，整理成第二代 AI 學習系統格式。以圖片為主要依據，不要盲目相信 OCR 或原本選擇的科目。\n\n原本科目提示：${subjectHint}\nOCR 草稿：${ocrDraft || "（無）"}\n\n要求：\n1. subject 只能是國文、英文、數學、自然、社會之一。\n2. chapter 填章節名稱，questionType 填精簡題型，difficulty 為 1 到 5。\n3. 完整保留題幹、選項及必要圖表文字。\n4. studentAnswer 只在作答記號清楚時填。\n5. correctAnswer 優先依批改記號與題意判斷；無法確定時填待確認。\n6. mistake、concept、knowledge、explanation 要能幫學生重新學會。\n7. 全部使用繁體中文，不可捏造看不清楚的文字。`;
      const result = await callGemini(env, prompt, QUESTION_SCHEMA, [{ inline_data: { mime_type: parsedImage.mimeType, data: parsedImage.data } }]);
      result.difficulty = Math.max(1, Math.min(5, Number(result.difficulty) || 3));
      return json({ result }, 200, origin, allowedOrigin);
    } catch (error) {
      console.error("Request failed", error);
      return json({ error: "Service failed", detail: error.message }, 502, origin, allowedOrigin);
    }
  }
};
