document.addEventListener('DOMContentLoaded', () => {
  const faqContainers = document.querySelectorAll('.custom-faq');

  faqContainers.forEach((container) => {
    const items = container.querySelectorAll('.faq-item');

    items.forEach((item, i) => {
      const btn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', `faq${i}`);
      btn.id = `faq${i}-button`;
      answer.id = `faq${i}`;
      answer.hidden = true;

      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if (expanded) {
          answer.hidden = true;
          answer.style.maxHeight = null;
        } else {
          answer.hidden = false;
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });

      // Для анимации плавного раскрытия
      answer.style.overflow = 'hidden';
      answer.style.transition = 'max-height 0.3s ease';
      answer.style.maxHeight = null;
    });
  });
});
