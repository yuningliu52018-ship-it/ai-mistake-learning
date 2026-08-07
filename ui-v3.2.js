(() => {
  const expandedCards = new Set();

  function summaryText(value = "", limit = 150) {
    const text = String(value).replace(/\s+/g, " ").trim();
    return text.length > limit ? `${text.slice(0, limit)}…` : text;
  }

  window.toggleQuestionCard = function (id, button) {
    const card = document.querySelector(`.question-card[data-question-id="${CSS.escape(id)}"]`);
    if (!card) return;
    const isExpanded = card.classList.toggle("is-expanded");
    if (isExpanded) expandedCards.add(id); else expandedCards.delete(id);
    if (button) button.textContent = isExpanded ? "收合" : "展開";
  };

  window.openImageViewer = function (src, alt = "題目原圖") {
    if (!src) return;
    let viewer = document.getElementById("imageViewer");
    if (!viewer) {
      viewer = document.createElement("div");
      viewer.id = "imageViewer";
      viewer.className = "image-viewer hidden";
      viewer.innerHTML = `
        <button class="image-viewer-close" type="button" aria-label="關閉原圖">×</button>
        <div class="image-viewer-stage"><img alt="" /></div>
        <div class="image-viewer-hint">可用滑鼠滾輪或手機手勢放大；點背景關閉</div>`;
      document.body.appendChild(viewer);
      viewer.addEventListener("click", event => {
        if (event.target === viewer || event.target.classList.contains("image-viewer-close")) {
          viewer.classList.add("hidden");
          document.body.classList.remove("viewer-open");
        }
      });
    }
    const image = viewer.querySelector("img");
    image.src = src;
    image.alt = alt;
    viewer.classList.remove("hidden");
    document.body.classList.add("viewer-open");
  };

  render = function () {
    renderSubjects();
    renderStats();
    const data = filteredQuestions();
    if (!data.length) {
      list.innerHTML = '<div class="empty">找不到符合條件的錯題。</div>';
      return;
    }

    list.innerHTML = data.map(q => {
      const expanded = expandedCards.has(q.id);
      const answer = q.correctAnswer || "待確認";
      const mistake = q.mistake || "尚未填寫";
      const concept = q.concept || "尚未填寫";
      const knowledge = q.knowledge || "尚未分類";
      const tags = (q.tags || []).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
      return `
        <article class="question-card compact-card ${expanded ? "is-expanded" : ""}" data-question-id="${escapeHtml(q.id)}">
          <div class="question-head">
            <div class="question-main">
              <div class="meta">
                <span class="badge">${escapeHtml(q.subject)}</span>
                ${q.chapter ? `<span class="badge">${escapeHtml(q.chapter)}</span>` : ""}
                ${q.number ? `<span class="badge">第 ${escapeHtml(q.number)} 題</span>` : ""}
                ${q.questionType ? `<span class="badge">${escapeHtml(q.questionType)}</span>` : ""}
                <span class="badge" title="難度 ${q.difficulty}/5">${stars(q.difficulty)}</span>
                <span class="badge status-${escapeHtml(q.status)}">${escapeHtml(q.status)}</span>
              </div>
              <h3 class="question-summary">${escapeHtml(summaryText(q.question, 190))}</h3>
              <div class="compact-answer"><strong>正確答案：</strong>${escapeHtml(answer)}</div>
            </div>
            <div class="card-actions">
              <button class="similar-btn" onclick="generateSimilar('${q.id}',this)">✨ 練 3 題類似題</button>
              <button onclick="toggleQuestionCard('${q.id}',this)">${expanded ? "收合" : "展開"}</button>
              <button onclick="editQuestion('${q.id}')">✏️ 編輯</button>
            </div>
          </div>

          ${q.image ? `<button class="question-thumbnail" type="button" onclick="openImageViewer('${q.image}','第 ${escapeHtml(q.number || "")} 題原圖')"><img src="${q.image}" alt="第 ${escapeHtml(q.number || "")} 題縮圖" /><span>🔍 點擊放大原圖</span></button>` : ""}

          <div class="detail collapsible-detail">
            <div class="detail-grid">
              <section><h4>我的答案</h4><div>${escapeHtml(q.myAnswer || "待確認")}</div></section>
              <section><h4>我的錯誤</h4><div>${escapeHtml(mistake)}</div></section>
              <section><h4>解題觀念</h4><div>${escapeHtml(concept)}</div></section>
              <section><h4>知識點</h4><div>${escapeHtml(knowledge)}</div></section>
            </div>
            ${q.explanation ? `<section class="full-explanation"><h4>詳細解答</h4><div>${escapeHtml(q.explanation)}</div></section>` : ""}
            <div class="tags">${tags}</div>
          </div>
        </article>`;
    }).join("");
  };

  render();
})();
