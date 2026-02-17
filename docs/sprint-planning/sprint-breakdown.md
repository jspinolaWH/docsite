---
title: "Sprint Breakdown (20 PD Stories)"
slug: "sprint-breakdown"
category: "sprint-planning"
order: 1
description: "Complete 6-sprint breakdown covering 20 PD stories across product catalog, pricing, and integration work."
related:
  - "pd-sprint-mapping"
  - "sprint1-guide"
  - "wh1-vs-wh2-gaps"
tags:
  - "sprints"
  - "planning"
  - "stories"
  - "breakdown"
  - "timeline"
---

# WasteHero 2.0 - Sprint Breakdown (20 PD Stories)
**Team:** 2 Frontend + 3 Backend = 5 developers
**Sprint Duration:** 1 week
**Total:** 6 sprints (6 weeks)

---

## 📅 SPRINT 1: Foundation - Product Catalog & Schema (Week 1)

**Goal:** Build product type system, categories, and dynamic schema configuration

### **Story 1.1: Product Types & Categories (PD-41)**
**Epic:** PD-41 Product Catalog
**Points:** 13

**Subtasks:**

**Backend:**
- [ ] **1.1.1** Create `product_types` table (5 types: service, container, additional, onefee, recurring)
- [ ] **1.1.2** Create `product_categories` table with `type_id` FK and `schema_config` JSON field
- [ ] **1.1.3** Create REST API: `POST /api/categories` (create category)
- [ ] **1.1.4** Create REST API: `GET /api/categories` with type filtering
- [ ] **1.1.5** Create REST API: `PUT /api/categories/{id}/schema` (configure schema)

**Frontend:**
- [ ] **1.1.6** Build Product Categories tab with table view (depends on 1.1.4)
- [ ] **1.1.7** Build "New Category" modal with type dropdown (depends on 1.1.3)
- [ ] **1.1.8** Build "Configure Schema" modal with grouped field checkboxes (depends on 1.1.5)
- [ ] **1.1.9** Build "View Schema" modal (read-only schema display) (depends on 1.1.4)

**Testing:**
- [ ] **1.1.10** Integration test: Create category → Configure schema → Verify fields stored

---

### **Story 1.2: Dynamic Product Schema (PD-39)**
**Epic:** PD-39 Product Schema
**Points:** 13

**Subtasks:**

**Backend:**
- [ ] **1.2.1** Create `product_schema_data` table with 28 fields from PD-39
- [ ] **1.2.2** Create schema field definitions (waste_fraction, ewc_code, rd_code, etc.)
- [ ] **1.2.3** Create REST API: `GET /api/categories/{id}/schema-fields` (return only enabled fields)
- [ ] **1.2.4** Create validation service: Validate product data against category schema
- [ ] **1.2.5** Create REST API: `POST /api/products` with dynamic schema validation

**Frontend:**
- [ ] **1.2.6** Build dynamic product form that loads schema from category (depends on 1.2.3)
- [ ] **1.2.7** Implement grouped field rendering (Waste Classification, Service-Specific, etc.)
- [ ] **1.2.8** Add required/optional indicators based on schema (depends on 1.2.3)
- [ ] **1.2.9** Build Products table with category/type columns and filtering (depends on 1.2.5)

**Testing:**
- [ ] **1.2.10** Test: Service category shows waste codes, NO container type
- [ ] **1.2.11** Test: Container category shows container type, NO emptying intervals (PD-41 example)

---

### **Story 1.3: Waste Fractions Reference Data (PD-39)**
**Epic:** PD-39 Product Schema
**Points:** 8

**Subtasks:**

**Backend:**
- [ ] **1.3.1** Create `waste_fractions` table (name, code, ewc_code, hazardous, recyclable)
- [ ] **1.3.2** Create REST API: `GET /api/waste-fractions` with search
- [ ] **1.3.3** Create REST API: `POST /api/waste-fractions` (create/edit)
- [ ] **1.3.4** Seed initial waste fractions (Mixed, Bio, Paper, Plastic, Glass, Metal, Hazardous, WEEE)

