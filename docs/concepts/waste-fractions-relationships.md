---
slug: waste-fractions-relationships
title: Waste Fractions - How They Connect to Everything
category: concepts
order: 4
description: Comprehensive guide to waste fractions as master reference data that powers product classification, compliance, and pricing
related:
  - product-types-explained
  - product-mapping
  - pricing-overview
tags:
  - waste-fractions
  - compliance
  - EWC-codes
  - products
  - reference-data
---

# Waste Fractions - How They Connect to Everything
**Reference Data That Powers Product Classification**

---

## 🎯 What Are Waste Fractions?

**From PD-39:**
> *"Products can have: waste fraction, EWC / LoW R/D codes, hazardous waste properties"*

**Simple Definition:**
Waste Fractions are the TYPES OF WASTE your company handles (Mixed, Bio-waste, Plastic, Glass, etc.)

**They're master reference data** - created once, referenced by many products.

---

## 📊 Your Screenshot Explained

**Page:** Waste Fractions (PD-39)
**Subtitle:** "Manage waste fraction types and EWC codes for compliance"

**Yellow Warning Box:**
> "💡 UX Consideration: Page Placement - This page could be moved to Settings since waste fractions are rarely changed after initial setup"

**Why?** These are foundational reference data (like EWC codes) that don't change often, unlike Products or Price Lists which are edited regularly.

---

## 🗂️ Table Columns Explained

### **Column 1: NAME**
**Shows:** Waste fraction name + description below

**Examples:**
- **Mixed Waste** - "General mixed municipal waste"
- **Organic Waste** - "Biodegradable organic waste and compost"
- **Paper & Cardboard** - "Paper, cardboard, and paper packaging"
- **Hazardous Waste** - "Hazardous waste requiring special handling"

**What it means:**
- This is the waste TYPE
- Products will reference this (e.g., product handles "Mixed Waste")
- Customer-facing name

---

### **Column 2: CODE**
**Shows:** Short abbreviation (monospace font)

**Examples:**
- MIX (Mixed Waste)
- ORG (Organic Waste)
- PAP (Paper & Cardboard)
- PLA (Plastic)
- GLA (Glass)
- MET (Metal)
- HAZ (Hazardous)
- ELE (Electronics)

**What it means:**
- Quick reference code
- Used internally in system
- Appears in reports, exports
- Easier to type than full name

---

### **Column 3: EWC CODE**
**Shows:** European Waste Catalogue code (monospace font)

**Examples:**
- 20 03 01 (Mixed municipal waste)
- 20 02 01 (Biodegradable waste)
- 20 01 01 (Paper and cardboard)
- 16 06 01 (Hazardous waste)

**What it means:**
- **Legal compliance code** required by EU regulations
- Used for reporting to authorities
- Determines how waste must be processed
- Different codes have different disposal rules

**From PD-39:** *"EWC / LoW R/D codes"* - these are compliance requirements

**Critical:** Wrong EWC code = compliance violation = potential fines!

---

### **Column 4: PROPERTIES**
**Shows:** Badges indicating waste characteristics

**Two Properties:**
- 🟢 **Recyclable** (green badge)
- 🔴 **Hazardous** (red badge)

**Examples:**
- Mixed Waste: `-` (no properties)
- Organic Waste: Recyclable ✓
- Paper: Recyclable ✓
- Hazardous: Hazardous ✓
- Electronics (WEEE): Hazardous ✓ + Recyclable ✓ (BOTH!)

**What it means:**
- **Recyclable:** Can be recycled, goes to recycling facility
- **Hazardous:** Requires special handling, safety procedures, special disposal

**From PD-39:** *"Hazardous waste properties"*

**Impact:**
- Hazardous waste triggers different pricing
- Hazardous waste requires special vehicles/equipment
- Recyclable waste might have lower disposal costs
- Properties affect routing, handling, compliance

---

### **Column 5: PRODUCTS**
**Shows:** Count of products using this waste fraction

**Examples:**
- Mixed Waste: **5** products
- Organic Waste: **3** products
- Glass: **1** product
- Electronics: **1** product

**What it means:**
- How many products reference this waste fraction
- If zero: Waste fraction exists but no products use it yet
- If 5: Can't delete (5 products depend on it)

