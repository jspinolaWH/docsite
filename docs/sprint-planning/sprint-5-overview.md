---
slug: sprint-5-overview
title: Sprint 5 Overview
category: sprint-planning
order: 5
description: Full upgrades of all R2 MVPs — pricing tabs, price lists, price determination algorithm, plus FULL audit logs, bulk editing, scheduled updates, and default weights (April 27 - May 8)
related:
  - sprint-4-overview
  - sprint-6-overview
  - delivery-plan-overview
  - pricing-model-overview
tags:
  - sprint-5
  - pricing
  - bulk-editing
  - audit-logs
  - scheduled-updates
  - mvp-upgrades
---

# Sprint 5 Overview

**Dates:** April 27–May 8, 2026
**Release:** Release 3 — Pricing Engine + Integration
**Team:** 4 Engineers (2 Frontend, 2 Backend)

---

## Sprint Goals

Upgrade every MVP from Sprint 4 to its full implementation, and ship the first wave of advanced pricing management features: scheduled updates, audit logs, and bulk editing. The centrepiece of this sprint is the Price Determination matching algorithm — the engine that automatically selects the correct price for each order.

---

## Deliverables

### FULL Upgrades from Sprint 4 MVPs

| Feature | What's Added in Sprint 5 |
|---------|--------------------------|
| **Service Responsibility** | Pricing condition integration (not just a metadata dropdown) |
| **Additional Services** | Driver-initiated services + complex approval workflows |
| **Service Levels** | Emergency level + complex pricing rules per level |
| **Price Components** | Unlimited components + event-specific components |
| **Wastewater** | Tank details + custom configurable fields |
| **Price Lists** | Assignment logic + effective date ranges |
| **Price Determination** | Full matching algorithm + rules engine UI |

### Price Determination — Full Implementation (PD-322 FULL)

The core of the pricing engine:

- **Matching algorithm:** Finds the best-matching price row for a given customer type / zone / service responsibility / R/D code combination
- **Partial match and fallback logic:** When no exact match exists, selects the row with the most matching attributes
- **Rules engine UI:** Admins can configure and test matching rules

### FULL Upgrades from R2 Operations MVPs

The four operations features shipped as MVPs in Release 2 (Sprints 3–4) are now brought to their full implementations:

| Feature | What's Added in Sprint 5 |
|---------|--------------------------|
| **Audit Logs (PD-329 FULL)** | Complete compliance tracking + reports + data export |
| **Bulk Editing (PD-331 FULL)** | Excel import/export + preview changes before applying + validation |
| **Scheduled Updates (PD-328 FULL)** | Automated scheduling + preview of upcoming changes + rollback capability |
| **Default Weights (PD-34 FULL)** | Complete weight configuration system per waste fraction |

### Bulk Editing Detail (PD-331 FULL)

1. Admin selects a set of price rows (e.g. all Rural zone rows)
2. Chooses an action: increase by 10%
3. Previews the calculated changes before committing
4. Applies with one click — all selected rows updated instantly

### Scheduled Updates Detail (PD-328)

```
Today (April 27): Schedule 5% increase, effective May 1

Order on April 30: Uses old price (€50/ton)
Order on May 2:   Uses new price (€52.50/ton)
```

Price is based on **service date**, not order date.

---

## Timeline

| Week | Dates | Focus |
|------|-------|-------|
| Week 1 | April 27–May 1 | FULL upgrades: Service Responsibility, Additional Services, Service Levels, Price Components |
| Week 2 | May 4–8 | FULL upgrades: Wastewater, Price Lists, Price Determination algorithm + UI; Scheduled Updates, Audit Logs, Bulk Editing, Default Weights |

---

## Ticket Mapping

| Ticket | Scope | Estimate | Description |
|--------|-------|----------|-------------|
| PD-35 FULL | Service Responsibility | 29–36h | Pricing condition integration |
| PD-38 FULL | Additional Services | 25–33h | Driver workflows + complex types |
| PD-37 FULL | Service Levels | 22–29h | Emergency level + complex rules |
| PD-327 FULL | Price Components | 24–28h | Unlimited + event-specific |
| PD-353 FULL | Wastewater | 13–16h | Tank details + custom fields |
| PD-330 FULL | Price Lists | 22–29h | Assignment logic + effective dates |
| PD-322 FULL | Price Determination | 66–80h | Matching algorithm + rules engine UI |
| PD-329 FULL | Audit Logs | 22–29h | Complete tracking + compliance reports + export |
| PD-331 FULL | Bulk Editing | 29–37h | Excel import/export + preview + validation |
| PD-328 FULL | Scheduled Updates | 26–33h | Automated scheduling + preview + rollback |
| PD-34 FULL | Default Weights | 29–37h | Complete weight configuration system |

**Sprint 5 total estimate:** ~307–387h (AI-assisted, shared across Sprint 5–6)

---

## Dependencies

- All Sprint 4 MVPs must be merged and stable before FULL upgrades begin
- Price Determination (PD-322 FULL) is the most complex item and should be started in Week 1 — it has the longest estimate and blocks Sprint 6 conditional pricing work
