---
title: "Sprint 1 Implementation Guide"
slug: "sprint1-guide"
category: "sprint-planning"
order: 3
description: "Detailed Sprint 1 guide covering Figma UI mapping, requirements completion status, and implementation notes for the foundation layer."
related:
  - "sprint-breakdown"
  - "pd-sprint-mapping"
  - "product-types-explained"
  - "simple-guide-updated"
tags:
  - "sprint 1"
  - "implementation"
  - "figma"
  - "guide"
  - "foundation"
---

# Sprint 1 Implementation Guide
**WasteHero 2.0 - Foundation Layer**

**Jira Epic:** FR-444
**Duration:** Week 1
**Stories:** FR-445, FR-446, FR-447

---

## 📋 Overview

**Sprint Goal:** Build product type system, categories, and dynamic schema configuration

**What Gets Built:**
- Product Categories management
- Dynamic product creation forms
- Waste Fractions reference data

**PD Requirements Covered:** PD-41 (Product Catalog), PD-39 (Product Schema)

---

## 🗺️ Figma UI Mapping

### **Screen 1: Product Categories Tab**

**Location in Figma:** Main view when "Product Categories" tab selected

**What's Shown:**
- Page title: "Product Categories"
- Subtitle: "Manage product types and schema configurations"
- Table with 5 example categories
- "+ New Category" button (top right)

**Implements:**
- ✅ **PD-41:** Product catalog structure
- ✅ **Story FR-445:** Category viewing and management

**Table Columns:**

| Column | What It Shows | PD Ref | Story |
|--------|---------------|--------|-------|
| **Category Name** | Name + description below (e.g., "Waste Collection Services") | PD-41 | FR-445 |
| **Type** | Badge showing type (Service Product, Container Product, etc.) | PD-41 | FR-445 |
| **Products** | Count of products in category (e.g., "24") | PD-41 | FR-445 |
| **Schema Fields** | Count of enabled fields (e.g., "12 fields") | PD-39 | FR-445 |
| **Status** | Toggle switch (Active/Inactive) | PD-41 | FR-445 |
| **Actions** | Configure ⚙️ and View 👁 buttons | PD-39, PD-41 | FR-445 |

**Functionality:**
- View all categories created by admin
- Click "⚙️ Configure" → Opens Configure Schema modal (PD-39)
- Click "👁 View" → Opens View Schema modal (read-only)
- Toggle status → Activate/deactivate category
- Click "+ New Category" → Opens creation modal

**Requirements Coverage:**
- **PD-41 (75% complete in Sprint 1):** Product catalog structure, category creation ✅ | Product creation ✅ | Bill of Materials ⏸️ (Sprint 2)
- **PD-39 (50% complete in Sprint 1):** Schema configuration ✅ | Waste fractions ✅ | Field validation ✅ | Schema enforcement in products ✅

---

### **Screen 2: New Category Modal**

**Location in Figma:** Modal overlay that opens when clicking "+ New Category"

**What's Shown:**
- Modal title: "Create New Category"
- Subtitle: "Select type to see schema preview"
- Form with 3 fields
- Schema preview section at bottom
- Footer with Cancel + "Create Category" buttons

**Implements:**
- ✅ **PD-41:** Category creation
- ✅ **PD-39:** Type selection determines available schema fields
- ✅ **Story FR-445:** New category functionality

**Form Fields:**

| Field | Type | Required | PD Ref | Purpose |
|-------|------|----------|--------|---------|
| **Category Name** | Text input | Yes * | PD-41 | Admin names the category (e.g., "Hazardous Waste Services") |
| **Type** | Dropdown | Yes * | PD-41 | Select from 5 types - triggers schema preview |
| **Description** | Textarea | No | PD-41 | Optional description (0/500 character count) |

**Type Dropdown Options (PD-41):**
1. 🔷 Service Product - "Tied to waste collection and emptying services"
2. 📦 Container Product - "Physical waste containers and bins"
3. ➕ Additional Service - "Add-on services with automatic/manual rules"
4. 💰 One-off Fee - "One-time charges (delivery, setup, etc.)"
5. 🔄 Recurring Fee - "Fixed periodic fees (monthly base fees)"

