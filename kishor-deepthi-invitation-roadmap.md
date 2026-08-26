# Kishor V & Deepthi V — Ring Ceremony Invitation Website
### Implementation roadmap for Antigravity (phase-by-phase)

> **How to use this file:** paste the "PROJECT BRIEF" section once at the start of a new Antigravity session so the agent has full context. Then paste each `## PHASE` section one at a time, in order, as separate instructions — wait for the agent to finish and verify a phase before pasting the next one.

---

## PROJECT BRIEF (paste this first, once)

Build a premium, highly animated digital **Ring Ceremony** invitation website for **Kishor V & Deepthi V**. This is a real invitation, not a portfolio template — it must feel like a luxury digital invitation: editorial, cinematic, emotional, restrained. The couple's photographs are the visual hero; there is no card-based "wedding template" aesthetic anywhere in this build.

**Reference for inspiration only** (do not copy code, layout, or text): `https://rishav-ranjeeta.invitationmedia.in/`. Recreate the *quality* of the experience, not the site itself.

### Event facts (do not invent anything beyond this)
- Couple: **Kishor V** & **Deepthi V**
- Event: **Ring Ceremony**
- Date: **September 6** — year intentionally unset; must remain a single config value, never hardcoded or guessed
- Venue: **Akshara Banquet & Lawns**, No. 5, GD Avenue, Kempapura Rd, Chikkabanavara, Bengaluru, Karnataka 560090 (sourced directly from the venue's own site, aksharabanquets.com)
- Maps deep link: `https://www.google.com/maps/search/?api=1&query=` + URL-encoded venue name + address (constructed, reliable — do not fabricate coordinates)
- Music: "Perfect" — Ed Sheeran. **Do not bundle the actual audio file.** Structure the player around `music.src` in config, currently `null`, so the user can drop in their own licensed file later.
- Photographs: not yet supplied. Every image in the site renders from a typed config slot with a graceful placeholder until real photos are added (Phase 6).

### Finalized creative direction

**Palette**
| Role | Name | Hex |
|---|---|---|
| Base | Ivory | `#FAF6EE` |
| Base alt | Champagne | `#F1E6D3` |
| Whisper accent | Blush | `#EFDCD3` |
| Accent | Gold | `#B8905A` |
| Accent deep | Brass | `#8C6A3F` |
| Text primary | Charcoal | `#2B2622` |
| Text soft | Taupe | `#6E6459` |

Gold/brass are line-weight and type accents only — never large fill areas.

**Typography**
- Display/names: `Cormorant Garamond` (serif) — loaded via Google Fonts `<link>` tags in `index.html` with `preconnect`, **not** a CSS `@import` (avoids render-order warnings and is faster).
- Body/UI/labels: `Jost`
- "Eyebrow" label style: uppercase, `letter-spacing: 0.28em`, small, gold-colored

**Motion**
- Library: Framer Motion
- Vocabulary: fade-up reveal, staggered text, scale reveal (images), slow Ken-Burns pan on hero (max ~6% scale, 10–14s), subtle scroll parallax
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` everywhere (soft decelerate) — no bounce, no elastic
- Rule of restraint: only one large moving element per viewport at a time
- Every animated component must consume a single shared `useReducedMotion()` hook and fall back to plain opacity fades — implemented once, not re-checked per component

**Responsive**
- Mobile-first Tailwind (v4). Breakpoints: 375/390 base, 640, 768, 1024, 1280, 1536
- Fluid type via `clamp()` on all headings
- Every image sits in an aspect-ratio container with `object-fit: cover` and a per-image `objectPosition`/`focalPoint` field so crops don't cut faces
- Min 44×44px tap targets; iOS safe-area awareness on the floating music control

### Tech stack (already scaffolded)
React + TypeScript + Vite + Tailwind CSS v4 (via `@tailwindcss/vite`, **not** the old PostCSS config) + Framer Motion + Lucide icons + `clsx`/`tailwind-merge` for the `cn()` helper.

### Architecture

```
src/
  config/
    invitation.ts          ← single source of truth for ALL content
  components/
    gate/InvitationGate.tsx
    hero/Hero.tsx
    intro/CoupleIntro.tsx
    photostory/
      PhotoStory.tsx
      FullBleedImage.tsx
      ImageDuo.tsx
    details/EventDetails.tsx
    countdown/Countdown.tsx        ← Phase 5
      useCountdown.ts
    location/LocationSection.tsx   ← Phase 5
    music/MusicPlayer.tsx          ← Phase 5
      useAudioPlayer.ts
    final/FinalInvitation.tsx      ← Phase 5
    layout/Footer.tsx              ← Phase 5
    shared/
      SectionReveal.tsx     ← scroll-reveal wrapper (Framer Motion + reduced-motion aware)
      GoldDivider.tsx
      ImagePlaceholder.tsx  ← renders real <img> once config is populated, graceful placeholder until then
  hooks/
    useReducedMotion.ts
  lib/
    cn.ts
    dateUtils.ts            ← resolveEventDate() / getCountdownState(), both null-safe for the unset year
  App.tsx
```

`src/config/invitation.ts` is fully typed (`InvitationConfig` interface) and already contains: couple names, event title/day/month/year(null)/time(null), all section copy, music metadata, the resolved venue + maps URL, and empty image slots (`hero`, `intro`, `photoStory[]`, `final`) ready for Phase 6.

### Antigravity working rules (apply to every phase below)
1. Work one phase at a time. Do not start the next phase's tasks early.
2. After finishing a phase: run `npm run build` and `npm run lint`, actually load the dev server and inspect the UI, fix spacing/mobile/typography issues, then stop and report before continuing.
3. Don't generate files outside the structure above without a clear reason.
4. Don't rewrite working components unless a phase explicitly calls for it.
5. Keep every component modular and typed.
6. Never invent personal details about the couple, the venue, or the date/year. If information is missing, add a typed `null`-safe config field instead of guessing.
7. Respect `prefers-reduced-motion` in anything new that animates.

---

## CURRENT STATUS

Phases 2 and 3 are already built and verified (clean `npm run build` + `npm run lint`) in the attached project zip:
- **Phase 2 (foundation):** Vite/TS/Tailwind v4/Framer Motion scaffolded, design tokens in `src/index.css` `@theme`, full folder structure, `invitation.ts` config, fonts wired via `index.html`.
- **Phase 3 (core visual experience):** `InvitationGate`, `Hero`, `CoupleIntro`, `PhotoStory` (+ `FullBleedImage`, `ImageDuo`), `EventDetails` are built, wired into `App.tsx` in story order, using placeholder image slots.

Unpack the project zip as the starting point and begin from **Phase 4** below.

---

## PHASE 4 — Interaction & Motion

Refine and extend the motion layer on top of the existing Phase 3 components:

- [ ] Review `InvitationGate`'s open/close timing — confirm the stagger between eyebrow → names → divider → invite line → CTA reads well, adjust delays if rushed
- [ ] Add a subtle hover/active state to every tappable element (gate CTA, and any future buttons) — scale ~0.98 on active, no bounce
- [ ] Confirm `Hero`'s Ken-Burns scale + parallax `useTransform` feels slow and cinematic, not distracting, at common viewport heights (iPhone SE through desktop)
- [ ] Add a subtle stagger to `PhotoStory`'s `ImageDuo` children (already has a small delay — verify it reads intentionally, not like a bug)
- [ ] Add a thin scroll-progress indicator (optional, only if it doesn't compete with the music control for visual space)
- [ ] Verify `useReducedMotion()` actually disables parallax/scale/stagger everywhere and swaps to plain fades — test with the OS-level reduced-motion setting on
- [ ] Re-run build + lint; visually re-inspect gate → hero → intro → photo story → details flow end to end on mobile width and desktop width

Do not touch `EventDetails`' or `CoupleIntro`'s content/copy in this phase — motion only.

---

## PHASE 5 — Functional Features

Implement the remaining functional sections, each reading from `invitationConfig`:

### Countdown
- [ ] Build `useCountdown.ts` on top of the existing `getCountdownState()` in `lib/dateUtils.ts` (already handles `unconfirmed` / `upcoming` / `today` / `past` states — do not reimplement this logic, consume it)
- [ ] Build `Countdown.tsx`: real-time, updates every second, elegant number-roll transition per unit (Days/Hours/Minutes/Seconds)
- [ ] Render a clear "date to be confirmed" state when `event.year` is `null` — this is expected right now, not a bug
- [ ] Render a warm "celebrated" state if `status === "past"`

### Music player
- [ ] Build `useAudioPlayer.ts` wrapping the native `<audio>` element, reading `music.src` from config
- [ ] Build `MusicPlayer.tsx`: floating circular control, bottom-right, safe-area aware, play/pause with a visual "playing" pulse state
- [ ] Handle `music.src === null` gracefully (disabled/hidden state with a clear inline note — don't crash or show a broken player)
- [ ] Handle browser autoplay restrictions: attempt a muted/gesture-gated start, never force autoplay, fail silently into a paused state if blocked
- [ ] Mount `MusicPlayer` at the `App.tsx` level (persistent across all sections), fading in once the gate closes

### Location
- [ ] Build `LocationSection.tsx` using `location.venueName`, `location.address`, `location.mapsUrl` from config (already populated and verified)
- [ ] Primary CTA "View Location", secondary "Get Directions" — both open `location.mapsUrl`
- [ ] Style as an invitation element (card/frame consistent with the rest of the site), not a generic map embed

### Final invitation + footer
- [ ] Build `FinalInvitation.tsx` using `copy.finalHeadline` / `copy.finalSubline`
- [ ] Build minimal `Footer.tsx`: couple names + date, no links
- [ ] Wire `Countdown`, `LocationSection`, `FinalInvitation`, `Footer` into `App.tsx` after `EventDetails`, in that order

Run build + lint, test the countdown ticking live, test the music toggle, test the maps link, then stop and report.

---

## PHASE 6 — Image Integration

Only start this phase once real photographs are supplied.

- [ ] Inspect every supplied photograph (orientation, quality, composition)
- [ ] Choose the strongest single image for `images.hero` — needs to read well with light text overlaid at the bottom third
- [ ] Choose a supporting portrait for `images.intro`
- [ ] Curate (not chronologically order) the remaining photos into `images.photoStory[]` — assign by visual contrast and composition to match the existing full-bleed / duo / full-bleed / duo rhythm in `PhotoStory.tsx`
- [ ] Choose a closing image for `images.final`, if `FinalInvitation` uses one
- [ ] Set `focalPoint` per image where a default center crop would cut off a face
- [ ] Write real `alt` text per image (describe what's in the photo)
- [ ] Confirm lazy-loading is working (only `hero` should be eager/priority)
- [ ] Re-inspect the full page on mobile and desktop for cropping issues

---

## PHASE 7 — Polish

Professional design review pass across the whole site:

- [ ] Typography scale and rhythm consistency across all sections
- [ ] Spacing consistency (padding/margins) between sections
- [ ] Visual hierarchy check — is the date always immediately readable?
- [ ] Transition timing consistency site-wide
- [ ] Mobile responsiveness at 375/390/768/1024 widths
- [ ] Button/tap-target sizing
- [ ] Music control placement doesn't obstruct content or the countdown on small screens
- [ ] Countdown readability at small sizes
- [ ] Location CTA visual weight matches the rest of the site
- [ ] Remove anything that still feels generic or template-like
- [ ] Confirm the "year to be confirmed" and "date to be confirmed" states still look intentional, not broken, if the year remains unset at review time

---

## PHASE 8 — Final QA

- [ ] Desktop, mobile, tablet pass
- [ ] Countdown accuracy (including the unconfirmed-year state and the past-event state)
- [ ] Audio controls: play/pause, autoplay-restriction fallback
- [ ] Location link opens correctly
- [ ] Image loading (lazy-load behavior, no layout shift)
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Cross-browser check (Safari iOS in particular, since most guests will open this from WhatsApp on a phone)
- [ ] Accessibility: alt text present, contrast on text-over-image areas, keyboard reachability of the gate CTA and music control
- [ ] Performance: first screen (gate + hero) loads fast, no oversized images
- [ ] Final full read-through of all copy for typos

Only call the project complete after every item above is fixed, not just noted.
