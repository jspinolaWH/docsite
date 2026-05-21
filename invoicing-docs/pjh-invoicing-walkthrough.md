---
slug: pjh-invoicing-walkthrough
title: Walkthrough — How Invoicing Works
category: inv-mockup
order: 2
description: A plain-language walkthrough of the R1 invoicing mockup — explains every screen using a "your family runs a garbage company" framing.
related:
  - pjh-invoicing-r1
tags:
  - invoicing
  - mockup
  - walkthrough
  - pjh
---

# PJH Invoicing — A Plain-Language Walkthrough

> A walkthrough of the R1 invoicing mockup written for anyone who doesn't know what an invoice is. Uses a "your family runs a garbage company" framing.

---

## The big question this whole thing answers

**"How do we get paid for picking up garbage?"**

That's it. The whole point of this app is to help your family's garbage company send bills to customers and get paid. A bill is just a piece of paper (or these days, an email) that says *"You owe us €58 for the garbage we picked up last month."* The fancy word for that paper is **invoice**.

But sending invoices is tricky because:

- You pick up garbage thousands of times a day
- Every pickup costs a different amount
- Different customers pay different prices
- Some customers are houses, some are businesses, and they get billed differently
- The government has rules about how this all has to work

So this app keeps track of everything and makes sure the right bills get sent to the right people for the right amount.

---

## Let's open the app together — there's a menu at the top

When you open the app, you see seven tabs at the top, like tabs in a folder. Each one shows you a different part of the system.

**Click "Events" first.** We'll start there because everything begins with events.

---

## Tab 1: Events — "What happened today?"

An **event** is just *something that happened* that we might charge someone for. Examples:

- A garbage truck emptied Grandma's bin → event
- A construction company drove a truck full of broken concrete to the dump → event
- It's January 1st and everyone owes their yearly fee → event (for every customer!)

Each row in the table is one of these "something happened" moments.

Look at the first row. It says:

- **Korhonen Maija** — that's a person's name (a customer in Finland)
- **Sekajäte 240L tyhjennys** — that's Finnish for "240-litre mixed waste bin emptying" (a bin about the size of you)
- **6.32** — €6.32, which is how much she owes for that one pickup
- **Ready** (green badge) — this means *"all the info we need is here, we can charge her for this"*

Now look at the row for **Lahtinen Pekka**. It has an amber badge saying **"Missing account"**. That means *"something's missing — we can't bill him yet."* Specifically, the system doesn't know which "bucket" in the accounting books to put the money in once he pays. So the system stops and waits for an office worker to fix it.

That's actually really important — the system **refuses to send broken bills**. It would rather pause than send something wrong.

### The sidebar on the left

There are filter buttons on the left: "All events," "Ready to invoice," "Missing mandatory data." Click them — the table filters to show only those rows. Like a sticker book where you only want to see the shiny stickers, not all of them.

### Click the "View" button on any row

It takes you to a new page that shows everything about that one event. Like opening up a single Pokémon card and seeing all its stats instead of just the picture on the front.

You'll see:

- What happened, where, when
- How the price was calculated
- Where it would land in the accounting books
- Whether anything's missing

If the event is missing something, the page shows you *exactly* what's missing in red. Like a homework checker.

---

## Tab 2: Cost centres — "Whose budget did this money belong to?"

This one is harder. Stay with me.

Imagine your garbage company has different *teams*:

- The Hyvinkää household-collection team
- The Riihimäki household-collection team
- The weighbridge team at the big processing plant
- The team that handles regulatory paperwork

When money comes in, the boss wants to know: *"Which team earned this money?"* Because at the end of the year, the boss has to figure out: "Is the Hyvinkää team making money? Is the weighbridge team losing money? Should we hire more drivers in Riihimäki?"

A **cost centre** is just a label that says *"this money belongs to that team."*

Each row in this table is one team's label. The code on the left (`20/200/3`) is just shorthand — like how your school might call a classroom "Room 12B" instead of "the classroom on the second floor with the window that doesn't close." The number is faster.

### Click "+ New cost centre"

A little window pops up asking you to fill in:

- A code (like `20/200/7`)
- A name (like "Riihimäki · New service")
- A region
- A service type

That's how office staff add a new team-label when the company starts a new kind of service. Try it. Type something silly. Click Cancel.

### Click "View" on any cost centre

You land on a page about that one team. You see:

- The team's properties (code, name, region, what kind of work they do)
- Which accounting buckets their money flows into (more on that next)
- Recent events tagged with this team
- A peek at the technical XML code that gets sent to the accounting system

---

## Tab 3: Accounting accounts — "Which bucket does this money go into?"

A regular family has like, three places they put money: a wallet, a piggy bank, and maybe a bank account. A big company has *hundreds* of places — but they're not piles of cash, they're labelled categories in the accounting books.

Examples of buckets (called **accounts**):

