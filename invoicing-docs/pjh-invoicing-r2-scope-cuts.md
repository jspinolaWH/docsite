---
slug: pjh-invoicing-r2-scope-cuts
title: Release 2 Scope Cuts
category: inv-r2
order: 7
description: Per R2 requirement, what gets built and what gets removed from the build entirely. Cut means delete, not defer to R3. Grounded in all 20 Jira tickets, re-read 2026-06-10.
tags:
  - invoicing
  - release-2
  - scope
  - pjh
---

# PJH Invoicing — Release 2 Scope Cuts

**Cut means removed from the build, not moved to R3.** The test for every item: would PJH's invoicing operation notice if this never existed? If the answer is no, it gets deleted. R1 ships full scope; R2 is where the knife goes.

R2 = 20 PDs, due 7 Aug 2026. All 20 tickets were re-read from Jira on 2026-06-10 for this analysis.

**Two classes of cut, and the difference matters:**

- **Simplification (no sign-off needed).** The requirement text is still met, we just build the PJH-shaped version instead of the configurable product version. Most cuts are this class.
- **Requirement removal (needs PJH sign-off).** The cut deletes stated requirement text. Contractual compliance is the floor, so these go to Päivi as a short list before the squad commits. They are marked ⚠️ throughout and collected at the end.

---

## The four cross-cutting deletions

The same scope inflation appears across many tickets. Delete it once, everywhere:

**1. Configurability layers → fixed PJH logic.** "Companies can define their own rules", "any field can be configured", "customisable settings". PJH gets one known behaviour, in config or code. The flexibility itself is the scope being removed. A second customer pays for configurability when they arrive (same CR model as integrations).

**2. Role and permission systems → one invoicing-user role.** PD-277, PD-300, PD-301 each describe granular access control ("can edit pricing but not contractor payments", "only authorized personnel"). Nobody asked for a permission matrix. Everyone with module access is an invoicing user. Delete the permission layer in all three.

**3. Per-feature audit subsystems → one generic change log.** Roughly eight tickets contain an "audit and compliance" paragraph describing bespoke logging. Build one change log (who, what, when, before/after) on events, invoices, and config. Every ticket's audit paragraph is satisfied by it. Delete the per-feature audit builds.

**4. Contractor compensation → out of the invoicing module entirely.** PD-318 describes separating customer billing from contractor payment workflows, and PD-277 lists contractor fees as editable. Contractor settlement is a second money flow and its own domain. ⚠️ Remove it from R2 invoicing scope; if PJH needs contractor settlement, it is its own feature with its own requirements.

---

## Summary

