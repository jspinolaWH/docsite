---
slug: sprint-2-overview
title: Sprint 2 Overview
category: sprint-planning
order: 2
description: Polish sprint completing Release 1 — full EWC validation, schema config view, EU e-invoicing, and Bill of Materials. Deploys March 27.
related:
  - sprint-1-overview
  - sprint-3-overview
  - delivery-plan-overview
tags:
  - sprint-2
  - release-1
  - ewc
  - bill-of-materials
  - compliance
---

# Sprint 2 Overview

**Dates:** March 16–27, 2026
**Release:** Release 1 — Foundation & Reference Data (deploys March 27)
**Team:** 4 Engineers (2 Frontend, 2 Backend)

---

## Sprint Goals

Polish and complete all Release 1 features to production-ready quality. Every feature from Sprint 1 is brought to 100%, fully tested, localized, and ready for deployment. Key additions this sprint: full EWC validation, schema configuration view, EU e-invoicing compliance for pricing units, and Bill of Materials.

---

## Deliverables

| Feature | Notes |
|---------|-------|
| **Categories — schema config view** | Fully working configuration UI for dynamic field schemas |
| **Waste Fractions — full EWC validation** | Complete format and rule validation |
| **Pricing Units — EU e-invoicing** | Unit conversions + EU e-invoicing compliance metadata |
| **Bill of Materials** | Rental + collection components = computed total |
| **All Release 1 features** | Tested, localized, production-ready |

### Bill of Materials (PD-40)
Admins can compose a product price from multiple cost components. Example:

```
Rental:      €20
Collection:  €30
─────────────────
Total:       €50
```

This lays the foundation for how products expose their internal cost breakdown to downstream systems.

### EU E-Invoicing Compliance
Pricing units are aligned with EU e-invoicing standards. Unit conversions are supported (e.g. kg ↔ ton), ensuring correct unit representation on invoices.

---

## Timeline

| Week | Dates | Focus |
|------|-------|-------|
| Week 1 | March 16–20 | Bill of Materials, complete EWC validation, schema configuration view |
| Week 2 | March 23–27 | EU e-invoicing, unit conversions, localization, testing, deploy prep |

**Deploy Date:** March 27, 2026 🚀

---

## Ticket Mapping

| Ticket | Scope | Estimate | Description |
|--------|-------|----------|-------------|
| PD-40 FULL | Bill of Materials | 73–88h | Multi-component pricing (rental + collection = total) |
| PD-41 MVP | Products basic | 73–95h | List, filters, basic search — completes here |
| PD-39 (wrap-up) | Waste Fractions full EWC | — | Remaining 10% from Sprint 1 |
| PD-326 (wrap-up) | EU e-invoicing | — | Unit conversions + compliance metadata |

---

## Business Impact

After Release 1 deploys on March 27:

- Admins can define product categories and manage waste classifications
- Foundational pricing units are ready for use across all products
- Compliance metadata (EWC codes, EU e-invoicing units) is in place
- Product list with basic search and filters is working

---

## Success Criteria

- ✅ Admin creates category "Waste Collection Services"
- ✅ Admin creates waste fraction "Mixed Waste" with EWC code "20 03 01"
- ✅ Admin views 3 zones (Urban, Suburban, Rural)
- ✅ All CRUD operations working end-to-end
- ✅ 0 P0 bugs, fewer than 5 P1 bugs
- ✅ **Deployed to production**

---

## Dependencies

> **Geospatial Service (needed for Sprint 3):** API documentation for `geospatial-data-service` (formerly `address-location-service`) must be received by end of this sprint (March 27) to unblock Sprint 3 zone work.
>
> **What's needed:** API endpoints, GeoJSON format spec, point-in-polygon endpoint details, test environment access, contact person.
