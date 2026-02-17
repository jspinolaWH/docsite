---
slug: pricing-model-overview
title: Pricing Model Overview
category: concepts
order: 1
description: How WasteHero 2.0 handles complex pricing with multi-condition matching, zones, and dynamic surcharges
related:
  - product-types-explained
  - waste-fractions-explained
tags:
  - pricing
  - price-lists
  - zones
  - conditions
  - surcharges
---

# Pricing Model Overview

How WasteHero 2.0 handles complex pricing with multi-condition matching.

---

## The Core Problem

**Question:** How do we price waste collection when the same service costs different amounts for different customers?

**Real example:**
You offer "Mixed Waste Collection" but:
- Private households pay €50/ton (municipal contract)
- Businesses pay €70/ton (commercial rate)
- Rural areas pay €85/ton (longer drive)
- Express service costs €40 more (urgent)

**The problem:** ONE service, MANY different prices!

---

## The Old Way (Doesn't Work)

**Create separate products for every price variation:**
- "Mixed Waste - Private Urban" = €50
- "Mixed Waste - Business Urban" = €70
- "Mixed Waste - Private Rural" = €85
- "Mixed Waste - Business Rural" = €95
- ... 50+ duplicate products! ❌

**Problems:**
- Duplicate products everywhere
- Hard to maintain
- Confusing for users
- Not how municipal tariffs work

---

## The New Way (Price Lists with Conditions)

### Step 1: Create Price List (Container)

**What it is:** A catalog that holds products with their prices

**Example:**
- Name: "Municipal Price List 2026"
- Valid: January 1 - December 31, 2026
- Applied to: Municipal customers

**From PD-330:**
> "Support unlimited number of different price lists"

---

### Step 2: Add Product with Multiple Price Rows

**One product = Multiple prices with different conditions**

**Product:** "Mixed Waste Collection"

**Create price rows:**

| Row | Customer Type | Zone | Service Resp. | R/D Code | Price |
|-----|---------------|------|---------------|----------|-------|
| 1 | Private | Urban | Municipal | R1 | €50/ton |
| 2 | Business | Urban | Municipal | R1 | €70/ton |
| 3 | Any | Rural | Any | R1 | €85/ton |
| 4 | Any | Any | Any | Any | €60/ton (fallback) |

**From PD-322:**
> "Define multiple prices for the same product based on product's attributes"

**Each row has 4 condition attributes:**
- **Customer Type:** Private, Business, Industrial, or Any (wildcard)
- **Zone:** Geographic area (Urban, Suburbs, Rural) or Any
- **Service Responsibility:** Municipal, Market-based, TSV, or Any
- **R/D Code:** Processing method (R1, R3, D1) or Any

---

### Step 3: System Picks the Right Price

**Example order:**
- Customer: Business
- Location: Urban zone (55.68, 12.56)
- Responsibility: Municipal
- R/D Code: R1

**Matching process:**

**From PD-330:**
> "When retrieving a price:
> 1. The system checks if there is a row where ALL the requested attributes match
> 2. If an exact match is found, that row is selected
> 3. If NO exact match is found, the row with the HIGHEST NUMBER of matching attributes is selected"

**Check each row:**
- Row 1: Private ≠ Business ❌ (0 matches)
- **Row 2: Business ✓ + Urban ✓ + Municipal ✓ + R1 ✓ (4/4 perfect match!)**
- Row 3: R1 matches (1 match)
- Row 4: All wildcards (0 specific matches)

**Result:** Use Row 2 → **€70/ton**

---

## The 4 Pricing Conditions

### 1. Customer Type (PD-322)

**From PD-322:**
> "I want the same product to set separate prices for different customer categories"

**Values:**
- Private (residential customers)
- Business (commercial customers)
- Industrial (factories, large operations)
- Any (wildcard - matches all)

**Example:**
- Private customers: €50
- Business customers: €70

---

### 2. Zone (PD-325)

**From PD-325:**
> "I want the price of a product to be determined by the zone in which the customer is located"

**What zones are:**
- Geographic areas drawn as polygons on a map
- Urban, Suburbs, Rural, etc.
- System checks customer coordinates → Determines zone

