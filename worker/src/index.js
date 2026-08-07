const MAX_BODY_BYTES = 8 * 1024 * 1024;

function corsHeaders(origin, allowedOrigin) {
  return {
    "Access-Control-Allow-Origin": origin === allowedOrigin ? origin : allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
    "Content-Type": "application/json; charset=utf-8"
  };
}
function json(data,status,origin,allowedOrigin){return new Response(JSON.stringify(data),{status,headers:corsHeaders(origin,allowedOrigin)});}
function parseDataUrl(image){const m=String(image||"").match(/^data:image\/(png|jpeg|jpg|webp);base64,(.+)$/i);if(!m)return null;return{mimeType:m[1].toLowerCase()==="jpg"?"image/jpeg":`image/${m[1].toLowerCase()}`,data:m[2]};}
function extractGeminiText(payload){return(payload?.candidates||[]).flatMap(c=>c?.content?.parts||[]).map(p=>p?.text||"").join("\n").trim();}
function parseJsonText(text){return JSON.parse(String(text||"").trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/, ""));}
async function sha256Hex(value){const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(String(value)));return[...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("");}
async function getSyncHash(body){const key=String(body?.syncKey||"").trim();if(key.length<8||key.length>128)throw new Error("同步碼需為 8 到 128 個字元");return sha256Hex(key);}
async function ensureAccount(env,hash){await env.DB.prepare(`INSERT INTO sync_accounts (sync_key_hash,updated_at) VALUES (?,CURRENT_TIMESTAMP) ON CONFLICT(sync_key_hash) DO UPDATE SET updated_at=CURRENT_TIMESTAMP`).bind(hash).run();}
async function handleSync(body,env){
  if(!env.DB)throw new Error("Server is missing D1 binding DB");const hash=await getSyncHash(body);await ensureAccount(env,hash);
  if(body.action==="syncPull"){const r=await env.DB.prepare("SELECT payload FROM questions WHERE sync_key_hash=? AND deleted_at IS NULL ORDER BY updated_at DESC").bind(hash).all();return{questions:(r.results||[]).map(x=>{try{return JSON.parse(x.payload)}catch{return null}}).filter(Boolean),syncedAt:new Date().toISOString()};}
  if(body.action==="syncPush"){const items=Array.isArray(body.questions)?body.questions.slice(0,50):[];if(!items.length)return{saved:0};await env.DB.batch(items.map(item=>{const id=String(item?.id||"").trim();if(!id)throw new Error("題目缺少 id");const updated=String(item.updatedAt||item.createdAt||new Date().toISOString());return env.DB.prepare(`INSERT INTO questions(sync_key_hash,id,payload,updated_at,deleted_at) VALUES(?,?,?,?,NULL) ON CONFLICT(sync_key_hash,id) DO UPDATE SET payload=excluded.payload,updated_at=excluded.updated_at,deleted_at=NULL WHERE excluded.updated_at>=questions.updated_at`).bind(hash,id,JSON.stringify(item),updated);}));return{saved:items.length,syncedAt:new Date().toISOString()};}
  if(body.action==="syncDelete"){const id=String(body?.id||"").trim(),at=String(body?.deletedAt||new Date().toISOString());if(!id)throw new Error("缺少題目 id");await env.DB.prepare(`INSERT INTO questions(sync_key_hash,id,payload,updated_at,deleted_at) VALUES(?,?,'{}',?,?) ON CONFLICT(sync_key_hash,id) DO UPDATE SET updated_at=excluded.updated_at,deleted_at=excluded.deleted_at WHERE excluded.updated_at>=questions.updated_at`).bind(hash,id,at,at).run();return{deleted:id};}
  throw new Error("Unknown sync action");
}
async function callGemini(env,prompt,responseSchema,extraParts=[]){
  const model=env.GEMINI_MODEL||"gemini-3.6-flash";
  const endpoint=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY)}`;
  const response=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:prompt},...extraParts]}],generationConfig:{temperature:.15,responseMimeType:"application/json",responseSchema}})});
  const raw=await response.json();if(!response.ok)throw new Error(raw?.error?.message||"Unknown Gemini API error");return parseJsonText(extractGeminiText(raw));
}
const OPTIONS={type:"OBJECT",properties:{A:{type:"STRING"},B:{type:"STRING"},C:{type:"STRING"},D:{type:"STRING"}},required:["A","B","C","D"]};
const CROP_BOX={type:"OBJECT",properties:{x:{type:"INTEGER"},y:{type:"INTEGER"},width:{type:"INTEGER"},height:{type:"INTEGER"}},required:["x","y","width","height"]};
const QUESTION_PROPERTIES={subject:{type:"STRING",enum:["國文","英文","數學","自然","社會"]},chapter:{type:"STRING"},questionType:{type:"STRING"},difficulty:{type:"INTEGER"},questionNumber:{type:"STRING"},question:{type:"STRING"},options:OPTIONS,studentAnswer:{type:"STRING"},correctAnswer:{type:"STRING"},mistake:{type:"STRING"},concept:{type:"STRING"},knowledge:{type:"STRING"},explanation:{type:"STRING"},tags:{type:"ARRAY",items:{type:"STRING"}},confidence:{type:"INTEGER"},notes:{type:"STRING"},imageRequired:{type:"BOOLEAN"},imageReason:{type:"STRING"},cropBox:CROP_BOX};
const QUESTION_REQUIRED=Object.keys(QUESTION_PROPERTIES);
const QUESTION_SCHEMA={type:"OBJECT",properties:QUESTION_PROPERTIES,required:QUESTION_REQUIRED};
function normalizeCropBox(box, required){
  if(!required)return{x:0,y:0,width:0,height:0};
  const n=v=>Math.max(0,Math.min(1000,Math.round(Number(v)||0)));
  let x=n(box?.x),y=n(box?.y),width=n(box?.width),height=n(box?.height);
  if(x+width>1000)width=1000-x;if(y+height>1000)height=1000-y;
  if(width<40||height<40)return{x:0,y:0,width:1000,height:1000};
  return{x,y,width,height};
}
function mustKeepVisual(item){
  const text=[item?.question,item?.questionType,item?.chapter,item?.knowledge,item?.concept].filter(Boolean).join(" ");
  const visualWords=/右圖|左圖|下圖|上圖|附圖|如圖|關係圖|圖形|圖表|曲線圖|曲線|座標圖|座標平面|函數圖|幾何圖|電路圖|實驗裝置|裝置圖|流程圖|地圖|表格|示意圖|影像|圖片|照片|統計圖|長條圖|圓餅圖|折線圖|溫度.*時間/i;
  const values=Object.values(item?.options||{}).map(v=>String(v||"").replace(/\s/g,"").replace(/[()（）]/g,""));
  const graphicalChoices=values.length===4&&values.filter(v=>v.length<=2||/^[A-D]?$/.test(v)).length>=3;
  return visualWords.test(text)||graphicalChoices;
}

export default{async fetch(request,env){
  const origin=request.headers.get("Origin")||"",allowed=env.ALLOWED_ORIGIN||"https://yuningliu52018-ship-it.github.io";
  if(request.method==="OPTIONS")return new Response(null,{status:204,headers:corsHeaders(origin,allowed)});
  if(request.method!=="POST")return json({error:"Method not allowed"},405,origin,allowed);
  if(origin!==allowed)return json({error:"Origin not allowed"},403,origin,allowed);
  if(Number(request.headers.get("Content-Length")||0)>MAX_BODY_BYTES)return json({error:"Request is too large"},413,origin,allowed);
  let body;try{body=await request.json()}catch{return json({error:"Invalid JSON body"},400,origin,allowed)}
  try{
    if(["syncPull","syncPush","syncDelete"].includes(body?.action))return json(await handleSync(body,env),200,origin,allowed);
    if(!env.GEMINI_API_KEY)return json({error:"Server is missing GEMINI_API_KEY"},500,origin,allowed);

    if(body?.action==="detectMistakes"){
      const image=parseDataUrl(body.image);if(!image)return json({error:"A valid exam image is required"},400,origin,allowed);
      const prompt=`你是台灣國中考卷批改辨識專家。請檢查整張已批改考卷，只找出有明確證據答錯的題目。證據可包含紅色叉號、錯誤圈選、老師寫出的正確答案、扣分符號或清楚的批改痕跡。不要因為看不清楚就猜測，也不要把未作答、範例、頁碼或圖表編號當成錯題。\n\n每個錯題都要完整整理題號、題幹、A-D 選項、學生答案、正確答案、科目、章節、題型、難度、錯誤原因、核心觀念、知識點與解析。若能確定是錯題但部分文字不清楚，保留可讀內容並在 notes 說明。confidence 為 0 到 100；低於 65 的題目不要列入。最多回傳 12 題。全部使用繁體中文。\n\n【必要視覺資訊規則】只要學生重新作答時必須看到原本的圖形、圖表、曲線、座標圖、幾何圖、地圖、表格、實驗裝置、流程圖、特殊排版或圖片式選項，imageRequired 必須設 true。特別注意：題幹出現「如圖、右圖、下圖、上圖、附圖、關係圖、曲線圖、溫度對時間關係圖」等字樣，或 A-D 選項本身主要是圖而不是文字時，絕對不可設 false。只有題幹與所有選項已能完整用文字重建、完全不需要看圖時才設 false。imageReason 用一句話說明原因。\n\n【Smart Crop】不論 imageRequired 是 true 或 false，都必須回傳 cropBox。座標以整張原始照片左上角為 (0,0)、右下角為 (1000,1000) 的正規化座標。cropBox 要框住能完整重做該題的最小矩形：題號、完整題幹、所有選項，以及該題必需的圖形/圖表/表格/閱讀材料。不要漏掉圖片式 A-D 選項。排除前後題、空白、頁碼、Logo 與無關內容；若上方共用文章或表格是解題必要資訊則一起包含。四周留少量安全邊界。`;
      const schema={type:"OBJECT",properties:{mistakes:{type:"ARRAY",items:{type:"OBJECT",properties:QUESTION_PROPERTIES,required:QUESTION_REQUIRED}}},required:["mistakes"]};
      const result=await callGemini(env,prompt,schema,[{inline_data:{mime_type:image.mimeType,data:image.data}}]);
      result.mistakes=(result.mistakes||[]).filter(x=>Number(x.confidence)>=65).slice(0,12).map(x=>{
        const forced=mustKeepVisual(x);
        const imageRequired=x.imageRequired===true||forced;
        const imageReason=forced&&x.imageRequired!==true?"題目含必要圖形／圖表或圖片式選項，系統強制保留題圖。":x.imageReason;
        return{...x,difficulty:Math.max(1,Math.min(5,Number(x.difficulty)||3)),imageRequired,imageReason,cropBox:normalizeCropBox(x.cropBox,imageRequired)};
      });
      return json(result,200,origin,allowed);
    }

    if(body?.action==="generateSimilar"){
      const s=body.question||{};const prompt=`你是台灣國中會考命題老師。根據以下錯題生成 3 題同核心觀念、但情境不同的四選一題。科目：${s.subject||"未知"}\n章節：${s.chapter||""}\n原題：${String(s.question||"").slice(0,5000)}\n核心觀念：${String(s.concept||"").slice(0,1500)}\n知識點：${String(s.knowledge||"").slice(0,1500)}。每題須有 A-D、答案與解析，使用繁體中文。`;
      const itemProps={subject:QUESTION_PROPERTIES.subject,chapter:{type:"STRING"},questionType:{type:"STRING"},difficulty:{type:"INTEGER"},question:{type:"STRING"},options:OPTIONS,correctAnswer:{type:"STRING"},concept:{type:"STRING"},knowledge:{type:"STRING"},explanation:{type:"STRING"},tags:{type:"ARRAY",items:{type:"STRING"}}};
      const schema={type:"OBJECT",properties:{questions:{type:"ARRAY",items:{type:"OBJECT",properties:itemProps,required:Object.keys(itemProps)}}},required:["questions"]};
      const r=await callGemini(env,prompt,schema);r.questions=(r.questions||[]).slice(0,3);return json(r,200,origin,allowed);
    }

    const image=parseDataUrl(body.image);if(!image)return json({error:"A valid image is required"},400,origin,allowed);
    const prompt=`你是台灣國中會考的專業錯題老師。閱讀框選的單一題目圖片，完整整理題幹、A-D 選項、學生答案、正確答案、科目、章節、題型、難度、錯誤原因、核心觀念、知識點與詳細解析。看不清楚時標示待確認，不可捏造。全部使用繁體中文。若圖形、圖表、曲線、地圖、實驗裝置、表格、特殊版面或圖片式選項對作答不可或缺，imageRequired=true；題幹出現「如圖、右圖、關係圖、曲線圖」等字樣時尤其不可漏圖。若文字已完整足夠重做，imageRequired=false。單題已由使用者框選，因此 cropBox 固定回傳 x=0,y=0,width=1000,height=1000。`;
    const result=await callGemini(env,prompt,QUESTION_SCHEMA,[{inline_data:{mime_type:image.mimeType,data:image.data}}]);result.difficulty=Math.max(1,Math.min(5,Number(result.difficulty)||3));result.imageRequired=result.imageRequired===true||mustKeepVisual(result);result.cropBox=normalizeCropBox(result.cropBox,result.imageRequired);return json({result},200,origin,allowed);
  }catch(error){console.error("Request failed",error);return json({error:"Service failed",detail:error.message},502,origin,allowed);}
}};