**Frontend:**
- [ ] **1.3.5** Build Waste Fractions tab with table (depends on 1.3.2)
- [ ] **1.3.6** Build Edit Waste Fraction modal (depends on 1.3.3)
- [ ] **1.3.7** Add properties badges (Recyclable, Hazardous) display
- [ ] **1.3.8** Add UX note: "Consider moving to Settings" (rarely changed)

**Testing:**
- [ ] **1.3.9** Test: Create waste fraction → Used in product schema dropdown

---

## 📅 SPRINT 2: Product Details - BOM, Services, Levels (Week 2)

**Goal:** Add product detail tabs (components, additional services, service levels)

### **Story 2.1: Bill of Materials (PD-40)**
**Epic:** PD-40 Product Composition
**Points:** 13

**Subtasks:**

**Backend:**
- [ ] **2.1.1** Create `product_components` table (component_id, product_id, name, price, unit, sequence)
- [ ] **2.1.2** Create REST API: `GET /api/products/{id}/components` (get BOM)
- [ ] **2.1.3** Create REST API: `POST /api/products/{id}/components` (add component)
- [ ] **2.1.4** Create REST API: `PUT /api/components/{id}` (edit component)
- [ ] **2.1.5** Create REST API: `DELETE /api/components/{id}` (remove component)
- [ ] **2.1.6** Add component sequence/ordering logic

**Frontend:**
- [ ] **2.1.7** Build Bill of Materials tab with components table (depends on 2.1.2)
- [ ] **2.1.8** Build "+ Add Component" button and form (depends on 2.1.3)
- [ ] **2.1.9** Add edit/delete actions per row (depends on 2.1.4, 2.1.5)
- [ ] **2.1.10** Show total calculated from components
- [ ] **2.1.11** Support 6 unit types (PD-326): per month, per collection, per kg, per m³, per hour, per piece

**Testing:**
- [ ] **2.1.12** Test: Add component → Total updates → Delete component → Total recalculates

---

### **Story 2.2: Additional Services (PD-38)**
**Epic:** PD-38 Additional Services
**Points:** 13

**Subtasks:**

**Backend:**
- [ ] **2.2.1** Create `additional_services` table (application_method, default_price, automatic_rules JSON, office_approval)
- [ ] **2.2.2** Create REST API: `GET /api/products/{id}/additional-services`
- [ ] **2.2.3** Create automatic rules engine (IF conditions → THEN apply service)
- [ ] **2.2.4** Create driver request workflow API (create request, approve, reject)
- [ ] **2.2.5** Add automatic service application on ticket status change

**Frontend:**
- [ ] **2.2.6** Build Additional Services tab with 3 method cards (depends on 2.2.2)
- [ ] **2.2.7** Build Automatic card (yellow) with "Configure Rules" button
- [ ] **2.2.8** Build Manual card (blue) with manual addition UI
- [ ] **2.2.9** Build Driver-Initiated card (green) with workflow diagram
- [ ] **2.2.10** Add PD-38 use case examples in info boxes
- [ ] **2.2.11** Build schema fields for Additional Service category type (6 rule fields)

**Testing:**
- [ ] **2.2.12** Test: Ticket status = access_denied → Cancellation fee auto-added
- [ ] **2.2.13** Test: Driver creates request → Office approves → Service added to invoice

---

### **Story 2.3: Service Levels (PD-37, PD-324)**
**Epic:** PD-37 Service Levels + PD-324 Speed Pricing
**Points:** 8

**Subtasks:**

**Backend:**
- [ ] **2.3.1** Create `service_levels` table (level_id, product_id, name, timeframe, surcharge)
- [ ] **2.3.2** Create REST API: `GET /api/products/{id}/service-levels`
- [ ] **2.3.3** Create REST API: `POST /api/products/{id}/service-levels` (add level)
- [ ] **2.3.4** Add service level surcharge calculation in pricing engine

