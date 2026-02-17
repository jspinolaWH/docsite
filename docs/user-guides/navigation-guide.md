---
title: "Products & Pricing Navigation Guide"
slug: "navigation-guide"
category: "user-guides"
order: 1
description: "Complete navigation reference showing where to find and manage all product and pricing features in WasteHero 2.0."
related:
  - "simple-guide"
  - "simple-guide-updated"
  - "product-types-explained"
tags:
  - "navigation"
  - "guide"
  - "pricing"
  - "products"
  - "how-to"
---

# WasteHero 2.0 - Products & Pricing Navigation Guide

This guide shows you where to find and manage all product and pricing features in WH 2.0.

---

## Settings → Customer Management → Product Catalog

**What it is**: Central place to manage all your products and services

**What you can do here**:
- Create new products (containers, services, fees)
- View all existing products
- Edit product details
- Filter products by category, waste fraction, property type
- Save custom filters for quick access
- Bulk edit multiple products at once

**Product Categories**:
- **Material Products**: Physical waste containers (e.g., 240L mixed waste bin)
- **Service Products**: Emptying services, waste collection
- **One-off Fees**: Delivery fee, exchange fee, extra visit
- **Recurring Fees**: Base fee, regional collection fee

**Required Fields**:
- Product name
- Product category

**Optional Fields** (depends on category):
- Waste fraction
- Container type
- Permitted emptying intervals
- Property categories that can order
- Portal visibility
- Default weight
- EWC/LoW codes
- R/D codes
- Transfer document requirements

---

## Settings → Customer Management → Product Catalog → [Product] → Product Details

**What it is**: Detailed view of a single product

**Tabs**:

### Configuration Tab
- Product name and code
- Product category
- Waste fraction
- Container type
- Property types allowed
- Pickup settings

### Product Schema Tab
- Product type (product/service)
- Direction (incoming/outgoing/transfer)
- Default weight
- EWC/LoW codes
- R/D codes
- Origin location
- Storage location
- Load inspection requirements
- Hazardous waste properties
- Transfer document settings
- YLVA reporting settings
- Product group

### Bill of Materials Tab
**What it is**: Define what components make up this product

**Example** (Bio-waste Container Service):
- Container fee component
- Emptying fee component
- Base fee component
- Environmental fee component

**You can**:
- Add/remove components
- Update component details
- Set default components
- Modify attributes per component

### Additional Services Tab
**What it is**: Optional services that can be added to this product

**Common Additional Services**:
- Cancellation fee (return trip)
- Extra container wash
- Weighing fee
- On-site inspection

**Settings for each**:
- Automatic or manual application
- Requires driver confirmation (yes/no)
- Price for additional service

### Service Levels Tab
**What it is**: Different urgency levels for service delivery

**Service Level Options**:
- **Scheduled**: Regular schedule, base price
- **On-demand**: Within 7 days, higher price
- **Express**: Within 3 days, premium price
- **Emergency**: Same/next day, highest price

**For each level set**:
- Delivery timeframe
- Price/surcharge
- Available days/times

### Service Responsibility Tab
**What it is**: Who is responsible for this service (affects pricing rules)

**Options**:
- Municipal services (publicly funded)
- TSV (Municipal Secondary) - business customers
- Market-based (commercial/private)
- Residential (property managers)
- Custom categories

**Settings**:
- Default service responsibility
- Allow override at contract level (yes/no)
- Allow override at event level (yes/no)

### Portal Visibility Tab
- Visible in customer portal (yes/no)
- Available for online ordering (yes/no)
- Display description
- Display image

### Enabling Tab
- Product active (yes/no)
- Effective date range

---

## Settings → Customer Management → Price Lists

**What it is**: Manage all pricing for products

**Main View Shows**:
- All price lists
- Products in each list
- Current prices
- Effective dates
- Last modified info

**Actions Available**:
- Create new price list
- Filter/search prices
- Bulk edit prices
- Export prices
- Import prices (Excel)

