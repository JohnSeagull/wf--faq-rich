document.addEventListener("DOMContentLoaded", () => {
  const faqContainer = document.getElementById("faqContainer");
  const addBtn = document.getElementById("addBtn");
  const copyBtn = document.getElementById("copyBtn");
  const htmlPreview = document.getElementById("htmlPreview");
  const copyTooltip = document.getElementById("copyMessage");

  function addPair() {
    const faqPair = document.createElement("div");
    faqPair.className = "faq-pair";

    faqPair.innerHTML = `
      <div class="faq-question-wrapper floating-label">
        <input type="text" class="faq-question" placeholder=" " autocomplete="off" />
        <label>Question</label>
      </div>
      <div class="faq-answer-wrapper floating-label">
        <textarea class="faq-answer" placeholder=" " autocomplete="off"></textarea>
        <label>Answer</label>
      </div>
      <button class="delete-btn" type="button" aria-label="Delete question">−</button>
    `;

    faqPair.querySelector(".delete-btn").addEventListener("click", () => {
      faqPair.remove();
      refreshLabels();
      updateUI();
    });

    faqContainer.appendChild(faqPair);
    refreshLabels();
  }

  function refreshLabels() {
    Array.from(faqContainer.children).forEach((pair, i) => {
      const qInput = pair.querySelector(".faq-question");
      const qLabel = pair.querySelector(".faq-question-wrapper label");
      qLabel.textContent = `Question #${i + 1}`;
      qLabel.setAttribute("for", `question-${i}`);
      qInput.id = `question-${i}`;

      const aInput = pair.querySelector(".faq-answer");
      const aLabel = pair.querySelector(".faq-answer-wrapper label");
      aLabel.textContent = `Answer #${i + 1}`;
      aLabel.setAttribute("for", `answer-${i}`);
      aInput.id = `answer-${i}`;

      pair.querySelector(".delete-btn").setAttribute("aria-label", `Delete question #${i + 1}`);
    });
  }

  function escapeHtml(text) {
    return text.replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;")
               .replace(/"/g, "&quot;")
               .replace(/'/g, "&#039;");
  }

  function generateHtml() {
    const pairs = faqContainer.querySelectorAll(".faq-pair");
    let html = `<div itemscope itemtype="https://schema.org/FAQPage">\n`;
    html += `  <ul class="accordion__list">\n`;

    pairs.forEach(pair => {
      const qInput = pair.querySelector(".faq-question");
      const aInput = pair.querySelector(".faq-answer");
      if (!qInput || !aInput) return;

      const question = qInput.value.trim();
      const answer = aInput.value.trim();

      if (question && answer) {
        html += `    <li class="accordion" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">\n`;
        html += `      <button class="accordion__control" aria-expanded="false">\n`;
        html += `        <h2 itemprop="name">${escapeHtml(question)}</h2>\n`;
        html += `        <span class="accordion__icon" aria-hidden="true">\n`;
        html += `          <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n`;
        html += `            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n`;
        html += `          </svg>\n`;
        html += `        </span>\n`;
        html += `      </button>\n`;
        html += `      <div class="accordion__content" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer" aria-hidden="true">\n`;
        html += `        <p itemprop="text">${escapeHtml(answer)}</p>\n`;
        html += `      </div>\n`;
        html += `    </li>\n`;
      }
    });

    html += `  </ul>\n`;
    html += `</div>\n`;

    return html;
  }

  function updateUI() {
    const html = generateHtml();
    htmlPreview.value = html;

    const questions = faqContainer.querySelectorAll(".faq-question");
    const answers = faqContainer.querySelectorAll(".faq-answer");
    let hasContent = false;

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].value.trim() && answers[i].value.trim()) {
        hasContent = true;
        break;
      }
    }

    copyBtn.disabled = !hasContent;
    copyTooltip.classList.remove("show");
  }

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(htmlPreview.value);
      copyTooltip.classList.add("show");
      setTimeout(() => copyTooltip.classList.remove("show"), 1500);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  });

  addBtn.addEventListener("click", () => {
    addPair();
    updateUI();
  });

  faqContainer.addEventListener("input", updateUI);

  addPair();
  updateUI();
});
