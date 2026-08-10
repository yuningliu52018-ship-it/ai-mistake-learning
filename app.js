const STORAGE_KEY = "aiMistakeLearning.questions.v2";
const LEGACY_KEY = "aiMistakeLearning.questions.v1";
const SYNC_KEY_STORAGE = "aiMistakeLearning.syncKey.v1";
const AI_ENDPOINT = window.AI_MISTAKE_CONFIG?.visionEndpoint || "";

const starterQuestions = [
  {id:crypto.randomUUID(),subject:"自然",chapter:"植物的感應",number:"1",status:"待複習",questionType:"觀念判斷",difficulty:2,question:"下列關於植物向性的敘述，何者正確？",correctAnswer:"A：植物的根會表現出向地性，以利吸收水分。",myAnswer:"D",mistake:"把根固定植物的功能，誤認成根具有向觸性。",concept:"先辨認刺激來源，再判斷植物器官的生長方向。",knowledge:"向地性、向觸性、根的功能",explanation:"根受到重力刺激後通常順著重力方向往下生長。",tags:["觀念混淆","向性判斷"],image:"",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},
  {id:crypto.randomUUID(),subject:"自然",chapter:"神經系統",number:"23",status:"待複習",questionType:"範圍判斷",difficulty:3,question:"腦中風一定是下列何者受到損傷？",correctAnswer:"C：中樞神經系統",myAnswer:"D：腦幹",mistake:"把腦的一個局部構造，誤當成所有腦中風都一定受損的位置。",concept:"看到「一定」時，要找能涵蓋全部情況的上位分類。",knowledge:"中樞神經系統包含腦與脊髓。",explanation:"腦中風可能發生在不同腦區，但都屬於中樞神經系統受損。",tags:["範圍判斷","被關鍵字誤導"],image:"",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}
];

let questions=loadQuestions(),editingId=null,pendingImage="",syncKey=localStorage.getItem(SYNC_KEY_STORAGE)||"",syncTimer=null,syncBusy=false;
const $=id=>document.getElementById(id),list=$("questionList"),dialog=$("questionDialog"),form=$("questionForm");

function stripOptionLabel(value="",key=""){const text=String(value).trim();const specific=key?new RegExp("^\\s*(?:\\("+key+"\\)|"+key+"[.、:：])\\s*","i"):null;return specific?text.replace(specific,""):text;}
function cleanDuplicateOptionLabels(value=""){return String(value).replace(/\\(([A-D])\\)\\s*\\(\\1\\)\\s*/gi,"($1) ").replace(/(^|\\n)\\s*([A-D])[.、]\\s*\\2[.、]\\s*/gi,"$1$2. ");}
function normalizeQuestion(q){const created=q?.createdAt||new Date().toISOString();return {questionType:"",difficulty:3,...q,question:cleanDuplicateOptionLabels(q?.question||""),createdAt:created,updatedAt:q?.updatedAt||created,difficulty:Math.max(1,Math.min(5,Number(q?.difficulty)||3))};}
function loadQuestions(){try{const current=JSON.parse(localStorage.getItem(STORAGE_KEY));if(Array.isArray(current))return current.map(normalizeQuestion);const legacy=JSON.parse(localStorage.getItem(LEGACY_KEY));if(Array.isArray(legacy))return legacy.map(q=>normalizeQuestion({image:"",...q}));return starterQuestions;}catch{return starterQuestions;}}
function saveQuestions({sync=true}={}){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(questions));if(sync)scheduleCloudSync();}catch(error){alert("儲存失敗：圖片可能太大。請重新裁切較小範圍後再試。");throw error;}}
function escapeHtml(value=""){return String(value).replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]);}
function stars(value){const n=Math.max(1,Math.min(5,Number(value)||3));return "★".repeat(n)+"☆".repeat(5-n);}
function formatGeneratedQuestion(item){const lines=[String(item.question||"").trim()];for(const key of ["A","B","C","D"]){if(item.options?.[key])lines.push(`(${key}) ${stripOptionLabel(item.options[key],key)}`);}return cleanDuplicateOptionLabels(lines.filter(Boolean).join("\n"));}
function cloudSafeQuestion(q){const copy={...q};if(String(copy.image||"").length>350000)copy.image="";return copy;}
function newerQuestion(a,b){return Date.parse(a?.updatedAt||a?.createdAt||0)>=Date.parse(b?.updatedAt||b?.createdAt||0)?a:b;}