**Example:**
- Urban zone: €50 (dense, efficient routes)
- Rural zone: €85 (spread out, longer drives)

**From PD-325:**
> "Zone is defined as a geographical region based on coordinates"

---

### 3. Service Responsibility (PD-35)

**What it is:** Legal/financial framework for waste service

**From PD-35:**
> "Service responsibility can be determined product- and customer-specific"

**Values:**
- Municipal (publicly funded for residential)
- TSV (business with municipal obligations)
- Market-based (commercial pricing)
- Custom (company-defined)
- Any (wildcard)

**Example:**
- Municipal responsibility: €50 (regulated pricing)
- Market-based: €65 (commercial pricing)

---

### 4. R/D Code (PD-39)

**What it is:** Processing method for the waste

**From PD-39:**
> "Products can have: EWC / LoW R/D codes"

**Values:**
- R1, R3 (recycling methods)
- D1, D10 (disposal methods)
- Any (wildcard)

**Example:**
- R1 (recycling): €50 (can sell recycled material)
- D1 (landfill disposal): €70 (must pay disposal fee)

---

## Matching Algorithm Deep Dive

### Example 1: Perfect Match

**Customer attributes:**
- Type: Business
- Zone: Urban
- Responsibility: Municipal
- R/D: R1

**Available rows:**
- Row: Business + Urban + Municipal + R1 = €70

**Result:** All 4 match → Use €70 ✅

---

### Example 2: No Perfect Match (Fallback)

**Customer attributes:**
- Type: Industrial
- Zone: Suburbs
- Responsibility: Custom
- R/D: R3

**Available rows:**
- Row 1: Business + Urban + Municipal + R1 → 0 matches ❌
- Row 2: Any + Suburbs + Any + R1 → 1 match (Suburbs) ⚠️
- Row 3: Any + Any + Any + R3 → 1 match (R3) ⚠️
- Row 4: Any + Any + Any + Any → 0 specific ❌

**From PD-330:**
> "If NO exact match is found, the row with the HIGHEST NUMBER of matching attributes is selected"

**Result:** Row 2 and Row 3 tied at 1 match

**Tie-breaking (PD-330):**
> "In case of a tie, additional logic may apply, such as 'select first' or 'select lowest price'"

**Result:** Select lowest price → Row 2 (€75) vs Row 3 (€78) → Use €75

---

## Beyond Base Price: Surcharges

**Base price is just the starting point. Add surcharges:**

### Service Speed (PD-37, PD-324)

**From PD-324:**
> "Prices determined according to the speed of the service"

**Options:**
- Scheduled (7 days): +€0
- On-demand (3 days): +€20
- Express (1 day): +€40
- Emergency (same day): +€70

**Customer selects speed when ordering**

---

### Time-Based Surcharges (PD-323)

**From PD-323:**
> "Price of a service to vary based on the delivery time"

**Options:**
- Weekday: +€0
- Weekend: +€10
- Holiday: +€25

**System checks service date automatically**

---

### Additional Services (PD-38)

**Optional extras added during service:**
- Extra wash: +€15 (manual)
- Cancellation fee: +€25 (automatic)
- Difficult access: +€10 (driver-initiated)

**From PD-38:**
> "Additional services that can be added to products"

---

## Complete Price Calculation

### Example Order:
- **Customer:** Business in Urban zone, Municipal responsibility
- **Product:** Mixed Waste Collection (R1 recycling)
- **Service Level:** Express (1 day)
- **Date:** Saturday
- **Extra:** Driver had difficult access

### Calculation:
```
Base Price (Business + Urban + Municipal + R1):  €70/ton
+ Service Speed (Express):                       +€40
+ Time-Based (Weekend):                          +€10
+ Additional Service (Difficult Access):         +€10
─────────────────────────────────────────────────────
TOTAL:                                           €130/ton
```

**All components stack together!**

---

## Price List Management

### Bulk Editing (PD-331)

**From PD-331:**
> "Modify prices in bulk for a set of selected products"

**How it works:**
1. Select price rows (e.g., all Rural zone rows)
2. Choose action: Increase 10%
3. Preview changes
4. Apply

**Example:**
- Select 15 Rural zone rows
- Increase by 10%
- €80 → €88, €85 → €93.50
- All updated at once

