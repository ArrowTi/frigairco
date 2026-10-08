// Menu mobile, sous-menus et formulaire de contact.

const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('.sub-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.has-sub');
    const open = !item.classList.contains('open');
    document.querySelectorAll('.has-sub.open').forEach((el) => {
      el.classList.remove('open');
      el.querySelector('.sub-toggle').setAttribute('aria-expanded', 'false');
    });
    item.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('.has-sub.open').forEach((el) => el.classList.remove('open'));
  if (nav) nav.classList.remove('open');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
});

// Apparition progressive des blocs au défilement. La classe est retirée ensuite
// pour laisser la place aux effets de survol.
const revealTargets = '.sec-head, .card, .steps li, .why li, .certs li, .review, .zone-groups > div, .faq details, .contact-list li, .form, .split > *, .cta-in > *, .marquee, .sectors, .gallery img';

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      observer.unobserve(el);
      el.classList.add('in');
      setTimeout(() => el.classList.remove('reveal', 'in'), 1300);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  document.querySelectorAll(revealTargets).forEach((el) => {
    const index = [...el.parentElement.children].indexOf(el);
    el.style.setProperty('--d', `${Math.min(index, 6) * 70}ms`);
    el.classList.add('reveal');
    observer.observe(el);
  });
}

const form = document.querySelector('[data-contact-form]');

if (form) {
  const status = form.querySelector('[data-form-status]');
  const button = form.querySelector('button[type="submit"]');
  const say = (text, state) => {
    status.textContent = text;
    status.dataset.state = state;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.website.value) return; // champ piège : rempli uniquement par les robots

    const fields = [...form.querySelectorAll('[data-label]')].filter((el) => el.value.trim());
    const { endpoint, key, email, subject, ok, error, mailto, sending } = form.dataset;

    if (!endpoint) {
      const body = fields.map((el) => `${el.dataset.label} : ${el.value.trim()}`).join('\n');
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      say(mailto, 'ok');
      return;
    }

    const data = Object.fromEntries(fields.map((el) => [el.name, el.value.trim()]));
    data.subject = subject;
    if (key) data.access_key = key;

    button.disabled = true;
    say(sending, 'wait');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      say(ok, 'ok');
    } catch {
      say(error, 'error');
    } finally {
      button.disabled = false;
    }
  });
}
