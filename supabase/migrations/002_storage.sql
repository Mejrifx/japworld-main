-- ============================================================
-- JapWorld Portal - Storage Setup
-- Run this AFTER creating the 'vehicle-documents' bucket
-- in the Supabase dashboard (Storage > New Bucket, set private)
-- ============================================================

-- Storage RLS policies for the 'vehicle-documents' bucket

-- Admin: full access to all files
CREATE POLICY "storage: admin full access"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'vehicle-documents'
    AND get_my_role() = 'admin'
  );

-- Client: read-only access to files under their own client_id folder
-- Path convention: {client_id}/{vehicle_id}/{document_type}/{filename}
CREATE POLICY "storage: client reads own files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'vehicle-documents'
    AND (storage.foldername(name))[1] = get_my_client_id()::text
  );
