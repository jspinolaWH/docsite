---
title: "Products & Pricing Guide (Updated)"
slug: "simple-guide-updated"
category: "user-guides"
order: 3
description: "Updated guide with schema-based product management, dynamic forms, and consolidated product tabs design."
related:
  - "simple-guide"
  - "navigation-guide"
  - "product-types-explained"
  - "sprint1-guide"
tags:
  - "guide"
  - "updated"
  - "schema"
  - "pricing"
  - "products"
---

# WasteHero 2.0 - Products & Pricing (Simple Guide)
**Updated Design - Schema-Based Product Management**

---

## 📦 Product Categories & Types

### Where: `Product Management → Product Categories Tab`

### **Understanding Categories vs Types:**

**TYPES (5 types - determines schema):**
- Service Product (tied to emptying)
- Container Product (physical bins)
- Additional Service (add-ons)
- One-off Fee (one-time charges)
- Recurring Fee (fixed fees)

**CATEGORIES (examples you create):**
- Waste Collection Services (Type: Service Product)
- Waste Containers & Bins (Type: Container Product)
- Extra Services (Type: Additional Service)
- Setup & Delivery Fees (Type: One-off Fee)
- Monthly Base Fees (Type: Recurring Fee)

**Key Point (PD-41, PD-39):**
> "Categories determine what the schema for each product"
> Type determines which fields appear when creating products in that category

---

## 🎯 Creating a New Category

### Where: `Product Categories → + New Category`

**Steps**:
1. **Category Name**: e.g., "Hazardous Waste Collection"
2. **Type**: Select from 5 types (Service/Container/Additional/One-off/Recurring)
3. **Description**: Brief description
4. **Configure Schema**: Fields appear based on type selected

**Example - Type: Service Product shows:**
- ✅ Waste Classification fields (Waste Fraction, EWC/LoW, R/D Code)
- ✅ Service-Specific fields (Permitted Emptying Intervals)
- ✅ Compliance fields (Transfer Document, YLVA Reportable)
- ❓ Container Type (assumed not relevant, but NOT stated in requirements)

**Example - Type: Container Product shows:**
- ✅ Container-Specific fields (Container Type, Default Weight)
- ✅ Waste Classification fields
- ❌ NO Emptying Intervals (PD-41 explicitly: "not relevant for containers")

**⚠️ Only ONE restriction explicitly stated:**
- **PD-41 Example**: *"Permitted emptying intervals are relevant for service products but NOT for recurring fee products"*
- This is the ONLY explicit field restriction in the requirements!
- All other field restrictions (e.g., Container Type only for containers) are LOGICAL ASSUMPTIONS, not from requirements
- PD-39 just says "different types may have different background data" but doesn't specify which fields for which types

**PD-41 Quote**: *"Permitted emptying intervals are relevant for service products but NOT for recurring fee products"*

---

## 📋 Creating a New Product

### Where: `Products → + New Product`

**Dynamic Form (PD-39, PD-41):**

**Always Required:**
- Product Name *
- Category * (dropdown shows your categories with their types)

**Schema Fields (change based on category selected):**

**If you select "Waste Collection Services" (Service Product):**
Shows:
- Waste Fraction * (dropdown)
- EWC/LoW Code *
- R/D Code *
- Direction * (Incoming/Outgoing/Transfer)
- Permitted Emptying Intervals (checkboxes: Weekly/Bi-weekly/Monthly)
- Product Code
- Default Weight
- Portal Visibility

**If you select "Waste Containers & Bins" (Container Product):**
Shows:
- Container Type * (120L/240L/660L dropdown)
- Default Weight * (required for containers)
- Waste Fraction *
- EWC/LoW Code *
- Product Code
- Portal Visibility
- NO Emptying Intervals (not relevant)

**PD-39**: *"Categories determine what the schema for each product"* - Form shows only relevant fields!

---

## 🏗️ Product Components (Bill of Materials)

### Where: `Product Detail → Bill of Materials Tab` (PD-40)

