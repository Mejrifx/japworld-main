-- Create client_notes table for activity log
CREATE TABLE IF NOT EXISTS client_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  note_text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create index for fast client lookups
CREATE INDEX idx_client_notes_client_id ON client_notes(client_id);
CREATE INDEX idx_client_notes_created_at ON client_notes(created_at DESC);

-- Enable RLS
ALTER TABLE client_notes ENABLE ROW LEVEL SECURITY;

-- Admins can do everything with notes
CREATE POLICY "Admins can view all notes"
  ON client_notes FOR SELECT
  TO authenticated
  USING (get_my_role() = 'admin');

CREATE POLICY "Admins can create notes"
  ON client_notes FOR INSERT
  TO authenticated
  WITH CHECK (get_my_role() = 'admin');

CREATE POLICY "Admins can update notes"
  ON client_notes FOR UPDATE
  TO authenticated
  USING (get_my_role() = 'admin');

CREATE POLICY "Admins can delete notes"
  ON client_notes FOR DELETE
  TO authenticated
  USING (get_my_role() = 'admin');

-- Trigger to update updated_at
CREATE TRIGGER update_client_notes_updated_at
  BEFORE UPDATE ON client_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Add comment for documentation
COMMENT ON TABLE client_notes IS 'Activity log and notes for each client, with timestamps and admin attribution';