**Frontend:**
- [ ] **2.3.5** Build Service Levels tab with table (depends on 2.3.2)
- [ ] **2.3.6** Build "+ Add Level" modal (depends on 2.3.3)
- [ ] **2.3.7** Add Edit buttons per row
- [ ] **2.3.8** Show timeframe + surcharge columns

**Testing:**
- [ ] **2.3.9** Test: Create level → Select in order → Surcharge applied to price

---

### **Story 2.4: Service Responsibility & Default Weights (PD-35, PD-34)**
**Epic:** PD-35 Responsibility + PD-34 Weights
**Points:** 5

**Subtasks:**

**Backend:**
- [ ] **2.4.1** Add `default_responsibility` field to products table
- [ ] **2.4.2** Add `default_weight_kg` field to product_schema_data
- [ ] **2.4.3** Create REST API: Update product responsibility/weight

**Frontend:**
- [ ] **2.4.4** Build Responsibility tab with explanation boxes (depends on 2.4.3)
- [ ] **2.4.5** Add PD-35 contradiction warning in red box
- [ ] **2.4.6** Merge Weights section into Configuration tab
- [ ] **2.4.7** Merge Portal section into Configuration tab (consolidate from 7→5 tabs)

**Testing:**
- [ ] **2.4.8** Test: Set responsibility → Verify it doesn't override customer/contract (per PD-35)

---

## 📅 SPRINT 3: Basic Pricing - Price Lists, Rows, Zones (Week 3)

**Goal:** Build price list system with multi-condition pricing and zone mapping

### **Story 3.1: Price Lists & Price Rows (PD-330, PD-322)**
**Epic:** PD-330 Price Lists + PD-322 Price Determination
**Points:** 21

**Subtasks:**

**Backend:**
- [ ] **3.1.1** Create `price_lists` table (name, valid_from, valid_until, applied_to_category, status)
- [ ] **3.1.2** Create `price_rows` table (price_list_id FK, product_id FK, customer_type, zone_id FK, service_responsibility, rd_code, price, unit, currency)
- [ ] **3.1.3** Create REST API: `POST /api/price-lists` (create price list)
- [ ] **3.1.4** Create REST API: `GET /api/price-lists` with filtering
- [ ] **3.1.5** Create REST API: `POST /api/price-lists/{id}/products` (add product with conditions)
- [ ] **3.1.6** Create REST API: `GET /api/price-lists/{id}/products` (get all price rows, grouped by product)
- [ ] **3.1.7** Implement PD-330 matching algorithm (find row with most matching conditions)
- [ ] **3.1.8** Implement tie-breaking logic (select lowest price when tied)
- [ ] **3.1.9** Add "Any" wildcard support for all condition fields

**Frontend:**
- [ ] **3.1.10** Build Price Lists tab with cards view (depends on 3.1.4)
- [ ] **3.1.11** Build "New Price List" modal (depends on 3.1.3)
- [ ] **3.1.12** Build Price List detail view with tabs (depends on 3.1.6)
- [ ] **3.1.13** Build Products tab showing multiple rows per product (depends on 3.1.6)
- [ ] **3.1.14** Add all condition columns: Customer Type, Zone, Service Resp, R/D Code, Price, Unit
- [ ] **3.1.15** Build "Add Product to Price List" modal (depends on 3.1.5)
- [ ] **3.1.16** Add condition dropdowns (Customer Type, Zone, Service Resp, R/D Code)
- [ ] **3.1.17** Add price + unit inputs (6 unit types from PD-326)
- [ ] **3.1.18** Add PD-322 explanation box (multiple prices for same product)
- [ ] **3.1.19** Add PD-330 matching logic explanation box

**Testing:**
- [ ] **3.1.20** Test: Add product → Create 4 condition rows → Verify all visible
- [ ] **3.1.21** Test: Customer order → Verify matching picks row with most matches
- [ ] **3.1.22** Test: Tied matches → Verify lowest price selected

---

