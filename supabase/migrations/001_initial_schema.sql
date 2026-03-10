-- ============================================================
-- JapWorld Portal - Initial Schema Migration
-- Run this in Supabase SQL Editor or via Supabase CLI
-- ============================================================

-- =====================
-- ENUMS
-- =====================

CREATE TYPE transaction_type AS ENUM ('payment', 'invoice', 'adjustment');
CREATE TYPE invoice_status AS ENUM ('draft', 'issued', 'paid', 'partially_paid', 'overdue');
CREATE TYPE vehicle_status AS ENUM ('in_yard', 'waiting_booking', 'loaded', 'on_ship');
CREATE TYPE document_type AS ENUM ('photo', 'auction_sheet', 'invoice', 'other');
CREATE TYPE user_role AS ENUM ('client', 'admin');

-- =====================
-- TABLES
-- =====================

-- Clients (B2B companies)
CREATE TABLE clients (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email        text NOT NULL,
  phone        text,
  notes        text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- Profiles: one per auth.users row; links auth user to client (or marks as admin)
CREATE TABLE profiles (
  id         uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role       user_role NOT NULL DEFAULT 'client',
  client_id  uuid REFERENCES clients(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Invoices issued to clients
CREATE TABLE invoices (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id      uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  invoice_number text,
  amount_cents   integer NOT NULL CHECK (amount_cents > 0),
  due_date       date,
  status         invoice_status NOT NULL DEFAULT 'issued',
  description    text NOT NULL,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

-- Transactions (payments received, invoices issued, adjustments)
CREATE TABLE transactions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id    uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  amount_cents integer NOT NULL,  -- positive = credit (payment), negative = debit (invoice charge)
  type         transaction_type NOT NULL,
  description  text NOT NULL,
  reference    text,
  invoice_id   uuid REFERENCES invoices(id) ON DELETE SET NULL,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- Vehicles assigned to clients
CREATE TABLE vehicles (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id        uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name             text NOT NULL,
  chassis          text,
  make             text,
  model            text,
  year             integer,
  colour           text,
  status           vehicle_status NOT NULL DEFAULT 'in_yard',
  status_updated_at timestamptz NOT NULL DEFAULT now(),
  notes            text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- Documents/files associated with a vehicle (stored in Supabase Storage)
CREATE TABLE vehicle_documents (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id    uuid NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  storage_path  text NOT NULL,
  document_type document_type NOT NULL,
  display_name  text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- History of vehicle status changes
CREATE TABLE vehicle_status_history (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  status     vehicle_status NOT NULL,
  changed_at timestamptz NOT NULL DEFAULT now(),
  changed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- =====================
-- INDEXES
-- =====================

CREATE INDEX idx_profiles_client_id ON profiles(client_id);
CREATE INDEX idx_transactions_client_id ON transactions(client_id);
CREATE INDEX idx_transactions_invoice_id ON transactions(invoice_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX idx_invoices_client_id ON invoices(client_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_vehicles_client_id ON vehicles(client_id);
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicle_documents_vehicle_id ON vehicle_documents(vehicle_id);
CREATE INDEX idx_vehicle_documents_type ON vehicle_documents(document_type);
CREATE INDEX idx_vehicle_status_history_vehicle_id ON vehicle_status_history(vehicle_id);

-- =====================
-- TRIGGERS & FUNCTIONS
-- =====================

-- Auto-create profile when a new auth user is created
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO profiles (id, role, client_id)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'client'),
    CASE
      WHEN NEW.raw_user_meta_data->>'client_id' IS NOT NULL
      THEN (NEW.raw_user_meta_data->>'client_id')::uuid
      ELSE NULL
    END
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER invoices_updated_at BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER vehicles_updated_at BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-update vehicles.status_updated_at when status changes
CREATE OR REPLACE FUNCTION vehicles_on_status_change()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    NEW.status_updated_at = now();
    -- Append to status history
    INSERT INTO vehicle_status_history (vehicle_id, status, changed_by)
    VALUES (NEW.id, NEW.status, auth.uid());
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER vehicles_status_changed BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION vehicles_on_status_change();

-- Helper functions for RLS
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT role::text FROM profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION get_my_client_id()
RETURNS uuid
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT client_id FROM profiles WHERE id = auth.uid();
$$;

-- =====================
-- ROW LEVEL SECURITY
-- =====================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_status_history ENABLE ROW LEVEL SECURITY;

-- PROFILES
CREATE POLICY "profiles: own row" ON profiles
  FOR ALL USING (id = auth.uid());

CREATE POLICY "profiles: admin full access" ON profiles
  FOR ALL USING (get_my_role() = 'admin');

-- CLIENTS
CREATE POLICY "clients: admin full access" ON clients
  FOR ALL USING (get_my_role() = 'admin');

CREATE POLICY "clients: client reads own" ON clients
  FOR SELECT USING (id = get_my_client_id());

-- TRANSACTIONS
CREATE POLICY "transactions: admin full access" ON transactions
  FOR ALL USING (get_my_role() = 'admin');

CREATE POLICY "transactions: client reads own" ON transactions
  FOR SELECT USING (client_id = get_my_client_id());

-- INVOICES
CREATE POLICY "invoices: admin full access" ON invoices
  FOR ALL USING (get_my_role() = 'admin');

CREATE POLICY "invoices: client reads own" ON invoices
  FOR SELECT USING (client_id = get_my_client_id());

-- VEHICLES
CREATE POLICY "vehicles: admin full access" ON vehicles
  FOR ALL USING (get_my_role() = 'admin');

CREATE POLICY "vehicles: client reads own" ON vehicles
  FOR SELECT USING (client_id = get_my_client_id());

-- VEHICLE DOCUMENTS
CREATE POLICY "vehicle_documents: admin full access" ON vehicle_documents
  FOR ALL USING (get_my_role() = 'admin');

CREATE POLICY "vehicle_documents: client reads own" ON vehicle_documents
  FOR SELECT USING (
    vehicle_id IN (
      SELECT id FROM vehicles WHERE client_id = get_my_client_id()
    )
  );

-- VEHICLE STATUS HISTORY
CREATE POLICY "vehicle_status_history: admin full access" ON vehicle_status_history
  FOR ALL USING (get_my_role() = 'admin');

CREATE POLICY "vehicle_status_history: client reads own" ON vehicle_status_history
  FOR SELECT USING (
    vehicle_id IN (
      SELECT id FROM vehicles WHERE client_id = get_my_client_id()
    )
  );