**Connection:**
```
Waste Fraction: "Mixed Waste"
    ↓ Referenced by products:
Products:
    - Mixed Waste Collection (Service Product)
    - 240L Mixed Waste Bin (Container Product)
    - Industrial Mixed Waste (Service Product)
    - Mixed Waste Bulk Container (Container Product)
    - Mixed Waste On-demand (Service Product)
    = 5 products total
```

---

### **Column 6: STATUS**
**Shows:** Active or Inactive pill badge

**Examples:**
- All 8 shown: **Active** (green pill)

**What it means:**
- **Active:** Available in product creation dropdowns
- **Inactive:** Hidden from new products (but existing products keep it)

**Use case:**
- Waste fraction no longer collected → Set to Inactive
- Existing products with that fraction still work
- Can't select it for NEW products

---

### **Column 7: ACTIONS**
**Shows:** Two icon buttons

**✏️ Edit:**
- Opens Edit Waste Fraction modal
- Modify name, codes, description, properties
- Change status

**🗑️ Delete:**
- Delete waste fraction
- **Can't delete if products using it** (shows error)
- Must reassign or delete products first

---

## 🔗 How Waste Fractions Relate to the System

### **1. Waste Fractions → Products (Referenced By)**

**Relationship:** Products REFERENCE waste fractions

**The Connection:**
```
Waste Fraction: "Mixed Waste" (master data)
    ↓ Referenced by
Product Schema Data:
    - Mixed Waste Collection: waste_fraction = "Mixed Waste"
    - 240L Mixed Waste Bin: waste_fraction = "Mixed Waste"
    - Industrial Mixed Waste: waste_fraction = "Mixed Waste"
```

**In Product Creation Form:**
When creating "Mixed Waste Collection" product:
1. Fill field "Waste Fraction" (dropdown)
2. Dropdown shows: Mixed Waste, Organic Waste, Paper, Plastic, Glass...
3. Select: "Mixed Waste"
4. Product now references this waste fraction

**What This Means:**
- Waste fractions are the OPTIONS in product dropdowns
- Product doesn't copy the data, it LINKS to it
- Change waste fraction → All products using it see the change
- Example: Update EWC code 20 03 01 → All "Mixed Waste" products get updated code

---

### **2. Waste Fractions → Compliance & Reporting**

**Relationship:** Waste fractions carry compliance codes needed for legal reporting

**The Connection:**
```
Waste Fraction: "Hazardous Waste"
    ↓ Has properties
Properties:
    - EWC Code: 16 06 01 (legal code)
    - Hazardous: TRUE (special handling)
    ↓ Products reference this
Product: "Chemical Waste Collection"
    ↓ Inherits
    - Must report with EWC 16 06 01
    - Must follow hazardous waste procedures
    - Triggers special pricing/handling
```

**From PD-39:** *"EWC / LoW R/D codes"* and *"hazardous waste properties"*

**Why It Matters:**
- **Legal compliance:** EU requires reporting waste by EWC codes
- **Safety:** Hazardous waste needs special procedures
- **Pricing:** Hazardous waste often costs more to process
- **Routing:** Different waste types go to different facilities

---

### **3. Waste Fractions → Product Schema (Field Value)**

**Relationship:** Waste Fraction is one of the 28 schema fields from PD-39

**In Schema Configuration:**
```
Category: "Waste Collection Services"
    ↓ Schema configuration
Schema Fields:
    ☑ Waste Fraction (Required) ← This field
    ☑ EWC/LoW Code (Required)
    ☑ R/D Code (Required)
    ...
```

**In Product Creation:**
```
Product: "Mixed Waste Collection"
    ↓ Has schema field
Waste Fraction Field:
    - Type: Dropdown
    - Options: [Mixed Waste, Organic Waste, Paper, ...]
    - Selected: "Mixed Waste"
    ↓ Stored in
product_schema_data table:
    waste_fraction: "Mixed Waste" (references waste_fractions table)
```

**What This Means:**
- "Waste Fraction" is a FIELD in products
- Waste Fractions table provides the OPTIONS for that field
- Master data (waste fractions) → Referenced by transactional data (products)

