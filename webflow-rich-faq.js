document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.accordion').forEach(acc => {
        const control = acc.querySelector('.accordion__control');
        const content = acc.querySelector('.accordion__content');

        control.addEventListener('click', () => {
            const isOpen = acc.classList.contains('open');
            acc.classList.toggle('open');
            content.setAttribute('aria-hidden', String(isOpen));
            control.setAttribute('aria-expanded', String(!isOpen));
        });

        control.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                control.click();
            }
        });
    });
});
