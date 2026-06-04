---
slug: finvoice-3.0-reference
title: FINVOICE 3.0 Reference
category: inv-r1
order: 5
description: WasteHero's job is correct FINVOICE 3.0 format + API; the customer owns integration and transmission. The format rules, gotchas, official links, a complete real example XML, and how it maps to PD-310.
tags:
  - invoicing
  - release-1
  - finvoice
  - pd-310
  - pjh
---

# FINVOICE 3.0 — Reference

Everything the squad needs to build the FINVOICE export ([PD-310](https://ioteelab.atlassian.net/browse/PD-310)) in one place: what the format is, the rules that cause rejection, the official sources, a complete working example, and how it carries the PJH accounting split.

This exists because the public documentation is scattered and several official example links serve blank pages in the browser. The real example file is embedded below so you don't have to chase it.

---

## Scope: what is WasteHero's job (read this first)

**WasteHero's responsibility is two things: provide the invoicing data via API, in correct FINVOICE 3.0 format. That is the entire contract.**

The customer handles the actual integration and transmission themselves:

- **PJH** runs their own integration through **Frends** (their iPaaS), and their receivables partner is **Ropo**. WasteHero does not integrate with Ropo.
- **The operator varies per customer.** PJH = Ropo, but the next customer will use a different one. WasteHero does not bake any operator into the product.
- **WasteHero is not responsible for transmission.** We expose correct FINVOICE data through the API; the customer's integration layer pulls it and delivers it to whatever operator they use.

This makes the format correctness the whole job. If WasteHero hands over a malformed FINVOICE file, that is on us. So full validation (XSD + business rules) matters more than ever, and it is fully in our control with no external dependency.

If a customer wants WasteHero to build their actual integration, that is a **change request / separately agreed and invoiceable work**, not part of the standard product.

---

## What FINVOICE 3.0 is

FINVOICE is Finland's electronic invoice format, an XML standard published by Finanssiala (Finance Finland, the Finnish finance industry body). Version 3.0 is the current one and conforms to the EU e-invoicing directive 2014/55 (so it satisfies the EU norm without a separate EN16931 step).

A FINVOICE file is normally sent through an **operator** (a forwarding/delivery service) that validates it and delivers it to the customer's accounting system. **That operator step is the customer's side, not WasteHero's** — see the scope section above. WasteHero produces the file; the customer's integration transmits it.

---

## Why the file must be valid (or it's rejected)

Whatever operator the customer uses validates each file against the official FINVOICE 3.0 XSD schema. **If the XML doesn't match, the whole file is rejected and never reaches the end customer.** There is no partial acceptance. Since WasteHero owns the format, a rejection is WasteHero's fault — so validation has to be our own gate before the data leaves the API.

Three things make a file valid:

1. **Well-formed XML** — every tag closed, correctly nested, correct character encoding.
2. **Matches the XSD** — the right elements, in the right order, with the right data types. FINVOICE is order-sensitive: elements must appear in the sequence the schema defines or it fails.
3. **Mandatory fields present** — seller, buyer, invoice number, dates, amounts, VAT breakdown.

That is why XSD validation has to be part of generating the file, not an afterthought.

---

## Official sources

| Resource | What it is | Link |
|---|---|---|
| Finanssiala FINVOICE page | The official standard hub (EN) | https://www.finanssiala.fi/en/topics/finvoice-standard/ |
| finvoice.info | Hosts the schema, DTD, XSD, XSL files | http://www.finvoice.info/ |
| Implementation Guidelines 3.0 (PDF) | The rules document (v2.6, Sept 2025) | https://file.finanssiala.fi/finvoice/Finvoice_3_0_implementation_guidelines.pdf |
| Maventa example repo | Real anonymised FINVOICE 3.0 example files (GitHub) | https://github.com/VismaSolutionsOy/InvoiceXMLExamples |
| — the 3.0 example (view) | The complete file embedded below | https://github.com/VismaSolutionsOy/InvoiceXMLExamples/blob/master/anon_finvoice_30_invoice_with_MessageTransmissionDetails.xml |
| — the 3.0 example (raw) | Raw download for the squad | https://github.com/VismaSolutionsOy/InvoiceXMLExamples/raw/refs/heads/master/anon_finvoice_30_invoice_with_MessageTransmissionDetails.xml |
| XMLdation FINVOICE validator | Free browser tool: XSD + business-rule check | https://www.xmldation.com/en/finvoice |
| XMLdation knowledgebase | FINVOICE 3.0 notes | https://knowledge.xmldation.com/finvoice-3.0 |
| Visma "Finvoice specialities" | Integration notes incl. EN16931 specifics | https://documentation.autoinvoice.visma.com/integration-guide/business-document-messages/finvoice-specialities/ |

Note: some official files (DTD, XSD, raw XML) cannot be opened in a browser — they download or show blank. Right-click → "Save Link As". That is why the example below is embedded directly.

---

## The rules that cause rejection (gotchas)

These are the things that trip up a first implementation. All confirmed against the implementation guidelines and the real Maventa example.

### 1. Character encoding is ISO-8859-15, not UTF-8

A real FINVOICE file starts:

```xml
<?xml version="1.0" encoding="ISO-8859-15"?>
```

The guideline states the ISO-8859-15 character set is used in FINVOICE messages. ISO-8859-15 is the Western-European set that includes ä, ö, å and €. If the generator outputs UTF-8 but declares ISO-8859-15 (or the reverse), Finnish characters in names and addresses corrupt or fail validation. **Decide once, be consistent: write and declare ISO-8859-15.**

### 2. `version="1.0"` and `Version="3.0"` are different things

```xml
<?xml version="1.0" encoding="ISO-8859-15"?>   <!-- XML language version, always 1.0 -->
<Finvoice Version="3.0" ...>                    <!-- FINVOICE format version, this is the 3.0 -->
```

The first line describes XML-the-language (always 1.0). The FINVOICE 3.0 version lives on the `<Finvoice>` element. They are unrelated.

### 3. Decimal separator is a comma, not a dot

The guideline: a comma is always used as the decimal character. The real file uses `900,00`, not `900.00`. A dot will fail validation.

### 4. Decimal precision rules

- Amounts: 2 to 5 decimals.
- Percentages: 1 to 3 decimals.
- Currency exchange rates: 6 decimals.
- The integer part of an amount must have at least one digit (no leading-dot values).

### 5. XML entity escaping

Special characters must use XML entities. Example: the company name "Buy & Sell Ltd." is written `Buy &amp; Sell Ltd.`

### 6. Standard VAT rate is 25.5%

Finland raised the standard VAT rate to 25.5% in September 2024. The real example below still shows `24` because it predates the change. PJH invoices at **25.5%**. (The schema also carries a `VatCode`, e.g. `S` for standard-rated, alongside the percent.)

---

## File structure

A FINVOICE 3.0 invoice, top to bottom:

- **`<Finvoice Version="3.0">`** — root
- **`<MessageTransmissionDetails>`** — who sends, who receives, operator IDs (routing)
- **`<SellerPartyDetails>`** — seller name, business ID (Y-tunnus), address
- **`<SellerInformationDetails>`** — bank account (IBAN/BIC)
- **`<BuyerPartyDetails>`** — customer name, ID, address
- **`<InvoiceDetails>`** — invoice number, dates, totals, VAT summary, payment terms
- **`<InvoiceRow>`** (one or more) — each line: article, quantity, unit price, VAT, amount
- **`<EpiDetails>`** — the payment block: bank, reference number, amount, due date

The accounting split (PD-310) lives in the rows — see below.

---

## The multi-account split (PD-310) via SubInvoiceRow

[PD-310](https://ioteelab.atlassian.net/browse/PD-310) requires that one customer-facing line can be divided across different ledger accounts in accounting. FINVOICE supports this natively with **`<SubInvoiceRow>`**: a parent `<InvoiceRow>` the customer sees, with child sub-rows underneath carrying the breakdown.

So the PJH case — one "Sekajäte 240L tyhjennys" line at €7.93 splitting into treatment + transport — maps to:

- One `<InvoiceRow>`: "Sekajäte 240L tyhjennys", the customer-facing line
- `<SubInvoiceRow>` children: treatment (account 30002), transport (account 30005), each with its own amount and VAT

The guideline confirms SubRow can be used to group rows and calculate subtotals. This is cleaner than emitting separate top-level rows.

**Open point:** where the GL account itself is carried (vs cost centre, vs the sub-row amounts) is the operator-specific bit. The base schema carries articles, amounts, and VAT cleanly; the account-dimension mapping is an agreed convention with the operator. Confirm with PJH's operator how they expect accounts and cost centres carried (commonly via row definition/free-text fields or an agreed extension).

---

## A complete, real example file

This is the genuine anonymised FINVOICE 3.0 example published by Visma/Maventa (a major Finnish e-invoicing operator) for developers. All data is placeholder ("SellerOrganisationName", "1234567-8", etc.). It includes `MessageTransmissionDetails`, both parties, an invoice with discount/charge details, a normal `InvoiceRow`, and a `SubInvoiceRow` example. Use this as the known-good reference to validate the generator's output against.

```xml
<?xml version="1.0" encoding="ISO-8859-15"?>
<?xml-stylesheet type="text/xsl" href="Finvoice.xsl"?>
<Finvoice xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Version="3.0" xsi:noNamespaceSchemaLocation="Finvoice3.0.xsd">
	<MessageTransmissionDetails>
		<MessageSenderDetails>
			<FromIdentifier SchemeID="0037">003712345678</FromIdentifier>
			<FromIntermediator>003721291126</FromIntermediator>
		</MessageSenderDetails>
		<MessageReceiverDetails>
			<ToIdentifier SchemeID="0037">003712345678</ToIdentifier>
			<ToIntermediator>003721291126</ToIntermediator>
		</MessageReceiverDetails>
		<MessageDetails>
			<MessageIdentifier>FINVINV-8650</MessageIdentifier>
			<MessageTimeStamp>2019-01-21T14:09:21+02:00</MessageTimeStamp>
			<ImplementationCode>XX</ImplementationCode>
		</MessageDetails>
	</MessageTransmissionDetails>
	<SellerPartyDetails>
		<SellerPartyIdentifier>1234567-8</SellerPartyIdentifier>
		<SellerOrganisationName>SellerOrganisationName</SellerOrganisationName>
		<SellerOrganisationName>SellerOrganisationName</SellerOrganisationName>
		<SellerOrganisationTradingName>SellerOrganisationTradingName</SellerOrganisationTradingName>
		<SellerOrganisationTaxCode>FI12345678</SellerOrganisationTaxCode>
		<SellerPostalAddressDetails>
			<SellerStreetName>SellerStreetName</SellerStreetName>
			<SellerTownName>SellerTownName</SellerTownName>
			<SellerPostCodeIdentifier>SellerPostCodeIdentifier</SellerPostCodeIdentifier>
			<SellerCountrySubdivision>SellerCountrySubdivision</SellerCountrySubdivision>
			<CountryCode>FI</CountryCode>
			<CountryName>CountryName</CountryName>
		</SellerPostalAddressDetails>
	</SellerPartyDetails>
	<SellerOrganisationUnitNumber>SellerOrganisationUnitNumber</SellerOrganisationUnitNumber>
	<SellerContactPersonName>SellerContactPersonName</SellerContactPersonName>
	<SellerCommunicationDetails>
		<SellerPhoneNumberIdentifier>SellerPhoneNumberIdentifier</SellerPhoneNumberIdentifier>
		<SellerEmailaddressIdentifier>SellerEmailaddressIdentifier</SellerEmailaddressIdentifier>
	</SellerCommunicationDetails>
	<SellerInformationDetails>
		<SellerHomeTownName>SellerHomeTownName</SellerHomeTownName>
		<SellerPhoneNumber>SellerPhoneNumber</SellerPhoneNumber>
		<SellerCommonEmailaddressIdentifier>SellerCommonEmailaddressIdentifier</SellerCommonEmailaddressIdentifier>
		<SellerWebaddressIdentifier>SellerWebaddressIdentifier</SellerWebaddressIdentifier>
		<SellerAccountDetails>
			<SellerAccountID IdentificationSchemeName="IBAN">SellerAccountID</SellerAccountID>
			<SellerBic IdentificationSchemeName="BIC">NDEAFIHH</SellerBic>
			<SellerAccountName>SellerAccountName</SellerAccountName>
		</SellerAccountDetails>
	</SellerInformationDetails>
	<InvoiceRecipientCommunicationDetails>
		<InvoiceRecipientEmailaddressIdentifier>InvoiceRecipientEmailaddressIdentifier</InvoiceRecipientEmailaddressIdentifier>
	</InvoiceRecipientCommunicationDetails>
	<BuyerPartyDetails>
		<BuyerPartyIdentifier>1234567-8</BuyerPartyIdentifier>
		<BuyerOrganisationName>BuyerOrganisationName</BuyerOrganisationName>
		<BuyerOrganisationName>BuyerOrganisationName</BuyerOrganisationName>
		<BuyerOrganisationTradingName>BuyerOrganisationTradingName</BuyerOrganisationTradingName>
		<BuyerOrganisationTaxCode>FI12345678</BuyerOrganisationTaxCode>
		<BuyerPostalAddressDetails>
			<BuyerStreetName>BuyerStreetName</BuyerStreetName>
			<BuyerTownName>BuyerTownName</BuyerTownName>
			<BuyerPostCodeIdentifier>BuyerPostCodeIdentifier</BuyerPostCodeIdentifier>
			<CountryCode>FI</CountryCode>
			<CountryName>CountryName</CountryName>
		</BuyerPostalAddressDetails>
	</BuyerPartyDetails>
	<BuyerCommunicationDetails>
		<BuyerEmailaddressIdentifier>BuyerEmailaddressIdentifier</BuyerEmailaddressIdentifier>
	</BuyerCommunicationDetails>
	<InvoiceDetails>
		<InvoiceTypeCode CodeListAgencyIdentifier="SPY">INV01</InvoiceTypeCode>
		<InvoiceTypeCodeUN>380</InvoiceTypeCodeUN>
		<InvoiceTypeText>LASKU</InvoiceTypeText>
		<OriginCode>Original</OriginCode>
		<InvoiceNumber>9190100001</InvoiceNumber>
		<InvoiceDate Format="CCYYMMDD">20190121</InvoiceDate>
		<OrderIdentifier>OrderIdentifier</OrderIdentifier>
		<RowsTotalVatExcludedAmount AmountCurrencyIdentifier="EUR">900,00</RowsTotalVatExcludedAmount>
		<InvoiceTotalVatExcludedAmount AmountCurrencyIdentifier="EUR">900,00</InvoiceTotalVatExcludedAmount>
		<InvoiceTotalVatAmount AmountCurrencyIdentifier="EUR">216,00</InvoiceTotalVatAmount>
		<InvoiceTotalVatIncludedAmount AmountCurrencyIdentifier="EUR">1116,00</InvoiceTotalVatIncludedAmount>
		<InvoicePaidAmount AmountCurrencyIdentifier="EUR">10,00</InvoicePaidAmount>
		<VatSpecificationDetails>
			<VatBaseAmount AmountCurrencyIdentifier="EUR">900,00</VatBaseAmount>
			<VatRatePercent>24</VatRatePercent>
			<VatCode>S</VatCode>
			<VatRateAmount AmountCurrencyIdentifier="EUR">216,00</VatRateAmount>
			<VatFreeText>VatFreeText</VatFreeText>
			<VatFreeText>VatFreeText</VatFreeText>
		</VatSpecificationDetails>
		<InvoiceFreeText>InvoiceFreeText</InvoiceFreeText>
		<InvoiceFreeText>InvoiceFreeText</InvoiceFreeText>
		<InvoiceFreeText>InvoiceFreeText</InvoiceFreeText>
		<PaymentTermsDetails>
			<PaymentTermsFreeText>PaymentTermsFreeText</PaymentTermsFreeText>
			<FreeText>
				<Value>Value</Value>
			</FreeText>
			<InvoiceDueDate Format="CCYYMMDD">20190128</InvoiceDueDate>
		</PaymentTermsDetails>
		<DiscountDetails>
			<FreeText>FreeText</FreeText>
			<ReasonCode>65</ReasonCode>
			<Amount AmountCurrencyIdentifier="NOK">100,00</Amount>
			<VatCategoryCode>S</VatCategoryCode>
			<VatRatePercent>24,0</VatRatePercent>
		</DiscountDetails>
		<ChargeDetails>
			<ReasonText>ReasonText</ReasonText>
			<ReasonCode>FC</ReasonCode>
			<Percent>50,00</Percent>
			<Amount AmountCurrencyIdentifier="NOK">100,00</Amount>
			<BaseAmount AmountCurrencyIdentifier="NOK">200,00</BaseAmount>
			<VatCategoryCode>S</VatCategoryCode>
			<VatRatePercent>24,0</VatRatePercent>
		</ChargeDetails>
		<TenderReference>TenderReference</TenderReference>
	</InvoiceDetails>
	<VirtualBankBarcode>448195030000000100011160000000000000091901000011190128</VirtualBankBarcode>
	<InvoiceRow>
		<RowPositionIdentifier>1</RowPositionIdentifier>
		<RowFreeText>RowFreeText</RowFreeText>
		<RowFreeText>RowFreeText</RowFreeText>
		<RowFreeText>RowFreeText</RowFreeText>
		<RowFreeText>RowFreeText</RowFreeText>
		<RowFreeText>RowFreeText</RowFreeText>
		<RowFreeText>RowFreeText</RowFreeText>
		<RowFreeText>RowFreeText</RowFreeText>
		<RowFreeText>RowFreeText</RowFreeText>
	</InvoiceRow>
	<InvoiceRow>
		<RowPositionIdentifier>1</RowPositionIdentifier>
		<RowFreeText>RowFreeText</RowFreeText>
	</InvoiceRow>
	<InvoiceRow>
		<ArticleIdentifier>ArticleIdentifier</ArticleIdentifier>
		<ArticleGroupIdentifier SchemeID="STI">ArticleGroupIdentifier</ArticleGroupIdentifier>
		<ArticleGroupIdentifier SchemeID="AA">ArticleGroupIdentifier</ArticleGroupIdentifier>
		<ArticleName>ArticleName</ArticleName>
		<ArticleDescription>ArticleDescription</ArticleDescription>
		<EanCode>EanCode</EanCode>
		<DeliveredQuantity QuantityUnitCode="KG" QuantityUnitCodeUN="XKG">1</DeliveredQuantity>
		<InvoicedQuantity QuantityUnitCode="KG" QuantityUnitCodeUN="XKG">1</InvoicedQuantity>
		<StartDate Format="CCYYMMDD">20190101</StartDate>
		<EndDate Format="CCYYMMDD">20190131</EndDate>
		<UnitPriceAmount AmountCurrencyIdentifier="EUR" QuantityUnitCodeUN="XKG">500,00</UnitPriceAmount>
		<UnitPriceNetAmount AmountCurrencyIdentifier="EUR" QuantityUnitCodeUN="XKG">1000,00</UnitPriceNetAmount>
		<UnitPriceBaseQuantity QuantityUnitCode="KG" QuantityUnitCodeUN="XKG">1</UnitPriceBaseQuantity>
		<RowPositionIdentifier>2</RowPositionIdentifier>
		<RowFreeText>RowFreeText</RowFreeText>
		<RowDiscountPercent>50,000</RowDiscountPercent>
		<RowChargeDetails>
			<ReasonText>ReasonText</ReasonText>
			<Percent>100,00</Percent>
			<Amount AmountCurrencyIdentifier="NOK">500,00</Amount>
			<BaseAmount AmountCurrencyIdentifier="EUR">250,00</BaseAmount>
		</RowChargeDetails>
		<RowChargeDetails>
			<ReasonText>ReasonText</ReasonText>
			<Amount AmountCurrencyIdentifier="NOK">150,00</Amount>
		</RowChargeDetails>
		<RowVatRatePercent>24</RowVatRatePercent>
		<RowVatCode>S</RowVatCode>
		<RowVatAmount AmountCurrencyIdentifier="EUR">216,00</RowVatAmount>
		<RowVatExcludedAmount AmountCurrencyIdentifier="EUR">900,00</RowVatExcludedAmount>
		<RowAmount AmountCurrencyIdentifier="EUR">1116,00</RowAmount>
	</InvoiceRow>
	<InvoiceRow>
		<SubInvoiceRow>
			<SubArticleIdentifier>SubArticleIdentifier</SubArticleIdentifier>
			<SubArticleName>SubArticleName</SubArticleName>
			<SubArticleDescription>SubArticleDescription</SubArticleDescription>
			<SubEanCode>SubEanCode</SubEanCode>
			<SubDeliveredQuantity QuantityUnitCode="KG" QuantityUnitCodeUN="XKG">1</SubDeliveredQuantity>
			<SubInvoicedQuantity QuantityUnitCode="KG" QuantityUnitCodeUN="XKG">1</SubInvoicedQuantity>
			<SubUnitPriceAmount AmountCurrencyIdentifier="EUR">1000,00</SubUnitPriceAmount>
			<SubUnitPriceNetAmount AmountCurrencyIdentifier="EUR">1000,00</SubUnitPriceNetAmount>
			<SubRowFreeText>SubRowFreeText</SubRowFreeText>
			<SubRowDiscountPercent>10,000</SubRowDiscountPercent>
			<SubRowVatRatePercent>24</SubRowVatRatePercent>
			<SubRowVatCode>S</SubRowVatCode>
			<SubRowVatAmount AmountCurrencyIdentifier="EUR">216,00</SubRowVatAmount>
			<SubRowVatExcludedAmount AmountCurrencyIdentifier="EUR">900,00</SubRowVatExcludedAmount>
			<SubRowAmount AmountCurrencyIdentifier="EUR">1116,00</SubRowAmount>
		</SubInvoiceRow>
	</InvoiceRow>
	<EpiDetails>
		<EpiIdentificationDetails>
			<EpiDate Format="CCYYMMDD">20190121</EpiDate>
			<EpiReference/>
		</EpiIdentificationDetails>
		<EpiPartyDetails>
			<EpiBfiPartyDetails>
				<EpiBfiIdentifier IdentificationSchemeName="BIC">NDEAFIHH</EpiBfiIdentifier>
				<EpiBfiName>Nordea</EpiBfiName>
			</EpiBfiPartyDetails>
			<EpiBeneficiaryPartyDetails>
				<EpiNameAddressDetails>EpiNameAddressDetails</EpiNameAddressDetails>
				<EpiBei>123456789</EpiBei>
				<EpiAccountID IdentificationSchemeName="IBAN">EpiAccountID</EpiAccountID>
			</EpiBeneficiaryPartyDetails>
		</EpiPartyDetails>
		<EpiPaymentInstructionDetails>
			<EpiRemittanceInfoIdentifier IdentificationSchemeName="SPY">91901000011</EpiRemittanceInfoIdentifier>
			<EpiInstructedAmount AmountCurrencyIdentifier="EUR">1106,00</EpiInstructedAmount>
			<EpiCharge ChargeOption="SHA">SHA</EpiCharge>
			<EpiDateOptionDate Format="CCYYMMDD">20190128</EpiDateOptionDate>
			<EpiPaymentMeansCode>58</EpiPaymentMeansCode>
		</EpiPaymentInstructionDetails>
	</EpiDetails>
</Finvoice>
```

Source: `VismaSolutionsOy/InvoiceXMLExamples` on GitHub (anonymised, freely available as a developer reference).

---

## How to validate

WasteHero owns the format, so validation is entirely on our side and has no external dependency. One job: make sure the file we produce is valid before it leaves the API.

1. **XSD schema validation** against the official `Finvoice3.0.xsd` from finvoice.info. Wire it into the build as a step: every generated file must pass before the API returns it.
2. **Business-rule checks** we write ourselves: amounts reconcile (rows sum to totals, VAT base + VAT = gross), Finnish reference number (viitenumero) checksum is valid, VAT rate is 25.5% where expected, reverse-charge lines marked 0% with the statutory reason.
3. **Match a known-good file** — validate the generator's output against the embedded example above and any sample a customer provides.

**Free tool:** XMLdation's FINVOICE validator (https://www.xmldation.com/en/finvoice) does both structure (XSD) and business-rule checks in the browser, supports FINVOICE 3.0, and can test against Finanssiala's definition or bank-specific rules. Use it during development before building all the checks in-house.

There is no "operator gateway" layer for WasteHero to worry about — that validation happens on the customer's side once they transmit. Our bar is: valid FINVOICE 3.0, matching the schema and the business rules above.

---

## Integration is the customer's side, not WasteHero's

How the file gets from WasteHero to the end customer's accounting system is **owned by the customer**, and it varies per customer:

- **PJH** runs the integration through **Frends** (their iPaaS) and uses **Ropo** for receivables. WasteHero exposes the data via API; PJH's Frends flows pull it and deliver it onward.
- **Other customers will use different operators.** Nothing operator-specific gets hardcoded into the product. The API returns standard FINVOICE 3.0; the customer adapts from there.
- **Transmission ([PD-107](https://ioteelab.atlassian.net/browse/PD-107)) is not WasteHero's build** in the standard product. We provide correct data through the API; the customer transmits.
- If a customer wants WasteHero to build their integration, it is a **CR / separately agreed, invoiceable work**.

For context only (not a dependency): Ropo is Finland's market leader in invoice-lifecycle and receivables management, and as of April 2026 it offers a joint invoice-delivery-plus-receivables solution via Maventa's API. Which path PJH wires through Frends is their decision; WasteHero doesn't need to know it to ship the format.

---

## What R1 needs vs later

**R1 — WasteHero's whole job:**
- A working **API** that exposes the invoicing data (the contract to agree with the customer's integration team — format, push vs pull, batching, auth)
- Generate **FINVOICE 3.0 XML** (INV01 invoices; credit notes use a different type code — confirm in the guidelines)
- Pass **XSD validation + business-rule checks**
- Carry the accounting split via **SubInvoiceRow**
- Validate against the embedded example + XMLdation

**Not WasteHero's job (customer-owned):**
- Transmission to the operator ([PD-107](https://ioteelab.atlassian.net/browse/PD-107))
- Operator-gateway-specific validation, test credentials, sandbox access
- The integration itself (Frends for PJH) — unless contracted as a CR

---

## Open questions

For the customer's integration team (PJH via Frends):

1. What does the **API contract** look like — does WasteHero return FINVOICE XML per invoice, a batch endpoint, push to a customer endpoint, or pull by the customer? Auth? Batching?
2. How does the customer expect **GL account + cost centre** carried in the row data (so the split is usable downstream)?
3. Can the customer share a **sample FINVOICE 3.0 file** their operator currently accepts, to validate our output against?

The operator's own sandbox and credentials are the customer's concern, not WasteHero's — so they're off this list.

---

*Document prepared: 2026-06-03 · Ledger squad · WasteHero invoicing module*
*FINVOICE rules cited from the FINVOICE 3.0 Implementation Guidelines (Finanssiala). Example file is anonymised developer-reference material from Visma/Maventa's public GitHub. WasteHero's responsibility is correct format + API; integration and transmission are customer-owned (PJH via Frends, Ropo for receivables).*
