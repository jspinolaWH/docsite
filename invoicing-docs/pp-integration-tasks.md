---
slug: pp-integration-tasks
title: P&P Integration into WasteHero 1.0
category: inv-arch
order: 2
description: The problem and the 15 tasks to make the migrated Products & Pricing module usable in WasteHero 1.0 — reference-data reconciliation, ticket-first consumption, the new agreement model, and per-customer coexistence. Billing is the next project; this delivers billing-ready agreements.
related:
  - pjh-invoicing-module-analysis
tags:
  - invoicing
  - products-pricing
  - integration
  - agreements
  - architecture
---

# P&P Integration into WasteHero 1.0: Problem and Tasks

## The problem

The Products & Pricing module was built as a standalone microservice (its own database, its own copies of Categories, Waste Fractions, Zones, Pricing Units, Products, Bill of Materials, Service Levels, Price Lists, Price Rows, and the price determination engine). It has now been migrated into WasteHero 1.0. The data is there, but it is inert. The products are not referenced by anything, and there is no way to put one on a property.

Three gaps stand between "migrated" and "usable":

1. **Reference data is duplicated.** P&P carries its own Waste Fraction and a label-only Container Type. WasteHero 1.0 already owns the real versions of both. The 1.0 Waste Fraction holds physical and display attributes but is missing the compliance and recovery fields P&P added. The 1.0 Container Type is the full operational entity, while P&P has only a label. Products must reference the 1.0 entities, not their own copies.

2. **There is no consumption path.** On a property you cannot pick a product and place it as a container. The Add Container ticket flow exists but its container picker is empty and disconnected from the catalog.

3. **There is no commercial binding.** A placed container needs an agreement that carries its price. The price comes from the new product, it is override-able at the agreement level, and the override is entered while the user adds the container through the ticket. A future billing run will read these agreements, but billing itself is the next project, not part of this scope.

On top of this, the new flow cannot disturb existing customers. Customers using the current agreement model stay as they are. New customers get the new model. The two run side by side, gated per customer by a feature flag.

## Solution shape

- WasteHero 1.0 owns the operational entities (Waste Fraction, Container Type, Property, Container, Ticket). P&P owns the commercial entities (Product, Price List, Price Row, BOM, Service Level surcharges, pricing rules). Products reference 1.0 entities by ID.
- Ticket-first consumption. An Add Container action on the property opens the catalog, you pick a product, the engine resolves a price, and it creates a container ticket plus a draft agreement. On ticket completion the container goes active and the agreement activates.
- The price comes from the product. On the agreement, during the add-container flow, the user can override it. The agreement stores the final price (product price or overridden value).
- Old and new agreements live in two separate tabs, both gated for visibility by the per-customer flag, so a customer only ever sees one. One customer is wholly on one model.
- The feature flag gates the bundle as one switch: the Add Container action, the new agreement model, and the new agreements tab. Billing is downstream and out of this scope.

## Decisions locked

- 1.0 is the source of truth for operational entities; P&P for commercial. Products hold references, not copies.
- Ticket-first. The Add Container action creates the ticket and a draft agreement together.
- Agreement activates on ticket completion, at the same moment the container goes active. Effective-from is the placement date, not the request date.
- Price originates from the product and is override-able on the agreement during the add-container flow. The agreement is a fresh build (the new tab's model), not an extension of the legacy 1.0 agreement.
- Two agreement tabs, both visibility-gated per customer, one active model per customer.

## Out of scope (next project)

- **Billing run that consumes the new agreements.** Billing is not built yet and is the project that follows this integration. This integration's deliverable is priced, active, billing-ready agreements. Keeping one model active per customer (see T15) exists so that future billing receives clean inputs.

---

## Tasks

### Layer 1: Reference data reconciliation

- [ ] **T1. Add missing fields to the 1.0 Waste Fraction.** Add EWC code, R/D code, characteristics, recycling %, energy recovery, material recovery, and emptying interval to the 1.0 Waste Fraction model. These already exist in P&P and need to become part of the 1.0 master.
- [ ] **T2. Expose Waste Fraction fields to the pricing engine.** Make the new 1.0 Waste Fraction fields readable by the price determination engine, since R/D and other attributes feed price-row matching.
- [ ] **T3. Repoint products to 1.0 Waste Fractions.** Migrate the migrated products from P&P Waste Fraction IDs to 1.0 Waste Fraction IDs. This is a data migration, not just a code change.
- [ ] **T4. Bind product to the 1.0 Container Type.** Replace the P&P label-only container type with a reference to the real 1.0 Container Type, and repoint migrated products. Also a data migration.

### Layer 2: Add Container consumption flow

- [ ] **T5. Add the "Add container" action to the property Actions menu.** New action, visible only when the feature flag is on. Deep-links into the ticket flow with the catalog-driven container ticket type preselected.
- [ ] **T6. Build the product catalog picker page.** Lists products that are valid for this property, filtered by zone, customer type, service responsibility, and R/D. One product is selected.
- [ ] **T7. Resolve price on selection.** On product select, call the price determination engine and carry the product's bound container type and waste fraction into the flow. Show the resolved price as the default on the agreement line.
- [ ] **T8. Allow price override in the flow.** Let the user override the resolved price on the agreement while adding the container. The entered value becomes the agreement price.
- [ ] **T9. Create the container ticket.** Reuse the existing ticket machinery. The new picker replaces the current empty container picker.
- [ ] **T10. Activate the container on ticket completion.** When the ticket completes, the container becomes active on the property.

### Layer 3: New agreement model

- [ ] **T11. Build the new agreement model.** Holds a product reference, the price (resolved from the product or overridden), and a draft/active lifecycle. Effective-from is the placement date. This is a new build, not an extension of the legacy agreement.
- [ ] **T12. Tie the agreement lifecycle to the ticket.** Create a draft agreement when the Add Container ticket is created, carrying any override entered in the flow. Activate it on ticket completion. A cancelled ticket leaves no active agreement.
- [ ] **T13. Build the new Agreements tab.** Read and edit the new agreements, with price override on the line. Separate tab from the legacy Agreements tab.

### Layer 4: Coexistence

- [ ] **T14. Add the per-customer feature flag gating the bundle.** One switch that turns on the Add Container action, the new agreement model, and the new Agreements tab together.
- [ ] **T15. Gate tab visibility and enforce one model per customer.** Old customers see only the legacy Agreements tab, new customers see only the new one, no customer sees both. A customer can only ever hold one model of agreement, so future billing never has to reconcile two shapes.
