---
title: "WH1.0 vs WH2.0 Critical Gaps Analysis"
slug: "wh1-vs-wh2-gaps"
category: "gap-analysis"
order: 1
description: "Comprehensive analysis of 10 critical gaps between WasteHero 1.0 capabilities and WH 2.0 requirements based on Jira PD descriptions."
related:
  - "gap-questions"
  - "sprint-breakdown"
  - "product-types-explained"
tags:
  - "gaps"
  - "analysis"
  - "WH1"
  - "WH2"
  - "requirements"
  - "PD"
---

# WasteHero 1.0 vs 2.0 - Critical Gaps Analysis

**Date:** January 20, 2026
**Purpose:** Identify gaps between WH 1.0 current capabilities and WH 2.0 requirements based on actual Jira PD descriptions

---

## Gap 1: Contract Flexibility

### What PD-330 Actually Says:

> "When the price differs from the one defined in the general price list, the price can be set directly on a **contract**. **A contract can be linked either to a customer or to a property.**"

### What PD-320 Actually Says:

> "**Customer- or property-specific price changes** are made at the individual customer or property level without altering the base price list."

### WH 1.0 Current State:

- ✅ **Agreements exist** - bind products to properties
- ✅ Products attached to properties via agreements
- ❌ Agreements only link to **properties** (not customers)
- ❌ No customer-level pricing possible
- ❌ No customer-specific price exceptions

### WH 2.0 Requirement:

- Contracts must exist *(PD-330)*
- **Contracts can be linked to EITHER customers OR properties** *(PD-330)*
- Customer-specific pricing must be possible *(PD-320, PD-330)*
- Property-specific pricing must be possible *(PD-320)*
- Contract price overrides general price list *(PD-330)*

### Gap:

WH 1.0 has "agreements" but they only work at **property level**. WH 2.0 requires contracts that can be linked to **either customers or properties**, with pricing exceptions at both levels.

**Missing:**
- Customer-level contracts
- Customer-specific pricing exceptions
- Flexible contract entity (customer OR property)

---

## Gap 2: Property Pools & Shared Services

### What PD-36 Actually Says:

> "As a customer-service user, I want to be able to create and delete property pools, so that I can manage properties that share the same services sold to a pool."
>
> "I want to be able to add a customer to one or more pools, so that the customer can share the services of those pools."
>
> "Belonging to a sharing service must be reflected in the customer data of the customers belonging to it."

### What PD-348 Actually Says:

> "I want the contracts of the subscribers to a shared service to include information of the shared service as well as of the collection locations."
>
> "I want to split the invoice for a shared service amongst the subscribers according to their share in the service."

### WH 1.0 Current State:

- ✅ **Property Groups exist** - can group multiple properties
- ❌ Property Groups **lack shared service functionality**
- ❌ No cost allocation/invoicing split among properties in group (we have single and shared, not sure how it works 😔)
- ❌ No usage share calculation
- ❌ No shared service information in agreements/contracts
- ❌ Customer membership in pools not reflected in customer data
- ❌ No role-based access (administrator vs participant)

### WH 2.0 Requirement:

- Property pools with multiple properties *(PD-36)*
- Customers can belong to multiple pools *(PD-36)*
- **Shared services with cost allocation** *(PD-348)*
- **Invoicing split by usage shares** (e.g., Property A pays 50%, Property B pays 30%) *(PD-348)*
- Subscriber contracts include shared service info *(PD-348)*
- Pool membership reflected in customer data *(PD-36)*
- Role-based access (Manager, Participant, Payer) *(PD-348)*
- Multiple collection points per pool *(PD-36)*

### Gap:

WH 1.0 has basic **property grouping** but lacks the core **shared service functionality**:
- No cost allocation mechanism
- No invoicing split by usage shares
- No contract integration with shared service info
- No role-based pool management

**Missing:**
- Cost/invoice splitting logic
- Usage share configuration
- Shared service contract documentation
- Role-based access control for pools
- Customer membership tracking in pools

---

## Gap 3: Price Determination with Multiple Conditions

### What PD-322 Actually Says:

> "I want to be able to define multiple prices for the same product based on the product's attributes."
>
> "I want the same product to have separate prices for different customer categories."
>
> "I want to be able to distinguish between service responsibilities when pricing products."
>
> "I want the customer's location to impact on a product's price, so that zone-based conditions are taken into consideration."

### What PD-330 Actually Says:

