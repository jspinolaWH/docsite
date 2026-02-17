---
slug: product-types-explained
title: Product Types Explained
category: concepts
order: 2
description: Understanding the 5 product types - Service, Container, Additional Service, One-off Fee, and Recurring Fee - and how they work together
related:
  - pricing-model-overview
  - waste-fractions-explained
tags:
  - products
  - product-types
  - services
  - containers
  - fees
---

# Product Types Explained

Understanding the 5 product types and how they work together.

---

## Overview

WasteHero 2.0 uses 5 product types. Each type represents a fundamentally different kind of thing you sell, and each needs different information.

**From PD-41:**
> "Material-based waste products, Service-based products tied to emptying tasks, One-off fees, and Recurring fixed-fee services"

---

## The 5 Product Types

### 1. Service Product 🔷

**What it is:** Actions you perform - collection, emptying, cleaning services

**Examples:**
- Mixed Waste Collection
- Bio-waste Emptying
- Hazardous Waste Pickup
- On-site Waste Audit

**Key characteristics:**
- It's an ACTION, not a physical thing
- Performed on schedule or on-demand
- Involves waste collection/transport
- Can have frequency (weekly, monthly)
- Can have speed options (scheduled, express)

**Fields it needs:**
- Waste Fraction (what type of waste)
- EWC/LoW Code (compliance code)
- R/D Code (processing method - R1 recycling, D1 disposal)
- Direction (Incoming/Outgoing/Transfer)
- Permitted Emptying Intervals (Weekly, Bi-weekly, Monthly)

**From PD-41:**
> "Permitted emptying intervals are relevant for service products"

**Pricing:**
- Per collection (€50 per service)
- Per ton (€70 per ton of waste)
- Per hour (€85 per hour for audit)

**Special features:**
- Bill of Materials (price breakdown)
- Service Levels (Scheduled, Express, Emergency)
- Additional Services can be added

---

### 2. Container Product 📦

**What it is:** Physical items - bins, containers, equipment for storing waste

**Examples:**
- 240L Wheelie Bin
- 660L Container
- 1100L Bulk Container
- Compost Bin

**Key characteristics:**
- PHYSICAL object (not a service/action)
- Has size/capacity (120L, 240L, etc.)
- Has weight when empty
- Can be rented or sold
- Needs storage location

