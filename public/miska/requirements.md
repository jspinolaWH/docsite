# Requirements Compliance: GenericProductsMockup vs PJH Requirements vs product-services

After refactoring `GenericProductsMockup.html` with PJH-representative data (3 categories, 14 sellable + 3 component products, service speeds, portal/scale booleans), this document assesses how the mockup and the `product-services` microservice align with the 6 PJH requirement stories + PD-37 for the first products/pricing release.

---

## Transcript Map


| #   | Date         | Meeting                                                          | Filename                                                  | Primary Focus                                                |
| --- | ------------ | ---------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| T1  | Feb 6, 2026  | PJH ERP: Tuotteet ja hinnastot — Kyselytunti                     | `PJH ERP_ Tuotteet ja hinnastot kyselytu_ Transcript.txt` | Component math, price lists, palveluvastuu as pricing driver |
| T2  | Mar 4, 2026  | PJH ERP: Tuotteiston rakentaminen ja laaditun excelin läpikäynti | `PJH ERP_ tuotteiston rakentaminen ja la_ Transcript.txt` | Excel review, container handling, contractor pricing         |
| T3  | Mar 18, 2026 | Tuote ja hinnastot: PJH:n strategiset linjaukset                 | `Tuote ja hinnastot_ PJH_n strategiset l_ Transcript.txt` | Architecture: components vs attributes, product hierarchy    |


---

## Mockup Changelog: Mockup.html → GenericProductsMockup.html

The "after refactoring" referenced in the intro reflects a fundamental paradigm shift driven by T3 (strategic directions meeting with PJH). Key changes:

### Product Model

- **56 individual products → ~12 generic products** — waste fraction and container type became attribute arrays on the product instead of separate SKUs (T3: "1 product astian tyhjennys with size/fraction as attributes")
- **BOM / child_products added** — implements the T1 product composition concept where component prices sum to product price (2+1+1=4)
- **Sellable vs component distinction** — `product_type` field separates sellable products from cost-structure components
- **Service speeds formalized** — `allowed_service_speeds` array per product (tilaus, täsmä, päivystys, säännöllinen)

### Categories & Schema

- **Categories restructured** — same 5 types but now schema-driving: category type determines which fields are required/visible
- **Additional services expanded** — `trigger_type` (Automatic / Manual / Driver-Initiated) added per service

### Reference Data