---

### **4. Waste Fractions → EWC Codes (Compliance Link)**

**Relationship:** Each waste fraction has an EWC code that products inherit

**The Connection:**
```
Product: "Bio-waste Collection"
    ↓ References
Waste Fraction: "Organic Waste"
    ↓ Has
EWC Code: "20 02 01"
    ↓ Used for
Compliance Reporting:
    - Monthly report to municipality: "Collected 45 tons of 20 02 01 waste"
    - Transfer documents: "Waste type: 20 02 01"
    - YLVA reporting: Organic waste under code 20 02 01
```

**Why Centralized:**
- Instead of entering EWC code on EVERY product
- Define it ONCE on waste fraction
- All products referencing "Organic Waste" automatically have correct code
- Update code in one place → All products updated

---

### **5. Waste Fractions → Pricing (Indirect)**

**Relationship:** Waste fraction affects pricing through R/D code and properties

**The Connection:**
```
Waste Fraction: "Hazardous Waste"
    ↓ Has property
Hazardous: TRUE
    ↓ Product references this
Product: "Hazardous Waste Collection"
    ↓ In price list
Price Conditions:
    - Customer: Any
    - Zone: Any
    - Responsibility: Any
    - R/D Code: D1 (hazardous disposal)
    - Price: €95/ton (MORE EXPENSIVE than normal €50)
```

**Why Hazardous Costs More:**
- Special handling required
- Special vehicles needed
- Special disposal facilities (expensive)
- More paperwork/compliance

**Waste fraction properties → Affect pricing indirectly**

---

### **6. Waste Fractions → Multiple Products (One-to-Many)**

**Relationship:** One waste fraction can be used by many products

**The Connection:**
```
Waste Fraction: "Mixed Waste" (5 products)
    ↓ Referenced by:
    1. Mixed Waste Collection (Service Product)
    2. 240L Mixed Waste Bin (Container Product)
    3. 660L Mixed Waste Container (Container Product)
    4. Mixed Waste On-demand Service (Service Product)
    5. Bulk Mixed Waste Collection (Service Product)
```

**Why Multiple Products:**
- Same waste type, different service offerings
- Same waste type, different container sizes
- Different products for different customer types

**The products count (5) means:**
- 5 different products all handle "Mixed Waste"
- All share same EWC code (20 03 01)
- All share same classification
- But different prices, different schedules, different containers

---

### **7. Waste Fractions → R/D Codes (Separate but Related)**

**Note:** Waste fractions have EWC codes, but products ALSO have R/D codes

**The Distinction:**
- **EWC Code (from waste fraction):** WHAT the waste is (20 03 01 = mixed municipal)
- **R/D Code (on product):** HOW it's processed (R1 = recycled, D1 = disposed)

**Example:**
```
Product: "Plastic Recycling Collection"
    ↓ Has
Waste Fraction: "Plastic" (EWC: 20 01 39) ← WHAT it is
R/D Code: "R1" ← HOW it's processed (recycled)

vs.

Product: "Plastic Disposal Collection"
    ↓ Has
Waste Fraction: "Plastic" (EWC: 20 01 39) ← SAME waste type
R/D Code: "D1" ← DIFFERENT processing (disposed to landfill)
```

**Both reference same waste fraction, different processing!**

---

## 🔄 Complete Data Flow

### **Scenario: Creating a Bio-waste Collection Service**

**Step 1: Waste Fraction Exists (Master Data)**
```
Waste Fractions Table:
    Organic Waste
    - Code: ORG
    - EWC: 20 02 01
    - Properties: Recyclable
    - Status: Active
```

**Step 2: Category Configured**
```
Category: "Waste Collection Services"
    ↓ Schema enables
Fields:
    ☑ Waste Fraction (Required)
    ☑ EWC/LoW Code (Required)
    ☑ R/D Code (Required)
```

**Step 3: Product Created**
```
Product: "Bio-waste Collection"
    ↓ Fill schema fields
    Waste Fraction: Select "Organic Waste" from dropdown
    R/D Code: "R3" (organic recycling)
    Direction: "Outgoing"
    ↓ Stored
product_schema_data:
    waste_fraction_id: Links to "Organic Waste"
    rd_code: "R3"
```

