document.addEventListener("DOMContentLoaded", () => {
  const faqContainer = document.getElementById("faqContainer");
  const addBtn = document.getElementById("addBtn");
  const generateBtn = document.getElementById("generateBtn");
  const copyBtn = document.getElementById("copyBtn");
  const output = document.getElementById("output");
  const copyMessage = document.getElementById("copyMessage");

  // Add new FAQ pair block
  function addPair() {
    const index = faqContainer.children.length;
    const faqPair = document.createElement("div");
    faqPair.className = "faq-pair";

    faqPair.innerHTML = `
      <div class="faq-question-wrapper">
        <label>Question #${index + 1}:</label>
        <input type="text" class="faq-question" />
      </div>
      <div class="faq-answer-wrapper">
        <label>Answer #${index + 1}:</label>
        <textarea class="faq-answer"></textarea>
      </div>
      <button class="delete-btn" type="button" aria-label="Delete question #${index + 1}">Delete</button>
    `;

    // Delete handler
    faqPair.querySelector(".delete-btn").addEventListener("click", () => {
      faqPair.remove();
      refreshLabels();
      updateCopyBtn();
    });

    faqContainer.appendChild(faqPair);
  }

  // Refresh Q/A labels numbering
  function refreshLabels() {
    Array.from(faqContainer.children).forEach((pair, i) => {
      pair.querySelector(".faq-question-wrapper label").textContent = `Question #${i + 1}:`;
      pair.querySelector(".faq-answer-wrapper label").textContent = `Answer #${i + 1}:`;
      pair.querySelector(".delete-btn").setAttribute("aria-label", `Delete question #${i + 1}`);
    });
  }

  // Enable/disable copy button if any Q&A filled
  function updateCopyBtn() {
    const questions = faqContainer.querySelectorAll(".faq-question");
    const answers = faqContainer.querySelectorAll(".faq-answer");
    let enabled = false;

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].value.trim() && answers[i].value.trim()) {
        enabled = true;
        break;
      }
    }
    copyBtn.disabled = !enabled;
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

  // Copy text to clipboard with fallback
  async function copyToClipboard(text) {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // fallback
      }
    }
    // fallback for older browsers
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
    updateCopyBtn();
  });

  faqContainer.addEventListener("input", updateCopyBtn);

  generateBtn.addEventListener("click", () => {
    const html = generateHtml();
    if (!output) return;
    output.value = html;
    copyMessage.style.display = "none";
  });

  copyBtn.addEventListener("click", async () => {
    if (!output) return;
    const success = await copyToClipboard(output.value);
    if (success) {
      copyMessage.style.display = "block";
      setTimeout(() => (copyMessage.style.display = "none"), 2000);
    }
  });

  // Init with one pair
  addPair();
  updateCopyBtn();
});