**What**: Break down a product's price into components

**Example**: "Bio-waste Collection Service" = €10.50
```
Components:
├── Container rental: €5.00 per month
├── Collection labor: €3.50 per collection
└── Base subscription: €2.00 per month
TOTAL = €10.50
```

**Why (PD-40)**:
> *"Modify parts of the product line WITHOUT developer involvement"*

**Actions**:
- Add component (e.g., "Disposal fee €1.50")
- Edit component prices
- Remove outdated components
- All updates auto-apply throughout system

**Units (PD-326)**: per collection, per ton, per kg, per m³, per month, per piece, per hour

---

## ➕ Additional Services

### Where: `Product Detail → Additional Services Tab` (PD-38)

### **3 Application Methods:**

**1. AUTOMATIC (PD-38)**
- Example: Cancellation fee
- Applied when: Access denied, return trip required
- Configuration: Set automatic rules (which scenarios trigger it)

**2. MANUAL (PD-38)**
- Example: Extra wash
- Applied when: Customer-service user adds it
- Configuration: Available for manual addition

**3. DRIVER-INITIATED (PD-38)**
- Example: Extra weighing
- Workflow: Driver requests → Office approves → Added to invoice
- Configuration: Office approval required, link to driver confirmation slip

**PD-38**: *"Define rules according to which additional services can be added to products"*

**Schema for Additional Service categories includes:**
- Application Method *
- Default Price *
- Automatic Rules (5 trigger conditions)
- Driver-Initiated Settings (approval workflow)

---

## 💰 Price Lists (The Container)

### Where: `Price Lists Tab`

**What**: Container/catalog that holds products with prices applied to customer categories

**Flow**:
1. **Create Price List** (PD-330)
   - Name: "Municipal Price List 2026"
   - Valid: Jan 1 - Dec 31, 2026
   - Applied to: Municipal customers

2. **Add Products to Price List**
   - Click "+ Add Product"
   - Select product (e.g., "Mixed Waste Collection")
   - Set conditions + price
   - Repeat for different conditions

**Example Price List:**
```
Municipal Price List 2026
├── Mixed Waste Collection
│   ├── Private + Urban + Municipal + R1 = €50/ton
│   ├── Business + Urban + Municipal + R1 = €70/ton
│   ├── Any + Rural + Any + R1 = €80/ton
│   └── Any + Any + Any + Any = €60/ton (fallback)
├── Bio-waste Collection
│   ├── Private + Urban = €45/collection
│   └── Business + Any = €65/collection
```

**PD-330**: *"Support unlimited number of different price lists"*

---

## 🎯 Price Conditions (PD-322)

### Where: `Price List → Products Tab` or `Add Product to Price List Modal`

**Why Multiple Prices (PD-322)?**

Same product needs DIFFERENT prices because:
- Municipal contracts mandate it
- Urban vs Rural costs differ
- Business customers pay more than residential
- Processing method affects cost (R1 recycling vs D1 disposal)

**Condition Attributes:**
- **Customer Type** (Private/Business/Industrial)
- **Zone** (Urban/Rural/Turku/Helsinki - PD-325)
- **Service Responsibility** (Municipal/TSV/Market-based - PD-35)
- **R/D Code** (R1/R3/D1 - processing method - PD-39)

**PD-330 Matching Logic:**
1. Check for perfect match (all attributes match) → Use that price
2. If no perfect match → Use row with MOST matching attributes
3. Example: Business customer in Rural area → Matches "Any + Rural" row (1 match) → €80

**Without Price Lists**: You'd need 50+ duplicate products for every combination ❌
**With Price Lists**: 1 product + smart conditional pricing ✅

---

## 📍 Zones (Geography-Based Pricing)

### Where: `Zones Tab` (PD-325)

**What**: Define geographic areas for different pricing

**Used in**: Price List conditions (Zone column)

**Example**:
```
Zones
├── Urban (city center) → €50
├── Suburban → €55
├── Rural → €80
└── Remote Islands → €120
```

