---
slug: products-and-pricing-explainer
title: PM Products & Pricing Overview
category: overview
order: 0
description: Plain-language explainer of what the Products & Pricing module is, why it exists, and how it works end to end.
related: []
tags:
  - products
  - pricing
  - overview
---

# Products & Pricing — What It Is, Why It Exists, and How It Works

---

## The Big Picture

Before WasteHero can charge a customer anything, it needs to know three things:

1. **What service was delivered?** — the Product
2. **How much does it cost for this specific customer?** — the Price List
3. **Did anything extra happen during the service?** — Additional Services

The Products & Pricing module is the system that manages all of this. It is the foundation that every other module — invoicing, logistics, the driver app, the customer portal — depends on. Without it, there is nothing to bill.

---

## The Building Blocks

### 1. Categories — "What kind of thing is this product?"

Before you can create a product, you need to tell the system what type of product it is. A category defines the **structure** of a product — what fields it has, what information it carries.

There are 5 category types:

| Type | What it represents | Example |
|---|---|---|
| **Service** | A collection or treatment service | Mixed waste bin emptying |
| **Container** | A physical container or bin | 240L bio-waste container |
| **Additional** | An extra service added on top | Extra container wash, cancellation trip |
| **One-Off** | A single charge, not recurring | Bin delivery fee, setup fee |
| **Recurring** | A periodic fixed charge | Annual base fee |

**Why do we need categories?**
Because a service product and a container product have completely different fields. A service needs EWC codes, R/D codes, waste direction, and YLVA reporting settings. A container needs volume, dimensions, and container type. A one-off fee needs none of these. Categories let the system show only the relevant fields for each product type, keeping the interface clean and the data accurate.

---

### 2. Products — "The actual thing being sold"

A product is a specific service or item that can be ordered by a customer and billed. It is built on top of a category, inheriting its field structure.

Every product has:
- A name and product code
- A category (which defines its fields)
- A status (active/inactive)
- Portal visibility (can the customer see and order it themselves?)
- Compliance settings (transfer document obligation, YLVA reportable, weighbridge assignment)

**Why do we need products?**
Because without a product catalog, every order is a manual, ad-hoc entry. Products give the system a reusable, consistent definition of what is being delivered — which feeds into price lists, contracts, invoices, driver tasks, and reporting.

---

### 3. Bill of Materials — "What is this product made of?"

Some products are simple — a bin emptying is a bin emptying. But others are composed of multiple chargeable parts. The Bill of Materials (BOM) lets you define those parts.

**Example:**
> "Bio-waste Bin Emptying" = Base fee + Transport fee + Weighing fee

Each component has its own unit and price. At the time an order is placed, the system walks through the components and sums them into a total.

**Why do we need BOM?**
Two reasons:
1. It allows transparent, itemised invoices — the customer sees exactly what they are paying for, broken down into components
2. It allows complex products to be managed without creating dozens of separate products. You update one component and it flows through to all products that use it

---

### 4. Additional Services — "What extras happened during the service?"

Additional services are charges that can be added on top of a product — either automatically or manually by the driver.

**Examples:**
- Locked gate fee — the driver could not access the bin
- Extra container wash — the customer requested a deep clean
- Cancellation trip — the driver arrived but the job was cancelled
- Weighing fee — automatically added whenever weighing occurs

Some additional services affect the price, others are informational only (for example, a bin inspection that does not carry a charge).

**Why do we need additional services?**
Because not every collection event is identical. The base product covers the standard service, but real-world collections involve exceptions. Additional services let the system capture those exceptions and bill for them correctly without changing the base product.

---

### 5. Service Levels — "How urgent is this service?"

Service levels define the urgency tiers available for a product. The most common are:

- **Standard** — collected on the normal scheduled rhythm
- **Spot** — collected at a time chosen by the customer
- **Express** — collected immediately or same-day

**Why do we need service levels?**
Because urgency costs more. A customer who needs their bin emptied today pays more than one who is fine waiting for the next scheduled collection. Service levels feed into the price list — the same product can have a different price depending on the urgency tier selected on the order.

---

### 6. Waste Fractions — "What type of waste is this?"

A waste fraction is a classification of the waste type — mixed waste, bio-waste, paper, hazardous waste, sludge, etc. Each waste fraction is linked to an EWC code (European Waste Catalogue), which is a legally required classification in Finland.

