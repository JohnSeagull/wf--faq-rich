document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBtn");
  const generateBtn = document.getElementById("generateBtn");
  const output = document.getElementById("output");
  const copyMessage = document.getElementById("copyMessage");

  addBtn.addEventListener("click", () => {
    const faqContainer = document.getElementById("faqContainer");

    const faqPair = document.createElement("div");
    faqPair.className = "faq-pair";

    faqPair.innerHTML = `
      <div class="faq-question-wrapper">
        <label>Question:</label>
        <input type="text" class="faq-question" />
      </div>
      <div class="faq-answer-wrapper">
        <label>Answer:</label>
        <textarea class="faq-answer"></textarea>
      </div>
      <button class="delete-btn">Delete</button>
    `;

    faqPair.querySelector(".delete-btn").addEventListener("click", () => {
      faqPair.remove();
    });

    faqContainer.appendChild(faqPair);
  });

  generateBtn.addEventListener("click", () => {
    const questions = document.querySelectorAll(".faq-question");
    const answers = document.querySelectorAll(".faq-answer");

    let html = `<div itemscope itemtype="https://schema.org/FAQPage">\n`;

    questions.forEach((q, i) => {
      const question = q.value.trim();
      const answer = answers[i].value.trim();

      if (question && answer) {
        html += `  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">\n`;
        html += `    <h2 itemprop="name">${question}</h2>\n`;
        html += `    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">\n`;
        html += `      <p itemprop="text">${answer}</p>\n`;
        html += `    </div>\n`;
        html += `  </div>\n`;
      }
    });

    html += `</div>`;

    output.value = html;
    copyMessage.style.display = "none";
  });

  document.getElementById("copyBtn").addEventListener("click", () => {
    output.select();
    document.execCommand("copy");
    copyMessage.style.display = "block";
  });
});
