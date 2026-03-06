-- Seed script to add products and categories to the database

-- First, insert categories
INSERT INTO public.categories (name, slug, description, sort_order, is_active) VALUES
('Agendas', 'agendas', 'Agendas personnalisés en cuir de qualité', 1, true),
('Carnets', 'carnets', 'Carnets de notes artisanaux', 2, true),
('Accessoires', 'accessoires', 'Accessoires professionnels en cuir', 3, true),
('Porte-documents', 'porte-documents', 'Porte-documents et cartables professionnels', 4, true),
('Sets de Bureau', 'sets-bureau', 'Sets de bureau complets', 5, true),
('Coffrets', 'coffrets', 'Coffrets cadeaux personnalisés', 6, true)
ON CONFLICT (slug) DO NOTHING;

-- Get category IDs (we'll use the slugs to reference them)
-- Insert products
INSERT INTO public.products (
  name, 
  slug, 
  description, 
  short_description,
  price, 
  compare_at_price,
  category_id, 
  is_b2b, 
  is_b2c, 
  min_quantity_b2b,
  b2b_price,
  sku,
  stock, 
  low_stock_threshold,
  track_inventory,
  is_active, 
  is_featured,
  images
) VALUES
-- Agenda en Cuir Premium
(
  'Agenda en Cuir Premium',
  'agenda-cuir-premium',
  'Agenda en cuir véritable de première qualité avec finitions artisanales. Personnalisable avec votre logo par gravure ou marquage à chaud. Disponible en plusieurs couleurs et formats.',
  'Agenda en cuir véritable personnalisable',
  89.99,
  119.99,
  (SELECT id FROM categories WHERE slug = 'agendas' LIMIT 1),
  true,
  true,
  50,
  75.00,
  'AGD-PREM-001',
  45,
  10,
  true,
  true,
  true,
  ARRAY['/articles/article1.jpg']
),

-- Carnet de Notes Artisanal
(
  'Carnet de Notes Artisanal',
  'carnet-notes-artisanal',
  'Carnet de notes fabriqué à la main avec du cuir de qualité supérieure. Idéal pour vos réunions et prises de notes quotidiennes. Personnalisation possible avec logo gravé.',
  'Carnet artisanal en cuir',
  34.99,
  49.99,
  (SELECT id FROM categories WHERE slug = 'carnets' LIMIT 1),
  true,
  true,
  100,
  28.00,
  'CAR-ART-001',
  120,
  20,
  true,
  true,
  true,
  ARRAY['/articles/article1.jpg']
),

-- Porte-cartes Élégant
(
  'Porte-cartes Élégant',
  'porte-cartes-elegant',
  'Porte-cartes de visite en cuir fin et élégant. Compact et pratique, il se glisse facilement dans une poche. Parfait comme cadeau d''entreprise.',
  'Porte-cartes en cuir compact',
  24.99,
  34.99,
  (SELECT id FROM categories WHERE slug = 'accessoires' LIMIT 1),
  false,
  true,
  1,
  NULL,
  'PTC-ELE-001',
  80,
  15,
  true,
  true,
  false,
  ARRAY['/articles/article2.jpg']
),

-- Porte-documents Professionnel
(
  'Porte-documents Professionnel',
  'porte-documents-professionnel',
  'Porte-documents sous forme de cartable en cuir robuste. Production locale unique avec différentes couleurs et tailles selon vos choix. Idéal pour les professionnels.',
  'Porte-documents cartable en cuir',
  149.99,
  199.99,
  (SELECT id FROM categories WHERE slug = 'porte-documents' LIMIT 1),
  true,
  false,
  30,
  125.00,
  'PTD-PRO-001',
  15,
  5,
  true,
  true,
  true,
  ARRAY['/articles/article3.jpg']
),

-- Set de Bureau Complet
(
  'Set de Bureau Complet',
  'set-bureau-complet',
  'Set de bureau complet en cuir comprenant : sous-main, porte-stylos, porte-documents et organiseur. Parfait pour équiper vos bureaux avec élégance.',
  'Set de bureau en cuir complet',
  199.99,
  249.99,
  (SELECT id FROM categories WHERE slug = 'sets-bureau' LIMIT 1),
  true,
  false,
  20,
  165.00,
  'SET-BUR-001',
  8,
  3,
  true,
  true,
  true,
  ARRAY['/articles/article2.jpg']
),

-- Porte-clés Personnalisé
(
  'Porte-clés Personnalisé',
  'porte-cles-personnalise',
  'Porte-clés en cuir avec possibilité de gravure personnalisée. Petit cadeau d''entreprise parfait pour vos événements et campagnes promotionnelles.',
  'Porte-clés en cuir gravable',
  12.99,
  19.99,
  (SELECT id FROM categories WHERE slug = 'accessoires' LIMIT 1),
  true,
  true,
  200,
  9.50,
  'PTC-PER-001',
  200,
  50,
  true,
  true,
  false,
  ARRAY['/articles/article2.jpg']
),

-- Coffret Cadeau Luxe
(
  'Coffret Cadeau Luxe',
  'coffret-cadeau-luxe',
  'Coffret cadeau élégant comprenant plusieurs articles en cuir personnalisables. Large gamme disponible pour tous vos besoins de cadeaux d''entreprise.',
  'Coffret cadeau personnalisé',
  299.99,
  399.99,
  (SELECT id FROM categories WHERE slug = 'coffrets' LIMIT 1),
  true,
  true,
  10,
  250.00,
  'COF-LUX-001',
  0,
  2,
  true,
  false,
  true,
  ARRAY['/articles/article2.jpg']
);

-- Verify the inserted products
SELECT 
  p.name, 
  p.slug, 
  p.price, 
  p.stock, 
  p.is_b2b, 
  p.is_b2c,
  c.name as category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
ORDER BY p.created_at DESC;
