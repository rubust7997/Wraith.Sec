const toggle = document.getElementById('langToggle');
const mobileToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
let language = 'en';
toggle.addEventListener('click', () => {
  language = language === 'en' ? 'af' : 'en';
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en][data-af]').forEach(el => {
    el.innerHTML = el.dataset[language];
  });
  toggle.textContent = language === 'en' ? 'AF' : 'EN';
});

mobileToggle.addEventListener('click', () => {
  const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
  mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
  mobileToggle.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');
  mobileMenu.classList.toggle('is-open', !isExpanded);
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', 'Open navigation menu');
    mobileMenu.classList.remove('is-open');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
