---
title: "Products & Pricing Simple Guide"
slug: "simple-guide"
category: "user-guides"
order: 2
description: "Simplified overview of WasteHero 2.0 products and pricing features with visual examples and quick navigation."
related:
  - "navigation-guide"
  - "simple-guide-updated"
  - "product-types-explained"
tags:
  - "guide"
  - "simple"
  - "overview"
  - "pricing"
  - "products"
---

# WasteHero 2.0 - Products & Pricing (Simple Guide)

---

## 📦 Products

### Where: `Settings → Product Catalog` ***NEW SETTINGS PAGE***

```
Product Catalog
├── Container Products (Containers: 120L bin, 240L bin)
├── Service Products (Emptying, Collection)
├── Fees (Delivery, Exchange, Extra visit)
   └── Recurring Fees (Base fee, Regional fee)
   └── One off Fees (Delivery, Exchange, Extra visit)
```

**What you need**:
- Product name
- Product category
- Waste fraction (optional)
- Container type (optional)

**What you can do**:
- Create new products
- Edit products
- Filter and search
- Bulk edit many products

---

## 🏗️ Product Components (Bill of Materials)

### Where: `Product Catalog → [Product] → Bill of Materials Tab`

**Example**: Bio-waste Service
```
Bio-waste Service
├── Container fee
├── Emptying fee
├── Base fee
└── Environmental fee
```

**Why**: Build complex products from simple parts

---

## ➕ Additional Services

### Where: `Settings → Customer Management → Additional Services`

