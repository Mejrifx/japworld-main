-- Add line_items JSONB column to invoices
-- Stores an ordered array of {description: string, amount: number} objects.
-- Amount values are in the same currency as invoices.currency.
-- The invoice amount_cents column remains the JPY total of all line items.
-- Old single-item invoices keep working (line_items will be NULL).

ALTER TABLE invoices
  ADD COLUMN line_items JSONB;

COMMENT ON COLUMN invoices.line_items IS
  'Array of {description, amount} line items. amount is in invoices.currency units.';
