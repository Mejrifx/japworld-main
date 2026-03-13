-- ============================================================
-- Migration 003: Force password change on first client login
-- ============================================================

-- Add must_change_password flag to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS must_change_password boolean NOT NULL DEFAULT false;

-- Update handle_new_user trigger to automatically flag new client accounts
-- so they are forced to set their own password on first login
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO profiles (id, role, client_id, must_change_password)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'client'),
    CASE
      WHEN NEW.raw_user_meta_data->>'client_id' IS NOT NULL
      THEN (NEW.raw_user_meta_data->>'client_id')::uuid
      ELSE NULL
    END,
    -- Client accounts must change their temp password on first login
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'client') = 'client'
  );
  RETURN NEW;
END;
$$;
