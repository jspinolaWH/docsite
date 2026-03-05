---
slug: story-point-estimates
title: Story Point Estimates
category: concepts
order: 99
description: Story point scale used to size tickets by complexity and effort
related: []
tags:
  - estimates
  - story-points
  - planning
---

# Story Point Estimates

We use the following scale to size tickets. Points reflect complexity and effort — not strict time.

---

## Scale

### 0 Points
A trivial change with no real thought required.

- **FE:** Fix a typo or update a label in the UI
- **BE:** Update a copy value in a config or env variable

---

### 1 Point
Small, well-understood task. Clear scope, no surprises.

- **FE:** Update a button style or adjust spacing on an existing component
- **BE:** Add a missing field to an existing API response

---

### 2 Points
Requires some thought but the path is clear.

- **FE:** Build a simple reusable component (e.g. a badge or tag)
- **BE:** Add a new endpoint that reads from an existing model

---

### 3 Points
Moderate complexity. Some decisions to make along the way.

- **FE:** Implement a form with validation and error states
- **BE:** Add a new service method with business logic and unit tests

---

### 5 Points
Larger task with moving parts. May touch multiple areas of the codebase.

- **FE:** Build a full page view with data fetching, loading, and empty states
- **BE:** Design and implement a new database model with migrations and endpoints

---

### 8 Points
Complex task with significant unknowns. Should be considered for splitting before starting.

- **FE:** Implement a multi-step flow (e.g. onboarding wizard or complex settings page)
- **BE:** Integrate a third-party service end-to-end (auth, webhooks, error handling)

---

> **Note:** If a ticket feels like an 8, try to break it into smaller tickets first. Tickets without an estimate cannot be picked up in a sprint.
