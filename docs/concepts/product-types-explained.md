---
title: "Product Types Explained"
slug: "product-types-explained"
category: "concepts"
order: 1
description: "Deep dive into the 5 WasteHero 2.0 product types (Service, Container, Additional Service, One-off Fee, Recurring Fee) and how they relate."
related:
  - "wh1-vs-wh2-gaps"
  - "simple-guide-updated"
  - "sprint1-guide"
tags:
  - "product types"
  - "schema"
  - "PD-41"
  - "PD-39"
  - "concepts"
---

# WasteHero 2.0 - Product Types Explained
**Understanding the 5 Types and How They Relate**

---

## 🎯 The 5 Product Types (From PD-41)

**From PD-41 Acceptance Criteria:**
- Material-based waste products (CONTAINERS)
- Service-based products tied to emptying tasks (SERVICES)
- One-off fees
- Recurring, fixed-fee services

**System defines 5 types based on this:**

1. **Service Product** 🔷
2. **Container Product** 📦
3. **Additional Service** ➕
4. **One-off Fee** 💰
5. **Recurring Fee** 🔄

---

## 📦 TYPE 1: Container Product

### **What It Is:**
Physical items - bins, containers, equipment that customers use to store waste

### **Examples:**
- 240L Wheelie Bin
- 660L Container
- 1100L Bulk Container
- Waste Bag Roll
- Compost Bin

### **Key Characteristics:**
- **Physical object** (not a service/action)
- Has size/capacity (120L, 240L, etc.)
- Has weight when empty
- Can be rented or sold
- Needs storage location