async function syncRequest(action,data={}){
  if(!AI_ENDPOINT)throw new Error("尚未設定雲端 API 網址");
  if(!syncKey)throw new Error("尚未設定同步碼");
  const response=await fetch(AI_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action,syncKey,...data})});
  const payload=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error(payload.detail||payload.error||`HTTP ${response.status}`);
  return payload;
}

function setSyncStatus(text,kind=""){
  const button=$("syncBtn");if(!button)return;button.textContent=text;button.dataset.kind=kind;
}

async function pushAllQuestions(){
  if(!syncKey||syncBusy)return;
  syncBusy=true;setSyncStatus("☁️ 同步中…","busy");
  try{
    const items=questions.map(cloudSafeQuestion);
    for(let i=0;i<items.length;i+=10)await syncRequest("syncPush",{questions:items.slice(i,i+10)});
    setSyncStatus("☁️ 已同步","ok");
  }catch(error){console.error(error);setSyncStatus("☁️ 同步失敗","error");}
  finally{syncBusy=false;}
}

function scheduleCloudSync(){if(!syncKey)return;clearTimeout(syncTimer);syncTimer=setTimeout(pushAllQuestions,800);}

async function pullAndMergeCloud(){
  if(!syncKey||syncBusy)return;
  syncBusy=true;setSyncStatus("☁️ 下載中…","busy");
  try{
    const payload=await syncRequest("syncPull");
    const map=new Map(questions.map(q=>[q.id,normalizeQuestion(q)]));
    for(const remote of payload.questions||[]){const rq=normalizeQuestion(remote),local=map.get(rq.id);map.set(rq.id,local?newerQuestion(local,rq):rq);}
    questions=[...map.values()].sort((a,b)=>Date.parse(b.updatedAt||b.createdAt)-Date.parse(a.updatedAt||a.createdAt));
    saveQuestions({sync:false});render();
    setSyncStatus("☁️ 已同步","ok");
    syncBusy=false;
    await pushAllQuestions();
  }catch(error){console.error(error);setSyncStatus("☁️ 同步失敗","error");syncBusy=false;alert(`雲端同步失敗：${error.message}`);}
}

async function configureSync(){
  const input=prompt("請設定跨裝置同步碼（至少 8 個字元）。iPhone 與桌機必須輸入完全相同的同步碼。請勿使用重要帳號密碼。",syncKey);
  if(input===null)return;
  const value=input.trim();
  if(value.length<8)return alert("同步碼至少需要 8 個字元。");
  syncKey=value;localStorage.setItem(SYNC_KEY_STORAGE,syncKey);setSyncStatus("☁️ 連線中…","busy");await pullAndMergeCloud();
}

function installSyncButton(){
  const hero=document.querySelector(".hero");if(!hero||$("syncBtn"))return;
  const button=document.createElement("button");button.id="syncBtn";button.type="button";button.textContent=syncKey?"☁️ 同步":"☁️ 設定同步";button.addEventListener("click",async()=>{if(!syncKey)return configureSync();const choice=confirm("按「確定」立即同步；按「取消」可重新設定同步碼。")?"sync":"config";if(choice==="sync")await pullAndMergeCloud();else await configureSync();});
  hero.appendChild(button);
}

function filteredQuestions(){const keyword=$("searchInput").value.trim().toLowerCase(),subject=$("subjectFilter").value,status=$("statusFilter").value;return questions.filter(q=>{const haystack=[q.subject,q.chapter,q.questionType,q.question,q.concept,q.knowledge,q.explanation,...(q.tags||[])].join(" ").toLowerCase();return(!keyword||haystack.includes(keyword))&&(subject==="all"||q.subject===subject)&&(status==="all"||q.status===status);});}