---

## Settings → Customer Management → Price Lists → [Price List] → General

**What it is**: Settings for a specific price list

**Fields**:
- Price list name
- Description
- Currency
- Valid from date
- Valid to date (optional - leave empty for "until further notice")
- Status (active/inactive)

---

## Settings → Customer Management → Price Lists → [Price List] → Products

**What it is**: All products with prices in this price list

**Table Shows**:
- Product name
- Product category
- Base price
- Pricing unit (€/piece, €/kg, €/m³, €/hour, etc.)
- Effective date
- Status

**Actions**:
- Add product to price list
- Edit price for product
- Remove product from price list
- Bulk edit multiple products

---

## Settings → Customer Management → Price Lists → [Price List] → Products → [Product] → Price Details

**What it is**: Detailed pricing for one product

### Basic Price Tab
- Product name
- Base price
- Pricing unit
- VAT percentage
- Gross/Net toggle (auto-calculates other)
- Effective from date
- Effective to date

### Price Determination Conditions
**What it is**: Different prices for same product based on conditions

**Available Conditions**:
- **Service Responsibility**: Different price per responsibility type
- **Zone/Region**: Different price per geographical zone
- **Property Type**: Different price per property category
- **Processing Method**: Different price per R/D code
- **Customer Category**: Business vs private

**Example Setup**:
| Condition Set | Service Resp | Zone | Property Type | Price |
|--------------|-------------|------|---------------|-------|
| 1 | Municipal | Urban | Residential | €50 |
| 2 | Municipal | Rural | Residential | €60 |
| 3 | Market-based | Urban | Business | €70 |
| 4 | Market-based | Rural | Business | €80 |

**Price Matching Logic**:
- System finds row with MOST matching conditions
- If multiple rows match equally → picks first or lowest price (configurable)

### Price Components Tab
**What it is**: Break down price into itemized components

**Common Components**:
- Base fee (€/year)
- Transport fee
- Treatment fee
- Environmental fee
- Container rental
- Weighing fee
- Cancellation fee

**For each component**:
- Component name
- Price
- Unit (if applicable)
- Show on invoice (yes/no)

**Invoice Display Options**:
- Show all components (itemized)
- Show total only (consolidated)

### Service Speed Pricing Tab
**What it is**: Price varies by delivery urgency

**Speed Levels**:
- Scheduled service: Base price
- On-demand: +€X or +X%
- Express: +€Y or +Y%
- Emergency: +€Z or +Z%

### Time-Based Pricing Tab
**What it is**: Price varies by when service is delivered

**Options**:
- Weekend surcharge (Sat/Sun): +€X or +X%
- Holiday surcharge: +€Y or +Y%
- Peak hours (after 6pm): +€Z or +Z%

**Holiday Calendar**:
- Select regional holidays
- Set surcharge per holiday

### Scheduled Price Updates Tab
**What it is**: Pre-schedule future price changes

**Settings**:
- New price
- Effective date (future)
- End date (optional)
- Reason for change
- Apply to all conditions or specific ones

**Important**:
- Prices are determined by **service date** not **posting date**
- Service performed before price change = old price
- Service performed after price change = new price

---

## Settings → Customer Management → Price Lists → Bulk Edit

**What it is**: Update multiple product prices at once

**Steps**:
1. **Filter Products**: Select which products to update
2. **Choose Update Type**:
   - Increase by percentage (e.g., +5%)
   - Decrease by percentage (e.g., -10%)
   - Increase by amount (e.g., +€5)
   - Decrease by amount (e.g., -€5)
   - Set to specific value (e.g., €50)
3. **Set Effective Date**
4. **Add Reason** (optional but recommended)
5. **Preview Changes**
6. **Apply**

**Can Also Bulk Update**:
- Pricing units
- Zones
- Service responsibilities
- VAT rates
- Status (active/inactive)

---

