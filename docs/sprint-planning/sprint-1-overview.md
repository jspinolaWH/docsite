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

### Product Categories
Admins can create and manage product categories with dynamic schemas — the structure that defines what fields a product in that category will have. This drives the dynamic forms used in Sprint 3 when Products CRUD is built.

### Waste Fractions
Create and manage waste fractions linked to EWC codes. EWC code format validation (6-digit pairs, e.g. `20 03 01`) is included. Full EWC validation with complete rules completes in Sprint 2.

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

## Ticket Breakdown

### Shared

#### ERD Design
**Assignee:** All engineers

Design the full database schema covering all 3 releases. Commit ERD to `/docs/erd/` before coding starts. All engineers must review and sign off.

**Tasks:**
- Design entity relationships for all R1 entities (categories, waste_fractions, pricing_units, zones)
- Include foreign key references for R2/R3 entities (products, price_lists, price_rows)
- Commit ERD diagram to repo

---

### Categories
**Assignees:** BE1, FE1

#### Categories: API Contract
**Assignee:** BE1 + FE1

**Tasks:**
- Agree on request/response shapes for all 5 CRUD endpoints
- Agree on error response format and status codes
- Agree on list pagination/filter query params (`status`, `type`, `search`)
- Agree on `schema_config` JSONB shape (field keys and their structure)
- Commit agreed contract to `/docs/api-contracts/categories.md`

---

#### Categories: BE
**Assignee:** BE1

**Tasks:**
- Create `categories` table migration
- Implement `Category` model with validations (`name` required, `type` enum, `status` default Active)
- Implement `schema_config` JSONB validation logic (valid keys: `waste_fraction`, `container_type`, `direction`, `ylva_code`, `product_group`, `weighbridge_enabled`)
- `POST /api/v1/categories`
- `GET /api/v1/categories` — with `status`, `type`, `search` filters
- `GET /api/v1/categories/:id`
- `PUT /api/v1/categories/:id`
- `DELETE /api/v1/categories/:id` — returns `409` if category has linked products
- Unit tests: model validations, schema_config logic
- Integration tests: all 5 endpoints (happy path + edge cases)

**Acceptance Criteria:**
- All migrations run cleanly (up + down)
- All 5 endpoints return correct HTTP status codes
- DELETE blocked with `409` if category is in use
- Test coverage ≥ 80%
- OpenAPI docs updated

---

#### Categories: FE
**Assignee:** FE1

**Tasks:**
- **Architecture setup (one-time):**
  - Feature folder structure following 4-layer pattern (`FormModel → ACL → API Client → Hooks/Components`)
  - Axios instance: base URL, auth interceptor, 401 redirect, global error toast
  - React Query client with defaults (staleTime, retry)
  - Routing skeleton + navigation tabs (`/product-catalog`)
  - Commit architecture guide to `/docs/react/feature-architecture.md`
- `CategoryFormModel` — canonical TypeScript types including `schema_config`
- `CategoryACL` — `toFormModel()` and `toApiPayload()` transformations
- `CategoryApiClient` — typed functions for all 5 CRUD operations (no `any`)
- `useCategories`, `useCreateCategory`, `useUpdateCategory`, `useDeleteCategory` hooks
- `CategoryTable` — Name, Type, Status, Schema Config summary, Edit/Delete actions
- `CategoryModal` — create/edit form; schema_config section with enabled/required toggles per field
- Delete confirmation dialog
- Skeleton loaders, error states, toast notifications
- Integration tests: create, edit, delete flows against dev API

**Acceptance Criteria:**
- Architecture documented and working before building UI
- Full CRUD works end-to-end against the dev API
- Modal closable with Escape, form validates before submit
- Empty state shown when no categories exist

---

### Waste Fractions
**Assignees:** BE2, FE2

#### Waste Fractions: API Contract
**Assignee:** BE2 + FE2

**Tasks:**
- Agree on request/response shapes for all 5 CRUD endpoints
- Agree on EWC code field format and client-side vs server-side validation split
- Agree on filter query params (`status`, `rd_code`, `hazardous`, `search`)
- Commit agreed contract to `/docs/api-contracts/waste-fractions.md`

---

#### Waste Fractions: BE
**Assignee:** BE2

**Tasks:**
- Create `waste_fractions` table migration
- Implement `WasteFraction` model with validations
- EWC code format validation: 6 digits in pairs separated by spaces (e.g. `20 03 01`) — format-only, no registry lookup
- `POST /api/v1/waste-fractions`
- `GET /api/v1/waste-fractions` — with `status`, `rd_code`, `hazardous`, `search` filters
- `GET /api/v1/waste-fractions/:id`
- `PUT /api/v1/waste-fractions/:id`
- `DELETE /api/v1/waste-fractions/:id` — returns `409` if fraction has linked products
- Unit tests: model validations, EWC format validation
- Integration tests: all 5 endpoints (happy path + edge cases)

**Acceptance Criteria:**
- Invalid EWC format rejected with descriptive 422 error
- DELETE blocked with `409` if fraction is in use
- Test coverage ≥ 80%
- OpenAPI docs updated

---

#### Waste Fractions: FE
**Assignee:** FE2

