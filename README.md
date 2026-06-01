# WasteHero 2.0 — Pricing & Products Documentation Site

A React-based documentation platform for the WasteHero 2.0 system, focused on pricing models, product types, and waste fractions. Used to support development and stakeholder communication across sprints.

## What's Documented

- **Pricing Model** — how waste collection pricing is structured and calculated
- **Product Types** — the different product categories in WasteHero 2.0
- **Waste Fractions** — fraction definitions, mappings, and configuration
- **Sprint Plans** — delivery breakdown and progress for Sprints 1–6

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

## Adding Documentation

All docs live in `docs/` as markdown files with YAML frontmatter:

```yaml
---
slug: my-doc
title: My Document
category: concepts
order: 5
description: What this doc covers
tags:
  - pricing
---
```

Categories: `concepts` · `sprint-planning`

## Deployment

Pushes to `main` trigger automatic deployment via GitHub Actions. The live site is served from GitHub Pages under the `/docsite/` base path.