## Settings → Customer Management → Price Lists → Import/Export

**What it is**: Move price data in/out of system

### Export
- Format: Excel, CSV
- What's exported:
  - Product codes
  - Product names
  - Current prices
  - All conditions
  - Effective dates
  - Price components

### Import
- Format: Excel, CSV
- Must include:
  - Product code or name
  - New price
  - Effective date
- System validates:
  - Product exists
  - Price format correct
  - No conflicts with existing prices
  - Required fields present

---

## Settings → Customer Management → Price Lists → Price Change Log

**What it is**: Audit trail of all price changes

**Log Shows**:
- Date/time of change
- User who made change
- Product affected
- Old price
- New price
- Reason for change
- Source (manual, bulk, import)

**Filters**:
- Date range
- User
- Product
- Price list
- Change type

**Actions**:
- View change details
- Export log
- Revert change (if within X days)

---

## Settings → Customer Management → Zones

**What it is**: Define geographical areas for pricing

**Main View**:
- All defined zones
- Zone names
- Number of properties in each
- Associated price lists

**Actions**:
- Create new zone
- Edit zone boundaries
- View properties in zone
- Delete zone

---

## Settings → Customer Management → Zones → [Zone] → Configuration

**What it is**: Set up a single zone

**Methods to Define Zone**:

### Option 1: Draw on Map
- Click "Draw Zone"
- Click points on map to create boundary
- Close polygon
- System calculates which properties are inside

### Option 2: Upload Coordinates
- Upload file with boundary coordinates
- Format: CSV, GeoJSON, KML
- System validates and displays

### Option 3: Select Postal Codes
- Choose from postal code list
- Multiple selections allowed
- System includes all addresses in those codes

**Zone Details**:
- Zone name
- Zone code (optional)
- Description
- Color (for map display)

---

## Settings → Customer Management → Service Responsibilities

**What it is**: Manage service responsibility categories

**Default Categories**:
- Municipal services
- TSV (Municipal Secondary)
- Market-based services
- Residential responsibilities

**For Each Category**:
- Name
- Description
- Code (for reporting)
- Active (yes/no)

**Actions**:
- Add custom category
- Edit category details
- Set default category
- Deactivate category

---

## Settings → Customer Management → Additional Services

**What it is**: Manage services that can be added to main products

**Main View**:
- All additional services
- Service names
- Pricing
- Application method (auto/manual/driver)

**Common Services**:
- Cancellation fee
- Extra wash
- Weighing fee
- On-site visit
- Extra bin delivery
- Bin exchange

---

## Settings → Customer Management → Additional Services → [Service] → Configuration

**What it is**: Set up a single additional service

### General Tab
- Service name
- Service code
- Description
- Category

### Application Rules Tab
**How is this service applied?**

- **Automatic**: System applies based on rules
  - Example: Cancellation fee auto-applied if access denied
  - Set conditions for when to apply

- **Manual**: Office staff adds when needed
  - Available in order creation
  - Shows in additional services dropdown

- **Driver-Initiated**: Driver requests, office approves
  - Driver sees option in app
  - Creates request
  - Office approves/rejects
  - If approved → added to invoice

### Pricing Tab
- Base price
- Pricing unit
- Different prices per:
  - Service responsibility
  - Zone
  - Customer category

### Availability Tab
- Available for which products?
- Available for which customer types?
- Available in portal? (yes/no)

---

## Property → [Property] → Agreements Tab → Add Agreement

**What it is**: Create contract between customer and company

**Steps**:
1. **Select Products**: Choose from product catalog
2. **Select Price List**: Choose applicable price list
3. **Set Service Level**: Scheduled/On-demand/Express/Emergency
4. **Select Additional Services**: Any add-ons needed
5. **Set Schedule**:
   - Recurring: Every X weeks
   - On-demand only
6. **Set Dates**:
   - Start date
   - End date (or ongoing)