### **Story 3.2: Geographical Zones (PD-325)**
**Epic:** PD-325 Zone-Based Pricing
**Points:** 13

**Subtasks:**

**Backend:**
- [ ] **3.2.1** Create `zones` table (zone_id, name, polygon_coordinates JSON, property_count, area_km2, color)
- [ ] **3.2.2** Create REST API: `POST /api/zones` (create zone with polygon)
- [ ] **3.2.3** Create REST API: `GET /api/zones` (list all zones)
- [ ] **3.2.4** Create geospatial service: Check if coordinates fall within zone polygon
- [ ] **3.2.5** Create REST API: `GET /api/zones/detect?lat=X&lng=Y` (return zone for location)
- [ ] **3.2.6** Integrate zone detection into price matching (zone becomes condition)

**Frontend:**
- [ ] **3.2.7** Build Zones tab with map + sidebar layout (depends on 3.2.3)
- [ ] **3.2.8** Integrate Leaflet map library for polygon display
- [ ] **3.2.9** Render existing zones as colored polygons on map (depends on 3.2.3)
- [ ] **3.2.10** Add zone click → Highlight + show info panel
- [ ] **3.2.11** Build polygon drawing tool (integrates with 3.2.2)
- [ ] **3.2.12** Add upload coordinates/GeoJSON functionality
- [ ] **3.2.13** Add map legend with zone colors
- [ ] **3.2.14** Hide map tools by default, show only in create/edit mode

**Testing:**
- [ ] **3.2.15** Test: Create zone polygon → Properties auto-assigned
- [ ] **3.2.16** Test: Property location → Correct zone detected → Correct price applied

---

### **Story 3.3: Pricing Units (PD-326)**
**Epic:** PD-326 Weight/Volume/Time Pricing
**Points:** 5

**Subtasks:**

**Backend:**
- [ ] **3.3.1** Create pricing units enum (per_piece, per_kg, per_ton, per_m3, per_liter, per_meter, per_hour)
- [ ] **3.3.2** Add unit validation to price_rows table
- [ ] **3.3.3** Add unit conversion rules (kg ↔ ton, m³ ↔ liter)

**Frontend:**
- [ ] **3.3.4** Add Unit dropdown to "Add Product to Price List" modal (depends on 3.3.1)
- [ ] **3.3.5** Add Unit column to price rows table
- [ ] **3.3.6** Add Unit column to Bill of Materials components table

**Testing:**
- [ ] **3.3.7** Test: Create price with each of 6 unit types → Verify saves correctly

---

## 📅 SPRINT 4: Advanced Pricing - Bulk Edit, Scheduling, Audit (Week 4)

**Goal:** Build price management tools (bulk editing, scheduling, change tracking)

### **Story 4.1: Bulk Price Editing (PD-331, PD-320)**
**Epic:** PD-331 Bulk Edit + PD-320 Price Changes
**Points:** 13

**Subtasks:**

**Backend:**
- [ ] **4.1.1** Create REST API: `POST /api/price-lists/{id}/bulk-edit` (apply changes to multiple rows)
- [ ] **4.1.2** Support 4 actions: Increase %, Decrease %, Set fixed value, Multiply by
- [ ] **4.1.3** Add preview mode (calculate changes without saving)
- [ ] **4.1.4** Add batch update transaction (all or nothing)
- [ ] **4.1.5** Create price change event for audit logging

**Frontend:**
- [ ] **4.1.6** Add checkboxes to price rows table (depends on Sprint 3.1.13)
- [ ] **4.1.7** Build bulk edit section (hidden by default) (depends on 4.1.1)
- [ ] **4.1.8** Show bulk edit at TOP only when rows selected
- [ ] **4.1.9** Add selected count display ("X rows selected")
- [ ] **4.1.10** Add Action dropdown (Increase/Decrease/Set/Multiply)
- [ ] **4.1.11** Add Value input field
- [ ] **4.1.12** Build Preview button (depends on 4.1.3)
- [ ] **4.1.13** Build Apply button with confirmation