function render(){renderSubjects();renderStats();const data=filteredQuestions();if(!data.length){list.innerHTML='<div class="empty">找不到符合條件的錯題。</div>';return;}list.innerHTML=data.map(q=>`
<article class="question-card"><div class="question-head"><div><div class="meta">
<span class="badge">${escapeHtml(q.subject)}</span>${q.chapter?`<span class="badge">${escapeHtml(q.chapter)}</span>`:""}${q.number?`<span class="badge">第 ${escapeHtml(q.number)} 題</span>`:""}${q.questionType?`<span class="badge">${escapeHtml(q.questionType)}</span>`:""}<span class="badge" title="難度 ${q.difficulty}/5">${stars(q.difficulty)}</span><span class="badge status-${escapeHtml(q.status)}">${escapeHtml(q.status)}</span>
</div><h3>${escapeHtml(q.question)}</h3></div><div class="card-actions"><button onclick="generateSimilar('${q.id}',this)">✨ AI 類題 ×3</button><button onclick="editQuestion('${q.id}')">查看／編輯</button></div></div>
${q.image?`<div class="question-image-wrap"><img class="question-image" src="${q.image}" alt="第 ${escapeHtml(q.number||"")} 題圖片" /></div>`:""}
<div class="detail"><h4>正確答案</h4><div>${escapeHtml(q.correctAnswer)}</div><h4>我的錯誤</h4><div>${escapeHtml(q.mistake||"尚未填寫")}</div><h4>解題觀念</h4><div>${escapeHtml(q.concept||"尚未填寫")}</div><div class="tags">${(q.tags||[]).map(tag=>`<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div></div></article>`).join("");}
function renderSubjects(){const current=$("subjectFilter").value,subjects=[...new Set(questions.map(q=>q.subject).filter(Boolean))].sort();$("subjectFilter").innerHTML='<option value="all">全部科目</option>'+subjects.map(s=>`<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join("");$("subjectFilter").value=subjects.includes(current)?current:"all";}
function renderStats(){const mastered=questions.filter(q=>q.status==="已掌握").length,reviewing=questions.filter(q=>q.status==="複習中").length,pending=questions.filter(q=>q.status==="待複習").length;$("stats").innerHTML=[["錯題總數",questions.length],["待複習",pending],["複習中",reviewing],["已掌握",mastered]].map(([label,value])=>`<div class="stat"><span>${label}</span><strong>${value}</strong></div>`).join("");}

window.generateSimilar=async function(id,button){
  const source=questions.find(q=>q.id===id);if(!source)return;if(!AI_ENDPOINT)return alert("尚未設定 Gemini API 網址。");if(!confirm("要依這題生成 3 題同觀念練習題並加入資料庫嗎？"))return;
  const original=button.textContent;button.disabled=true;button.textContent="✨ 生成中…";
  try{
    const response=await fetch(AI_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"generateSimilar",question:{subject:source.subject,chapter:source.chapter,questionType:source.questionType,difficulty:source.difficulty,question:source.question,correctAnswer:source.correctAnswer,concept:source.concept,knowledge:source.knowledge}})});
    const payload=await response.json().catch(()=>({}));if(!response.ok)throw new Error(payload.detail||payload.error||`HTTP ${response.status}`);
    const generated=(payload.questions||[]).slice(0,3).map((item,index)=>normalizeQuestion({id:crypto.randomUUID(),subject:item.subject||source.subject,chapter:item.chapter||source.chapter,number:`類題${index+1}`,status:"待複習",questionType:item.questionType||source.questionType,difficulty:item.difficulty||source.difficulty,question:formatGeneratedQuestion(item),correctAnswer:item.correctAnswer||"待確認",myAnswer:"",mistake:"由原錯題延伸的練習題，作答後再記錄錯誤原因。",concept:item.concept||source.concept,knowledge:item.knowledge||source.knowledge,explanation:item.explanation||"待完成解析。",tags:["AI類題",...(item.tags||[])],image:"",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),sourceQuestionId:source.id}));
    if(!generated.length)throw new Error("Gemini 沒有產生類題");questions=[...generated,...questions];saveQuestions();render();alert(`已加入 ${generated.length} 題 AI 類題。`);
  }catch(error){console.error(error);alert(`類題生成失敗：${error.message}`);}finally{button.disabled=false;button.textContent=original;}
};

