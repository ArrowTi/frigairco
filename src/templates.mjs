import { icon, star, mark, waIcon } from './icons.mjs';
import { groups } from './content/zones.mjs';

export const ACTIONS = ['depannage', 'entretien', 'installation'];
export const EQUIP = ['coldroom', 'aircon', 'heatpump', 'fridge', 'display', 'blast', 'refrigeration', 'chiller'];

const ACTION_ICON = { depannage: 'wrench', entretien: 'calendar', installation: 'box' };
const EQUIP_ICON = {
  coldroom: 'snow', aircon: 'wind', heatpump: 'cycle', fridge: 'fridge',
  display: 'store', blast: 'zap', refrigeration: 'factory', chiller: 'drop',
};
const FOOTER_LINKS = [
  ['depannage', 'coldroom'], ['depannage', 'fridge'], ['depannage', 'aircon'],
  ['entretien', 'aircon'], ['entretien', 'heatpump'], ['entretien', 'refrigeration'],
  ['installation', 'coldroom'], ['installation', 'aircon'], ['installation', 'heatpump'],
];

const FOOTER_ZONES = ['liege', 'namur', 'charleroi', 'mons', 'anvers', 'gand'];

// Choix automatique de la langue, une fois par visite, d'après la langue du navigateur :
// néerlandais s'il figure dans la liste, sinon français, sinon anglais. Les robots des
// moteurs de recherche ne sont pas redirigés, pour que chaque version reste indexée.
const AUTO_LANG = `<script>(function(){try{if(navigator.webdriver||/bot|crawl|spider|slurp|lighthouse|preview/i.test(navigator.userAgent))return;if(sessionStorage.getItem("fa-lang"))return;sessionStorage.setItem("fa-lang","1");var l=","+(navigator.languages||[navigator.language]).join(",").toLowerCase(),w=l.indexOf(",nl")>-1?"nl":l.indexOf(",fr")>-1?"fr":l.indexOf(",en")>-1?"en":"",c=document.documentElement.lang.slice(0,2);if(!w||w===c)return;var a=document.querySelector('link[rel="alternate"][hreflang^="'+w+'"]');if(a)location.replace(new URL(a.href).pathname+location.hash)}catch(e){}})()</script>`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (s) => String(s).replace(/<[^>]+>/g, '');
const jsonLd = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