**Why**: Transportation costs vary by distance/density

---

## ⚡ Service Levels (Speed Pricing)

### Where: `Product Detail → Service Levels Tab` (PD-37)

**What**: Different response times with surcharges

**Example**:
```
Service Levels
├── Scheduled (7 days) → €0 surcharge
├── On-demand (3 days) → +€20
├── Express (1 day) → +€40
└── Emergency (same day) → +€70
```

**Actions**:
- Click "+ Add Level" to create new service level
- Edit existing levels
- Set timeframe + surcharge (PD-324)

---

## 🔧 Service Responsibility (PD-35)

### Where: `Product Detail → Responsibility Tab`

### **⚠️ CONFUSION IN REQUIREMENTS:**

**PD-35 User Story says**: "Define service responsibility FOR A PRODUCT"
**BUT PD-35 Acceptance says**: "Product responsibility does NOT affect pricing nor override customer/contract"

**What Service Responsibility Is:**
Legal/financial framework for waste service (Municipal/TSV/Market-based)

**Where It's Actually Used (PD-35):**
1. **Customer Level** (inherited by contracts) ← PRIMARY
2. **Contract Level** (overrides customer) ← PRIMARY
3. **Pricing List Level** (determines which price) ← THIS IS WHERE IT MATTERS
4. Event/Integration level

**Product Level** = Listed in user story but NOT in hierarchy, and explicitly "does not affect pricing"

**Current Design**: Shows product default but flags it as unclear/contradictory
**Recommendation**: Should probably be set at PRICE LIST level (as condition) instead

---

## 💸 Product Tabs - Consolidated Design

### Product Detail has 5 tabs (was 7):

**1. Configuration Tab (PD-39, PD-41, PD-34)**
- Basic Information (Name, Code, Status)
- Waste Classification (Waste Fraction, EWC/LoW, R/D, Direction)
- Default Weights (PD-34 - merged!)
- Customer Portal (PD-41 - merged with 3 toggles!)

**2. Bill of Materials (PD-40)**
- Components table with pricing breakdown

**3. Additional Services (PD-38)**
- 3 application method cards (Automatic/Manual/Driver-Initiated)
- Use case examples

**4. Service Levels (PD-37)**
- Service level table with + Add Level button

**5. Responsibility (PD-35)**
- Service responsibility with explanation (contradictory requirement flagged)

**UX Improvement**: Merged Weights + Portal into Configuration to reduce tab clutter

---

## 🔢 Bulk Edit Prices (PD-331)

### Where: `Price List → Products Tab` (integrated, appears when rows selected)

**How It Works:**
1. Price List shows multiple rows per product with conditions
2. Check rows you want to edit (☑ checkboxes)
3. **Bulk Edit section appears at TOP automatically**
4. Shows: "X rows selected"
5. Choose action: Increase %, Decrease %, Set value, Multiply
6. Enter value
7. Preview changes
8. Apply to selected

**Actions:**
- Increase by % (e.g., +5%)
- Decrease by % (e.g., -10%)
- Set fixed value (e.g., €50)
- Multiply by (e.g., 1.2)

**PD-331**: *"Modify prices in bulk for a set of selected products"*

**Design**: Only appears when needed, integrated at top (not separate tab)

---

## 📅 Schedule Price Update

### Where: `Price List → Scheduled Tab` (PD-328)

**Example**: Municipality increases prices Jan 1

```
Today (Dec 15, 2025):
├── Select products to update
├── Set new prices
├── Effective date: Jan 1, 2026
└── Save

Result:
├── Orders before Jan 1 → Old price (€55)
└── Orders after Jan 1 → New price (€60)
```

**Important**: Price based on SERVICE DATE, not order/invoice date

---

## 🔍 Price Change Log

### Where: `Price List → Log Tab` (PD-329)

**Shows**:
- What changed (€55 → €60)
- When (Dec 15, 2025)
- Who (John Smith)
- Why ("Municipal tariff update 2026")
- Effective date (Jan 1, 2026)

