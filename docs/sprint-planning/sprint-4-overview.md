---
slug: sprint-4-overview
title: Sprint 4 Overview
category: sprint-planning
order: 4
description: All remaining product tabs as MVPs plus Price Lists and Price Determination foundation — completing Release 2 (April 13-24)
related:
  - sprint-3-overview
  - sprint-5-overview
  - delivery-plan-overview
  - pricing-model-overview
tags:
  - sprint-4
  - products
  - price-lists
  - price-determination
  - mvp
  - release-2
---

# Sprint 4 Overview

**Dates:** April 13–24, 2026
**Release:** Release 2 — Product Catalog + Geospatial Zones (deploys April 24)
**Team:** 4 Engineers (2 Frontend, 2 Backend)

---

## Sprint Goals

Deliver all remaining product tabs as working MVPs and lay the data model foundation for the pricing engine. This sprint completes Release 2. Every feature here is intentionally MVP scope — the FULL upgrades arrive in Sprint 5. The strategy is to validate the data model end-to-end before building complex business logic on top of it.

---

## Deliverables

All features below are **MVP scope** — functional and usable, but simplified. Full implementations are delivered in Sprint 5.

| Feature | MVP Scope |
|---------|-----------|
| **Service Responsibility tab** | Basic enum dropdown: Municipal, TSV, Market-based |
| **Additional Services tab** | 2 service types: automatic and manual |
| **Service Levels tab** | Standard + Express with simple pricing |
| **Price Components** | 3 fixed components: base, transport, treatment |
| **Wastewater** | Sewer connection flag (checkbox only) |
| **Price Lists** | Create / edit / delete price list entities |
| **Price Determination** | Data model + schema foundation (no matching algorithm yet) |

### Service Responsibility (PD-35 MVP)
A simple dropdown assigning the legal/financial framework for the service: Municipal, TSV, or Market-based. Whether this drives pricing (Option B) or stays as metadata (Option A) is a decision still pending — see Open Questions.

### Service Levels (PD-37 MVP)
Standard and Express service levels with simple price differentials. The Emergency level and complex rule configuration come in Sprint 5.

### Price Lists (PD-330 MVP)
Full CRUD for price list entities — create, edit, and delete price lists. Assignment logic (linking a price list to customers or contracts) and effective dates are Sprint 5 work.

### Price Determination (PD-322 MVP)
The data model and schema for price determination rows are established. The actual matching algorithm and the rules engine UI are built in Sprint 5.

---

## Timeline

| Week | Dates | Focus |
|------|-------|-------|
| Week 1 | April 13–17 | Service Responsibility, Additional Services, Service Levels, Price Components |
| Week 2 | April 20–24 | Wastewater, Price Lists, Price Determination data model, integration + testing |

**Deploy Date:** April 24, 2026 🚀

---

## Ticket Mapping

| Ticket | Scope | Estimate | Description |
|--------|-------|----------|-------------|
| PD-35 MVP | Service Responsibility | 29–37h | Basic enum dropdown |
| PD-38 MVP | Additional Services | 26–33h | 2 service types (automatic + manual) |
| PD-37 MVP | Service Levels | 22–29h | Standard + Express |
| PD-327 MVP | Price Components | 26–33h | 3 fixed components |
| PD-353 MVP | Wastewater | 13–16h | Sewer connection flag only |
| PD-330 MVP | Price Lists | 51–66h | CRUD only |
| PD-322 MVP | Price Determination | 44–51h | Data model foundation |

**Sprint 4 total estimate:** ~211–265h (AI-assisted) | **Capacity:** 240h

---

## Business Impact

After Release 2 deploys on April 24:

- Complete product catalog is operational — all product tabs working
- Map-based zones enable location-based pricing (from Sprint 3)
- Basic pricing structure is in place for Sprint 5 to build on

---

## Success Criteria

- ✅ Admin creates product "Mixed Waste Collection"
- ✅ Admin adds bill of materials: rental + collection = total
- ✅ Admin configures service levels (Express adds €40)
- ✅ Admin draws a zone on the map (polygon with 5–10 points)
- ✅ System detects property zone from coordinates via `geospatial-data-service`
- ✅ All product tabs working
- ✅ 0 P0 bugs, fewer than 10 P1 bugs
- ✅ **Deployed to production**

---

## Open Questions

> **Service Responsibility (PD-35):** Is this metadata only (Option A — ~2 weeks work) or a pricing condition (Option B — ~4 weeks work)? Decision was needed by March 6. The answer directly determines the Sprint 5 FULL upgrade scope for PD-35.

---

## Notes

Sprint 4 is deliberately MVP-heavy. Getting all product tabs working end-to-end in Release 2 validates the complete data model. Sprint 5 then upgrades each MVP to its full implementation, knowing the schema is solid. This is lower risk than building the full implementation first and discovering model issues late.
