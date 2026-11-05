const toggle = document.getElementById('langToggle');
const mobileToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const serviceSelect = document.getElementById('formService');
const auditForm = document.getElementById('auditForm');
const statusMessage = document.getElementById('statusMsg');
let language = 'en';

toggle.addEventListener('click', () => {
  language = language === 'en' ? 'af' : 'en';
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en][data-af]').forEach(el => {
    el.innerHTML = el.dataset[language];
  });
  document.querySelectorAll('[data-en-placeholder][data-af-placeholder]').forEach(el => {
    el.placeholder = el.dataset[`${language}Placeholder`];
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

document.querySelectorAll('.package-select').forEach(link => {
  link.addEventListener('click', () => {
    serviceSelect.value = link.dataset.service;
  });
});

auditForm.addEventListener('submit', event => {
  event.preventDefault();
  const service = serviceSelect.value;
  const name = document.getElementById('formName').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const target = document.getElementById('formTarget').value.trim();
  const notes = document.getElementById('formNotes').value.trim();
  const subject = encodeURIComponent(`[AUDIT REQUEST] ${service} - ${target}`);
  const body = encodeURIComponent(
    `Hello Wraith Security,\n\nI would like to request an assessment with these details:\n\n` +
    `Selected service: ${service}\nName/company: ${name}\nContact email: ${email}\n` +
    `Target domain/URL: ${target}\nAdditional details: ${notes}\n\n` +
    `I confirm that I am authorised to request testing on this target.`
  );

  statusMessage.hidden = false;
  window.location.href = `mailto:wraith.r7.cyber@gmail.com?subject=${subject}&body=${body}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
