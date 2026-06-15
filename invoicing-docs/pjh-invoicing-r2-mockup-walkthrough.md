---
slug: pjh-invoicing-r2-mockup-walkthrough
title: Release 2 — Requirement-to-Mockup Walkthrough
category: inv-r2
order: 8
description: Each of the 20 R2 requirements, near-quoted from Jira, mapped to exactly where its MVP appears on the R1+R2 mockup and how it connects to the rest of the view.
tags:
  - invoicing
  - release-2
  - mockup
  - mvp
  - pjh
---

# PJH Invoicing — R2 Requirement-to-Mockup Walkthrough

This maps every R2 requirement to the mockup. For each one: the requirement near-quoted from the Jira ticket, where its MVP sits on the view, and how it works together with the rest. Requirements are grouped by where they live on screen, because that grouping is the "works together" story.

The through-line: the **Billing runs tab** is the engine, **PD-297's status and lock** is the spine everything references, and the **Invoice options card** on the invoice detail is where the per-invoice rules converge before PD-310 turns the result into FINVOICE.

A reminder on scope: this is the requirement (MVP) level, the verbatim "Requirement" from each ticket, not the inflated acceptance criteria. It is displayed as a mockup, not implemented; the tickets are still open in Jira.

---

## Billing runs tab — the spine

### [PD-291](https://ioteelab.atlassian.net/browse/PD-291) — Billing cycles
**Requirement:** "Invoicing events for one customer must be processed with different billing rhythms" (the summer cottage on one rhythm, the residence on another).
**On the view:** the Cycle column in the run list (Monthly, Quarterly, Immediate).
**Works with:** the cycle is what a run gathers by, so PD-291 is the axis that PD-290, PD-292 and PD-293 all hang off.

### [PD-290](https://ioteelab.atlassian.net/browse/PD-290) — Bundling
**Requirement:** "it is necessary to be able to choose which transactions are bundled together... all waste container empties on the same line, but all waste pallet imports on their own separate lines."
**On the view:** the Bundling preview card, 12 emptyings collapse to one line while the pallet stays separate.
**Works with:** it shapes what the invoice from a run looks like, feeding the line structure that PD-310's FINVOICE then carries.

### [PD-292](https://ioteelab.atlassian.net/browse/PD-292) — Billing restrictions
**Requirement:** "it must be possible to define transactions of different styles to be invoiced separately, even if they are located at the same customer in the same location" (the sludge-pit emptying billed immediately while mixed waste runs six-monthly).
**On the view:** RUN-003, "Immediate / sludge events on completion / separate invoice."
**Works with:** it is the exception to PD-291's regular cycle, same run list, different rule.

### [PD-293](https://ioteelab.atlassian.net/browse/PD-293) — Run filtering
**Requirement:** "It must be possible to define different limit conditions for printing the invoice. The customer must be able to bill only a part of the customer's transactions", then lists municipality, € threshold, period, customer type, service type, reception location, service responsibility.
**On the view:** the Run filters card showing exactly those seven as badges.
**Works with:** it is the selector that decides which events enter a run before PD-290 bundles them.

### [PD-297](https://ioteelab.atlassian.net/browse/PD-297) — Statuses
**Requirement:** "It must be possible to see what stage the invoices based on the events are at", plus Päivi's note that Sent means the file has actually been sent and content locks.
**On the view:** the Status column and the left sidebar (Draft / Ready / Sent / Error).
**Works with:** this is the state machine the whole module references, the same lock that greys out a sent event's Edit button on the detail page.

### [PD-273](https://ioteelab.atlassian.net/browse/PD-273) — Cancel before send
**Requirement:** "The system must have a confirmation/cancellation option if the material has already been created, but has not yet been sent", plus Päivi's note that billing data is not sent automatically, the billing user sends it.
**On the view:** the Send controls card, the Draft → Ready → Sent flow with real Cancel run and Send to customer buttons.
**Works with:** clicking Send flips the run to Sent in PD-297 and locks it; Cancel returns it to Draft without reusing numbers (PD-309).

### [PD-319](https://ioteelab.atlassian.net/browse/PD-319) — Retroactive price change
**Requirement:** "The prices of non-invoiced transactions must be able to be changed retroactively by date and product, both bulk and individually."
**On the view:** the Re-price unbilled events card, old 7.50 → new 7.93 from the corrected price list, with date / product / unbilled filters.
**Works with:** it only touches unbilled events (PD-297 again), and it re-prices against the price list rather than hand-editing, so pricing stays the source of truth.

---

## Events tab and the event detail

