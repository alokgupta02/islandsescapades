# Islands Escapades — Brand Guideline

*A travel agency for the Andaman & Nicobar Islands*

---

## 1. Brand at a glance

| | |
|---|---|
| **Name** | Islands Escapades |
| **Tagline (working — to revisit)** | Discover the Untouched Paradise of the Andaman Islands. |
| **Geographic descriptor** | Andaman & Nicobar |
| **What we are** | A travel agency selling trips exclusively to the Andaman & Nicobar Islands |
| **Who we serve** | A broad audience — honeymooners, families, divers, adventurers — anchored in domestic Indian travelers |
| **Personality** | Warm, personal, straight-talking — like a friend who lives there |
| **Display type** | Caveat Brush |
| **Body type** | Manrope |
| **Signature colors** | Sky Blue `#005F73` · Teal Ocean `#0A9396` · Summer Sun `#EE9B00` · White Cloud `#FFF9F4` · Deep Ink `#0E2A33` |
| **Mark** | Arc + dot — "sun rising over water" |

---

## 2. Brand essence

### Personality

**Warm, personal, straight-talking — like a friend who lives there.**

The brand is a real person, not an institution. It writes as if it's texting a friend who just asked *"should I go to Andaman?"* — knowledgeable, candid, casually specific, lightly funny when the moment allows.

**Reference brands:** Mailchimp's tone of voice, indie travel newsletters (Substack), family-run-resort branding.

This personality is the north star. Every downstream decision — typography, copy, photography, layout — is tested against it.

### What the brand is not

- **Not corporate-tourism.** Anything that reads "institutional" is off-brand.
- **Not premium-DTC mystique.** We're warm, not aloof.
- **Not cold-editorial.** Gallery-white minimalism is off-brand.
- **Not loud, exclamation-stuffed budget-tour energy.** Friendly ≠ shouty.

### Trade-offs knowingly accepted

This personality reads **less premium** than a quietly-confident editorial brand would. Premium-honeymoon competitors with bigger budgets will look more elevated at first glance. We trade that for two things:

1. **Distinctiveness in the Andaman agency landscape** — almost no competitor uses warm-handwritten branding.
2. **Commercial fit with mass-market domestic honeymoon and family bookings**, which is where the volume lives.

---

## 3. Name & wordmark

**Islands Escapades** — an evocative, place-agnostic name. The word *Andaman* deliberately does not appear in the name (the namespace is saturated, matching domains unavailable). The Andaman association is carried at the metadata, content, and lockup level — page titles, hero copy, alt text, the verbal one-liner.

**Visual identity must do the place-identification work the name does not.** This is load-bearing: the logo mark, color palette, and photography all carry "Andaman" because the wordmark won't.

The name's playful tilt (*Escapades*) is fully in personality: it sounds like a friend suggesting an idea, not an institution publishing a catalog.

→ See [ADR 0001](docs/adr/0001-descriptive-name-for-mass-market-brand.md) for the full naming rationale.

---

## 4. Logo system

### The mark

**Arc + dot — "sun rising over water."**

Two soft horizontal arcs under a single marigold dot:

- Upper arc: **Primary Sky Blue** `#005F73`
- Lower arc: **Secondary Teal Ocean** `#0A9396`
- Dot: **Summer Sun** `#EE9B00`

The mark does the place-identification work the wordmark cannot, pulls the marigold accent into the brand mark itself, and survives the 16–28px favicon test without identity fragmentation.

### Lockup

Mark sits to the **left** of the wordmark. Wordmark *Islands Escapades* is rendered in **Caveat Brush** — Primary Sky Blue, with *Escapades* in Summer Sun marigold for one-word emphasis.