> "The price list may contain multiple rows for the same product, differentiated by different attributes (e.g. service responsibility, region, R/D code)."
>
> "When retrieving a price: The system checks if there is a row in the price list where all the requested attributes match the customer's data. If an exact match is found, that row is selected. If no exact match is found, the row with the highest number of matching attributes is selected."

### WH 1.0 Current State:

- One product = One price per period
- **Rigid exact-match logic:** Property Type + Container Type + Waste Fraction + Pickup Setting (must match all 4)
- ❌ No customer category-based pricing
- ❌ No zone-based pricing
- ❌ No service responsibility classification
- ❌ No automatic best-match price selection
- ❌ Cannot have multiple price rows for same product

### WH 2.0 Requirement:

- **Multiple price rows for same product** *(PD-322, PD-330)*
- Prices vary by:
  - Product attributes *(PD-322)*
  - Customer categories *(PD-322)*
  - Service responsibility *(PD-322)*
  - Location/zone *(PD-322)*
  - Region *(PD-330)*
  - Processing method *(PD-322)*
- **Automatic best-match price selection** *(PD-330)*
  - Check for exact match on all attributes
  - If no exact match, select row with most matching attributes
- Attribute-based price matching *(PD-330)*

### Gap:

WH 1.0's **rigid 4-field exact-match logic** cannot handle WH 2.0's flexible multi-condition pricing. Need rules-based price determination engine.

**Missing:**
- Multiple price rows per product
- Customer category pricing
- Zone-based pricing
- Service responsibility classification
- Best-match algorithm (most attributes matched)
- Flexible attribute-based matching

---

## Gap 4: Contractor Pricing & Performance

### What PD-317 Requirement States:

> "Contractor and customer prices as distinct prices for the same products and services so that purchase and sales prices can be managed."

### What PD-314 Actually Says:

> "The WasteHero application should apply predefined bonuses and penalties to contractor prices based on their performance assessments."
>
> "Maintain a complaints register where complaints from customers and staff are recorded and categorized with points that affect contractor's compensation."

### WH 1.0 Current State:

- ❌ No contractor pricing tracked
- ❌ No separation of purchase vs sales prices
- ❌ No performance tracking
- ❌ No complaints register
- ❌ No bonuses/penalties system
- ❌ Only customer-facing prices exist

### WH 2.0 Requirement:

