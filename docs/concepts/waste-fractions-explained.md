---
slug: waste-fractions-explained
title: Waste Fractions Explained
category: concepts
order: 3
description: Master reference data that powers waste classification, compliance reporting, and operational handling throughout the system
related:
  - product-types-explained
  - pricing-model-overview
tags:
  - waste-fractions
  - compliance
  - EWC-codes
  - reference-data
  - classification
---

# Waste Fractions - How They Connect to Everything

Master reference data that powers waste classification and compliance.

---

## What Are Waste Fractions?

**From PD-39:**
> "Products can have: waste fraction, EWC / LoW R/D codes, hazardous waste properties"

**Simple definition:**
Waste Fractions are the TYPES OF WASTE your company handles (Mixed, Bio-waste, Plastic, Glass, Hazardous, etc.)

They're master reference data - created once during setup, referenced by many products.

---

## The Waste Fractions Table

### NAME Column
Shows waste fraction name with description below

**Examples:**
- **Mixed Waste** - "General mixed municipal waste"
- **Organic Waste** - "Biodegradable organic waste and compost"
- **Hazardous Waste** - "Hazardous waste requiring special handling"

**Purpose:** Customer-facing name and description

---

### CODE Column
Short abbreviation (3 letters, monospace font)

**Examples:**
- MIX (Mixed Waste)
- ORG (Organic)
- PAP (Paper)
- HAZ (Hazardous)

**Purpose:** Internal reference, reports, exports

---

### EWC CODE Column
European Waste Catalogue compliance code

**Examples:**
- 20 03 01 (Mixed municipal waste)
- 20 02 01 (Biodegradable waste)
- 16 06 01 (Hazardous waste)

**From PD-39:** "EWC / LoW R/D codes"

**Purpose:**
- **Legal compliance** - EU requires EWC codes for reporting
- Used in transfer documents
- Determines disposal requirements
- Wrong code = compliance violation

---

### PROPERTIES Column
Badges showing waste characteristics

**Two properties:**
- 🟢 **Recyclable** (green badge)
- 🔴 **Hazardous** (red badge)

**Examples:**
- Mixed Waste: `-` (no properties)
- Organic: Recyclable ✓
- Hazardous: Hazardous ✓
- Electronics (WEEE): Hazardous ✓ + Recyclable ✓ (both!)

**From PD-39:** "Hazardous waste properties"

**Impact:**
- Hazardous → Special handling, higher pricing, safety procedures
- Recyclable → Goes to recycling facility, might cost less
- Both → Complex handling (electronics recycling)

---

### PRODUCTS Column
Count of products using this waste fraction

**Examples:**
- Mixed Waste: **5** products
- Organic: **3** products
- Glass: **1** product

**What it means:**
- 5 different products all reference "Mixed Waste"
- Can't delete fraction if products use it
- Shows how widely used each fraction is

---

### STATUS Column
Active or Inactive badge

**Active:** Available in product dropdowns
**Inactive:** Hidden from new products (existing keep it)

**Use case:** Company stops collecting a waste type → Set Inactive

---

### ACTIONS Column
**✏️ Edit:** Modify fraction details
**🗑️ Delete:** Remove fraction (only if no products use it)

---

## How Waste Fractions Connect

### 1. Referenced by Products

**The connection:**
```
Waste Fraction: "Mixed Waste"
    ↓ Referenced by
Products:
    - Mixed Waste Collection (Service)
    - 240L Mixed Waste Bin (Container)
    - Industrial Mixed Waste (Service)
    - Mixed Waste Bulk Container (Container)
    - Mixed Waste On-demand (Service)
```

**In product creation:**
- Field: "Waste Fraction" (dropdown)
- Options: All active waste fractions
- Select: "Mixed Waste"
- Product now links to this fraction

---

### 2. Provide EWC Codes

**The flow:**
```
Product: "Bio-waste Collection"
    ↓ References
Waste Fraction: "Organic Waste"
    ↓ Has
EWC Code: "20 02 01"
    ↓ Used for
Compliance Reports:
    "Collected 45 tons of 20 02 01 waste this month"
```

**Why centralized:**
- Define EWC code ONCE on waste fraction
- All products get correct code automatically
- Update in one place → All products updated
- No typos, no inconsistency

---

### 3. Drive Compliance & Reporting

**Products inherit waste fraction properties:**
- EWC code for municipality reports
- Hazardous flag for safety procedures
- Recyclable flag for facility routing

**Reporting example:**
```
Monthly Report:
    Mixed Waste (20 03 01): 120 tons
    Organic (20 02 01): 45 tons
    Hazardous (16 06 01): 5 tons
```

All grouped by EWC codes from waste fractions.

---

### 4. Affect Pricing (Indirectly)

**Hazardous waste costs more:**
```
Waste Fraction: "Hazardous Waste"
    ↓ Property
Hazardous: TRUE
    ↓ Product uses this
Product: "Chemical Waste Collection"
    ↓ In price list
Price: €95/ton (vs €50 for normal waste)
```

