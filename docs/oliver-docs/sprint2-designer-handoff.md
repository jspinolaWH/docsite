---
slug: sprint2-designer-handoff
title: Sprint 2 — Designer Handoff
category: oliver-docs
order: 1
description: Designer handoff document for Sprint 2 covering Zones, Products, Bill of Materials, and Additional Services screens
related:
  - field-mapping-complete
tags:
  - sprint-2
  - design
  - handoff
  - products
  - zones
---

# Sprint 2 — Designer Handoff
**WasteHero 2.0 · Product Management Module**
**Meeting date:** March 7, 2026
**Prepared by:** Product Owner - Spinola

---

## Context

You've already seen and built the Sprint 1 screens. This document covers what needs to be designed for Sprint 2. Everything in Sprint 2 builds directly on top of what exists — no new navigation patterns, no new design system decisions.

**Sprint 1 recap (already designed):**
- Categories list + create/edit modal + schema configuration modal (⚙️)
- Waste Fractions list + create/edit modal
- Pricing Units — read-only list

---

## What's New in Sprint 2

Sprint 2 adds 4 things:

1. **Zones** — hardcoded read-only list of 3 zones (full map interface comes in Release 2)
2. **Products** — full CRUD: list, search, filters, create, edit, delete, and detail page
3. **Bill of Materials** — a tab inside the product detail page
4. **Additional Services** — a tab inside the product detail page (2 types: manual and automatic)

---

## Screen 1 — Zones

**How you get here:** New "Zones" tab in the main tab bar (this is the main point).

**Tab label:** `Zones` with badge `PD-325`

> This sprint delivers a read-only list only. Full map interface with polygon drawing comes in Release 2.

**Page layout:**
- Title: "Zones"
- Subtitle: "Geographic regions for location-based pricing"
- Blue info banner: "Read-only in Release 1 — Full map interface with polygon drawing coming in Release 2. These zones are currently used for zone-based pricing conditions."

**Zone cards** (one card per zone, no table — card style like the Sprint 1 Zones screen):
- Urban / "Copenhagen city center and dense urban areas" / 2,435 properties
- Suburbs / "Suburban areas surrounding urban core" / 1,074 properties
- Rural / "Outer rural areas and countryside" / 471 properties

No create, edit, or delete actions.

---

## Screen 2 — Products List

**How you get here:** New "Products" tab in the main tab bar (add it after Pricing Units).

**Tab label:** `Products` with badge `PD-41`

**Page layout:**
- Title: "Products"
- Subtitle: "Manage your product catalogue"
- Top right: `+ New Product` button

**Filters row:**
- Search input: "Search by name or code..."
- Dropdown: "All Categories ▾"
- Dropdown: "All Statuses ▾"

**Table columns:** PRODUCT NAME · CATEGORY · PRICING UNIT · STATUS · ACTIONS

**Example rows:**

| Product Name | Category | Pricing Unit | Status |
|---|---|---|---|
| Mixed Waste Collection / "General mixed waste emptying" | Service Product (blue) | kg | Active (green) |
| 240L Bin Rental / "Standard 240 litre bin" | Container Product (purple) | pcs | Active (green) |
| Container Delivery Fee / "One-time delivery charge" | One-off Fee (yellow) | pcs | Active (green) |
| Monthly Base Fee – Urban / "Fixed monthly base" | Recurring Fee (pink) | pcs | Active (green) |
| Extra Bin Wash / "Additional container cleaning" | Additional Service (teal) | pcs | Inactive (gray) |

Actions per row: edit pencil + delete trash.

**Empty state** (separate artboard): centered illustration, "No products yet", "+ New Product" button.

---

## Screen 3 — Product Detail Page

**How you get here:** Click on any product row in the Products list.

**Page layout:**
- Back breadcrumb: `← Products`
- Title: product name in large bold
- Inline badges next to title: category badge + status badge (e.g. "Service Product" · "Active")
- Top right: "Edit Product" outlined button *(greyed out / placeholder — editing comes in a later sprint)*

