-- ============================================================
-- JapWorld Portal - Enquiries System
-- Migration to add enquiry form functionality
-- ============================================================

-- =====================
-- ENUMS
-- =====================

CREATE TYPE enquiry_status AS ENUM ('new', 'read', 'responded', 'resolved');

-- =====================
-- TABLES
-- =====================

-- Enquiries from potential clients
CREATE TABLE enquiries (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text NOT NULL,
  email           text NOT NULL,
  phone           text,
  company         text,
  vehicle_interest text,
  message         text NOT NULL,
  budget_range    text,
  status          enquiry_status NOT NULL DEFAULT 'new',
  admin_notes     text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- =====================
-- INDEXES
-- =====================

CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX idx_enquiries_email ON enquiries(email);

-- =====================
-- ROW LEVEL SECURITY
-- =====================

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Public can insert (submit enquiry form)
CREATE POLICY "Anyone can submit an enquiry"
  ON enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can view enquiries
CREATE POLICY "Admins can view all enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Only admins can update enquiries
CREATE POLICY "Admins can update enquiries"
  ON enquiries FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Only admins can delete enquiries
CREATE POLICY "Admins can delete enquiries"
  ON enquiries FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- =====================
-- TRIGGER
-- =====================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_enquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_enquiries_updated_at();
