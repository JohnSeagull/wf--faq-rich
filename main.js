document.addEventListener("DOMContentLoaded", () => {
  const faqContainer = document.getElementById("faqContainer");
  const addBtn = document.getElementById("addBtn");
  const copyBtn = document.getElementById("copyBtn");
  const htmlPreview = document.getElementById("htmlPreview");
  const copyMessage = document.getElementById("copyMessage");

  // Add new FAQ pair block
  function addPair() {
    const index = faqContainer.children.length;
    const faqPair = document.createElement("div");
    faqPair.className = "faq-pair";

    faqPair.innerHTML = `
      <div class="faq-question-wrapper">
        <label>Question #${index + 1}:</label>
        <input type="text" class="faq-question" placeholder="Enter your question here" />
      </div>
      <div class="faq-answer-wrapper">
        <label>Answer #${index + 1}:</label>
        <textarea class="faq-answer" placeholder="Enter the answer here"></textarea>
      </div>
      <button class="delete-btn" type="button" aria-label="Delete question #${index + 1}">−</button>
    `;

    // Delete handler
    faqPair.querySelector(".delete-btn").addEventListener("click", () => {
      faqPair.remove();
      refreshLabels();
      updateUI();
    });

    faqContainer.appendChild(faqPair);
  }

  // Refresh Q/A labels numbering and aria attributes
  function refreshLabels() {
    Array.from(faqContainer.children).forEach((pair, i) => {
      pair.querySelector(".faq-question-wrapper label").textContent = `Question #${i + 1}:`;
      pair.querySelector(".faq-question-wrapper label").setAttribute("for", `question-${i}`);
      pair.querySelector(".faq-question").id = `question-${i}`;

      pair.querySelector(".faq-answer-wrapper label").textContent = `Answer #${i + 1}:`;
      pair.querySelector(".faq-answer-wrapper label").setAttribute("for", `answer-${i}`);
      pair.querySelector(".faq-answer").id = `answer-${i}`;

      pair.querySelector(".delete-btn").setAttribute("aria-label", `Delete question #${i + 1}`);
    });
  }

  // Escape HTML special chars
  function escapeHtml(text) {
    return text.replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;")
               .replace(/"/g, "&quot;")
               .replace(/'/g, "&#039;");
  }

  // Generate structured FAQ HTML output
  function generateHtml() {
    const pairs = faqContainer.querySelectorAll(".faq-pair");
    let html = `<div itemscope itemtype="https://schema.org/FAQPage">\n`;

    pairs.forEach((pair, i) => {
      const qInput = pair.querySelector(".faq-question");
      const aInput = pair.querySelector(".faq-answer");
      if (!qInput || !aInput) return;

      const question = qInput.value.trim();
      const answer = aInput.value.trim();

      if (question && answer) {
        html += `  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">\n`;
        html += `    <h2 itemprop="name">${escapeHtml(question)}</h2>\n`;
        html += `    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">\n`;
        html += `      <p itemprop="text">${escapeHtml(answer)}</p>\n`;
        html += `    </div>\n`;
        html += `  </div>\n`;
      }
    });

    html += `</div>`;
    return html;
  }

  // Update preview textarea and copy button state
  function updateUI() {
    const html = generateHtml();
    htmlPreview.value = html;

    // Enable copy if at least one Q&A filled
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

    // Hide copy message on changes
    copyMessage.style.display = "none";
  }

  // Copy text to clipboard with fallback
  async function copyToClipboard(text) {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // fallback below
      }
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = 0;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return true;
    } catch {
      document.body.removeChild(textarea);
      return false;
    }
  }

  // Event listeners
  addBtn.addEventListener("click", () => {
    addPair();
    updateUI();
  });

  faqContainer.addEventListener("input", updateUI);

  copyBtn.addEventListener("click", async () => {
    const success = await copyToClipboard(htmlPreview.value);
    if (success) {
      copyMessage.style.display = "block";
      setTimeout(() => {
        copyMessage.style.display = "none";
      }, 2000);
    }
  });

  // Initialize with one pair
  addPair();
  updateUI();
});
