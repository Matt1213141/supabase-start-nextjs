-- Enable Row Level Security (RLS) for the storage.objects table
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own files
alter policy "Allow users to read their own files 1oj01fe_0"
on "storage"."objects"
to authenticated
for select
using (
  ((bucket_id = 'avatars'::text) AND (owner = ( SELECT auth.uid() AS uid)))
  -- Can add more buckets here if needed
);

-- Allow users to access their own files
alter policy "Allow users to update their own files 1oj01fe_0"
on "storage"."objects"
to authenticated
for update
using (
  ((bucket_id = 'avatars'::text) AND (owner = ( SELECT auth.uid() AS uid)))
  -- Can add more buckets here if needed
);

-- Allow users to delete their own files
alter policy "Allow users to delete their own files 1oj01fe_0"
on "storage"."objects"
to authenticated
for delete
using (
  ((bucket_id = 'avatars'::text) AND (owner = ( SELECT auth.uid() AS uid)))
  -- Can add more buckets here if needed
);

-- Allow users to update their own files
alter policy "Allow users to insert their own files 1oj01fe_0"
on "storage"."objects"
to authenticated
for insert
using (
  ((bucket_id = 'avatars'::text) AND (owner = ( SELECT auth.uid() AS uid)))
  -- Can add more buckets here if needed
);
---- likely needed, but doesn't show it on the supabase docs, so leaving it commented out for now
-- with check (
--   ((bucket_id = 'avatars'::text) AND (owner = ( SELECT auth.uid() AS uid)))
--   -- Can add more buckets here if needed
-- );

