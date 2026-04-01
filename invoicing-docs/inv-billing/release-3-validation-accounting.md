---
slug: inv-release-3-validation-accounting
title: "Invoicing 3 — Validation, Accounting & VAT"
category: inv-billing
order: 2
description: "Release 3 — 12 stories covering simulation, validation rules, gross/net invoicing, reverse charge VAT, cost centres, public/private law, and cancellation"
related:
  - inv-domain-overview
  - inv-release-1-core-billing
  - inv-release-2-billing-config
  - inv-release-4-integration-advanced
tags:
  - invoicing
  - validation
  - vat
  - simulation
  - public law
  - private law
  - cost centres
  - release-3
---

# Invoicing 3 — Validation, Accounting & VAT

**Release ID:** 11199
**Stories:** 12
**Theme:** Validation, simulation, accounting, VAT, and public/private law

This release adds the rules engine — automatic validations, invoice simulation, VAT edge cases, cost centre routing, and the public/private law handling that underpins Finnish compliance.

---

## Story Summary

| Jira | Ref | Title |
|------|-----|-------|
| PD-302 | 3.4.10 | Custom and bulk invoice texts |
| PD-301 | 3.4.11 | Gross or net invoicing |
| PD-300 | 3.4.12 | Reverse charge VAT |
| PD-296 | 3.4.16 | Cost centers and accounts |
| PD-295 | 3.4.17 | Account and cost center data |
| PD-285 | 3.4.28 | Private and public law invoices |
| PD-284 | 3.4.29 | Public and private law sales – billing |
| PD-282 | 3.4.31 | Editing e-invoice data |
| PD-278 | 3.4.35 | Error listing of events |
| PD-274 | 3.4.39 | Invoice simulation |
| PD-272 | 3.4.41 | Simulation run of billing data |
| PD-271 | 3.4.42 | Automatic checks on billing data |
| PD-273 | 3.4.40 | Cancellation option for billing data |

---

## Invoice Customisation

### PD-302 — Custom and Bulk Invoice Texts (3.4.10)
Add custom text to individual or multiple invoices:
- Included in FINVOICE export
- Supports bulk application across invoice batches

### PD-301 — Gross or Net Invoicing (3.4.11)
- Automatic gross or net invoice generation based on customer type
- Manually overridable per customer

---

## VAT Handling

### PD-300 — Reverse Charge VAT (3.4.12)
Auto-apply reverse charge VAT for eligible customers:
- Scrap metal waste
- Construction waste

Mixed VAT invoices (standard + reverse charge on same invoice) are supported.

### PD-285 — Private and Public Law Invoices (3.4.28)
Auto-classify transactions as public or private law based on:
- Customer type
- Product
- Regional rules

Classification is included in FINVOICE.

### PD-284 — Public and Private Law Sales – Billing (3.4.29)
Flexible handling of mixed-law customers:
- Same invoice for public + private transactions, **or**
- Separate invoices per law type

Different collection and enforcement processes apply per type.

---

## Cost Centres & Accounts

### PD-296 — Cost Centers and Accounts (3.4.16)
Central management of:
- Cost centres
- Accounts
- VAT rates

Link pricelists to products and synchronise accounting parameters with external systems.

### PD-295 — Account and Cost Center Data (3.4.17)
Implementation-defined rules to direct the **same product** to different accounts or cost centres in FINVOICE:
- Multi-component cost centre per event: product + reception point + service responsibility

---

## E-Invoice Data

### PD-282 — Editing E-Invoice Data (3.4.31)
- Manual e-invoicing address management
- Auto-fetch via integration
- Ability to **lock** address from auto-update (prevents overwrite by integration)

---

## Validation & Error Handling

### PD-278 — Error Listing of Events (3.4.35)
Events must have mandatory accounting and cost centre data before transfer to billing:
- Configurable automated checks (e.g. price vs. price list validation)
- Events blocked until errors are resolved

### PD-271 — Automatic Checks on Billing Data (3.4.42)
System-level validation at invoice creation:
- Configurable rules per company
- Blocks processing until all errors are resolved
- Runs automatically — no manual trigger required

---

## Simulation

### PD-274 — Invoice Simulation (3.4.39)
Preview a full invoice **before finalisation**:
- No official issuance
- Identifies errors pre-dispatch
- Single invoice preview

### PD-272 — Simulation Run of Billing Data (3.4.41)
Full simulated invoicing run under the same conditions as a real run:
- Produces **test-marked** data
- Useful for batch validation before committing

---

## Cancellation

### PD-273 — Cancellation Option for Billing Data (3.4.40)
After invoice generation but before delivery:
- Cancel sending of invoices
- Schedule sending for a future time
- Recall from external system (if integration supports recall API)

---

## Flow Diagrams

Interactive Mermaid diagrams illustrating the end-to-end flows for this release. Each link opens a standalone diagram in a new tab.

| # | Diagram | Stories covered |
|---|---------|----------------|
| 2 | [Billing Run — Simulation, Validation & Send](/docsite/diagrams/html/invoicing/inv-02-billing-run-simulation.html) | PD-274, PD-272, PD-271, PD-278, PD-273, PD-270 |
| 4 | [Public vs. Private Law Invoicing](/docsite/diagrams/html/invoicing/inv-04-public-private-law.html) | PD-285, PD-284 |
