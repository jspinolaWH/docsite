---
slug: pjh-invoicing-r2-scope-cuts
title: Release 2 — Requirement-First Scope
category: inv-r2
order: 7
description: The R2 MVP rule, per PD the contract surface is the verbatim Requirement text plus the PJH note, we build the minimum that satisfies it, everything else in the ticket is context. Grounded in all 20 tickets, re-read 2026-06-10.
tags:
  - invoicing
  - release-2
  - scope
  - mvp
  - pjh
---

# PJH Invoicing — Release 2: Requirement-First Scope

**The rule:** for every R2 ticket, the contract surface is the verbatim `------Requirement------` text at the bottom of the ticket **plus the PJH note** where one exists. We build the minimum that satisfies that surface. Everything else in the ticket (user stories, acceptance criteria, key functionalities, examples) is context for understanding the domain, not scope.

**Why this holds up:** the Requirement sections are the original tender text (rougher English, machine-translated Finnish, they map 1:1 to the chapter IDs in the requirements spec). The body above them was written later during grooming, all by the same reporter, and that is where the rule engines, permission matrices, and audit subsystems were added. If the stated requirement is implemented, the customer has no ground to argue non-delivery. The PJH notes are included in the contract surface because they are Päivi Kaarne's own words on the tickets, and ignoring the client's literal text would lose the same argument from the other side.

**The discipline that makes it defensible:** every PD below carries a one-line interpretation. Where a requirement is ambiguous, the interpretation here is the official reading. Future scope disputes point at this document, not at a meeting memory.

All 20 tickets were re-read from Jira on 2026-06-10. Requirements are quoted verbatim, typos and all.

---

## The billing-run spine (one build, four requirements)