The geometric mark + handwritten wordmark creates a "considered but casual" combo (reference feel: Patagonia's clean mark with hand-crafted text).

Optional tagline **"Andaman & Nicobar"** sits beneath in Manrope, all-caps, wide tracking, in Secondary Teal Ocean.

### Clearspace

Minimum margin around the full lockup on all sides = the height of the marigold dot in the mark. Nothing — text, images, container edges, other logos — enters this zone.

### Minimum size

| Asset | Screen | Print |
|---|---|---|
| Mark + wordmark (horizontal lockup) | 120px wide | 25mm wide |
| Mark alone (favicon, avatar, app icon) | 24px wide | 8mm wide |

Below these sizes, the Caveat Brush wordmark goes jagged and the mark's hairline arcs collapse — use the mark alone.

### Approved color variants

| Variant | Background | Wordmark | Mark arcs | Mark dot |
|---|---|---|---|---|
| Primary | White Cloud `#FFF9F4` | Sky Blue + Summer Sun emphasis | Sky Blue + Teal Ocean | Summer Sun |
| Reversed (dark teal) | Sky Blue `#005F73` | White Cloud + Summer Sun emphasis | White Cloud (both arcs) | Summer Sun |
| Reversed (ink) | Deep Ink `#0E2A33` | White Cloud + Summer Sun emphasis | White Cloud (both arcs) | Summer Sun |
| Mono (emboss / single-color print) | any single surface | single-color | single-color | single-color (matches) |

### On-photo treatment

**Primary rule:** photos used as logo backdrops are prepped with a darkening gradient overlay:

```css
background: linear-gradient(rgba(14,42,51,0.45), transparent);
```

The logo sits in the reversed (White Cloud) variant directly on the gradient — no backplate.

**Fallback rule:** when the gradient cannot be applied (third-party sites, press kits, partner co-branding, uncontrolled placements), use a White Cloud backplate at 90% opacity, rounded-rectangle, with internal padding equal to the clearspace value.

### Prohibited uses

- No stretching, squashing, skewing, or non-uniform scaling.
- No rotating the lockup or any element.
- No recoloring — **the marigold dot stays Summer Sun in every variant, full stop.** The dot is the most-recognizable visual signature.
- No drop-shadows, glows, outlines, embossing, beveling, or effects.
- No separating the mark from the wordmark in marketing copy. The mark stands alone *only* in favicon / avatar / uniform-embroidery contexts where size demands it.
- No placing the logo on a Summer Sun background — marigold-on-marigold loses the dot entirely.
- No placing the logo over busy photography without the gradient overlay or backplate.
- No adding a tagline, byline, or extra text inside the lockup beyond the approved "Andaman & Nicobar" descriptor.

---

## 5. Color palette

A 5-color system with strict roles. No color may take a second role without an explicit reason.

| Role | Hex | Name | Job |
|---|---|---|---|
| Primary | `#005F73` | Sky Blue | Logo, headings, primary brand surfaces. The color the brand "is." |
| Secondary | `#0A9396` | Teal Ocean | Supporting surfaces, secondary buttons, illustration fills. |
| Accent | `#EE9B00` | Summer Sun | CTAs, sale tags, highlights, the marigold mark dot. Used sparingly — 5–10% of any screen max. |
| Surface | `#FFF9F4` | White Cloud | Page backgrounds, cards. Warm off-white, not pure white. |
| Text | `#0E2A33` | Deep Ink | Body text, captions, dense UI. Teal-tinted near-black — reads pure-dark, adds brand-coherent depth on close inspection. |

### Discipline notes

- **Sky Blue and Teal Ocean are both teals**, separated mostly by lightness. Treat them as distinct *roles* (primary vs. secondary), never as interchangeable swatches — mixing them freely creates muddy compositions.
- **Summer Sun is marigold, not coral.** This pulls the brand a click warmer and more festively-Indian-coded. The honeymoon-and-family domestic audience reads this as celebration / haldi warmth, which is on-strategy. International / luxury reads can tilt toward kitsch — neutralize with restraint in photography and copy, not by changing the color.
- **Default Tailwind colors** (indigo, blue, slate, etc.) are off-limits. Use only the five above.

---

## 6. Typography

| Role | Family | Notes |
|---|---|---|
| Display / Headings / Wordmark | **Caveat Brush** (free, Google Fonts) | Hand-drawn brush script. Wordmark, hero headlines, section titles, pull-quotes. Carries the brand's warm-handwritten personality. The friend-talking-to-you voice lives here. |
| Body / UI | **Manrope** (free, Google Fonts) | All body, navigation, buttons, labels, captions, forms. Humanist-geometric, neutral enough to be the workhorse under the playful display, warm enough not to fight it. |

### Pairing rules

- **Caveat Brush only at 40px and up.** Below that, brush strokes get jagged and legibility collapses — drop to Manrope.
- **Manrope handles every piece of UI text** — nav, buttons, body, forms, prices, dates. Caveat Brush *never* appears in interactive elements.
- **Generous line-height on body** — `line-height: 1.7`.
- **Caveat Brush has only one weight.** Work with its natural character — don't CSS-bolden it, don't condense it, don't add letter-spacing tricks.
- **No italics.** Caveat Brush is already slanted. The Summer Sun accent color is used for one emphasized word per headline — color, not italic.
- **Never mix in a third display typeface.** The pair is the system.

### CDN links

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Manrope:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### Trade-offs knowingly accepted

- Caveat Brush reads less premium than a serif would. Honeymoon-luxury buyers may bounce. Our commercial position is mid-market, not luxury.
- Brush scripts can look "wedding card / craft fair" if mishandled. Discipline: keep Caveat Brush sentences *short*, give them generous whitespace, never use them for paragraphs, let the marigold accent color do the emphasis work that italics would normally do.
- Both fonts are free. Zero ongoing licensing cost.

---

## 7. Voice & tone

### Voice

**A friend who lives in the Andamans, texting you back.**

- **First-person singular** when the moment is personal — *"I'll meet you at the jetty — I'll be the one in the green cap."*
- **First-person plural** for "the team" — *"we packed an extra towel because the spray on the morning boat is real."*
- Casual, candid, lightly funny when the moment allows.

### The non-negotiable rule

**Every paragraph names a specific place, time, or sensory detail.**

> ❌ "The beaches are pristine."
> ✅ "Radhanagar at 4pm, when the day-trippers leave and the light shifts."

> ❌ "Great snorkeling."
> ✅ "The house reef off Elephant Beach, where the parrotfish school comes through around 10am."

Specificity is what makes a friendly voice *trustworthy* rather than just chatty. Without this rule the brand collapses into generic-cheerful.

### Allowed

- **Exclamation marks** — rationed. Max one per page. Save them for real surprises: *"the lemonade at Anju's stall is genuinely cold!"*
- **Contractions** — required. *"we'll," "you'll," "don't," "can't."* Anything without them sounds stiff.
- **Light humor and self-aware asides** — *"yes, we know everyone says 'turquoise water.' Wait until you see it."*
- **Direct second person** — *"you'll want a windbreaker for the 6am boat."*

### Off-brand

- **Travel clichés** — "paradise," "tropical paradise," "unforgettable," "your dream vacation," "escape," "experience the magic." Hard ban. Friendliness ≠ cliché.
- **Emoji vomit, hashtag-stuffed sentences, all-caps shouting.**
- **Faux-spiritual or faux-luxury voice** — *"indulge in the serenity of the islands."* The brand is your friend, not a spa brochure.
- **Long lyrical sentences.** Keep it talky — short, punchy, real.

### Modulation by context

| Surface | How the voice tightens or loosens |
|---|---|
| Hero / homepage | One or two warm sentences. Sounds like the start of a text message. |
| Trip pages / itineraries | Fact-rich and chatty. Times, distances, what's included, plus small asides (*"the auto from the jetty is ₹200 — don't pay more, we'll send you the contact"*). |
| Booking flow / confirmations | Warmer than typical. *"Your boat to Havelock leaves Phoenix Bay Jetty at 6:15am. Bring sunscreen and a windbreaker — the morning spray is real. We'll WhatsApp you the night before."* |
| Blog | First-person singular essays. Real stories, named guides, named beaches, real prices. |
| Social captions | One sentence, one detail, one emoji at most. |

---

## 8. Photography

Photography carries the place-identification work the name does not. Two tiers, sourced and filtered differently.

### Tier 1 — Website (hero, landing pages, trip pages, marketing)

**Free stock only** (Unsplash / Pexels; upgrade to paid stock later if needed). Every image passes **all 5 intake filters** before use:

1. **Light** — golden hour or diffused / overcast only. Reject 11am–3pm direct sun (tell: harsh short shadows directly under subjects).
2. **Faces** — full faces, candid smiles, and direct eye contact are *all allowed* under the warm-friendly personality. Posed-cheesy-stock smiles are still rejected — accept candid, natural expressions over posed ones. Families with kids, couples making eye contact with the camera, individual portraits all permitted. The brand wants to feel populated by real people, not deserted-editorial.
3. **Saturation** — reject anything where the turquoise is the loudest thing in frame. If a 10% desaturate + warm-shift fixes it, fix it. Otherwise reject.
4. **No drone-aerial hero shots.** Aerials are accent only (about, blog, "where we are" maps). This is the single highest-leverage differentiator from competitors.
5. **One specific detail in frame** — a shell, a tide line, footprints, condensation on a glass, a single oar. Prefer "small specific moment" over "wide tropical view" even when the wide shot is technically prettier. This rule couples photography to the voice rule (every paragraph names a specific detail).

### Tier 2 — Social media (Instagram, etc.)

**Stock + UGC mixed.** UGC = past guests' phone photos of beaches, food, room interiors, scenery. UGC rules:

- **Always credit by first name + month** — *"Anika · February."* Caption acknowledges provenance.
- **Reject UGC with guest faces** unless written permission is on file.
- **Allow noon-light UGC** if the subject is specific enough — the "real moment" reading offsets the cliché.
- **Light-touch edit only** (5% desat, warm-shift, crop). Don't over-process UGC into looking like stock — that destroys its trust value.
- **Build a guest-photo pipeline** — ask at trip-end: *"Can we use 1–2 of your photos with credit?"*

### UGC on the website

**Allowed** on testimonial pages, "real trips" galleries, and trip recap blog posts — with credit. UGC still doesn't lead the homepage hero or top-of-funnel landing pages; stock holds those surfaces for consistent visual quality.

### Primary visual world

**Turquoise lagoon & white sand** (Radhanagar, Havelock, Neil) — the hero imagery world. Underwater / reef imagery is the secondary rotation. Mangrove interior, colonial history, and aerial / cartographic imagery are accent worlds — they appear in story, about, and editorial surfaces, never as the lead.

**Treatment caveat (load-bearing):** the lagoon visual is also the cliché every competitor uses. Differentiation comes from *how* it is shot and graded — golden-hour, slightly desaturated, atmospheric — not from avoiding the subject. High-noon, fully saturated Instagram-tropical treatment is off-brand.

---

## 9. Quick reference cheatsheet

### Before you ship anything, check

- [ ] Headline / wordmark is **Caveat Brush ≥ 40px**.
- [ ] Body / UI text is **Manrope**.
- [ ] Colors come from the **5-color palette** only. No default Tailwind hues.
- [ ] Marigold accent is used **sparingly** — 5–10% of any screen.
- [ ] Copy uses **contractions**, names a **specific detail per paragraph**, contains **zero travel clichés**.
- [ ] Photos pass **all 5 filters** (light · faces · saturation · no-drone-hero · specific detail).
- [ ] Logo is shown with proper **clearspace** = height of the marigold dot.
- [ ] Logo on photo has **darkening gradient overlay** (preferred) or **White Cloud backplate** (fallback).
- [ ] No exclamation marks beyond one per page.
- [ ] No emoji vomit, no hashtag-stuffed sentences, no all-caps shouting.

### Decisions documented elsewhere

- **Naming rationale and trade-offs** → [docs/adr/0001-descriptive-name-for-mass-market-brand.md](docs/adr/0001-descriptive-name-for-mass-market-brand.md)
- **Live glossary of brand terms** → [CONTEXT.md](CONTEXT.md)
