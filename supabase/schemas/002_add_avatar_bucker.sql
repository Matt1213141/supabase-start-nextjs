-- This would be in a migrations file, but I can't run it through the CLI, so I'm putting it here for now.
-- This is just pasted in the SQL editor in the Supabase dashboard and run manually.
INSERT INTO storage.buckets (id, name, owner, public, created_at, updated_at)
VALUES ('avatars', 'avatars', 'supabase-admin', false, now(), now());
