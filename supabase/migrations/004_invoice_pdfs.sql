-- Add PDF storage path to invoices table
ALTER TABLE invoices 
ADD COLUMN IF NOT EXISTS pdf_storage_path text;

-- Create storage bucket for invoice PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('invoices', 'invoices', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for invoice PDFs
-- Admins can upload/view/delete invoices
CREATE POLICY "Admins can upload invoices"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'invoices' AND
  (SELECT get_my_role()) = 'admin'
);

CREATE POLICY "Admins can update invoices"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'invoices' AND
  (SELECT get_my_role()) = 'admin'
);

CREATE POLICY "Admins can delete invoices"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'invoices' AND
  (SELECT get_my_role()) = 'admin'
);

-- Clients can view their own invoice PDFs
CREATE POLICY "Clients can view their invoice PDFs"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'invoices' AND
  (
    (SELECT get_my_role()) = 'admin' OR
    -- Extract client_id from path (format: client_id/invoice_id.pdf)
    (SELECT get_my_client_id())::text = split_part(name, '/', 1)
  )
);

-- Comment for documentation
COMMENT ON COLUMN invoices.pdf_storage_path IS 'Path to the invoice PDF in Supabase Storage (bucket: invoices)';