7. **Price Override** (optional):
   - Use price list prices OR
   - Set custom contract price
8. **Apply Discount** (optional):
   - Percentage discount
   - Fixed amount discount
   - Valid dates

**Result**: Agreement created, visible in property agreements list

---

## Property → [Property] → Agreements Tab → [Agreement] → Details

**What it is**: View/edit existing agreement

### Overview Tab
- Products in agreement
- Current prices
- Service level
- Schedule
- Additional services included
- Discount applied
- Effective dates

### Pricing Tab
**Contract Price vs List Price**

- Toggle: Use price list or custom price
- If custom:
  - Set contract-specific price
  - Set validity dates
  - Add reason for custom pricing

**Discount Section**:
- Discount type (percentage/fixed)
- Discount amount
- Valid from/to dates
- Apply to all products or specific ones

### History Tab
- All changes to agreement
- Price changes
- Service changes
- Discount applications
- User who made change + timestamp

---

## Property → [Property] → Containers Tab

**What it is**: Manage containers at this property

**For Each Container**:
- Container type (from product catalog)
- Waste fraction
- Size
- Default weight
  - Use product default OR
  - Set property-specific weight
- Location (coordinates)
- Installation date
- Status (active/inactive)

**Override Default Weight**:
1. Click container
2. Go to "Configuration"
3. Toggle "Use custom weight"
4. Enter property-specific weight
5. Add reason for override
6. Save

**Example**: Nursing home bio-waste container
- Product default: 16.8 kg
- Property override: 38 kg
- Reason: "Facility generates more waste than typical"

---

## Property → [Property] → Waste Water Treatment Tab

**What it is**: Record septic tank or sewage information

### Connected to Sewage Network
- Toggle: Yes
- No additional info needed

### NOT Connected - Has Septic Tank
**Required Information**:
- Tank type:
  - Saostussäiliö (Septic tank)
  - Umpisäiliö (Holding tank)
  - Pienpuhdistamo (Miniature treatment plant)
- Tank volume (m³)
- Waste water types:
  - Black water only
  - Grey water only
  - Both
- Appliances in use:
  - Washing machine (checkbox)
  - Dishwasher (checkbox)
  - Shower (checkbox)
- Tank coordinates
- Emptying problems (text field)
  - Example: "Cannot empty in winter"
- If miniature plant: Model name
- Shared with other properties? (yes/no)
- Last emptied date

**System Behavior**:
- If last emptied > 2 years ago → Alert shown
- Products for septic emptying can be linked
- Emptying happens on customer order only

---

## Tickets → Overview → Create Bulk Container Ticket

**What it is**: Create service tickets for multiple containers

**Steps**:
1. **Select Ticket Type**:
   - Choose from dropdown (defined in Settings → Tickets)
2. **Select Service/Container Fee**:
   - Service: The service product (e.g., "Mixed waste collection")
   - Container Fee: The recurring fee (if applicable)
3. **Choose Affected Properties/Containers**:
   - Filter properties
   - Select containers
   - Or upload list
4. **Set Service Details**:
   - Service date (or date range)
   - Service level (if applicable)
   - Priority
5. **Additional Services**:
   - Select any add-ons (from dropdown)
   - These were configured in Settings → Additional Services
6. **Preview & Create**

**Result**:
- Tickets created for each container
- Status: Pending
- When moved to "In Progress" → Container added to route
- When driver marks complete → Ticket status "Completed"

---

## Tickets → [Ticket] → Details

**What it is**: View single ticket details

**Displays**:
- Property info
- Container info
- Service product
- Service level
- Additional services attached
- Calculated price breakdown:
  - Base price
  - Service level surcharge
  - Additional services
  - **Total price**

**Price Determination Shows**:
- Which price list was used
- Which conditions matched
- Which components applied
- Service date
- Final price locked

**Actions**:
- Modify ticket (if not completed)
- Add additional services
- Change service level
- View price calculation details
- Recalculate price (if before completion)

