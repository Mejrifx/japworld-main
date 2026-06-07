# Currency System Documentation

## Overview

The JapWorld platform now uses **Japanese Yen (JPY)** as the primary currency with **British Pound (GBP)** conversions displayed for reference.

## Key Changes

### 1. Primary Currency: JPY
- All amounts are now stored and displayed in Japanese Yen (¥)
- Database column `amount_cents` now stores JPY amounts (as integer yen, not cents)
- No fractional currency for JPY (yen doesn't have cents)

### 2. Dual Currency Display
All financial amounts are shown in the format: **¥1,950,000 (£10,000.00)**
- Primary: JPY (no decimal places)
- Secondary: GBP (2 decimal places) for reference

### 3. Exchange Rate
- Current rate: **£1 = ¥195**
- Rate can be updated in `/src/lib/currency.ts`
- Future enhancement: Connect to live exchange rate API

## Files Modified

### Core Currency Logic
- **`/src/lib/currency.ts`** (NEW)
  - Currency conversion functions
  - Formatting utilities
  - Exchange rate configuration

### Formatting Functions
- **`/src/hooks/usePortalData.ts`**
  - Updated `formatCurrency()` to use dual currency display
  - Changed invoice generation to use JPY

### UI Components
- **`/src/components/ExchangeRateInfo.tsx`** (NEW)
  - Displays exchange rate information to users
  - Two variants: default and minimal

- **`/src/components/InvoicePDF.tsx`**
  - Updated PDF generation to show dual currency
  - Added exchange rate disclaimer

### Portal Pages (Client-facing)
- **`/src/pages/portal/PortalAccount.tsx`**
  - Added exchange rate info display
  - All balances show in JPY with GBP conversion

- **`/src/pages/portal/PortalTransactions.tsx`**
  - Transaction amounts in dual currency

- **`/src/pages/portal/PortalInvoices.tsx`**
  - Invoice amounts in dual currency

### Admin Pages
- **`/src/pages/admin/AdminClientDetail.tsx`**
  - Updated payment recording form: "Amount (¥)" instead of "Amount (£)"
  - Updated invoice creation form: "Amount (¥)" instead of "Amount (£)"
  - Removed decimal steps from number inputs (JPY is whole numbers)
  - Added exchange rate info displays
  - Changed amount validation from pence to yen

## Usage Examples

### For Admins

#### Recording a Payment
```
Amount (¥): 1950000
Description: Deposit for Toyota Supra
```

#### Creating an Invoice
```
Amount (¥): 2925000
Description: Toyota Land Cruiser 78 Series - Purchase & Shipping
```

### For Clients

When viewing balances, transactions, or invoices, amounts appear as:
- Balance: **¥1,950,000 (£10,000.00)**
- Invoice: **¥2,925,000 (£15,000.00)**

## Database Schema

**No database migration required** - the existing `amount_cents` column is repurposed:
- **Before**: Stored British pence (e.g., 1000000 = £10,000.00)
- **After**: Stores Japanese yen (e.g., 1950000 = ¥1,950,000)

### Important Note on Existing Data
If you have existing data in GBP format, you'll need to run a migration script to convert:
```javascript
// Example migration logic
oldGBPPence * 195 / 100 = newJPY
// e.g., 1000000 pence (£10,000) → 1,950,000 yen
```

## Future Enhancements

1. **Live Exchange Rates**
   - Integrate with currency API (e.g., exchangerate-api.com)
   - Update rates daily/hourly
   - Display last updated timestamp

2. **Multi-Currency Support**
   - Allow clients to choose preferred display currency
   - Support USD, EUR, etc.

3. **Historical Rate Tracking**
   - Store exchange rate at transaction time
   - Show historical conversions accurately

4. **Currency Preference Settings**
   - Per-client currency preferences
   - Admin configurable default rates

## Updating the Exchange Rate

To update the exchange rate, edit `/src/lib/currency.ts`:

```typescript
// Change this value:
export const GBP_TO_JPY_RATE = 195; // Update to current rate
```

After updating, the new rate will apply immediately across the entire platform.

## Testing Checklist

- [ ] Admin can create invoices in JPY
- [ ] Admin can record payments in JPY
- [ ] Client portal shows balances in dual currency
- [ ] Transaction history displays dual currency
- [ ] Invoice PDFs show dual currency with disclaimer
- [ ] Exchange rate info is visible on relevant pages
- [ ] Amounts are formatted correctly (no decimals for JPY)
- [ ] GBP conversions are calculated accurately

## Support

For questions or issues with the currency system, contact the development team or refer to the inline documentation in `/src/lib/currency.ts`.
