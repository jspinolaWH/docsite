---
slug: pp-integration-gaps
title: P&P Integration Gaps: Problem and Tasks
category: inv-arch
order: 3
description: The gaps that stop the migrated Products & Pricing integration short of working end to end — incomplete container product config, bulk-only placement, missing ticket data, an incomplete ticket-to-container lifecycle, no teardown path, and a dead portal-visibility flag — plus the solution shape for each.
related:
  - pp-integration-tasks
  - pjh-invoicing-module-analysis
tags:
  - invoicing
  - products-pricing
  - integration
  - agreements
  - architecture
---

# P&P Integration Gaps: Problem and Tasks

## The problem

The P&P integration gave WasteHero 1.0 a migrated catalog and the skeleton of a consumption path. But walking the actual flow surfaces gaps that stop it short of working end to end. A product can't be fully described as a placeable container, the only way to place one is the bulk operation, the ticket doesn't carry the data it should, the ticket-to-container lifecycle is incomplete, there is no way to take a container back off a property, and the portal flag that decides which products a customer can order is dead because it was built on an entity the new model dropped.

Concretely:

1. **A product can't be fully configured as a placeable container.** The container selection on the P&P page has Waste Fraction but is missing Container Type and Pickup Settings, and it doesn't enforce a mandatory price or a fixed "Piece" unit. Until the product carries all of these, nothing downstream can resolve.

2. **Placement only works in bulk.** Adding a product to a property runs through the bulk operation only. The single-ticket path — created from inside the property details view — doesn't exist, so a one-off placement has no home.

3. **The ticket doesn't carry the right data.** It should auto-fill the property's address and a fee taken from the product's price (not a price list), both overridable, and it should let you optionally set a Route Schema and a Collection Calendar. None of this is wired.

4. **The ticket-to-container lifecycle is incomplete.** A ticket should show on the property as pending until it completes; on completion it should create the container on the container page, link it to the ticket and the property, set it active, and let you print its label. It should also be routable so a driver can complete it in the field, with driver completion flipping the container to active. These steps are missing.

5. **There is no teardown.** You can't end an agreement. Ending one should be symmetric to creating it — spawn a Remove Container ticket that, on completion, ends the agreement and removes the container from the property.

6. **The portal flag is dead.** Old P&P decided portal visibility by matching a product's container type, waste fraction, pickup setting, and property type against the property. The new P&P has no property type, so the match has nothing to key on and the enable/disable flag does nothing. This needs a redesigned matching algorithm, and the design isn't decided yet.

## Solution shape

- Container products are fully specified: Container Type, Waste Fraction, Pickup Setting — all mandatory — plus a mandatory price, with the unit fixed to "Piece."
- One Add Container flow, two entry points (the bulk operation and a single ticket from the property details view), with identical behavior.
- The ticket auto-fills the address (from the property) and the fee (from the product price, not a price list); both are overridable. Route Schema and Collection Calendar are optional.
- A ticket shows as pending until it completes. Completion — by office or by driver on a route — creates the container, links it to the ticket and the property, sets it active, and supports label printing.
- Ending an agreement spawns a Remove Container ticket; completing that ticket ends the agreement and removes the container from the property.
- A new product-to-property matching algorithm replaces property-type matching and makes the portal enable/disable flag work.

## Decisions locked

- A container product carries four defining attributes: Container Type, Waste Fraction, and Pickup Setting (all mandatory), plus a mandatory price. The pricing unit is fixed to "Piece" and is not user-selectable.
- The Add Container flow works from both the bulk operation and the single-ticket path in the property details view. Behavior is identical across both.
- On the ticket, the property address and the fee are auto-populated and both are overridable.
- The fee originates from the product's own price, not from a price list or engine resolution. (This sharpens the integration doc's T7, which spoke of resolving the price through the determination engine.)
- Route Schema and Collection Calendar are optional on the ticket.
- A ticket that isn't complete shows on the property as pending. Completion creates the container, links it to the ticket and the property, and sets it active — the same moment the agreement activates, consistent with the integration doc. (Read as: completion is the activation step, with no separate manual "activate" action. Flag if a manual confirmation is intended.)
- The created container supports label printing.
- Ending an agreement is symmetric to creating one: it spawns a Remove Container ticket, and completing that ticket ends the agreement and removes the container.

## Open / needs investigation

- **Portal product matching.** The replacement for property-type matching is undecided and has to be investigated before T15 can be built. Starting point: the dimensions the internal catalog picker already filters on — zone, customer type, service responsibility, R/D — are the candidate replacements. The investigation also has to determine whether a property-type-like attribute needs to be reintroduced, or whether matching on the operational triple (container type + waste fraction + pickup setting) against what the property supports is enough.

## Out of scope (next project)

- **Billing.** As with the integration work, the deliverable here is correct, active, billing-ready agreements and a clean teardown. No billing run, invoice, or financial reconciliation is triggered by ending an agreement or removing a container in this scope.

---

## Tasks

### Layer 1: Product configuration (P&P page)

- [ ] **T1. Add Container Type to the container product.** Add a Container Type dropdown to the container selection on the P&P page, alongside the existing Waste Fraction. Mandatory.
- [ ] **T2. Add Pickup Settings to the container product.** Add a Pickup Settings dropdown to the same selection. Mandatory.
- [ ] **T3. Make price mandatory and fix the unit to "Piece."** Price becomes a required field on the container product, and the pricing unit is locked to "Piece" — not user-selectable.

### Layer 2: Add Container ticket — entry points and field population

- [ ] **T4. Add the single-ticket Add Container path.** Today placement only works through the bulk operation. Add the single-ticket path, created from inside the property details view, with behavior identical to the bulk path.
- [ ] **T5. Auto-populate the property address.** The ticket takes the property's address automatically. Overridable.
- [ ] **T6. Auto-populate the fee from the product price.** The fee defaults to the product's own price, not a price-list or engine resolution. Overridable.
- [ ] **T7. Add optional Route Schema and Collection Calendar.** Both selectable on the ticket, both optional.

### Layer 3: Ticket-to-container lifecycle

- [ ] **T8. Show the ticket as pending, activate on completion.** Before completion the ticket shows on the property as pending. On completion the container becomes active on the property.
- [ ] **T9. Create and link the container on completion.** On completion, create the container on the container page and link it automatically to the ticket and the property.
- [ ] **T10. Print the container label.** Allow printing the label for the created container.
- [ ] **T11. Route the ticket and complete in the field.** Allow the Add Container ticket to be assigned to a route and completed by the driver. Driver completion sets the container status to active, the same as office completion.

### Layer 4: Ending an agreement

- [ ] **T12. Add "End agreement," which creates a Remove Container ticket.** Ending an agreement spawns a Remove Container ticket, mirroring how placement creates an Add Container ticket.
- [ ] **T13. End the agreement and remove the container on completion.** When the Remove Container ticket completes, end the agreement and remove the container from the property.

### Layer 5: Portal matching redesign (investigation)

- [ ] **T14. Investigate a replacement for property-type matching.** The old portal enable/disable flag matched a product's container type, waste fraction, pickup setting, and property type against the property. The new P&P has no property type. Investigate and decide the new match basis (see "Open / needs investigation").
- [ ] **T15. Implement the new matching and make the flag work.** Build the redesigned matching algorithm and wire the portal enable/disable flag to it so it actually gates product visibility.
