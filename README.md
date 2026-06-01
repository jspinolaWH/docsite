# WasteHero 2.0 — Pricing, Products & Invoicing Documentation

**Live site: https://jspinolawh.github.io/docsite/**

This site is used for scoping and understanding two key WasteHero 2.0 releases: the **Products & Pricing release** and the **Invoicing release**.

It brings together concept documentation, delivery planning, designer handoffs, and requirements traceability in one place — giving the product, design, and engineering teams a shared reference throughout the build.

## What's Covered

**Products & Pricing** — how pricing is structured and calculated, the product types available in the system, waste fraction reference data, and the field-level detail needed for UI and API design.

**Invoicing** — scoping documentation, mockups, and requirements traceability for the invoicing release, including how it connects to the pricing and products domain.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Routing | React Router 7 |
| Markdown | react-markdown + GFM |
| Search | Fuse.js |
| Deployment | GitHub Actions → GitHub Pages |

## Local Development

```bash
npm install
npm run dev
# http://localhost:5173/docsite/
```

```bash
npm run build    # production build
npm run preview  # preview build locally
```

## Deployment

Pushes to `main` trigger automatic deployment via GitHub Actions to GitHub Pages.
