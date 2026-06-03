---
slug: pjh-invoicing-event-field-sources
title: Event Field Sources (PD-299)
category: inv-r1
order: 3
description: Every field on a billing event, where it comes from, and how the source differs by trigger type (pickup, weighbridge, manual, recurring).
tags:
  - invoicing
  - release-1
  - pd-299
  - data-model
  - pjh
---

# PJH Invoicing — Event Field Sources

This doc explains **every field on a billing event** ([PD-299](https://ioteelab.atlassian.net/browse/PD-299)), where each one comes from, and how the source changes depending on how the event was triggered.

The point: an event is not typed in by one person. It is **assembled at creation time** from several sources — the operational trigger, master data lookups, the pricing engine, and the CRM. Knowing which source feeds which field is what the squad needs to actually wire the event pipeline.

**Companion docs:**
- [pjh-invoicing-r1-requirements.md](./pjh-invoicing-r1-requirements.md) — the 10 R1 PD requirements
- [r1-mockup.html](./r1-mockup.html) — the interactive mockup showing all 26 fields

---

## The four sources

Every field on an event traces back to one of four places:

| Source | What it is | Examples of what it provides |
|---|---|---|
| **① Trigger** | The operational moment that created the event — a driver tap, a weighbridge reading, an office keystroke, a scheduled job | Date, quantity, weight, vehicle, unloading place |
| **② Master data** | Configured reference data: the product catalogue ([PD-41](https://ioteelab.atlassian.net/browse/PD-41)), the pricing engine ([PD-322](https://ioteelab.atlassian.net/browse/PD-322)/[PD-327](https://ioteelab.atlassian.net/browse/PD-327)/[PD-330](https://ioteelab.atlassian.net/browse/PD-330)), the chart of accounts, the cost-centre register | Product name, all prices, accounts, cost centres, service responsibility |
| **③ CRM** | The customer/property/contract records | Customer number, municipality, shared-collection-point membership |
| **④ System** | Generated or computed by the invoicing module itself at event creation | Event ID, VAT totals |

A single event pulls from all four. The trigger says *what happened*; master data and CRM fill in *who, where, and how much*; the system stamps the identity and does the arithmetic.

---

## The four trigger types

The same field can come from a different place depending on how the event was triggered. PD-299 names three integration sources explicitly (*"Event data can also be generated via a weighbridge integration or a cashier/POS system integration"*); recurring is the fourth.

| Trigger | How it fires | Typical products |
|---|---|---|
| **Pickup / emptying** | Driver confirms the pickup/emptying of a container in the mobile app. The tap closes the operational task and triggers a billing event. | Bin emptyings (sekajäte, biojäte, paperi) |
| **Weighbridge** | A truck weighs in/out at a reception facility. The weighbridge integration sends the reading, which triggers an event. | Reception (rakennusjäte, metalliromu) |
| **Manual** | Office staff create an event by hand for something with no integration. | Septic tank emptying, land rent, expert work |
| **Recurring** | A scheduled job generates the event on a calendar trigger. | Annual base fee (vuosiperusmaksu) |

---

## Field-by-field provenance

All 26 fields from the PD-299 schema, grouped by the card they appear on in the mockup.

### Event & customer

| Field | Source | Where it specifically comes from |
|---|---|---|
| **Event ID** | ④ System | Generated when the event is created. Format `evt-YYYY-MM-DD-NNNN`. |
| **Date** | ① Trigger | The moment the operational action happened. Pickup → driver's confirmation timestamp. Weighbridge → weigh time. Manual → date entered. Recurring → the scheduled run date. |
| **Customer number** | ③ CRM | Resolved through the chain: the container sits on a **property**, the property has a **service agreement**, the agreement names the **customer**. For weighbridge, the operator identifies the customer at the gate. For manual, office staff pick the customer. |
| **Contractor** | ① Trigger | The hauler company that performed the work, from the route/vehicle assignment in route execution. Empty for recurring and most manual events. |
| **Municipality** | ③ CRM | From the property record (the municipality the collection address sits in). Used for authority reporting and as a pricing input. |
| **Origin** | ① Trigger | Where the waste came from — the collection address (pickup) or the customer's stated origin (weighbridge). A waste-transfer-document (siirtoasiakirja) field. |
| **Direction** | ① Trigger | Collection (inbound to facility) vs delivery (outbound). Determined by the event type. Pickup/weighbridge reception → inbound. |
| **Registration number** | ① Trigger | The vehicle plate. Pickup → the truck running the route, from the vehicle assigned to that route in the app. Weighbridge → the vehicle weighed at the gate. |
| **Place of unloading** | ① Trigger | The facility where the load was tipped. Weighbridge knows this directly. Pickup → the disposal site assigned to the route. |

### Product & quantity

| Field | Source | Where it specifically comes from |
|---|---|---|
| **Product / service** | ① Trigger → ② Master data | The trigger identifies *which* product. **Pickup: the container on the property has a configured product on its service agreement** (e.g. "Sekajäte 240L emptying"); confirming the pickup attaches that product to the event. Weighbridge: the gate operator selects the product. Manual: office staff pick from the catalogue. |
| **Product name** | ② Master data | Looked up from the product catalogue ([PD-41](https://ioteelab.atlassian.net/browse/PD-41)) using the product ID the trigger supplied. |
| **Quantity** | ① Trigger | Pickup → 1 (one emptying). Weighbridge → the measured volume (m³) if volume-priced. Manual → entered by staff. |
| **Weight (t/kg)** | ① Trigger | From the weighbridge for reception events and weight-priced products. For per-emptying pickups it may be an estimate or blank — the requirement says "not all events have this information." |

### Price formation

Every price field comes from the **pricing engine** (pricing 2.0, already built). When the trigger fires, the pricing engine is called with the product, customer, region, and date, and it returns the breakdown. The invoicing module does not calculate prices; it records what pricing returns.

| Field | Source | Where it specifically comes from |
|---|---|---|
| **Waste price (treatment)** | ② Master data (pricing) | A BOM price component ([PD-40](https://ioteelab.atlassian.net/browse/PD-40)/[PD-327](https://ioteelab.atlassian.net/browse/PD-327)) resolved from the matching price list ([PD-330](https://ioteelab.atlassian.net/browse/PD-330)). |
| **Transport price** | ② Master data (pricing) | A separate BOM price component from the same price resolution. |
| **Eco-fee** | ② Master data (pricing) | A separate BOM price component. Päivi Kaarne's explicit requirement: the eco-fee is a price-formation component that must be visible on the event. |
| **Shared collection point group %** | ③ CRM | The subscriber's share of a shared collection point, from the shared-point configuration on the contract. Only populated for shared-point members. |
| **Net total — VAT 0% base** | ④ System | Computed: sum of the components carrying a 0% VAT rate (e.g. reverse-charge lines). |
| **Net total — VAT 25.5% base** | ④ System | Computed: sum of the components carrying the standard rate. |
| **Total with 0% VAT** | ④ System | Computed: the 0% base (VAT adds nothing). |
| **Total with 25.5% VAT** | ④ System | Computed: standard-rate base + VAT. |

> **VAT rate note:** PD-299's text says "VAT price 24%", written before Finland raised the standard rate to **25.5%** (Sept 2024). The schema needs a 0% bucket and a standard-rate bucket; the rate number is 25.5% today, not 24%.

### Accounting & classification

| Field | Source | Where it specifically comes from |
|---|---|---|
| **Service responsibility** | ② Master data (pricing) | The public-law / private-law tag is an attribute on the matched price list row ([PD-322](https://ioteelab.atlassian.net/browse/PD-322)/[PD-330](https://ioteelab.atlassian.net/browse/PD-330)). Pricing returns it alongside the price. This is the "brain" of [PD-285](https://ioteelab.atlassian.net/browse/PD-285) — classification falls out of price resolution, not a separate engine. |
| **Accounts** | ② Master data | Each price component routes to a G/L account. The routing is held per product/price-component (or in invoicing's routing table, [PD-295](https://ioteelab.atlassian.net/browse/PD-295)). Treatment → 30002, transport → 30005, eco-fee → 30007, VAT → 2939. |
| **Cost centres** | ② Master data | The operational unit the euro belongs to, routed by product + region ([PD-296](https://ioteelab.atlassian.net/browse/PD-296)). |

### Comments

| Field | Source | Where it specifically comes from |
|---|---|---|
| **Free-text comment field** | ① Trigger | A note attached at the operational moment — a driver note in the app, or office-staff text on manual entry. |
| **Event comments** | ① Trigger / ④ System | Free notes added to the event, by staff or appended by the system (e.g. flags raised during processing). |

---

## Worked example: a pickup event

Korhonen Maija's 240L mixed-waste bin is emptied. Here is how every field gets filled, in order:

1. **The trigger.** The driver on the Hyvinkää morning round confirms the pickup of Korhonen's container in the mobile app. That tap creates the event and stamps: **Date** (2026-05-12), **Registration number** (HVK-247, the route's truck), **Contractor** (Kuljetus Hyvinkää Oy), **Quantity** (1), **Direction** (collection), **Place of unloading** (Hyvinkää-laitos), **Origin** (Mäntytie 14).

2. **The container tells us the product.** The bin on Korhonen's property carries the product "Sekajäte 240L tyhjennys" on its service agreement. The event inherits that **Product / service**. The catalogue lookup fills **Product name**.

3. **CRM fills the customer side.** The property → agreement → customer chain resolves **Customer number** (CID 100482) and **Municipality** (Hyvinkää).

4. **The pricing engine is called** with (product, customer, region, date) and returns the breakdown: **Waste price** 3.49, **Transport price** 2.33, **Eco-fee** 0.50, the **VAT bases** and **totals**, the **accounts** each component routes to, the **cost centre**, and the **service responsibility** (Municipal / public law).

5. **The system finishes it.** It assigns the **Event ID**, computes the **VAT totals**, and the event lands in the events table ready for validation ([PD-278](https://ioteelab.atlassian.net/browse/PD-278)).

Nobody typed most of this. The driver tapped once; everything else was assembled from master data, pricing, and CRM.

---

## Worked example: a weighbridge event

Rakennus Virtanen Oy delivers construction waste to the Hyvinkää facility.

1. **The trigger.** The truck weighs in and out. The weighbridge integration sends the net **Weight** (1 240 kg) and **Date/time**, identifies the **Vehicle** (RKV-880, customer-owned) and **Place of unloading** (Hyvinkää-laitos). **Direction** = reception (inbound).
2. **Product at the gate.** The operator selects "Rakennusjäte vastaanotto"; catalogue fills the **Product name**. **Quantity** = the weight, since this product is weight-priced.
3. **CRM** resolves **Customer number** (CID 200314) and **Municipality** (Riihimäki).
4. **Pricing** returns the **Waste price** (98.40, weight × rate), **Transport** 0 (customer delivered), **service responsibility** = Market-based (private law), the **account** (30005), and a **0% reverse-charge VAT** treatment because the customer has a Finnish VAT number.
5. **System** stamps the **Event ID** and totals.

Same 26-field schema, different trigger, several fields sourced differently (weight from the scale rather than estimated; transport zero because the customer drove).

---

## Which fields are mandatory, by trigger type

The requirement says *"not all events have this information."* This table shows what each trigger type can realistically populate. A blank means the field is usually empty for that trigger, not that it's unsupported.

| Field | Pickup | Weighbridge | Manual | Recurring |
|---|:---:|:---:|:---:|:---:|
| Event ID | ✓ | ✓ | ✓ | ✓ |
| Date | ✓ | ✓ | ✓ | ✓ |
| Customer number | ✓ | ✓ | ✓ | ✓ |
| Product / service + name | ✓ | ✓ | ✓ | ✓ |
| Prices (waste/transport/eco-fee) | ✓ | ✓ | ✓ | ✓ |
| VAT bases + totals | ✓ | ✓ | ✓ | ✓ |
| Accounts + cost centres | ✓ | ✓ | ✓ | ✓ |
| Service responsibility | ✓ | ✓ | ✓ | ✓ |
| Quantity | ✓ | ✓ | ✓ | ✓ |
| Weight | ~ | ✓ | ~ | — |
| Registration number | ✓ | ✓ | — | — |
| Contractor | ✓ | ~ | — | — |
| Place of unloading | ✓ | ✓ | — | — |
| Origin | ✓ | ✓ | ~ | — |
| Direction | ✓ | ✓ | ~ | — |
| Municipality | ✓ | ✓ | ✓ | ✓ |
| Shared collection point % | ~ | — | — | — |
| Comments | ~ | ~ | ~ | — |

✓ = always present · ~ = sometimes · — = usually empty

The first block (down through service responsibility + quantity) is the **mandatory set** — these must be present for any event to pass validation and become an invoice. That is what [PD-278](https://ioteelab.atlassian.net/browse/PD-278) checks. The fields below the line are populated when the trigger has them.

---

## How this maps to the FINVOICE export

Not every field rides into the FINVOICE XML. For reference:

- **In the XML:** customer, product name, the price components (each as its own accounting row), VAT bases/rates/totals, accounts, cost centres, service responsibility, date, invoice number.
- **Stored on the event but not in the standard XML:** contractor, registration number, place of unloading, origin, direction, weight (unless weight-priced), comments. These exist for operations, audit, and authority reporting. Which of them attach to the export for reporting is settled by [PD-289](https://ioteelab.atlassian.net/browse/PD-289) (R2).

So keeping all 26 fields on the event is correct — they serve operations, audit, validation, and reporting even where they don't appear on the customer's invoice.

---

*Document prepared: 2026-06-03 · Ledger squad · WasteHero invoicing module*
*Field provenance reflects the designed event pipeline. The PD-299 field list is verbatim from the Jira ticket; the source mapping is an architectural design statement, not requirement text.*