- `30001` — *Money from yearly fees*
- `30002` — *Money from regular household garbage pickup*
- `30005` — *Money from picking up business garbage at the weighbridge*
- `2939` — *VAT we owe the government* (VAT is a tax on stuff people buy — in Finland it's 25.5%)

Every euro that comes in goes into a labelled bucket. At the end of the year, when the boss looks at the accounting books, she can say: *"We made €4 million from household pickups and we owe €1 million in VAT to the government."*

### Hold on — what's the difference between a cost centre and an account?

Best way to think about it: **same euro, two labels.**

When Grandma pays €7.93 for her bin getting emptied, that one euro gets two labels stuck on it:

- **Cost centre = which team earned it.** "Hyvinkää household-collection team."
- **Account = what kind of money it is.** "Household garbage pickup money."

The boss can sort the money two different ways:

- *"Show me all the money the Hyvinkää team earned this year"* → sorts by cost centre
- *"Show me all the money we earned from household garbage pickup, across all teams"* → sorts by account

Two labels, same euro. Got it? Good.

### Click "+ New account" or "View" on a row

Same idea as cost centres — pop up a form to add one, or land on a detail page to see what one account looks like.

---

## Tab 4: Invoices — "Bills we sent to customers"

Okay this is where the magic happens. The system takes all the events (the "things that happened") and bundles them up into bills.

Each row is one bill. Look at the **Invoice #** column. The numbers look like `126000142`. Those aren't random — every digit means something:

- First digit = `1` (house customer) or `2` (business customer) or `3` (refund)
- Second digit = `6` (the year 2026)
- Last seven digits = a counter (this is the 142nd house-customer bill of 2026)

So `126000142` means *"the 142nd bill we sent to a house customer in 2026."* And the next one will be `126000143`, then `126000144`, and so on. Numbers don't repeat — like jersey numbers on a sports team. Once a player has #142, no one else ever wears #142.

Why does it matter? Because if Grandma calls and says "I never got bill 142," the office worker can find it instantly. Bills are how money gets tracked, and tracking matters.

### Click "View" on a row

It takes you to the **invoice detail page**, which is the most detailed page in the whole app.

---

## Tab 5: Invoice detail — "What's on this one bill?"

This page has three big sections:

**Left, top: The line items.** Three lines for Korhonen Maija — her bin emptying, her bio-waste emptying, and her yearly fee. Each line shows what she owes for that piece. They add up to €58.14 at the bottom.

**Left, bottom: The XML.** This is the scary-looking computer code. It's how the bill gets sent to the e-invoice system that delivers it to her bank. Don't worry about reading every line — just know that *this is what gets sent over the internet.*

Specifically, this is **FINVOICE 3.0** — the official electronic-invoice format Finland uses. It's like an envelope shape that all Finnish e-invoices have to fit into.

**Right side: Metadata cards.** Just facts about the bill:

- Invoice number
- Issue date and due date
- Who the buyer is
- A green checkmark saying *"yes this XML is valid, it follows all the rules"*

There's also a note saying "Transmission: Not in R1." That just means *"we built the bill, but actually sending it to the customer is a separate step we'll build later."*

---

## Tab 6: Credit notes — "Bills that say sorry, you don't owe this"

Sometimes you send a bill and it's wrong. Maybe:

- You charged the wrong price
- The customer moved out before that month
- The truck couldn't actually get to their bin

You **can't just delete** the wrong bill — that's against Finnish law. Once you send a bill, it stays in the books forever.

So instead, you send a **credit note** — a second piece of paper that says *"Hey, that bill we sent? Forget about it, you don't owe that money."* The credit note has its own number (starting with `3`) and it points back at the original bill.

Both pieces of paper stay in the customer's record forever. The customer's account shows: "Bill 226000044 = €98.40 owed, Credit note 326000007 = €98.40 owed cancelled, net = €0."

### Click "+ Issue credit note"

A form pops up asking you:

- Which bill are you cancelling?
- Cancel the whole thing, or just part of it?
- What's the explanation we show the customer? *(This is in Finnish — the customer reads this.)*
- What's the internal note? *(Office staff only, customer never sees it.)*

Notice — two text boxes. One for what the customer sees, one for what stays inside the office. That's by design. The customer doesn't need to see "the driver couldn't get to the bin because the gate was locked, ugh" — they just need to see "service was not performed."

### Click "View" on a credit note row

You see all the details for that credit note. Notice two highlighted boxes:

- **Blue box** = the credit text the customer reads
- **Amber/orange box** = the internal note nobody outside the office sees

That's a real legal distinction — Finnish accounting law cares which information is which.

---

## Tab 7: Demo flow — "How does it all fit together?"

This last tab is just a summary picture of the whole journey, in 5 steps:

1. **Real event arrives.** The garbage truck empties a bin. The system creates an event.
2. **Event is priced and classified.** The system looks up the price, the cost centre, the account, and stamps them on.
3. **Invoice is generated.** Several events get bundled into one bill with a number.
4. **FINVOICE XML is produced.** The bill gets turned into the official electronic format.
5. **Credit note is issued (if needed).** If something's wrong, an office worker creates a credit note.

Click any step — it jumps you to the relevant tab.

---

## The one sentence that ties it all together

> Garbage gets picked up → the system makes a record (event) → labels the record with which team earned the money (cost centre) and which bucket it goes in (account) → bundles the records into a bill (invoice) → if the bill was wrong, makes a "never mind" bill (credit note) → sends everything to Finland's official e-invoice system (FINVOICE).

That's the whole module in one sentence. Everything else is just details.