**Testing:**
- [ ] **4.1.14** Test: Select 10 rows → Increase 5% → Preview → Apply → Verify all updated
- [ ] **4.1.15** Test: Bulk edit failure → Verify rollback (transaction integrity)

---

### **Story 4.2: Scheduled Price Updates (PD-328)**
**Epic:** PD-328 Scheduled Updates
**Points:** 13

**Subtasks:**

**Backend:**
- [ ] **4.2.1** Create `scheduled_price_updates` table (schedule_id, price_row_id FK, current_price, new_price, effective_date, status, reason)
- [ ] **4.2.2** Create REST API: `POST /api/price-lists/{id}/schedule-update` (schedule future price)
- [ ] **4.2.3** Create REST API: `GET /api/price-lists/{id}/scheduled` (list pending updates)
- [ ] **4.2.4** Create background job: Apply scheduled updates on effective_date
- [ ] **4.2.5** Add price retrieval logic: Check service_date against effective_date

**Frontend:**
- [ ] **4.2.6** Build Scheduled tab in price list detail (depends on 4.2.3)
- [ ] **4.2.7** Build table showing: Product, Current, New, Effective Date, Status
- [ ] **4.2.8** Build "+ Schedule Update" button and modal (depends on 4.2.2)
- [ ] **4.2.9** Add date picker for effective date
- [ ] **4.2.10** Add status badges (Pending, Applied, Cancelled)

**Testing:**
- [ ] **4.2.11** Test: Schedule update for Jan 1 → Order Dec 28 = old price → Order Jan 5 = new price
- [ ] **4.2.12** Test: Background job applies updates on effective date

---

### **Story 4.3: Price Change Logging (PD-329)**
**Epic:** PD-329 Price Logs
**Points:** 8

**Subtasks:**

**Backend:**
- [ ] **4.3.1** Create `price_change_log` table (log_id, price_row_id FK, old_price, new_price, changed_by, changed_at, reason, change_type)
- [ ] **4.3.2** Create audit trigger: Log ALL price changes automatically
- [ ] **4.3.3** Create REST API: `GET /api/price-lists/{id}/logs` with filtering
- [ ] **4.3.4** Capture change_type (Manual, Bulk Edit, Scheduled)

**Frontend:**
- [ ] **4.3.5** Build Log tab in price list detail (depends on 4.3.3)
- [ ] **4.3.6** Build table: What Changed, When, Who, Why, Type
- [ ] **4.3.7** Add filtering by date range, change type
- [ ] **4.3.8** Add reason display with full text on hover

**Testing:**
- [ ] **4.3.9** Test: Edit price → Verify log entry created with all metadata
- [ ] **4.3.10** Test: Bulk edit → Verify multiple log entries created

---

## 📅 SPRINT 5: Dynamic Pricing - Surcharges & Discounts (Week 5)

**Goal:** Add time-based surcharges, service speed integration, discounts

### **Story 5.1: Time-Based Surcharges (PD-323)**
**Epic:** PD-323 Time-Based Pricing
**Points:** 13

**Subtasks:**

**Backend:**
- [ ] **5.1.1** Create `time_surcharges` table (surcharge_id, price_list_id FK, product_id FK, timing_type, calendar_rules JSON, surcharge)
- [ ] **5.1.2** Create REST API: `POST /api/price-lists/{id}/time-surcharges`
- [ ] **5.1.3** Create REST API: `GET /api/price-lists/{id}/products/{pid}/time-surcharges`
- [ ] **5.1.4** Create calendar rules engine (Weekend, Holiday, Peak hours)
- [ ] **5.1.5** Integrate time surcharges into pricing calculation
- [ ] **5.1.6** Add regional holiday calendar support (Finnish holidays, etc.)

**Frontend:**
- [ ] **5.1.7** Make product name clickable in price list table (depends on Sprint 3)
- [ ] **5.1.8** Build Product Price Detail modal with tabs
- [ ] **5.1.9** Build Timing tab showing Weekend/Holiday surcharges (depends on 5.1.3)
- [ ] **5.1.10** Build form to add/edit time surcharges (depends on 5.1.2)
- [ ] **5.1.11** Add calendar picker for holiday dates

