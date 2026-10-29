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
  const say = (text, state, link) => {
    status.textContent = text;
    status.dataset.state = state;
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      status.append(' ', a);
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.website.value) return; // champ piège : rempli uniquement par les robots

    const fields = [...form.querySelectorAll('[data-label]')].filter((el) => el.value.trim());
    const { endpoint, key, email, subject, ok, error, mailto, sending, fallback } = form.dataset;
    const body = fields.map((el) => `${el.dataset.label} : ${el.value.trim()}`).join('\n');
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (!key && !endpoint) {
      window.location.href = mailtoUrl;
      say(mailto, 'ok');
      return;
    }

    // Les intitulés du formulaire servent de noms de champs : l'e-mail reçu se lit tel quel.
    // Avec une clé Web3Forms on passe par Web3Forms, sinon par l'adresse FormSubmit.
    const data = Object.fromEntries(fields.map((el) => [el.dataset.label, el.value.trim()]));
    const replyTo = form.email.value.trim();
    if (key) Object.assign(data, { access_key: key, subject, from_name: 'Site FrigAirco', replyto: replyTo });
    else Object.assign(data, { _subject: subject, _replyto: replyTo, _template: 'table' });

    button.disabled = true;
    say(sending, 'wait');
    try {
      const res = await fetch(key ? 'https://api.web3forms.com/submit' : endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const reply = await res.json().catch(() => ({}));
      if (!res.ok || String(reply.success) === 'false') throw new Error(reply.message || String(res.status));
      form.reset();
      say(ok, 'ok');
    } catch {
      // Le service d'envoi ne répond pas : la demande peut encore partir par e-mail.
      say(error, 'error', { href: mailtoUrl, label: fallback });
    } finally {
      button.disabled = false;
    }
  });
}