**Step 4: Product Inherits**
```
Product now has:
    - Waste type: Organic Waste (from fraction)
    - EWC Code: 20 02 01 (from fraction)
    - Properties: Recyclable (from fraction)
    - Processing: R3 (from product)
```

**Step 5: Used in Pricing**
```
Price List: "Municipal 2026"
    ↓ Price row
Product: "Bio-waste Collection"
Conditions:
    - Customer: Private
    - Zone: Urban
    - Responsibility: Municipal
    - R/D Code: R3 ← Affects price!
Price: €45/collection (cheaper than disposal because recycling)
```

**Step 6: Compliance Reporting**
```
Monthly Report:
    "Collected 120 tons of waste type 20 02 01 (Organic)"
    "Processed via R3 (Organic recycling)"

Transfer Documents:
    "Waste: EWC 20 02 01, Biodegradable, Recyclable"
```

**Waste fraction data flows through ENTIRE system!**

---

## 🔗 Complete Relationship Map

```
┌──────────────────┐
│ WASTE FRACTIONS  │ ← Master Reference Data
│ (8-50 fractions) │
└────────┬─────────┘
         │
         ├─→ Referenced by PRODUCTS (via waste_fraction field)
         │       │
         │       ├─ Service Products (Mixed Waste Collection)
         │       ├─ Container Products (240L Mixed Waste Bin)
         │       └─ Products inherit EWC code from fraction
         │
         ├─→ Used in SCHEMA CONFIG (waste_fraction is a schema field)
         │       │
         │       └─ Categories enable/disable this field
         │
         ├─→ Affects PRICING (indirectly via R/D code and properties)
         │       │
         │       ├─ Hazardous waste costs more
         │       └─ Recyclable waste might cost less
         │
         ├─→ Drives COMPLIANCE (EWC codes for reporting)
         │       │
         │       ├─ Monthly municipality reports
         │       ├─ Transfer documents
         │       └─ YLVA reporting
         │
         └─→ Controls ROUTING (different fractions → different facilities)
                 │
                 ├─ Recyclables → Recycling center
                 ├─ Hazardous → Special facility
                 └─ Mixed → Landfill or incineration
```

---

## 💡 Why Waste Fractions Are Separate from Products

### **Question:** "Why not just put waste type directly on the product?"

### **Answer:** Centralization and reusability

**Without Waste Fractions Table (Bad Approach):**
```
Product 1: "Mixed Waste Collection"
    - Waste Type: "Mixed Waste"
    - EWC Code: "20 03 01"
    - Hazardous: No

Product 2: "240L Mixed Waste Bin"
    - Waste Type: "Mixed Waste"
    - EWC Code: "20 03 01"
    - Hazardous: No

Product 3: "Mixed Waste On-demand"
    - Waste Type: "Mixed Waste"
    - EWC Code: "20 03 01"
    - Hazardous: No
```

**Problems:**
- ❌ Duplicate data (EWC code entered 3 times)
- ❌ If EWC code changes → Must update 3 products
- ❌ Typo risk (someone types "20 03 O1" instead of "20 03 01")
- ❌ Inconsistent data

**With Waste Fractions Table (Good Approach):**
```
Waste Fraction: "Mixed Waste"
    - EWC Code: "20 03 01"
    - Hazardous: No

Product 1: "Mixed Waste Collection"
    - References: "Mixed Waste" ← Link

Product 2: "240L Mixed Waste Bin"
    - References: "Mixed Waste" ← Link

Product 3: "Mixed Waste On-demand"
    - References: "Mixed Waste" ← Link
```