---

## Reports → Pricing → Price Application Report

**What it is**: See how prices were determined

**Filters**:
- Date range
- Products
- Customers
- Properties
- Price lists

**Report Shows**:
- Event (service performed)
- Service date
- Product
- Price list used
- Conditions that matched:
  - Service responsibility
  - Zone
  - Property type
  - Speed level
  - Timing (weekend/holiday)
- Components applied
- Final price
- Price determination logic

**Use Cases**:
- Audit pricing accuracy
- Understand why customer was charged X
- Verify discounts applied correctly
- Check scheduled price updates took effect

---

## Reports → Pricing → Price Change History

**What it is**: Historical view of all price changes

**Filters**:
- Date range
- Products
- Price lists
- Users
- Change type (manual/bulk/import)

**Report Shows**:
- Date/time
- User
- Product
- Price list
- Old price
- New price
- Change type
- Reason
- Affected customers count

**Export Options**:
- Excel
- PDF
- CSV

---

## Settings → Tickets → Ticket Types → [Type] → Services Tab

**What it is**: Link services to ticket types

**Configuration**:
- Which service products can be used with this ticket?
- Select from product catalog (only service products shown)
- Default service product (if any)
- Required service level? (yes/no)
- Allow additional services? (yes/no)

**Example** (Container Emptying Ticket):
- Allowed services:
  - Mixed waste collection
  - Bio-waste collection
  - Cardboard collection
- Default: Mixed waste collection
- Service level: Optional
- Additional services: Yes

---

## Settings → Customer Management → Property Types

**What it is**: Categories of properties for pricing

**Default Types**:
- Residential (single family)
- Residential (apartment)
- Commercial
- Industrial
- Public sector
- Agricultural

**For Each Type**:
- Name
- Code
- Description
- Can order which products?
- Default service responsibility
- Default price list

**Used For**:
- Filtering products (some products only for certain property types)
- Price determination (prices vary by property type)
- Agreement templates
- Reporting

---

## Customer → [Customer] → Pricing Tab

**What it is**: Customer-specific pricing overrides

### Default Price List
- Select which price list applies to this customer
- Overrides general/zone-based price list selection

### Customer Discounts
**Apply discount to all customer agreements**:
- Discount type (percentage/fixed)
- Discount amount
- Valid dates
- Apply to:
  - All products
  - Specific categories
  - Specific products

### Custom Prices
**Set specific prices for this customer**:
- Product
- Custom price
- Effective dates
- Reason

**Example**:
- General price list: Bio-waste collection = €60
- Customer custom price: €55
- Reason: "Long-term contract negotiation"

---

## Workflow Summary: How Pricing Works

### 1. Setup (One Time)
1. **Create Products** (Settings → Customer Management → Product Catalog)
   - Define product details
   - Set up bill of materials
   - Configure additional services
   - Set service levels

2. **Create Price Lists** (Settings → Customer Management → Price Lists)
   - Add products to price list
   - Set base prices
   - Define price determination conditions
   - Set up price components
   - Configure speed/timing pricing

3. **Define Zones** (Settings → Customer Management → Zones)
   - Draw boundaries or select areas
   - Link zones to price lists

4. **Configure Service Responsibilities** (Settings → Customer Management → Service Responsibilities)
   - Set up categories
   - Link to pricing

### 2. Per Customer
1. **Create Property**
   - Set property type
   - Set zone (auto-detected or manual)
   - Add containers with default weights

2. **Create Agreement** (Property → Agreements)
   - Select products
   - Select price list (or use default)
   - Set service level
   - Add additional services
   - Apply discounts (if any)

3. **Override Prices** (if needed)
   - Set contract-specific prices OR
   - Set customer-level discounts

### 3. Per Service Event
1. **Create Ticket** (Tickets → Create)
   - Select ticket type
   - Select service product (from agreement)
   - Container fee (from agreement)
   - Set service date

