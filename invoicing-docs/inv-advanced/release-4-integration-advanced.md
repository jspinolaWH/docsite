---
slug: inv-release-4-integration-advanced
title: "Invoicing 4 — Integration & Advanced Features"
category: inv-advanced
order: 1
description: "Release 4 — 9 stories covering invoice image display, PDF attachments, credit invoices, e-invoice integration, authority access, and system behaviour during billing runs"
related:
  - inv-domain-overview
  - inv-release-1-core-billing
  - inv-release-3-validation-accounting
tags:
  - invoicing
  - integration
  - credit invoices
  - pdf attachments
  - e-invoice
  - authority access
  - release-4
---

# Invoicing 4 — Integration & Advanced Features

**Release ID:** 11200
**Stories:** 9
**Theme:** Advanced integration, credit invoices, attachments, and authority access

This release connects WasteHero to the external invoicing ecosystem — invoice image retrieval, PDF attachments, credit notes, e-invoice operator integration, and authority-level visibility.

---

## Story Summary

| Jira | Ref | Title |
|------|-----|-------|
| PD-306 | 3.4.6 | Displaying invoice image |
| PD-305 | 3.4.7 | PDF attachment to invoice |
| PD-304 | 3.4.8 | PDF attachment to invoice batch |
| PD-303 | 3.4.9 | Displaying invoice attachments |
| PD-281 | 3.4.32 | Updating billing information via API |
| PD-270 | 3.4.48 | System behavior during billing run |
| PD-269 | 3.4.49 | Credit invoices |
| PD-171 | 3.7.3 | Right of authorities to view invoices |
| PD-107 | 3.11.39 | E-invoice integration |

---

## Invoice Images & Attachments

### PD-306 — Displaying Invoice Image (3.4.6)
View **archived invoice images** from the external invoicing system directly within WasteHero:
- No need to switch to external system for invoice lookup
- Requires retrieval integration with external system

### PD-305 — PDF Attachment to Invoice (3.4.7)
Attach up to **10 PDFs per invoice**:
- Transmitted in FINVOICE `AttachmentDetails` structure
- Attached at the individual invoice level

### PD-304 — PDF Attachment to Invoice Batch (3.4.8)
Attach a **single PDF to an entire invoice batch** (up to 10,000 invoices):
- FINVOICE-compliant metadata
- Unique batch identifier per attachment

### PD-303 — Displaying Invoice Attachments (3.4.9)
Retrieve and view all attachments added in WasteHero from the external invoicing system:
- Requires **attachment retrieval API** on the external system
- Displays all attachment types associated with an invoice

---

## API Integration

### PD-281 — Updating Billing Information via API (3.4.32)
WasteHero acts as the **master for billing data**:
- Changes sync to the external invoicing system automatically
- Applied to all open (unsent) invoices
- Bidirectional sync: WasteHero pushes, external system confirms

### PD-107 — E-Invoice Integration (3.11.39)
Auto-retrieval and update of e-invoice and direct debit orders via invoicing operator integration:
- Order start and termination signalling
- Multi-identifier matching (customer can have multiple e-invoice addresses)
- Auto-fetch and update; address can be locked to prevent overwrite (see Inv 3 — PD-282)

---

## System Behaviour During Billing Run

### PD-270 — System Behavior During Billing Run (3.4.48)
Ensures continued usability during active invoicing runs:
- Customer data remains **accessible and processable** during a run
- Other users are notified that a billing run is in progress
- Prevents conflicting data changes from corrupting in-flight invoices

---

## Credit Invoices

### PD-269 — Credit Invoices (3.4.49)
Full support for partial and full credit notes:
- Issue directly from a specific invoice or from a batch run
- FINVOICE-formatted output
- Internal comment field for credit reason (not visible on invoice)
- Credit note visible in customer transaction history alongside original invoice

---

## Authority Access

### PD-171 — Right of Authorities to View Invoices (3.7.3)
Authority users (e.g. waste management authorities) can:
- View customer invoices
- View invoice status

**Trigger:** Customer objections or fee inquiries that require authority review. Read-only access — no modification rights.
