---
slug: release1-requirements-traceability
title: Release 1 — Sprint Plan & Requirements Traceability
category: pm-signoff
order: 1
description: Traces every Release 1 deliverable back to its official Jira story requirement, confirming nothing is out of scope.
related:
  - sprint-1-overview
  - sprint-2-overview
tags:
  - release-1
  - pm
  - sign-off
  - requirements
  - traceability
  - PD-39
  - PD-40
  - PD-41
  - PD-325
  - PD-326
  - PD-35
  - PD-37
  - PD-38
  - PD-327
  - PD-330
  - PD-322
  - PD-353
---

# Release 1 — Sprint Plan & Requirements Traceability
**Release:** 11190 — Foundation & Reference Data
**Dates:** March 2–13 (Release 1) · March 16–27 (Release 1)
**Prepared by:** Product Owner - Spinola · March 5, 2026
**Verified by:** Tech Lead - Saad· March 5, 2026

---

## Purpose

This document shows that everything planned in Release 1 is directly grounded in the official Jira story requirements for this release. Each deliverable traces back to a specific requirement — nothing being built is out of scope.

---

## What Release 1 Cover

### PD-39 · Product Schema Management & Waste Fractions

**Requirement (from PD-39):**
> *"It must be possible to define different background information for products. Background information is needed for controlling the determination of the price, for differentiating different types of products from each other and for reporting. Part of the reporting is determined by legislation or the authorities, and the necessary information is therefore mandatory."*

**Release 1:** Product category CRUD with dynamic schemas (JSONB) controlling which fields apply per product type. Waste fractions with full EWC code validation fully delivered.

**Release 1:** Schema configuration view UI.

---

### PD-326 · Pricing Units

**Requirement (from PD-326):**
> *"The price of the product must be determined based on weight or volume at least in the following ways: piece-based (€/piece), weight-based (€/kg), cube-based (€/m3), distance-based (€/m), time-based (€/h), liter-based (€/l). The units must be selectable based on the need for the product (e.g. kg or ton). The units are listed in the EU e-invoicing standard."*

**Release 1:** All 6 unit types seeded with EU PEPPOL codes and fully available as a shared component for all product and pricing forms. EU e-invoicing compliance metadata fully delivered.

**Release 1:** Schema configuration view UI for pricing units. Unit conversions (e.g. kg ↔ ton) via `base_unit_id` are planned for Release 2.

---

### PD-40 · Bill of Materials

**Requirement (from PD-40):**
> *"The 'recipe' of the product must be editable and it must be possible to mark the properties/traits that make up the product as parts of the product. The background of the requirement is the need to be able to modify parts of the product line without having to order the modification separately as a supplier's development work."*

**Release 1:** Multi-component product pricing — admins compose a product from named cost components (e.g. rental + collection = computed total). Components are independently editable.

---

### PD-41 · Product Catalog

**Requirement (from PD-41):**
> *"The system must have a product list that can be maintained and edited. More detailed functionalities regarding the product range are defined in separate requirements."*

**Release 1:** Product list with filters and basic search complete.

**Release 1:** Full product CRUD with dynamic form — fields driven by the category schema built in Release 1. Full product configuration (PD-41 Complete) is planned for a later release.

---

### PD-325 · Zones

**Requirement (from PD-325):**
> *"The price of the product must be able to depend on the region. For example, the same product may have different prices per municipality, and prices in a sparsely populated area may differ from prices in an agglomerated area."*

**Release 1:** 3 hardcoded zones (Urban, Suburban, Rural) visible in a read-only list. Zone IDs are stable and ready to be referenced by pricing rules. This is foundational groundwork only.

> ⚠️ **PD-325 Complete (Zones with full map interface) is planned for Release 2, Release 2.** The geospatial service API documentation needs to be received by March 27 to unblock that work.

---

## What Is Not Yet in Release 1

The following stories are part of Release 1 but are **not covered in Release 1**. They are listed here for transparency and will be planned into upcoming releases.

### PD-41 Complete · Products with Full Configuration
Full product configuration (beyond the MVP list and search delivered in Release 1) is not in the release plan yet. Scheduled for a later release once the foundational reference data is in place.

---

### PD-35 · Service Responsibility (Basic)

**Requirement (from PD-35):**
> *"Service responsibility (for example, market-based or secondary liability customer) can be determined product- and customer-specific. If both specifications exist, it must be possible to choose which specification serves as the guiding specification depending on the situation."*

Not in Release 1. Requires the product model (PD-41) to be in place first.

---

### PD-38 · Additional Services (Basic — 2 types)

**Requirement (from PD-38):**
> *"It must be possible to add, remove and modify additional services automatically or manually. Sometimes you want to always acknowledge additional services manually with the approval of the person performing the work, but there are also situations when you want them to be included in the automatically performed service."*

Not in Release 1. Requires the product catalog (PD-41) to be in place first.

---

### PD-37 · Service Levels (Basic — Standard + Express)

**Requirement (from PD-37):**
> *"The system must support services for which the service time is flexible."*

Not in Release 1. Requires the product model (PD-41) to be in place first.

---

### PD-327 · Price Components (Basic — 3 core types)

**Requirement (from PD-327):**
> *"The price of the product visible to the customer can consist of any number of price determination components, each of which can have its own logic. The number of price components must not be limited, but on the other hand, a product with only, for example, only the basic fee can be its own product."*

Not in Release 1. Requires pricing units (PD-326) and the product catalog (PD-41) to be in place first.

---

### PD-353 · Wastewater (Basic — Connection Tracking)

**Requirement (from PD-353):**
> *"Information about the property's wastewater treatment must be able to be stored in connection with the property or the customer. If the property is part of the sewer network, information about it is sufficient without any further details. If the property has a sludge tank, the following information must be recorded: type of sludge tank, volume of the tank (m3), processed waste water, equipment of the property, coordinate information, additional information in free form, possible emptying problems, if a small-scale sewage treatment plant its model, if the tank is shared by several properties."*

Not in Release 1. No dependencies on Release 1 work but not yet planned into a release.

---

### PD-330 · Price Lists (Basic — Create/Edit/View)

**Requirement (from PD-330):**
> *"The system must support an unlimited number of different price lists. E.g. weight-based, volume-based, hourly-based, customer-specific, service responsibility-based."*

Not in Release 1. Requires pricing units (PD-326), zones (PD-325), and service responsibility (PD-35) to be in place first.

---

### PD-322 · Price Determination (Basic — Foundation)

**Requirement (from PD-322):**
> *"Many different prices for the same product, for example, depending on the type of customer, service responsibility, processing method and location, e.g. contract area or municipal boundaries."*

Not in Release 1. Requires price lists (PD-330), zones (PD-325), and service responsibility (PD-35) to be in place first.