**Schema Preview Section:**
- Appears when type selected
- Blue background (#eff6ff)
- Shows field groups available for selected type
- **NEEDS UPDATE:** Currently shows only group names, should show individual field names (see figma_schema_preview_fix.txt)

**Example when "Additional Service" selected:**
```
👁 Schema Preview
This category will have access to these fields:

Additional Service-Specific (PD-38):
  • Application Method * (Automatic/Manual/Driver-Initiated)
  • Default Price *
  • Apply on Access Restriction
  • Apply on Return Trip
  • Apply During Weighing
  • Customer Flag Trigger
  • Office Approval Required
  • Link to Confirmation Slip

Optional Fields (PD-38, PD-41):
  • Product Code
  • Invoice Display Name
  • Portal Visibility
```

**Requirements Coverage:**
- **PD-41:** "By default, a product requires a name and product category" ✅
- **PD-39:** "Categories determine what the schema for each product" ✅ (preview shows this)

**Functionality Complete:** ✅ Yes - creates category with type, ready for schema configuration

---

### **Screen 3: Configure Schema Modal**

**Location in Figma:** Opens when clicking "⚙️ Configure" on a category row

**What's Shown:**
- Modal title: "Configure Schema: [Category Name]"
- Subtitle: "Select which fields appear when creating products in this category"
- Category description (editable)
- Category Rules section
- Schema Fields Configuration section (grouped tables)
- Footer with Cancel + "Save Configuration"

**Implements:**
- ✅ **PD-39:** Schema field configuration
- ✅ **PD-41:** Category rules (emptying intervals, property types)
- ✅ **Story FR-445:** Schema configuration functionality

**Section 1: Category Description**
- Editable textarea showing current description
- Can modify and save

**Section 2: Category Rules (PD-41)**
- Yellow background (#fef3c7)
- Two columns:
  - **Permitted Emptying Intervals:** Checkboxes for Weekly, Bi-weekly, Monthly, On-demand
  - **Allowed Property Types:** Checkboxes for Residential, Commercial, Industrial

**Section 3: Schema Fields Configuration (PD-39)**
- Multiple grouped tables (one per field group)
- Each group shows available fields for the category's type

**Field Group Table Structure:**

| Show | Field Name | Required/Optional | Info |
|------|------------|-------------------|------|
| ☑ | Waste Fraction (PD-39) | [Required ▼] | ℹ️ |
| ☑ | EWC/LoW Code (PD-39) | [Required ▼] | ℹ️ |
| ☐ | Direction (PD-39) | [  -  ] | ℹ️ |

**Checkbox Behavior:**
- Checked = Field will appear in product creation form
- Unchecked = Field hidden from product creation
- Required/Optional dropdown only enabled if checkbox checked

**Field Groups Shown (depends on type):**

**For Service Product categories:**
- Waste Classification (4 fields)
- Service-Specific (1 field - Permitted Emptying Intervals)
- Compliance (2 fields)
- Optional (4 fields)

**For Container Product categories:**
- Container-Specific (2 fields - Container Type, Default Weight)
- Waste Classification (4 fields)
- Location & Handling (3 fields)
- Optional (4 fields)

**For Additional Service categories:**
- Additional Service-Specific (2 fields)
- Automatic Rules Configuration (4 fields)
- Driver-Initiated Workflow (3 fields)
- Optional (3 fields)

**Requirements Coverage:**
- **PD-39:** "Products can be of different types, and each product type may have different background data" ✅
- **PD-41:** "Permitted emptying intervals are relevant for service products but NOT for recurring fee products" ✅ (only explicit restriction)

**Functionality Complete:** ✅ Yes - full schema configuration with grouped fields

**Open Question Flagged:** Yellow warning box asks "Can admins configure ANY field for ANY type, or are there restrictions?" - only 1 restriction explicitly stated in PD-41.

---

### **Screen 4: Products Table** (Story 1.2)

**Location in Figma:** Main view when creating/viewing products

**What's Shown:**
- Products table with 6 example products
- Columns: Checkbox, Product Name, Category, Type (?)
- "+ New Product" button

**Implements:**
- ✅ **PD-41:** Product catalog display
- ✅ **Story FR-446:** Product listing

**Table Columns:**

| Column | What It Shows | Needed? | Notes |
|--------|---------------|---------|-------|
| **Checkbox** | Select for bulk actions | ✅ Yes | For future bulk operations |
| **Product Name** | Name + code below | ✅ Yes | PD-41 core data |
| **Category** | Badge (colored) | ✅ Yes | Essential - shows organization |
| **Type** | Text (Service Product, etc.) | ❌ **REDUNDANT** | Type is derived from category |

**Issue in Figma:** Shows both Category AND Type columns

**Recommendation:**
- **Remove TYPE column** (redundant)
- **Keep CATEGORY column** with colored badge
- Badge color indicates type:
  - 🔵 Blue = Service Product
  - 🟣 Purple = Container Product
  - 🟢 Green = Additional Service
  - 🟡 Yellow = One-off Fee
  - 🔴 Pink/Red = Recurring Fee

**Missing Columns (not in Sprint 1 Figma, but in mockup):**
- Status toggle
- Price Lists count (Sprint 3)
- Components count (Sprint 2)
- Portal toggle (Sprint 1 or 2)
- Actions (View button)

**Requirements Coverage:**
- **PD-41:** Product catalog viewing ✅ (partial - just display, not full detail)

**Functionality Complete:** ⚠️ Partial - shows products but missing some columns

---

### **Screen 5: New Product Modal** (Story 1.2)

**Location in Figma:** Modal that opens when clicking "+ New Product"

**What's Shown:**
- Modal title: "New Product"
- Subtitle: "Fields shown based on category schema"
- Always Required section (yellow box)
- Dynamic Schema Fields section
- Footer buttons

**Implements:**
- ✅ **PD-41:** Product creation
- ✅ **PD-39:** Dynamic schema-based forms
- ✅ **Story FR-446:** Dynamic product creation

**Section 1: Always Required (Yellow Box)**

| Field | Type | PD Ref | Always Shown? |
|-------|------|--------|---------------|
| **Product Name** * | Text input | PD-41 | ✅ Yes |
| **Category** * | Dropdown | PD-41 | ✅ Yes |

**From PD-41:** "By default, a product requires a name and product category"

**Category Dropdown:**
- Shows category name with type in parentheses
- Example: "Waste Collection Services (Service Product)"
- Grouped by type (optional)

**Section 2: Dynamic Schema Fields**

**Initial State (no category selected):**
- Blue info box: "👆 Select category above to see schema fields"
- Centered, friendly empty state

**After Category Selected:**
- Form dynamically renders with groups
- Only fields enabled in category schema appear
- Fields organized in groups with headers

**Example when "Waste Collection Services" selected:**
```
┌─────────────────────────────────────────┐
│ Waste Classification (PD-39)            │
├─────────────────────────────────────────┤
│ Waste Fraction * [dropdown]             │
│ EWC/LoW Code * [text input]             │
│ R/D Code * [text input]                 │
│ Direction * [dropdown]                  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Service-Specific (PD-41)                │
├─────────────────────────────────────────┤
│ Permitted Emptying Intervals:           │
│ ☐ Weekly ☐ Bi-weekly ☐ Monthly         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Optional Fields                         │
├─────────────────────────────────────────┤
│ Product Code [text]                     │
│ Default Weight (kg) [number]            │
│ ☐ Portal Visibility                     │
└─────────────────────────────────────────┘
```

**Requirements Coverage:**
- **PD-39:** "Categories determine what the schema for each product" ✅ (form adapts completely)
- **PD-41:** Required name + category ✅

**Functionality Complete:** ✅ Yes - fully dynamic form based on schema

**Critical Feature:** Form content changes COMPLETELY when category dropdown changes. This is the core of the schema system.

---

### **Screen 6: Waste Fractions Tab**

**Location in Figma:** Tab navigation (horizontal tabs at top)

**What's Shown:**
- Page title: "Waste Fractions" with subtitle
- Search bar
- Table with 8 waste fractions
- "+ New Waste Fraction" button (if present)

**Implements:**
- ✅ **PD-39:** Waste fraction reference data
- ✅ **Story FR-447:** Waste fractions management

**Table Columns:**

| Column | What It Shows | PD Ref | Example |
|--------|---------------|--------|---------|
| **Name** | Name + description | PD-39 | "Mixed Waste" + "General mixed municipal waste" |
| **Code** | Short code (monospace font) | PD-39 | MIX |
| **EWC Code** | European code (monospace) | PD-39 | 20 03 01 |
| **Properties** | Badges (Hazardous/Recyclable) | PD-39 | Green "Recyclable" badge |
| **Products** | Count using this fraction | PD-41 | 5 |
| **Status** | Active/Inactive pill badge | - | Green "Active" pill |
| **Actions** | ✏️ Edit, 🗑️ Delete icons | - | Icon buttons |

**8 Pre-Seeded Fractions:**
1. Mixed Waste (MIX, 20 03 01) - no properties
2. Organic Waste (ORG, 20 02 01) - Recyclable
3. Paper & Cardboard (PAP, 20 01 01) - Recyclable
4. Plastic (PLA, 20 01 39) - Recyclable
5. Glass (GLA, 20 01 02) - Recyclable
6. Metal (MET, 20 01 40) - Recyclable
7. Hazardous Waste (HAZ, 16 06 01) - Hazardous
8. Electronics/WEEE (ELE, 20 01 36) - Hazardous + Recyclable

**Requirements Coverage:**
- **PD-39:** "Waste fraction" and "EWC / LoW R/D codes" and "hazardous waste properties" ✅

**Functionality Complete:** ✅ Yes - full CRUD for waste fractions

---

### **Screen 7: Edit Waste Fraction Modal**

**Location in Figma:** Opens when clicking ✏️ on waste fraction row

**What's Shown:**
- Modal title: "Edit Waste Fraction"
- Subtitle: "Update the waste fraction details below"
- Form with 5 field sections
- Footer with Cancel + "Save Changes"

**Implements:**
- ✅ **PD-39:** Waste fraction editing
- ✅ **Story FR-447:** Edit functionality

**Form Fields:**

| Field | Type | Required | PD Ref | Example Value |
|-------|------|----------|--------|---------------|
| **Fraction Name** | Text | Yes * | PD-39 | "Glass" |
| **Code** | Text | Yes * | PD-39 | "GLA" |
| **EWC / LoW Code** | Text | No | PD-39 | "20 01 02" |
| **Description** | Textarea | No | PD-39 | "Glass packaging and glass waste" |
| **Properties** | Checkboxes (2) | No | PD-39 | ☐ Hazardous, ☑ Recyclable |
| **Status** | Dropdown | Yes | - | Active / Inactive |

**Properties Section:**
- Two checkboxes in grid layout (side-by-side cards)
- Each in bordered box for clear selection
- Checkboxes: 18px size

**Requirements Coverage:**
- **PD-39:** Hazardous waste properties ✅
- **PD-39:** Waste type information ✅

**Functionality Complete:** ✅ Yes - all waste fraction fields editable

---

## 📊 Requirements Completion Status

### **PD-41: Product Catalog**

**What PD-41 Requires:**
- Product catalog with categories
- Products require name and category
- Schema determines fields
- Permitted emptying intervals (example restriction)

**Sprint 1 Coverage:**

| Requirement | Implemented? | Where in Figma | Story |
|-------------|--------------|----------------|-------|
| Create categories | ✅ Complete | New Category modal | FR-445 |
| Configure category schema | ✅ Complete | Configure Schema modal | FR-445 |
| View category catalog | ✅ Complete | Product Categories table | FR-445 |
| Create products | ✅ Complete | New Product modal | FR-446 |
| Products require name + category | ✅ Complete | Always Required section | FR-446 |
| Dynamic schema fields | ✅ Complete | Schema Fields section | FR-446 |
| View products catalog | ✅ Complete | Products table | FR-446 |
| Emptying intervals restriction | ✅ Complete | Schema config shows only for Service type | FR-445 |
| Product detail tabs | ❌ Sprint 2 | Not in Sprint 1 | Future |
| Bill of Materials | ❌ Sprint 2 | Not in Sprint 1 | Future |

**PD-41 Completion:** 80% complete after Sprint 1 (missing product details and BOM)

---

### **PD-39: Product Schema**

**What PD-39 Requires:**
- Products of different types have different background data
- Categories determine schema
- 28 possible fields (waste fraction, EWC codes, container type, etc.)
- Waste fractions as reference data

**Sprint 1 Coverage:**

| Requirement | Implemented? | Where in Figma | Story |
|-------------|--------------|----------------|-------|
| Type-based schemas | ✅ Complete | Type dropdown shows different fields | FR-445 |
| Category determines schema | ✅ Complete | Dynamic product form | FR-446 |
| 28 schema fields defined | ✅ Complete | Configure Schema modal (all fields) | FR-445 |
| Waste fraction field | ✅ Complete | Dynamic form + Waste Fractions tab | FR-446, FR-447 |
| EWC/LoW codes | ✅ Complete | Waste Fractions table | FR-447 |
| Hazardous properties | ✅ Complete | Properties checkboxes | FR-447 |
| Container type field | ✅ Complete | Schema for Container categories | FR-445 |
| Direction field | ✅ Complete | Schema fields | FR-445 |
| Schema validation | ✅ Complete | Backend validates against schema | FR-446 |
| Field grouping | ✅ Complete | Grouped in logical sections | FR-445, FR-446 |

**PD-39 Completion:** 100% complete after Sprint 1 ✅ (all schema functionality built)

---

## 🎯 Story Completion Matrix

### **FR-445: Product Types & Categories Management**

**Scope:** Category creation and schema configuration

| Feature | Figma Screen | Complete? |
|---------|--------------|-----------|
| View categories table | Product Categories tab | ✅ Yes |
| Create category | New Category modal | ✅ Yes |
| Select type (5 options) | Type dropdown | ✅ Yes |
| Schema preview | Preview box in modal | ⚠️ Partial - needs field details |
| Configure schema | Configure Schema modal | ✅ Yes |
| Enable/disable fields | Checkboxes in groups | ✅ Yes |
| Set required/optional | Dropdown per field | ✅ Yes |
| View schema read-only | View Schema modal | ❓ Not shown in Figma |
| Category rules | Emptying intervals, property types | ✅ Yes |

**Overall Completion:** 85% (missing View Schema modal design, schema preview needs enhancement)

**PDs Fully Implemented:** None yet (PD-41 continues in Sprint 2 with BOM)

**PDs Partially Implemented:**
- PD-41 (80% done - category system complete, product creation complete, missing product details)
- PD-39 (schema configuration complete)

---

### **FR-446: Dynamic Product Schema & Creation Forms**

**Scope:** Product creation with dynamic forms

| Feature | Figma Screen | Complete? |
|---------|--------------|-----------|
| New product modal | New Product modal | ✅ Yes |
| Always required fields | Yellow section | ✅ Yes |
| Category dropdown | With type in parentheses | ✅ Yes |
| Dynamic field loading | Schema Fields section | ✅ Yes |
| Grouped field display | Grouped cards | ✅ Yes |
| Required indicators (*) | After field labels | ✅ Yes |
| Field type variety | Text, select, checkbox, number | ✅ Yes |
| Products table | Products view | ⚠️ Partial - missing columns |
| Filter by category | Not shown | ❓ Missing |
| Filter by type | Not shown | ❓ Missing |

**Overall Completion:** 80% (missing filters and some table columns)

**PDs Fully Implemented:**
- PD-39 (100% - all schema functionality complete) ✅

**PDs Partially Implemented:**
- PD-41 (product creation complete, detail views in Sprint 2)

---

### **FR-447: Waste Fractions Master Data Management**

**Scope:** Waste fractions CRUD

| Feature | Figma Screen | Complete? |
|---------|--------------|-----------|
| View fractions table | Waste Fractions tab | ✅ Yes |
| 8 pre-seeded fractions | Table rows | ✅ Yes |
| Name with description | Two-line display | ✅ Yes |
| Code (monospace) | CODE column | ✅ Yes |
| EWC Code (monospace) | EWC CODE column | ✅ Yes |
| Properties badges | PROPERTIES column | ✅ Yes |
| Products count | PRODUCTS column | ✅ Yes |
| Status badge | STATUS column | ✅ Yes |
| Edit action | ✏️ icon button | ✅ Yes |
| Delete action | 🗑️ icon button | ✅ Yes |
| Edit modal | Edit Waste Fraction modal | ✅ Yes |
| Properties checkboxes | Grid layout | ✅ Yes |
| Search functionality | Search bar | ✅ Yes |
| Create new fraction | Not shown | ❓ Missing button |

**Overall Completion:** 95% (missing "+ New Waste Fraction" button in Figma)

**PDs Fully Implemented:**
- PD-39 (Waste Fractions portion) 100% ✅

---

## 🔗 Dependencies & Data Flow

### **Story Execution Order:**

**Week 1 Sequence:**

**Days 1-2: Foundation**
1. **FR-445 (Backend)** - Create tables for types, categories
2. **FR-447 (Backend)** - Create waste fractions table, seed data
3. **FR-447 (Frontend)** - Can start Waste Fractions tab ✅ (no dependencies)

**Days 2-3: Categories**
4. **FR-445 (Frontend)** - Build category UI (depends on FR-445 backend APIs)

**Days 3-5: Products**
5. **FR-446 (Backend)** - Create products table + schema validation (depends on FR-445 complete)
6. **FR-446 (Frontend)** - Build dynamic product form (depends on FR-445 + FR-446 backend)

### **Data Flow:**

```
product_types (5 hardcoded)
    ↓
product_categories (admin creates, links to type, stores schema_config)
    ↓
products (created by admin, links to category)
    ↓
product_schema_data (stores values for fields enabled in category schema)

waste_fractions (master data)
    ↓ (referenced by)
product_schema_data.waste_fraction
```

---

## ✅ Sprint 1 Deliverables Checklist

### **By End of Sprint 1, Users Can:**

**Category Management:**
- [x] View all product categories in table
- [x] Create new category with name, type, description
- [x] See schema preview when selecting type
- [x] Configure which fields appear for a category
- [x] Set fields as required or optional
- [x] View configured schema (read-only)
- [x] Toggle category active/inactive

**Product Management:**
- [x] Create products with dynamic forms
- [x] See only relevant fields based on selected category
- [x] Fill required fields (marked with *)
- [x] Optionally fill optional fields
- [x] View products in table
- [ ] Filter products by category (missing in Figma)
- [ ] Filter products by type (missing in Figma)

**Waste Fractions:**
- [x] View 8 pre-seeded waste fractions
- [x] Search waste fractions
- [x] Edit waste fractions
- [ ] Create new waste fraction (button missing in Figma)
- [x] See properties as badges
- [x] See product count per fraction

---

## 📝 Figma Improvements Needed

### **High Priority:**

1. **Schema Preview Detail** (New Category modal)
   - Currently: Shows only group names
   - Needed: Show individual field names
   - Prompt: figma_schema_preview_fix.txt

2. **Remove TYPE Column** (Products table)
   - Currently: Shows both Category AND Type
   - Needed: Show Category only (Type is redundant)
   - Reason: Cleaner, type derived from category

3. **Add Filters** (Products table)
   - Currently: No filter UI shown
   - Needed: Filter dropdown for Category and Type
   - Location: Above table or in toolbar

4. **Add "+ New Waste Fraction"** (Waste Fractions tab)
   - Currently: Missing button
   - Needed: Button in top right to create new fractions

### **Medium Priority:**

5. **View Schema Modal** (Category table actions)
   - Currently: Not shown in Figma
   - Needed: Read-only version of Configure Schema
   - For: Viewing schema without edit permissions

6. **Add Missing Product Table Columns:**
   - Status toggle (Active/Inactive)
   - Actions (View button)
   - These are shown in mockup but missing in Figma

### **Low Priority:**

7. **Empty States:**
   - No categories created yet
   - No products created yet
   - No search results

8. **Loading States:**
   - Table loading skeleton
   - Form submission loading

---

## 🎓 For Developers: Implementation Notes

### **Backend Focus:**

**Tables to Create:**
- `product_types` (5 rows seeded)
- `product_categories` (with schema_config JSON, category_rules JSON)
- `products` (basic info)
- `product_schema_data` (28 fields from PD-39)
- `waste_fractions` (8 rows seeded)

**Key APIs:**
- POST /api/categories - Create category
- PUT /api/categories/{id}/schema - Configure schema
- GET /api/categories/{id}/schema-fields - Get enabled fields only
- POST /api/products - Create product (validate against schema)
- GET/POST/PUT /api/waste-fractions - CRUD

**Critical Logic:**
- Schema validation: Reject fields not in category schema
- Dynamic field fetching: Return only enabled fields for a category
- Type-based defaults: Suggest field configurations by type

### **Frontend Focus:**

**Core Components to Build:**
- CategoryTable component
- NewCategoryModal component (with dynamic schema preview)
- ConfigureSchemaModal component (grouped field tables)
- NewProductModal component (completely dynamic form renderer)
- ProductsTable component
- WasteFractionsTable component
- EditWasteFractionModal component

**Critical Logic:**
- Dynamic form rendering from JSON schema definition
- Form field components for each type (text, select, checkbox, multiselect, number)
- Category→Schema→Form flow (select category triggers schema fetch triggers form render)
- Grouped field display (not flat list)

---

## 🚨 Open Questions to Resolve

These questions should be answered BEFORE starting development:

### **Question 1: Field Restrictions by Type**
**Issue:** PD-41 gives ONE example (emptying intervals not for recurring fees). Are other restrictions assumed or configurable?

**Impact:** Affects Configure Schema modal - which fields to show/hide based on type

**Options:**
- A) Hardcode restrictions (Service can't have container_type)
- B) Let admin configure anything (flexible)
- C) Suggest defaults but allow override