**Purpose**: Audit trail for all price modifications

---

## 🗑️ Waste Fractions

### Where: `Waste Fractions Tab` (PD-39)

**⚠️ UX Note**: Could be moved to Settings → Waste Management since rarely changed after setup

**Table Shows:**
- NAME (with description)
- CODE (short code: MIX, ORG, PAP)
- EWC CODE (20 03 01, 20 02 01)
- PROPERTIES (Recyclable, Hazardous badges)
- PRODUCTS (count using this fraction)
- STATUS (Active/Inactive)
- ACTIONS (Edit ✏️, Delete 🗑️)

**Edit Modal Fields:**
- Fraction Name * / Code * (two columns)
- EWC / LoW Code (European Waste Catalogue)
- Description
- Properties (Hazardous Waste, Recyclable checkboxes)
- Status dropdown

**All from PD-39**: Waste fraction, EWC codes, Hazardous properties

---

## 🏠 Create Agreement (Contract)

### Where: `Property → Agreements → Add`

**Steps**:
1. Pick products (from catalog - filtered by category)
2. Pick price list (system auto-selects based on customer category)
3. Choose service level (Scheduled/Express/Emergency if applicable)
4. Add extra services (Extra wash, etc. if needed)
5. Set schedule (every 2 weeks, monthly, etc.)
6. Apply discount (if special customer)

**System automatically:**
- Determines price based on conditions (zone, customer type, responsibility)
- Applies customer-level discounts if any
- Inherits service responsibility from customer

**Done!** Customer now has contract with calculated pricing

---

## 💡 How Price is Calculated (Updated)

```
1. Get customer attributes
   ├── Customer type (Private/Business)
   ├── Zone (from property location)
   ├── Service responsibility (from customer/contract)
   └── R/D code (from product)
   ↓
2. Find price list applied to this customer category
   ↓
3. Look up product in price list
   ↓
4. Find price row with MOST matching conditions (PD-330)
   - Match customer type ✓
   - Match zone ✓
   - Match service responsibility ✓
   - Match R/D code ✓
   ↓
5. Use that price as BASE
   ↓
6. Add service level surcharge (if Express/Emergency)
   ↓
7. Add any additional services (Extra wash, Cancellation fee)
   ↓
8. Apply discounts (if any)
   ↓
9. DONE → Price locked when ticket created
```

**Example**:
```
Service: Mixed Waste Collection
Customer: Business, Urban zone, Municipal responsibility
R/D Code: R1
Service level: Express
Day: Saturday
Additional: Extra weighing

Calculation:
Base price (Business + Urban + Municipal + R1) = €70/ton (from price list)
Express surcharge (PD-37) = +€40
Weekend surcharge (PD-323) = +€10
Extra weighing (PD-38) = +€10
Total = €130/ton
```

---

## 🔄 New Product Creation Flow (Schema-Based)

### Where: `Products → + New Product`

**Step 1: Select Category**
- Choose: "Waste Collection Services (Service Product)"
- System loads schema configured for this category

**Step 2: Fill Dynamic Fields**
Form shows ONLY fields configured in category schema:
- Waste Fraction * (required per schema)
- EWC/LoW Code * (required per schema)
- R/D Code * (required per schema)
- Direction * (required per schema)
- Permitted Emptying Intervals (optional per schema)
- Product Code (optional per schema)
- Portal Visibility (optional per schema)

**Step 3: Create**
Product created with only relevant fields!

**PD-41**: *"By default, a product requires a name and product category"*
**PD-39**: *"Categories determine what the schema for each product"*

---

## 🛠️ Configure Category Schema

### Where: `Product Categories → [Category] → ⚙️ Configure`

**What You Can Do:**
1. **Edit category description**
2. **Set category rules** (PD-41):
   - Permitted emptying intervals (Weekly/Bi-weekly/Monthly)
   - Property types that can order (Residential/Commercial/Industrial)