### [PD-283](https://ioteelab.atlassian.net/browse/PD-283) — Manual events
**Requirement:** "Invoicing transactions must be able to be created manually by connecting to the underlying products in the system" (land rent, expert work).
**On the view:** the "+ New manual event" button opens a form where you pick a product.
**Works with:** the created event inherits accounts, cost centre and VAT from the product exactly like an automated one, so it flows through the same PD-296 / PD-310 plumbing.

### [PD-277](https://ioteelab.atlassian.net/browse/PD-277) — Edit before invoicing
**Requirement:** "It is possible to edit the events manually by the waste company's office workers and correct them before the invoice sent to the customer has been created" (wrong number of emptyings; driver in the wrong place).
**On the view:** open any unsent event (ev3, ev6) and the Edit event button turns the operational fields into inputs; open a sent one (ev1, ev2, ev5, ev8) and it is locked with the invoice named.
**Works with:** this is the literal expression of PD-297's lock, and a saved edit re-runs PD-278 validation.

### [PD-318](https://ioteelab.atlassian.net/browse/PD-318) — Exclude events
**Requirement:** "The system must have the option not to invoice certain events or some event. You must be able to manually modify the event in bulk and individually", plus Päivi's note that events are viewable and filterable by the ongoing run.
**On the view:** the Exclude selected action on the events list and Exclude on the detail.
**Works with:** an excluded event is held out of the next run (PD-293's gathering) and can be returned to billable.

---

## Seasonal fees tab

### [PD-288](https://ioteelab.atlassian.net/browse/PD-288) — Seasonal fees
**Requirement:** "The system must also be able to create invoicing material for time-bound products/services that do not have an event-specific component... monthly fees, annual fees, block collection fees, rents" (the annual base fee, amount may vary yearly).
**On the view:** the fee assignment table (annual base fee for permanent residences in January, holiday homes in April, shared-point monthly).
**Works with:** the scheduler generates these as ordinary events, so they then behave like any PD-299 event in a run; amount changes are price-list changes, not a fee engine.

### [PD-286](https://ioteelab.atlassian.net/browse/PD-286) — Minimum fee
**Requirement:** "a function that can be used to calculate the amount in euros, if the amount of invoicing transactions is calculated to be below the minimum payment level", plus Päivi's note that comparison uses VAT 0% net and the minimum is not applied to the old owner on a mid-year ownership change.
**On the view:** the Minimum charge card, period net vs minimum, a +21.60 top-up for Korhonen, and "contract started Sept, not applied" for Niemi.
**Works with:** the top-up is itself a billing line, and the contract-date guard is the over-billing protection.

---

## Invoice detail — the "Invoice options" card

This one pink card is where the invoice-shaping requirements sit together, because they all describe how a single invoice is produced.

### [PD-300](https://ioteelab.atlassian.net/browse/PD-300) — Reverse-charge VAT
**Requirement:** "The system must support reverse VAT and make it possible to write invoices also in such a way that the invoices have VAT reversed."
**On the view:** the Reverse charge row.
**Works with:** it reads the product's reverse-charge flag, so a B2B reception event (like ev3) produces a 0% line with the statutory reference; it is the R2 item that fixes the R1 reception-VAT gap.

### [PD-301](https://ioteelab.atlassian.net/browse/PD-301) — Gross or net
**Requirement:** "The invoice must be able to be generated gross or net", plus Päivi's note for a VAT breakdown line by line and a summary.
**On the view:** the Gross / net row ("Gross, VAT shown per line + summary").
**Works with:** it is a customer-profile setting applied at generation, reading the per-line VAT that PD-289 already carries.

### [PD-302](https://ioteelab.atlassian.net/browse/PD-302) — Custom and bulk text
**Requirement:** "You must be able to add a limited amount of (customized) text to the invoice, customer-specific and in bulk."
**On the view:** the Custom text row, naming the FINVOICE fields.
**Works with:** this is the answer to Päivi's open @mention, `InvoiceFreeText` at header level and `RowFreeText` at line level, and the bulk case is run-level text from the Billing runs tab.

### [PD-307](https://ioteelab.atlassian.net/browse/PD-307) — Template
**Requirement:** "You must be able to choose the invoice base, e.g. per object, per customer or per service."
**On the view:** the Template row ("Default, code passed to operator").
**Works with:** WasteHero only passes a template code; the template itself lives in the customer's invoicing system, consistent with the integration boundary.

### [PD-308](https://ioteelab.atlassian.net/browse/PD-308) — Language
**Requirement:** "The invoice must be in Finnish, Swedish or English according to the customer's language choice", but Päivi's note says PJH does not use customer-specific language selection.
**On the view:** the Language row ("FI; PJH: no per-customer language").
**Works with:** it is the one requirement displayed as deliberately not built for PJH, the single sign-off item, shown honestly rather than hidden.

### [PD-294](https://ioteelab.atlassian.net/browse/PD-294) — Surcharge
**Requirement:** "An invoicing supplement must be created automatically for customers affected by that invoicing method... the billing supplement must generally be able to be switched on and off."
**On the view:** the Surcharge row ("Toggle off for PJH").
**Works with:** the minimal auto-surcharge exists because "automatically" and "on and off" are requirement words, and it ships off per Päivi's note.

### [PD-289](https://ioteelab.atlassian.net/browse/PD-289) — AR / reporting data
**Requirement:** "It must be possible to add the following mandatory information to the invoice lines for reporting/authority activities: public or private law, accounting account, VAT breakdown", plus Päivi's note adding cost objects.
**On the view:** the AR / reporting data row ("public/private, account, cost centre, VAT on every line").
**Works with:** this is the compliance payload that R1 already stamps on events via PD-296, verified here as complete on the invoice and in the FINVOICE export.

### [PD-271](https://ioteelab.atlassian.net/browse/PD-271) — Automatic checks
**Requirement:** "it must be possible to use and define automatic checks that can be used to search for errors in the generated invoice data."
**On the view:** two places, the Pre-send checks row on this card, and RUN-004 sitting in Error because checks found 3 invoices missing a valid e-invoice address.
**Works with:** it is the invoice-level sibling of event-level PD-278, and a failed check holds the run in PD-297's Error state until fixed.

---

## The 20 at a glance

| PD | Requirement | Where on the view |
|---|---|---|
| [PD-291](https://ioteelab.atlassian.net/browse/PD-291) | Different billing rhythms | Billing runs — Cycle column |
| [PD-290](https://ioteelab.atlassian.net/browse/PD-290) | Bundle transactions onto lines | Billing runs — Bundling preview |
| [PD-292](https://ioteelab.atlassian.net/browse/PD-292) | Invoice some events separately | Billing runs — RUN-003 |
| [PD-293](https://ioteelab.atlassian.net/browse/PD-293) | Limit conditions for a run | Billing runs — Run filters card |
| [PD-297](https://ioteelab.atlassian.net/browse/PD-297) | See what stage invoices are at | Billing runs — Status column + sidebar |
| [PD-273](https://ioteelab.atlassian.net/browse/PD-273) | Confirm / cancel before send | Billing runs — Send controls card |
| [PD-319](https://ioteelab.atlassian.net/browse/PD-319) | Retroactive price change | Billing runs — Re-price card |
| [PD-283](https://ioteelab.atlassian.net/browse/PD-283) | Create events manually | Events — + New manual event |
| [PD-277](https://ioteelab.atlassian.net/browse/PD-277) | Edit events before invoicing | Event detail — Edit event (sent = locked) |
| [PD-318](https://ioteelab.atlassian.net/browse/PD-318) | Exclude events, bulk | Events — Exclude selected |
| [PD-288](https://ioteelab.atlassian.net/browse/PD-288) | Time-based fees | Seasonal fees — assignment table |
| [PD-286](https://ioteelab.atlassian.net/browse/PD-286) | Minimum charge | Seasonal fees — Minimum charge card |
| [PD-300](https://ioteelab.atlassian.net/browse/PD-300) | Reverse-charge VAT | Invoice detail — Invoice options |
| [PD-301](https://ioteelab.atlassian.net/browse/PD-301) | Gross or net | Invoice detail — Invoice options |
| [PD-302](https://ioteelab.atlassian.net/browse/PD-302) | Custom + bulk text | Invoice detail — Invoice options |
| [PD-307](https://ioteelab.atlassian.net/browse/PD-307) | Choose invoice template | Invoice detail — Invoice options |
| [PD-308](https://ioteelab.atlassian.net/browse/PD-308) | Invoice language | Invoice detail — Invoice options (FI; PJH n/a) |
| [PD-294](https://ioteelab.atlassian.net/browse/PD-294) | Invoice surcharge | Invoice detail — Invoice options (off) |
| [PD-289](https://ioteelab.atlassian.net/browse/PD-289) | Mandatory AR data on lines | Invoice detail — Invoice options |
| [PD-271](https://ioteelab.atlassian.net/browse/PD-271) | Automatic checks | Invoice detail + RUN-004 (Error) |

---

*Document prepared: 2026-06-15 · Ledger squad · WasteHero invoicing module*
*Requirements near-quoted from the Jira ticket "Requirement" sections (re-read 2026-06-10). The view referenced is the R1+R2 mockup. Displayed at MVP level; not yet implemented.*