**Benefits:**
- ✅ Data defined ONCE
- ✅ Update in one place → All products updated
- ✅ No duplication
- ✅ Consistency guaranteed
- ✅ Dropdown ensures valid values (can't type wrong code)

---

## 🎯 The 8 Waste Fractions in Your Screenshot

**Note:** The specific 8 fractions shown are examples from the mockup design, NOT from PD-39 requirements. PD-39 just says products CAN have waste fractions, but doesn't specify WHICH ones.

**Your company should decide which waste fractions you actually collect!**

### **Shown in Screenshot:**

**1. Mixed Waste (MIX, 20 03 01)**
- 5 products use it
- No special properties
- Most common waste type

**2. Organic Waste (ORG, 20 02 01)**
- 3 products
- Recyclable ✓
- Biodegradable waste

**3. Paper & Cardboard (PAP, 20 01 01)**
- 2 products
- Recyclable ✓
- Paper packaging

**4. Plastic (PLA, 20 01 39)**
- 2 products
- Recyclable ✓
- Plastic packaging

**5. Glass (GLA, 20 01 02)**
- 1 product
- Recyclable ✓
- Glass packaging

**6. Metal (MET, 20 01 40)**
- 2 products
- Recyclable ✓
- Metal packaging

**7. Hazardous Waste (HAZ, 16 06 01)**
- 1 product
- Hazardous ✓ (red badge)
- Requires special handling

**8. Electronics/WEEE (ELE, 20 01 36)**
- 1 product
- Hazardous ✓ + Recyclable ✓ (BOTH!)
- Waste Electrical & Electronic Equipment
- Special category with dual properties

---

## 🔍 Tracing a Waste Fraction Through the System

### **Let's follow "Hazardous Waste":**

**Step 1: Waste Fraction Created**
```
Admin creates in Waste Fractions tab:
    Name: "Hazardous Waste"
    Code: HAZ
    EWC Code: 16 06 01
    Description: "Hazardous waste requiring special handling"
    Properties: ☑ Hazardous
    Status: Active
```

**Step 2: Used in Product**
```
Admin creates product:
    Name: "Chemical Waste Collection"
    Category: "Waste Collection Services"
    Waste Fraction: Select "Hazardous Waste" from dropdown ← References fraction
    R/D Code: "D10" (hazardous disposal)
```

**Step 3: Product Detail Shows**
```
Product "Chemical Waste Collection" now has:
    - Waste type: Hazardous Waste (from fraction)
    - EWC Code: 16 06 01 (inherited from fraction)
    - Hazardous: Yes (inherited from fraction)
    - R/D Code: D10 (set on product)
```

**Step 4: Affects Service Execution**
```
Driver assigned to collect:
    System checks: Product waste fraction = Hazardous
    System alerts: "⚠️ Hazardous waste - special procedures required"
    Driver sees: Safety instructions
    Vehicle required: Hazardous waste certified truck
```

**Step 5: Affects Pricing**
```
Price List row:
    Product: "Chemical Waste Collection"
    Conditions: Any + Any + Any + D10 (hazardous disposal code)
    Price: €120/ton (vs €50 for normal waste)

Why more expensive:
    - Special vehicles
    - Special disposal facility
    - Safety equipment
    - Additional paperwork
```

**Step 6: Compliance Reporting**
```
Monthly Report to Municipality:
    "Collected 12 tons of waste EWC 16 06 01 (Hazardous)"
    "Disposed via method D10"
    "All safety procedures followed"
```

**One waste fraction touches EVERY part of the system!**

---

## 🎨 Visual: Where Waste Fractions Appear in UI

### **1. Waste Fractions Tab (Master Data Management)**
**Location:** Main navigation → Waste Fractions
**Purpose:** Create, edit, manage waste fractions
**Who uses:** Admin (rarely, setup phase)

### **2. Product Creation Form**
**Location:** Products → + New Product → Waste Fraction field
**Purpose:** Select which waste type this product handles
**Who uses:** Admin creating products
**Shows:** Dropdown with all Active waste fractions

### **3. Product Detail - Configuration Tab**
**Location:** Product → View → Configuration → Waste Classification section
**Purpose:** View/edit which waste fraction product uses
**Who uses:** Admin maintaining products

### **4. Reports & Compliance**
**Location:** Reports module (not in these 20 PDs)
**Purpose:** Show waste collected by EWC code
**Who uses:** Office users for regulatory reporting

### **5. Driver Mobile App**
**Location:** Ticket detail in driver app
**Purpose:** Show waste type and safety warnings
**Who uses:** Drivers in the field

---

## ⚙️ Operational Impact

### **Scenario 1: EWC Code Update**

**Situation:** EU updates waste catalogue, "Mixed Waste" code changes from 20 03 01 → 20 03 02

**Action:**
1. Admin opens Waste Fractions
2. Edit "Mixed Waste"
3. Update EWC Code: 20 03 01 → 20 03 02
4. Save

**Impact:**
- ✅ All 5 products using "Mixed Waste" automatically have new code
- ✅ Reports show new code immediately
- ✅ Compliance maintained
- ✅ NO need to update 5 products individually

**This is the POWER of master reference data!**

---

### **Scenario 2: Stop Collecting a Waste Type**

**Situation:** Company stops collecting "Electronics (WEEE)"

**Action:**
1. Admin opens Waste Fractions
2. Find "Electronics (WEEE)"
3. Check products: 1 product using it
4. Either:
   - Option A: Deactivate waste fraction (existing product keeps it, can't create new)
   - Option B: Delete/reassign the 1 product, then delete fraction

**Impact:**
- Inactive fraction disappears from product creation dropdowns
- Existing products still work (data preserved)
- Can't accidentally create new WEEE products

---

### **Scenario 3: New Waste Stream**

**Situation:** Company starts collecting "Textiles"

**Action:**
1. Admin clicks "+ New Waste Fraction"
2. Fill:
   - Name: "Textiles"
   - Code: TEX
   - EWC Code: 20 01 10
   - Properties: Recyclable ✓
3. Save

**Impact:**
- ✅ "Textiles" now available in product dropdowns
- ✅ Can create "Textile Collection" service
- ✅ Can create "Textile Container" product
- ✅ EWC code 20 01 10 ready for reporting

---

## 📋 Yellow Warning Box Explained

**In your screenshot:**

> "💡 UX Consideration: Page Placement
> To minimize complexity: This page could be moved to Settings → Waste Management since rarely changed after initial setup.
> Rationale: Foundational reference data (like EWC codes) that don't change frequently, unlike Products or Price Lists which are edited regularly.
> Alternative location: Settings → Waste Management → Waste Fractions"

**What this means:**

**Current:** Waste Fractions is a main tab (same level as Products, Price Lists)

**Suggestion:** Move to Settings submenu

**Why?**
- **Set once:** Usually configured during initial setup
- **Rarely change:** EWC codes are stable, waste types don't change often
- **Reference data:** Not transactional (not edited daily like products/prices)
- **Reduce clutter:** Main tabs should be frequently-used features

**Decision:** Keep as main tab OR move to Settings?

---

## 🎓 Key Insights

### **1. Waste Fractions Are Master Data**
- Created once (during setup)
- Referenced many times (by products)
- Changed rarely (stable reference data)
- Critical for compliance (EWC codes)

### **2. Products Don't Own Waste Data**
- Products LINK to waste fractions
- Don't duplicate the data
- Inherit EWC codes and properties
- Centralized management

### **3. Waste Fractions Enable Consistency**
- Same waste type = same EWC code (always)
- No typos, no inconsistency
- Update once, affects all products
- Compliance guaranteed

### **4. Properties Drive Behavior**
- Hazardous = special handling + pricing
- Recyclable = different routing + costs
- Properties automatically applied to products

### **5. Waste Fractions Are Infrastructure**
- Like product types (foundational)
- Products can't exist without them (if waste_fraction field required)
- Must be set up BEFORE creating products
- Part of initial configuration

---

## ✅ Summary: Waste Fractions in the System

**What They Are:**
- Master reference data for waste types
- Contains EWC codes, properties, descriptions
- Central source of truth for waste classification

**Who Creates Them:**
- Admins during initial setup
- Rarely modified after that

**Who Uses Them:**
- Products (reference them via waste_fraction field)
- Compliance (EWC codes for reporting)
- Pricing (hazardous property affects pricing)
- Operations (properties determine handling)

**Where They Appear:**
- Waste Fractions tab (management)
- Product forms (dropdown options)
- Product detail (waste classification section)
- Reports (EWC code grouping)
- Driver app (safety warnings)

**Why They Matter:**
- Legal compliance (EU requires EWC codes)
- Data consistency (one source of truth)
- Operational efficiency (properties drive behavior)
- Pricing logic (hazardous costs more)

**Waste Fractions = The classification system that everything references!** 🎯
