-- Remove the policy causing infinite recursion
DROP POLICY IF EXISTS "Admins have full access to profiles" ON public.profiles;

-- Verify it's gone
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'profiles';