[PD-290](https://ioteelab.atlassian.net/browse/PD-290), [PD-291](https://ioteelab.atlassian.net/browse/PD-291), [PD-292](https://ioteelab.atlassian.net/browse/PD-292), and [PD-293](https://ioteelab.atlassian.net/browse/PD-293) are each a one-to-three-sentence requirement. One **billing-rule object** (per service type, overridable per customer/property: frequency, invoice-immediately flag, grouping, separate-invoice flag) plus **one run screen with the named filters** satisfies all four. Four requirements, one build.

### [PD-291](https://ioteelab.atlassian.net/browse/PD-291) — Billing cycles

> Invoicing events for one customer must be processed with different billing rhythms.
>
> Use case: The same customer's summer cottage and residential property must be invoiced with different rhythms if the customer so wishes.

**We build:** billing frequency assignable per service/property under one customer; the run groups events by their frequency.
**Context only:** invoice preview and confirmation tooling, external accounting synchronisation (the review point already exists via PD-273 draft state plus PJH's manual send).

### [PD-290](https://ioteelab.atlassian.net/browse/PD-290) — Billing data generation, bundling

> When creating invoice data, it is necessary to be able to choose which transactions are bundled together for the customer. For example, you want all waste container empties on the same line, but all waste pallet imports on their own separate lines. E.g. by product group - container emptying - basic fees - pallets

**We build:** a per-product-group grouping setting (bundle into one line / list individually), applied automatically at run time. Bundled events stay separate records underneath; only the invoice line is consolidated.
**Context only:** the customer-specific bundling-rules engine framing, bundling-configuration audit logging.

### [PD-292](https://ioteelab.atlassian.net/browse/PD-292) — Billing restrictions

> If necessary, it must be possible to define transactions of different styles to be invoiced separately, even if they are located at the same customer in the same location.
>
> Use case: It must be possible to bill for the emptying of the sludge pit from the summer house after it has taken place, even if mixed waste emptying is billed every six months.

**We build:** a separate-invoice flag and an invoice-immediately flag per transaction style (service type). The sludge use case is those two flags on the sludge service.
**Context only:** the ERP-configuration prose, external financial-tool integration, finance-team reporting paragraphs.

### [PD-293](https://ioteelab.atlassian.net/browse/PD-293) — Invoice batch filtering

> It must be possible to define different limit conditions for printing the invoice. The customer must be able to bill only a part of the customer's transactions. Limitation conditions for invoicing events can be used per invoicing run, for example: - municipality - limit of the total amount in €, below which smaller invoices are not invoiced - invoicing period, i.e. customer-specific invoicing rhythm (e.g. every 3 months vs desired invoicing rhythm every 1 month) - time period - Customer type (e.g. horizontal customer, regional collection customer) - events of a certain type of service (e.g. sludge events) - reception location (if you want to bill the events of a specific reception location separately for horizontal customers) - service responsibility for billing events

**We build:** the run screen with exactly the named filters: municipality, minimum € threshold (under-threshold events carry to the next run), invoicing rhythm, time period, customer type, service type, reception location, service responsibility. ("Horizontal customer" is the mistranslation of weighbridge customer.)
**Interpretation:** the requirement names its own filter list. The named list is the scope. "Other fields can also be configured as criteria" exists only in the AC and is not built.

---

## Run lifecycle and correction

### [PD-297](https://ioteelab.atlassian.net/browse/PD-297) — Billing event status information

> It must be possible to see what stage the invoices based on the events are at. For example: -Transactions transferred to billing are updated to sent status. -An invoice in the sent status can still be updated if necessary, for example if it contains error information from the invoice transfer. - The material can therefore be delivered again after it has been corrected. - When the invoice data transfer is successful, the data can be updated to ready status. The naming of the spaces can also be implemented in a different way, as long as the functionality is preserved.

**PJH note:** "PJH requests that these be partially redefined: the 'Sent' status should mean the billing file has actually been sent, at which point no further changes to the invoice content should be allowed."

**We build:** four statuses, In progress / Sent / Error / Completed, updating automatically, with PJH's semantics: Sent means the file actually left and content locks from that point.
**Interpretation:** the PJH note overrides the requirement's "sent can still be updated" line. The requirement itself permits this ("can also be implemented in a different way, as long as the functionality is preserved"): the preserved functionality is correct-and-redeliver, which happens via the Error state and a new dataset, not by editing a sent one. Worth one confirming line to Päivi, but the requirement text licenses the reading.

### [PD-273](https://ioteelab.atlassian.net/browse/PD-273) — Cancellation option for billing data

> The system must have a confirmation/cancellation option if the material has already been created, but has not yet been sent to the customer or third-party invoicing system. The function is also needed even if the invoice has been forwarded to a third-party system, but there is information that the invoice has not been forwarded to the customer.

**PJH note:** "PJH wants the billing data not to be sent automatically in the first phase, but this operating model may change after go-live. PJH wants the billing data to be sent by the billing user."

**We build:** dataset states draft → ready → sent; cancel before send reverts or deletes the dataset; sending is a manual action by the billing user (PJH note). For the second sentence: a sent dataset can be marked cancelled in WasteHero and its corrected replacement exposed through the API; the recall inside the third-party system is the customer's integration (Frends), consistent with the integration boundary.
**Interpretation:** cancelled datasets do **not** release invoice numbers for reuse. The reuse clause exists only in the AC, not in the requirement, and it contradicts Päivi's own never-reuse note on [PD-309](https://ioteelab.atlassian.net/browse/PD-309). Never-reuse wins; gaps are documented by the cancelled dataset record. The requirement-first reading dissolves this conflict without a sign-off conversation.

### [PD-318](https://ioteelab.atlassian.net/browse/PD-318) — Editing billing events

> The system must have the option not to invoice certain events or some event. You must be able to manually modify the event in bulk and individually.

**PJH note:** "Billing events must be viewable and filterable according to the ongoing billing run, for example by date, products of a specific service, municipality, or service responsibility."

**We build:** exclude events from invoicing, individually and in bulk; excluded events are flagged non-billable and can be returned to billable; bulk modification applies a change to a selection (exclude/include plus the PD-277 editable fields); the event list within a run is filterable by date, product/service, municipality, and service responsibility (PJH note).
**Context only:** contractor compensation workflows (a second money flow, its own domain, not in the requirement), sub-event component extraction (the housing-company case is covered at event level: base fees are their own events via PD-288, selected by the PD-293 service-type filter), exclusion-reason categorisation.

### [PD-277](https://ioteelab.atlassian.net/browse/PD-277) — Manual editing of events

> It is possible to edit the events manually by the waste company's office workers and correct them before the invoice sent to the customer has been created.
>
> Use case: 1.) The customer has an event with the wrong number of copies. An employee of the waste company can edit the transaction manually and add the correct information to the transaction. 2.) The employee of the waste company receives a call that the collection has not been made because the driver was in the wrong place. An employee of the waste company modifies the collection of the event into waste collection.

