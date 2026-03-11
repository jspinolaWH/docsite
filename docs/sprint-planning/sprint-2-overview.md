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
  - PD-39
  - PD-40
  - PD-41
  - PD-326
---

# Sprint 2 Overview

**Dates:** March 16–27, 2026
**Release:** Release 1 — Foundation & Reference Data (deploys March 27)
**Team:** 4 Engineers (2 Frontend, 2 Backend)

---

## Sprint Goals

Polish and complete all Release 1 features to production-ready quality. Every feature from Sprint 1 is brought to 100%, fully tested, localized, and ready for deployment. Key additions this sprint: full EWC validation, schema configuration view, EU e-invoicing compliance for pricing units, full Product Catalog, Bill of Materials, Additional Services, Flexible Service Levels, and Product-Specific Service Responsibility.

---

## Deliverables

| Feature | Ticket | Notes |
|---------|--------|-------|
| **Categories — schema config view** | PD-39 wrap-up | Fully working configuration UI for category schemas |
| **Waste Fractions — full EWC validation** | PD-39 wrap-up | Complete format and rule validation |
| **Pricing Units — EU e-invoicing** | PD-326 wrap-up | Unit conversions and EU e-invoicing compliance |
| **Product Catalog — Full** | PD-41 | Completing what was missing from the Sprint 1 MVP |
| **Bill of Materials** | PD-40 | Cost components that make up a product's total price |
| **Additional Services** | PD-38 | Services that can be added on top of products |
| **Flexible Service Levels** | PD-37 | Price determination based on service urgency |
| **Product-Specific Service Responsibility** | PD-35 | Requires scope clarification before starting |
| **All Release 1 features** | — | Tested, localized, production-ready |

---

## Feature Details

### Product Catalog — Full (PD-41 · 3.2.1)
Completing what was not delivered in the Sprint 1 MVP. Full create, edit, delete, and product detail view.

### Bill of Materials (PD-40 · 3.2.2)
Admins can compose a product's price from multiple cost components. For example, a bin emptying service can consist of a rental component and a collection component, with the system computing the total automatically. This lays the foundation for how products expose their internal cost breakdown to downstream systems and invoices.

### Additional Services (PD-38 · 3.2.4)
Managing additional services that can be added on top of products — either automatically or manually. Includes configuration for when they apply and whether office approval is required before they are billed.

### Flexible Service Levels (PD-37 · 3.2.5)
Price determination based on service urgency. Supports three levels:
- Standard service — based on the normal collection schedule
- Spot order — at a desired time chosen by the customer
- Express / emergency — immediate or same-day delivery

### Product-Specific Service Responsibility (PD-35 · 3.2.30)
Defines service responsibility at the product level to feed into pricing logic. Allows the same product to be priced differently depending on whether it is delivered under municipal, market-based, or secondary service responsibility.

> ⚠️ **Scope clarification needed before starting.** A short alignment session at the start of Week 1 is required to confirm what needs to be built at the product level vs. what is handled at the customer and contract level.

### EU E-Invoicing Compliance (PD-326 wrap-up)
Pricing units are aligned with EU e-invoicing standards. Unit conversions are supported (e.g. kg to ton), ensuring correct unit representation on invoices.

---

## Timeline

| Week | Dates | Focus |
|------|-------|-------|
| Week 1 | March 16–20 | Bill of Materials, full EWC validation, schema configuration view, Product Catalog full CRUD, PD-35 alignment session |
| Week 2 | March 23–27 | Additional Services, Flexible Service Levels, Service Responsibility, EU e-invoicing, localization, testing, deploy prep |

**Deploy Date:** March 27, 2026 🚀

---

## Ticket Mapping

| Ticket | Scope | Estimate | Description |
|--------|-------|----------|-------------|
| PD-41 | Product Catalog full CRUD | 73–95h | Completes what was missing from Sprint 1 MVP |
| PD-40 | Bill of Materials | 73–88h | Multi-component pricing that computes a total |
| PD-38 | Additional Services | TBD | Add/remove/modify services on top of products |
| PD-37 | Flexible Service Levels | TBD | Service urgency pricing (express, spot, standard) |
| PD-35 | Service Responsibility | TBD | Product-level service responsibility — pending clarification |
| PD-39 wrap-up | Waste Fractions full EWC | — | Remaining 10% from Sprint 1 |
| PD-326 wrap-up | EU e-invoicing | — | Unit conversions and compliance |

---

## Business Impact

After Release 1 deploys on March 27:

- Admins can define product categories and manage waste classifications
- Foundational pricing units are ready for use across all products
- Compliance metadata (EWC codes, EU e-invoicing units) is in place
- Full product catalog with CRUD is working
- Products can have bill of materials components defined
- Additional services can be configured and linked to products
- Service levels and urgency-based pricing are supported

---

## Success Criteria

- [ ] Admin can create and manage product categories with configurable schemas
- [ ] Admin can create waste fractions with valid EWC codes
- [ ] Admin can view 3 zones (Urban, Suburban, Rural)
- [ ] Full product CRUD working end-to-end
- [ ] Bill of Materials computes correct totals from components
- [ ] Additional services can be added and removed from products
- [ ] Service levels assignable to products with correct pricing applied
- [ ] 0 critical bugs, fewer than 5 high-priority bugs
- [ ] Deployed to production

---

## Dependencies

> **Geospatial Service (needed for Sprint 3):** API documentation for the geospatial data service must be received by end of this sprint (March 27) to unblock Sprint 3 zone work. Needed: API endpoints, geographic boundary format details, point-in-zone query capability, test environment access, and a contact person.

> **PD-35 Clarification:** A short alignment session on service responsibility scope is needed at the start of Week 1 to unblock implementation.
