import { B2BProductCard } from "@/components/b2b/product-card";
import { createClient } from "@/lib/supabase/server";
import { Product, Category } from "@/types";
import CatalogueClient from "@/components/catalogue/catalogue-client";

export default async function CataloguePage() {
  const supabase = await createClient();

  const [
    { data: products },
    { data: categories }
  ] = await Promise.all([
    supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
  ]);

  return (
    <CatalogueClient 
      initialProducts={products || []} 
      categories={categories || []}
    />
  );
}