- **Separate contractor price lists** (distinct from customer prices) *(PD-313, PD-317)*
- Contractor prices independent of customer prices *(PD-317)*
- **Performance-based bonuses/penalties** *(PD-314)*
- **Complaints register** with point system *(PD-314)*
- Zone-based contractor pricing *(PD-316)*
- Contractor-specific pricing models *(PD-315)*
- Bulk contractor price adjustments *(PD-311, PD-312)*
- Index-based price increases (e.g., fuel index) *(PD-312)*
- Modify contractor prices independently of customer invoices *(PD-317)*
- Role-based visibility (contractors can't see customer prices) *(PD-317)*

### Gap:

WH 1.0 has **no contractor pricing module at all**. Entirely new dual-pricing system needed.

**Missing:**
- Contractor price lists (purchase prices)
- Margin tracking (customer price - contractor price)
- Performance management system
- Complaints register
- Bonus/penalty calculation
- Zone-based contractor rates
- Contractor-specific pricing models

---

## Gap 5: Bulk Price Management

### What PD-331 Actually Says:

> "As a sales user, I want to be able to modify prices in bulk, so that I can make changes to the prices for a set of selected products with the minimum amount of effort."
>
> "I want to filter products by product group, label, or other attributes before bulk editing."

### What PD-328 Actually Says:

> "I want to be able to schedule price updates so that these updates are in force from a specific starting date to a specific ending date."
>
> "I want to import price updates via structured files (e.g., Excel)."

### WH 1.0 Current State:

- ❌ Must edit each product individually (one-by-one)
- ❌ No bulk operations
- ❌ No scheduled price changes
- ❌ No import/export functionality
- ❌ Only current price visible (no price history)
- ❌ No preview before applying changes

### WH 2.0 Requirement:

- **Bulk price modifications** with filtering *(PD-331)*
- Filter by: product group, label, attributes, zone, category *(PD-331)*
- Percentage-based OR fixed-amount changes *(PD-331)*
- **Scheduled price updates** (effective date ranges) *(PD-328)*
- **Excel import/export** *(PD-328)*
- Price history tracking *(PD-332)*
- **Audit logs** for price changes (who, what, when, why) *(PD-329)*
- Preview changes before applying *(PD-331)*
- Gross/net price entry with VAT auto-calculation *(PD-331)*

### Gap:

WH 1.0 requires **manual one-by-one edits**. Need bulk operations, scheduling, and import/export.

**Missing:**
- Bulk edit functionality
- Filtering before bulk edit
- Scheduled price changes queue
- Excel import/export
- Price history/versioning
- Comprehensive audit logs
- Preview functionality

---

## Gap 6: Discounts & Promotions

### What PD-321 Actually Says:

> "I want to be able to apply discounts to individual events, products or contracts."
>
> "I want to apply time-limited discounts (valid from/to dates), so that promotional pricing expires automatically."

### WH 1.0 Current State:

- ❌ Must create separate products for discounted prices
- ❌ No discount mechanism
- ❌ No promotions system
- ❌ No time-limited pricing
- ❌ Cannot apply discounts to existing products

### WH 2.0 Requirement:

- **Discounts at event/product/contract level** *(PD-321)*
- **Time-limited discounts** (valid from/to dates) *(PD-321)*
- **Automatic expiry** when period ends *(PD-321)*
- Bulk discount application *(PD-321)*
- Discount application to customer or customer group *(PD-321)*
- Update multiple contract prices in bulk *(PD-321)*

### Gap:

WH 1.0 has **no discount system**. Must duplicate products to offer different prices.

**Missing:**
- Discount entity/mechanism
- Event-level discounts
- Product-level discounts
- Contract-level discounts
- Time-limited promotions
- Automatic discount expiry
- Bulk discount application

---

## Gap 7: Product Configuration & Flexibility

### What PD-40 Actually Says:

> "I want to be able to define and, if necessary modify, the bill of materials for a product so that I can manage all the components of that product."
>
> "I want to be able to define, if necessary modify, all the attributes of a product so that I can manage all the variants of that product."

### What PD-39 Actually Says:

> "I want to be able to define different types of products so that I can create physical and service products."
>
> "I want to temporarily deactivate and later reactivate a product so that I can manage product lifecycle without losing historical data."

### What FR-79 Actually Says:

> "I want to define and manage background data for products and services so that I can enable classification, pricing, operational workflows, and regulatory compliance."
>
> "I want to define product types during deployment that determine which background data fields are required."

### WH 1.0 Current State:

- ❌ Flat product structure (no components/BOM)
- ❌ No product attributes/variants system
- ❌ Fixed product schema (cannot customize fields)
- ❌ Cannot deactivate products (only archive/delete, losing historical data)
- ❌ No custom metadata fields
- ❌ No product categories with category-specific rules
- ❌ Limited bulk editing

### WH 2.0 Requirement:

- **Bill of Materials (BOM)** for composite products *(PD-40)*
- **Product attributes and variants** *(PD-40)*
- Automatic updates throughout system when BOM changes *(PD-40)*
- **Configurable product types** per tenant *(FR-79)*
- **Flexible metadata/background data fields** *(PD-239, FR-79)*
- **Product activation/deactivation** (without data loss) *(PD-39)*
- **Product categories** with category-specific rules *(PD-41)*
- Product schema definition per category *(PD-41)*
- Bulk product editing with filters *(PD-39)*
- Regulatory compliance fields *(PD-41)*
- Portal visibility options *(PD-41)*

### Gap:

WH 1.0 has **rigid, hardcoded product structure**. Need flexible, configurable system.

**Missing:**
- Bill of Materials (BOM) capability
- Product attributes/variants system
- Configurable product types
- Custom metadata fields
- Product categories with rules
- Flexible schema per product type
- Activation/deactivation lifecycle
- Enhanced bulk editing

---

## Gap 8: Service Scheduling & Seasonal Variations

### What PD-248 Actually Says:

> "I want to be able to configure exceptions to a customer's regular collection schedule, so that the customer's seasonal requirements are taken into consideration."
>
> "I want the application to automatically notify the customer of the start and end of the change to their regular collection schedule in advance."

### What PD-342 Actually Says:

> "I want to be able to define seasonal exceptions to a customer's collection cadence for specific time intervals, so that their seasonal needs during these time intervals are taken into consideration."

### WH 1.0 Current State:

- Fixed collection schedules
- ❌ Manual adjustments required for seasonal changes
- ❌ No automatic customer notifications
- ❌ No bulk seasonal configuration
- ❌ No automated schedule exception handling

### WH 2.0 Requirement:

- **Seasonal collection cadence** (summer/winter frequencies) *(PD-342, PD-343)*
- **Automatic schedule exception handling** *(PD-248)*
- Schedule exceptions impact route planning automatically *(PD-248)*
- **Bulk seasonal configuration** across multiple customers *(PD-343)*
- **Auto-notify customers** of schedule changes *(PD-248)*
- Define seasonal exceptions for specific time intervals *(PD-342)*
- Different frequencies for different seasons *(PD-342)*

### Gap:

WH 1.0 requires **manual intervention** for seasonal changes. Need automated seasonal scheduling.

**Missing:**
- Seasonal cadence configuration
- Automated exception handling
- Bulk seasonal setup
- Automatic customer notifications
- Integration with route planning
- Time-interval-based scheduling

---

## Gap 9: Additional Services & Add-ons

### What PD-38 Actually Says:

> "I want to define and manage additional services that can be added to products so that customer-service users can up-sell these additional services when needed."
>
> "I want to define the rules according to which additional services can be added to products."
>
> "As a driver, I want to verify the necessity of an additional service on-site before billing."

### WH 1.0 Current State:

- ❌ No add-on service concept
- ❌ No upsell mechanism
- ❌ No driver verification workflow
- ❌ No rules for when services can be added

### WH 2.0 Requirement:

- **Additional services** that can be added to products *(PD-38)*
- **Rules** for when add-ons can be added *(PD-38)*
- **Driver on-site verification** before billing *(PD-38)*
- Driver can create service requests for add-ons *(PD-38)*
- Customer-service users can manually add/remove/modify add-ons *(PD-38)*
- Add-ons available in different workflows *(PD-38)*

### Gap:

WH 1.0 has **no concept of product add-ons** or driver verification workflow.

**Missing:**
- Add-on service definition
- Product-to-addon compatibility rules
- Driver verification workflow
- Driver service request creation
- Upsell mechanism for customer service
- Add-on availability rules

---

## Gap 10: Service Responsibility & Compliance

### What PD-35 Actually Says:

> "I want to be able to define the service responsibility for a product so that the service responsibility is applied when the product is sold."
>
> "I want the service responsibility for a sales event to be determined based on a set of rules."
>
> "I want to define multiple service responsibility categories (municipal, TSV, market-based, residential, custom)."

### WH 1.0 Current State:

- ❌ No service responsibility tracking
- ❌ No regulatory classification
- ❌ No compliance reporting
- ❌ No service responsibility categories

### WH 2.0 Requirement:

- **Service responsibility categories** (municipal, TSV, market-based, residential, custom) *(PD-35)*
- **Product-level service responsibility** *(PD-35)*
- **Event-level override capability** *(PD-35)*
- **Rules-based service responsibility determination** *(PD-35)*
- Service responsibility impacts pricing *(PD-322)*
- Override at contract or event level *(PD-35)*

### Gap:

WH 1.0 **lacks regulatory classification system entirely**.

**Missing:**
- Service responsibility entity
- Classification categories
- Product-level assignment
- Event-level override
- Rules-based determination
- Integration with pricing engine
- Compliance reporting

---

## Summary Table: Gaps at a Glance

| Gap | WH 1.0 Has | WH 1.0 Missing | Priority |
|-----|------------|----------------|----------|
| **1. Contract Flexibility** | Agreements (property-only) | Customer-level contracts, customer pricing | 🔴 Critical |
| **2. Property Pools** | Property Groups (basic) | Cost allocation, usage shares, shared service contracts | 🔴 Critical |
| **3. Price Determination** | Single price, 4-field match | Multiple prices, best-match algorithm, flexible conditions | 🔴 Critical |
| **4. Contractor Pricing** | Nothing | Entire contractor pricing system | 🔴 Critical |
| **5. Bulk Price Management** | Manual one-by-one edits | Bulk ops, scheduling, import/export, history | 🟡 High |
| **6. Discounts** | Product duplication workaround | Discount system, time-limited promos | 🟡 High |
| **7. Product Flexibility** | Hardcoded types, flat structure | BOM, variants, custom fields, categories | 🟡 High |
| **8. Seasonal Scheduling** | Manual adjustments | Automated seasonal cadence, notifications | 🟢 Medium |
| **9. Add-on Services** | Standalone services | Add-ons, rules, driver verification | 🟢 Medium |
| **10. Service Responsibility** | Nothing | Classification system, compliance | 🟢 Medium |

---

**Document Status:** Based on actual Jira PD descriptions and corrected WH 1.0 capabilities (agreements, property groups)
