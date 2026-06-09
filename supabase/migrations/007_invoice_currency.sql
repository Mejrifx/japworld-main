-- Add invoice currency (JPY or GBP) for admin invoice creation
CREATE TYPE invoice_currency AS ENUM ('JPY', 'GBP');

ALTER TABLE invoices
  ADD COLUMN currency invoice_currency NOT NULL DEFAULT 'JPY';

COMMENT ON COLUMN invoices.currency IS 'Currency the invoice was issued in (amount_cents always stores JPY equivalent)';