**Testing:**
- [ ] **5.1.12** Test: Order on Saturday → Weekend surcharge applied
- [ ] **5.1.13** Test: Order on Christmas → Holiday surcharge applied
- [ ] **5.1.14** Test: Speed + Time surcharges stack correctly

---

### **Story 5.2: Discounts (PD-321)**
**Epic:** PD-321 Discounts
**Points:** 8

**Subtasks:**

**Backend:**
- [ ] **5.2.1** Create `discounts` table (discount_id, price_list_id FK, product_id FK nullable, discount_type, value, valid_from, valid_until)
- [ ] **5.2.2** Create REST API: `POST /api/price-lists/{id}/discounts`
- [ ] **5.2.3** Create REST API: `GET /api/price-lists/{id}/discounts`
- [ ] **5.2.4** Integrate discounts into pricing calculation (apply after surcharges)
- [ ] **5.2.5** Support percentage and fixed amount discounts

**Frontend:**
- [ ] **5.2.6** Build Discounts tab in Product Price Detail modal (depends on 5.2.3)
- [ ] **5.2.7** Build form to add discount (depends on 5.2.2)
- [ ] **5.2.8** Add date range picker for validity period

**Testing:**
- [ ] **5.2.9** Test: Apply 10% discount → Verify final price reduced correctly
- [ ] **5.2.10** Test: Discount valid_until expired → Not applied

---

### **Story 5.3: Component-Level Pricing (PD-327)**
**Epic:** PD-327 Component Pricing
**Points:** 8

**Subtasks:**

**Backend:**
- [ ] **5.3.1** Add component-level pricing support in price lists
- [ ] **5.3.2** Create REST API: Component price overrides per price list
- [ ] **5.3.3** Price calculation: Use component prices if defined, else product defaults

**Frontend:**
- [ ] **5.3.4** Build Components tab in Product Price Detail modal (depends on 5.3.2)
- [ ] **5.3.5** Show component price table with override capability
- [ ] **5.3.6** Add formula column showing calculation

**Testing:**
- [ ] **5.3.7** Test: Override component price in price list → Verify used instead of default

---

## 📅 SPRINT 6: Integration & Polish (Week 6)

**Goal:** Final integrations, edge cases, waste water feature

### **Story 6.1: Complete Pricing Engine Integration**
**Epic:** All Pricing PDs
**Points:** 13

**Subtasks:**

**Backend:**
- [ ] **6.1.1** Build complete pricing calculation service integrating all PDs
- [ ] **6.1.2** Add pricing breakdown API response (base + surcharges + services + discounts)
- [ ] **6.1.3** Add pricing explanation endpoint (why this price?)
- [ ] **6.1.4** Performance optimization for matching algorithm
- [ ] **6.1.5** Add caching for frequently accessed price lists

**Frontend:**
- [ ] **6.1.6** Build price calculation preview in order flow (depends on 6.1.1)
- [ ] **6.1.7** Show pricing breakdown to user (base + all additions)
- [ ] **6.1.8** Add price explanation modal (depends on 6.1.3)
- [ ] **6.1.9** Add loading states for price calculations

**Testing:**
- [ ] **6.1.10** End-to-end test: All pricing scenarios from flow diagrams
- [ ] **6.1.11** Test edge cases: No match, tied matches, overtime, automatic services
- [ ] **6.1.12** Performance test: 10,000 price rows → Match within 100ms

---

### **Story 6.2: Waste Water Treatment (PD-353)**
**Epic:** PD-353 Waste Water
**Points:** 8

**Subtasks:**

**Backend:**
- [ ] **6.2.1** Create waste water tables (separate feature, not in product management)
- [ ] **6.2.2** Create waste water APIs

**Frontend:**
- [ ] **6.2.3** Build waste water UI (separate from product management)

