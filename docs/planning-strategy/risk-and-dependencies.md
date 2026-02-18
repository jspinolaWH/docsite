---
slug: risk-and-dependencies
title: Risks, Dependencies & Open Questions
category: planning-strategy
order: 2
description: Risk register, critical external dependencies, and open decisions that need answers before each release
related:
  - delivery-plan-overview
  - sprint-1-overview
  - sprint-3-overview
tags:
  - risks
  - dependencies
  - decisions
  - geospatial
  - ewc
---

# Risks, Dependencies & Open Questions

---

## Risk Register

| Risk | Original Level | Current Level | Mitigation |
|------|---------------|---------------|------------|
| Infrastructure blocker (Week 1) | 🟡 Medium | 🟢 Low | Pre-sprint setup confirmed Feb 24–28 |
| Geospatial setup complexity | 🟡 Medium-High | 🟢 Low | Using existing `geospatial-data-service` (MongoDB) — no PostGIS |
| Sprint 4 complexity | 🟡 Medium-High | 🟢 Low | MVP-split strategy — manageable scope per sprint |
| Small team vs timeline | 🟡 Medium | 🟡 Medium | ~40h buffer from pre-setup; Release 1 has 105–176h buffer |
| Pricing algorithm complexity | 🟡 Medium-High | 🟡 Medium | Starting with data model MVP in Sprint 4, full algorithm in Sprint 5 |

**Overall risk level:** Reduced from 🟡 Medium to 🟢 Low for Releases 1–2.

---

## Capacity Buffers

| Release | Estimated (AI-assisted) | Capacity | Buffer |
|---------|------------------------|----------|--------|
| Release 1 (Sprints 1–2) | 304–375h | 480h | 105–176h |
| Release 2 (Sprints 3–4) | 328–425h | 480h | 55–152h |
| Release 3 (Sprints 5–6) | 372–473h | 480h | 7–108h |

Release 1's buffer can carry forward to Release 2 if needed.

---

## Critical Dependencies

### Geospatial Data Service

| Item | Detail |
|------|--------|
| **Service name** | `geospatial-data-service` (formerly `address-location-service`) |
| **Technology** | MongoDB with geospatial queries |
| **Owner** | TBD — contact person needed |
| **Docs needed by** | March 27 (end of Sprint 2) |
| **Critical for** | Sprint 3 map-based zone drawing, Sprint 4 zone detection at runtime |

**What we need from the owning team:**

- API endpoint documentation
- GeoJSON format specifications
- Point-in-polygon endpoint details
- Test environment access
- Contact person for escalation during Sprint 3–4

**Risk if delayed:** Sprint 3 map-based zone work is blocked. This could delay Release 2 (April 24 deploy).

---

## Open Questions

### 1. Service Responsibility: Metadata or Pricing Driver?

**Decision needed by:** March 6, 2026 (Sprint 1 Week 1)

**Issue:** Acceptance criteria states service responsibility "does NOT affect pricing," but mockups show it as a pricing condition in the price determination UI.

| Option | Scope | Effort |
|--------|-------|--------|
| **A — Metadata only** | Simple dropdown, no pricing engine impact | ~2 weeks |
| **B — Pricing condition** | Integrated into price determination matching | ~4 weeks |

**Impact:** This decision changes the Sprint 5 FULL upgrade scope for PD-35. If Option B, Sprint 5 needs to add pricing condition integration on top of the MVP dropdown.

---

### 2. EWC Code Validation Scope

**Decision needed by:** Sprint 1 start (March 2)

**Current plan:** Format validation only — check that the code follows the 8-digit EWC format.

| Option | Description |
|--------|-------------|
| **A — Format validation** | 8-digit format check only *(current plan — recommended)* |
| **B — Registry validation** | Validate against the official EU EWC registry (requires external integration) |

**Confirmation needed:** Is Option A sufficient for compliance requirements? Option B would require an integration that is not currently scoped.

---

### 3. Default Weights (PD-34) Scope

**Issue:** The ticket is marked "Low" priority, but a developer flagged during estimation that the scope is larger than it appears.

**Action:** Technical spike during Sprint 1 Week 1 (March 6) to re-estimate.

**Impact:** If the revised estimate is significantly higher, the ticket may need to shift from Sprint 5 into Sprint 6, or be descoped to a smaller MVP.
