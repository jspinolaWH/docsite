---
slug: sprint-1-overview
title: Sprint 1 Overview
category: sprint-planning
order: 1
description: Foundation sprint — Product Categories, Waste Fractions, hardcoded Zones, and Pricing Units (March 2-13)
designPreview: /docsite/design/sprint-1/index.html
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
---

# Sprint 1 Overview

**Dates:** March 2–13, 2026
**Release:** Release 1 — Foundation & Reference Data
**Team:** 4 Engineers (2 Frontend, 2 Backend)

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

### Product Categories
Admins can create and manage product categories with dynamic schemas — the structure that defines what fields a product in that category will have. This drives the dynamic forms used in Sprint 3 when Products CRUD is built.

### Waste Fractions
Create and manage waste fractions linked to EWC codes. EWC code format validation (8-digit) is included. Full EWC validation with complete rules completes in Sprint 2.

### Zones (Hardcoded)
Three hardcoded zones — Urban, Suburban, Rural — are viewable. This gives the team a working zone model to design against. Full map-based zone drawing with geospatial queries comes in Sprint 3.

### Pricing Units
All 6 unit types are ready:

| Unit | Use Case |
|------|----------|
| €/piece | Per collection or per service event |
| €/kg or €/ton | Weight-based pricing |
| €/m³ | Volume-based pricing |
| €/liter | Liquid waste |
| €/meter | Distance-based services |
| €/hour | Time-based services (e.g. audits) |

---

## Timeline

| Week | Dates | Focus |
|------|-------|-------|
| Week 1 | March 2–6 | Categories backend, Waste Fractions backend, EWC format validation |
| Week 2 | March 9–13 | Frontends, Pricing Units, hardcoded Zones, integration |

---

## Ticket Mapping

| Ticket | Scope | Estimate | Description |
|--------|-------|----------|-------------|
| PD-39 FULL | Categories + Waste Fractions | 88–102h | Core reference data with EWC codes |
| PD-325 MVP | Zones | 29–37h | 3 hardcoded zones, list view only |
| PD-326 FULL | Pricing Units | 41–53h | Weight/volume pricing and unit types |
| PD-41 MVP | Products (starts) | 73–95h | Basic product list + filters — continues in Sprint 2 |

**Sprint 1 total estimate:** ~231–287h (AI-assisted) | **Capacity:** 240h

---

## Dependencies

- **Infrastructure pre-setup (Feb 24–28):** `product-pricing-service` microservice, PostgreSQL database, and CI/CD pipeline are set up the week before Sprint 1. Status: approved and scheduled.
- No external service dependencies in this sprint.

---

## Open Questions

> **EWC Code Validation (PD-39):** Current plan is format validation only (8-digit format check). Confirm: is this sufficient, or do we need validation against the official EU EWC registry? Registry integration adds significant scope.

> **Default Weights (PD-34):** Marked "Low" priority but developer flagged as larger than expected. Re-estimate after a technical spike on March 6.

---

## Notes

Sprint 1 benefits significantly from the pre-sprint infrastructure setup. The new microservice, database, and CI/CD being ready on Day 1 adds an effective ~40h buffer and allows Categories to reach 100% completion this sprint rather than 70%.

---

## Design

Interactive prototype of all Sprint 1 screens. Use the sidebar to switch between screens and click buttons to open modals.