**Sub-tab bar** below the header:

`Details` · `Bill of Materials PD-40` · `Additional Services PD-38`

### Sub-tab: Details

Read-only view of the product fields — Name, Code, Category, Pricing Unit, Status, Description, and any schema-driven fields from the category (e.g. Waste Fraction, Direction).

### Sub-tab: Bill of Materials

**Use case (from PD-40):**
> *An office worker wants to modify the product "bio-waste container emptying service", which consists of a waste container fee, an emptying fee, and a basic payment component. They want to add a waste disposal fee to the product.*

**What the designer needs to show:**
- The worker navigates to the product → opens Bill of Materials tab
- They see the existing components listed with a total
- They click "+ Add Component" to add the new waste disposal fee
- The total updates to reflect the new component

**Layout:**
- Section title: "Price Components"
- Top right: `+ Add Component` button

**Table columns:** COMPONENT NAME · TYPE · UNIT · UNIT PRICE · ACTIONS

**Example rows (bio-waste container emptying service):**

| Component | Unit | Unit Price |
|---|---|---|
| Waste Container Fee | pcs | €15.00 |
| Emptying Fee | kg | €25.00 |
| Basic Payment | pcs | €10.00 |

**Total row** — divider line, no action buttons, right-aligned bold `Total: €50.00`, slightly darker background.

After adding the new component:

| Component | Unit | Unit Price |
|---|---|---|
| Waste Container Fee | pcs | €15.00 |
| Emptying Fee | kg | €25.00 |
| Basic Payment | pcs | €10.00 |
| **Waste Disposal Fee** | kg | €8.00 |

**Total: €58.00**

---

### Sub-tab: Additional Services

**Use cases (from PD-38):**
> *1) Along with emptying the waste container, a cancellation trip can be included. The driver must manually mark the return distance if it differs from the amount included in the price.*
> *2) A customer gets one container wash per year included in the basic fee. Office staff can add extra washing times to the service.*
> *3) An automatic weighing fee can be connected to the waste reception product.*

**What the designer needs to show:**
- A list of additional services linked to this product
- Each service has a type: Manual (requires acknowledgement) or Automatic (applied without confirmation)
- Office staff can add or remove services from the list

**Layout:**
- Section title: "Additional Services"
- Top right: `+ Add Service` button

**Table columns:** SERVICE NAME · TYPE · TRIGGER · ACTIONS

**Example rows:**

| Service Name | Type | Trigger |
|---|---|---|
| Cancellation Trip Fee | Manual (orange badge) | Driver acknowledgement required |
| Extra Container Wash | Manual (orange badge) | Added by office staff |
| Weighing Fee | Automatic (blue badge) | Applied on every weighing event |

**Actions per row:** remove (trash icon only — no edit, services are predefined)

---

## Screen 4 — Add Component Modal

**How you get here:** Click `+ Add Component` on the Bill of Materials section.

**Modal title:** "Add Price Component"

**Form fields:**
1. Component Name `*` — text input
2. Unit `*` — dropdown (same pricing units from Sprint 1)
3. Unit Price (€) `*` — number input

**Footer:** Cancel + "Add Component" primary button.

---

## Screen 5 — Add Service Modal

**How you get here:** Click `+ Add Service` on the Additional Services tab.

**Modal title:** "Add Additional Service"

**Form fields:**
1. Service Name `*` — dropdown of predefined services (e.g. Cancellation Fee, Extra Wash, Weighing Fee)
2. Type `*` — Manual / Automatic
3. Trigger description — text input, e.g. "Applied when driver marks return trip"

**Footer:** Cancel + "Add Service" primary button.

---

## Flow Summary

```
Products tab
│
├── List view with search + filters
│
└── Product row → click → Product Detail page
    ├── Details sub-tab (read-only fields)
    └── Bill of Materials sub-tab
        ├── See existing components + total
        └── + Add Component → Add Component modal → component added → total updates

Categories tab
│
└── Category row → ⚙️ icon → Configure Schema modal (already designed in Sprint 1)
```
