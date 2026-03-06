-- Script pour créer un utilisateur administrateur
-- Remplacer [USER_ID] avec l'ID de l'utilisateur créé via Supabase Auth UI

-- Méthode 1: Mettre à jour un utilisateur existant pour le rendre admin
-- 1. Créer d'abord l'utilisateur via Supabase Dashboard > Authentication > Users > Add User
-- 2. Copier l'ID de l'utilisateur créé
-- 3. Exécuter cette requête en remplaçant [USER_ID]

UPDATE profiles 
SET role = 'admin' 
WHERE id = '[USER_ID]';

-- Méthode 2: Mettre à jour par email (si le profil existe déjà)
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'admin@bluebelldesign.tn';

-- Vérifier que l'utilisateur est bien admin
SELECT id, email, role, created_at 
FROM profiles 
WHERE role = 'admin';

-- Note: Il est recommandé de créer les utilisateurs via l'interface Supabase Auth
-- plutôt que directement dans la base de données pour des raisons de sécurité.
