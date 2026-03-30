---
slug: inv-release-2-billing-config
title: "Invoicing 2 — Billing Configuration & Cycles"
category: inv-configuration
order: 1
description: "Release 2 — 13 stories covering billing cycles, event bundling, retroactive corrections, shared services, and event transfers"
related:
  - inv-domain-overview
  - inv-release-1-core-billing
  - inv-release-3-validation-accounting
tags:
  - invoicing
  - billing cycles
  - configuration
  - shared services
  - release-2
---

# Invoicing 2 — Billing Configuration & Cycles

**Release ID:** 11198
**Stories:** 13
**Theme:** Billing configuration, cycles, bundling, and corrections

This release adds the configuration layer on top of the Inv 1 data model — defining how events are grouped, when they are invoiced, how corrections propagate retroactively, and how shared services are split.

---

## Story Summary

| Jira | Ref | Title |
|------|-----|-------|
| PD-364 | 3.1.17 | Retroactive changes to service responsibilities |
| PD-344 | 3.2.18 | Transfer of billing events |
| PD-319 | 3.3.14 | Price changes for unbilled events |
| PD-293 | 3.4.19 | Invoice batch filtering |
| PD-292 | 3.4.20 | Billing restrictions |
| PD-291 | 3.4.21 | Billing cycles |
| PD-290 | 3.4.22 | Billing data generation, bundling |
| PD-288 | 3.4.24 | Seasonal fees |
| PD-287 | 3.4.25 | Projects |
| PD-286 | 3.4.27 | Minimum fee |
| PD-280 | 3.4.33 | Shared service events on the invoice |
| PD-279 | 3.4.34 | Dynamic updates to shared service events |
| PD-275 | 3.4.38 | Transfer and copy of billed events |

---

## Retroactive Corrections

### PD-364 — Retroactive Changes to Service Responsibilities (3.1.17)
Change service responsibility on **uninvoiced events**, retroactive from a defined past date:
- Does **not** alter already-issued invoices
- Does **not** alter financial data
- Applies only to events not yet sent to invoicing

### PD-319 — Price Changes for Unbilled Events (3.3.14)
Retroactive price corrections on uninvoiced events:
- **Percentage** or **fixed €** adjustments
- Mass correction or single-event correction
- Linked to: product / service / contract

---

## Event Transfers

### PD-344 — Transfer of Billing Events (3.2.18)
Transfer invoicing events between customers, covering scenarios such as:
- Resident change
- Shared services reassignment
- Weighbridge event reallocation

### PD-275 — Transfer and Copy of Billed Events (3.4.38)
For **already-invoiced** events:
- Copy or transfer to same or different customer
- Handles crediting scenarios automatically
- Original invoice and credit note remain visible for the prior customer

---

## Invoicing Run Configuration

### PD-293 — Invoice Batch Filtering (3.4.19)
Filter invoicing runs by:
- Municipality
- Minimum € threshold
- Invoicing period
- Customer type
- Service type
- Reception location

### PD-292 — Billing Restrictions (3.4.20)
Separate specific event types onto their own invoices:
- Define per-service invoicing rules
- Define per-customer invoicing rules

### PD-291 — Billing Cycles (3.4.21)
Service/property/transaction-type-specific invoicing frequencies:
- Monthly
- Quarterly
- Annual

System prevents cycle conflicts across the same customer/property.

### PD-290 — Billing Data Generation & Bundling (3.4.22)
Customer-specific rules for grouping events:
- **Single invoice lines** — grouped/summarised
- **Itemised** — one line per event
- Configurable per contract

---

## Fees & Projects

### PD-288 — Seasonal Fees (3.4.24)
Recurring fees on predefined schedules:
- Auto-generated as billable events
- Variable pricing models supported

### PD-287 — Projects (3.4.25)
Customer-level project/work site setup for invoice allocation. Three creation modes:
1. Separate property
2. Separate contract
3. Customer hierarchy

### PD-286 — Minimum Fee (3.4.27)
Enforce minimum invoice amount per billing interval:
- Respects contract start and end dates
- Prevents overbilling for partial periods

---

## Shared Services

### PD-280 — Shared Service Events on the Invoice (3.4.33)
Invoice all shared service items with a per-subscriber percentage split:
- System notifies if shares do not total 100%
- FINVOICE-compliant output

### PD-279 — Dynamic Updates to Shared Service Events (3.4.34)
Retroactive addition of participants to shared services:
- Full redistribution of **all events** in the date range
- Handles scenarios where a new subscriber joins mid-period
