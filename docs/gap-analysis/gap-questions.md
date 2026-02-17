---
title: "Gap Analysis Questions"
slug: "gap-questions"
category: "gap-analysis"
order: 2
description: "Key clarification questions for product stakeholders regarding WH 2.0 gaps, organized by priority."
related:
  - "wh1-vs-wh2-gaps"
  - "sprint-breakdown"
tags:
  - "gaps"
  - "questions"
  - "stakeholders"
  - "requirements"
---

# Questions Regarding WH 2.0 Gaps

**Date:** January 20, 2026
**Purpose:** Key clarifications needed from product/stakeholders
---

## Gap 1: Contract Flexibility

**Reference:** PD-330

### Questions:

**Q1.1:** If a contract is linked to a property, does this mean that customers associated with that property can also have their own contracts?

**Q1.2:** If so, how do these contracts interact?
- Do contracts override each other?
- Or can both exist simultaneously?

**Q1.3:** Can a customer have a customer-level contract and still be assigned to a property?

**Q1.4:** Is it possible for the same customer to have two contracts at the same time: one at the property level and one at the customer level?

**Priority:** 🔴 Critical - Affects data model and pricing logic

---

## Gap 2: Property Pools & Shared Services

**Reference:** PD-348

### Questions:

**Q2.1:** A property pool can contain multiple properties, and a property can have multiple customers. Is the invoice generated at the property pool level and then split by property and customer?

### Our interpretation from PD-348:
Based on the PD text, it seems likely that invoicing is handled at the **PROPERTY level**, not at the pool level. The PD states: "Property A is invoiced for 50% of the collection costs, Property B for 30%, and Property C for 20%."

However, this needs confirmation.

**Priority:** 🔴 Critical - Affects billing architecture

---

## Gap 3: Price Determination with Multiple Conditions

**Reference:** PD-322, PD-330

### Questions:

**Q3.1:** No major questions here, just need to implement dynamic pricing. This does not exist in WH 1.0.

**Priority:** 🔴 Critical - Core pricing engine redesign

---

## Gap 4: Contractor Pricing & Performance

**Reference:** PD-313, PD-314, PD-317

### Questions:

**Q4.1:** Do all services require "Contractor prices independent of customer prices"?
- Or only specific service types?
- Are there services where customer price = contractor price?

**Priority:** 🔴 Critical - Affects scope of contractor pricing module

---

## Gap 5: Bulk Price Management

**Reference:** PD-328, PD-331

### Questions:

**Q5.1:** If you schedule Price Change A (effective Jan 1 - Mar 31) and then schedule Price Change B (effective Feb 1 - Apr 30), what happens in the February-March overlap?
- Does Price Change B override Price Change A during overlap?
- Are they compounded?
- Is this scenario blocked/prevented?

**Priority:** 🟡 High - Affects scheduling logic

---

## Gap 6: Discounts & Promotions

**Reference:** PD-321

### Questions:

**Q6.1:** Can you have MULTIPLE discounts on the same product/contract?

**Example scenario:**
- 10% customer loyalty discount + 5% seasonal promotion
- Result: 15% total (additive) or compounded calculation?

**Q6.2:** What exactly is an "event" in the context of "event-level discounts"?
- A single waste collection?
- A ticket/service request?
- A billing event?

**Q6.3:** If a customer has a product discount AND a contract discount, which applies?
- Product discount?
- Contract discount?
- Both (stacked)?
- Highest discount wins?

**Priority:** 🟡 High - Affects discount calculation logic

---

## Gap 7: Product Configuration & Flexibility

**Reference:** PD-40, PD-39, FR-79

### Questions:

**Q7.1:** How many levels deep can a Bill of Materials (BOM) go?

**Example:**
- Product A contains Product B, which contains Product C
- Is there a limit? (1 level, 2 levels, unlimited nesting?)

**Q7.2:** Does product price = sum of component prices?
- Or can product price be independent of component costs?
- Can you set a markup on component total?

