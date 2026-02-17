---
title: "PD Requirements to Sprint Mapping"
slug: "pd-sprint-mapping"
category: "sprint-planning"
order: 2
description: "Quick reference mapping each of the 20 PD requirements to their corresponding sprint and story."
related:
  - "sprint-breakdown"
  - "sprint1-guide"
tags:
  - "PD"
  - "mapping"
  - "requirements"
  - "sprints"
  - "reference"
---

# WasteHero 2.0 - PD Requirements to Sprint Mapping

Quick reference showing which sprint covers each of the 20 PD requirements.

---

## 📋 Sprint Mapping Table

| PD | Requirement Name | Sprint | Story | Points |
|----|------------------|--------|-------|--------|
| **PD-41** | Product Catalog | Sprint 1 | Story 1.1 | 13 |
| **PD-39** | Product Schema | Sprint 1 | Story 1.2 | 13 |
| **PD-39** | Waste Fractions (Reference) | Sprint 1 | Story 1.3 | 8 |
| **PD-40** | Bill of Materials | Sprint 2 | Story 2.1 | 13 |
| **PD-38** | Additional Services | Sprint 2 | Story 2.2 | 13 |
| **PD-37** | Service Levels | Sprint 2 | Story 2.3 | 8 |
| **PD-324** | Service Speed Pricing | Sprint 2 | Story 2.3 | (combined) |
| **PD-35** | Service Responsibility | Sprint 2 | Story 2.4 | 5 |
| **PD-34** | Default Weights | Sprint 2 | Story 2.4 | (combined) |
| **PD-330** | Different Price Lists | Sprint 3 | Story 3.1 | 21 |
| **PD-322** | Price Determination | Sprint 3 | Story 3.1 | (combined) |
| **PD-325** | Zone-Based Pricing | Sprint 3 | Story 3.2 | 13 |
| **PD-326** | Pricing Units | Sprint 3 | Story 3.3 | 5 |
| **PD-331** | Bulk Edit Prices | Sprint 4 | Story 4.1 | 13 |
| **PD-320** | Price Changes | Sprint 4 | Story 4.1 | (combined) |
| **PD-328** | Scheduled Updates | Sprint 4 | Story 4.2 | 13 |
| **PD-329** | Price Change Logs | Sprint 4 | Story 4.3 | 8 |
| **PD-323** | Time-Based Pricing | Sprint 5 | Story 5.1 | 13 |
| **PD-321** | Discounts | Sprint 5 | Story 5.2 | 8 |
| **PD-327** | Component Pricing | Sprint 5 | Story 5.3 | 8 |
| **PD-353** | Waste Water | Sprint 6 | Story 6.2 | 8 |

**Total:** 20 PD Requirements → 6 Sprints → 19 Stories → ~215 Points

---

## 🗓️ Sprint Overview

### **Sprint 1: Foundation (Week 1) - 34 points**
**PDs Covered:** PD-41, PD-39 (×2)
- Product Types & Categories
- Dynamic Schema System
- Waste Fractions Reference

### **Sprint 2: Product Details (Week 2) - 39 points**
**PDs Covered:** PD-40, PD-38, PD-37, PD-324, PD-35, PD-34
- Bill of Materials
- Additional Services (3 methods)
- Service Levels + Speed Pricing
- Responsibility & Weights

### **Sprint 3: Basic Pricing (Week 3) - 42 points**
**PDs Covered:** PD-330, PD-322, PD-325, PD-326
- Price Lists & Multi-Condition Rows
- Geographical Zones with Maps
- Pricing Units (6 types)

### **Sprint 4: Advanced Pricing (Week 4) - 42 points**
**PDs Covered:** PD-331, PD-320, PD-328, PD-329
- Bulk Price Editing
- Scheduled Price Updates
- Price Change Logging & Audit Trail

### **Sprint 5: Dynamic Pricing (Week 5) - 29 points**
**PDs Covered:** PD-323, PD-321, PD-327
- Time-Based Surcharges (Weekend/Holiday)
- Discounts
- Component-Level Pricing

### **Sprint 6: Integration & Polish (Week 6) - 29 points**
**PDs Covered:** PD-353 + Integration
- Complete Pricing Engine
- Waste Water Treatment
- Polish & Edge Cases

---

## 🔍 Find by PD Number

**Looking for PD-41?** → Sprint 1, Story 1.1
**Looking for PD-38?** → Sprint 2, Story 2.2
**Looking for PD-322?** → Sprint 3, Story 3.1
**Looking for PD-331?** → Sprint 4, Story 4.1
**Looking for PD-323?** → Sprint 5, Story 5.1

---

## 📦 Story Groupings

### **Combined in Same Story:**
- **Story 2.3:** PD-37 + PD-324 (Service Levels + Speed Pricing are tightly coupled)
- **Story 2.4:** PD-35 + PD-34 (Small stories combined for efficiency)
- **Story 3.1:** PD-330 + PD-322 (Price Lists + Price Determination are inseparable)
- **Story 4.1:** PD-331 + PD-320 (Bulk Edit + Price Changes share logic)

**Reason:** These PDs are so tightly coupled that splitting them would create artificial boundaries and integration overhead.

---

## 🎯 Critical Path

**Must Complete in Order:**
1. Sprint 1 (Foundation) ← BLOCKING everything
2. Sprint 2 (Product Details) ← BLOCKING pricing
3. Sprint 3 (Basic Pricing) ← BLOCKING advanced pricing
4. Sprint 4 & 5 can partially overlap (different features)
5. Sprint 6 (Integration)

**Parallel Opportunities:**
- Sprint 4 & Sprint 5 (Advanced Pricing vs Dynamic Pricing)
- PD-353 Waste Water (can be done anytime - standalone)

---

## 📊 Quick Stats

**By Sprint Size:**
- Largest: Sprint 3 & 4 (42 points each)
- Smallest: Sprint 5 & 6 (29 points each)
- Average: ~36 points per sprint

**By PD Complexity:**
- Most Complex: PD-330 + PD-322 (21 points - matching algorithm)
- Simplest: PD-34, PD-326 (5 points each)

**By Feature Area:**
- Product Foundation: Sprints 1-2 (73 points, 7 PDs)
- Pricing System: Sprints 3-5 (113 points, 11 PDs)
- Polish & Extras: Sprint 6 (29 points, 2 PDs)
