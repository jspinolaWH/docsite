---
slug: product-mapping
title: Product Mapping Architecture
category: concepts
order: 2
description: Technical overview of how products are mapped between systems in WasteHero 2.0
related:
  - pricing-overview
  - creating-price-plans
tags:
  - products
  - architecture
  - integration
---

# Product Mapping Architecture

## Overview

Product mapping is the system that connects product definitions across WasteHero 2.0 modules, ensuring consistency between CRM, billing, and operational systems.

## Architecture Diagram

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   CRM 2.0   │─────▶│Product Master│◀─────│   Billing   │
│  Products   │      │   Database   │      │   System    │
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  Operations  │
                     │   System     │
                     └──────────────┘
```

## Product Hierarchy

### 1. Product Categories
Top-level grouping:
- **Services**: Collection, disposal, consulting
- **Equipment**: Containers, bins, tools
- **Add-ons**: Extra services, optional features

### 2. Product Families
Mid-level organization:
- Grouped by similar characteristics
- Shared configuration templates
- Common pricing structures

### 3. Product Variants
Specific implementations:
- Size variations (120L, 240L, 660L)
- Color options
- Feature combinations

## Data Model

### Product Entity
```typescript
interface Product {
  id: string;
  externalId: string;
  name: string;
  category: ProductCategory;
  family: string;
  variants: ProductVariant[];
  pricingRules: PricingRule[];
  metadata: {
    description: string;
    specifications: Record<string, any>;
  };
}
```

### Mapping Rules
Products can be mapped using:
- **Direct mapping**: 1:1 relationship between systems
- **Composite mapping**: Multiple source products → single target
- **Split mapping**: Single source → multiple targets

## Integration Points

### CRM Integration
- Synchronizes product catalogs
- Maps customer subscriptions to products
- Handles product lifecycle events

### Billing Integration
- Links products to billing items
- Manages pricing configurations
- Generates invoices based on product usage

### Operations Integration
- Routes collection tasks based on product types
- Tracks container inventory
- Manages service delivery schedules

## Synchronization Strategy

### Real-time Sync
For critical updates:
- Price changes
- Product activation/deactivation
- Availability modifications

### Batch Sync
For bulk operations:
- Daily product catalog updates
- Historical data reconciliation
- Audit log generation

## Error Handling

### Mapping Conflicts
When products can't be mapped:
1. System logs the conflict
2. Alert sent to admin
3. Manual resolution required
4. Audit trail maintained

### Validation Rules
- All products must have unique external IDs
- Categories must be valid
- Pricing rules must reference existing products
- No circular dependencies in product relationships

## Migration Considerations

When migrating from legacy systems:
- Map old product IDs to new structure
- Preserve historical pricing data
- Maintain audit trails
- Test mappings in staging environment

## Related Documentation

- [Pricing Model Overview](pricing-overview)
- [Creating Price Plans](creating-price-plans)
