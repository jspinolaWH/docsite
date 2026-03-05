---
slug: sprint-6-overview
title: Sprint 6 Overview
category: sprint-planning
order: 6
description: Conditional pricing engine, FULL price changes, discounts, timing and speed pricing, WH 2.0 integration, and production readiness — final release (May 11-22)
related:
  - sprint-5-overview
  - delivery-plan-overview
  - pricing-model-overview
tags:
  - sprint-6
  - conditional-pricing
  - discounts
  - integration
  - production
  - release-3
  - PD-320
  - PD-321
  - PD-323
  - PD-324
---

# Sprint 6 Overview

**Dates:** May 11–22, 2026
**Release:** Release 3 — Pricing Engine + Integration (deploys May 22) 🎉
**Team:** 4 Engineers (2 Frontend, 2 Backend)

---

## Sprint Goals

Deliver conditional pricing — the ability for a single product to have multiple prices based on customer type, zone, service responsibility, and R/D code. Add all pricing modifier MVPs (discounts, timing surcharges, speed pricing). Integrate the pricing engine end-to-end with WH 2.0 (orders, properties, customers). Ship production-ready.

---

## Deliverables

### Conditional Pricing

The centrepiece of Release 3. One product can have multiple price rows, each with different conditions. The system automatically selects the right price when an order is placed.

**Example — "Mixed Waste Collection":**

| Customer Type | Zone | Service Responsibility | Price |
|---------------|------|------------------------|-------|
| Private | Urban | Municipal | €50/ton |
| Business | Urban | Municipal | €70/ton |
| Business | Rural | Any | €80/ton |
| Any | Any | Any | €60/ton (fallback) |

When a Business customer in Urban zone places an order with Municipal responsibility, the system picks Row 2 → **€70/ton** automatically.

### Advanced Pricing (all FULL scope)

| Feature | Full Implementation |
|---------|---------------------|
| **Price Changes (PD-320 FULL)** | History tracking + price comparison + rollback to previous values |
| **Discounts (PD-321 FULL)** | Contract-based + volume + loyalty discount types |
| **Timing Pricing (PD-323 FULL)** | Holiday calendar + custom schedules + exception handling |
| **Speed Pricing (PD-324 FULL)** | Express + same-day + emergency pricing tiers |

### WH 2.0 Integration

End-to-end integration with the WasteHero 2.0 platform:

| System | Integration |
|--------|-------------|
| **Orders** | Pricing engine feeds the correct price into order creation automatically |
| **Properties** | Property coordinates used for real-time zone detection |
| **Customers** | Customer type used as a pricing condition during price selection |

### Production Readiness

- Security review and hardening
- Performance testing and optimisation
- Full localisation
- Final QA sign-off

---

## Timeline

| Week | Dates | Focus |
|------|-------|-------|
| Week 1 | May 11–15 | Conditional pricing UI, Price Changes, Discounts, Timing Pricing, Speed Pricing |
| Week 2 | May 18–22 | WH 2.0 integration, security, performance, localisation, final QA, deploy |

**Deploy Date:** May 22, 2026 🎉

---

## Ticket Mapping

| Ticket | Scope | Estimate | Description |
|--------|-------|----------|-------------|
| PD-320 FULL | Price Changes | 36–48h | History tracking + comparison + rollback |
| PD-321 FULL | Discounts | 34–46h | Contract-based + volume + loyalty discounts |
| PD-323 FULL | Timing Pricing | 32–40h | Holiday calendar + custom schedules + exceptions |
| PD-324 FULL | Speed Pricing | 28–38h | Express + same-day + emergency pricing |

**Sprint 6 total estimate:** ~130–172h (ticket work) + integration and production hardening | **Capacity:** 240h

---

## Business Impact

After Release 3 deploys on May 22:

- **Customer service** gets automatic correct pricing in every order — no manual lookup
- **Admins** can manage hundreds of products with bulk editing, scheduled updates, and full audit trails
- **Compliance** is covered — complete audit log of every price change with timestamp and actor
- **Integration** — WasteHero 2.0 orders, properties, and customers are fully connected to the pricing engine

---

## Success Criteria

- ✅ Admin creates a price list with 4 condition-based prices
- ✅ System automatically selects correct price for Business customer in Urban zone
- ✅ Admin bulk-updates all Urban prices by +10% (preview → apply)
- ✅ Admin schedules a price increase for May 1
- ✅ Audit log shows all changes with timestamps and actor names
- ✅ Integration with WH 2.0 working end-to-end
- ✅ Security and performance checks passed
- ✅ 0 P0 bugs, fewer than 5 P1 bugs
- ✅ **Deployed to production** 🎉

---

## Deferred to Release 4+

The following feature is explicitly out of scope for Release 3:

| Feature | Note |
|---------|------|
| Product Bundles | Deferred entirely — significant complexity, no business pressure for R3 |

> **Note:** Features previously considered for deferral — bulk Excel import/export, contract-level discounts, holiday pricing, and emergency speed pricing — are all delivered as FULL implementations in Release 3 (Sprints 5–6).
