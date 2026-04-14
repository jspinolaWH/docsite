---
slug: invoicing-requirements-coverage
title: Invoicing Requirements Coverage
category: inv-mvp-mapping
order: 1
description: Tracks how each PD requirement across Invoicing 1–4 is covered in the MVP — where it lives, how it's implemented, and any open questions.
related: []
tags:
  - mvp
  - requirements
  - coverage
  - invoicing
---

# Invoicing Requirements Coverage
_WasteHero — PJH/Kiertokapula Invoicing Module_

This document tracks how each PD requirement across Invoicing 1–4 is covered in the MVP — where it lives, how it's implemented, and any open questions.

---

## Invoicing Release (v11436 — due 30 Oct 2026)

---

### PD-177 — Billing event data for reporting

**Status:** ✅ Covered

**Where:** Operations → Billing Events → Event Detail (Details tab)

**My understanding:** Every billing event needs to carry a set of accounting and reporting labels — things like accounting account, cost centre, classification, municipality — so that accountants can do their job without filling anything in manually. The fields just need to exist on the event and be visible. How they get populated (manually or automatically) is handled by a later release (PD-289).

**How:** All required fields are present on the event detail screen. Fields show "—" when not set, which is expected behaviour.

| Field | Status |
|-------|--------|
| Accounting account | ✅ |
| Cost centre | ✅ |
| Resolved cost centre | ✅ |
| Classification (service responsibility) | ✅ |
| Municipality | ✅ |
| Location / Receiving site | ✅ |
| Product / Waste type | ✅ |
| Vehicle + Driver | ✅ |
| Origin | ✅ |
| Project code | ✅ (field exists, no value until PD-287 is implemented) |

---

### PD-297 — Billing event status information

**Status:** ✅ Covered

**Where:** Operations → Billing Events → List view (Status column) + Event Detail (status badge)

**My understanding:** Every billing event must have a status that tells the invoicing user where it is in the process. Statuses update automatically as the event moves through the invoicing pipeline. PJH specifically requires that once an event is Sent, editing is locked.

**How:** All required statuses are present and visible on the list and detail views. Editing is correctly locked on Sent and Completed events — no Edit button shown.

**Statuses and how they change:**

| Status | How it's set | Editable |
|--------|-------------|---------|
| In Progress | Automatically on event creation | ✅ Yes |
| Sent | Automatically when FINVOICE transmitted to external system | ❌ Locked |
| Error | Automatically when transmission fails or validation errors | ✅ Yes (fix and re-send) |
| Completed | Automatically when external system confirms receipt | ❌ Locked |
| Excluded | Manually by user via Exclude button | ✅ Can be reinstated |

**Gap:** Error recovery flow — when an event has Error status, the user needs to fix the data and re-send. It is not yet confirmed whether a Retry/Re-transfer button exists for this flow.

---

### PD-283 — Manual creation of billing events

**Status:** ✅ Covered

**Where:** Operations → Billing Events → Create Billing Event form (+ New Event button)

**My understanding:** Office users need to be able to create billing events manually for services that don't come from route management or any automated system — things like land rent, expert work, equipment rental. The user selects a product and the prices should auto-populate based on that product's default prices.

**How:** The Create Billing Event form covers all required fields. The invoicing module has its own `products` table in the DB (separate from the main WasteHero platform) seeded with 15 products and their default prices. When a user selects a product from the dropdown, Waste Fee, Transport Fee and Eco Fee auto-populate from the product's defaults. The user can still override prices manually.

