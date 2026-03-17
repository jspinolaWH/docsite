---
slug: jira-status-updates
title: Jira Status Updates — Prices & Products Releases
category: releases
order: 1
description: Jira ticket status updates for Prices & Products releases, based on Cycle 1 and Cycle 2 delivery.
related: []
tags:
  - jira
  - releases
  - status
---

# Jira Status Updates — Prices & Products Releases

> Assuming Cycle 1 + Cycle 2 fully delivered. Only stories that move out of To Do are listed.

---

## ✅ Move to Done

### Prices & Products 1 (11190) — due Mar 27

| Jira | Story | Linear coverage |
|---|---|---|
| **PD-326** | 3.3.7 Weight- and volume-based pricing and units | LEDGER-32, 33, 34, 35 — Pricing Units fully done in Cycle 1 |
| **PD-41** | 3.2.1 Product catalog | LEDGER-36, 38, 39, 40, 43, 95, 113, 114 — Full CRUD done in Cycle 2 |
| **PD-39** | 3.2.3 Product Schema Management | LEDGER-20–23 (Categories) + LEDGER-40 (Products Full CRUD with all type-specific fields) — done in Cycle 2 |
| **PD-40** | 3.2.2 Product composition (Bill of Materials) | LEDGER-44, 45, 46, 47 — BOM BE + FE done in Cycle 2 |
| **PD-38** | 3.2.4 Additional services | LEDGER-48, 49, 50, 51 — Additional Services BE + FE done in Cycle 2 |
| **PD-35** | 3.2.30 Product-specific service responsibility | Folded into LEDGER-40 as `service_responsibility` common field — done in Cycle 2 |

---

## 🔄 Move to In Progress

### Prices & Products 1 (11190) — due Mar 27

| Jira | Story | Linear coverage | Notes |
|---|---|---|---|
| **PD-322** | 3.3.11 Price determination | LEDGER-20–35 ✅ (all reference data done) | Foundation complete — categories, waste fractions, pricing units, zones all done. Pricing engine / price rows not yet built |
| **PD-328** | 3.3.4 Scheduled price updates | Reference data done | Foundation in place but pricing logic not started |

### Prices & Products 2 (11191) — due Apr 24

| Jira | Story | Linear coverage | Notes |
|---|---|---|---|
| **PD-37** | 3.2.5 Flexible service levels for orders | LEDGER-85, 89, 90, 91 — Service Levels done in Cycle 2 | Catalog definition done; linking to orders/pricing logic is a future sprint |
| **PD-325** | 3.3.8 Zone-based price lists | LEDGER-28, 30, 31 ✅ Zones done | Zone reference data done; zone-based price rows not yet built |
| **PD-327** | 3.3.6 Price determination components | LEDGER-44–47 ✅ BOM done | Product-level price components (BOM) done; invoice-level price components not yet built |

### Prices & Products 3 (11192) — due May 22

| Jira | Story | Linear coverage | Notes |
|---|---|---|---|
| **PD-324** | 3.3.9 Price determination based on service speed | LEDGER-85 ✅ Service Levels done | Service level tiers (standard, express, emergency) defined; speed-based pricing rules not yet built |
