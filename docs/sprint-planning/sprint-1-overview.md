---
slug: sprint-1-overview
title: Sprint 1 Overview
category: sprint-planning
order: 1
description: Foundation sprint — Product Categories, Waste Fractions, hardcoded Zones, and Pricing Units (March 2-13)
designPreview: "https://www.figma.com/make/S7W9vg4DIL2AtfwHhFi7ze/p-p-sprint-1?t=ITCXWOi3IlwJfL7X-0&preview-route=%2Fcategories"
related:
  - sprint-2-overview
  - delivery-plan-overview
  - waste-fractions-explained
tags:
  - sprint-1
  - categories
  - waste-fractions
  - pricing-units
  - foundation
  - PD-39
  - PD-325
  - PD-326
---

# Sprint 1 Overview

**Dates:** March 2–13, 2026
**Release:** Release 1 — Foundation & Reference Data
**Team:** 4 Engineers (2 Frontend, 2 Backend) + 1 Fullstack

---

## Sprint Goals

Establish the foundational reference data that everything else depends on: product categories with dynamic schemas, waste fractions with EWC codes, hardcoded zones, and all six pricing unit types. With infrastructure pre-set up the week before (Feb 24–28), engineers are productive from Day 1 with no Week 1 blocker.

---

## Deliverables

| Feature | Completion | Notes |
|---------|------------|-------|
| **Product Categories** | 100% | Create/edit/list categories with dynamic schemas |
| **Waste Fractions** | 90% | Create/edit fractions with EWC codes (full EWC validation in Sprint 2) |
| **Zones (hardcoded)** | 100% | View 3 hardcoded zones: Urban, Suburban, Rural |
| **Pricing Units** | 100% | 6 unit types ready |
| **Product Catalog (MVP)** | In Progress | Basic product list with filters and search |

---

## Feature Details

### Product Categories (PD-39 · 3.2.3)
Admins can create and manage product categories with configurable schemas — the structure that defines what fields a product in that category will have.

> ⚠️ **Client confirmation requested:** A business decision was made on how category schemas are structured. This should be confirmed with the client before closing out PD-39.

### Waste Fractions
Create and manage waste fractions linked to EWC codes. EWC code format validation is included. Full EWC validation with complete rules completes in Sprint 2.

> Note: Waste Fractions are not a direct PD requirement but are a dependency for PD-39.

### Zones — Hardcoded (PD-325 · 3.3.8)
Three hardcoded zones — Urban, Suburban, Rural — are viewable. Full map-based zone drawing comes in Release 2 (Sprint 3).

### Pricing Units (PD-326 · 3.3.7)
All 6 unit types are ready. The requirement does not include create or delete operations — only viewing the values is supported.

| Unit | Use Case |
|------|----------|
| Per piece | Per collection or per service event |
| Per kg / per ton | Weight-based pricing |
| Per m³ | Volume-based pricing |
| Per liter | Liquid waste |
| Per meter | Distance-based services |
| Per hour | Time-based services (e.g. audits) |

### Product Catalog — MVP (PD-41 · 3.2.1)
Basic product list with filters and search. MVP only — full CRUD completes in Sprint 2.

---

## Timeline

| Week | Dates | Focus |
|------|-------|-------|
| Week 1 | March 2–6 | Categories, Waste Fractions, EWC format validation |
| Week 2 | March 9–13 | Pricing Units, hardcoded Zones, Product Catalog MVP |

---

## Ticket Mapping

| Ticket | Scope | Estimate | Description |
|--------|-------|----------|-------------|
| PD-39 | Categories + Waste Fractions | 88–102h | Core reference data with EWC codes |
| PD-325 MVP | Zones | 29–37h | 3 hardcoded zones, list view only |
| PD-326 | Pricing Units | 41–53h | Weight/volume pricing and unit types (read-only) |
| PD-41 MVP | Product Catalog (starts) | 73–95h | Basic product list + filters — continues in Sprint 2 |

**Sprint 1 total estimate:** ~231–287h | **Capacity:** 240h

---

## Dependencies

- Infrastructure pre-setup (Feb 24–28): the product-pricing service, database, and deployment pipeline are set up the week before Sprint 1 starts. Status: approved and scheduled.
- No external service dependencies in this sprint.

---

## Definition of Done

- [ ] ERD reviewed and signed off by all engineers (see [Miro board](https://miro.com/app/board/uXjVGeP98ns=/?moveToWidget=3458764660960725214&cot=14))
- [ ] Categories: full CRUD working in UI
- [ ] Waste Fractions: full CRUD working in UI with EWC validation
- [ ] Zones: 3 zones visible in read-only list
- [ ] Pricing Units: 6 units visible and available for future forms
- [ ] Product Catalog MVP: list + filters working in UI
- [ ] 0 critical bugs, fewer than 3 high-priority bugs
- [ ] Demo-ready for Sprint Review on March 13

---

## Open Questions

> **EWC Code Validation (PD-39):** Current plan is format validation only. Confirm: is this sufficient, or do we need validation against the official EU EWC registry? Registry integration adds significant scope.

> **PD-39 Business Decision:** A decision was made on how category schemas are structured. Client confirmation needed before closing out.

> **Default Weights (PD-34):** Marked low priority but flagged as larger than expected. To be re-estimated on March 6.

---

## Notes

Sprint 1 benefits significantly from the pre-sprint infrastructure setup. The service, database, and deployment pipeline being ready on Day 1 adds an effective buffer and allows Categories to reach 100% completion this sprint.

---

## Design

Interactive prototype of all Sprint 1 screens embedded below.