3. **Configure schema fields** (PD-39):
   - Check which fields to show
   - Set Required vs Optional
   - Grouped by field type (Waste Classification, Service-Specific, etc.)

**Example**: Configure "Waste Collection Services" schema:
- ☑ Waste Fraction (Required)
- ☑ EWC/LoW Code (Required)
- ☑ Permitted Emptying Intervals (Optional)
- ☐ Container Type (unchecked - not relevant for services)

**Result**: All products in this category will show these fields

---

## 💰 Price Lists - Full Workflow

### Creating Price List:

**Step 1: Create Container** (`Price Lists → + New Price List`)
- Name: "Municipal Price List 2026"
- Valid: Jan 1 - Dec 31, 2026

**Step 2: Add Products** (`Price List → + Add Product`)
For EACH product, create multiple price rows with conditions:

**Product: Mixed Waste Collection**
```
Row 1: Private + Urban + Municipal + R1 = €50/ton
Row 2: Business + Urban + Municipal + R1 = €70/ton
Row 3: Any + Rural + Any + R1 = €80/ton
Row 4: Private + Turku + Market-based + R1 = €45/ton
Row 5: Any + Any + Any + Any = €60/ton (default fallback)
```

**Why Multiple Rows (PD-322)?**
> *"Define multiple prices for the same product based on product's attributes"*

Municipal contracts REQUIRE this complexity!

**Step 3: Products Table View**
Shows all products with ALL condition columns visible:
- Product name (spans multiple rows)
- Each row shows: Customer Type, Zone, Service Resp., R/D Code, Price, Unit

**Bulk Edit** (appears when rows selected):
- Select rows with checkboxes
- Bulk edit section appears at top automatically
- Update multiple prices at once

---

## 🎨 Key Design Improvements

### **1. Schema-Based Product Creation (PD-39, PD-41)**
- Categories have types (Service/Container/Additional/Fee)
- Type determines which fields appear
- No more irrelevant fields cluttering forms
- Service products don't show container fields
- Container products don't show emptying intervals

### **2. Grouped Schema Fields**
- Not one flat list of 28 fields
- Organized by purpose:
  - Waste Classification (PD-39)
  - Service-Specific (PD-41)
  - Container-Specific (PD-41, PD-34)
  - Location & Handling (PD-39)
  - Compliance (PD-39)
  - Optional fields

### **3. Dynamic Forms**
- New Product form changes based on selected category
- New Category form changes based on selected type
- Only relevant fields shown

### **4. Consolidated Tabs**
- Product Detail: 7 tabs → 5 tabs
- Merged Weights + Portal into Configuration tab
- Price List: 4 tabs → 3 tabs (Bulk Edit integrated)

### **5. Clear Category vs Type Naming**
- **Types**: Service Product, Container Product (schema drivers)
- **Categories**: Waste Collection Services, Waste Containers & Bins (what admins create)
- No confusion between the two

### **6. Integrated Bulk Edit (PD-331)**
- Appears ONLY when rows selected
- At TOP of page (not separate tab)
- Shows selected count dynamically
- Preview before applying

### **7. Multiple Price Rows Visible (PD-322, PD-330)**
- Not just "3 conditions" badge
- Full table showing ALL condition attributes
- Product name spans rows (rowspan)
- Clear visual grouping by product

### **8. Complete Additional Services (PD-38)**
- Shows all 3 application methods (not just 2)
- Automatic rules configuration
- Driver-initiated workflow
- Use case examples from Jira

---

## 📊 Sidebar Filters

### Where: Left sidebar on Products tab

**Filter by Type** (not by category name):
- All Products (8)
- Service Product (4)
- Container Product (2)
- Additional Service (1)
- One-off Fee (1)
- Recurring Fee (0)

**Why**: Types are the schema classifications, easier to filter by

---

## 🔍 Product Table Columns

### Main Products Table:

