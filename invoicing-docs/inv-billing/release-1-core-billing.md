---
slug: inv-release-1-core-billing
title: "Invoicing 1 — Core Billing Infrastructure"
category: inv-billing
order: 1
description: "Release 1 (target: 22 May 2026) — 14 stories covering the billing event data model, FINVOICE 3 output, invoice numbering, language handling, and AR data"
related:
  - inv-domain-overview
  - inv-release-2-billing-config
  - inv-release-3-validation-accounting
tags:
  - invoicing
  - billing events
  - finvoice
  - release-1
  - ar
---

# Invoicing 1 — Core Billing Infrastructure

**Release ID:** 11193
**Target:** 22 May 2026
**Stories:** 14
**Theme:** Core billing event infrastructure and FINVOICE output

This release establishes the foundational data model and output format for the entire invoicing domain. Every subsequent release builds on the schemas, status flows, and FINVOICE structures defined here.

---

## Story Summary

| Jira | Ref | Title |
|------|-----|-------|
| PD-299 | 3.4.13 | Billing event details |
| PD-298 | 3.4.14 | Billing data details |
| PD-297 | 3.4.15 | Billing event status information |
| PD-310 | 3.4.2 | FINVOICE data |
| PD-309 | 3.4.3 | Invoice numbering sequence |
| PD-308 | 3.4.4 | Invoice data based on language |
| PD-307 | 3.4.5 | Invoice template selection |
| PD-289 | 3.4.23 | Accounts receivable data |
| PD-283 | 3.4.30 | Manual creation of billing events |
| PD-277 | 3.4.36 | Manual editing of events |
| PD-318 | 3.3.18 | Editing billing events |
| PD-228 | 3.5.42 | Driver and vehicle login to event |
| PD-177 | 3.6.34 | Billing event data for reporting |
| PD-163 | 3.7.15 | Billing list |

---

## Data Model

### PD-299 — Billing Event Details (3.4.13)
Defines the **full data schema** for a billing event. This is the foundational data model for all invoicing.

Every billing event carries:
- Date, product, prices
- VAT rate and breakdown
- Weight
- Cost centres
- Eco-fee
- Municipality
- Service responsibility

### PD-298 — Billing Data Details (3.4.14)
Customer-side invoice delivery data extraction:
- E-invoice address
- Delivery method
- Billing address
- Validation before finalisation
- **FINVOICE 3.0 compliance**

### PD-297 — Billing Event Status Information (3.4.15)
Status lifecycle management:

```
In Progress → Sent → Error → Completed
```

> **PJH note:** "Sent" status should **lock content** — no further modifications permitted once an event reaches this state.

---

## FINVOICE Output

### PD-310 — FINVOICE Data (3.4.2)
Generates invoicing material in **Finvoice 3 format**:
- Multiple VAT rates on a single invoice
- Company-specific accounting identifiers embedded per line:
  - Cost centre
  - Service responsibility
  - Waste type

### PD-309 — Invoice Numbering Sequence (3.4.3)
Supports manual or predefined invoice number series, e.g.:
- Sludge invoice series
- Credit invoice series
- Public/private law series

Uniqueness is enforced system-wide.

> **PJH note:** First digit = public/private law classification; second digit = year.

### PD-308 — Invoice Data Based on Language (3.4.4)
Customer language preference (FI / SV / EN) drives the invoice language:
- Products have per-language names
- Language preference exported in FINVOICE

> **PJH note:** Dual-language headings (FI+SV) are currently used in production.

### PD-307 — Invoice Template Selection (3.4.5)
Template codes are sent to the external invoicing system. Templates can be set at:
- Customer level
- Property level
- Contract level
- Invoicing run level

---

## Accounts Receivable

### PD-289 — Accounts Receivable Data (3.4.23)
Mandatory AR fields per invoice line:
- Public/private law classification
- Accounting ledger codes
- VAT breakdowns
- Cost objects

These are auto-assigned from customer and event data.

---

## Manual Operations

### PD-283 — Manual Creation of Billing Events (3.4.30)
Create manual invoicing events linked to products (e.g. land rent, expert work) with correct:
- Account assignment
- VAT assignment
- Cost centre assignment

### PD-277 — Manual Editing of Events (3.4.36)
Pre-invoicing corrections to:
- Quantities
- Event type
- Contractor fees

Requires:
- Full audit trail
- Role-based access control
- Flagging until reviewed

### PD-318 — Editing Billing Events (3.3.18)
- Manual and **bulk exclusion** of events from invoicing
- Selective invoicing of specific components (e.g. base fees only)
- Excluded events remain tracked (not deleted)

---

## Field Operations

### PD-228 — Driver and Vehicle Login to Event (3.5.42)
- Driver/vehicle registration on events
- Certain additional tasks can go directly to invoice without office approval
- Bulk review capability for error detection

---

## Reporting & Approval

### PD-177 — Billing Event Data for Reporting (3.6.34)
Per-event reporting metadata:

| Field | Description |
|-------|-------------|
| Accounting account | Chart of accounts reference |
| Responsibility area | Organisational unit |
| Product group | Product classification |
| Waste type | Waste fraction |
| Service responsibility | Who is responsible |
| Municipality | Billing municipality |
| Project code | Project allocation |
| Cost centre | Cost centre reference |
| Receiving site | Reception location |

All fields are exportable to external reporting tools.

### PD-163 — Billing List (3.7.15)
Waste management authority approval of outgoing invoices before issuance:
- Content locked after approval proposal is sent

> **Status:** Still requires clarification — PJH currently has no need for this feature.

---

## Flow Diagrams

Interactive Mermaid diagrams illustrating the end-to-end flows for this release. Each link opens a standalone diagram in a new tab.

| # | Diagram | Stories covered |
|---|---------|----------------|
| 1 | [Billing Event Lifecycle](/docsite/diagrams/html/invoicing/inv-01-billing-event-lifecycle.html) | PD-299, PD-297, PD-298, PD-310, PD-228 |
