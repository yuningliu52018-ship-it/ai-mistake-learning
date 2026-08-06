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
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders(origin, allowedOrigin)
  });
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
  return (payload?.candidates || [])
    .flatMap(candidate => candidate?.content?.parts || [])
    .map(part => part?.text || "")
    .join("\n")
    .trim();
}

function parseJsonText(text) {
  const cleaned = String(text || "")
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  return JSON.parse(cleaned);
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigin = env.ALLOWED_ORIGIN || "https://yuningliu52018-ship-it.github.io";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin, allowedOrigin) });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, origin, allowedOrigin);
    }

    if (origin !== allowedOrigin) {
      return json({ error: "Origin not allowed" }, 403, origin, allowedOrigin);
    }

    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return json({ error: "Image is too large" }, 413, origin, allowedOrigin);
    }

    if (!env.GEMINI_API_KEY) {
      return json({ error: "Server is missing GEMINI_API_KEY" }, 500, origin, allowedOrigin);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400, origin, allowedOrigin);
    }

    const parsedImage = parseDataUrl(body?.image);
    const subject = String(body?.subject || "未知").slice(0, 20);
    const ocrDraft = String(body?.ocrText || "").slice(0, 6000);

    if (!parsedImage) {
      return json({ error: "A PNG, JPEG, or WebP data URL is required" }, 400, origin, allowedOrigin);
    }

    const prompt = `你是台灣國中會考考卷辨識助手。請直接閱讀圖片，不要盲目相信 OCR 草稿。\n\n科目：${subject}\nOCR 草稿：${ocrDraft || "（無）"}\n\n請輸出符合指定 JSON 結構的資料。\n\n規則：\n1. questionNumber 只填真正題號；看不清楚時留空。\n2. 圖表中的數字不可當成題號。\n3. question 必須保留完整繁體中文題幹。\n4. options 依 A、B、C、D 分開。\n5. studentAnswer 只在圖片中可確定學生作答時填入。\n6. correctAnswer 只在批改記號可明確判斷時填入。\n7. confidence 為 0 到 100 的整數。\n8. 無法辨識時留空，不可猜測。`;

    const model = env.GEMINI_MODEL || "gemini-2.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY)}`;

    const geminiResponse = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: parsedImage.mimeType,
                data: parsedImage.data
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              questionNumber: { type: "STRING" },
              question: { type: "STRING" },
              options: {
                type: "OBJECT",
                properties: {
                  A: { type: "STRING" },
                  B: { type: "STRING" },
                  C: { type: "STRING" },
                  D: { type: "STRING" }
                },
                required: ["A", "B", "C", "D"]
              },
              studentAnswer: { type: "STRING" },
              correctAnswer: { type: "STRING" },
              confidence: { type: "INTEGER" },
              notes: { type: "STRING" }
            },
            required: [
              "questionNumber",
              "question",
              "options",
              "studentAnswer",
              "correctAnswer",
              "confidence",
              "notes"
            ]
          }
        }
      })
    });

    const raw = await geminiResponse.json();
    if (!geminiResponse.ok) {
      console.error("Gemini API error", raw);
      return json({
        error: "Vision service failed",
        detail: raw?.error?.message || "Unknown Gemini API error"
      }, 502, origin, allowedOrigin);
    }

    try {
      const text = extractGeminiText(raw);
      const result = parseJsonText(text);
      return json({ result }, 200, origin, allowedOrigin);
    } catch (error) {
      console.error("Gemini JSON parse error", error, raw);
      return json({ error: "Vision response was not valid JSON" }, 502, origin, allowedOrigin);
    }
  }
};
