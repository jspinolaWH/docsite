---
slug: creating-price-plans
title: Creating Price Plans
category: user-guides
order: 1
description: Step-by-step guide for creating and managing price plans in WasteHero 2.0
related:
  - pricing-overview
  - product-mapping
tags:
  - user-guide
  - pricing
  - how-to
---

# Creating Price Plans

## Prerequisites

Before creating a price plan, ensure you have:
- [ ] Admin access to the pricing module
- [ ] Active products configured
- [ ] Market and currency settings defined

## Step 1: Access the Pricing Module

Navigate to **Settings** → **Products & Pricing** → **Price Plans**

## Step 2: Create New Plan

1. Click the **"+ New Price Plan"** button
2. Enter the following details:
   - **Plan Name**: Descriptive name (e.g., "Standard Monthly Collection")
   - **Market**: Select target market
   - **Billing Cycle**: Choose frequency

## Step 3: Add Products

### Adding Service Products
```
1. Click "Add Product"
2. Search for the product
3. Set quantity and pricing
4. Configure any modifiers
```

### Setting Base Prices
- Enter the base price in the local currency
- Set the validity period
- Add any volume-based discounts

## Step 4: Configure Modifiers

Available modifiers:
- **Seasonal adjustments**: Summer/winter pricing
- **Early payment discounts**: Incentives for prompt payment
- **Bundle discounts**: Reduced rates for package deals

## Step 5: Review and Activate

1. Review all settings in the summary panel
2. Click **"Save as Draft"** to save without activating
3. Or click **"Activate"** to make the plan live immediately

## Best Practices

- Always test price plans in a staging environment first
- Document any custom pricing rules
- Set appropriate start/end dates for promotional pricing
- Review plans quarterly for market competitiveness

## Troubleshooting

### Issue: Price plan not appearing for customers
**Solution**: Check that:
- The plan is activated
- The customer's market matches the plan's market
- The validity period includes the current date

### Issue: Incorrect calculations
**Solution**: Verify:
- Modifiers are applied in the correct order
- Tax rates are configured properly
- No conflicting promotional rules exist

## Related Documentation

- [Pricing Model Overview](pricing-overview)
- [Product Mapping Guide](product-mapping)