export function createRenderer(c) {
  const { cfg, langs, zones, url, assets, base = '' } = c;
  const telUrl = `tel:${cfg.phoneIntl}`;
  const waUrl = `https://wa.me/${cfg.phoneIntl.replace(/\D/g, '')}`;
  const abs = (p) => cfg.domain + p;
  const zoneBy = Object.fromEntries(zones.map((z) => [z.key, z]));

  const zv = (lang, z) => {
    const name = z.name[lang];
    return {
      key: z.key,
      name,
      loc: z.loc?.[lang] ?? (lang === 'fr' ? `à ${name}` : `in ${name}`),
      near: Array.isArray(z.near) ? z.near : z.near[lang] ?? z.near.fr,
      ctx: z.ctx[lang],
    };
  };

  // ---------- Briques réutilisables ----------

  const btnCall = (L) => `<a class="btn btn-call" href="${telUrl}">${icon('phone')}<span>${L.t.callNumber(cfg.phoneDisplay)}</span></a>`;
  const btnWa = (L) => `<a class="btn btn-wa" href="${waUrl}" rel="noopener">${waIcon}<span>${L.t.whatsapp}</span></a>`;
  const btnQuote = (L, lang, cls = 'btn-ghost') => `<a class="btn ${cls}" href="${url(lang, 'contact')}#contact">${L.t.quote}</a>`;

  const secHead = (title, lead) => `<div class="sec-head"><h2>${title}</h2>${lead ? `<p>${lead}</p>` : ''}</div>`;

  const breadcrumbs = (lang, crumbs) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${crumbs
    .map(([label, id]) => (id ? `<li><a href="${url(lang, id)}">${label}</a></li>` : `<li aria-current="page">${label}</li>`))
    .join('')}</ol></nav>`;

  const pageHero = ({ L, lang, crumbs, h1, sub, lead, tags }) => `
<section class="hero hero--page">
  <div class="container">
    ${breadcrumbs(lang, crumbs)}
    <h1>${h1}${sub ? `<span class="h1-sub">${sub}</span>` : ''}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    <div class="btns">${btnCall(L)}${btnQuote(L, lang)}</div>
    ${tags ? `<ul class="tags tags--dark">${tags.map((k) => `<li>${k}</li>`).join('')}</ul>` : ''}
  </div>
</section>`;

  const stepsBlock = (title, steps) => `
<section class="section section--alt">
  <div class="container">
    ${secHead(title)}
    <ol class="steps">${steps.map(([t, d], i) => `<li><span class="step-n">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>`;

  const faqBlock = (L, items) => `
<section class="section" id="faq">
  <div class="container narrow">
    ${secHead(L.t.faqTitle)}
    <div class="faq">${items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
  </div>
</section>`;

  const faqSchema = (items) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  });

  const whyBlock = (L) => `
<section class="section section--dark">
  <div class="container">
    ${secHead(L.t.whyTitle)}
    <ul class="why">${L.t.why.map(([i, t, d]) => `<li>${icon(i)}<h3>${t}</h3><p>${d}</p></li>`).join('')}</ul>
    <div class="sectors"><span>${L.t.sectorsTitle}</span><ul class="tags tags--dark">${L.t.sectors.map((s) => `<li>${s}</li>`).join('')}</ul></div>
  </div>
</section>`;

  // La liste des marques est doublée pour que le défilement boucle sans coupure.
  const brandItems = cfg.brands
    .map((b) => `<li>${assets.brands[b.key] ? `<img src="${assets.brands[b.key]}" alt="${esc(b.name)}" loading="lazy">` : `<span>${esc(b.name)}</span>`}</li>`)
    .join('');

  const brandsBlock = (L) => `
<section class="section">
  <div class="container">
    ${secHead(L.t.certTitle, L.t.certLead)}
    <ul class="certs">${cfg.certifications.map((k) => `<li>${icon('shield')}<div><b>${k}</b><span>${L.t.certs[k] ?? ''}</span></div></li>`).join('')}</ul>
    <h3 class="brands-title">${L.t.brandsTitle}</h3>
  </div>
  <div class="marquee"><ul class="brands">${brandItems}</ul><ul class="brands" aria-hidden="true">${brandItems}</ul></div>
</section>`;

  const reviewsBlock = (L) => `
<section class="section section--alt">
  <div class="container">
    ${secHead(L.t.reviewsTitle, L.t.reviewsLead)}
    <div class="reviews">${cfg.reviews
      .map((r) => `<figure class="review">
        <div class="review-top"><span class="avatar" aria-hidden="true">${esc(r.name.charAt(0))}</span><figcaption><b>${esc(r.name)}</b>${r.date ? `<small>${esc(r.date)}</small>` : ''}</figcaption><span class="review-src">Google</span></div>
        <div class="stars" role="img" aria-label="${r.rating}/5">${star.repeat(r.rating)}</div>
        <blockquote>${esc(r.text)}</blockquote>
      </figure>`)
      .join('')}</div>
    ${cfg.social.googleReviews ? `<p class="center"><a class="btn btn-outline" href="${esc(cfg.social.googleReviews)}" rel="noopener">${L.t.reviewsLink}</a></p>` : ''}
  </div>
</section>`;

  const galleryBlock = (L) =>
    assets.gallery.length
      ? `
<section class="section">
  <div class="container">
    ${secHead(L.t.galleryTitle)}
    <div class="gallery">${assets.gallery.map((p) => `<img src="${p}" alt="${L.t.galleryTitle} FrigAirco" loading="lazy">`).join('')}</div>
  </div>
</section>`
      : '';

  const zoneGroups = (lang) => {
    const L = langs[lang];
    return `<div class="zone-groups">${groups
      .map((g) => `<div><h3>${L.t.groups[g]}</h3><ul class="chips">${zones
        .filter((z) => z.group === g)
        .map((z) => `<li><a href="${url(lang, 'zone:' + z.key)}">${z.name[lang]}</a></li>`)
        .join('')}</ul></div>`)
      .join('')}</div>`;
  };

  const zonesBlock = (lang, title, alt = true) => {
    const L = langs[lang];
    return `
<section class="section${alt ? ' section--alt' : ''}" id="zones">
  <div class="container">
    ${secHead(title ?? L.t.zonesTitle, L.t.zonesLead)}
    ${zoneGroups(lang)}
  </div>
</section>`;
  };

  const ctaBand = (L, lang) => `
<section class="cta">
  <div class="container cta-in">
    <div><h2>${L.t.ctaTitle}</h2><p>${L.t.ctaText}</p></div>
    <div class="btns">${btnCall(L)}${btnWa(L)}${btnQuote(L, lang)}</div>
  </div>
</section>`;

  const contactForm = (L) => {
    const f = L.form;
    return `<form class="form" method="post" action="${esc(cfg.formEndpoint || '#')}" data-contact-form
      data-endpoint="${esc(cfg.formEndpoint)}" data-key="${esc(cfg.formAccessKey)}" data-email="${esc(cfg.email)}"
      data-subject="${esc(f.subject)}" data-ok="${esc(f.ok)}" data-error="${esc(f.error)}" data-mailto="${esc(f.mailto)}" data-sending="${esc(f.sending)}">
      <h2>${L.contact.formTitle}</h2>
      <div class="row">
        <label>${f.name} *<input type="text" name="name" autocomplete="name" required data-label="${esc(f.name)}"></label>
        <label>${f.phone} *<input type="tel" name="phone" autocomplete="tel" required data-label="${esc(f.phone)}"></label>
      </div>
      <div class="row">
        <label>${f.email} *<input type="email" name="email" autocomplete="email" required data-label="${esc(f.email)}"></label>
        <label>${f.city}<input type="text" name="city" autocomplete="postal-code" data-label="${esc(f.city)}"></label>
      </div>
      <div class="row">
        <label>${f.type}<select name="request" data-label="${esc(f.type)}">${f.types.map((t) => `<option>${t}</option>`).join('')}</select></label>
        <label>${f.equip}<select name="equipment" data-label="${esc(f.equip)}">${EQUIP.map((e) => `<option>${L.equipment[e].title}</option>`).join('')}<option>${f.equipOther}</option></select></label>
      </div>
      <label>${f.message} *<textarea name="message" rows="5" required placeholder="${esc(f.messageHint)}" data-label="${esc(f.message)}"></textarea></label>
      <p class="hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></p>
      <label class="consent"><input type="checkbox" name="consent" required><span>${f.consent} <a href="${url(L.code, 'privacy')}">${L.t.privacy}</a></span></label>
      <button class="btn btn-primary" type="submit">${f.send}</button>
      <p class="form-status" role="status" aria-live="polite" data-form-status></p>
    </form>`;
  };

  const contactBlock = (L, lang, withHead) => `
<section class="section" id="contact">
  <div class="container contact">
    <div>
      ${withHead ? `<h2>${L.contact.h1}</h2><p class="muted">${L.contact.lead}</p>` : ''}
      <ul class="contact-list">
        <li><a href="${telUrl}">${icon('phone')}<span><b>${L.contact.phoneLabel}</b>${cfg.phoneDisplay}<small>${L.contact.phoneNote}</small></span></a></li>
        <li><a href="${waUrl}" rel="noopener">${waIcon}<span><b>${L.contact.waLabel}</b>${cfg.phoneDisplay}<small>${L.contact.waNote}</small></span></a></li>
        <li><a href="mailto:${cfg.email}">${icon('mail')}<span><b>${L.contact.mailLabel}</b>${cfg.email}<small>${L.contact.mailNote}</small></span></a></li>
        <li><a href="${url(lang, 'zones')}">${icon('pin')}<span><b>${L.contact.areaLabel}</b>${L.contact.areaNote}<small>${L.t.allZones}</small></span></a></li>
      </ul>
    </div>
    ${contactForm(L)}
  </div>
</section>`;

  const equipCard = (lang, e, a) => {
    const L = langs[lang];
    const E = L.equipment[e];
    const links = (a ? [a] : ACTIONS).map((k) => `<li><a href="${url(lang, `combo:${k}:${e}`)}">${a ? L.t.learnMore : L.actions[k].pair(E)}</a></li>`).join('');
    return `<article class="card">
      <span class="ico-wrap">${icon(EQUIP_ICON[e])}</span>
      <h3>${a ? `<a href="${url(lang, `combo:${a}:${e}`)}">${L.actions[a].pair(E)}</a>` : E.title}</h3>
      <p>${E.short}</p>
      ${a ? `<p class="kw">${E.kw.join(' · ')}</p>` : ''}
      <ul class="links">${links}</ul>
    </article>`;
  };

  const serviceSchema = (lang, name, desc, id) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType: name,
    description: desc,
    url: abs(url(lang, id)),
    provider: { '@id': cfg.domain + '/#business' },
    areaServed: { '@type': 'Country', name: 'Belgium' },
    hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' },
  });

  // ---------- Pages ----------

  const pages = {
    home(lang) {
      const L = langs[lang];
      const H = L.home;
      const D = L.actions.depannage;
      const picker = `<div class="picker">
        <p class="picker-top"><span class="dot"></span>${L.t.available}</p>
        <h2>${H.pickerTitle}</h2>
        <ul>${EQUIP.map((e) => `<li><a href="${url(lang, `combo:depannage:${e}`)}" title="${esc(D.pair(L.equipment[e]))}">${icon(EQUIP_ICON[e])}<span>${L.equipment[e].label}</span></a></li>`).join('')}</ul>
        <p class="picker-note">${H.pickerNote}</p>
        ${btnWa(L)}
      </div>`;
      const body = `
<section class="hero${assets.hero ? ' hero--photo' : ''}"${assets.hero ? ` style="--hero-img: url('${assets.hero}')"` : ''}>
  <div class="container hero-in">
    <div>
      <p class="badge"><span class="dot"></span>${H.badge}</p>
      <h1>${H.h1}</h1>
      <p class="lead">${H.lead}</p>
      <div class="btns">${btnCall(L)}${btnQuote(L, lang)}</div>
      <ul class="checks">${H.checks.map((t) => `<li>${icon('check')}${t}</li>`).join('')}</ul>
    </div>
    ${picker}
  </div>
  <div class="container"><ul class="stats">${H.stats.map(([v, l]) => `<li><b>${v}</b><span>${l}</span></li>`).join('')}</ul></div>
</section>

<section class="section" id="services">
  <div class="container">
    ${secHead(H.servicesTitle, H.servicesLead)}
    <div class="grid grid-3">${ACTIONS.map((a) => {
      const A = L.actions[a];
      return `<article class="card card--${a}">
        <span class="ico-wrap">${icon(ACTION_ICON[a])}</span>
        <h3><a href="${url(lang, 'action:' + a)}">${A.hub.cardTitle}</a></h3>
        <p>${A.hub.card}</p>
        <ul class="links">${EQUIP.map((e) => `<li><a href="${url(lang, `combo:${a}:${e}`)}">${A.pair(L.equipment[e])}</a></li>`).join('')}</ul>
      </article>`;
    }).join('')}</div>
  </div>
</section>

<section class="section section--alt" id="equipements">
  <div class="container">
    ${secHead(H.equipTitle, H.equipLead)}
    <div class="grid grid-4">${EQUIP.map((e) => equipCard(lang, e)).join('')}</div>
  </div>
</section>
${whyBlock(L)}
${brandsBlock(L)}
${galleryBlock(L)}
${reviewsBlock(L)}
${zonesBlock(lang, null, false)}
<div class="section--alt">${faqBlock(L, H.faq)}</div>
${contactBlock(L, lang, true)}`;
      return {
        title: H.title,
        desc: H.desc,
        body,
        schema: [
          { '@context': 'https://schema.org', '@type': 'WebSite', name: cfg.name, url: abs(url(lang, 'home')), inLanguage: L.hreflang },
          faqSchema(H.faq),
        ],
      };
    },

    action(lang, a) {
      const L = langs[lang];
      const A = L.actions[a];
      const generic = L.t.generic;
      const faq = A.faq(generic);
      const body = `
${pageHero({ L, lang, crumbs: [[L.t.home, 'home'], [A.nav, null]], h1: A.hub.h1, lead: A.hub.lead })}
<section class="section">
  <div class="container">
    <div class="grid grid-4">${EQUIP.map((e) => equipCard(lang, e, a)).join('')}</div>
  </div>
</section>
${stepsBlock(A.stepsTitle(generic), A.steps)}
${whyBlock(L)}
${zonesBlock(lang, null, false)}
<div class="section--alt">${faqBlock(L, faq)}</div>
${ctaBand(L, lang)}`;
      return {
        title: A.hub.title,
        desc: A.hub.desc,
        body,
        crumbs: [[L.t.home, 'home'], [A.nav, `action:${a}`]],
        schema: [serviceSchema(lang, A.hub.h1, A.hub.desc, `action:${a}`), faqSchema(faq)],
      };
    },

    combo(lang, a, e) {
      const L = langs[lang];
      const A = L.actions[a];
      const E = L.equipment[e];
      const id = `combo:${a}:${e}`;
      const faq = A.faq(E);
      const extra = A.extra ? A.extra(E) : null;
      const photo = assets.photos[e];
      const body = `
${pageHero({ L, lang, crumbs: [[L.t.home, 'home'], [A.nav, `action:${a}`], [E.title, null]], h1: A.h1(E), lead: A.lead(E), tags: E.kw })}
<section class="section">
  <div class="container split">
    <div class="prose">
      <h2>${A.listTitle(E)}</h2>
      <p>${E.intro}</p>
      <ul class="checklist">${E[A.listKey].map((t) => `<li>${icon('check')}<span>${t}</span></li>`).join('')}</ul>
      ${extra ? `<h2>${extra[0]}</h2><p>${extra[1]}</p>` : ''}
    </div>
    <aside class="help">
      ${photo ? `<img src="${photo}" alt="${esc(A.pair(E))}" loading="lazy">` : ''}
      <p class="help-title"><span class="dot"></span>${L.t.available}</p>
      <p>${L.t.ctaText}</p>
      <div class="btns btns--stack">${btnCall(L)}${btnWa(L)}${btnQuote(L, lang)}</div>
    </aside>
  </div>
</section>
${stepsBlock(A.stepsTitle(E), A.steps)}
<section class="section">
  <div class="container">
    ${secHead(L.t.alsoTitle(E))}
    <div class="grid grid-3">${ACTIONS.filter((k) => k !== a).map((k) => {
      const B = L.actions[k];
      return `<article class="card"><span class="ico-wrap">${icon(ACTION_ICON[k])}</span><h3><a href="${url(lang, `combo:${k}:${e}`)}">${B.pair(E)}</a></h3><p>${B.hub.card}</p></article>`;
    }).join('')}</div>
    <h3 class="sub-title">${L.t.otherTitle(A)}</h3>
    <ul class="chips">${EQUIP.filter((k) => k !== e).map((k) => `<li><a href="${url(lang, `combo:${a}:${k}`)}">${A.pair(L.equipment[k])}</a></li>`).join('')}</ul>
  </div>
</section>
${zonesBlock(lang, `${A.pair(E)} – ${L.t.zonesTitle.toLowerCase()}`)}
${faqBlock(L, faq)}
${ctaBand(L, lang)}`;
      return {
        title: A.title(E),
        desc: A.desc(E),
        body,
        crumbs: [[L.t.home, 'home'], [A.nav, `action:${a}`], [E.title, id]],
        schema: [serviceSchema(lang, A.pair(E), A.desc(E), id), faqSchema(faq)],
      };
    },

    zones(lang) {
      const L = langs[lang];
      const P = L.zonesPage;
      const body = `
${pageHero({ L, lang, crumbs: [[L.t.home, 'home'], [L.t.zones, null]], h1: P.h1, lead: P.lead })}
<section class="section">
  <div class="container">${zoneGroups(lang)}</div>
</section>
${whyBlock(L)}
${ctaBand(L, lang)}`;
      return { title: P.title, desc: P.desc, body, crumbs: [[L.t.home, 'home'], [L.t.zones, 'zones']], schema: [] };
    },

    zone(lang, key) {
      const L = langs[lang];
      const raw = zoneBy[key];
      const z = zv(lang, raw);
      const Z = L.zone;
      const faq = Z.faq(z);
      // Région : les autres régions et ses villes. Ville : sa région et les villes de la même province.
      const sibling = (o) => (raw.province ? o.province === raw.province : o.parent === raw.parent);
      const related = zones.filter((o) => o.key !== key && (raw.parent ? o.key === raw.parent || sibling(o) : o.group === 'region' || o.parent === key));
      const body = `
${pageHero({ L, lang, crumbs: [[L.t.home, 'home'], [L.t.zones, 'zones'], [z.name, null]], h1: Z.h1(z), sub: Z.sub, lead: Z.lead(z) })}
<section class="section">
  <div class="container">
    ${secHead(Z.servicesTitle(z))}
    <div class="grid grid-3">${ACTIONS.map((a) => {
      const A = L.actions[a];
      return `<article class="card card--${a}">
        <span class="ico-wrap">${icon(ACTION_ICON[a])}</span>
        <h3><a href="${url(lang, 'action:' + a)}">${A.hub.cardTitle}</a></h3>
        <ul class="links">${EQUIP.map((e) => `<li><a href="${url(lang, `combo:${a}:${e}`)}">${A.pair(L.equipment[e])} ${z.loc}</a></li>`).join('')}</ul>
      </article>`;
    }).join('')}</div>
  </div>
</section>
<section class="section section--alt">
  <div class="container">
    ${secHead(Z.nearTitle(z), Z.nearLead(z))}
    <ul class="tags">${z.near.map((n) => `<li>${n}</li>`).join('')}</ul>
    ${related.length ? `<h3 class="sub-title">${Z.relatedTitle}</h3><ul class="chips">${related.map((o) => `<li><a href="${url(lang, 'zone:' + o.key)}">${o.name[lang]}</a></li>`).join('')}</ul>` : ''}
  </div>
</section>
${whyBlock(L)}
${faqBlock(L, faq)}
${ctaBand(L, lang)}`;
      return {
        title: Z.title(z),
        desc: Z.desc(z),
        body,
        crumbs: [[L.t.home, 'home'], [L.t.zones, 'zones'], [z.name, `zone:${key}`]],
        schema: [faqSchema(faq)],
      };
    },

    contact(lang) {
      const L = langs[lang];
      const C = L.contact;
      const body = `
${pageHero({ L, lang, crumbs: [[L.t.home, 'home'], [L.t.contact, null]], h1: C.h1, lead: C.lead })}
${contactBlock(L, lang, false)}
${zonesBlock(lang)}`;
      return { title: C.title, desc: C.desc, body, crumbs: [[L.t.home, 'home'], [L.t.contact, 'contact']], schema: [] };
    },

    blog(lang) {
      const L = langs[lang];
      const B = L.blog;
      const body = `
${pageHero({ L, lang, crumbs: [[L.t.home, 'home'], [L.t.blog, null]], h1: B.h1, lead: B.lead })}
<section class="section">
  <div class="container">
    <div class="grid grid-3">${L.articles.map((p) => `<article class="card"><span class="ico-wrap">${icon('snow')}</span><h2 class="h3"><a href="${url(lang, 'article:' + p.key)}">${p.title}</a></h2><p>${p.desc}</p><ul class="links"><li><a href="${url(lang, 'article:' + p.key)}">${L.t.readMore}</a></li></ul></article>`).join('')}</div>
  </div>
</section>
${ctaBand(L, lang)}`;
      return { title: B.title, desc: B.desc, body, crumbs: [[L.t.home, 'home'], [L.t.blog, 'blog']], schema: [] };
    },

    article(lang, key) {
      const L = langs[lang];
      const p = L.articles.find((x) => x.key === key);
      const [, la, le] = p.link.split(':');
      const linkLabel = L.actions[la].pair(L.equipment[le]);
      const body = `
${pageHero({ L, lang, crumbs: [[L.t.home, 'home'], [L.t.blog, 'blog'], [p.title, null]], h1: p.title, lead: p.intro })}
<section class="section">
  <div class="container narrow prose">
    ${p.sections.map(([h, t]) => `<h2>${h}</h2><p>${t}</p>`).join('')}
    <p><a class="btn btn-primary" href="${url(lang, p.link)}">${linkLabel}${icon('arrow')}</a></p>
  </div>
</section>
${ctaBand(L, lang)}`;
      return {
        title: p.title.length > 52 ? p.title : `${p.title} | FrigAirco`,
        desc: p.desc,
        body,
        ogType: 'article',
        crumbs: [[L.t.home, 'home'], [L.t.blog, 'blog'], [p.title, `article:${key}`]],
        schema: [{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: p.title,
          description: p.desc,
          datePublished: p.date,
          inLanguage: L.hreflang,
          author: { '@type': 'Organization', name: cfg.name },
          publisher: { '@id': cfg.domain + '/#business' },
          mainEntityOfPage: abs(url(lang, `article:${key}`)),
        }],
      };
    },

    legal: (lang) => textPage(lang, 'legal'),
    privacy: (lang) => textPage(lang, 'privacy'),
  };

  function textPage(lang, kind) {
    const L = langs[lang];
    const P = L[kind];
    const todo = `<mark>${L.t.toComplete}</mark>`;
    const info = {
      legalName: cfg.company.legalName || `${cfg.name} (${todo})`,
      address: cfg.company.address || todo,
      vat: cfg.company.vat || todo,
      host: cfg.company.host || todo,
      phone: cfg.phoneDisplay,
      email: cfg.email,
    };
    const body = `
${pageHero({ L, lang, crumbs: [[L.t.home, 'home'], [P.h1, null]], h1: P.h1, lead: '' })}
<section class="section">
  <div class="container narrow prose">${P.blocks(info).map(([h, t]) => `<h2>${h}</h2><p>${t}</p>`).join('')}</div>
</section>`;
    return { title: P.title, desc: strip(P.h1) + ' – FrigAirco', body, crumbs: [[L.t.home, 'home'], [P.h1, kind]], schema: [], noindex: true };
  }

  // ---------- Gabarit commun ----------

  function header(lang, id) {
    const L = langs[lang];
    const here = (target) => (id === target || id.startsWith(target.replace('action:', 'combo:') + ':') ? ' aria-current="page"' : '');
    const toggle = `<button class="sub-toggle" type="button" aria-expanded="false" aria-label="${L.t.subMenu}">${icon('chevron')}</button>`;
    const actions = ACTIONS.map((a) => {
      const A = L.actions[a];
      return `<li class="has-sub"><a href="${url(lang, 'action:' + a)}"${here('action:' + a)}>${A.nav}</a>${toggle}
        <div class="sub">${EQUIP.map((e) => `<a href="${url(lang, `combo:${a}:${e}`)}">${A.pair(L.equipment[e])}</a>`).join('')}</div></li>`;
    }).join('');
    const zoneSub = groups.map((g) => `<div><p>${L.t.groups[g]}</p>${zones.filter((z) => z.group === g).map((z) => `<a href="${url(lang, 'zone:' + z.key)}">${z.name[lang]}</a>`).join('')}</div>`).join('');
    return `
<div class="topbar"><div class="container topbar-in">
  <span><span class="dot"></span>${L.t.available}<span class="topbar-regions"> — ${L.t.regions}</span></span>
  <a href="${telUrl}">${icon('phone')}${cfg.phoneDisplay}</a>
</div></div>
<header class="header">
  <div class="container header-in">
    <a class="brand" href="${url(lang, 'home')}" aria-label="FrigAirco – ${L.t.home}">${mark('h')}<span class="brand-name">Frig<b>Airco</b></span></a>
    <button class="nav-toggle" type="button" aria-controls="nav" aria-expanded="false" aria-label="${L.t.menu}">${icon('menu')}</button>
    <nav class="nav" id="nav" aria-label="${L.t.menu}">
      <ul>
        ${actions}
        <li class="has-sub"><a href="${url(lang, 'zones')}"${id === 'zones' || id.startsWith('zone:') ? ' aria-current="page"' : ''}>${L.t.zones}</a>${toggle}<div class="sub sub--wide">${zoneSub}</div></li>
        <li><a href="${url(lang, 'blog')}"${id === 'blog' || id.startsWith('article:') ? ' aria-current="page"' : ''}>${L.t.blog}</a></li>
        <li><a href="${url(lang, 'contact')}"${id === 'contact' ? ' aria-current="page"' : ''}>${L.t.contact}</a></li>
      </ul>
      <div class="nav-extra">
        <a class="btn btn-call btn--sm" href="${telUrl}">${icon('phone')}<span>${cfg.phoneDisplay}</span></a>
      </div>
    </nav>
  </div>
</header>`;
  }

  function footer(lang) {
    const L = langs[lang];
    const social = Object.entries(cfg.social).filter(([k, v]) => v && k !== 'googleReviews').map(([k, v]) => `<a href="${esc(v)}" rel="noopener">${k.charAt(0).toUpperCase() + k.slice(1)}</a>`).join('');
    return `
<footer class="footer">
  <div class="container footer-grid">
    <div>
      <a class="brand" href="${url(lang, 'home')}" aria-label="FrigAirco">${mark('f')}<span class="brand-name">Frig<b>Airco</b></span></a>
      <p>${L.t.footerTagline}</p>
      ${social ? `<p class="social">${social}</p>` : ''}
    </div>
    <div>
      <h3>${L.t.footerServices}</h3>
      <ul>${FOOTER_LINKS.map(([a, e]) => `<li><a href="${url(lang, `combo:${a}:${e}`)}">${L.actions[a].pair(L.equipment[e])}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h3>${L.t.footerZones}</h3>
      <ul>${zones.filter((z) => z.group === 'region' || FOOTER_ZONES.includes(z.key)).map((z) => `<li><a href="${url(lang, 'zone:' + z.key)}">${z.name[lang]}</a></li>`).join('')}
      <li><a href="${url(lang, 'zones')}">${L.t.allZones}</a></li></ul>
    </div>
    <div>
      <h3>${L.t.footerContact}</h3>
      <ul>
        <li><a href="${telUrl}">${cfg.phoneDisplay}</a></li>
        <li><a href="${waUrl}" rel="noopener">${L.t.whatsapp}</a></li>
        <li><a href="mailto:${cfg.email}">${cfg.email}</a></li>
        <li>${L.t.available}</li>
        <li><a href="${url(lang, 'contact')}">${L.t.quote}</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© ${c.year} ${cfg.name}. ${L.t.rights}</p>
    <p><a href="${url(lang, 'legal')}">${L.t.legal}</a><a href="${url(lang, 'privacy')}">${L.t.privacy}</a></p>
  </div>
</footer>
<a class="wa-float" href="${waUrl}" rel="noopener" aria-label="${L.t.whatsapp}">${waIcon}</a>
<div class="mobile-bar">
  <a class="mb-call" href="${telUrl}">${icon('phone')}${L.t.call}</a>
  <a class="mb-wa" href="${waUrl}" rel="noopener">${waIcon}${L.t.whatsapp}</a>
  <a class="mb-quote" href="${url(lang, 'contact')}">${icon('mail')}${L.t.quoteShort}</a>
</div>`;
  }

  const business = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': cfg.domain + '/#business',
    name: cfg.name,
    url: abs(`${base}/`),
    telephone: cfg.phoneIntl,
    email: cfg.email,
    logo: abs(`${base}/assets/img/logo.svg`),
    image: abs(assets.og || `${base}/assets/img/logo.svg`),
    address: { '@type': 'PostalAddress', addressCountry: 'BE' },
    areaServed: zones.map((z) => ({ '@type': z.group === 'wal' || z.group === 'fla' ? 'City' : 'AdministrativeArea', name: z.name.fr })),
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' },
    knowsLanguage: ['fr', 'nl', 'en'],
    sameAs: Object.values(cfg.social).filter(Boolean),
  };

  function layout(lang, id, page) {
    const L = langs[lang];
    const canonical = abs(url(lang, id));
    const alternates = Object.values(langs).map((o) => `<link rel="alternate" hreflang="${o.hreflang}" href="${abs(url(o.code, id))}">`).join('\n');
    const schema = [business, ...(page.schema || [])];
    if (page.crumbs) {
      schema.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: page.crumbs.map(([name, cid], i) => ({ '@type': 'ListItem', position: i + 1, name: strip(name), item: abs(url(lang, cid)) })),
      });
    }
    return `<!doctype html>
<html lang="${L.hreflang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.desc)}">
${page.noindex || c.preview ? '<meta name="robots" content="noindex, follow">' : ''}
<link rel="canonical" href="${canonical}">
${alternates}
<link rel="alternate" hreflang="x-default" href="${abs(url('fr', id))}">
${AUTO_LANG}
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="${cfg.name}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="${L.ogLocale}">
${assets.og ? `<meta property="og:image" content="${abs(assets.og)}">\n<meta name="twitter:card" content="summary_large_image">` : '<meta name="twitter:card" content="summary">'}
<meta name="theme-color" content="#0a1f3c">
<meta name="format-detection" content="telephone=yes">
<link rel="icon" href="${base}/assets/img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${base}/assets/css/style.css?v=${c.v}">
<script defer src="${base}/assets/js/main.js?v=${c.v}"></script>
${schema.map(jsonLd).join('\n')}
</head>
<body>
<a class="skip" href="#main">${L.t.skip}</a>
${header(lang, id)}
<main id="main">${page.body}
</main>
${footer(lang)}
</body>
</html>
`;
  }

  function render(lang, id) {
    const [type, a, b] = id.split(':');
    return layout(lang, id, pages[type](lang, a, b));
  }

  function notFound() {
    const L = langs.fr;
    const body = `
<section class="hero hero--page">
  <div class="container">
    <h1>${L.t.notFoundTitle}</h1>
    <p class="lead">${L.t.notFoundText}</p>
    <div class="btns">${Object.values(langs).map((o) => `<a class="btn btn-ghost" href="${url(o.code, 'home')}">${o.t.notFoundBack}</a>`).join('')}</div>
  </div>
</section>`;
    return layout('fr', 'home', { title: `${L.t.notFoundTitle} | FrigAirco`, desc: L.t.notFoundText, body, noindex: true });
  }

  return { render, notFound };
}
