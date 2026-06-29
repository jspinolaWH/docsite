---
slug: product-agreement-model
title: Product Agreements — Simplified Model
category: inv-arch
order: 4
description: How a waste container product gets priced and added to a property — splitting the 4-part product into product (fraction + size) vs price dimensions (property type + derived pickup setting), reusing the existing price engine with one new pickup-rule pre-step.
related:
  - pp-integration-tasks
  - pjh-invoicing-module-analysis
tags:
  - invoicing
  - products-pricing
  - agreements
  - pricing
  - architecture
---

# Product Agreements — Simplified Model

How a waste container product gets priced and added to a property.

## The problem today

A "product" is a pre-built combination of **4 things**:

> waste fraction × container type × pickup setting × property type

Every combination becomes its own product, so users scroll through
**thousands** of near-identical entries just to add one container. It does
not match how people actually think about their waste agreements.

## The new model

We split the 4 things into two groups: what *defines* a product, and what
*affects its price*.

| Concept | Role | Lives on |
| --- | --- | --- |
| **Waste fraction** | defines the product | Product |
| **Container size** | defines the product | Product |
| **Property type** | affects the price | From the property (context) |
| **Pickup setting** | affects the price | **Derived** (not chosen) |

So:

- **Product** = *waste fraction + size* → e.g. **"Glass 660L"**.
  One product = one waste fraction.
- **Price list** = `product × property type × pickup setting → price`.
  Same product can cost different amounts depending on property type and
  pickup frequency. Rows can use wildcards (e.g. *any property type*), so one
  row prices many properties.
- **Agreement** = this product, on this property, at the resolved price.

This collapses the catalog from *thousands of combinations* down to roughly
*(waste fractions × sizes)* — a short, understandable list.

## Adding a product to a property

```
1. Waste fraction   →  the starting point ("I need glass collection here")
2. Container size    →  together these pick (or create) the product
3. Property type     →  already known from the property you're on
4. Pickup setting    →  DERIVED automatically (never asked)
5. Price             →  resolved from the price list; internally overridable
```

If the product doesn't exist yet, the user is prompted to create it (waste
fraction + size). If no matching price exists, they're prompted for a price —
which becomes a reusable price-list row. **Both are internal-only actions** —
see Portal below.

## How it works behind the scenes

The price engine already does "most-specific-rule-wins" matching (NULL = "any",
a contradicting condition disqualifies a row, more specific matches win). The
new model reuses that exact logic and adds **one pre-step**: deriving the
pickup setting.

```
INPUT
   waste fraction + size   →  selects the PRODUCT
   property                →  gives PROPERTY TYPE (context, not asked)

STEP 1 — derive pickup setting        (the new pre-step)
   Look up a rule table keyed on (waste fraction × property type):
     • most-specific matching rule wins   (NULL = "any")
     • fall back to the fraction's default if no specific rule
   Constrain by the waste fraction's emptying interval [min, max]:
     • the result must sit within [min, max]
     • anything outside is clamped to the nearest allowed bound
   → resolved PICKUP SETTING            (never shown to the customer)

STEP 2 — resolve price                 (existing engine)
   candidate rows = price rows for this product
   score each against { property type, pickup setting }
     • NULL = any, contradiction = disqualified
     • winner = highest score → lowest price → earliest
   add service level / BOM / surcharges
   → final YEARLY price + breakdown

OUTPUT
   product + price
```

### Emptying interval (min / max)

Every waste fraction defines an allowed emptying interval range
(`emptying_interval_min` / `emptying_interval_max`). This range is the
**guardrail** for frequency:

- The derived pickup setting must fall **within** the fraction's [min, max].
- A derived (or internally overridden) value outside the range is clamped to
  the nearest bound — you can never end up with an illegal/uneconomic
  frequency for that fraction.

### Worked example

> Customer on a **Residential** property picks **Glass**, **660L**.
> - Product resolved: "Glass 660L".
> - **Step 1:** rule table → *(Glass × Residential)* = every 4 weeks, and
>   4 weeks is inside Glass's [min, max] → kept.
> - **Step 2:** price rows for "Glass 660L" → the *Residential / any* row at
>   **€480/yr** beats the *any/any* catch-all at €600/yr (higher score).
> - **Shown:** "Glass 660L — €480/year." No frequency dropdown.

## Order lifecycle (portal → platform → route)

The derived pickup setting is a **suggestion on the ticket**, not a hard
commitment — a human stays in control until the order becomes real.

```
1. Portal      customer orders (waste fraction + size = product)
               → a ManageContainerTicket (ADD_CONTAINER) is created

2. Derivation  suggested PICKUP SETTING + COLLECTION CALENDAR stamped on the
               ticket; price resolves from that suggestion

3. Platform    ticket lands in the queue PRE-FILLED with the suggestion;
               staff review

4. Edit window staff can change pickup setting / collection calendar on the
               ticket — up until it is COMPLETED or MOVED TO A ROUTE
                 • change stays within the fraction's emptying [min, max]
                 • price RE-RESOLVES on change (unless explicitly overridden)

5. Completion  the values on the ticket lock in → the container is created
   / routing   and the ProductAgreement is written (product + property +
               final pickup setting + agreed price)
```

So the suggestion is editable while the ticket is open, and only becomes a
committed agreement at completion / routing.

## Pricing display

- **Minimum:** show the final **calculated yearly price**.
- **Optional:** a yearly / monthly / weekly toggle — but only if the engine
  truly computes per period (don't divide a yearly number and pretend).

## Portal (customer self-service)

The portal uses the same engine, so the model makes self-service genuinely
usable. Rules:

- **Consumption-only.** Customers can order existing products flagged
  `portal_visibility` + `self_service_ordering`. They can never create
  products or invent prices (that's internal-only).
- **Pickup setting is fully derived and invisible** — the customer never
  chooses frequency. Non-standard frequency = "contact us", not self-service.
- **A price must resolve** for a product to be self-service orderable. Keep a
  wildcard `any/any` catch-all row so portal-visible products always price.
- **No overrides in the portal** — the customer always gets the engine price
  as-is. Override is a back-office action only.

## What changes vs the current build

The pricing engine already works the right way: prices are keyed on the
**product** with wildcard conditions, and a determination engine computes the
final price. The adjustments to match this model:

1. **Move pickup setting off the product.** Today it's baked into product
   identity; here it's *derived* per agreement, not stored on the product.
2. **Use property type + pickup setting as the price dimensions** (the engine
   currently varies by zone / customer type / service responsibility / service
   level).
3. **Add the pickup-rule table** (waste fraction × property type → pickup
   setting), bounded by the fraction's emptying interval [min, max]. This is
   the one genuinely new piece; everything downstream is the existing engine.
