-- Make sure to start up the server via: 
--   npx supabase start
-- To make migrations, run:
--   npx supabase db diff -f <filename>.sql
-- To run migrations, run:
--   npx supabase migration up
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY references auth.users(id) ON DELETE CASCADE,
    name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profile_name ON profiles(name);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profile table
-- if policy already exists, you can drop it with:
--   DROP POLICY "Allow users to view their own profile" ON profiles;
CREATE POLICY "Allow users to view their own profile"
    ON profiles
    FOR SELECT
    TO authenticated
    USING (id = (SELECT auth.uid()));

-- if policy already exists, you can drop it with:
--   DROP POLICY "Allow users to update their own profile" ON profiles;
CREATE POLICY "Allow users to update their own profile"
    ON profiles
    FOR UPDATE
    TO authenticated
    USING (id = (SELECT auth.uid()))
    WITH CHECK (id = (SELECT auth.uid()));

-- if policy already exists, you can drop it with:
--   DROP POLICY "Allow users to insert their own profile" ON profiles;
CREATE POLICY "Allow users to insert their own profile"
    ON profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (id = (SELECT auth.uid()));

-- Trigger function to auto-create a profile when a new user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, name, avatar_url)
    VALUES (
        NEW.id, 
        NEW.raw_user_meta_data ->> 'name', -- get name from signup metadata 
        NULL
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql security definer;

-- Trigger on auth.users
-- Note: If you have already created this trigger, you may need to drop it first with:
--   DROP TRIGGER on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW execute FUNCTION public.handle_new_user();

-- Function to update the updated_at column on specific profile updates
CREATE OR REPLACE FUNCTION update_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

-- This trigger will update the updated_at column whenever the name or avatar_url fields are updated
-- Note: If you have already created this trigger, you may need to drop it first with:
--   DROP TRIGGER trigger_update_profile_updated_at ON profiles;
CREATE TRIGGER trigger_update_profile_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
WHEN (OLD.name IS DISTINCT FROM NEW.name OR OLD.avatar_url IS DISTINCT FROM NEW.avatar_url)
EXECUTE FUNCTION update_profile_updated_at();