**We build:** edit uninvoiced events: quantity, product/event type, details. Both use cases work. Changes captured by the generic change log.
**Context only:** role-based permissions ("edit pricing but not contractor payments"), the approval workflow (an edited event goes back through PD-278 validation, that is the gate), contractor-fee editing, bespoke before/after audit records.

### [PD-271](https://ioteelab.atlassian.net/browse/PD-271) — Automatic checks on billing data

> When creating invoice data, it must be possible to use and define automatic checks that can be used to search for errors in the generated invoice data.

**We build:** a fixed set of invoice-level checks, each of which can be enabled or disabled: billing address present, e-invoice address format valid, row totals reconcile to invoice totals, FINVOICE-mandatory fields present. Failed checks block the dataset; errors are listed.
**Interpretation:** "use and define" is satisfied by configuring (enable/disable) from a provided check set. It does not mean a user-authored rule builder. Note that half the AC's example checks (missing cost centre, account, VAT) are already enforced at event level by [PD-278](https://ioteelab.atlassian.net/browse/PD-278), so they are not duplicated here.

---

## Event sources

### [PD-283](https://ioteelab.atlassian.net/browse/PD-283) — Manual creation of billing events

> Invoicing transactions must be able to be created manually by connecting to the underlying products in the system.
>
> Use case: 1) The waste company's customer pays an unusual rent to the waste company... the waste company wants to invoice these manually based on the "ground rent" of the product, so that the accounting accounts will also be correct. 2.) The waste company invoices expert work at an hourly rate... under the "expert work" of the product manually, without the hourly tracking of the work entering the ERP system.

**We build:** a form: pick a product, enter quantity and details, the event inherits accounts, cost centre, and VAT from the product exactly like every other event. The R1 plumbing makes this nearly free. Both use cases work.
**Context only:** nothing meaningful, the ticket is already lean.

### [PD-288](https://ioteelab.atlassian.net/browse/PD-288) — Seasonal fees

> The system must also be able to create invoicing material for time-bound products/services that do not have an event-specific component. The system must be able to recognize these events as its own billing events. Seasonal fees refer to payments such as: - monthly fees/update of seasonal fees - annual fees - block collection fees - rents
>
> Use case: A certain basic fee has been defined for each property (e.g. permanent apartment, leisure apartment), which is billed once a year. The amount of the basic fee may vary annually.

