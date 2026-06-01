# WasteHero 2.0 — Pricing & Products Documentation Site

A React-based documentation platform covering the full scope of the WasteHero 2.0 Prices & Products domain — from core system concepts through sprint-by-sprint delivery planning, designer handoffs, PM sign-off, and live Jira tracking.

## What's on This Site

### Concepts
Core reference material explaining how the system is designed to work:

- **Pricing Model Overview** — how multi-condition price matching works, including zones, price lists, and dynamic surcharges
- **Product Types Explained** — the 5 product types (Service, Container, Additional Service, One-off Fee, Recurring Fee) and how they combine on agreements
- **Waste Fractions Explained** — the master reference data that drives waste classification, EWC codes, compliance reporting, and operational handling
- **Story Point Estimates** — estimation reference used across sprint planning

### Sprint Planning
Sprint-by-sprint breakdown of delivery across 6 sprints (Releases 1–3, March–May 2026):

- Sprint 1 — Categories, Waste Fractions, Pricing Units, Products (MVP)
- Sprint 2 — Products (continued), Zones, Bill of Materials
- Sprint 3 — Audit Logs, Bulk Editing, Pricing Engine
- Sprint 4 — Default Weights, Scheduled Updates, Agreement Integration
- Sprint 5 — Full upgrades and hardening
- Sprint 6 — Final feature completions and sign-off

### Designer Docs (Oliver)
Handoff documents for the design team:

- **Sprint 2 Designer Handoff** — screen-by-screen breakdown of Zones, Products, BOM, and Additional Services
- **Product Type Field Mapping** — complete field reference for all 5 product types, used for UI and API alignment

### Planning & Strategy
High-level delivery planning and risk management:

- **Delivery Plan Overview** — 6-sprint executive summary with team, timeline, and business value
- **Risks, Dependencies & Open Questions** — risk register and critical decisions needed before each release

### PM Sign-off
- **Release 1 Requirements Traceability** — maps every Release 1 deliverable back to its Jira story, confirming scope alignment

### Releases
- **Jira Status Updates** — live ticket status across Cycle 1 and Cycle 2 delivery

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

Categories: `concepts` · `sprint-planning` · `oliver-docs` · `planning-strategy` · `pm-signoff` · `releases`

## Deployment

Pushes to `main` trigger automatic deployment via GitHub Actions. The live site is served from GitHub Pages under the `/docsite/` base path.
