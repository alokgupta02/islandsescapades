// optimize-images.mjs
// Converts photographs to WebP, generates responsive variants, updates HTML,
// strips metadata (sharp default), adds lazy loading, and removes originals.

import sharp from 'sharp';
import { readFile, writeFile, unlink, stat, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));

// ─── Photo configs ─────────────────────────────────────────────────────────────
// sizes: target widths in px (only generated if ≤ original width)
// lazy: false only for the LCP hero image
// sizesAttr: <source sizes="..."> hint for the browser
const PHOTOS = [
  {
    src: 'resources/images/hero.jpg',
    sizes: [1920, 1280, 768, 480],
    q: 82, lazy: false,
    sizesAttr: '100vw',
  },
  {
    src: 'resources/images/about-us.jpg',
    sizes: [1200, 800, 600],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 900px) 100vw, 50vw',
  },
  {
    src: 'resources/images/activities/trekking.jpg',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 768px) 100vw, 800px',
  },
  {
    src: 'resources/images/activities/sunset-dinner-cruise.png',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 768px) 100vw, 800px',
  },
  {
    src: 'resources/images/blogs/best-places.jpg',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  {
    src: 'resources/images/blogs/checklist.jpg',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  {
    src: 'resources/images/blogs/honeymoon.jpg',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  {
    src: 'resources/images/blogs/plan.jpg',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  {
    src: 'resources/images/blogs/scuba.jpg',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  {
    src: 'resources/images/destinations/baratang.jpg',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  {
    src: 'resources/images/destinations/barren.png',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  {
    src: 'resources/images/destinations/diglipur.png',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  {
    src: 'resources/images/destinations/havelock.png',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  {
    src: 'resources/images/destinations/neil.png',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  {
    src: 'resources/images/destinations/north-bay.png',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  {
    src: 'resources/images/destinations/pb.png',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  {
    src: 'resources/images/destinations/rangat.png',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  {
    src: 'resources/images/packages/corporate.jpg',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  {
    src: 'resources/images/packages/family.jpg',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  {
    src: 'resources/images/packages/honeymoon.jpg',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  {
    src: 'resources/images/packages/lux.jpg',
    sizes: [1200, 800, 400],
    q: 82, lazy: true,
    sizesAttr: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
];

// Icons: WebP-only, capped at 128px (2× display size of 56px + breathing room)
const ICON_SRCS = [
  'resources/icons/diver.png',
  'resources/icons/hiking.png',
  'resources/icons/kayaking.png',
  'resources/icons/parasailing.png',
  'resources/icons/parasailing_2.png',
  'resources/icons/scuba-diving.png',
  'resources/icons/sea-walking.png',
  'resources/icons/snorkelling.png',
  'resources/icons/trekking.png',
];

// ─── Utilities ─────────────────────────────────────────────────────────────────

async function getKB(p) {
  try {
    const s = await stat(p);
    return Math.round(s.size / 1024 * 10) / 10;
  } catch {
    return 0;
  }
}

function getAttr(tag, name) {
  const m = tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'));
  return m ? m[1] : null;
}

// Normalise any src variant → root-relative (e.g. ../resources/… → resources/…)
function normSrc(src) {
  return src
    .replace(/^\.\.\//, '')
    .replace(/^\.\//, '')
    .replace(/^\//, '');
}

async function* walkHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walkHtml(full);
    else if (e.name.endsWith('.html')) yield full;
  }
}

// ─── Phase 1: Generate WebP variants for photographs ──────────────────────────

console.log('\n━━━ Phase 1 / 4 : Generating WebP variants ━━━\n');

// photoMap key = root-relative src (e.g. "resources/images/packages/honeymoon.jpg")
// value = { generated:[{w, relSrc, absPath, outKB}], sizesAttr, lazy, origW, origH }
const photoMap = new Map();
const reportRows = [];

for (const cfg of PHOTOS) {
  const srcAbs = path.join(ROOT, cfg.src);
  if (!existsSync(srcAbs)) {
    console.warn(`  ⚠  Missing, skipped: ${cfg.src}`);
    continue;
  }

  const meta    = await sharp(srcAbs).metadata();
  const origW   = meta.width;
  const origH   = meta.height;
  const origKB  = await getKB(srcAbs);
  const stem    = path.basename(cfg.src, path.extname(cfg.src));
  const imgDir  = path.dirname(srcAbs);
  const dirRel  = path.dirname(cfg.src).replace(/\\/g, '/'); // e.g. resources/images/packages

  // Only generate widths that don't require upscaling
  const targets = cfg.sizes.filter(w => w <= origW);
  if (targets.length === 0) targets.push(origW); // at minimum: same-size WebP

  process.stdout.write(`  ${cfg.src}  [${origW}×${origH} px, ${origKB} KB]\n`);

  const generated = [];
  for (const w of targets) {
    const fname  = `${stem}-${w}.webp`;
    const absOut = path.join(imgDir, fname);
    const relSrc = `${dirRel}/${fname}`;

    await sharp(srcAbs)
      .resize(w, null, { withoutEnlargement: true, kernel: 'lanczos3' })
      .webp({ quality: cfg.q, effort: 4 })
      .toFile(absOut);

    const outKB = await getKB(absOut);
    generated.push({ w, relSrc, absPath: absOut, outKB });
    process.stdout.write(`    → ${fname}  (${outKB} KB)\n`);
  }

  const totalOptKB = generated.reduce((s, g) => s + g.outKB, 0);

  photoMap.set(cfg.src, { generated, sizesAttr: cfg.sizesAttr, lazy: cfg.lazy, origW, origH });

  reportRows.push({
    type:       'photo',
    original:   cfg.src,
    origFormat: path.extname(cfg.src).slice(1).toUpperCase(),
    origKB,
    origW,
    origH,
    generated,
    totalOptKB,
    largestOutKB: generated[0].outKB,
    savePct: Math.round((1 - generated[0].outKB / origKB) * 100),
  });
}

// ─── Phase 2: Convert icons to WebP ───────────────────────────────────────────

console.log('\n━━━ Phase 2 / 4 : Converting icons to WebP ━━━\n');

// iconMap key = root-relative src → root-relative webp path
const iconMap = new Map();

for (const iconSrc of ICON_SRCS) {
  const srcAbs = path.join(ROOT, iconSrc);
  if (!existsSync(srcAbs)) {
    console.warn(`  ⚠  Missing, skipped: ${iconSrc}`);
    continue;
  }

  const meta    = await sharp(srcAbs).metadata();
  const origKB  = await getKB(srcAbs);
  const stem    = path.basename(iconSrc, path.extname(iconSrc));
  const iconDir = path.dirname(srcAbs);
  const dirRel  = path.dirname(iconSrc).replace(/\\/g, '/');

  // Cap at 128 px (2× the 56 px display size)
  const targetW = Math.min(meta.width, 128);
  const fname   = `${stem}.webp`;
  const absOut  = path.join(iconDir, fname);
  const relSrc  = `${dirRel}/${fname}`;

  await sharp(srcAbs)
    .resize(targetW, null, { withoutEnlargement: true, kernel: 'lanczos3' })
    .webp({ quality: 90, effort: 4 })
    .toFile(absOut);

  const outKB = await getKB(absOut);
  iconMap.set(iconSrc, relSrc);

  process.stdout.write(`  ${path.basename(iconSrc)} → ${fname}  ${origKB} KB → ${outKB} KB\n`);

  reportRows.push({
    type:         'icon',
    original:     iconSrc,
    origFormat:   'PNG',
    origKB,
    origW:        meta.width,
    origH:        meta.height,
    generated:    [{ w: targetW, relSrc, outKB }],
    totalOptKB:   outKB,
    largestOutKB: outKB,
    savePct:      Math.round((1 - outKB / origKB) * 100),
  });
}

// ─── Phase 3: Update HTML ──────────────────────────────────────────────────────

console.log('\n━━━ Phase 3 / 4 : Updating HTML files ━━━\n');

let htmlUpdated   = 0;
let imgsReplaced  = 0;

for await (const htmlFile of walkHtml(ROOT)) {
  let html    = await readFile(htmlFile, 'utf8');
  let changed = false;

  // Returns the correct relative path from this HTML file to a root-relative resource
  const toHtmlRel = (rootRelPath) => {
    const abs = path.join(ROOT, rootRelPath);
    return path.relative(path.dirname(htmlFile), abs).replace(/\\/g, '/');
  };

  // ── Pass A: photographs → <picture> with srcset ──
  html = html.replace(/<img\b[^>]*?>/gi, (imgTag) => {
    const src = getAttr(imgTag, 'src');
    if (!src) return imgTag;

    const key = normSrc(src);
    const cfg = photoMap.get(key);
    if (!cfg) return imgTag; // not one of our photos

    const { generated, sizesAttr, lazy, origW, origH } = cfg;
    const largest = generated[0]; // configs are sorted largest-first
    const dispH   = Math.round(largest.w * (origH / origW));

    // Collect existing attributes to preserve
    const altVal   = getAttr(imgTag, 'alt');
    const classVal = getAttr(imgTag, 'class');
    const styleVal = getAttr(imgTag, 'style');

    const srcset  = generated.map(g => `${toHtmlRel(g.relSrc)} ${g.w}w`).join(', ');
    const fallSrc = toHtmlRel(largest.relSrc);

    let imgAttrs = `src="${fallSrc}"`;
    if (altVal   !== null) imgAttrs += ` alt="${altVal}"`;
    if (classVal !== null) imgAttrs += ` class="${classVal}"`;
    if (styleVal !== null) imgAttrs += ` style="${styleVal}"`;
    imgAttrs += ` width="${largest.w}" height="${dispH}"`;
    if (lazy) imgAttrs += ` loading="lazy"`;

    changed = true;
    imgsReplaced++;

    // Detect original indentation (leading whitespace on the img line)
    return [
      `<picture>`,
      `  <source type="image/webp" srcset="${srcset}" sizes="${sizesAttr}" />`,
      `  <img ${imgAttrs} />`,
      `</picture>`,
    ].join('\n');
  });

  // ── Pass B: icons → just swap src to .webp (no picture wrapper needed) ──
  html = html.replace(/<img\b[^>]*?>/gi, (imgTag) => {
    const src = getAttr(imgTag, 'src');
    if (!src) return imgTag;

    const key     = normSrc(src);
    const webpRel = iconMap.get(key);
    if (!webpRel) return imgTag;

    const newSrc = toHtmlRel(webpRel);
    changed = true;
    imgsReplaced++;
    return imgTag.replace(/\bsrc="[^"]*"/, `src="${newSrc}"`);
  });

  if (changed) {
    await writeFile(htmlFile, html, 'utf8');
    htmlUpdated++;
    console.log(`  Updated: ${path.relative(ROOT, htmlFile).replace(/\\/g, '/')}`);
  }
}

// ─── Phase 4: Delete original JPG / PNG files ─────────────────────────────────

console.log('\n━━━ Phase 4 / 4 : Removing originals ━━━\n');

const toDelete = [
  ...PHOTOS.map(cfg => path.join(ROOT, cfg.src)),
  ...ICON_SRCS.map(s => path.join(ROOT, s)),
].filter(p => existsSync(p));

for (const p of toDelete) {
  await unlink(p);
  console.log(`  Deleted: ${path.relative(ROOT, p).replace(/\\/g, '/')}`);
}

// ─── Report ───────────────────────────────────────────────────────────────────

console.log('\n\n╔══════════════════════════════════════════════════════╗');
console.log('║           IMAGE OPTIMIZATION REPORT                 ║');
console.log('╚══════════════════════════════════════════════════════╝\n');

let grandOrig = 0, grandOpt = 0;

for (const row of reportRows) {
  grandOrig += row.origKB;
  grandOpt  += row.largestOutKB; // count only the largest (desktop) variant per image
  const badge  = row.savePct > 0 ? `✅ -${row.savePct}%` : `⚠️  +${Math.abs(row.savePct)}%`;
  const widths = row.generated.map(g => `${g.w}w`).join(', ');
  console.log(`${row.original}`);
  console.log(`  Original  : ${row.origFormat}  ${row.origKB} KB  (${row.origW}×${row.origH})`);
  if (row.type === 'photo' && row.generated.length > 1) {
    for (const g of row.generated) {
      console.log(`  Variant   : ${g.relSrc}  ${g.outKB} KB`);
    }
    console.log(`  Largest   : ${row.largestOutKB} KB  ${badge}`);
  } else {
    console.log(`  Output    : ${row.generated[0].relSrc}  ${row.largestOutKB} KB  ${badge}`);
  }
  console.log();
}

const overallSavePct = Math.round((1 - grandOpt / grandOrig) * 100);
console.log('──────────────────────────────────────────────────────');
console.log(`  Images processed     : ${reportRows.length}`);
console.log(`  HTML files updated   : ${htmlUpdated}`);
console.log(`  Image tags replaced  : ${imgsReplaced}`);
console.log(`  Original total       : ${Math.round(grandOrig)} KB  (${(grandOrig/1024).toFixed(1)} MB)`);
console.log(`  Optimized total      : ${Math.round(grandOpt)} KB  (${(grandOpt/1024).toFixed(1)} MB)`);
console.log(`  Total saved          : ${Math.round(grandOrig - grandOpt)} KB  (-${overallSavePct}%)`);
console.log(`  Note: "Optimized" = largest variant per image (desktop). Mobile users`);
console.log(`        download the smaller variants — savings are even greater.`);
console.log('──────────────────────────────────────────────────────\n');

// ─── Markdown report ──────────────────────────────────────────────────────────

const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

let md = `# Image Optimization Report\n\n`;
md += `_Generated: ${now}_\n\n`;
md += `## Summary\n\n`;
md += `| Metric | Value |\n`;
md += `|--------|-------|\n`;
md += `| Images processed | ${reportRows.length} |\n`;
md += `| HTML files updated | ${htmlUpdated} |\n`;
md += `| Image tags replaced | ${imgsReplaced} |\n`;
md += `| Original total | ${Math.round(grandOrig)} KB (${(grandOrig/1024).toFixed(1)} MB) |\n`;
md += `| Optimized total (largest variant) | ${Math.round(grandOpt)} KB (${(grandOpt/1024).toFixed(1)} MB) |\n`;
md += `| Total saved | ${Math.round(grandOrig - grandOpt)} KB (**-${overallSavePct}%**) |\n\n`;
md += `> **Note:** "Optimized total" counts only the largest (desktop) WebP variant per image.\n`;
md += `> Mobile visitors downloading the 400 w or 480 w variants will see even greater savings.\n\n`;

md += `## Per-image breakdown\n\n`;
md += `| Original | Fmt | Original KB | WebP variants | Largest KB | Saving |\n`;
md += `|----------|-----|-------------|---------------|------------|--------|\n`;

for (const row of reportRows) {
  const variantList = row.generated
    .map(g => `\`${path.basename(g.relSrc)}\` (${g.outKB} KB)`)
    .join('<br>');
  const badge = row.savePct > 0
    ? `**-${row.savePct}%**`
    : `+${Math.abs(row.savePct)}%`;
  md += `| \`${row.original}\` | ${row.origFormat} | ${row.origKB} | ${variantList} | ${row.largestOutKB} | ${badge} |\n`;
}

md += `\n## What changed in HTML\n\n`;
md += `- All photograph \`<img>\` tags replaced with \`<picture>\` + \`<source type="image/webp" srcset="…" sizes="…">\` + inner \`<img>\`.\n`;
md += `- Icon \`<img>\` tags updated to reference \`.webp\` files (no \`<picture>\` wrapper needed).\n`;
md += `- \`loading="lazy"\` added to all non-hero images.\n`;
md += `- \`width\` and \`height\` attributes added to prevent layout shift (CLS).\n`;
md += `- Original JPG/PNG files deleted.\n`;

await writeFile(path.join(ROOT, 'image-optimization-report.md'), md, 'utf8');
console.log('Report saved → image-optimization-report.md\n');
