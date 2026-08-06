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

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigin = env.ALLOWED_ORIGIN || "https://yuningliu52018-ship-it.github.io";

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(origin, allowedOrigin) });
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, origin, allowedOrigin);
    if (origin !== allowedOrigin) return json({ error: "Origin not allowed" }, 403, origin, allowedOrigin);

    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (contentLength > MAX_BODY_BYTES) return json({ error: "Image is too large" }, 413, origin, allowedOrigin);
    if (!env.GEMINI_API_KEY) return json({ error: "Server is missing GEMINI_API_KEY" }, 500, origin, allowedOrigin);

    let body;
    try { body = await request.json(); }
    catch { return json({ error: "Invalid JSON body" }, 400, origin, allowedOrigin); }

    const parsedImage = parseDataUrl(body?.image);
    const subject = String(body?.subject || "未知").slice(0, 20);
    const ocrDraft = String(body?.ocrText || "").slice(0, 6000);
    if (!parsedImage) return json({ error: "A PNG, JPEG, or WebP data URL is required" }, 400, origin, allowedOrigin);

    const prompt = `你是台灣國中會考的專業錯題老師。請閱讀考卷圖片，並整理成「第二代 AI 學習系統」格式。不要盲目相信 OCR 草稿；以圖片為主要依據。\n\n科目：${subject}\nOCR 草稿：${ocrDraft || "（無）"}\n\n要求：\n1. 完整保留題幹、選項、必要圖表文字。\n2. questionNumber 只填真正題號；圖表數字不可誤判。\n3. studentAnswer 只在學生作答記號清楚時填。\n4. correctAnswer 優先依批改記號與題意判斷；無法確定時填「待確認」。\n5. mistake 要分析學生為什麼容易答錯；若圖片看不出思考過程，請寫最可能的錯誤類型並標示為推測。\n6. concept 說明本題核心解題觀念與判斷流程。\n7. knowledge 條列必須掌握的知識點。\n8. explanation 提供完整、可重新學會的逐步解析，並說明其他選項錯在哪裡。\n9. tags 提供 2 到 5 個精簡錯誤標籤。\n10. 全部使用繁體中文；不可捏造看不清楚的文字。\n11. confidence 為 0 到 100 的整數。`;

    const model = env.GEMINI_MODEL || "gemini-3.6-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY)}`;

    const geminiResponse = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }, { inline_data: { mime_type: parsedImage.mimeType, data: parsedImage.data } }] }],
        generationConfig: {
          temperature: 0.15,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              questionNumber: { type: "STRING" },
              chapter: { type: "STRING" },
              question: { type: "STRING" },
              options: { type: "OBJECT", properties: { A:{type:"STRING"}, B:{type:"STRING"}, C:{type:"STRING"}, D:{type:"STRING"} }, required:["A","B","C","D"] },
              studentAnswer: { type: "STRING" },
              correctAnswer: { type: "STRING" },
              mistake: { type: "STRING" },
              concept: { type: "STRING" },
              knowledge: { type: "STRING" },
              explanation: { type: "STRING" },
              tags: { type: "ARRAY", items: { type: "STRING" } },
              confidence: { type: "INTEGER" },
              notes: { type: "STRING" }
            },
            required: ["questionNumber","chapter","question","options","studentAnswer","correctAnswer","mistake","concept","knowledge","explanation","tags","confidence","notes"]
          }
        }
      })
    });

    const raw = await geminiResponse.json();
    if (!geminiResponse.ok) {
      console.error("Gemini API error", raw);
      return json({ error: "Vision service failed", detail: raw?.error?.message || "Unknown Gemini API error" }, 502, origin, allowedOrigin);
    }

    try {
      const result = parseJsonText(extractGeminiText(raw));
      return json({ result }, 200, origin, allowedOrigin);
    } catch (error) {
      console.error("Gemini JSON parse error", error, raw);
      return json({ error: "Vision response was not valid JSON" }, 502, origin, allowedOrigin);
    }
  }
};
