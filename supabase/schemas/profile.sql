-- Make sure to start up the server via: 
--   npx supabase start
-- To make migrations, run:
--   npx supabase db diff -f <filename>.sql
-- To run migrations, run:
--   npx supabase migration up
CREATE TABLE profiles (
    id UUID PRIMARY KEY references auth.users(id) ON DELETE CASCADE,
    name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_profile_name ON profiles(name);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profile table
CREATE POLICY "Allow users to view their own profile"
    ON profiles
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Allow users to update their own profile"
    ON profiles
    FOR UPDATE
    USING (auth.uid() = id);

-- Trigger function to auto-create a profile when a new user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, name, avatar_url)
    VALUES (NEW.id, NULL, NULL);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql security definer;

-- Trigger on auth.users
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
CREATE TRIGGER trigger_update_profile_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
WHEN (OLD.name IS DISTINCT FROM NEW.name OR OLD.avatar_url IS DISTINCT FROM NEW.avatar_url)
EXECUTE FUNCTION update_profile_updated_at();