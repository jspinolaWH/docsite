---
slug: field-mapping-complete
title: Product Type Field Mapping - Complete Reference
category: oliver-docs
order: 2
description: Complete field mapping reference for all product types including Service, Container, Additional Service, One-off Fee, and Recurring Fee
related:
  - sprint2-designer-handoff
tags:
  - field-mapping
  - products
  - reference
  - PD-39
  - PD-41
---

# Product Type Field Mapping - Complete Reference

---

## Common Fields (All Product Types)

| Field | Type | Description | Reference |
|-------|------|-------------|-----------|
| `product_name` | String | Name of the product | PD-39, PD-41 |
| `product_code` | String | Unique product code/identifier | PD-41 |
| `descriptor` | String | Invoice display name or additional descriptor | PD-39 |
| `product_group` | String | Grouping category for organization | PD-39 |
| `is_active` | Boolean | Active/Inactive status (can be deactivated/reactivated) | PD-39 |
| `transfer_document_obligation` | Boolean | Whether transfer document is required | PD-39 |
| `ylva_reportable` | Boolean | Whether product is reportable to YLVA system | PD-39 |
| `weighbridge_assignment` | Boolean | Whether product is assigned to weighbridge system | PD-39 |
| `portal_visibility` | Boolean | Visible in customer portal | PD-41 |
| `self_service_ordering` | Boolean | Can customers order via self-service portal | PD-41 |
| `show_price_in_portal` | Boolean | Display price in customer portal | PD-41 |
| `unit` | Enum | Display unit price (kg,time,collection)  | PD-41 |
| `price` | Decimal | Display price   | PD-41 |

---

## 1. Service Product

**Type:** Service-based products tied to emptying tasks

### Type-Specific Fields

| Field | Type | Description | Reference |
|-------|------|-------------|-----------|
| `permitted_emptying_intervals` | JSON Array | Allowed emptying frequencies (Weekly, Bi-weekly, Monthly, On-demand) | PD-41 ⭐ |
| `container_types` | JSON Array | Which container sizes this service can empty | CT-3043 |
| `property_category_restrictions` | JSON Array | Which property types (Residential, Commercial, Industrial) can order | CT-3043 |
| `load_inspection` | Boolean | Whether load must be inspected during service | CT-3043 |
| `waste_fraction` | Reference | Link to WASTEFRACTION table (Mixed, Bio, Hazardous, etc.) | PD-39 |
| `ewc_low_codes` | String | European Waste Catalogue code (e.g., "20 03 01") | PD-39 |
| `rd_codes` | String | R/D processing code (R1 = recycling, D1 = disposal) | PD-39 |
| `direction` | Enum | Waste direction: Incoming, Outgoing, or Transfer | PD-39 |
| `hazardous_waste_properties` | Boolean | Whether waste is classified as hazardous | PD-39 |
| `origin_location` | String | Origin point of waste for reporting | PD-39 |
| `storage_location` | String | Storage location for waste | PD-39 |
| `waste_type` | String | Type of waste information | PD-39 |

**Note:** ⭐ = Explicitly assigned to this type in PD-41

---

## 2. Container Product

**Type:** Material-based waste products (physical containers)

### Type-Specific Fields

| Field | Type | Description | Reference |
|-------|------|-------------|-----------|
| `container_type` | Enum | Container size (120L, 240L, 660L, 1100L, Other) | CT-3043 |
| `default_weight` | Decimal | Empty container weight in kilograms | PD-34, CT-3043 |
| `volume_unit` | Enum | Volume measurement unit (Liters, CubicMeters) | CT-3043 |
| `dimensions` | String | Physical dimensions (Length x Width x Height) | CT-3043 |
| `waste_fraction` | Reference | Link to WASTEFRACTION table | PD-39 |
| `ewc_low_codes` | String | European Waste Catalogue code | PD-39, CT-3043 |
| `rd_codes` | String | R/D processing code | PD-39, CT-3043 |
| `direction` | Enum | Waste direction: Incoming, Outgoing, or Transfer | PD-39, CT-3043 |
| `hazardous_waste_properties` | Boolean | Whether container holds hazardous waste | PD-39, CT-3043 |
| `origin_location` | String | Origin point location | PD-39, CT-3043 |
| `storage_location` | String | Where container is stored at depot | PD-39, CT-3043 |
| `load_inspection` | Boolean | Whether load inspection required | CT-3043 |

---

## 3. Additional Service

**Type:** Add-on services that can be added to other products

### Type-Specific Fields

| Field | Type | Description | Reference |
|-------|------|-------------|-----------|
| `application_method` | Enum | How service is added: Automatic, Manual, or Driver-Initiated | PD-38 ⭐ |
| `default_price` | Decimal | Default price for this additional service | PD-38 |
| `automatic_rules` | JSON | Trigger conditions for automatic application (access_denied, return_trip, etc.) | PD-38 |
| `office_approval_required` | Boolean | Whether office approval needed (for Driver-Initiated) | PD-38 |
| `confirmation_slip_link` | String | Link to confirmation slip document (for Driver-Initiated) | PD-38 |

**Note:** ⭐ = Required field for this type

---

## 4. One-off Fee

**Type:** One-time charges (delivery, setup fees)

### Type-Specific Fields

| Field | Type | Description | Reference |
|-------|------|-------------|-----------|
| `charge_conditions` | JSON | Conditions when this fee is applied | CT-3043 |
| `default_price` | Decimal | Default fee amount | PD-41 |

---

## 5. Recurring Fee

**Type:** Fixed periodic fees (monthly, quarterly, annually)

### Type-Specific Fields

| Field | Type | Description | Reference |
|-------|------|-------------|-----------|
| `billing_frequency` | Enum | Billing period: Monthly, Quarterly, or Annually | CT-3043 |
| `default_price` | Decimal | Fixed fee amount per billing period | PD-41 |

### Explicit Restriction

| Restriction | Reference |
|-------------|-----------|
| ❌ CANNOT have `permitted_emptying_intervals` | PD-41 ⭐ |

**Note:** PD-41 explicitly states: *"Permitted emptying intervals are relevant for service products but NOT for recurring fee products"*

---

## Field Type Legend

- **String:** Text field
- **Decimal:** Numeric with decimals (for prices, weights)
- **Integer:** Whole numbers
- **Boolean:** True/False checkbox
- **Enum:** Dropdown with predefined options
- **JSON:** Structured data (arrays or objects)
- **JSON Array:** List of values (e.g., ["Weekly", "Monthly"])
- **Reference:** Foreign key to another table

---

## References Key

- **PD-39:** Product Schema Management
- **PD-41:** Product Catalog
- **PD-38:** Additional Services
- **PD-34:** Default Weights
- **CT-3043:** Product Schema & Data Management Epic (implementation)
- **⭐:** Explicitly assigned to this type in requirements
