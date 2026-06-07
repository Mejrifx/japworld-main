/**
 * Currency Conversion and Formatting Utilities
 * 
 * Primary currency: JPY (Japanese Yen)
 * Secondary display: GBP (British Pound)
 * 
 * All database amounts are stored in JPY (as integer yen, not cents)
 */

// Exchange rate: 1 GBP = X JPY
// Update this rate as needed (you can later connect this to a live API)
export const GBP_TO_JPY_RATE = 195; // As of mid-2026 estimate: £1 ≈ ¥195

/**
 * Convert GBP (in pence) to JPY
 */
export function gbpToJpy(pence: number): number {
  const pounds = pence / 100;
  return Math.round(pounds * GBP_TO_JPY_RATE);
}

/**
 * Convert JPY to GBP (returns pence)
 */
export function jpyToGbp(yen: number): number {
  const pounds = yen / GBP_TO_JPY_RATE;
  return Math.round(pounds * 100); // Convert to pence
}

/**
 * Format JPY amount
 */
export function formatJPY(yen: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(yen);
}

/**
 * Format GBP amount (from pence)
 */
export function formatGBP(pence: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(pence / 100);
}

/**
 * Format dual currency: JPY primary with GBP conversion
 * 
 * @param yen - Amount in Japanese Yen
 * @param options - Display options
 * @returns Formatted string like "¥1,950,000 (£10,000.00)"
 */
export function formatDualCurrency(
  yen: number,
  options: {
    showGBP?: boolean;
    compact?: boolean;
    jpyOnly?: boolean;
  } = {}
): string {
  const { showGBP = true, compact = false, jpyOnly = false } = options;

  const jpyFormatted = formatJPY(yen);

  if (jpyOnly || !showGBP) {
    return jpyFormatted;
  }

  const gbpPence = jpyToGbp(yen);
  const gbpFormatted = formatGBP(gbpPence);

  if (compact) {
    return `${jpyFormatted} (${gbpFormatted})`;
  }

  return `${jpyFormatted} (${gbpFormatted})`;
}

/**
 * Format currency with sign prefix for transactions
 */
export function formatDualCurrencyWithSign(yen: number, showGBP: boolean = true): string {
  const sign = yen >= 0 ? "+" : "";
  return sign + formatDualCurrency(yen, { showGBP });
}

/**
 * Parse user input as JPY (handles various formats)
 */
export function parseJPYInput(input: string): number {
  // Remove currency symbols, commas, and spaces
  const cleaned = input.replace(/[¥,\s]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : Math.round(parsed);
}

/**
 * Get exchange rate info text
 */
export function getExchangeRateInfo(): string {
  return `Exchange rate: £1 = ¥${GBP_TO_JPY_RATE}`;
}

/**
 * Legacy compatibility: Convert from old GBP pence format to JPY
 * Use this when migrating existing GBP data to JPY
 */
export function migrateGBPToJPY(oldAmountPence: number): number {
  return gbpToJpy(oldAmountPence);
}
