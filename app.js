const STORAGE_KEY = "aiMistakeLearning.questions.v1";

const starterQuestions = [
  {
    id: crypto.randomUUID(),
    subject: "生物",
    chapter: "植物的感應",
    number: "1",
    status: "待複習",
    question: "下列關於植物向性的敘述，何者正確？",
    correctAnswer: "A：植物的根會表現出向地性，以利吸收水分。",
    myAnswer: "D",
    mistake: "把根固定植物的功能，誤認成根具有向觸性。",
    concept: "先辨認刺激來源，再判斷植物器官的生長方向。根通常具有向地性；卷鬚纏繞支架才是典型向觸性。",
    knowledge: "向地性、向觸性、根的功能",
    explanation: "根受到重力刺激後，通常順著重力方向往下生長，這叫向地性。根深入土壤後可接觸水分與礦物質，也有助於固定植物。向觸性是植物受到接觸刺激後改變生長方向，例如豌豆或絲瓜的卷鬚碰到支架後纏繞，因此 D 錯。",
    tags: ["觀念混淆", "向性判斷"],
    createdAt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    subject: "生物",
    chapter: "神經系統",
    number: "23",
    status: "待複習",
    question: "腦中風是腦部血管堵塞或破裂造成的損傷，腦中風一定是下列何者受到損傷？",
    correctAnswer: "C：中樞神經系統",
    myAnswer: "D：腦幹",
    mistake: "把腦的一個局部構造，誤當成所有腦中風都一定受損的位置。",
    concept: "看到「一定」時，要找能涵蓋全部情況的上位分類。",
    knowledge: "中樞神經系統包含腦與脊髓；腦包含大腦、小腦與腦幹。",
    explanation: "腦中風可能發生在大腦、小腦或腦幹，不一定只發生在腦幹。但不論發生在哪一個腦部區域，都屬於中樞神經系統受損，因此答案是 C。",
    tags: ["範圍判斷", "被關鍵字誤導"],
    createdAt: new Date().toISOString()
  }
];

let questions = loadQuestions();
let editingId = null;

const $ = (id) => document.getElementById(id);
const list = $("questionList");
const dialog = $("questionDialog");
const form = $("questionForm");

function loadQuestions() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : starterQuestions;
  } catch {
    return starterQuestions;
  }
}

function saveQuestions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
}

function filteredQuestions() {
  const keyword = $("searchInput").value.trim().toLowerCase();
  const subject = $("subjectFilter").value;
  const status = $("statusFilter").value;
  return questions.filter((q) => {
    const haystack = [q.subject, q.chapter, q.question, q.concept, q.knowledge, q.explanation, ...(q.tags || [])].join(" ").toLowerCase();
    return (!keyword || haystack.includes(keyword)) && (subject === "all" || q.subject === subject) && (status === "all" || q.status === status);
  });
}

function render() {
  renderSubjects();
  renderStats();
  const data = filteredQuestions();
  if (!data.length) {
    list.innerHTML = '<div class="empty">找不到符合條件的錯題。</div>';
    return;
  }
  list.innerHTML = data.map((q) => `
    <article class="question-card">
      <div class="question-head">
        <div>
          <div class="meta">
            <span class="badge">${escapeHtml(q.subject)}</span>
            ${q.chapter ? `<span class="badge">${escapeHtml(q.chapter)}</span>` : ""}
            ${q.number ? `<span class="badge">第 ${escapeHtml(q.number)} 題</span>` : ""}
            <span class="badge status-${escapeHtml(q.status)}">${escapeHtml(q.status)}</span>
          </div>
          <h3>${escapeHtml(q.question)}</h3>
        </div>
        <button onclick="editQuestion('${q.id}')">查看／編輯</button>
      </div>
      <div class="detail">
        <h4>正確答案</h4><div>${escapeHtml(q.correctAnswer)}</div>
        <h4>我的錯誤</h4><div>${escapeHtml(q.mistake || "尚未填寫")}</div>
        <h4>解題觀念</h4><div>${escapeHtml(q.concept || "尚未填寫")}</div>
        <div class="tags">${(q.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      </div>
    </article>`).join("");
}

function renderSubjects() {
  const current = $("subjectFilter").value;
  const subjects = [...new Set(questions.map((q) => q.subject).filter(Boolean))].sort();
  $("subjectFilter").innerHTML = '<option value="all">全部科目</option>' + subjects.map((s) => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join("");
  $("subjectFilter").value = subjects.includes(current) ? current : "all";
}

function renderStats() {
  const mastered = questions.filter((q) => q.status === "已掌握").length;
  const reviewing = questions.filter((q) => q.status === "複習中").length;
  const pending = questions.filter((q) => q.status === "待複習").length;
  $("stats").innerHTML = [
    ["錯題總數", questions.length], ["待複習", pending], ["複習中", reviewing], ["已掌握", mastered]
  ].map(([label, value]) => `<div class="stat"><span>${label}</span><strong>${value}</strong></div>`).join("");
}

function openNew() {
  editingId = null;
  form.reset();
  $("status").value = "待複習";
  $("dialogTitle").textContent = "新增錯題";
  $("deleteBtn").classList.add("hidden");
  dialog.showModal();
}

window.editQuestion = function (id) {
  const q = questions.find((item) => item.id === id);
  if (!q) return;
  editingId = id;
  $("dialogTitle").textContent = "查看／編輯錯題";
  ["subject", "chapter", "number", "status", "question", "correctAnswer", "myAnswer", "mistake", "concept", "knowledge", "explanation"].forEach((key) => $(key).value = q[key] || "");
  $("tags").value = (q.tags || []).join(", ");
  $("deleteBtn").classList.remove("hidden");
  dialog.showModal();
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = {
    id: editingId || crypto.randomUUID(),
    subject: $("subject").value.trim(), chapter: $("chapter").value.trim(), number: $("number").value.trim(),
    status: $("status").value, question: $("question").value.trim(), correctAnswer: $("correctAnswer").value.trim(),
    myAnswer: $("myAnswer").value.trim(), mistake: $("mistake").value.trim(), concept: $("concept").value.trim(),
    knowledge: $("knowledge").value.trim(), explanation: $("explanation").value.trim(),
    tags: $("tags").value.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean),
    createdAt: editingId ? questions.find((q) => q.id === editingId)?.createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  if (editingId) questions = questions.map((q) => q.id === editingId ? data : q);
  else questions.unshift(data);
  saveQuestions();
  dialog.close();
  render();
});

$("deleteBtn").addEventListener("click", () => {
  if (!editingId || !confirm("確定要刪除這題嗎？")) return;
  questions = questions.filter((q) => q.id !== editingId);
  saveQuestions();
  dialog.close();
  render();
});

$("randomBtn").addEventListener("click", () => {
  const pool = filteredQuestions();
  if (!pool.length) return alert("目前沒有可抽出的題目。 ");
  window.editQuestion(pool[Math.floor(Math.random() * pool.length)].id);
});

$("addBtn").addEventListener("click", openNew);
$("closeBtn").addEventListener("click", () => dialog.close());
["searchInput", "subjectFilter", "statusFilter"].forEach((id) => $(id).addEventListener(id === "searchInput" ? "input" : "change", render));

saveQuestions();
render();