**Fields it needs:**
- Container Type (120L, 240L, 660L, 1100L)
- Default Weight (kg - container's empty weight)
- Waste Fraction (what type of waste it holds)
- EWC/LoW Code (compliance code)
- Storage Location

**Pricing:**
- Usually sold once or monthly rental
- Not per collection (it's not a service)

**Relationship to services:**
- Services often empty these containers
- But sold separately (independent products)

---

### 3. Additional Service ➕

**What it is:** Optional extras that can be added to other products (mainly services)

**From PD-38:**
> "Additional services that can be added to products"

**Examples:**
- Extra Wash (€15)
- Cancellation Fee (€25)
- Extra Weighing (€10)
- Difficult Access Fee (€10)

**Key characteristics:**
- NOT sold alone - must be added to another product
- Optional (not required)
- Applied during service execution
- Has application method (Automatic/Manual/Driver-Initiated)

**Fields it needs:**
- Application Method (Automatic/Manual/Driver-Initiated)
- Default Price
- Automatic Rules (if automatic)
- Office Approval Required (if driver-initiated)

**3 Application Methods:**

**Automatic:**
- System applies based on rules
- Example: Cancellation fee when access denied
- No human action needed

**Manual:**
- Office user adds when customer requests
- Example: Customer wants extra wash
- Office decides

**Driver-Initiated:**
- Driver detects need, creates request
- Office approves or rejects
- Example: Difficult access requires reversing

**Pricing:**
- Fixed price per application
- Added to invoice when applied

**Relationship:**
- Linked TO Service Products (shown in Additional Services tab)
- Added during service execution
- Can't order alone

---

### 4. One-off Fee 💰

**What it is:** One-time charges (not recurring)

**From PD-41:**
> "One-off fees (e.g., bin delivery fee, bin exchange fee, extra visit fee)"

**Examples:**
- Container Delivery Fee (€50)
- Setup Fee (€30)
- Bin Exchange Fee (€25)
- Extra Visit Fee (€40)

**Key characteristics:**
- Charged ONCE only
- Not recurring (unlike monthly base fee)
- Often for initial setup or special requests
- Simple pricing (flat fee)

**Fields it needs:**
- Product Code
- Invoice Display Name
- Default Price
- Portal Visibility

**Pricing:**
- Flat fee (€50)
- Charged once when service/product delivered

**Relationship:**
- Often charged WITH containers (delivery fee)
- Or WITH services (setup fee)
- Can be independent or associated

---

### 5. Recurring Fee 🔄

**What it is:** Fixed periodic charges (monthly, quarterly, annually)

**From PD-41:**
> "Recurring, fixed-fee services (e.g., base fee, regional collection fee)"

**Examples:**
- Monthly Base Fee (€10/month)
- Regional Collection Fee (€5/month)
- Administration Fee (€3/month)
- Environmental Fee (€2/month)

**Key characteristics:**
- REPEATING (monthly, quarterly, annually)
- FIXED amount (doesn't vary by usage)
- Often infrastructure/admin costs
- Billed on schedule

**Fields it needs:**
- Billing Frequency (Monthly/Quarterly/Annually)
- Default Price
- Product Code
- Invoice Display Name

**From PD-41:**
> "Permitted emptying intervals are relevant for service products but NOT for recurring fee products"

**Pricing:**
- Fixed amount per billing period
- €10/month, €30/quarter, €100/year

**Relationship:**
- Often part of Service Products (as component in Bill of Materials)
- Example: Service includes "Base Fee €10/month" component
- Can be standalone subscription

---

## How They Work Together

### Example: Complete Waste Service Package

**Customer orders:**
1. **Container Product:** 240L Wheelie Bin (€30)
2. **Service Product:** Mixed Waste Collection (€50/collection)
3. **Recurring Fee:** Monthly Base Fee (€10/month)
4. **One-off Fee:** Container Delivery (€25)

**During service:**
5. **Additional Service:** Extra Wash (€15 - manual addition)

**Invoice breakdown:**
- Initial: Bin €30 + Delivery €25 = €55
- Monthly: Collections €100 + Base Fee €10 + Extra Wash €15 = €125

---

## Relationship Matrix

| Type | Sold Alone? | Recurring? | Added to Others? | Has Service Levels? |
|------|-------------|------------|------------------|---------------------|
| **Service Product** | ✅ Yes | Often | ❌ No | ✅ Yes |
| **Container Product** | ✅ Yes | Can be (rental) | ❌ No | ❌ No |
| **Additional Service** | ❌ No (add-on only) | No | ✅ Yes | ❌ No |
| **One-off Fee** | ✅ Yes | ❌ No (one-time) | Can be | ❌ No |
| **Recurring Fee** | ✅ Yes | ✅ Yes | Can be (as component) | ❌ No |

---

## Key Differences

### Service vs Container
- **Service:** Action (emptying)
- **Container:** Thing (bin)
- **Sold separately:** Customer can have one without the other

### Additional Service vs Service
- **Additional Service:** Can't be sold alone (extra for main service)
- **Service:** Can be sold standalone

### One-off vs Recurring Fee
- **One-off:** Charged once (€25 delivery)
- **Recurring:** Charged every period (€10/month base fee)

---

## Common Confusions

### "Is container fee a Container Product?"
❌ No!
- "Container fee" in Bill of Materials = PRICE COMPONENT
- "240L Container" = CONTAINER PRODUCT (physical bin)

### "Are Additional Services products?"
✅ Yes!
- They ARE products in the catalog
- Type: Additional Service
- But designed as add-ons, not sold alone

### "Can Services exist without Containers?"
✅ Yes!
- Independent product types
- Service might be "On-site Audit" (no container)
- Customer might own their own containers

---

## Decision Guide: Which Type to Use?

| If You're Selling... | Use Type |
|---------------------|----------|
| Physical bin | Container Product |
| Emptying service | Service Product |
| Extra wash beyond standard | Additional Service |
| Delivery charge (once) | One-off Fee |
| Monthly admin fee | Recurring Fee |
| On-site inspection | Service Product |

---

## Summary

**5 Types = 3 Categories of Things:**

**THINGS (Physical):**
- Container Product

**ACTIONS (Services):**
- Service Product (main services)
- Additional Service (optional extras)

**FEES (Charges):**
- One-off Fee (one-time)
- Recurring Fee (periodic)

All managed in one catalog, but fundamentally different types with different fields and behaviors.