**Tasks:**
- `WasteFractionFormModel` — all fields, handles optional `rd_code`
- `WasteFractionACL` — transformations, EWC code formatting helper
- `WasteFractionApiClient` — typed functions for all 5 CRUD operations
- `useWasteFractions`, `useCreateWasteFraction`, `useUpdateWasteFraction`, `useDeleteWasteFraction` hooks
- `WasteFractionTable` — Name, EWC Code, R/D Code, Hazardous (badge), Recyclable (badge), Status, Actions
- `WasteFractionModal` — EWC field with format hint ("e.g. 20 03 01"), client-side format validation before submit, R/D code dropdown (R1, R3, D1 + empty)
- Delete confirmation dialog
- Skeleton loaders, error states, toast notifications
- Integration tests: create, edit, delete flows against dev API

**Acceptance Criteria:**
- Full CRUD works end-to-end against the dev API
- EWC format validated client-side before submit

---

### Zones
**Assignees:** BE2, FE2

#### Zones: API Contract
**Assignee:** BE2 + FE2

**Tasks:**
- Agree on response shape for `GET /zones` (read-only, no create/update/delete in Sprint 1)
- Confirm zone IDs will be stable ULIDs usable as FK references in later features
- Commit agreed contract to `/docs/api-contracts/zones.md`

---

#### Zones: BE
**Assignee:** BE2

**Tasks:**
- Create `zones` table migration
- Seed 3 zones: Urban, Suburban, Rural
- `GET /api/v1/zones` — returns list of all zones
- `GET /api/v1/zones/:id`

**Acceptance Criteria:**
- Migration + seed runs cleanly
- Zone `id` is a stable ULID usable as FK in future `price_rows`
- OpenAPI docs updated

---

#### Zones: FE
**Assignee:** FE2

**Tasks:**
- `ZoneACL` + `ZoneApiClient`
- `useZones()` hook — cached, long staleTime (zones don't change)
- Zones tab: read-only list (Name, Status)
- "Read-only — full map interface coming in Release 2" notice
- Export zone data for use in select dropdowns in later features

**Acceptance Criteria:**
- `useZones()` available as shared metadata hook for future forms

---

### Pricing Units
**Assignees:** FS (all sub-tickets)

#### Pricing Units: API Contract
**Assignee:** FS

**Tasks:**
- Define response shape for `GET /pricing-units`
- Document the 6 seed units (kg, m3, pcs, h, l, m) with their `symbol`, `type`, and `eu_code`
- Commit agreed contract to `/docs/api-contracts/pricing-units.md`

---

#### Pricing Units: BE
**Assignee:** FS

**Tasks:**
- Create `pricing_units` table migration with self-referential `base_unit_id` FK (nullable)
- Seed 6 units: kg, m3, pcs, h, l, m — with EU PEPPOL codes
- `GET /api/v1/pricing-units` — with optional `?status=` filter
- Unit tests: model validations

**Acceptance Criteria:**
- Migration + seed runs cleanly
- OpenAPI docs updated

---

#### Pricing Units: FE
**Assignee:** FS

**Tasks:**
- `PricingUnitFormModel` + `PricingUnitACL`
- `usePricingUnits()` hook — long staleTime, exported from shared `useMetadata` barrel
- `PricingUnitOption` TypeScript type exported for form select props
- `PricingUnitSelect` — dropdown component wrapping `usePricingUnits` (reusable in any form)
- `PricingUnitBadge` — inline symbol display (e.g. `kg`)
- Pricing Units tab: read-only list (Name, Symbol, Type, EU Code)
- Export both components from shared components barrel

**Acceptance Criteria:**
- `usePricingUnits()` and `PricingUnitSelect` ready to be consumed by product/pricing forms in Sprint 3+

---

## High-Level Ticket Mapping

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

## Definition of Done

- [ ] ERD committed to repo, reviewed by all engineers
- [ ] All API contract docs committed before coding starts
- [ ] All migrations run cleanly in dev and CI
- [ ] All API endpoints documented in OpenAPI
- [ ] Categories: full CRUD working in UI
- [ ] Waste Fractions: full CRUD working in UI with EWC validation
- [ ] Zones: 3 zones visible in read-only list
- [ ] Pricing Units: 6 units visible, `usePricingUnits()` hook available for future forms
- [ ] FE 4-layer architecture documented and proven
- [ ] BE test coverage ≥ 80% per module
- [ ] 0 P0 bugs, < 3 P1 bugs
- [ ] Demo-ready for Sprint Review on March 13

---

## Open Questions

> **EWC Code Validation (PD-39):** Current plan is format validation only (6-digit pairs format check). Confirm: is this sufficient, or do we need validation against the official EU EWC registry? Registry integration adds significant scope.

> **Default Weights (PD-34):** Marked "Low" priority but developer flagged as larger than expected. Re-estimate after a technical spike on March 6.

---

## Notes

Sprint 1 benefits significantly from the pre-sprint infrastructure setup. The new microservice, database, and CI/CD being ready on Day 1 adds an effective ~40h buffer and allows Categories to reach 100% completion this sprint rather than 70%.

---

## Design

Interactive prototype of all Sprint 1 screens embedded below.