---

### Scheduled Updates (PD-328)

**From PD-328:**
> "Schedule price updates to take effect on a specific date"

**How it works:**
```
Today (December 15):
    Schedule: Increase 5%, Effective: January 1, 2026

Order on December 28: Uses old price (€50)
Order on January 5: Uses new price (€52.50)
```

**Price based on SERVICE DATE, not order date**

---

### Change History (PD-329)

**From PD-329:**
> "Track all price changes with audit trail"

**Every price change logged:**
- What changed (€50 → €55)
- When (Dec 15, 2025)
- Who (Admin name)
- Why ("Municipal tariff update")
- Type (Manual/Bulk/Scheduled)

---

## Zones - Geography-Based Pricing

### Creating Zones (PD-325)

**From PD-325:**
> "Zone is defined as a geographical region based on coordinates"

**How it works:**
1. Draw polygon on map (covers Copenhagen city center)
2. Name it: "Urban"
3. System counts: 2,435 properties in this zone
4. Save zone

**Create 3 zones:**
- Urban (city center)
- Suburbs (ring around urban)
- Rural (outer areas)

---

### Using Zones in Pricing

**Zones become conditions in price rows:**
```
Product: "Mixed Waste Collection"
    Row 1: Zone = Urban → €50/ton
    Row 2: Zone = Suburbs → €65/ton
    Row 3: Zone = Rural → €85/ton
```

**At runtime:**
1. Customer property at (55.68, 12.56)
2. System checks: Which zone contains these coordinates?
3. Answer: Urban zone
4. Price: €50/ton

**From PD-325:**
> "If a property falls within a designated zone that has its own price, the system selects the price from the price list that corresponds to that zone"

---

## Pricing Units (PD-326)

**From PD-326:**
> "Pricing units ensure price corresponds to the nature of the product"

**6 unit types:**
- €/piece (per collection, per service)
- €/kg or €/ton (weight-based)
- €/m³ (volume-based)
- €/liter (liquid waste)
- €/meter (distance-based)
- €/hour (time-based services)

**Examples:**
- Mixed Waste Collection: €50 per ton
- Bio-waste Service: €45 per collection
- On-site Audit: €85 per hour
- Container Rental: €5 per month

---

## Why This System Works

### Flexibility
- One product, infinite price variations
- Add new conditions without creating products
- Match real-world tariff structures

### Maintainability
- Admins update prices (no developer needed)
- Bulk edit multiple prices
- Schedule future changes
- Full audit trail

### Compliance
- Matches municipal contract requirements
- Different prices for different customer types
- Geography-based pricing (as mandated)
- Processing method affects price

### Intelligence
- Smart matching (finds best price)
- Fallback logic (always finds a price)
- Tie-breaking (lowest price when tied)
- Never errors "no price found"

---

## Common Scenarios

### Scenario 1: Municipal Tariff
Municipality says: "Private €50, Business €70"

**Solution:**
- 1 product: "Mixed Waste Collection"
- 2 price rows:
  - Private + Any + Municipal + Any = €50
  - Business + Any + Municipal + Any = €70

---

### Scenario 2: Rural Surcharge
Company charges more in rural areas

**Solution:**
- Same product
- Multiple rows by zone:
  - Any + Urban + Any + Any = €50
  - Any + Rural + Any + Any = €85

---

### Scenario 3: Hazardous Premium
Hazardous waste costs more to process

**Solution:**
- Product: "Hazardous Waste Collection"
- Condition: R/D Code = D10 (hazardous disposal)
- Price: €120/ton (vs €50 regular)

---

## Summary

**The Pricing Model:**

**Foundation:**
- Price Lists (containers for products)
- Price Rows (product + conditions + price)
- 4 condition attributes (customer, zone, responsibility, R/D)

**Smart Matching:**
- Find row where most conditions match
- Perfect match preferred
- Fallback to partial match
- Always finds a price

**Dynamic Additions:**
- Service speed surcharges
- Time-based surcharges (weekend/holiday)
- Additional services

**Management:**
- Bulk editing
- Scheduled updates
- Full audit trail

**Result:** Flexible, maintainable, compliant pricing that matches real-world requirements.
