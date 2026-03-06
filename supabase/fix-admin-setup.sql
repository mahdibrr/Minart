-- Step 1: Create function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'client'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 2: Create trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 3: Add RLS policy to allow authenticated users to read profiles (needed for middleware)
CREATE POLICY "Authenticated users can read all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

-- Step 4: Create profile for existing admin user (if not exists)
-- Replace 'admin@bluebelldesign.tn' with your actual admin email
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', 'Admin User'),
  'admin'
FROM auth.users
WHERE email = 'admin@bluebelldesign.tn'
ON CONFLICT (id) DO UPDATE
SET role = 'admin';

-- Step 5: Verify the admin user
SELECT id, email, role, created_at 
FROM public.profiles 
WHERE email = 'admin@bluebelldesign.tn';