**Why more expensive:**
- Special handling
- Safety equipment
- Special disposal facility
- More compliance paperwork

---

### 5. Control Operations

**Properties determine behavior:**

**Hazardous waste:**
- Driver sees safety warnings
- Requires certified vehicle
- Special collection procedures
- Transfer documents required

**Recyclable waste:**
- Routes to recycling facility
- Different processing
- Might earn revenue (sold as recycled material)

---

## Why Separate from Products?

### Without Waste Fractions Table (Bad):
```
Product 1: "Mixed Waste Collection"
    - Waste Type: "Mixed Waste"
    - EWC Code: "20 03 01"
    - Hazardous: No

Product 2: "240L Mixed Waste Bin"
    - Waste Type: "Mixed Waste"
    - EWC Code: "20 03 01"
    - Hazardous: No

Product 3: "Mixed Waste Bulk"
    - Waste Type: "Mixed Waste"
    - EWC Code: "20 03 01"
    - Hazardous: No
```

**Problems:**
- Duplicate data (EWC code entered 3 times)
- If code changes → Must update all products
- Typo risk
- Inconsistent

### With Waste Fractions Table (Good):
```
Waste Fraction: "Mixed Waste"
    - EWC: "20 03 01"
    - Hazardous: No

Product 1, 2, 3: All reference "Mixed Waste"
```

**Benefits:**
- ✅ Define once, use many times
- ✅ Update once → All products updated
- ✅ No duplication
- ✅ Guaranteed consistency

---

## Complete Lifecycle Example

### Step 1: Create Waste Fraction
```
Admin creates:
    Name: "Hazardous Waste"
    Code: HAZ
    EWC: 16 06 01
    Properties: Hazardous ✓
```

### Step 2: Product References It
```
Product: "Chemical Waste Collection"
    Waste Fraction: "Hazardous Waste" ← Link
```

### Step 3: Product Inherits Data
```
Product now has:
    - EWC Code: 16 06 01 (from fraction)
    - Hazardous: Yes (from fraction)
    - Safety procedures triggered
```

### Step 4: Affects Execution
```
Driver assigned:
    System alerts: "⚠️ Hazardous waste"
    Shows: Safety instructions
    Requires: Certified vehicle
```

### Step 5: Reporting
```
Monthly report:
    "Collected 12 tons EWC 16 06 01"
```

One waste fraction flows through entire system!

---

## Operational Scenarios

### Scenario 1: EWC Code Update

**Situation:** EU updates code: 20 03 01 → 20 03 02

**Action:**
1. Edit "Mixed Waste" fraction
2. Update EWC Code
3. Save

**Impact:**
- All 5 products using "Mixed Waste" get new code instantly
- Reports show new code
- Compliance maintained
- No need to update products individually

---

### Scenario 2: Stop Collecting Type

**Situation:** Stop collecting "Electronics (WEEE)"

**Action:**
1. Check products: 1 product using it
2. Set Status: Inactive

**Impact:**
- Disappears from product creation dropdowns
- Existing product still works
- Can't create new WEEE products

---

### Scenario 3: New Waste Stream

**Situation:** Start collecting "Textiles"

**Action:**
1. Create waste fraction: Textiles, TEX, 20 01 10, Recyclable
2. Save

**Impact:**
- Available in product dropdowns immediately
- Can create textile products
- EWC code ready for reporting

---

## Where Waste Fractions Appear

**1. Waste Fractions Tab**
- Management interface
- Create, edit, view fractions
- Admin use (setup phase)

**2. Product Creation Form**
- Dropdown field
- Select which waste type
- Admin creating products

**3. Product Detail**
- Waste Classification section
- View/edit waste fraction
- Shows inherited EWC code

**4. Compliance Reports**
- Grouped by EWC code
- Monthly/quarterly reporting
- Office users

**5. Driver Mobile App**
- Shows waste type
- Safety warnings for hazardous
- Field operations

---

## Key Concepts

### Master Reference Data
- Created during setup
- Referenced by products
- Changed rarely
- One source of truth

### Products Don't Own Waste Data
- Products LINK to fractions
- Don't duplicate data
- Inherit EWC codes
- Inherit properties

### Centralized Updates
- Update fraction → All products updated
- No need to touch individual products
- Consistency guaranteed

### Properties Drive Behavior
- Hazardous = special handling + pricing
- Recyclable = different routing + costs
- Automatically applied to products

---

## UX Note

**Yellow warning box suggests:**
Moving Waste Fractions to Settings → Waste Management

**Why?**
- Rarely changed (set during setup)
- Reference data (not transactional)
- Reduces main navigation clutter

**Alternative:** Keep as main tab for easy access

---

## Summary

**Waste Fractions = Master waste type classification**

**Contains:**
- Waste type names
- Short codes
- EWC compliance codes
- Properties (Hazardous/Recyclable)

**Referenced by:**
- Products (waste_fraction field)
- Reports (EWC grouping)
- Operations (handling procedures)

**Benefits:**
- One source of truth
- Legal compliance
- Operational consistency
- Easy updates

**Foundation for waste classification throughout the system.**
