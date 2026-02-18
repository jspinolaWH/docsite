---
slug: delivery-plan-overview
title: Delivery Plan Overview
category: planning-strategy
order: 1
description: Executive summary of the 6-sprint delivery plan — 3 releases from March to May 2026, team, timeline, business value, and risk profile
related:
  - sprint-1-overview
  - sprint-2-overview
  - sprint-3-overview
  - sprint-4-overview
  - sprint-5-overview
  - sprint-6-overview
  - risk-and-dependencies
tags:
  - delivery
  - planning
  - releases
  - timeline
  - executive-summary
---

# Delivery Plan Overview

**Date:** February 18, 2026
**Timeline:** 6 Sprints = 3 Releases (March 2 – May 22, 2026)
**Sprint Duration:** 2 weeks each
**Team:** 4 Engineers (2 Frontend, 2 Backend)

---

## Business Value

We're delivering a flexible Product & Pricing system that eliminates catalog explosion and enables sophisticated pricing rules across customer types, zones, and service configurations.

| Outcome | Impact |
|---------|--------|
| Reduce product catalog by 80% | From ~500 down to ~100 products |
| Bulk price updates | Change all Rural prices by 10% in one click |
| Unlimited pricing conditions | Per product, per zone, per customer type, per R/D code |
| Compliance-ready | EWC codes, EU e-invoicing format |

---

## Delivery Strategy

> **Foundation → Catalog + Zones → Pricing Engine**
> Each release builds directly on the previous one.

The **MVP-split strategy** is the key design choice: Sprint 4 ships 7 MVP features, and Sprint 5 upgrades all 7 to their full implementations. This reduces risk by validating data models before building complex business logic on top of them.

AI-assisted development provides approximately 27% faster implementation — saving an estimated 580–747 hours across the full delivery.

---

## Release Overview

| Release | Sprints | Dates | What Ships |
|---------|---------|-------|------------|
| **Release 1** | 1–2 | March 2–27 | Categories, Waste Fractions, Zones (hardcoded), Pricing Units, Bill of Materials |
| **Release 2** | 3–4 | March 30–April 24 | Full Products CRUD, Map-based Zones, all product tabs (MVP) |
| **Release 3** | 5–6 | April 27–May 22 | Full pricing engine, conditional pricing, WH 2.0 integration |

---

## Sprint Timeline

```
Feb 24–28   Pre-Sprint setup (microservice, DB, CI/CD) ✅ confirmed
Mar  2–13   Sprint 1 — Categories, Waste Fractions, Pricing Units
Mar 16–27   Sprint 2 — Polish + Bill of Materials → RELEASE 1 (Mar 27) 🚀
Mar 30–10   Sprint 3 — Products CRUD + Map-based Zones
Apr 13–24   Sprint 4 — Product tabs (MVPs) + Pricing foundation → RELEASE 2 (Apr 24) 🚀
Apr 27– 8   Sprint 5 — FULL upgrades + Scheduled updates, Audit logs, Bulk editing
May 11–22   Sprint 6 — Conditional pricing + WH 2.0 integration → RELEASE 3 (May 22) 🎉
```

---

## Capacity & Buffers

Each sprint: 4 engineers × 2 weeks × ~30h = **~240h capacity** (~480h per release).

| Release | Estimated (AI-assisted) | Capacity | Buffer |
|---------|------------------------|----------|--------|
| Release 1 (Sprints 1–2) | 304–375h | 480h | **105–176h** |
| Release 2 (Sprints 3–4) | 328–425h | 480h | **55–152h** |
| Release 3 (Sprints 5–6) | 372–473h | 480h | **7–108h** |

Release 1's large buffer can carry forward to Release 2 if needed.

---

## Pre-Sprint Infrastructure Setup

**Week of Feb 24–28** (before Sprint 1 begins):

- New `product-pricing-service` microservice created
- PostgreSQL database provisioned
- CI/CD pipeline configured
- Service running in dev with health checks passing

**Status:** Approved and scheduled.

This eliminates the classic Week 1 blocker (engineers waiting on infrastructure) and adds an effective ~40h buffer to Sprint 1, allowing Product Categories to reach 100% completion in Sprint 1 rather than 70%.

---

## Key Architectural Decision: Geospatial

**Decision:** Use existing `geospatial-data-service` (formerly `address-location-service`) instead of setting up PostGIS.

| Aspect | Detail |
|--------|--------|
| Technology | MongoDB with geospatial queries |
| Benefit | No database extensions to configure |
| Risk reduction | Leverages a proven, in-production service |
| Impact | Simplifies Sprint 3 and Sprint 4 significantly |

---

## Risk Summary

| Risk | Status |
|------|--------|
| Infrastructure blocker (Week 1) | 🟢 Low — pre-setup confirmed |
| Geospatial setup complexity | 🟢 Low — using existing service |
| Sprint 4 complexity | 🟢 Low — MVP-split strategy |
| Small team vs timeline | 🟡 Medium — healthy buffers in Releases 1–2 |
| Pricing algorithm complexity | 🟡 Medium — starting with MVP in Sprint 4, FULL in Sprint 5 |

**Overall:** Reduced from 🟡 Medium to 🟢 Low for Releases 1–2.

---

## What's Deferred (Release 4+)

The following were explicitly out of scope for Releases 1–3:

- Product Bundles (significant complexity)
- Bulk Excel import/export (full version)
- Contract-level discounts
- Holiday pricing
- Emergency speed pricing