| PD | Verdict | What gets deleted |
|---|---|---|
| [PD-290](https://ioteelab.atlassian.net/browse/PD-290) Bundling | Keep core | Separate bundling-rules engine (folds into one billing-rule object) |
| [PD-291](https://ioteelab.atlassian.net/browse/PD-291) Billing cycles | Keep core | Invoice preview/confirmation tooling; separate cycle-config system |
| [PD-292](https://ioteelab.atlassian.net/browse/PD-292) Billing restrictions | Keep core | Its own config system; reporting/finance-tracking paragraphs |
| [PD-293](https://ioteelab.atlassian.net/browse/PD-293) Run filtering | Keep core | "Any field configurable as criteria" |
| [PD-297](https://ioteelab.atlassian.net/browse/PD-297) Statuses | Keep whole | Nothing meaningful |
| [PD-273](https://ioteelab.atlassian.net/browse/PD-273) Cancel before send | Keep core | ⚠️ Invoice-number reuse on cancel (conflicts with PD-309); cancel-in-third-party-system |
| [PD-318](https://ioteelab.atlassian.net/browse/PD-318) Exclude events | Keep core | ⚠️ Contractor compensation; sub-event component extraction |
| [PD-277](https://ioteelab.atlassian.net/browse/PD-277) Edit events | Keep core | Role granularity; approval workflow; contractor-fee editing |
| [PD-271](https://ioteelab.atlassian.net/browse/PD-271) Invoice checks | Keep core | Configurable rule builder; checks PD-278 already does |
| [PD-283](https://ioteelab.atlassian.net/browse/PD-283) Manual events | Keep whole | Nothing meaningful |
| [PD-288](https://ioteelab.atlassian.net/browse/PD-288) Seasonal fees | Keep core | Separate fee-rule engine (schedule lives on product/contract) |
| [PD-289](https://ioteelab.atlassian.net/browse/PD-289) AR data | Keep whole | Customer/product/service-level reporting-settings config |
| [PD-286](https://ioteelab.atlassian.net/browse/PD-286) Minimum fee | Keep core | ⚠️ Automatic previous-owner true-up on ownership change |
| [PD-300](https://ioteelab.atlassian.net/browse/PD-300) Reverse charge VAT | Keep whole | Master-data permission management |
| [PD-301](https://ioteelab.atlassian.net/browse/PD-301) Gross/net | Keep whole | Access control on the gross/net flag |
| [PD-302](https://ioteelab.atlassian.net/browse/PD-302) Custom invoice text | Keep core | Select-and-apply bulk engine (run-level text covers the mass case) |
| [PD-307](https://ioteelab.atlassian.net/browse/PD-307) Template code | Keep core | Property-level and contract-level template assignment |
| [PD-319](https://ioteelab.atlassian.net/browse/PD-319) Retroactive prices | Replace | ⚠️ Entire manual adjustment tool (replaced by re-price against price list) |
| [PD-294](https://ioteelab.atlassian.net/browse/PD-294) Surcharges | Delete | ⚠️ The whole automatic surcharge engine |
| [PD-308](https://ioteelab.atlassian.net/browse/PD-308) Invoice language | Delete | ⚠️ The whole per-customer language system |

---

## The billing-run spine: build one configuration surface, not four

[PD-291](https://ioteelab.atlassian.net/browse/PD-291) (cycles), [PD-290](https://ioteelab.atlassian.net/browse/PD-290) (bundling), [PD-292](https://ioteelab.atlassian.net/browse/PD-292) (separate vs grouped invoicing), and [PD-293](https://ioteelab.atlassian.net/browse/PD-293) (run filters) each describe their own configuration system. Read together, they overlap heavily: PD-292's "billing interval: immediate vs scheduled" is PD-291's cycle; PD-293's "invoicing frequency" filter is PD-291's cycle again; PD-290's grouping and PD-292's "invoiced separately" are the same decision from two ends.

**The cut: one billing-rule object instead of four config systems.** Per service type, overridable per customer/property:

- frequency (monthly / quarterly / semi-annual / annual)
- invoice-immediately flag (the septic-tank case from PD-292)
- grouping (bundle into one line / list individually, the PD-290 choice)
- separate-invoice flag (never share an invoice with other service types)

The invoicing run then reads these rules and offers a **fixed filter set** from PD-293's own list: municipality, minimum € threshold, period, customer type, service type, reception location, service responsibility. The sentence "in addition, other fields can also be configured as criteria" is deleted; seven named filters cover every example in the four tickets.

Also deleted: [PD-291](https://ioteelab.atlassian.net/browse/PD-291)'s "invoice preview and confirmation" (PD-273's draft state plus PJH's manual-send model already gives the review point), and [PD-292](https://ioteelab.atlassian.net/browse/PD-292)'s paragraphs about external financial-tool integration and finance-team reporting, which are reporting scope smuggled into a grouping ticket.

This is the largest single reduction in R2. The four use cases (summer cottage annual + home quarterly, immediate septic invoicing, bundled emptyings + separate pallets, €10 threshold carry-over) all still work.

---

## Per-PD detail for the rest

### [PD-297](https://ioteelab.atlassian.net/browse/PD-297) — Event/invoice statuses. Keep whole.
Four statuses (In progress / Sent / Error / Completed), updating automatically. Adopt PJH's redefinition from Päivi's note: **Sent means the billing file has actually been sent, and content is locked from that point.** This is the spine PD-273 and PD-318 hang off. Small ticket, nothing worth cutting.

### [PD-273](https://ioteelab.atlassian.net/browse/PD-273) — Cancel/confirm before send. Keep core, two deletions.
Keep: draft → ready → sent dataset states, cancel before send, manual send (Päivi's note explicitly wants the billing user to trigger sending, no automatic send in phase one). This is cheap and PJH-critical.

**Delete 1 ⚠️ : invoice-number reuse on cancel.** The ticket says cancelled datasets "return and release invoice numbers for reuse." That directly conflicts with [PD-309](https://ioteelab.atlassian.net/browse/PD-309), where Päivi's own note says the same invoice number must never be reused (accounts receivable). Number recycling is also genuinely dangerous to build (concurrent runs, race conditions, AR keys). Resolution: numbers are never reused, cancelled datasets leave gaps, and the cancelled dataset record documents the gap. Needs a one-line confirmation from Päivi since it deletes ticket text, but it resolves a contradiction in their own requirements in favour of the stricter rule.

**Delete 2: cancellation inside the third-party system.** The ticket itself conditions it on "if the integration supports it", and integrations are customer-owned (PJH via Frends). Out of WasteHero scope by the same logic as transmission.

### [PD-318](https://ioteelab.atlassian.net/browse/PD-318) — Exclude events from invoicing. Keep core, two deletions.
Keep: manual exclusion, **bulk exclusion** (at 20k events/day, one-at-a-time is not viable, so this bulk earns its place), exclusion reason + timestamp via the generic change log, excluded events flagged non-billable and returnable to billable.

**Delete 1 ⚠️ : contractor compensation** (cross-cutting deletion 4).

**Delete 2: sub-event component extraction** ("extract specific components, e.g. base fees, from events and process them separately"). The housing-company example it serves (invoice base fees now, hold the rest) is already covered at event level: base fees are their own events ([PD-288](https://ioteelab.atlassian.net/browse/PD-288)), and PD-293's service-type filter selects them into a run. Splitting inside a single event also collides with the unresolved price-component-split question; do not buy that complexity here.

### [PD-277](https://ioteelab.atlassian.net/browse/PD-277) — Manual editing of events. Keep core, three deletions.
Keep: edit quantity, product/event type, and price-where-contract-allows on uninvoiced events; before/after captured by the generic change log; the two ticket scenarios (50 → 5 emptyings, wrong-address non-charge) both work.

Delete: role granularity (cross-cutting 2), contractor-fee editing (cross-cutting 4), and the **approval workflow** ("flagged so they cannot be included in a batch until reviewed and approved"). An edited event goes back through PD-278 validation, which is the gate that exists; a second human approval layer is process overhead PJH has not asked for.

### [PD-271](https://ioteelab.atlassian.net/browse/PD-271) — Automatic checks on billing data. Keep core, two deletions.
This is PD-278 at invoice level. Keep a **fixed** check set, and note half the ticket's example rules (missing cost centre, account, VAT) are already enforced at event level by PD-278, so the genuinely new invoice-level checks are small: billing address present, e-invoice address format valid, row totals reconcile to invoice totals, FINVOICE-mandatory fields present. Failed checks block the dataset, errors listed by category.

Delete: the configurable rule builder ("companies can define their own error-checking rules"), same cut as R1's PD-278, and the duplicate event-level checks.

### [PD-283](https://ioteelab.atlassian.net/browse/PD-283) — Manual creation of billing events. Keep whole.
A form: pick a product, enter quantity/details, the event inherits accounts, cost centre, and VAT from the product exactly like every other event (the R1 plumbing makes this nearly free). Land rent and expert-work examples both work. Nothing to cut; the ticket is already lean.

### [PD-288](https://ioteelab.atlassian.net/browse/PD-288) — Seasonal fees. Keep core, one deletion.
Keep: a scheduled job that generates fee events from assignments on the contract/property class (which product, amount via price list, which month/frequency). The ticket's example (€150 permanent residences in January, €75 holiday homes in April, €10/month shared-point participants) is three assignment rows plus the job.

Delete: the separate "flexible fee management" rules engine framing. Annual fee amount changes are **price list changes**, which the pricing module already handles with effective dates ([PD-328](https://ioteelab.atlassian.net/browse/PD-328), done). No fee engine.

### [PD-289](https://ioteelab.atlassian.net/browse/PD-289) — Accounts receivable data. Keep whole.
This is the compliance payload: public/private classification, ledger accounts, cost objects (Päivi's note adds these explicitly), VAT breakdown on every line, exported in FINVOICE. R1 already stamps all of it on events; PD-289 in practice is verifying the invoice lines and the FINVOICE export carry the complete set. The only trim: the "define reporting settings at customer, product, or service level" configurability framing, since the data is auto-derived, not configured per customer.

### [PD-286](https://ioteelab.atlassian.net/browse/PD-286) — Minimum fee. Keep core, one deletion.
Keep: per-period minimum from the tariff, comparison against **VAT 0% net total** (Päivi's note, a real spec detail), an adjustment line when under, and the **contract-date guard** so a mid-year start/end never wrongly triggers the minimum. The guard is cheap and is the over-billing protection.

**Delete ⚠️ : the automatic previous-owner true-up** on ownership change (the November scenario). Ownership changes mid-year are real but countable; when one happens, office staff issue the adjustment manually via PD-283. Automating proration on ownership transfer is the expensive 5% of the ticket.

### [PD-300](https://ioteelab.atlassian.net/browse/PD-300) — Reverse charge VAT. Keep whole.
This is law (AVL 8 c/d §) and PJH's reception business runs on it; R1 events already show reverse-charge cases but R1 does not implement the statutory mechanics. Keep: auto-apply when the product is flagged reverse-charge, mixed invoices (standard + reverse on one invoice), buyer VAT number required and printed, statutory reference text, FINVOICE export. Only deletion: the master-data permission note (cross-cutting 2). Footnote for the squad: the ticket's example still says 24% VAT; the standard rate is 25.5%.

### [PD-301](https://ioteelab.atlassian.net/browse/PD-301) — Gross or net invoicing. Keep whole.
A gross/net flag on the customer profile, applied automatically, VAT shown line by line plus a summary block (Päivi asks for both explicitly), the flag exported in the invoice data. Only deletion: access control on who may change the flag (cross-cutting 2).

### [PD-302](https://ioteelab.atlassian.net/browse/PD-302) — Custom and bulk invoice texts. Keep core, one deletion, one answer.
Keep: free text on a single invoice, and **run-level text** (one text applied to every invoice in an invoicing run). Delete: the select-N-invoices bulk-apply engine. The ticket's own mass example (bank account change announced to all customers) is exactly the run-level case, so the middle ground buys nothing.

**Open item assigned to you:** Päivi's note tags Christian asking which field carries the free text in WasteHero. The FINVOICE answer is `InvoiceFreeText` (header level, repeatable; the real example file in the [FINVOICE reference](./finvoice-3.0-reference.md) carries three of them) and `RowFreeText` for line-level text. Worth replying on the ticket to close it.

### [PD-307](https://ioteelab.atlassian.net/browse/PD-307) — Invoice template selection. Keep core, one deletion.
WasteHero only passes a template code in the FINVOICE data; templates live in the external system (the ticket says so). Keep: a system default code plus a per-customer override. Delete: property-level and contract-level template assignment, a four-level override hierarchy for a pass-through code is over-engineering.

### [PD-319](https://ioteelab.atlassian.net/browse/PD-319) — Retroactive price changes. Replace the mechanism. ⚠️
The use case is real and annual: January tariff change, someone misses two products, January events are recorded but unbilled at the wrong price. The ticket's solution is a manual adjustment tool: percentage/fixed changes, mass or single, impact preview, validation tooling, change logging.

**Delete all of that and replace it with one action: re-price selected unbilled events against the price list.** The pricing module already owns price resolution with effective dates ([PD-328](https://ioteelab.atlassian.net/browse/PD-328), done). The correct fix for the January scenario is: correct the price list, select the affected unbilled events by period and product, re-run pricing on them. The events get the right price from the source of truth instead of a hand-entered approximation, invoiced events are untouched by definition, and the audit is the pricing snapshot before/after via the generic change log. The percentage/fixed adjustment math and the preview tooling are scope that the pricing architecture makes unnecessary. Needs sign-off because it changes the stated mechanism, but the outcome the requirement wants is fully preserved and more correct.

### [PD-294](https://ioteelab.atlassian.net/browse/PD-294) — Billing surcharge. Delete the engine. ⚠️
Päivi's note: PJH does not currently use a paper invoice surcharge, but it must be possible in the future if so decided. The ticket describes an automatic engine: per-invoicing-method surcharges, per-customer-type amounts, global toggle, five situational exceptions.

**Delete the entire automatic engine.** The "must be possible in the future" clause is satisfied structurally without it: the ticket itself says a surcharge is a separate product, and PD-283 manual events can put any product on any invoice today. So the future path exists (create the surcharge product, add it where needed, or raise a CR for automation when PJH actually decides to charge surcharges). Building a configurable surcharge engine now, for a fee nobody charges, is the clearest deletable scope in R2.

### [PD-308](https://ioteelab.atlassian.net/browse/PD-308) — Invoice language selection. Delete the system. ⚠️
Päivi's note: PJH does not use customer-specific language selection; their invoice form already has Finnish and Swedish headings. The form layout is the external system's template, which WasteHero explicitly does not manage (PD-307).

**Delete the per-customer language machinery entirely:** language code on the customer, per-language product names, unit translations, dual-language addresses, language parameter in FINVOICE. Export a fixed FI language code if the schema wants one. If a future customer needs SV/EN selection, it returns as scoped work then.

---

## ⚠️ The sign-off list for Päivi

Six items delete or change stated requirement text, so they need PJH's yes before the squad commits. Everything else in this doc is implementation simplification and needs no sign-off.

1. **[PD-294](https://ioteelab.atlassian.net/browse/PD-294):** no automatic surcharge engine. Future surcharges via surcharge product + manual/CR.
2. **[PD-308](https://ioteelab.atlassian.net/browse/PD-308):** no per-customer invoice language. Fixed FI, bilingual headings stay in the operator's template.
3. **[PD-273](https://ioteelab.atlassian.net/browse/PD-273):** cancelled datasets do not release invoice numbers for reuse. Never-reuse wins (this resolves the contradiction with PJH's own PD-309 note); gaps are documented by the cancelled dataset.
4. **[PD-318](https://ioteelab.atlassian.net/browse/PD-318) + [PD-277](https://ioteelab.atlassian.net/browse/PD-277):** contractor compensation handling removed from invoicing scope. If needed, it is its own feature.
5. **[PD-286](https://ioteelab.atlassian.net/browse/PD-286):** no automatic minimum-fee true-up on mid-year ownership change; handled manually via a PD-283 event. The contract-date guard against over-billing stays.
6. **[PD-319](https://ioteelab.atlassian.net/browse/PD-319):** retroactive corrections work by fixing the price list and re-pricing unbilled events, not by a manual percentage/euro adjustment tool. Same outcome, sourced from the price list.

---

## The trade, named

R2 ships the PJH-shaped version: fixed validation rules, fixed run filters, one role, hardcoded behaviours where the tickets asked for configurability. That is a deliberate decision, not an accident, and it has a cost: **the next customer needs dev work where PJH got configuration.** That is consistent with the line already drawn on integrations (customer-specific work is a CR), and it is the only way 20 PDs fit in the R2 window. When customer two arrives, their CRs fund the configurability.

What R2 still delivers whole: the billing-run spine (cycles, bundling, filtering, statuses, cancel-before-send, manual send), event correction and exclusion at scale, seasonal fees, manual events, minimum fee, reverse-charge VAT, gross/net, complete AR data, invoice text, template codes. PJH can run production invoicing on it.

---

*Document prepared: 2026-06-10 · Ledger squad · WasteHero invoicing module*
*All 20 R2 tickets re-read from Jira on 2026-06-10. ⚠️ items require PJH sign-off because they remove or change stated requirement text; all other cuts are implementation simplifications within the requirements.*