**Current Figma:** Shows different fields by type (assumes restrictions)

**Recommendation:** Option C - suggest but don't enforce

---

### **Question 2: Schema Changes on Existing Products**
**Issue:** If category schema updated after products exist, what happens?

**Impact:** Data integrity, user experience

**Options:**
- A) Schema changes only affect NEW products (existing unchanged)
- B) Existing products become invalid if fields removed
- C) Migration wizard when schema changes

**Recommendation:** Option A (simplest, safest)

---

### **Question 3: Category Type Locked?**
**Issue:** Can category type be changed after creation?

**Impact:** Would invalidate all products if type changes (different schemas)

**Recommendation:** Lock type after category created

---

## 📦 Acceptance Demo Script

**Sprint 1 Demo Flow:**

1. **Show Empty State**
   - Open Product Categories tab → Empty (or just examples)

2. **Create Category**
   - Click "+ New Category"
   - Enter name: "Hazardous Waste Services"
   - Select type: "Service Product"
   - See schema preview appear with field groups
   - Click "Create Category"
   - See new category in table with "Service Product" badge

3. **Configure Schema**
   - Click "⚙️ Configure" on new category
   - See all available fields grouped
   - Enable "Waste Fraction" (required)
   - Enable "EWC/LoW Code" (required)
   - Enable "Hazardous Properties" (required)
   - Disable "Container Type" (not relevant)
   - Save configuration

4. **Create Product**
   - Click "+ New Product"
   - Enter name: "Chemical Waste Collection"
   - Select category: "Hazardous Waste Services"
   - See form load with ONLY the 3 configured fields
   - Fill: Waste Fraction (Hazardous), EWC Code (16 06 01), Properties (Hazardous checked)
   - Save product
   - See product in table with "Hazardous Waste Services" category badge

5. **Show Waste Fractions**
   - Switch to Waste Fractions tab
   - Show 8 pre-seeded fractions
   - Click Edit on "Hazardous Waste"
   - Show all fields including Properties checkboxes
   - Close modal

**Key Takeaway:** Form showed ONLY 3 fields because that's what was configured in schema. This is the power of the schema system!

---

## 📈 Sprint 1 Success Metrics

**Velocity:**
- Planned: 34 points
- Completed: TBD

**Functionality:**
- 3 stories completed
- PD-39: 100% complete ✅
- PD-41: 80% complete (BOM in Sprint 2)

**Quality:**
- All acceptance criteria met
- No critical bugs
- Schema system working as designed

**Ready for Sprint 2:**
- Product foundation stable
- Can add Bill of Materials (PD-40)
- Can add Additional Services (PD-38)
- Can add Service Levels (PD-37)