2. **System Determines Price**:
   - Looks at agreement
   - Checks price list
   - Evaluates conditions:
     - Property type
     - Service responsibility
     - Zone
     - Service level selected
     - Service date (weekend/holiday?)
     - Service speed (scheduled/express?)
   - Finds best matching price row
   - Applies price components
   - Applies customer discount (if any)
   - Applies contract discount (if any)
   - **Locks price**

3. **Ticket Lifecycle**:
   - Pending → In Progress (container added to route)
   - Driver completes → Status: Completed
   - Price remains locked
   - Invoice generated with price breakdown

### 4. Reporting & Auditing
1. **Price Application Report**
   - Shows which prices were used
   - Shows why that price was selected
   - Shows all conditions matched

2. **Price Change Log**
   - All price updates tracked
   - User, timestamp, reason recorded
   - Can export for compliance

---

## Quick Reference: Where to Find Things

| I want to... | Go to... |
|--------------|----------|
| Create a new product | Settings → Customer Management → Product Catalog → Add Product |
| Set up product components | Settings → Customer Management → Product Catalog → [Product] → Bill of Materials |
| Add additional services | Settings → Customer Management → Additional Services → Add Service |
| Create price list | Settings → Customer Management → Price Lists → Add Price List |
| Set product prices | Settings → Customer Management → Price Lists → [List] → Products → Add Product |
| Create pricing conditions | Settings → Customer Management → Price Lists → [List] → [Product] → Price Determination |
| Schedule price update | Settings → Customer Management → Price Lists → [List] → [Product] → Scheduled Updates |
| Update many prices at once | Settings → Customer Management → Price Lists → Bulk Edit |
| See price change history | Settings → Customer Management → Price Lists → Price Change Log |
| Define geographical zones | Settings → Customer Management → Zones → Add Zone |
| Manage service responsibilities | Settings → Customer Management → Service Responsibilities |
| Create customer agreement | Property → [Property] → Agreements → Add Agreement |
| Override contract price | Property → [Property] → Agreements → [Agreement] → Pricing |
| Apply customer discount | Customer → [Customer] → Pricing → Customer Discounts |
| Set custom container weight | Property → [Property] → Containers → [Container] → Configuration |
| Add septic tank info | Property → [Property] → Waste Water Treatment |
| Create service tickets | Tickets → Create Bulk Container Ticket |
| See how price was calculated | Tickets → [Ticket] → Details → Price Calculation |
| Report on pricing | Reports → Pricing → Price Application Report |
| Audit price changes | Reports → Pricing → Price Change History |

---

## Common Scenarios

### Scenario 1: New Municipal Tariff
**Task**: Municipality increases all prices by 5% starting January 1

**Steps**:
1. Go to: Settings → Customer Management → Price Lists → Bulk Edit
2. Filter: Select all products
3. Update: Increase by 5%
4. Effective Date: January 1, 2026
5. Reason: "Municipal tariff update 2026"
6. Preview and Apply

**Result**: All prices updated, all past services still use old price, future services use new price

---

### Scenario 2: Special Customer Price
**Task**: Give commercial customer 10% discount for 1 year

**Steps**:
1. Go to: Customer → [Customer] → Pricing
2. Click: Add Customer Discount
3. Type: Percentage
4. Amount: 10%
5. Valid From: Today
6. Valid To: 1 year from today
7. Apply To: All products
8. Save

**Result**: All services for this customer get 10% off for next year

---

### Scenario 3: Weekend Pricing
**Task**: Add €20 surcharge for weekend services

**Steps**:
1. Go to: Settings → Customer Management → Price Lists → [List] → Products → [Product]
2. Click: Time-Based Pricing Tab
3. Weekend Surcharge: €20
4. Apply to: Saturday and Sunday
5. Save

**Result**: Any service on weekend automatically gets €20 added

---

### Scenario 4: Property-Specific Weight
**Task**: Nursing home needs heavier container weight

