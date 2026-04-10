# Dashboard

Dark, minimal dashboard overview page with Arabic RTL support.

## Stack

Next.js 16, React 19, TypeScript, Tailwind v4.

## Run

```bash
bun install
bun dev
```

Opens at `localhost:3000`.

## What's in it

- 6 stat cards with inline sparkbars (hand-coded SVG)
- Period selector (7d / 30d / 90d / 12mo) — swaps real data
- Orders table with sort and status filters
- Expandable sidebar with hand-coded SVG icons
- Full EN/AR toggle with proper RTL layout
- Mobile responsive

## Design decisions

Warm near-black (`#0f0f0e`) background. Single accent color (warm gold) used sparingly. Geist Sans for UI, Geist Mono for data, IBM Plex Sans Arabic for RTL. Six font sizes total, defined as CSS variables. Hairline borders. Subtle layered shadows. Custom easing curves. Mount animations in pure CSS.

## RTL

Real bidirectional support — logical CSS properties, mirrored sparkbars, zeroed letter-spacing for Arabic ligatures, translated labels, LTR-wrapped numbers.
