// Génère le site statique dans dist/. Aucune dépendance : `node build.mjs`.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

import cfg from './site.config.mjs';
import fr from './src/content/fr.mjs';
import nl from './src/content/nl.mjs';
import en from './src/content/en.mjs';
import { zones } from './src/content/zones.mjs';
import { createRenderer, ACTIONS, EQUIP } from './src/templates.mjs';
import { markFile, logoFile } from './src/icons.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(root, 'src');
const out = path.join(root, 'dist');
const langs = { fr, nl, en };
const zoneBy = Object.fromEntries(zones.map((z) => [z.key, z]));

// Mise en ligne sur une adresse provisoire (GitHub Pages) : l'adresse du site, le
// sous-dossier éventuel et l'interdiction d'indexation viennent de l'environnement.
const site = { ...cfg, domain: (process.env.SITE_URL || cfg.domain).replace(/\/$/, '') };
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const preview = process.env.NOINDEX === '1';

function url(lang, id) {
  const L = langs[lang];
  const p = base + L.prefix;
  const [type, a, b] = id.split(':');
  switch (type) {
    case 'home': return `${p}/`;
    case 'action': return `${p}/${L.actions[a].slug}/`;
    case 'combo': return `${p}/${L.actions[a].slug}/${L.equipment[b].slug}/`;
    case 'zone': return `${p}/${L.slugs.zone}${zoneBy[a].slug[lang]}/`;
    case 'article': return `${p}/${L.slugs.blog}/${L.articles.find((x) => x.key === a).slug}/`;
    default: return `${p}/${L.slugs[type]}/`;
  }
}

// ---------- Fichiers statiques ----------

fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(path.join(src, 'assets'), path.join(out, 'assets'), { recursive: true, filter: (f) => !f.endsWith('.txt') });

const imgOut = path.join(out, 'assets', 'img');
fs.mkdirSync(imgOut, { recursive: true });
fs.writeFileSync(path.join(imgOut, 'favicon.svg'), markFile);
fs.writeFileSync(path.join(imgOut, 'logo.svg'), logoFile(false));
fs.writeFileSync(path.join(imgOut, 'logo-blanc.svg'), logoFile(true));

// Images facultatives : le site s'adapte à ce qui est déposé dans src/assets/img/.
const IMG = /\.(svg|png|webp|jpe?g|avif)$/i;
const list = (dir) => (fs.existsSync(path.join(src, 'assets', 'img', dir)) ? fs.readdirSync(path.join(src, 'assets', 'img', dir)).filter((f) => IMG.test(f)).sort() : []);
const find = (dir, name) => {
  const f = list(dir).find((x) => path.parse(x).name.toLowerCase() === name);
  return f ? `${base}/assets/img/${dir ? dir + '/' : ''}${f}` : null;
};
const assets = {
  brands: Object.fromEntries(cfg.brands.map((b) => [b.key, find('brands', b.key)])),
  photos: Object.fromEntries(EQUIP.map((e) => [e, find('photos', e)])),
  hero: find('photos', 'hero'),
  og: find('', 'og'),
  gallery: list('realisations').map((f) => `${base}/assets/img/realisations/${f}`),
};

const hash = crypto.createHash('md5');
for (const f of ['css/style.css', 'js/main.js']) hash.update(fs.readFileSync(path.join(src, 'assets', f)));
const v = hash.digest('hex').slice(0, 8);

// ---------- Pages ----------

const ids = [
  'home',
  ...ACTIONS.map((a) => `action:${a}`),
  ...ACTIONS.flatMap((a) => EQUIP.map((e) => `combo:${a}:${e}`)),
  'zones',
  ...zones.map((z) => `zone:${z.key}`),
  'contact',
  'blog',
  ...fr.articles.map((a) => `article:${a.key}`),
  'legal',
  'privacy',
];
const noindex = new Set(['legal', 'privacy']);

const { render, notFound } = createRenderer({ cfg: site, langs, zones, url, assets, v, base, preview, year: new Date().getFullYear() });

// Espace insécable avant la ponctuation double, comme le veut la typographie française.
const frenchSpaces = (html) => html.replace(/(<script[\s\S]*?<\/script>)| ([?!:;])/g, (m, script, mark) => script ?? '\u00A0' + mark);

const write = (rel, content) => {
  const file = path.join(out, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};

let count = 0;
for (const lang of Object.keys(langs)) {
  for (const id of ids) {
    const html = render(lang, id);
    write(path.join(url(lang, id).slice(base.length), 'index.html'), lang === 'fr' ? frenchSpaces(html) : html);
    count++;
  }
}
write('404.html', frenchSpaces(notFound()));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${ids
  .filter((id) => !noindex.has(id))
  .flatMap((id) => Object.keys(langs).map((lang) => `  <url>
    <loc>${site.domain}${url(lang, id)}</loc>
    <lastmod>${today}</lastmod>
${Object.values(langs).map((o) => `    <xhtml:link rel="alternate" hreflang="${o.hreflang}" href="${site.domain}${url(o.code, id)}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${site.domain}${url('fr', id)}"/>
  </url>`))
  .join('\n')}
</urlset>
`;
write('sitemap.xml', sitemap);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.domain}${base}/sitemap.xml\n`);

// ---------- Rappels ----------

const todo = [];
if (cfg.phoneIntl === '+32400000000') todo.push('numéro de téléphone (phoneDisplay, phoneIntl)');
if (cfg.email === 'contact@frigairco.be') todo.push('adresse e-mail à confirmer (email)');
if (!cfg.formEndpoint) todo.push('envoi du formulaire : mailto pour le moment (formEndpoint)');
if (!cfg.company.vat) todo.push("numéro d'entreprise et coordonnées légales (company)");
if (cfg.reviews.some((r) => r.name === 'Nom du client')) todo.push('avis clients (reviews)');
const noLogo = cfg.brands.filter((b) => !assets.brands[b.key]).map((b) => b.name);
if (noLogo.length) todo.push(`logos de marques manquants : ${noLogo.join(', ')}`);
if (!assets.hero) todo.push("photo d'accueil (src/assets/img/photos/hero.jpg)");

console.log(`${count} pages générées dans dist/${preview ? ' (version de démonstration, non indexée)' : ''}`);
if (todo.length) console.log(`\nÀ compléter dans site.config.mjs :\n${todo.map((t) => '  - ' + t).join('\n')}`);