function openNew(){editingId=null;pendingImage="";form.reset();$("status").value="待複習";$("difficulty").value="3";$("dialogTitle").textContent="新增錯題";$("deleteBtn").classList.add("hidden");dialog.showModal();}
window.openQuestionFromCrop=function(draft){editingId=null;form.reset();pendingImage=draft.image||"";$("status").value="待複習";$("dialogTitle").textContent="由考卷建立錯題";$("deleteBtn").classList.add("hidden");$("subject").value=draft.subject||"自然";$("chapter").value=draft.chapter||"";$("number").value=draft.number||"";$("questionType").value=draft.questionType||"";$("difficulty").value=String(Math.max(1,Math.min(5,Number(draft.difficulty)||3)));$("question").value=draft.question||"請補上完整題目。";$("correctAnswer").value=draft.correctAnswer||"待確認";$("myAnswer").value=draft.myAnswer||"";$("mistake").value=draft.mistake||"由考卷照片裁切匯入，尚待分析錯誤原因。";$("concept").value=draft.concept||"待整理";$("knowledge").value=draft.knowledge||"待分類";$("explanation").value=draft.explanation||"待完成詳細解答。";$("tags").value=(draft.tags||["考卷匯入","待整理"]).join(", ");dialog.showModal();};
window.editQuestion=function(id){const q=questions.find(item=>item.id===id);if(!q)return;editingId=id;pendingImage=q.image||"";$("dialogTitle").textContent="查看／編輯錯題";["subject","chapter","number","status","questionType","question","correctAnswer","myAnswer","mistake","concept","knowledge","explanation"].forEach(key=>$(key).value=q[key]||"");$("difficulty").value=String(q.difficulty||3);$("tags").value=(q.tags||[]).join(", ");$("deleteBtn").classList.remove("hidden");dialog.showModal();};

form.addEventListener("submit",event=>{event.preventDefault();const existing=editingId?questions.find(q=>q.id===editingId):null;const now=new Date().toISOString();const data={id:editingId||crypto.randomUUID(),subject:$("subject").value.trim(),chapter:$("chapter").value.trim(),number:$("number").value.trim(),status:$("status").value,questionType:$("questionType").value.trim(),difficulty:Number($("difficulty").value)||3,question:$("question").value.trim(),correctAnswer:$("correctAnswer").value.trim(),myAnswer:$("myAnswer").value.trim(),mistake:$("mistake").value.trim(),concept:$("concept").value.trim(),knowledge:$("knowledge").value.trim(),explanation:$("explanation").value.trim(),tags:$("tags").value.split(/[,，]/).map(tag=>tag.trim()).filter(Boolean),image:pendingImage||existing?.image||"",createdAt:existing?.createdAt||now,updatedAt:now};if(editingId)questions=questions.map(q=>q.id===editingId?data:q);else questions.unshift(data);saveQuestions();pendingImage="";dialog.close();render();});
$("deleteBtn").addEventListener("click",async()=>{if(!editingId||!confirm("確定要刪除這題嗎？"))return;const id=editingId;questions=questions.filter(q=>q.id!==id);saveQuestions({sync:false});dialog.close();render();if(syncKey){try{await syncRequest("syncDelete",{id,deletedAt:new Date().toISOString()});setSyncStatus("☁️ 已同步","ok");}catch(error){console.error(error);setSyncStatus("☁️ 刪除待同步","error");}}});
$("randomBtn").addEventListener("click",()=>{const pool=filteredQuestions();if(!pool.length)return alert("目前沒有可抽出的題目。");window.editQuestion(pool[Math.floor(Math.random()*pool.length)].id);});
$("addBtn").addEventListener("click",openNew);$("closeBtn").addEventListener("click",()=>{pendingImage="";dialog.close();});["searchInput","subjectFilter","statusFilter"].forEach(id=>$(id).addEventListener(id==="searchInput"?"input":"change",render));

installSyncButton();saveQuestions({sync:false});render();
if(syncKey)pullAndMergeCloud();