**Why do we need waste fractions?**
They are required for:
- Regulatory reporting to YLVA (Finland's waste reporting system)
- Transfer documents — legally required for certain waste types
- Product schema — a product's waste fraction determines what R/D codes and hazardous waste properties apply

---

### 7. Zones — "Where is the customer?"

A zone is a geographic area drawn on a map. An admin draws a polygon on the map, names it (e.g. "Urban", "Rural", "Zone 231"), and the system automatically assigns any property within that polygon to that zone.

**Why do we need zones?**
Because location affects price. Collecting waste from a rural area costs more than from an urban area due to transport distance. Instead of creating separate products for each area, zones are used as a matching attribute in the price list — the same product has different prices depending on which zone the property falls in.

---

### 8. Price Lists — "What does it cost for this customer?"

A price list contains rows that map a product to a price based on a combination of conditions. The conditions used for matching are:

- **Product** — which product is being ordered
- **Customer type** — private, business, etc.
- **Zone** — which geographic area the property is in
- **Service responsibility** — municipal, market-based, secondary
- **Service level** — standard, spot, express
- **Timing** — weekend or holiday pricing

Each row in the price list stores a price and a unit (per ton, per collection, per m³, etc.).

**Why do we need price lists?**
Because the same product costs different amounts for different customers. A private household in an urban area under municipal service responsibility pays a different price than a business in a rural area under market-based responsibility. The price list handles all of these variations without needing separate products for each combination.

---

### 9. The Price Determination Algorithm — "Which price row wins?"

When an order comes in, the system needs to find the right price row from the price list. It does this by:

1. **Disqualifying** any row whose specific conditions do not match the event (e.g. a row for "Business" customers is disqualified if the customer is "Private")
2. **Scoring** the remaining rows by counting how many conditions are an exact match ("Any" wildcards score 0 but do not disqualify)
3. **Selecting** the row with the highest score
4. **Tiebreaking** by lowest price if two rows have the same score

This means a row with all conditions matching always wins over a generic fallback row — even if the fallback has a lower price.

---

### 10. Pricing Units — "What unit is the price expressed in?"

Pricing units define how a price is measured. The 6 units available are:

| Unit | Symbol | Use case |
|---|---|---|
| Kilogram | kg | Weight-based pricing — requires weighing |
| Cubic Meter | m³ | Volume-based pricing |
| Liter | l | Liquid waste |
| Hour | h | Time-based services |
| Meter | m | Length-based services |
| Piece | pcs | Per collection or per item |

These are defined by the EU PEPPOL e-invoicing standard and are a fixed list — admins cannot create new unit types.

---

### 11. Scheduled Price Updates — "When does the new price take effect?"

Admins can enter future price changes before they take effect. A new price row can be created with an effective date in the future, and the system will automatically switch to the new price on that date. Price changes can also be temporary — with both a start and an end date.

**Why do we need this?**
Because price changes in municipal waste management are often agreed months in advance — tied to annual tariff reviews or contract renewals. The system needs to be able to hold both the current and future price simultaneously.

---

### 12. Price Logs — "What changed and when?"

Every change to a price list is recorded with the previous value, the new value, who made the change, and when. This is a read-only audit trail.

**Why do we need this?**
Regulatory compliance and dispute resolution. If a customer questions why their price changed, the system must be able to show exactly when the change was made and by whom.

---

## How It All Fits Together

```
Category
  └── defines the schema (fields) for...
      Product
        ├── Bill of Materials (what components make up the price)
        ├── Additional Services (what extras can be added)
        └── Service Levels (what urgency tiers are available)
            │
            └── feeds into...
                Price List
                  ├── Zone (where is the property?)
                  ├── Customer Type (who is the customer?)
                  ├── Service Responsibility (municipal or market-based?)
                  ├── Service Level (how urgent?)
                  └── Timing (weekend or holiday?)
                      │
                      └── Price Determination Algorithm picks the right row
                          │
                          └── Billing Event is created with the price breakdown
                              │
                              └── Invoice is generated (consolidated or itemised)
```

---

## Key Design Decisions

**Categories drive schema, not products directly.** This means you never have to update 200 products individually when a field changes — you update the category schema once.

**Price lists are separate from products.** The same product can appear in multiple price lists (e.g. one for municipal customers, one for market-based customers). This avoids duplicating products just to have different prices.

**"Any" in a price row is a wildcard fallback, not a match.** A row that says "Any / Any / Any" is the last resort — it only wins if no more specific row qualifies. A low price on the fallback row never beats a specific match.

**Pricing units are fixed by EU standard.** Admins can select which unit applies to a product but cannot create new unit types. The list is defined by PEPPOL.

**Bill of Materials is optional.** A product can have a single flat price (via price list row) or a composite price (via BOM). Not both. Simple products use the price list, complex multi-component products use the BOM.
