---
slug: sprint-3-overview
title: Sprint 3 Overview
category: sprint-planning
order: 3
description: Products CRUD with dynamic forms, Bill of Materials tab, and full map-based geospatial zone drawing (March 30 - April 10)
related:
  - sprint-2-overview
  - sprint-4-overview
  - delivery-plan-overview
  - pricing-model-overview
tags:
  - sprint-3
  - products
  - zones
  - geospatial
  - bill-of-materials
---

# Sprint 3 Overview

**Dates:** March 30–April 10, 2026
**Release:** Release 2 — Product Catalog + Geospatial Zones
**Team:** 4 Engineers (2 Frontend, 2 Backend)

---

## Sprint Goals

Build the full product catalog with CRUD and dynamic forms driven by the category schemas from Release 1. Simultaneously deliver the full geospatial zone implementation — map-based polygon drawing, automatic zone detection from property coordinates, and integration with the existing `geospatial-data-service`. This is the sprint where the 3 hardcoded zones from Release 1 are replaced with a real map-driven system.

---

## Deliverables

### Products CRUD — Full Implementation (PD-41 FULL)

Complete product management with dynamic forms that adapt based on the product's category:

- Create, edit, list, filter, and search products
- **Product Configuration tab** — category-specific fields driven by schemas configured in Release 1
- **Bill of Materials tab** — compose price from cost components (e.g. Rental €20 + Collection €30 = €50 total)

### Geographic Zones — Full Implementation (PD-325 FULL)

Upgrade from 3 hardcoded zones to fully dynamic map-based zones:

| Capability | Description |
|------------|-------------|
| **Map-based zone drawing** | Admins draw polygons on an interactive map |
| **Automatic zone detection** | Given a property's coordinates, determine which zone it falls in |
| **geospatial-data-service integration** | MongoDB-backed spatial queries via the existing service |

---

## How Zone Detection Works

At runtime, when a property needs to be assigned a zone:

1. Property has coordinates, e.g. `(55.68, 12.56)`
2. System calls `geospatial-data-service` with those coordinates
3. Service runs a point-in-polygon query against stored zone polygons
4. Returns the matching zone, e.g. `"Urban"`
5. That zone is used as a pricing condition in the price determination engine

This enables the pricing model to automatically apply zone-specific prices (e.g. Urban €50/ton, Rural €85/ton) without any manual admin intervention at order time.

---

## Timeline

| Week | Dates | Focus |
|------|-------|-------|
| Week 1 | March 30–April 3 | Products CRUD backend + frontend, Product Configuration tab, geospatial service integration |
| Week 2 | April 6–10 | Bill of Materials tab, map UI for polygon drawing, zone detection, end-to-end testing |

---

## Ticket Mapping

| Ticket | Scope | Estimate | Description |
|--------|-------|----------|-------------|
| PD-325 FULL | Zones Geospatial | 80–102h | Map interface, polygon drawing, automatic zone detection |
| PD-41 FULL | Products Complete | 37–58h | Configuration form, Bill of Materials tab |

**Sprint 3 total estimate:** ~117–160h | **Capacity:** 240h

---

## Geospatial Architecture Note

**Service:** `geospatial-data-service` (formerly `address-location-service`)
**Technology:** MongoDB with geospatial queries

The decision to use this existing service instead of setting up PostGIS was a deliberate risk-reduction call. It eliminates database extension configuration, leverages a proven in-production service, and significantly simplifies both this sprint and Sprint 4.

---

## Dependencies

- **`geospatial-data-service` API docs** must be received by March 27 (end of Sprint 2). If delayed, the zone map work in Week 1 is blocked.
- **Release 1 deployed** — category schemas power the product dynamic forms. Sprint 3 cannot build the configuration tab without category schema data in place.
