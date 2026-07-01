document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('is-ready');

  const items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(item => observer.observe(item));
  } else {
    items.forEach(item => item.classList.add('is-visible'));
  }

  const backToTop = document.querySelector('[data-back-to-top]');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 700);
    }, { passive: true });
  }

  const themeToggle = document.querySelector('[data-theme-toggle]');
  if (themeToggle) {
    const saved = localStorage.getItem('rb-theme');
    if (saved === 'dark') document.documentElement.classList.add('theme-dark');
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('theme-dark');
      localStorage.setItem('rb-theme', document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light');
    });
  }
});
