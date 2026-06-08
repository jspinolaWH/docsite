---
slug: cost-centre-vs-account
title: Cost Centre vs Account
category: inv-r1
order: 6
description: The difference between a cost centre and an accounting account, explained simply and with the real PJH example. Underpins PD-296.
tags:
  - invoicing
  - release-1
  - pd-296
  - accounting
  - pjh
---

# Cost Centre vs Account

Two labels that go on every euro the company earns. People mix them up constantly, so here is the difference in plain terms, then the real PJH version.

The one-line version: **same euro, two labels. The account says *what kind* of money it is. The cost centre says *who* earned it.**

---

## Explain it like I'm 10

Imagine your family runs a lemonade business with **two stands** — one outside the park, one outside the school. At the end of the day you've made a pile of money, and Mum asks two completely different questions about it.

**Question 1: "What did the money come from?"**

You sort the coins into jars:

- a jar for **lemonade sales**
- a jar for **cookie sales**
- a jar for the **tax** you have to set aside

These jars are **accounts**. They sort money by *what kind* it is. It doesn't matter which stand it came from — all the lemonade money goes in the lemonade jar.

**Question 2: "Which stand earned it?"**

Now you sort the *same* coins a different way:

- a box for the **park stand**
- a box for the **school stand**

These boxes are **cost centres**. They sort money by *who* earned it.

Here's the trick: **every coin goes in one jar AND one box.** A €2 lemonade sale at the park stand goes in the *lemonade jar* (what kind) and the *park box* (who earned it). The same coin, labelled two ways.

Why bother with both? Because Mum can now answer questions like *"how much lemonade money did the school stand make?"* — and you can only answer that if every coin knows both its jar and its box.

If you only had jars, you'd know "we made €40 on lemonade" but not which stand.
If you only had boxes, you'd know "the park made €60" but not whether it was lemonade or cookies.
Together: "the park stand made €25 on lemonade and €15 on cookies." That's the useful answer.

---

## The grown-up definitions

**Account** = *what kind* of money it is. Used for the financial ledger and statutory reporting. Transport revenue, treatment revenue, base-fee revenue, VAT. Grouping by account answers "how much treatment revenue did we earn," regardless of where.

**Cost centre** = *who* earned it. Used for management and performance reporting. The Hyvinkää household-waste team, the Riihimäki reception facility. Grouping by cost centre answers "how is the Hyvinkää operation performing," regardless of the type of revenue.

Every line of money carries both, so the business can slice the numbers either way — or both at once.

---

## The real PJH example

One ordinary event: Korhonen Maija's 240L mixed-waste bin is emptied in Hyvinkää. The customer sees a single charge of **€7.93**. Inside the system that €7.93 is split, and each slice carries both an account and a cost centre:

| Slice | Amount | Account (what kind) | Cost centre (who earned it) |
|---|---|---|---|
| Treatment | €3.49 | 30002 — Treatment revenue | 20/200/3 — Hyvinkää household |
| Transport | €2.83 | 30005 — Transport revenue | 20/200/3 — Hyvinkää household |
| VAT | €1.61 | 2939 — VAT payable | 20/200/3 — Hyvinkää household |

Read it two ways:

- **By account (down the "what kind" column):** €3.49 is treatment revenue, €2.83 is transport revenue, €1.61 is VAT. This is what goes to the financial ledger and FINVOICE.
- **By cost centre (the "who" column):** all three slices belong to the Hyvinkää household team, because that's the operation that did the work.

Same €7.93, sorted two ways at once.

### Now make it concrete with a second event

The same bin emptying, but in **Riihimäki** instead of Hyvinkää:

| Slice | Amount | Account (what kind) | Cost centre (who earned it) |
|---|---|---|---|
| Treatment | €3.49 | 30002 — Treatment revenue | 22/200/3 — **Riihimäki** household |
| Transport | €4.04 | 30005 — Transport revenue | 22/200/3 — **Riihimäki** household |
| VAT | €1.92 | 2939 — VAT payable | 22/200/3 — **Riihimäki** household |

Notice what changed and what didn't:

- **The accounts are identical** — treatment is still 30002, transport is still 30005, VAT is still 2939. The *kind* of money doesn't change between regions.
- **The cost centre changed** — 22/200/3 instead of 20/200/3, because a different team earned it.
- **The transport price changed** — Riihimäki is further out, so transport costs more. (That price difference comes from the price list, by zone.)

Now PJH can ask: *"How much transport revenue did the Riihimäki team make this month?"* — account 30005, cost centre 22/200/3 — and get an exact answer. That question is impossible to answer without both labels on every euro.

---

## Why this matters for the build (PD-296)

[PD-296](https://ioteelab.atlassian.net/browse/PD-296) is the requirement that **every euro on every event carries both labels**, and that one customer-facing line can split across several accounts. That's the table above: one €7.93 line becoming three rows, each tagged with an account and a cost centre, all flowing into FINVOICE and accounting.

A few practical notes:

- **The account is the *kind* of revenue** and is largely the same across the business (transport is always 30005). It travels with the price component.
- **The cost centre is *who* earned it** and varies by region/operation, so it is resolved by zone (and sometimes the reception point or contract).
- **VAT is its own account** (2939) but inherits the same cost centre as the revenue it sits on.
- **Nobody assigns these by hand** at event time — they are routed automatically from the product, the price component, and the zone ([PD-295](https://ioteelab.atlassian.net/browse/PD-295) does the routing; PD-296 puts the result on the event).

---

## One-line memory aid

**Account = what kind of money. Cost centre = who earned it. Every euro gets one of each.**

---

*Document prepared: 2026-06-04 · Ledger squad · WasteHero invoicing module*
*Account numbers and cost-centre codes shown are the illustrative PJH examples used throughout the R1 docs; the real chart of accounts is loaded from PJH's finance team.*
