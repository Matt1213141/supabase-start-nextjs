-- Enable Row Level Security (RLS) for the storage.objects table
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow users to access their own files
CREATE POLICY "Users can access their own files"
  ON storage.objects
  FOR SELECT, INSERT, UPDATE, DELETE
  TO authenticated
  USING (auth.uid() = owner_id);