**Steps**:
1. Go to: Property → [Property] → Containers
2. Select: Bio-waste container
3. Click: Configuration
4. Toggle: Use custom weight ON
5. Enter: 38 kg (instead of default 16.8 kg)
6. Reason: "Facility generates higher waste volumes"
7. Save

**Result**: All services for this container use 38kg in calculations

---

### Scenario 5: Additional Service on Ticket
**Task**: Driver couldn't access property, needs cancellation fee

**Option A - Driver Initiates**:
1. Driver in app sees: "Access denied"
2. Driver clicks: Request additional service
3. Selects: Cancellation fee
4. Adds note: "Gate locked, customer not home"
5. Office receives request
6. Office approves
7. Fee auto-added to ticket

**Option B - Automatic**:
1. Cancellation fee configured as automatic
2. Trigger: When ticket cancelled due to access
3. System auto-adds cancellation fee
4. Shows on invoice automatically

---

## Tips & Best Practices

### Product Setup
- ✅ Start with product categories, they define what fields you need
- ✅ Use clear, consistent naming (e.g., "240L Mixed Waste Container")
- ✅ Set up bill of materials for complex products
- ✅ Configure additional services that apply to multiple products
- ✅ Enable portal visibility only for products customers should self-order

### Pricing
- ✅ Create main price list first, then variations (zones, customer types)
- ✅ Use price determination conditions instead of duplicate products
- ✅ Schedule price updates in advance with clear reasons
- ✅ Test bulk updates with small sample before applying to all
- ✅ Use gross/net toggle - let system calculate other automatically

### Price Determination
- ✅ More specific conditions = higher priority matching
- ✅ Create "catch-all" price row with no conditions as fallback
- ✅ Test price matching logic with sample customers before go-live
- ✅ Use price application report to verify prices are correct

### Agreements
- ✅ Use price list prices whenever possible
- ✅ Only override at contract level when customer has special rate
- ✅ Always add reason when setting custom prices or discounts
- ✅ Set end dates for temporary discounts

### Auditing
- ✅ Review price change log weekly
- ✅ Run price application reports monthly
- ✅ Check scheduled price updates took effect
- ✅ Export logs for regulatory compliance

### Performance
- ❌ Don't create separate products for every price variation
- ✅ Use price determination conditions instead
- ❌ Don't create 100s of price lists
- ✅ Use zones and service responsibilities to handle variations
- ✅ Archive old, unused products instead of deleting

---

## Differences from WH 1.0

| Feature | WH 1.0 | WH 2.0 |
|---------|--------|--------|
| **Products** | Simple flat list | Categories with schemas |
| **Product Components** | Not supported | Bill of materials |
| **Price Lists** | Simple lookup | Multi-attribute matching |
| **Price Changes** | Manual tracking | Automatic logging |
| **Bulk Pricing** | Limited | Full bulk edit + import |
| **Service Levels** | Not supported | Scheduled/Express/Emergency |
| **Additional Services** | Manual only | Auto/Manual/Driver-initiated |
| **Zones** | Not supported | Coordinate-based zones |
| **Service Responsibility** | Single level | Multi-level hierarchy |
| **Price Components** | All or nothing | Itemized + consolidated |
| **Scheduled Updates** | Not supported | Pre-schedule with service date logic |
| **Default Weights** | Global only | Per-property override |
| **Waste Water** | Not supported | Full septic tank tracking |

---

## Need Help?

**Can't find what you're looking for?**
- Check the Quick Reference table above
- Look in Settings → Customer Management (most things are here)
- Use the search bar in the application

**Price isn't what you expected?**
- Go to: Tickets → [Ticket] → Price Calculation Details
- Shows exactly why that price was selected
- Shows all conditions that were evaluated

**Want to see what changed?**
- Go to: Settings → Customer Management → Price Lists → Price Change Log
- Filter by date, user, or product
- Export for auditing