**We build:** a scheduled job that generates fee events from assignments (which product, which property class or contract, which month/frequency). Generated fee events are ordinary billing events from there on. Annual amount changes are price list changes, which the pricing module already handles with effective dates ([PD-328](https://ioteelab.atlassian.net/browse/PD-328), done).
**Context only:** the "flexible fee management" rules-engine framing, dynamic adjustment machinery.

---

## Money correctness

### [PD-286](https://ioteelab.atlassian.net/browse/PD-286) — Minimum fee

> The system must have a function that can be used to calculate the amount in euros, if the amount of invoicing transactions is calculated to be below the minimum payment level.
>
> Use case: Each customer is charged at least amount X for a period (usually a year), regardless of whether there are events that took place during the period that would result in an invoice with an amount of X.

**PJH note:** "If the previous owner has not met the minimum charge requirement by November, the system adjusts the final invoice accordingly. If ownership changes during the year, the minimum charge adjustment should also not apply to the old owner. Additionally, the total amount used for comparison must be VAT 0% (net invoicing)."

**We build:** per-period minimum from the tariff; comparison against the VAT 0% net total (PJH note); an adjustment line added when the period total is under; the minimum is not applied when the contract did not span the full period (mid-year start or end, either owner).
**Interpretation:** Päivi's note says the adjustment should **not** apply to the old owner on a mid-year change, which supersedes the AC's automatic November true-up scenario. So no true-up automation is built; the contract-date guard protects both parties, and any genuine year-end correction is a manual [PD-283](https://ioteelab.atlassian.net/browse/PD-283) event. This follows her note, not just our preference.

### [PD-300](https://ioteelab.atlassian.net/browse/PD-300) — Reverse charge VAT

> The system must support reverse VAT and make it possible to write invoices also in such a way that the invoices have VAT reversed.

**PJH note:** "Product master data administrator rights must be assigned to responsible persons. A basic user does not need to define prices, accounting accounts, or identification information."

**We build:** a reverse-charge flag on the product; flagged lines get 0% VAT, the statutory reference text (AVL 8 c/d §), and the buyer's VAT number on the invoice; standard and reverse-charge lines can share one invoice; the marking exports in FINVOICE. This is law and PJH's reception business runs on it.
**Interpretation:** the PJH note concerns who maintains product master data (prices, accounts, identifiers), which lives in the Products and Pricing module under its existing roles. Invoicing adds no new permission system. Squad footnote: the ticket's example still says 24% VAT; the standard rate is 25.5%.

### [PD-301](https://ioteelab.atlassian.net/browse/PD-301) — Gross or net invoicing

> The invoice must be able to be generated gross or net.

**PJH note:** "The system must show the VAT breakdown line by line on the invoice. A VAT summary breakdown must also be visible."

**We build:** a gross/net flag on the customer profile, applied automatically at generation; VAT shown line by line plus a summary block (PJH note); the setting exported with the invoice data.
**Context only:** access control on who may change the flag.

---

## Invoice presentation

### [PD-302](https://ioteelab.atlassian.net/browse/PD-302) — Custom and bulk invoice texts

> You must be able to add a limited amount of (customized) text to the invoice, customer-specific and in bulk.

**PJH note (open question):** "In which field is this free text added in WH? -> @Christian Pedersen"

**We build:** free text on a single invoice (customer-specific), and run-level text applied to every invoice in an invoicing run (the bulk case, in its cheapest form). Both export in FINVOICE.
**Interpretation:** "in bulk" is requirement text, so bulk stays; run-level text satisfies it (the AC's own mass example, a bank-account change announced to all customers, is exactly the run-level case). **Action for Christian:** answer Päivi on the ticket: the FINVOICE field is `InvoiceFreeText` at header level (repeatable) and `RowFreeText` at line level, see the embedded example in the [FINVOICE reference](./finvoice-3.0-reference.md).

### [PD-307](https://ioteelab.atlassian.net/browse/PD-307) — Invoice template selection

> You must be able to choose the invoice base, e.g. per object, per customer or per service. Invoicing template can mean both the visual appearance of the invoice with logos or an invoice form that tells you what information and columns will be included in the invoice.

**We build:** a template code passed in the FINVOICE data: a system default plus a per-customer override. Templates themselves live in the external invoicing system; WasteHero only transmits the code (the ticket's own clarification, and consistent with the customer-owned integration model).
**Interpretation:** the "e.g." makes the three levels illustrative, not cumulative. Choosing the invoice base at customer level satisfies "you must be able to choose the invoice base." Object-level and service-level template assignment are not built.

### [PD-308](https://ioteelab.atlassian.net/browse/PD-308) — Invoice data based on language selection ⚠️

> The invoice must be in Finnish, Swedish or English according to the customer's language choice.

**PJH note:** "PJH does not use customer-specific language selection. The invoice form has headings in both Finnish and Swedish."

**We build:** nothing beyond a fixed FI language code in the FINVOICE data. The bilingual form headings are the external template's concern, which WasteHero does not manage (PD-307).
**Interpretation:** this is the one PD where the requirement text goes unimplemented, and the only thing that licenses it is Päivi's note. **Get her confirmation in writing** ("confirmed, customer-specific invoice language is out of scope for PJH") before the squad treats it as closed. The only ⚠️ item in R2.

---

## Price correction

### [PD-319](https://ioteelab.atlassian.net/browse/PD-319) — Price changes for unbilled events

> The prices of non-invoiced transactions must be able to be changed retroactively by date and product, both bulk and individually.

**PJH note:** "Billing user = function-specific administrator."

**We build:** select unbilled events by date and product, individually or in bulk, and re-price them against the price list. The mechanism: correct the price list first (the pricing module owns price resolution with effective dates), then the re-price action pulls the corrected prices onto the selected events. Invoiced events are untouched by definition. The pricing snapshot before/after is the audit.
**Interpretation:** the requirement says prices must be changeable retroactively by date and product, bulk and individually. Re-pricing against the corrected price list does exactly that, sourced from the price list instead of hand-typed adjustments, which is more correct, not less. The AC's percentage/fixed adjustment math and preview tooling are not built. The PJH note only states who runs it, satisfied by the single invoicing role.

---

## Surcharges

### [PD-294](https://ioteelab.atlassian.net/browse/PD-294) — Billing surcharge

> It must be possible to create an invoice supplement depending on the invoicing method, e.g. paper invoice supplement, e-mail invoice supplement, direct payment supplement. An invoicing supplement must be created automatically for customers affected by that invoicing method. However, the billing supplement must generally be able to be switched on and off.

**PJH note:** "PJH does not currently use a paper invoice surcharge, but it must be possible in the future if so decided."

**We build:** a surcharge is a product linked to an invoicing method; when the global toggle is on, the surcharge line is added automatically for customers with that method; the toggle ships **off** for PJH.
**Interpretation:** "created automatically" and "switched on and off" are requirement text, so the minimal automatic mechanism plus a global toggle is built (this is more than the previous doc's full deletion, and that is the point: the requirement is satisfied, and PJH simply keeps it off per their note). Not built: per-customer-type surcharge amounts, the five situational exceptions, per-invoice manual removal, all AC-only.

---

## Compliance payload

### [PD-289](https://ioteelab.atlassian.net/browse/PD-289) — Accounts receivable data

> It must be possible to add the following mandatory information to the invoice lines for reporting/authority activities: - Collection information: public law or private law - Accounting account information - VAT breakdown The information must be stored in the ERP system and, if necessary, it must be possible to attach it to the material transferred to the invoicing system.

**PJH note:** "The examples are missing accounting cost object information, which must also be taken into account."

**We build:** every invoice line carries the public/private classification, accounting account, VAT breakdown, and cost centre (the PJH note's cost objects), stored in WasteHero and exported in the FINVOICE data. R1 already stamps all of this on events; PD-289 is verifying line-level completeness in the export.
**Context only:** the "define reporting settings at customer, product, or service level" configurability framing; the data is derived automatically, not configured per customer.

---

## What changed versus the previous version of this doc

The previous version deleted functionality; this version implements requirements minimally. Where they differ:

- **Smaller than before:** [PD-277](https://ioteelab.atlassian.net/browse/PD-277) (one sentence, no audit build), [PD-318](https://ioteelab.atlassian.net/browse/PD-318) (no exclusion-reason tracking), [PD-273](https://ioteelab.atlassian.net/browse/PD-273) (third-party recall reduced to an API status, and the number-reuse conflict dissolves because the clause was never requirement text), [PD-319](https://ioteelab.atlassian.net/browse/PD-319) (re-price action stands as the implementation of the requirement).
- **Bigger than before:** [PD-294](https://ioteelab.atlassian.net/browse/PD-294) (the minimal auto-surcharge plus toggle returns, because "automatically" and "switched on and off" are requirement words; it ships toggled off), [PD-302](https://ioteelab.atlassian.net/browse/PD-302) ("in bulk" is requirement text, run-level text covers it).
- **Sign-off list shrinks from six items to one:** only [PD-308](https://ioteelab.atlassian.net/browse/PD-308) needs Päivi's written word, because it is the only place requirement text goes unbuilt. Everything else is either built minimally or excluded by her own notes.

Net effect on the 7 Aug capacity gap: this scope is smaller than the previous cut list (roughly 18 to 21 engineer-weeks against the earlier 21 to 24), so it eats into the gap, but the calendar levers still apply: BE pair starts the billing-rule spine during R1 week 5, July holiday calendar from Mohammed this week, and sequencing by PJH's first production billing run.

---

## Open actions

1. **[PD-308](https://ioteelab.atlassian.net/browse/PD-308):** get Päivi's written confirmation that customer-specific invoice language is out of scope for PJH. The one ⚠️.
2. **[PD-302](https://ioteelab.atlassian.net/browse/PD-302):** reply to Päivi's @mention on the ticket: `InvoiceFreeText` (header, repeatable) and `RowFreeText` (line level).
3. **[PD-297](https://ioteelab.atlassian.net/browse/PD-297):** one confirming line to Päivi that the state model implements her note (Sent locks content, corrections go via Error and a new dataset). The requirement licenses it; the confirmation is cheap insurance.

---

*Document prepared: 2026-06-10 · Ledger squad · WasteHero invoicing module*
*Requirements quoted verbatim from Jira (original tender text), re-read 2026-06-10. The contract surface per PD is Requirement + PJH note; interpretations recorded here are the official readings. Acceptance criteria and key functionalities above the requirement line are context, not scope.*
