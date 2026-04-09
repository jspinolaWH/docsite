---
slug: invoicing-requirements-coverage
title: Invoicing Requirements Coverage
category: inv-mvp-mapping
order: 1
description: Tracks how each PD requirement across Invoicing 1–4 is covered in the MVP — where it lives, how it's implemented, and any open questions.
related: []
tags:
  - mvp
  - requirements
  - coverage
  - invoicing
---

# Invoicing Requirements Coverage
_WasteHero — PJH/Kiertokapula Invoicing Module_

This document tracks how each PD requirement across Invoicing 1–4 is covered in the MVP — where it lives, how it's implemented, and any open questions.

---

## Invoicing 1 (v11193 — due 22 May 2026)

---

### PD-177 — Billing event data for reporting

**Status:** ✅ Covered

**Where:** Operations → Billing Events → Event Detail (Details tab)

**How:** Event detail screen displays all reporting fields required by the story. Fields are auto-resolved at event creation time — no manual input needed from the user.

| Field | Covered |
|-------|---------|
| Accounting account | ✅ "3001 — Waste Collection Revenue" |
| Cost centre | ✅ Field present (shows — if not set) |
| Resolved cost centre | ✅ Dynamic composite code e.g. "PR" |
| Service responsibility / Classification | ✅ PRIVATE_LAW / PUBLIC_LAW |
| Municipality | ✅ e.g. "MUN-02" |
| Location / Receiving site | ✅ e.g. "LOC-002" |
| Product / Waste type | ✅ e.g. "Waste Collection 240L" |
| Vehicle + Driver | ✅ e.g. "DEF-789" / "anonymousUser" |
| Origin | ✅ Badge e.g. "DRIVER" |
| Project code | ✅ Field present (shows — if not set) |

---