**Common ones**:
- Cancellation fee (can't access property)
- Extra wash (beyond annual)
- Weighing fee
- Extra visit

**How they work**:
- **Automatic**: System adds when needed
- **Manual**: Office adds when customer requests
- **Driver**: Driver requests, office approves

---

## 💰 Price Lists

### Where: `Settings → Customer Management → Price Lists`

```
Price Lists
├── Municipal Price List
├── Business Price List
└── Special Customer Price List
```

**For each product, set**:
- Base price
- Unit (€/piece, €/kg, €/m³, €/hour)
- When it's valid (start date, end date)

---

## 🎯 Price Conditions (Why different prices?)

### Where: `Price Lists → [Product] → Price Determination`

**Price varies by**:
```
Same Product → Different Prices
├── Service Responsibility (Municipal vs Business)
├── Zone (Urban vs Rural)
├── Property Type (Residential vs Commercial)
├── Speed (Scheduled vs Express vs Emergency)
└── Timing (Weekday vs Weekend vs Holiday)
```

**Example**:
```
Mixed Waste Collection
├── Municipal + Urban + Weekday = €50
├── Municipal + Rural + Weekday = €60
├── Business + Urban + Weekday = €70
└── Business + Urban + Weekend = €90
```

**How it works**: System picks price with MOST matching conditions

---

## 📍 Zones (Geography)

### Where: `Settings → Customer Management → Zones`

**What**: Draw areas on map for different pricing

```
Map
├── Urban Zone → €50
├── Rural Zone → €60
└── Remote Zone → €80
```

**Why**: Same service costs more in far areas

---

## ⚡ Service Levels (Speed)

### Where: `Product → Service Levels Tab`

```
Service Speed
├── Scheduled (7 days) → €50
├── On-demand (3 days) → €70
├── Express (1 day) → €90
└── Emergency (same day) → €120
```

**Why**: Faster = More expensive

---

## 🔧 Service Responsibility

### Where: `Settings → Customer Management → Service Responsibilities`

**Categories**:
- Municipal (publicly funded)
- TSV (business with municipal rules)
- Market-based (commercial pricing)
- Residential (property managers)

**Why**: Different rules = Different prices

---

## 🏠 Create Agreement (Contract)

### Where: `Property → Agreements → Add`

**Steps**:
1. Pick products (from catalog)
2. Pick price list (or use default)
3. Choose service level (if needed)
4. Add extra services (if needed)
5. Set schedule (every 2 weeks, etc.)
6. Apply discount (if special customer)

**Done!** Customer now has contract

---

## 💸 Custom Prices & Discounts

### Option 1: Contract Price
`Property → Agreement → Pricing Tab`
- Override price for THIS customer only
- Example: Everyone pays €60, this customer pays €55

### Option 2: Customer Discount
`Customer → Pricing Tab`
- Discount on ALL their contracts
- Example: 10% off everything for 1 year

---

## 🎫 Create Ticket (Service Order)

### Where: `Tickets → Create Bulk Container Ticket`

**Steps**:
1. Pick ticket type
2. Pick service (from agreement)
3. Pick containers
4. Set date
5. System calculates price automatically

**Price is locked** when ticket created

---

## 💡 How Price is Calculated

```
1. Check agreement
   ↓
2. Find matching price in price list
   - Match zone
   - Match property type
   - Match service responsibility
   - Match service level
   - Match timing (weekend?)
   ↓
3. Add any extra services
   ↓
4. Apply discounts (if any)
   ↓
5. DONE → Price locked
```

**Example**:
```
Service: Mixed Waste Collection
Property: Urban zone, Residential
Service level: Express (next day)
Day: Saturday

Calculation:
Base price (Urban + Residential) = €50
Express surcharge = +€20
Weekend surcharge = +€10
Total = €80
```

---

## 📊 Default Weights

### Where: `Property → Containers → [Container] → Configuration`

**Global default**: 120L bin = 16.8 kg
**Property override**: This nursing home = 38 kg

**Why**: Facilities produce more waste than homes

---

## 💧 Septic Tanks

### Where: `Property → Waste Water Treatment Tab`

**If has septic tank, record**:
- Tank type (Septic / Holding / Treatment plant)
- Volume (m³)
- What goes in (black water, grey water, both)
- Where it is (coordinates)
- Problems (e.g., "can't empty in winter")
- Last emptied (system alerts if > 2 years)

---

## 📈 Schedule Price Update

### Where: `Price Lists → [Product] → Scheduled Updates`

**Example**: Municipality increases prices Jan 1

```
Today (Dec 1):
├── Set new price: €60 (was €55)
├── Effective: Jan 1, 2026
└── Save

Result:
├── Services before Jan 1 → €55
└── Services after Jan 1 → €60
```

**Important**: Price based on SERVICE DATE, not invoice date

---

## 🔍 See Price History

### Where: `Price Lists → Price Change Log`

**Shows**:
- What changed (€55 → €60)
- When (Dec 1, 2024)
- Who (John Smith)
- Why ("Municipal tariff update")

---

## 🔢 Bulk Edit Prices

### Where: `Price Lists → Bulk Edit`

**Steps**:
1. Filter products (e.g., "all bio-waste services")
2. Choose update: "+5%" or "+€5"
3. Set effective date
4. Preview
5. Apply

**Example**: Increase all prices 5% starting Jan 1

---

## 🗺️ Quick Navigation

| I want to... | Go here |
|-------------|---------|
| Create product | Settings → Product Catalog → Add |
| Set price | Settings → Price Lists → [List] → Add Product |
| Add zone | Settings → Zones → Add |
| Create agreement | Property → Agreements → Add |
| Give discount | Customer → Pricing OR Agreement → Pricing |
| Create ticket | Tickets → Create Bulk |
| See why price was X | Ticket → Details → Price Calculation |
| Update many prices | Price Lists → Bulk Edit |
| See price changes | Price Lists → Price Change Log |

---

## 📋 Real Examples

### Example 1: New Customer
```
1. Create property
2. Add containers (120L mixed waste)
3. Create agreement:
   - Product: Mixed waste collection
   - Price list: Municipal
   - Schedule: Every 2 weeks
4. Done!
```

### Example 2: Price Goes Up
```
1. Go to: Price Lists → Bulk Edit
2. Filter: All products
3. Update: +5%
4. Date: Jan 1, 2026
5. Apply
→ All future services use new price
```

### Example 3: VIP Customer
```
1. Go to: Customer → Pricing
2. Add discount: 10% off
3. Valid: 1 year
→ All their services get 10% off
```

### Example 4: Weekend Emergency
```
1. Create ticket
2. Service: Mixed waste
3. Level: Emergency
4. Date: Saturday
→ Price = Base + Emergency + Weekend
→ Example: €50 + €40 + €10 = €100
```

### Example 5: Can't Access Property
```
Driver tries to collect → gate locked
↓
Driver: "Request cancellation fee"
↓
Office: Approve
↓
Fee auto-added to invoice
```

---

## 🎯 Key Concepts

### Products = What you sell
- Containers
- Services
- Fees

### Price Lists = How much it costs
- Different lists for different customers
- One product → many prices

### Conditions = Why different prices
- Zone, Property type, Speed, Timing
- System picks best match

### Agreement = Customer contract
- Products they ordered
- Prices they pay
- Schedule

### Ticket = Single service event
- One collection
- Price locked when created

---

## ⚠️ Common Mistakes

❌ **Creating duplicate products for each price**
✅ Use price conditions instead

❌ **Not setting effective dates**
✅ Always set when price starts

❌ **Changing price after ticket created**
✅ Price is locked, only affects future tickets

❌ **Forgetting to add reason for price change**
✅ Always add reason for audit trail

---

## 🆚 WH 1.0 vs WH 2.0

| Feature | WH 1.0 | WH 2.0 |
|---------|--------|--------|
| Products | Simple list | Categories + Components |
| Prices | One per product | Multiple conditions |
| Zones | ❌ | ✅ Map-based |
| Service levels | ❌ | ✅ Scheduled/Express/Emergency |
| Price history | Manual | Automatic log |
| Bulk edit | Limited | Full bulk + import |
| Septic tanks | ❌ | ✅ Full tracking |

---

## ❓ Need Help?

**Can't find something?**
→ Use search bar or check Quick Navigation table

**Price wrong?**
→ Go to Ticket → Price Calculation Details
→ Shows exactly why that price

**Need to change many prices?**
→ Use Bulk Edit, not one-by-one

**Customer wants discount?**
→ Customer → Pricing OR Agreement → Pricing

**System alert "price missing"?**
→ Add price in Price Lists for that product