| Requirement | Status |
|-------------|--------|
| Select product from catalogue | ✅ |
| Prices auto-populate on product selection | ✅ (from invoicing module's own products table) |
| Manual price override allowed | ✅ |
| All required event fields present | ✅ (see PD-299) |
| Financial allocations per product (accounting, VAT, cost centre) | ⏳ Handled by PD-289 |
| Events logged same as automated events | ✅ |

**Note:** The invoicing module maintains its own `products` table that mirrors product and pricing data. This is intentional — the invoicing module is a standalone BE/FE and cannot directly access the main WasteHero platform's products and pricing data.

---

### PD-276 — Transfer of unbilled events

**Status:** ✅ Covered

**Where:** Operations → Billing Events → Event Detail → Transfer button (modal)

**My understanding:** If a billing event has been assigned to the wrong customer or wrong location, office users need to be able to move it to the correct one before it gets invoiced. Two scenarios: wrong customer (e.g. new resident moved in but events are still on old customer) and wrong location (e.g. driver recorded emptying at wrong address).

**How:** The Transfer Billing Event modal covers both scenarios. It shows the current customer, asks for a target customer number (required) and target property ID (optional for location transfers), and requires a mandatory reason. Bulk transfer is also available from the billing events list. All transfers are logged in the audit trail.

| Requirement | Status |
|-------------|--------|
| Transfer event to different customer | ✅ |
| Transfer event to different location/property | ✅ |
| Mandatory reason for transfer | ✅ |
| Bulk transfer from list view | ✅ |
| Only works on unbilled (In Progress) events | ✅ |
| Audit trail logging | ✅ |

---

### PD-275 — Transfer and copy of billed events

**Status:** ✅ Covered

**Where:** Operations → Billing Events → Event Detail → Credit & Transfer button (modal)

**My understanding:** When an invoice has already been sent and a mistake is discovered — wrong customer, wrong frequency, wrong period — the system needs to issue a credit for the original and create a new event for the correct customer. The entire history must remain visible and traceable.

**How:** A "Credit & Transfer" button is shown on events with status SENT or COMPLETED. It opens a modal showing the original event summary, target customer number, optional target property ID, and a mandatory reason. On confirm, a credit record is created (negative amounts) and a new IN_PROGRESS event is created for the target customer. All three records are linked and visible. Part 1 (credit/refund) is handled by PD-269.

| Requirement | Status |
|-------------|--------|
| Credit & Transfer button on Sent/Completed events | ✅ |
| Warning banner explaining the action | ✅ |
| Original event summary in modal | ✅ |
| Target customer number (required) | ✅ |
| Target property ID (optional) | ✅ |
| Mandatory reason logged in audit trail | ✅ |
| Original event not modified | ✅ |
| Credit and new event linked and visible | ✅ |
| CREDIT and TRANSFER origin badges on list | ✅ |

---

### PD-277 & PD-318 — Manual editing of events / Editing billing events

**Status:** ✅ Covered

**Where:** Operations → Billing Events → Edit Billing Event form + Audit Trail tab

**My understanding:** Office users need to be able to correct mistakes on billing events before invoices are generated. Every change must be logged with a mandatory reason. These two stories are linked and share the same edit screen — PD-277 covers correcting individual field data, PD-318 covers excluding/including events from invoicing runs.

**How:** The edit form allows updating all key fields. Accounting, classification and VAT fields are correctly shown as read-only. A mandatory "Reason for Edit" field is required before saving. The Audit Trail tab shows every change with timestamp, user, field, previous value, new value and reason.

| Requirement | Status |
|-------------|--------|
| Edit date, product | ✅ |
| Edit pricing (waste, transport, eco fee) | ✅ |
| Edit quantity and weight | ✅ |
| Edit customer, municipality, vehicle, driver | ✅ |
| Edit contractor, direction, shared collection % | ✅ |
| Read-only accounting/VAT/classification fields | ✅ |
| Mandatory reason for edit | ✅ |
| Audit trail — timestamp, user, field, before/after, reason | ✅ |
| Filterable audit trail by user, field, date | ✅ |
| Editing locked on Sent/Completed events | ✅ (no Edit button shown) |

---

### PD-299 — Billing event details

**Status:** ✅ Covered

**Where:** Operations → Billing Events → Event Detail (Details tab) + Create Billing Event form

**My understanding:** This story defines what a billing event is and what data it must contain. It's the core data model for the entire invoicing module — every other story builds on top of it.

**How:** All required fields are present on the event detail screen. The create form covers the manually entered fields. VAT amounts, totals, accounting account, cost centre, and classification are handled by PD-289.

| Field | Status |
|-------|--------|
| Date | ✅ |
| Product / Service name | ✅ |
| Waste price | ✅ |
| Transport price | ✅ |
| Eco fee | ✅ |
| Quantity | ✅ |
| Weight | ✅ |
| VAT 0% / VAT 24% | ✅ |
| Net amount / Gross amount | ✅ |
| Registration number / Vehicle | ✅ |
| Accounting account | ✅ |
| Cost centre + Resolved cost centre | ✅ |
| Free-text comment | ✅ |
| Customer number | ✅ |
| Contractor | ✅ |
| Load / unloading location | ✅ |
| Event identifier | ✅ (system generated) |
| Classification / Service responsibility | ✅ |
| Origin | ✅ (system set: MANUAL / DRIVER) |
| Direction | ✅ |
| Municipality | ✅ |
| Shared collection group % | ✅ |
| Non-billable flag | ✅ |
| Project | ✅ (shows — until PD-287 implemented) |

---
