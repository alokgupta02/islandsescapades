import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const ROOT = path.dirname(url.fileURLToPath(import.meta.url));
const target = process.argv[2] || 'http://localhost:3001';
const label = process.argv[3] || 'scrolled';

const outDir = path.join(ROOT, 'temporary screenshots');
fs.mkdirSync(outDir, { recursive: true });
const existing = fs.readdirSync(outDir).filter(f => /^screenshot-\d+/.test(f));
const next = existing.reduce((m, f) => Math.max(m, parseInt(f.match(/^screenshot-(\d+)/)[1], 10)), 0) + 1;
const out = path.join(outDir, `screenshot-${next}-${label}.png`);

const puppeteer = (await import('puppeteer')).default;
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(target, { waitUntil: 'networkidle0', timeout: 30000 });

// Scroll through the page in steps so IntersectionObserver fires for every section
await page.evaluate(async () => {
  await new Promise(resolve => {
    let y = 0;
    const step = window.innerHeight * 0.6;
    const total = document.body.scrollHeight;
    const tick = () => {
      y += step;
      window.scrollTo(0, y);
      if (y < total + step) setTimeout(tick, 120);
      else { window.scrollTo(0, 0); setTimeout(resolve, 400); }
    };
    tick();
  });
});

// Give animations a moment to settle
await new Promise(r => setTimeout(r, 600));

await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(out);
