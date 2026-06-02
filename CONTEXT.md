# Andaman Agency — Context

A glossary of the project's domain language. Implementation details do not belong here.

## Terms

### Agency
A travel agency selling trips **exclusively to the Andaman & Nicobar Islands**. Not a pan-tropical or multi-destination operator. The single-destination scope is a deliberate brand decision — it lets the identity lean on Andaman-specific cues (the Andaman Sea's distinct green-blue, mangroves, Ross Island ruins, dive culture) rather than generic "tropical" stock imagery.

### Audience
The brand serves a **broad audience** — honeymooners, families, divers, adventurers — but is **not designed around any single segment**. It does not pander. Instead, it trusts the destination to do the qualifying work: the audience self-selects into trip types. Commercial center of gravity remains domestic Indian honeymooners and families, but no brand decision is made *for* them at the expense of others.

### Brand Name
**Islands Therapy.** An evocative, place-agnostic name. *Andaman* deliberately does not appear in the name — the namespace is saturated and matching domains are unavailable. The Andaman association is carried at the metadata, content, and lockup level (page titles, hero copy, alt text, the company's verbal one-liner). See [[ADR 0001]].

Implication: the visual system has to do the place-identification work the name does not. Photography and palette must say *Andaman* the moment a user lands. This is a higher bar than a descriptive name would have demanded, and it is load-bearing for everything downstream.

### Photography
Photography carries the place-identification work the name does not. Two tiers, sourced and filtered differently.

**Tier 1 — Website (hero, landing pages, trip pages, marketing surfaces): free stock only** (Unsplash / Pexels, with potential to upgrade to paid stock later). Every image passes all 5 intake filters before use:

1. **Light** — golden hour or diffused/overcast only. Reject 11am–3pm direct sun (tell: harsh short shadows directly under subjects).
2. **Faces** — *full faces, candid smiles, and direct eye contact are all allowed* under the warm-friendly personality. Posed-cheesy-stock smiles are still rejected — accept candid, natural expressions over posed ones. Families with kids, couples making eye contact with the camera, individual portraits all permitted. The brand wants to feel populated by real people, not deserted-editorial.
3. **Saturation** — reject anything where the turquoise is the loudest thing in frame. If a 10% desaturate + warm-shift fixes it, fix it. Otherwise reject.
4. **No drone-aerial hero shots.** Aerials are accent only (about, blog, "where we are" maps). This is the single highest-leverage differentiator from competitors.
5. **One specific detail in frame** — a shell, a tide line, footprints, condensation on a glass, a single oar. Prefer "small specific moment" over "wide tropical view" even when the wide shot is technically prettier. This rule couples photography to the voice rule (every paragraph names a specific detail).

**Tier 2 — Social media (Instagram, etc.): stock + UGC mixed.** UGC = past guests' phone photos of beaches, food, room interiors, scenery (never their faces without permission). UGC follows different rules:

- Always credit by first name + month ("*Anika · February*"). Caption acknowledges provenance.
- Reject UGC with guest faces unless written permission is on file.
- Allow noon-light UGC if subject is specific enough — the "real moment" reading offsets the cliché.
- Light-touch edit only (5% desat, warm-shift, crop). Don't over-process UGC into looking like stock — that destroys its trust value.
- Build a guest-photo pipeline: ask at trip-end, "Can we use 1–2 of your photos with credit?"

**UGC on the website is now allowed** under the warm-friendly personality — testimonial pages, "real trips" galleries, and trip recap blog posts welcome guest photos with credit. UGC still doesn't lead the homepage hero or top-of-funnel landing pages — stock holds those surfaces for consistent visual quality. Within the same Instagram carousel, stock and UGC can mix but UGC should be clearly captioned with guest credit.

### Typography
| Role | Family | Notes |
|---|---|---|
| Display / Headings / Wordmark | **Caveat Brush** (free, Google Fonts) | Hand-drawn brush script. Used for the wordmark, hero headlines, section titles, pull-quotes. Carries the brand's "warm friendly handwritten" personality. The friend-talking-to-you voice lives here. |
| Body / UI | **Manrope** (free, Google Fonts) | All body copy, navigation, buttons, labels, captions, forms. Humanist-geometric, neutral enough to be the workhorse under the playful display, warm enough not to fight it. |

**Pairing rules:**
- Caveat Brush only at **40px and up**. Below that, the brush strokes get jagged and legibility collapses — drop to Manrope.
- Manrope handles every piece of UI text — nav, buttons, body, forms, prices, dates. Caveat Brush *never* appears in interactive elements.
- Generous line-height on body (`1.7`).
- Caveat Brush has only one weight — work with its natural character rather than fighting it. Don't try to make it bold (CSS-bolden it) or condense it — the result looks broken.
- No italics needed — Caveat Brush is *already* slanted/handwritten. The Summer Sun accent color is used for one emphasized word per headline (color, not italic).
- Never mix in a third display typeface. The pair is the system.

**Trade-offs knowingly accepted:**
- Caveat Brush reads less premium than Recoleta or any serif would. Honeymoon-luxury buyers may bounce. Commercial position is mid-market, not luxury — see Brand Personality.
- Brush scripts can look "wedding card / craft fair" if mishandled. Discipline: keep Caveat Brush sentences *short*, give them generous whitespace, never use them for paragraphs, and let the marigold accent color do the emphasis work that italics would normally do.
- Both fonts are **free** (Google Fonts). Zero ongoing licensing cost. This was a deliberate cost-driven swap from the originally-considered Recoleta.

### Voice & Tone
**Voice: A friend who lives in the Andamans, texting you back.** First-person singular when the moment is personal ("I'll meet you at the jetty — I'll be the one in the green cap"). First-person plural for "the team" ("we packed an extra towel because the spray on the morning boat is real"). Casual, candid, lightly funny when the moment allows.

**The non-negotiable rule (carried over from the earlier voice — still load-bearing):** *Every paragraph names a specific place, time, or sensory detail.* Not "the beaches are pristine" — "Radhanagar at 4pm, when the day-trippers leave and the light shifts." Specificity is what makes a friendly voice *trustworthy* rather than just chatty. Without this rule the brand collapses into generic-cheerful.

**Allowed under new personality:**
- **Exclamation marks** — rationed (max one per page, save them for real surprises: "the lemonade at Anju's stall is genuinely cold!"). Not vetoed but not free.
- **Contractions** — "we'll," "you'll," "don't," "can't." Required, in fact — anything without them sounds stiff.
- **Light humor and self-aware asides** — "yes, we know everyone says 'turquoise water.' Wait until you see it."
- **Direct second person** — "you'll want a windbreaker for the 6am boat." Talking *to* the reader, not *about* the place.

**Still off-brand:**
- Travel clichés: "paradise," "tropical paradise," "unforgettable," "your dream vacation," "escape," "experience the magic." Same hard ban as before — friendliness ≠ cliché.
- Emoji vomit, hashtag-stuffed sentences, all-caps shouting.
- Faux-spiritual or faux-luxury voice ("indulge in the serenity of the islands"). The brand is your friend, not a spa brochure.
- Long lyrical sentences. Keep it talky — short, punchy, real.

**Modulation by context:**
- *Hero copy / homepage:* one or two warm sentences. Sounds like the start of a text message.
- *Trip pages / itineraries:* fact-rich and chatty. Times, distances, what's included, plus small asides ("the auto from the jetty is ₹200 — don't pay more, we'll send you the contact").
- *Booking flow / confirmations / receipts:* warmer than typical. "Your boat to Havelock leaves Phoenix Bay Jetty at 6:15am. Bring sunscreen and a windbreaker — the morning spray is real. We'll WhatsApp you the night before."
- *Blog:* first-person singular essays. Real stories, named guides, named beaches, real prices.
- *Social captions:* one sentence, one detail, one emoji at most.

### Color Palette
A 5-color system with strict roles. No color may take a second role without an explicit reason.

| Role | Hex | Name | Job |
|---|---|---|---|
| Primary | `#005F73` | Sky Blue | Logo, headings, primary brand surfaces. The color the brand "is." |
| Secondary | `#0A9396` | Teal Ocean | Supporting surfaces, secondary buttons, illustration fills. |
| Accent | `#EE9B00` | Summer Sun | CTAs, sale tags, highlights. Used sparingly — 5–10% of any screen max. |
| Surface | `#FFF9F4` | White Cloud | Page backgrounds, cards. Warm off-white, not pure white. |
| Text | `#0E2A33` | Deep Ink | Body text, captions, dense UI. Teal-tinted near-black — reads pure-dark, adds brand-coherent depth on close inspection. |

**Discipline notes:**
- Sky Blue and Teal Ocean are both teals separated mostly by lightness. Treat them as distinct *roles* (primary vs. secondary), never as interchangeable swatches — mixing them freely creates muddy compositions.
- Summer Sun is **marigold, not coral**. This pulls the brand a click warmer and more festively-Indian-coded than a coral accent would. Honeymoon-and-family domestic audience reads this as celebration/haldi warmth, which is on-strategy. International/luxury reads can tilt toward kitsch — neutralize with restraint in photography and copy, not by changing the color.
- Default Tailwind colors (indigo, blue, slate, etc.) are off-limits per `CLAUDE.md` anti-generic guardrails. Use only the five above.

### Logo Mark
**Concept: arc + dot — "sun rising over water."** Two soft horizontal arcs (the upper in Primary Sky Blue, the lower in Secondary Teal Ocean) under a single Summer Sun (marigold) dot. The mark does the place-identification work the wordmark cannot, pulls the marigold accent into the brand mark itself, and survives the 16–28px favicon test without identity fragmentation.

**Lockup:** mark sits to the left of the wordmark *Islands Therapy*, rendered in **Caveat Brush** (Primary Sky Blue, with *Therapy* in Summer Sun marigold for one-word emphasis — color, not italic, since Caveat Brush is already slanted). The geometric mark + handwritten wordmark creates a "considered but casual" combo (reference: Patagonia's clean mark with hand-crafted text feel). Optional tagline "Andaman & Nicobar" sits beneath in Manrope, all-caps, wide tracking, in Secondary Teal Ocean.

**Do not:**
- Add a third arc, a palm leaf, a boat, or any pictorial element. The mark's discipline is what keeps it from going generic-tropical.
- Use the mark without the wordmark in marketing surfaces — only on favicon, app icon, social avatar, and embroidered/print uniform contexts where size demands it.
- Recolor the dot to anything other than Summer Sun. The marigold-on-teal contrast is the brand's most-recognizable visual signature.

### Logo Usage Rules

**Clearspace.** Minimum margin around the full lockup on all sides = the height of the marigold dot in the mark. Nothing — text, images, edges of containers, other logos — may enter this zone.

**Minimum size.**
- Mark + wordmark (horizontal lockup): 120px wide on screen, 25mm wide in print.
- Mark alone (favicon, avatar, app icon): 24px on screen, 8mm in print.
- Below these sizes, the Caveat Brush wordmark goes jagged and the mark's hairline arcs collapse — use the mark alone.

**Approved color variants.**
| Variant | Background | Wordmark | Mark arcs | Mark dot |
|---|---|---|---|---|
| Primary | White Cloud `#FFF9F4` | Sky Blue + Summer Sun emphasis | Sky Blue + Teal Ocean | Summer Sun |
| Reversed (dark teal) | Sky Blue `#005F73` | White Cloud + Summer Sun emphasis | White Cloud (both arcs) | Summer Sun |
| Reversed (ink) | Deep Ink `#0E2A33` | White Cloud + Summer Sun emphasis | White Cloud (both arcs) | Summer Sun |
| Mono (for emboss/print constraints) | any single-color surface | single-color | single-color | single-color (matches) |

**On-photo treatment.** Primary rule: photos used as logo backdrops are prepped with a darkening gradient overlay (linear gradient from `rgba(14,42,51,0.45)` at the logo edge fading to transparent). Logo sits in the reversed (White Cloud) variant directly on the gradient — no backplate. Fallback rule: when the gradient cannot be applied (third-party sites, press kits, partner co-branding, uncontrolled placements), use a White Cloud backplate at 90% opacity, rounded-rectangle, with internal padding equal to the clearspace value.

**Prohibited.**
- No stretching, squashing, skewing, or non-uniform scaling.
- No rotating the lockup or any element.
- No recoloring — the marigold dot stays Summer Sun in every variant, full stop. The dot is the most-recognizable visual signature.
- No drop-shadows, glows, outlines, embossing, beveling, or any effect.
- No separating the mark from the wordmark in marketing copy. The mark stands alone *only* in favicon/avatar/uniform-embroidery contexts where size demands it.
- No placing the logo on a Summer Sun background — marigold-on-marigold loses the dot entirely.
- No placing the logo over busy photography without the gradient overlay or backplate.
- No adding a tagline, byline, or extra text inside the lockup beyond the approved "Andaman & Nicobar" descriptor.

### Primary Visual World
**Turquoise lagoon & white sand** (Radhanagar, Havelock, Neil). This is the hero imagery world — the one that instantly identifies the brand as Andaman in the absence of the word "Andaman" in the name. Underwater/reef imagery serves as the secondary rotation. Mangrove interior, colonial history, and aerial/cartographic imagery are accent worlds — they appear in story, about, and editorial surfaces, never as the lead.

**Treatment caveat (load-bearing):** the lagoon visual is also the cliché every competitor uses. Differentiation comes from *how* it is shot and graded — golden-hour, slightly desaturated, atmospheric — not from avoiding the subject. High-noon, fully saturated Instagram-tropical treatment is off-brand.

### Brand Personality
**Warm, personal, straight-talking — like a friend who lives there.** The brand is a real person, not an institution. It writes as if it's texting a friend who just asked "should I go to Andaman?" — knowledgeable, candid, casually specific, lightly funny when the moment allows. Reference brands: Mailchimp's tone of voice, indie travel newsletters (Substack), family-run-resort branding.

This personality is the north star — every downstream decision (typography, copy voice, photography style, layout density) is tested against it. Cold austerity is off-brand. Premium-DTC mystique is off-brand. Anything that reads "institutional" or "corporate-tourism" is off-brand. The brand sounds like a person; if a sentence couldn't be said out loud in a casual conversation, rewrite it.

**Trade-off knowingly accepted:** this position reads less premium than a quietly-confident editorial brand would. Premium-honeymoon competitors with bigger budgets will look more elevated on first glance. We trade that for *distinctiveness in the Andaman agency landscape* (almost no competitor uses warm-handwritten branding) and for *commercial fit with mass-market domestic honeymoon & family bookings*, which is where the volume lives.