### **Fields It Needs (from PD-39, PD-41):**
- Container Type * (120L, 240L, 660L, 1100L)
- Default Weight * (kg - the container's empty weight)
- Waste Fraction (what type of waste it holds)
- EWC/LoW Code (compliance code)
- Storage Location (where it's kept at depot)
- Product Code

### **Pricing:**
- Usually sold/rented once or monthly rental
- Not per collection (it's not a service)

### **Relationship to Others:**
- **With Services:** Services often empty these containers (but sold separately)
- **With Fees:** One-off delivery fee might apply when container delivered

---

## 🔷 TYPE 2: Service Product

### **What It Is:**
Actions performed - collection, emptying, cleaning services

**From PD-41:** *"Service-based products tied to emptying tasks"*

### **Examples:**
- Mixed Waste Collection
- Bio-waste Emptying
- Hazardous Waste Pickup
- Sludge Collection
- On-site Waste Audit

### **Key Characteristics:**
- **Action/service** (not a physical thing)
- Performed on a schedule or on-demand
- Involves waste collection/transport
- Can have frequency (weekly, monthly)
- Can have speed options (scheduled, express)

### **Fields It Needs (from PD-39, PD-41):**
- Waste Fraction * (what type of waste collected)
- EWC/LoW Code * (compliance code for waste)
- R/D Code * (processing method - R1 recycling, D1 disposal)
- Direction * (Incoming/Outgoing/Transfer)
- Permitted Emptying Intervals (Weekly, Bi-weekly, Monthly, On-demand)
- Transfer Document Required
- YLVA Reportable
- Product Code

**From PD-41:** *"Permitted emptying intervals are relevant for service products"*

### **Pricing:**
- Per collection (€50 per service)
- Per ton (€70 per ton of waste)
- Per hour (€85 per hour for audit)

### **Has Additional Features:**
- Bill of Materials (price breakdown: Container fee + Emptying fee + Base fee)
- Service Levels (Scheduled, Express, Emergency with surcharges)
- Additional Services can be added (Extra Wash, Cancellation Fee)

### **Relationship to Others:**
- **With Containers:** Often empties containers (but independent products)
- **With Additional Services:** Can have extras added (cancellation, extra wash)
- **With Recurring Fees:** Might include a base fee component
- **With One-off Fees:** Might have setup fee when first ordered

---

## ➕ TYPE 3: Additional Service

### **What It Is:**
Optional extras that can be added to other products (mainly Service Products)

**From PD-38:** *"Additional services that can be added to products"*

### **Examples:**
- Extra Wash (€15)
- Cancellation Fee (€25)
- Extra Weighing (€10)
- Difficult Access Fee (€10)
- Container Repair (€20)

### **Key Characteristics:**
- **Not sold alone** - must be added to another product
- Optional (not required)
- Can be applied during service execution
- Has application method (Automatic/Manual/Driver-Initiated)

### **Fields It Needs (from PD-38):**
- Application Method * (Automatic/Manual/Driver-Initiated)
- Default Price *
- Automatic Rules (if automatic - when to trigger)
- Office Approval Required (if driver-initiated)
- Link to Confirmation Slip (for documentation)
- Product Code
- Invoice Display Name

### **3 Application Methods (PD-38):**

**1. Automatic:**
- System applies automatically based on rules
- Example: Cancellation fee when access denied
- No human action needed

**2. Manual:**
- Office user adds when customer requests
- Example: Customer wants extra wash beyond annual standard
- Office decides when to add

**3. Driver-Initiated:**
- Driver detects need on-site
- Creates request via mobile app
- Office approves or rejects
- Example: Driver sees difficult access, requests fee

### **Pricing:**
- Fixed price per application
- Added to invoice when applied

### **Relationship to Others:**
- **With Service Products:** LINKED TO services (shown in Additional Services tab)
- **Not standalone:** Can't order "Extra Wash" by itself, only WITH a service
- **Runtime addition:** Added during or after service execution

---

## 💰 TYPE 4: One-off Fee

### **What It Is:**
One-time charges (not recurring)

**From PD-41:** *"One-off fees (e.g., bin delivery fee, bin exchange fee, extra visit fee)"*

### **Examples:**
- Container Delivery Fee (€50)
- Setup Fee (€30)
- Bin Exchange Fee (€25)
- Extra Visit Fee (€40)
- Inspection Fee (€75)

### **Key Characteristics:**
- **One-time only** (charged once)
- Not recurring (unlike monthly base fee)
- Often associated with initial setup or special requests
- Simple pricing (flat fee)

### **Fields It Needs (from PD-41):**
- Product Code
- Invoice Display Name
- Default Price
- Portal Visibility

**Minimal schema** - fees don't need waste codes, container types, etc.

### **Pricing:**
- Flat fee (€50)
- Charged once when service/product delivered

### **Relationship to Others:**
- **With Containers:** Often charged when delivering containers
- **With Services:** Might be charged when setting up new service
- **Independent:** Can be sold separately or with other products

---

## 🔄 TYPE 5: Recurring Fee

### **What It Is:**
Fixed periodic charges (monthly, quarterly, annually)

**From PD-41:** *"Recurring, fixed-fee services (e.g., base fee, regional collection fee)"*

### **Examples:**
- Monthly Base Fee (€10/month)
- Regional Collection Fee (€5/month)
- Administration Fee (€3/month)
- Environmental Fee (€2/month)

### **Key Characteristics:**
- **Repeating** (monthly, quarterly, annually)
- **Fixed amount** (doesn't vary by usage)
- Often infrastructure/admin costs
- Billed on schedule

### **Fields It Needs (from PD-41):**
- Billing Frequency * (Monthly/Quarterly/Annually)
- Default Price *
- Product Code
- Invoice Display Name

**Very minimal schema** - just billing frequency + price

**From PD-41:** *"Permitted emptying intervals are relevant for service products but NOT for recurring fee products"*

This is the ONLY explicit restriction stated!

### **Pricing:**
- Fixed amount per billing period
- €10/month, €30/quarter, €100/year

### **Relationship to Others:**
- **With Service Products:** Often part of service (as component in Bill of Materials)
- **Example:** "Mixed Waste Collection" might include "Base Fee €10/month" as component
- **Can be standalone:** Or sold separately as subscription fee

---

## 🔗 How They Relate to Each Other

### **Scenario 1: Complete Waste Service Package**

**What customer orders:**
1. **Container Product:** 240L Wheelie Bin (€30 one-time purchase)
2. **Service Product:** Mixed Waste Collection (€50 per collection)
3. **Recurring Fee:** Monthly Base Fee (€10/month - part of service)
4. **One-off Fee:** Container Delivery (€25 - when bin delivered)

**During service execution:**
5. **Additional Service:** Extra Wash added (€15 - customer requests, office adds manually)

**Monthly Invoice:**
- Base Fee: €10 (recurring)
- Collections (2x): €100 (service)
- Extra Wash: €15 (additional service)
- **Total: €125**

**One-time Initial Invoice:**
- 240L Bin: €30 (container)
- Delivery Fee: €25 (one-off)
- **Total: €55**

---

### **Scenario 2: Service Only (No Container)**

**Customer already owns bins:**
1. **Service Product:** Bio-waste Collection (€45 per collection)
2. **Recurring Fee:** Environmental Fee (€5/month - compliance)

**No container product needed!**

**During service:**
3. **Additional Service:** Cancellation Fee (€25 - automatic when access denied)

**Shows:** Service Products independent from Container Products

---

### **Scenario 3: Bill of Materials Breakdown**

**Product:** "Bio-waste Collection Service" (type: Service Product)

**Components (price breakdown):**
- Container fee: €5/month (this is NOT a Container Product, it's a PRICE COMPONENT)
- Emptying fee: €3.50/collection (labor cost)
- Base fee: €2/month (this COULD link to a Recurring Fee product, or just be a component)

**Important:**
- "Container fee" component ≠ "240L Container" product
- Components are PRICE ITEMS, not products themselves
- But they COULD reference actual products (design decision)

---

## 📊 Relationship Matrix

| Type | Can Be Added To | Can Have Added | Sold Standalone? | Recurring? |
|------|-----------------|----------------|------------------|------------|
| **Service Product** | - | Additional Services, Service Levels | ✅ Yes | Often |
| **Container Product** | - | One-off Fee (delivery) | ✅ Yes | Rental can be |
| **Additional Service** | Service Products, Container Products | - | ❌ No (add-on only) | No |
| **One-off Fee** | Services, Containers | - | ✅ Yes | ❌ One-time |
| **Recurring Fee** | Services (as component) | - | ✅ Yes | ✅ Yes |

---

## 🎯 The Key Relationships

### **1. Service ↔ Container (Independent but Related)**
**Relationship:** Services often empty containers, but sold separately

**Example:**
- Customer buys: 240L Container (Container Product)
- Customer subscribes: Mixed Waste Collection (Service Product)
- Service empties the container (usage relationship, not product dependency)

**Can exist without each other:** ✅ Yes
- Service without container: Customer has own bins
- Container without service: Customer empties themselves or uses different service

---

### **2. Service → Additional Service (One-to-Many Link)**
**Relationship:** Service products can have additional services attached

**Example:**
- Main: Mixed Waste Collection (Service Product)
- Extras linked: Cancellation Fee, Extra Wash, Extra Weighing (Additional Service products)

**Shown in:** Additional Services tab of the Service Product

**How it works:**
- Additional Service products exist independently in catalog
- But configured to be ADDABLE to specific Service Products
- Applied during service execution (automatic, manual, or driver-initiated)

---

### **3. Service ↔ Recurring Fee (Can Be Component)**
**Relationship:** Recurring fees can be components within a service's Bill of Materials

**Example:**
- Service: Bio-waste Collection
- Bill of Materials includes:
  - Base Fee €2/month (could be a Recurring Fee product)
  - Emptying Fee €3.50/collection

**Two ways to handle:**
- **Option A:** Base Fee is just a price component (not a product)
- **Option B:** Base Fee is a Recurring Fee product referenced in BOM

**Requirements don't specify which!**

---

### **4. Service/Container → One-off Fee (Associated)**
**Relationship:** One-off fees charged when delivering services/containers

**Example:**
- Customer orders: 240L Container (Container Product)
- System adds: Container Delivery Fee €25 (One-off Fee)

**Association, not dependency:**
- Delivery fee can be sold separately
- Or automatically added when container ordered
- Or optional add-on

---

## 🏗️ Product Structure Examples

### **Example 1: Service Product**
```
Product: Mixed Waste Collection
Type: Service Product
Category: Waste Collection Services

Has:
├─ Schema Fields (waste fraction, EWC code, R/D code, intervals)
├─ Bill of Materials (container €5 + emptying €3.50 + base €2)
├─ Service Levels (scheduled, express, emergency)
├─ Additional Services (cancellation, extra wash, weighing)
└─ In Price Lists (with different prices by customer/zone)
```

### **Example 2: Container Product**
```
Product: 240L Wheelie Bin
Type: Container Product
Category: Waste Containers & Bins

Has:
├─ Schema Fields (container type, weight, waste fraction, storage location)
├─ Bill of Materials (manufacturing cost breakdown - optional)
└─ In Price Lists (rental €5/month or purchase €30 one-time)

Does NOT have:
❌ Service Levels (bins don't have urgency)
❌ Additional Services (bins don't get extras - services do)
❌ Emptying Intervals (bins don't get emptied, services empty them)
```

### **Example 3: Additional Service Product**
```
Product: Extra Wash
Type: Additional Service
Category: Extra Services

Has:
├─ Schema Fields (application method, default price, automatic rules)
└─ In Price Lists (€15 fixed price)

Does NOT have:
❌ Bill of Materials (simple flat fee)
❌ Service Levels (extras don't have speed options)
❌ Waste Classification (not handling waste directly)

Linked TO:
→ Service Products (via Additional Services tab)
```

### **Example 4: One-off Fee Product**
```
Product: Container Delivery Fee
Type: One-off Fee
Category: Setup & Delivery Fees

Has:
├─ Minimal Schema (product code, price, invoice name)
└─ In Price Lists (€25 or €50 by zone)

Does NOT have:
❌ Bill of Materials (simple flat fee)
❌ Service Levels (fees don't have urgency)
❌ Waste Classification (not handling waste)
❌ Additional Services (fees don't get extras)
```

### **Example 5: Recurring Fee Product**
```
Product: Monthly Base Fee
Type: Recurring Fee
Category: Monthly Base Fees

Has:
├─ Schema Fields (billing frequency, default price)
└─ In Price Lists (€10/month)

Does NOT have:
❌ Service Levels (fees don't have urgency)
❌ Emptying Intervals (PD-41 explicit: "NOT for recurring fees")
❌ Waste Classification (not handling waste)
```

---

## 🔄 Real-World Customer Journey

### **Customer Signs Up for Waste Service:**

**Step 1: Order Container (Container Product)**
- Product: 240L Wheelie Bin
- Price: €30 one-time purchase
- Delivery: Triggers One-off Fee

**Step 2: One-off Fee Applied**
- Product: Container Delivery Fee
- Price: €25
- Charged: Once when bin delivered

**Step 3: Subscribe to Service (Service Product)**
- Product: Mixed Waste Collection
- Bill of Materials:
  - Container rental fee: €0 (customer owns bin)
  - Emptying fee: €50 per collection
  - Base fee: €10/month (or links to Recurring Fee product)
- Service Level: Scheduled (every 2 weeks, no surcharge)
- Schedule: Bi-weekly

**Step 4: Recurring Fee (if separate)**
- Product: Regional Collection Fee
- Price: €5/month
- Billed: Every month alongside service

**Monthly Invoice:**
- Mixed Waste Collection (2x): €100
- Regional Fee: €5
- **Total: €105/month**

**During Service Execution:**

**Step 5: Additional Service Added (if needed)**
- Driver arrives: Gate locked, can't access
- Automatic rule triggers
- Product: Cancellation Fee (Additional Service)
- Price: €25
- Added to invoice automatically

**That Month's Invoice:**
- Mixed Waste Collection (1x completed): €50
- Cancellation Fee (1x auto): €25
- Regional Fee: €5
- **Total: €80**

---

## 🎨 Visual Relationship Map

```
┌─────────────────────────────────────────────────────────────┐
│                    CUSTOMER AGREEMENT                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ├─ Container Product (physical)
                              │  └─ 240L Bin (€30 one-time)
                              │     Associated with →
                              │     └─ One-off Fee: Delivery (€25)
                              │
                              ├─ Service Product (action)
                              │  └─ Mixed Waste Collection (€50/collection)
                              │     Has:
                              │     ├─ Bill of Materials (price breakdown)
                              │     ├─ Service Levels (speed options)
                              │     └─ Can have Additional Services:
                              │        ├─ Cancellation Fee (€25 - automatic)
                              │        ├─ Extra Wash (€15 - manual)
                              │        └─ Difficult Access (€10 - driver)
                              │
                              └─ Recurring Fee (subscription)
                                 └─ Monthly Base Fee (€10/month)
```

---

## 💡 Key Insights

### **Insight 1: Types Define Schema**
Each type needs different information:
- Services need waste codes and emptying frequency
- Containers need size and weight
- Fees need minimal info (just price and billing)

### **Insight 2: Products Can Be Composed**
- Service Product has Bill of Materials (components)
- Components might reference other products (or just be price items)
- Example: Service includes "Container fee €5" component

### **Insight 3: Additional Services Are Products Too**
- They're in the catalog as products (type: Additional Service)
- But designed to be add-ons, not sold standalone
- Linked to other products via Additional Services tab

### **Insight 4: Independence vs Association**
- Service and Container are INDEPENDENT (can be sold separately)
- Additional Service and Service are ASSOCIATED (additional must link to main)
- One-off Fee can be either (independent or associated)

---

## 🤔 Common Confusions Clarified

### **Confusion 1: "Is container fee a Container Product?"**
❌ **No!**
- "Container fee" in Bill of Materials = PRICE COMPONENT (€5/month charge)
- "240L Container" = CONTAINER PRODUCT (physical bin)
- Similar names, completely different things!

### **Confusion 2: "Are Additional Services products?"**
✅ **Yes!**
- They're products in the catalog (type: Additional Service)
- But they're add-ons, not sold alone
- Linked to main products

### **Confusion 3: "Can Services exist without Containers?"**
✅ **Yes!**
- Service Product and Container Product are independent
- Service might be "On-site Audit" (no container involved)
- Or customer might own their own containers

### **Confusion 4: "What's the difference between One-off Fee and Recurring Fee?"**
- **One-off:** Charged ONCE (delivery fee when bin delivered)
- **Recurring:** Charged EVERY period (base fee every month)
- Both are fees, timing is different

### **Confusion 5: "Can a Service Product have a Recurring Fee?"**
**Two ways:**
- **As component:** Service's Bill of Materials includes "Base fee €10/month" component
- **As separate product:** Customer has Service Product + separate Recurring Fee product
- Requirements don't specify which approach!

---

## 📋 Decision Matrix: Which Type to Use?

| If You're Selling... | Use Type | Reason |
|---------------------|----------|--------|
| Physical bin | Container Product | It's a thing, not an action |
| Emptying service | Service Product | It's an action, not a thing |
| Extra wash beyond standard | Additional Service | It's an optional extra |
| Delivery charge (once) | One-off Fee | One-time charge |
| Monthly admin fee | Recurring Fee | Fixed periodic charge |
| On-site inspection | Service Product | It's a service action |
| Bin repair | Additional Service OR Service Product | Could be either (add-on or standalone) |
| Setup fee | One-off Fee | One-time charge |

---

## 🎯 The Simple Summary

**5 Types, 3 Categories of Things:**

**THINGS (Physical):**
- Container Product = Physical objects

**ACTIONS (Services):**
- Service Product = Main services
- Additional Service = Optional extras added to main services

**FEES (Charges):**
- One-off Fee = One-time charges
- Recurring Fee = Periodic charges

**How they work together:**
- Customer gets THINGS (containers)
- Customer subscribes to ACTIONS (services)
- Customer pays FEES (one-time and recurring)
- Extras (additional services) added as needed

**All managed in one catalog, but fundamentally different types of products!** 🎯