- **Waste fractions enriched** — EWC codes, density, recycling percentage added
- **Container types enriched** — weight, emplacement type, material, features arrays added
- **Pricing units expanded** — 6 → 9 units with standardized codes
- **Emptying intervals formalized** — 7 standard intervals as structured reference data
- **Municipalities added** — with PJH-specific codes (we'll move to official codes)

### Pricing & UI

- **Price list UI** — component breakdown view, scheduled price updates, audit log
- **Bilingual support** — `name_en` added on all entities

---

## Ticket Cross-Reference Map


| PJH         | PD    | Requirement                                   | Priority   | PD Labels                                                 |
| ----------- | ----- | --------------------------------------------- | ---------- | --------------------------------------------------------- |
| PJH-73      | PD-41 | 3.2.1 Tuotteisto (Product Catalog)            | Kriittinen | `group_product_catalog`, `supported`                      |
| PJH-74      | PD-40 | 3.2.2 Reseptiikka (Bill of Materials)         | Kriittinen | `group_product_catalog`, `session2`, `c&s-checked`        |
| PJH-75      | PD-39 | 3.2.3 Tuotteiden taustatiedot (Schema)        | Kriittinen | `group_product_catalog`, `session2`, `c&s-checked`        |
| PJH-76      | PD-38 | 3.2.4 Lisäpalvelut (Additional Services)      | Merkittävä | `group_service_configurations`, `session2`, `c&s-checked` |
| PJH-96      | PD-35 | 3.2.30 Palveluvastuu (Service Resp.)          | Kriittinen | —                                                         |
| PJH-100     | PD-34 | 3.2.36 Oletuspainot (Default Weights)         | Pieni      | `group_service_configurations`, `c&s-checked`             |
| *(related)* | PD-37 | 3.2.5 Joustavat palvelutasot (Service Levels) | Merkittävä | `group_service_configurations`, `session2`, `c&s-checked` |


**Parent epic**: PJH-30 / PD-6 — Tuotteet / Products

### Session & Workshop Origins

- **Session 2** (`session2` label): PD-40, PD-39, PD-38, PD-37 were reviewed. Comments from Khaled (dev input), Christoffer (sub-items/cost centers), Silva (solution description) on 2025-09-23 and 2025-10-03.
- **C&S Checked** (`c&s-checked` label): PD-40, PD-39, PD-38, PD-37, PD-34 have been reviewed by C&S team.
- **Tuotetyöpaja** (Product Workshop): Referenced in PJH-73 and PJH-75 for resolving schema and terminology questions. Status unclear.

### Open Questions (from tickets, unresolved)

- **PJH-73**: "Hallitaanko kenttiä katalogitasolla, tuotetasolla vai molemmissa?" → **Tuotetyöpaja**
- **PJH-75**: "Onko tuoteryhmä eri asia kuin tuotekategoria?" → **Tuotetyöpaja**
- **PJH-707** (subtask of PJH-73): Amir to unify terminology (tuotekatalogi/-kategoria → tuoteryhmä)

---

## Concept Origin Tracing


| Concept                              | Source                                                                                                                                                           | Key Decisions                                                           | Tickets                          |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------- |
| **Component pricing (räjäytys)**     | **T1** — Miska: "tuotteen räjäytys" is NEW, component prices sum to product price (2+1+1=4)                                                                      | Components have own prices, combine via simple math                     | PJH-74, PD-40                    |
| **Palveluvastuu drives price**       | **T1** — Miska: same product, same fraction, different palveluvastuu → different price                                                                           | Palveluvastuu is on the **price**, not on the product                   | PJH-96, PD-35                    |
| **Multiple price lists**             | **T1** — asiakashinnasto + urakoitsijahinnasto + omakustannushinnasto; **T2** — 120+ contractor lists                                                            | Customer vs contractor lists have different attribute sets              | PJH-74, PD-40                    |
| **Attributes on price, not product** | **T1** — Miska: "tuotteella ei välttämättä ole niin sanottuja hinta-attribuutteja itsessään"                                                                     | Product attributes ≠ price attributes; palveluvastuu lives on price row | PJH-73, PJH-96                   |
| **Container types as attribute**     | **T2** — 16 mentions (140L, 240L, 600L); **T3** — 35 mentions, dominant topic                                                                                    | Container size is pricing ATTRIBUTE, not separate product               | PJH-73, PD-41                    |
| **Generic products (fewer SKUs)**    | **T3** — Strategic shift: 1 product "astian tyhjennys" with size/fraction as attributes                                                                          | Waste fraction is ATTRIBUTE not component; massive SKU reduction        | PJH-73, PD-41                    |
| **Components vs attributes**         | **T3** — Components = cost structure (keräyspalvelu, käsittely, perusmaksu); Attributes = price-determining factors (fraction, size, palveluvastuu)              | Clear separation: components for accounting, attributes for pricing     | PJH-74, PD-40                    |
| **Lisäpalvelut as products**         | **T3** — 7 mentions: "lisäpalvelut ARE products" (sellaisina myytävä)                                                                                            | Additional services can be standalone products                          | PJH-76, PD-38                    |
| **Oletuspaino + EWC/LoW/R/D**        | **T3** — line 878: listed as metadata alongside EVC-LoW-koodi, R/D-koodi                                                                                         | Part of product schema metadata                                         | PJH-100, PJH-75, PD-34, PD-39    |
| **Accounting codes (tiliöinti)**     | **T1** — laskentatunniste, kirjanpitotili discussed; Session 2 (Christoffer on PD-40): "sub items with different cost center and VAT%"                           | Each BOM component needs own accounting code                            | PJH-74, PD-40                    |
| **Contractor pricing**               | **T2** — possibly 120+ different hauler/contractor price lists **T3** — container pulling distance, consecutive containers pricing (first cost X, second N etc.) | Contractor pricing is structurally different from customer pricing      | *(future scope, different epic)* |


### Key Concept Clarification: ServiceLevel ≠ Palveluvastuu

These are **separate concepts** that must not be conflated:


|              | ServiceLevel (PD-37)                   | Palveluvastuu (PJH-96 / PD-35)                                                         |
| ------------ | -------------------------------------- | -------------------------------------------------------------------------------------- |
| **Finnish**  | Palvelutaso / palvelunopeus            | Palveluvastuu                                                                          |
| **Purpose**  | Service speed/urgency for orders       | Service responsibility affecting pricing & availability of products for given customer |
| **Values**   | Tilaus, Täsmä, Päivystys, Säännöllinen | Kuntavastuu (KV), TSV, Markkinaehtoinen (MS), etc.                                     |
| **Lives on** | Price row (as selector)                | Price row (as selector)                                                                |
| **NOT on**   | Product model                          | Product model                                                                          |
| **T1 quote** | —                                      | "palveluvastuu on hinnalla, ei tuotteella"                                             |
| **Effect**   | Determines delivery/collection speed   | Determines which prices customers get; gates product availability through pricing      |


---

## Requirement-by-Requirement Analysis

### PJH-73 / PD-41 — 3.2.1 Tuotteisto — KRIITTINEN

**Transcript refs**: T1 (categories, component concept), T3 (generic products, attribute-driven model)


| Capability                      | Mockup                  | Microservice                 | Gap                                          |
| ------------------------------- | ----------------------- | ---------------------------- | -------------------------------------------- |
| Product CRUD                    | ✅                       | ✅                            | —                                            |
| Product categories              | ✅ 3 categories          | ✅ Category + `schema_config` | —                                            |
| Category-specific schema        | ⚠️ Hardcoded per name   | ✅ Dynamic JSONB              | Mockup less flexible                         |
| Waste fractions 1:N per product | ✅ array                 | ⚠️ Single FK                 | **MS GAP** (T3: fractions are attributes)    |
| Container types 1:N per product | ✅ array                 | ⚠️ Single CharField          | **MS GAP** (T3: container size is attribute) |
| Emptying intervals              | ✅ array                 | ✅ JSONB                      | Aligned                                      |
| Portal visibility               | ✅ `available_in_portal` | ✅ `portal_visibility`        | —                                            |
| Sellable/component distinction  | ✅ `product_type`        | ❌ Not modeled                | **MS GAP**                                   |
| Filtering/search                | ✅ UI only               | ❌                            | Deferred                                     |
| Bulk edit                       | ❌                       | ❌                            | Both deferred                                |


### PJH-74 / PD-40 — 3.2.2 Reseptiikka — KRIITTINEN

**Transcript refs**: T1 (component math 2+1+1=4, "räjäytys" concept), T3 (components = cost structure, not waste fractions)
**Session 2 comments**: Khaled (multipricing needed), Christoffer (sub-items with cost center + VAT%), Silva (solution description)


| Capability                      | Mockup                                        | Microservice                           | Gap                                           |
| ------------------------------- | --------------------------------------------- | -------------------------------------- | --------------------------------------------- |
| Child products / BOM            | ✅ `child_products` linked to product entities | ✅ `ProductComponent` (standalone rows) | MS components not linked to product entities  |
| Component → fraction mapping    | ✅ `applicable_fractions`                      | ❌                                      | **MS GAP**                                    |
| Account codes per component     | ✅ `account` field                             | ❌                                      | **MS GAP** (confirmed: T1 + Christoffer)      |
| Multiple price lists            | ✅ Full (Tampere, Parkano)                     | ❌ **No PriceList entity**              | **MAJOR MS GAP** (T1: 3 list types discussed) |
| Component pricing in price rows | ✅ Expandable breakdown                        | ❌                                      | —                                             |
| Different VAT% per component    | ❌                                             | ❌                                      | Both missing (Christoffer Session 2)          |


### PJH-75 / PD-39 — 3.2.3 Tuotteiden taustatiedot — KRIITTINEN

**Transcript refs**: T3 (oletuspaino, EVC-LoW, R/D listed at line 878 as metadata)


| Field                        | Mockup                        | Microservice               | Status                        |
| ---------------------------- | ----------------------------- | -------------------------- | ----------------------------- |
| Product/Service type         | ⚠️ sellable/component         | ✅ 5 category types         | MS richer                     |
| Default weight               | ❌                             | ✅ `default_weight`         | **Mockup GAP**                |
| Direction                    | ❌                             | ✅ `direction`              | **Mockup GAP**                |
| EWC/LoW codes                | ❌                             | ✅ `ewc_low_codes`          | **Mockup GAP** (T3: metadata) |
| R/D codes                    | ❌                             | ✅ `rd_codes`               | **Mockup GAP** (T3: metadata) |
| Origin/storage location      | ❌                             | ✅ both fields              | **Mockup GAP**                |
| Load inspection              | ❌                             | ✅                          | **Mockup GAP**                |
| Hazardous waste              | ✅                             | ✅                          | —                             |
| Transfer document obligation | ❌                             | ✅                          | **Mockup GAP**                |
| Weighbridge/scale assignment | ✅ `available_in_scale_system` | ✅ `weighbridge_assignment` | Aligned                       |
| YLVA reportable              | ❌                             | ✅                          | **Mockup GAP**                |
| Product group                | ❌                             | ✅                          | **Mockup GAP**                |
| Self-service ordering        | ❌                             | ✅                          | **Mockup GAP**                |
| Show price in portal         | ❌                             | ✅                          | **Mockup GAP**                |


### PJH-76 / PD-38 — 3.2.4 Lisäpalvelut — MERKITTÄVÄ

**Transcript refs**: T3 (lisäpalvelut ARE products — 7 mentions)


| Capability               | Mockup | Microservice | Gap            |
| ------------------------ | ------ | ------------ | -------------- |
| CRUD per product         | ✅      | ✅            | —              |
| Trigger types            | ✅      | ✅            | —              |
| Requires approval        | ❌      | ✅            | **Mockup GAP** |
| Automatic rules          | ❌      | ✅ JSONB      | **Mockup GAP** |
| Driver confirmation slip | ❌      | ✅            | **Mockup GAP** |
| Active/inactive status   | ❌      | ✅            | **Mockup GAP** |


### PJH-96 / PD-35 — 3.2.30 Palveluvastuu — KRIITTINEN

**Transcript refs**: T1 (7 mentions — core pricing driver, "palveluvastuu on hinnalla ei tuotteella"), T3 (8 mentions — price modifier)

Palveluvastuu affects **pricing and availability**, not the product model itself. Product availability is gated through which prices exist for a given palveluvastuu. This is consistent with T1: attributes belong on the price, not on the product.


| Capability                            | Mockup                         | Microservice                                                                 | Gap                               |
| ------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------- | --------------------------------- |
| Reference data                        | ✅ 4 types (KVA, TSV, MKT, SDR) | ⚠️ No palveluvastuu entity (ServiceLevel is a different concept — see PD-37) | **MS GAP** — needs its own domain |
| On price rows                         | ✅ per row                      | ❌ No price rows exist                                                        | **MS GAP**                        |
| On product level                      | ❌ Correctly absent             | ❌ Correctly absent                                                           | Aligned with T1 decision          |
| Override hierarchy (account→contract) | ❌                              | ❌                                                                            | Both — cross-service concern      |


### PJH-100 / PD-34 — 3.2.36 Oletuspainot — PIENI

**Transcript refs**: T3 (1 mention at line 878 as metadata field)


| Capability         | Mockup        | Microservice            | Gap                |
| ------------------ | ------------- | ----------------------- | ------------------ |
| On product         | ❌             | ✅ `default_weight`      | **Mockup GAP**     |
| On container types | ✅ `weight_kg` | ❌ (no container entity) | **MS GAP**         |
| Customer override  | ❌             | ❌                       | Both — CRM concern |


### PD-37 — 3.2.5 Joustavat palvelutasot (Service Levels)

**Transcript refs**: No direct mention in transcripts. Concept maps to PJH sludge pricing: tilaus/täsmä/päivystys/säännöllinen.

ServiceLevel = service speed/urgency for order types. This is **not** palveluvastuu (see clarification table above).


| Capability                         | Mockup                        | Microservice            | Gap        |
| ---------------------------------- | ----------------------------- | ----------------------- | ---------- |
| Service speed/level reference data | ✅ `service_speeds` (4 values) | ✅ `ServiceLevel` entity | —          |
| Product linkage                    | ✅ `allowed_service_speeds`    | ❌ No FK or mapping      | **MS GAP** |
| On price rows                      | ✅ `service_speed` column      | ❌ No price rows         | **MS GAP** |


---

## Critical Gaps Summary

### Microservice Gaps (blocking PJH release)


| #   | Gap                                                           | Severity | Source                                        |
| --- | ------------------------------------------------------------- | -------- | --------------------------------------------- |
| 1   | **No Price Lists entity** — only `Product.price` single field | Blocker  | T1: 3 list types; mockup: full implementation |
| 2   | **Single waste fraction per product** — needs M:N             | Blocker  | T3: fractions are attributes                  |
| 3   | **Single container type per product** — needs M:N             | Blocker  | T3: container size is attribute               |
| 4   | **No sellable/component product distinction**                 | High     | T1: räjäytys concept                          |
| 5   | **No component→fraction mapping or account codes**            | High     | T1 + Christoffer Session 2                    |
| 6   | **ServiceLevel not linked to products or pricing**            | Medium   | PD-37                                         |
| 7   | **No palveluvastuu entity** (ServiceLevel is different)       | High     | T1: palveluvastuu drives pricing              |


### Mockup Gaps (alignment improvements)


| #   | Gap                                                                            | Severity | Source                      |
| --- | ------------------------------------------------------------------------------ | -------- | --------------------------- |
| 1   | **12+ regulatory/schema fields missing** (direction, EWC/LoW, R/D, YLVA, etc.) | Medium   | PJH-75 / T3 metadata fields |
| 2   | **Default weight on products**                                                 | Low      | PJH-100 / T3                |
| 3   | **Additional service detail fields** (approval, rules, confirmation)           | Low      | PJH-76                      |


### Complementary Strengths

- **Mockup** excels at: generic product model, price lists, BOM with fraction mapping, service speeds
- **Microservice** excels at: regulatory fields, dynamic schema, additional service workflows, category types

---

## Alignment Scores


| Ticket                         | Mockup  | Microservice |
| ------------------------------ | ------- | ------------ |
| PJH-73 / PD-41 (Catalog)       | **75%** | **60%**      |
| PJH-74 / PD-40 (BOM)           | **85%** | **40%**      |
| PJH-75 / PD-39 (Schema)        | **30%** | **80%**      |
| PJH-76 / PD-38 (Add. Services) | **70%** | **80%**      |
| PJH-96 / PD-35 (Service Resp.) | **50%** | **20%**      |
| PJH-100 / PD-34 (Weights)      | **20%** | **40%**      |
| PD-37 (Service Levels)         | **80%** | **30%**      |


The mockup leads on **pricing architecture** (BOM, price lists, palveluvastuu, service speeds). The microservice leads on **product schema depth** (regulatory fields, category types, additional service workflows). Neither alone covers the full PJH requirement set — convergence is needed.