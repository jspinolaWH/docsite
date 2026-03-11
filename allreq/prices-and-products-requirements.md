---
slug: prices-and-products-requirements
title: Prices & Products — Requirements Overview
category: requirements
order: 1
description: Full set of product and pricing requirements for WasteHero 2.0, sourced from the original specification
related: []
tags:
  - requirements
  - pricing
  - products
---

# Prices & Products — Requirements Overview

---

### PD-41 · 3.2.1 Product Catalog

**Requirement:** The system must have a product list that can be maintained and edited. More detailed functionalities regarding the product range are defined in separate requirements.

---

### PD-40 · 3.2.2 Product Composition ("Bill of Materials")

**Requirement:** The "recipe" of the product must be editable and it must be possible to mark the properties/traits that make up the product as parts of the product. The background of the requirement is the need to be able to modify parts of the product line without having to order the modification separately as a supplier's development work.

---

### PD-39 · 3.2.3 Product Schema Management

**Requirement:** It must be possible to define different background information for products (the product can be either a service or a product). Background information is needed e.g. for controlling the determination of the price, for differentiating different types of products from each other and for reporting. Part of the reporting is determined by legislation or the authorities, and the necessary information is therefore mandatory. It must be possible to transfer the information given to the products to third-party systems, such as various horizontal systems, through integration. Products must be able to be created manually. The product information must have the option to add the following fields if the waste company wishes:

- Products and possibly an additional explanation for the product
- Default weight
- The product can be temporarily taken out of use and put back into use
- The direction can be defined for the products (incoming, outgoing, transferred)
- EWC / LoW codes
- R/D departure point, storage location
- Load inspection information; the load must be inspected
- The characteristics of hazardous waste
- The need for a transfer document
- It is possible to control/specify the products that go into the weighing system
- The product can be assigned a default origin and the activity from which the waste originates for YLVA reporting
- Type of waste information
- Choice of whether the product is YLVA reportable
- Product group information — it must be possible to define different entities for products that involve several different products
- Determine whether the product is a product or a service

---

### PD-38 · 3.2.4 Additional Services

**Requirement:** It must be possible to add, remove and modify additional services automatically or manually. Sometimes you want to always acknowledge additional services manually with the approval of the person performing the work, but there are also situations when you want them to be included in the automatically performed service. The requirement does not take a position on the process, but on the fact that the addition, removal and modification of additional services can be defined as needed.

---

### PD-35 · 3.2.30 Product-Specific Service Responsibility

**Requirement:** Service responsibility (for example, market-based or secondary liability customer) can be determined product- and customer-specific. For this reason, the requirement applies to both customer data and product data. If both specifications exist, it must be possible to choose which specification serves as the guiding specification depending on the situation. In addition, you must be able to make customer/service-specific exceptions if necessary.

---

### PD-328 · 3.3.4 Scheduled Price Updates

**Requirement:** Price list changes must also be able to be entered into the system before the time of the price list change, which can be defined. The requirement applies to both customer and contractor price lists. A timed price change can also be temporary.

---

### PD-326 · 3.3.7 Weight- and Volume-Based Pricing and Units

**Requirement:** The price of the product must be determined based on weight or volume at least in the following ways:

- Piece-based (€/piece)
- Weight-based (€/kg)
- Cube-based (€/m³)
- Distance-based (€/m)
- Time-based (€/h)
- Liter-based (€/l)

The units must be selectable based on the need for the product (e.g. kg or ton). The units are listed in the EU e-invoicing standard.

---

### PD-322 · 3.3.11 Price Determination

**Requirement:** Many different prices for the same product, for example, depending on the type of customer, service responsibility (for corporate customers based on secondary service responsibility, on the basis of market-based service responsibility, related unit, horizontal), processing method and location, e.g. contract area or municipal boundaries.

---

### PD-37 · 3.2.5 Flexible Service Levels for Orders

**Requirement:** The system must support services for which the service time is flexible.

---

### PD-353 · 3.1.49 Waste Water Treatment

**Requirement:** Information about the property's wastewater treatment must be able to be stored in connection with the property or the customer. If the property is part of the sewer network, information about it is sufficient without any further details. If the property has a sludge tank, the following information must be recorded:

- Type of sludge tank (sedation tank, closed tank, small treatment plant)
- Volume of the tank (m³)
- Processed waste water (only black water, only grey water, black and grey water)
- Equipment of the property (e.g. washing machine, dishwasher, shower)
- Type of toilet
- Coordinate information
- Additional information in free form
- Possible emptying problems (e.g. cannot be emptied in winter)
- If a small-scale sewage treatment plant, its model
- If the tank is shared by several properties (i.e. a so-called joint well)

---

### PD-331 · 3.3.1 Bulk-Editing Prices

**Requirement:** The prices make up the price list. There can be several price lists and prices must be editable in bulk and individually. Prices must be able to be processed in the price list both gross and net. The price list master system is ERP.

---

### PD-330 · 3.3.2 Different Price Lists

**Requirement:** The system must support an unlimited number of different price lists. E.g. weight-based, volume-based, hourly-based, customer-specific, service responsibility-based.

---

### PD-329 · 3.3.3 Price List Logs

**Requirement:** Information about all changes to the price list must be kept, including e.g. the price, the author of the change and the time.

---

### PD-327 · 3.3.6 Price Determination Components

**Requirement:** The price of the product visible to the customer can consist of any number of price determination components, each of which can have its own logic. The number of price components must not be limited, but on the other hand, a product with only, for example, only the basic fee can be its own product.

---

### PD-325 · 3.3.8 Zone-Based Price Lists

**Requirement:** The price of the product must be able to depend on the region. For example, the same product may have different prices per municipality, and prices in a sparsely populated area may differ from prices in an agglomerated area.

---

### PD-324 · 3.3.9 Price Determination Based on Service Speed

**Requirement:** The price must be able to be determined based on the service speed:

- Express delivery (immediately at a certain time)
- Spot order (at the desired time)
- Based on the normal service rhythm

---

### PD-323 · 3.3.10 Price Determination Based on Timing

**Requirement:** The price of the service may depend on the time. For example:

- Weekend price
- Holiday price

---

### PD-321 · 3.3.12 Price Discounts for Customer / Product

**Requirement:** You must be able to make price changes for individual events and products (e.g. discounts) or contract-based price changes for an individual customer or product.

---

### PD-320 · 3.3.13 Price Changes

**Requirement:** It must be possible to change the price of the product/service, if necessary, by setting a new price or discount based on different criteria. Price changes must be successful both on a percentage basis and on a euro basis.

---

### PD-34 · 3.2.36 Default Weights

**Requirement:** The customer's waste containers have a general default weight for emptying. This default weight must be adjustable on a customer-specific basis so that the container-specific default value is overwritten.
