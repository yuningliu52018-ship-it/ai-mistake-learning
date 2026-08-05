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

function extractOutputText(payload) {
  if (typeof payload?.output_text === "string") return payload.output_text;
  const parts = [];
  for (const item of payload?.output || []) {
    for (const content of item?.content || []) {
      if (content?.type === "output_text" && content?.text) parts.push(content.text);
    }
  }
  return parts.join("\n");
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

    if (!env.OPENAI_API_KEY) {
      return json({ error: "Server is missing OPENAI_API_KEY" }, 500, origin, allowedOrigin);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400, origin, allowedOrigin);
    }

    const image = body?.image;
    const subject = String(body?.subject || "未知").slice(0, 20);
    const ocrDraft = String(body?.ocrText || "").slice(0, 6000);

    if (typeof image !== "string" || !/^data:image\/(png|jpeg|jpg|webp);base64,/i.test(image)) {
      return json({ error: "A PNG, JPEG, or WebP data URL is required" }, 400, origin, allowedOrigin);
    }

    const prompt = `你是台灣國中會考考卷辨識助手。請直接閱讀圖片，不要盲目相信 OCR 草稿。\n\n科目：${subject}\nOCR 草稿：${ocrDraft || "（無）"}\n\n請輸出純 JSON，不要使用 Markdown，格式必須完全符合：\n{\n  "questionNumber": "題號；看不清楚時為空字串",\n  "question": "完整題幹，不要自行補造看不清楚的字",\n  "options": {"A":"", "B":"", "C":"", "D":""},\n  "studentAnswer": "學生作答；無法判斷時為空字串",\n  "correctAnswer": "批改可確定時填入，否則空字串",\n  "confidence": 0,\n  "notes": "簡短列出模糊或不確定之處"\n}\n\n規則：\n1. confidence 為 0 到 100 的整數。\n2. 圖表中的數字不可當成題號。\n3. 保留繁體中文與原選項順序。\n4. 無法辨識時留空，不可猜測。`;

    const openAiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || "gpt-5",
        input: [{
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            { type: "input_image", image_url: image, detail: "high" }
          ]
        }]
      })
    });

    const raw = await openAiResponse.json();
    if (!openAiResponse.ok) {
      console.error("OpenAI API error", raw);
      return json({ error: "Vision service failed", detail: raw?.error?.message || "Unknown error" }, 502, origin, allowedOrigin);
    }

    try {
      const parsed = parseJsonText(extractOutputText(raw));
      return json({ result: parsed }, 200, origin, allowedOrigin);
    } catch (error) {
      console.error("Vision JSON parse error", error, raw);
      return json({ error: "Vision response was not valid JSON" }, 502, origin, allowedOrigin);
    }
  }
};