**Testing:**
- [ ] **6.2.4** Test waste water feature independently

---

### **Story 6.3: Polish & Edge Cases**
**Epic:** Final touches
**Points:** 8

**Subtasks:**

**Backend:**
- [ ] **6.3.1** Add comprehensive error handling for all edge cases
- [ ] **6.3.2** Add data validation for all inputs
- [ ] **6.3.3** Add database indexes for performance

**Frontend:**
- [ ] **6.3.4** Add loading states and error messages throughout
- [ ] **6.3.5** Add confirmation dialogs for destructive actions
- [ ] **6.3.6** Responsive design testing
- [ ] **6.3.7** Add PD Overview tab with implementation summary
- [ ] **6.3.8** Add tooltips and help text where needed

**Testing:**
- [ ] **6.3.9** Full regression testing suite
- [ ] **6.3.10** User acceptance testing

---

## 📊 SPRINT SUMMARY

| Sprint | Stories | Total Points | Focus |
|--------|---------|--------------|-------|
| Sprint 1 | 3 stories | 34 points | Foundation (Types, Categories, Schema, Waste Fractions) |
| Sprint 2 | 4 stories | 39 points | Product Details (BOM, Additional Services, Levels, Responsibility) |
| Sprint 3 | 3 stories | 42 points | Pricing Core (Price Lists, Rows, Zones, Units) |
| Sprint 4 | 3 stories | 42 points | Price Management (Bulk Edit, Scheduling, Logs) |
| Sprint 5 | 3 stories | 29 points | Dynamic Pricing (Time, Discounts, Components) |
| Sprint 6 | 3 stories | 29 points | Integration & Polish |

**Total:** 19 stories, ~215 points, 6 sprints (6 weeks)

---

## 🔗 KEY DEPENDENCIES

### **Must Complete First:**
Sprint 1 (Foundation) → Everything depends on this

### **Sequential:**
Sprint 1 → Sprint 2 (Product details need foundation)
Sprint 2 → Sprint 3 (Pricing needs products)
Sprint 3 → Sprint 4 (Advanced pricing needs basic pricing)
Sprint 3 → Sprint 5 (Dynamic pricing needs price rows)

### **Parallel Opportunities:**
- Sprint 4 & 5 can partially overlap (different teams)
- Waste Water (6.2) can be done anytime (standalone)

---

## 👥 TEAM ALLOCATION PER SPRINT

**Frontend Team (2 devs):**
- Focus on UI components, forms, tables, modals
- ~15-20 subtasks per sprint
- Depends on backend APIs being ready

**Backend Team (3 devs):**
- Focus on tables, APIs, business logic, matching algorithms
- ~15-18 subtasks per sprint
- Should complete APIs before frontend needs them

**Typical Sprint Flow:**
- Days 1-2: Backend creates tables + APIs
- Days 3-5: Frontend builds UI using APIs + Backend adds business logic
- Days 5-7: Integration testing + Bug fixes

---

## ⚠️ RISKS & MITIGATION

**Risk 1:** Frontend blocked waiting for APIs
**Mitigation:** Backend prioritizes API creation first 2 days

**Risk 2:** Complex matching algorithm (PD-330)
**Mitigation:** Allocate extra time in Sprint 3, senior dev assigned

**Risk 3:** Map integration complexity (PD-325)
**Mitigation:** Use proven library (Leaflet), allow buffer time

**Risk 4:** Schema system complexity
**Mitigation:** Start simple in Sprint 1, iterate based on learnings

---

## 📋 OPEN QUESTIONS TO RESOLVE BEFORE STARTING

1. **Service Responsibility at product level (PD-35)** - Does it do anything? Should it exist?
2. **Field restrictions by type** - Only 1 explicit example (emptying intervals). Are others assumed or configurable?
3. **Service Levels for containers** - Should containers have service levels tab?
4. **Component reusability** - Are components product-specific or reusable library?

**Recommendation:** Clarify these with product owner before Sprint 1 starts.
