# Islands Escapades

A multipage marketing website for **Islands Escapades** — a bespoke travel agency for the Andaman & Nicobar Islands, based in Port Blair.

Pure static HTML + CSS. No build step. No framework. No runtime dependencies.

---

## Stack

- **HTML5** — 7 pages, hand-written, semantic markup
- **CSS3** — one shared `styles.css` with design tokens via CSS custom properties
- **Vanilla JS** — minimal, only for the nav burger menu and the home-page carousels
- **Fonts** — [Caveat Brush](https://fonts.google.com/specimen/Caveat+Brush) (display) + [Manrope](https://fonts.google.com/specimen/Manrope) (body), both loaded from Google Fonts CDN
- **Imagery** — Unsplash via direct image CDN URLs

No npm dependencies are required to serve, deploy, or modify the site.

---

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, stats, about, packages carousel, destinations carousel, activities, why-us, CTA |
| `about.html` | About — story, values, stats, CTA |
| `packages.html` | All 7 trip packages with prices |
| `destinations.html` | All 8 destinations across the archipelago |
| `activities.html` | 10 activities (scuba, snorkelling, etc.) with starting prices |
| `blog.html` | Blog index — 6 travel guides |
| `contact.html` | Contact info + enquiry form |

A floating WhatsApp button is rendered on every page (bottom-right, fixed).

---

## Getting started

The site is static — open any HTML file in a browser, or serve the folder with any static server.

### Option A — Any static server (recommended)

```bash
# Python (built-in)
python -m http.server 3000

# Node
npx serve

# PHP
php -S localhost:3000
```

Then visit `http://localhost:3000`.

### Option B — Live Server (VS Code)

Install the **Live Server** extension, right-click `index.html`, choose *Open with Live Server*.

### Option C — Direct file open

Open `index.html` directly in a browser. Some features (the WhatsApp button, carousel) work fine; the Google Fonts CDN needs an internet connection.

---

## Project structure

```
.
├── index.html              # Homepage
├── about.html              # About page
├── packages.html           # Packages listing
├── destinations.html       # Destinations listing
├── activities.html         # Activities listing
├── blog.html               # Blog index
├── contact.html            # Contact page + form
├── styles.css              # Shared design system + components
├── brand_assets/           # Logo, palette references
│   └── ai.png              # Current logo (placeholder — see Customization)
├── docs/
│   └── adr/                # Architecture decisions
├── CLAUDE.md               # Project rules (for AI-assisted work)
├── CONTEXT.md              # Brand glossary
├── brand-guideline.md      # Full brand guideline (single source of truth)
└── README.md               # This file
```

---

## Customization

The most likely things you'll want to change before going live:

### 1. Logo
- Current: `brand_assets/ai.png` (a generic globe + airplane icon)
- Replace with the real logo at `brand_assets/ai.png` (keep the filename) or update every `<img src="brand_assets/ai.png">` reference across all 7 HTML files
- The brand-guideline.md specifies a custom **arc + dot ("sun rising over water")** mark — not yet implemented

### 2. Imagery
- All hero and card images load from `images.unsplash.com` URLs
- Replace each `<img src="https://images.unsplash.com/...">` with your own image URLs (real photos of Andaman from your guests, paid stock, or your photoshoots)
- Photography rules and filters are in [`brand-guideline.md`](brand-guideline.md) §8

### 3. Contact details
- Phone, email, address, working hours appear in:
  - Every page's footer
  - `contact.html`
  - The WhatsApp button's `href` (uses `+91 7067 920 938`)
- Search and replace these site-wide if any change

### 4. Copy
- Hero headline, package prices, blog dates, etc. are placeholder content from the reference site
- Review and update each page's text to match real, current offerings
- ⚠️ The current homepage tagline uses the word *"paradise"* which is **explicitly banned** by the locked brand voice in [`brand-guideline.md`](brand-guideline.md) §7. Decide whether to revise the tagline or update the voice rules

### 5. Form submission
- The contact form (`contact.html`) currently shows an `alert()` on submit — no backend wired up
- Hook to your preferred service: Formspree, Web3Forms, Netlify Forms, or a custom endpoint

---

## Brand guideline

The full brand identity — palette, typography, voice, photography rules, logo system — lives in [`brand-guideline.md`](brand-guideline.md).

Key tokens already wired into `styles.css`:

| Token | Hex | Role |
|---|---|---|
| `--primary` | `#005F73` | Sky Blue — logo, headings, primary surfaces |
| `--secondary` | `#0A9396` | Teal Ocean — supporting surfaces |
| `--accent` | `#EE9B00` | Summer Sun — CTAs, highlights, marigold mark |
| `--surface` | `#FFF9F4` | White Cloud — page backgrounds |
| `--ink` | `#0E2A33` | Deep Ink — body text |

Architecture decisions (e.g., why the brand is named *Islands Escapades* and not *Andaman Voyages*) live in [`docs/adr/`](docs/adr/).

---

## Deployment

Deploy as a static site to any host that serves HTML:

- **GitHub Pages** — push to `main`, enable Pages
- **Netlify / Vercel / Cloudflare Pages** — drop the folder in, no build command needed
- **Any web host with FTP/SFTP** — upload all tracked files

No environment variables. No secrets. No runtime.

---

## Known limitations

- Some Unsplash photo IDs may not load identically forever — verify imagery before launch
- The blog cards link to `#` placeholders — individual blog post pages aren't built
- Individual destination, package, and activity detail pages link to the listing pages (not detailed sub-pages)
- The contact form is not wired to a backend
- Mobile menu is a basic CSS toggle — no animation on open
- Logo is a placeholder; the brand-guideline-specified arc+dot mark is not yet implemented

---

## License

Proprietary — © Islands Escapades, 2026. All rights reserved.