- ☑ Checkbox (bulk actions)
- **Product Name** (+ code below)
- **Category** (badge - e.g., "Waste Collection Services")
- **Type** (text - e.g., "Service Product")
- **Status** (Active/Inactive toggle)
- **Price Lists** (count - how many lists it's in)
- **Components** (count - BOM items)
- **Portal** (visibility toggle)
- **Actions** (View button)

**Filters Available:**
- Category dropdown (5 categories)
- Type dropdown (5 types)
- Status (Active/Inactive)

---

## 🗺️ Quick Navigation (Updated)

| I want to... | Go here |
|-------------|---------|
| Create category | Product Categories → + New Category |
| Configure category schema | Product Categories → [Category] → Configure |
| View category schema | Product Categories → [Category] → View |
| Create product | Products → + New Product (dynamic form) |
| Edit product | Products → [Product] → View |
| Manage waste fractions | Waste Fractions Tab (or move to Settings) |
| Create price list | Price Lists → + New Price List |
| Add product to price list | Price List → + Add Product |
| Bulk edit prices | Price List → Products → Select rows (auto-appears) |
| Schedule price update | Price List → Scheduled → + Schedule |
| See price history | Price List → Log |
| Configure zones | Zones Tab → + New Zone |

---

## 📋 Real Examples

### Example 1: Create New Product Category

```
Step 1: Create Category
├── Name: "Hazardous Waste Services"
├── Type: Service Product
├── Description: "Collection of hazardous materials"
└── Configure Schema:
    ├── ☑ Waste Fraction (Required)
    ├── ☑ EWC/LoW Code (Required)
    ├── ☑ Hazardous Properties (Required)
    ├── ☑ Transfer Document (Required)
    └── ☐ Container Type (not relevant)

Step 2: Create Product in Category
├── Select category: "Hazardous Waste Services"
├── Form shows ONLY relevant fields:
    ├── Name: "Chemical Waste Collection"
    ├── Waste Fraction: Hazardous
    ├── EWC/LoW: 16 06 01
    ├── Hazardous Properties: Toxic, Corrosive
    └── Transfer Document: Required
└── Create!

Result: Product created with only configured fields
```

### Example 2: Set Up Pricing (Municipal Tariff)

```
Step 1: Create Price List
├── Name: "Municipal Tariff 2026"
├── Valid: Jan-Dec 2026
└── Applied to: Municipal customers

Step 2: Add "Mixed Waste Collection" with Multiple Rows
Row 1:
├── Conditions: Private + Urban + Municipal + R1
└── Price: €50/ton

Row 2:
├── Conditions: Business + Urban + Municipal + R1
└── Price: €70/ton

Row 3:
├── Conditions: Any + Rural + Any + R1
└── Price: €80/ton

Row 4:
├── Conditions: Any + Any + Any + Any
└── Price: €60/ton (default fallback)

Step 3: Customer Orders
├── Customer: Business in Urban with Municipal responsibility
├── System matches: Row 2 (Business + Urban + Municipal)
└── Price: €70/ton
```

### Example 3: Additional Service Setup

```
Create Category:
├── Name: "Premium Add-ons"
├── Type: Additional Service
└── Schema shows:
    ├── Application Method * (Automatic/Manual/Driver)
    ├── Default Price *
    ├── Automatic Rules (5 trigger options)
    └── Driver-Initiated Settings

Create Product:
├── Name: "Extra Wash"
├── Category: Premium Add-ons
├── Application Method: Manual
├── Default Price: €15
└── Office Approval: Not required

Result: Customer-service users can add this manually
```

---

## 🆚 WH 1.0 vs WH 2.0

| Feature | WH 1.0 | WH 2.0 |
|---------|--------|--------|
| Product creation | Fixed fields | Schema-based, dynamic by category |
| Categories | Labels only | Types with field configurations |
| Price per product | One price | Multiple conditions (customer/zone/responsibility) |
| Price lists | Basic | Smart matching with conditions |
| Bulk edit | Separate page | Integrated (appears when needed) |
| Additional Services | Simple list | 3 methods + automatic rules |
| Product tabs | 7 tabs | 5 tabs (consolidated) |
| Service levels | ❌ | ✅ Timeframe + surcharge |
| Zones | ❌ | ✅ Geography-based pricing |
| Component pricing | Basic | Full BOM with units |
| Waste fractions | Basic | Properties + compliance codes |

---

## ⚠️ Open Questions / Clarifications Needed

### **1. Service Responsibility at Product Level (PD-35)**
**Issue**: PD-35 says "define for product" but also says "does not affect pricing nor override customer/contract"
**Question**: Why set it at product level if it doesn't do anything?
**Current**: Flagged as contradictory in UI
**Recommendation**: Clarify if this should only exist at Customer/Contract/Price List levels

### **2. Category Type Field Restrictions**
**Issue**: Can a Service category have EWC code? Or only Container categories?
**Current**: PD-39 lists all fields but doesn't separate by type
**Assumption**: Both Service and Container need waste codes (both handle waste)
**Flagged**: In New Category modal with warning box

### **3. Component Reusability**
**Issue**: Should components be created separately and reused across products?
**Current**: PD-40 doesn't mention component library or reusability
**Design**: Components are product-specific (not reusable)
**Question**: Is this intentional or oversight?

### **4. Waste Fractions Page Location**
**Suggestion**: Move to Settings since rarely changed
**Current**: Main tab (might clutter interface)
**Note added**: Flagged in yellow box on page

---

## 🎯 Key Concepts Summary

### **Categories** (PD-41)
What admins create - named containers with configured schemas
- Example: "Waste Collection Services"

### **Types** (PD-41, PD-39)
What determines schema - 5 types (Service/Container/Additional/One-off/Recurring)
- Drives which fields appear

### **Schema** (PD-39, PD-41)
Rules for which fields show in a category
- Configured per category
- Based on category type
- Shows only relevant fields

### **Products** (PD-41)
Actual sellable items following category schema
- Example: "Mixed Waste Collection"

### **Components** (PD-40)
Pricing building blocks within a product
- Example: Container fee (€5) + Emptying fee (€3.50) + Base (€2)
- NOT services, just price itemization

### **Price Lists** (PD-330)
Containers holding products with conditional prices
- Applied to customer categories
- Example: "Municipal 2026" with 8 products

### **Price Rows** (PD-322, PD-330)
Individual price entries with conditions
- Same product can have 5+ rows with different conditions
- System picks best match

### **Additional Services** (PD-38)
Optional add-ons with 3 application methods
- Automatic (applied by rules)
- Manual (added by office)
- Driver-Initiated (requested by driver, approved by office)

---

## 💭 Design Philosophy

**From Requirements:**
- **PD-39**: "Products can be of different types, and each product type may have different background data"
- **PD-41**: "Schema for each product category so that products contain all required and mandatory fields for that category"
- **PD-322**: "Define multiple prices for the same product based on product's attributes"
- **PD-330**: "Support large and complex pricing structures"

**Design Approach:**
1. **Type-driven schemas** - Show only relevant fields
2. **Grouped organization** - Logical field grouping, not flat lists
3. **Dynamic forms** - Fields change based on selections
4. **Integrated workflows** - Bulk edit appears when needed
5. **Clear hierarchies** - Categories → Products → Price Lists
6. **Condition-based pricing** - One product, many prices with smart matching

**Result**: Complex functionality presented simply through schema-based design

---

## ❓ Need Help?

**Can't find something?**
→ Check sidebar filter by Type or use search

**Form not showing expected fields?**
→ Check category schema configuration (might be disabled)

**Price wrong?**
→ Check price list conditions - view which row matched

**Want to add new field to all products in category?**
→ Configure category schema (affects all products in that category)

**Bulk edit not appearing?**
→ Select at least 1 checkbox in price table

**Product type vs category confused?**
→ Type = schema driver (5 types), Category = what you create with a type