**Example:**
```
Product: "Premium Package" = DKK 2,000
BOM Components:
├─ Container: DKK 400
├─ Collection: DKK 1,000
└─ Maintenance: DKK 300
= Component total: DKK 1,700

Can product price be DKK 2,000 (with DKK 300 margin)?
Or must it equal DKK 1,700 (auto-calculated)?
```

**Priority:** 🟡 High - Affects product data model and pricing

---

## Gap 8: Service Scheduling & Seasonal Variations

**Reference:** PD-248, PD-342, PD-343

### Questions:

**Q8.1:** Can customers define their own seasonal dates and frequencies?

### Our interpretation from PD-342:
Based on the PD text, it seems likely that customers can define their own seasonal schedules. The PD mentions "seasonal exceptions to a customer's collection cadence for specific time intervals."

However, this needs confirmation on the level of customization allowed.

**Priority:** 🟢 Medium - Affects scheduling UI/UX

---

## Gap 9: Additional Services & Add-ons

**Reference:** PD-38

### Questions:

**Q9.1:** Can additional services be purchased independently, or only with a main product?
- Standalone purchase allowed?
- Or always tied to a base product?

**Q9.2:** Driver verification workflow clarification:
> "As a driver, I want to verify the necessity of an additional service on-site before billing."

**Scenario understanding:**
1. Office adds an additional service to a customer's order
2. Before the customer gets charged, the driver checks on-site if the service is actually needed
3. Driver can approve/reject the service before billing

**Question:** Is this understanding correct?

**Priority:** 🟢 Medium - Affects driver mobile app workflow

---

## Gap 10: Service Responsibility & Compliance

**Reference:** PD-35

### Questions:

**Q10.1:** Event-level override capability:
- Event level = Actual transaction/collection event?
- **WHO can perform event-level overrides?** (Not specified in PD)
  - Based on user role?
  - Any customer service user?
  - Requires manager role?

**Q10.2:** Does event-level override require approval?
- Automatic override allowed?
- Or approval workflow needed?
- Not stated in PD - need clarification

**Priority:** 🟢 Medium - Affects permissions and workflow

---

## Summary: Priority Matrix

| Gap | Questions | Priority | Blocking Design? |
|-----|-----------|----------|------------------|
| Gap 1: Contract Flexibility | 4 questions | 🔴 Critical | ✅ Yes |
| Gap 2: Property Pools | 1 question | 🔴 Critical | ✅ Yes |
| Gap 3: Price Determination | No major questions | 🔴 Critical | ❌ No |
| Gap 4: Contractor Pricing | 1 question | 🔴 Critical | ✅ Yes |
| Gap 5: Bulk Price Management | 1 question | 🟡 High | ⚠️ Partial |
| Gap 6: Discounts & Promotions | 3 questions | 🟡 High | ⚠️ Partial |
| Gap 7: Product Configuration | 2 questions | 🟡 High | ✅ Yes |
| Gap 8: Seasonal Scheduling | 1 question | 🟢 Medium | ❌ No |
| Gap 9: Additional Services | 2 questions | 🟢 Medium | ⚠️ Partial |
| Gap 10: Service Responsibility | 2 questions | 🟢 Medium | ⚠️ Partial |

---

## Next Steps

### Immediate (Blocking Design):
1. **Gap 1:** Resolve contract hierarchy (customer vs property level)
2. **Gap 4:** Clarify scope of contractor pricing (all services or selective?)
3. **Gap 7:** Define BOM depth limits and pricing calculation rules

### High Priority (Affects Implementation):
4. **Gap 5:** Define scheduled price change overlap behavior
5. **Gap 6:** Define discount stacking rules

### Medium Priority (Can Be Design Decisions):
6. **Gap 9:** Clarify add-on purchase independence
7. **Gap 10:** Define override permissions and approval requirements

---

**Document Status:** Ready for stakeholder review and feedback
