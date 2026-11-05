import { readFile, access, readdir } from 'node:fs/promises';
import { SITE_CONFIG } from '../dist/data.js';
import { validateSiteConfig } from '../dist/lib/events.js';
const validation = validateSiteConfig(SITE_CONFIG);
if (!validation.valid) throw new Error(validation.errors.join('\n'));
const publicFiles = await readdir(new URL('../dist/', import.meta.url));
if (publicFiles.some(name => name.startsWith('qa-'))) throw new Error('Remove temporary QA fixtures before publication.');
const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
for (const [,path] of html.matchAll(/(?:href|src)="\.\/([^"#]+)"/g)) {
  await access(new URL(`../dist/${path}`, import.meta.url));
}
if (!html.includes('lang="' + SITE_CONFIG.defaultLocale + '"')) throw new Error('Initial HTML must match the configured default language.');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
if (new Set(ids).size !== ids.length) throw new Error('Duplicate element IDs');
for (const [,anchor] of html.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.includes(anchor)) throw new Error(`Missing anchor: ${anchor}`);
}
const js = await readFile(new URL('../dist/app.js', import.meta.url), 'utf8');
for (const [,key] of html.matchAll(/data-(?:i18n|label|alt)="([^"]+)"/g)) {
  if (!(new RegExp(`\\b${key}:`)).test(js)) throw new Error(`Missing translation key: ${key}`);
}
await access(new URL('../dist/assets/social-card.png', import.meta.url));
const widgetScripts = [...html.matchAll(/<script\b[^>]*src="https:\/\/cdn\.tickettailor\.com\/js\/widgets\/min\/widget\.js"[^>]*>/g)];
if (widgetScripts.length !== 1) throw new Error('Expected one Ticket Tailor box-office script.');
const widgetUrl = new URL(widgetScripts[0][0].match(/data-url="([^"]+)"/)[1].replaceAll('&amp;', '&'));
if (widgetUrl.origin !== 'https://www.tickettailor.com' || widgetUrl.pathname !== '/all-tickets/stopostoliveband/') {
  throw new Error('Widget must point to the approved Sto Posto box office.');
}
const fallback = html.match(/<a\b[^>]*class="[^"]*box-office-link[^"]*"[^>]*href="([^"]+)"[^>]*>/);
if (!fallback || fallback[1].replaceAll('&amp;', '&') !== widgetUrl.href) {
  throw new Error('Persistent ticket link must match the widget destination.');
}
if (!fallback[0].includes('rel="noopener noreferrer"')) throw new Error('New-tab ticket link needs a safe rel attribute.');
console.log('Public configuration, assets, anchors, translations and box-office destination checked.');

