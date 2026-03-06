-- ============================================
-- Correction des avertissements de sécurité
-- Fix: search_path pour les fonctions
-- ============================================

-- Fix pour update_updated_at_column
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';

-- Fix pour generate_order_number
ALTER FUNCTION public.generate_order_number() SET search_path = '';

-- Fix pour generate_quote_number
ALTER FUNCTION public.generate_quote_number() SET search_path = '';

-- Fix pour set_order_number
ALTER FUNCTION public.set_order_number() SET search_path = '';

-- Fix pour set_quote_number
ALTER FUNCTION public.set_quote_number() SET search_path = '';

-- Fix pour update_product_stock
ALTER FUNCTION public.update_product_stock() SET search_path = '';

-- Fix pour handle_new_user
ALTER FUNCTION public.handle_new_user() SET search_path = '';

-- Vérification
SELECT 
    routine_name,
    routine_type,
    security_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN (
    'update_updated_at_column',
    'generate_order_number',
    'generate_quote_number',
    'set_order_number',
    'set_quote_number',
    'update_product_stock',
    'handle_new_user'
);
