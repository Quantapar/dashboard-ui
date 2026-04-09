# Dashboard

A single dashboard overview page — stats and orders, dark and minimal, with full Arabic RTL support.

Built as a small demo for a frontend role. The brief asked for a control panel that feels handcrafted, not template-based. The references on the table were a dark dashboard (umcee), an editorial landing site (tailark), and a denser ops dashboard (Keitaro). I read those three as one ask: editorial taste applied to dashboard structure.

## Approach

Restraint over decoration. Every visual element earns its place.

- **Dark, warm near-black** (`#0f0f0e`) instead of pure black — feels less clinical
- **One signature accent** (warm gold, `#f5c97f`) used in two places only: the highlighted "today" bar in each sparkbar, and the focus state on the language toggle
- **Hairline borders** (`rgba(255,255,255,0.06)`) over heavy strokes
- **Subtle elevation** via a top-edge highlight gradient + a 3-layer black-on-dark shadow stack — depth without drama
- **6-size type scale** defined as CSS variables in `@theme inline`. No arbitrary `text-[Npx]` values
- **Tabular numerals** on every metric so digits don't jitter
- **Geist Sans + Geist Mono + IBM Plex Sans Arabic** — three fonts, each with one job

## Arabic RTL — done properly

This is real bidi support, not just `text-align: right`.

- `dir="rtl"` flips the entire layout via logical CSS properties (`text-start`/`text-end`, `border-s`, `marginInlineEnd`)
- The sparkbars mirror with `transform: scaleX(-1)` so the "today" bar always sits at the reading-end of the row
- Letter-spacing is zeroed in RTL because Arabic ligatures break under tracking
- `text-transform: none` because Arabic has no concept of case
- Numbers, IDs, and percentages stay LTR via explicit `dir="ltr"` wrappers
- Status names, column headers, and stat labels are translated, not just mirrored

## Features

- 6 stat cards with hand-coded SVG sparkbars (no chart library)
- Period selector that swaps mock data across 4 time ranges
- Orders table with status filter chips and row hover states
- Language toggle (English / عربي)
- Pure CSS mount stagger — runs off the main thread, no animation library
- `prefers-reduced-motion` support
- Mobile responsive — 1 / 2 / 3 column grid breakpoints, table hides metadata columns under 640px

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4 with custom theme tokens
- `next/font/google` for Geist + IBM Plex Arabic
- Zero component libraries, zero icon libraries, zero animation libraries

## Run locally

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).
