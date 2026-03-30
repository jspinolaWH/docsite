---
slug: inv-domain-overview
title: Invoicing Domain Overview
category: inv-overview
order: 1
description: High-level orientation to the WasteHero 2.0 invoicing domain — four releases, core concepts, and the Finnish FINVOICE standard
related:
  - inv-release-1-core-billing
  - inv-release-2-billing-config
  - inv-release-3-validation-accounting
  - inv-release-4-integration-advanced
tags:
  - invoicing
  - overview
  - finvoice
  - billing events
---

# Invoicing Domain Overview

The WasteHero 2.0 invoicing domain covers everything from raw billing event creation through final invoice delivery — including Finnish FINVOICE 3 compliance, public/private law classification, multi-VAT handling, and integration with external invoicing systems.

## Four-Release Structure

The invoicing domain is delivered across four releases:

| Release | Theme | Stories | Target |
|---------|-------|---------|--------|
| [Invoicing 1](/invoicing/doc/inv-release-1-core-billing) | Core billing event infrastructure & FINVOICE output | 14 | 22 May 2026 |
| [Invoicing 2](/invoicing/doc/inv-release-2-billing-config) | Billing configuration, cycles, bundling & corrections | 13 | TBD |
| [Invoicing 3](/invoicing/doc/inv-release-3-validation-accounting) | Validation, simulation, accounting, VAT & public/private law | 12 | TBD |
| [Invoicing 4](/invoicing/doc/inv-release-4-integration-advanced) | Advanced integration, credit invoices, attachments & authority access | 9 | TBD |

**Total: 48 stories** across the full invoicing domain.

## Core Concepts

### Billing Events
A **billing event** is the foundational data unit of the invoicing system. Every invoiceable action — a collection, a service, a manual charge — produces a billing event that carries the full context needed to generate a line item on an invoice: product, prices, VAT, weight, cost centres, eco-fee, municipality, and service responsibility.

Events move through a status lifecycle:

```
In Progress → Sent → Error → Completed
```

Once an event reaches **Sent**, its content is locked and cannot be modified.

### FINVOICE 3
All invoices are exported in **FINVOICE 3.0** format — the Finnish standard for structured electronic invoicing. Key implications:
- Multiple VAT rates supported on a single invoice
- Company-specific accounting identifiers (cost centre, service responsibility, waste type) embedded in each line
- PDF attachments transmitted as `AttachmentDetails` structures
- Customer language preference (FI / SV / EN) drives invoice language; dual-language headings (FI+SV) are the current default

### Public vs. Private Law
A central thread throughout all four releases is the **public/private law distinction**:
- Transactions are auto-classified based on customer type, product, or regional rules
- Public and private law items can appear on the same invoice or be separated — configurable per customer
- The first digit of the invoice number encodes public/private law; the second digit encodes the year
- Different collection and enforcement processes apply per type

### Accounts Receivable (AR)
Every invoice line must carry mandatory AR fields: public/private law classification, accounting ledger codes, VAT breakdowns, and cost objects. These are auto-assigned from customer and event data but can be corrected pre-invoicing.

## Key Cross-Cutting Concerns

| Concern | Where it appears |
|---------|-----------------|
| FINVOICE 3 export | Releases 1, 2, 3, 4 |
| Cost centre / account assignment | Releases 1, 2, 3 |
| Public/private law | Releases 1, 2, 3 |
| Audit trail & role-based access | Releases 1, 2 |
| Simulation / preview before send | Release 3 |
| External system integration | Release 4 |
| Multi-language support (FI/SV/EN) | Release 1 |

## Relationship to Products & Pricing

Invoicing sits downstream of the Products & Pricing domain. Pricelists, product definitions, VAT rates, and cost centre assignments defined in P&P flow directly into billing event generation and FINVOICE output. Changes to uninvoiced events can be triggered by retroactive price corrections (Inv 2 — PD-319).
