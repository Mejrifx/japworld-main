/**
 * Currency Conversion and Formatting Utilities
 *
 * Primary currency: JPY (Japanese Yen)
 * Secondary display: GBP (British Pound)
 *
 * All database amounts are stored in JPY.
 *
 * Every conversion function accepts an optional `rate` parameter (GBP per 1 JPY,
 * expressed as "how many JPY per £1"). When omitted the hardcoded fallback is
 * used. The live rate is fetched via the ExchangeRateContext.
 */

/** Hardcoded fallback – used when the live API hasn't responded yet or fails. */
export const GBP_TO_JPY_RATE = 195;

export type InvoiceCurrency = "JPY" | "GBP";

// ─── Formatting ───────────────────────────────────────────────────────────────

export function formatJPY(yen: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(yen);
}

export function formatGBP(pence: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(pence / 100);
}

// ─── Conversion ───────────────────────────────────────────────────────────────

/** Convert GBP pence → JPY whole yen */
export function gbpToJpy(pence: number, rate = GBP_TO_JPY_RATE): number {
  return Math.round((pence / 100) * rate);
}

/** Convert JPY whole yen → GBP pence */
export function jpyToGbp(yen: number, rate = GBP_TO_JPY_RATE): number {
  return Math.round((yen / rate) * 100);
}

/** Convert GBP pounds (not pence) → JPY whole yen */
export function gbpPoundsToJpy(pounds: number, rate = GBP_TO_JPY_RATE): number {
  return Math.round(pounds * rate);
}

/** Convert JPY whole yen → GBP pounds (not pence) */
export function jpyToGbpPounds(yen: number, rate = GBP_TO_JPY_RATE): number {
  return yen / rate;
}

// ─── Dual-currency display ────────────────────────────────────────────────────

/**
 * Format JPY with the GBP equivalent in parentheses.
 * e.g.  ¥1,950,000 (£10,000.00)
 */
export function formatDualCurrency(
  yen: number,
  options: { showGBP?: boolean; jpyOnly?: boolean } = {},
  rate = GBP_TO_JPY_RATE
): string {
  const { showGBP = true, jpyOnly = false } = options;
  const jpyFormatted = formatJPY(yen);
  if (jpyOnly || !showGBP) return jpyFormatted;
  const gbpFormatted = formatGBP(jpyToGbp(yen, rate));
  return `${jpyFormatted} (${gbpFormatted})`;
}

/** Same as formatDualCurrency but prefixes a + sign for positive amounts */
export function formatDualCurrencyWithSign(
  yen: number,
  showGBP = true,
  rate = GBP_TO_JPY_RATE
): string {
  return (yen >= 0 ? "+" : "") + formatDualCurrency(yen, { showGBP }, rate);
}

// ─── Exchange-rate info text ───────────────────────────────────────────────────

/** Human-readable exchange rate string */
export function getExchangeRateInfo(rate = GBP_TO_JPY_RATE): string {
  return `Exchange rate: £1 = ¥${rate % 1 === 0 ? rate : rate.toFixed(2)}`;
}

// ─── Admin invoice helpers ────────────────────────────────────────────────────

/**
 * Parse an admin-entered amount string and return the JPY value to store.
 * GBP input is converted at the given rate.
 */
export function parseInvoiceAmountToJpy(
  amount: string,
  currency: InvoiceCurrency,
  rate = GBP_TO_JPY_RATE
): number {
  const parsed = parseFloat(amount);
  if (isNaN(parsed) || parsed <= 0) return 0;
  if (currency === "JPY") return Math.round(parsed);
  return gbpPoundsToJpy(parsed, rate);
}

/**
 * Live-conversion preview shown beneath the amount input while admin types.
 * Returns null when input is empty/invalid.
 */
export function getInvoiceAmountPreview(
  amount: string,
  currency: InvoiceCurrency,
  rate = GBP_TO_JPY_RATE
): string | null {
  const parsed = parseFloat(amount);
  if (isNaN(parsed) || parsed <= 0) return null;
  if (currency === "JPY") {
    return `≈ ${formatGBP(Math.round(jpyToGbpPounds(Math.round(parsed), rate) * 100))}`;
  }
  return `≈ ${formatJPY(gbpPoundsToJpy(parsed, rate))}`;
}

// ─── Legacy helpers ───────────────────────────────────────────────────────────

/** Convert old GBP-pence values to JPY for migration purposes */
export function migrateGBPToJPY(oldAmountPence: number, rate = GBP_TO_JPY_RATE): number {
  return gbpToJpy(oldAmountPence, rate);
}

/** @deprecated Use parseJPYInput instead */
export function parseJPYInput(input: string): number {
  const cleaned = input.replace(/[¥,\s]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : Math.round(parsed);
}
