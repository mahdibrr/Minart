# Configuration du Storage Supabase

## Étape 1: Créer le bucket pour les images de produits

Votre projet Supabase est en cours de restauration. Une fois actif, exécutez ce SQL dans l'éditeur SQL de Supabase:

```sql
-- Créer le bucket pour les images de produits
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  10485760, -- 10MB max
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;
```

## Étape 2: Configurer les politiques de sécurité (RLS)

```sql
-- Permettre à tout le monde de lire les images (public)
CREATE POLICY "Public Access for Product Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Permettre aux utilisateurs authentifiés de télécharger des images
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);

-- Permettre aux utilisateurs authentifiés de mettre à jour les images
CREATE POLICY "Authenticated users can update product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);

-- Permettre aux utilisateurs authentifiés de supprimer les images
CREATE POLICY "Authenticated users can delete product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);
```

## Étape 3: Vérifier la configuration

Allez dans votre dashboard Supabase:
1. Cliquez sur "Storage" dans le menu de gauche
2. Vous devriez voir le bucket "product-images"
3. Le bucket doit être marqué comme "Public"

## Alternative: Créer via l'interface Supabase

Si vous préférez utiliser l'interface:

1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet "APP-SESAME"
3. Cliquez sur "Storage" dans le menu
4. Cliquez sur "New bucket"
5. Configurez:
   - Name: `product-images`
   - Public bucket: ✅ Activé
   - File size limit: 10 MB
   - Allowed MIME types: image/png, image/jpeg, image/jpg, image/gif, image/webp
6. Cliquez sur "Create bucket"

## Statut actuel

✅ Projet restauré et en cours d'activation
⏳ En attente que le projet soit complètement actif
📝 Bucket à créer une fois le projet actif

Le projet devrait être actif dans 1-2 minutes.
