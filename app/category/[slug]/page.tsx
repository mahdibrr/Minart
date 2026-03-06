import { B2CProductCard } from "@/components/b2c/product-card";
import { Product } from "@/types";

// Mock Data
const products: Product[] = [
    {
        id: "4",
        name: "Sac en Cuir Classique",
        slug: "classic-tote",
        description: "Design intemporel allié à une fonctionnalité moderne. Intérieur spacieux avec compartiment pour ordinateur portable.",
        short_description: "Sac en cuir spacieux et élégant",
        price: 195.00,
        compare_at_price: null,
        cost_price: null,
        category_id: "bags",
        is_b2b: false,
        is_b2c: true,
        min_quantity_b2b: 1,
        b2b_price: null,
        sku: null,
        barcode: null,
        weight_kg: null,
        dimensions: null,
        images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800"],
        featured_image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800",
        stock: 50,
        low_stock_threshold: 5,
        track_inventory: true,
        allow_backorders: false,
        is_active: true,
        is_featured: false,
        meta_title: null,
        meta_description: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "5",
        name: "Portefeuille Minimaliste",
        slug: "minimalist-wallet",
        description: "Portefeuille profilé en cuir végétal.",
        short_description: "Portefeuille compact et élégant",
        price: 45.00,
        compare_at_price: null,
        cost_price: null,
        category_id: "accessories",
        is_b2b: true,
        is_b2c: true,
        min_quantity_b2b: 20,
        b2b_price: 35.00,
        sku: null,
        barcode: null,
        weight_kg: null,
        dimensions: null,
        images: ["https://images.unsplash.com/photo-1627123424574-181ce5171c98?auto=format&fit=crop&q=80&w=800"],
        featured_image: "https://images.unsplash.com/photo-1627123424574-181ce5171c98?auto=format&fit=crop&q=80&w=800",
        stock: 200,
        low_stock_threshold: 5,
        track_inventory: true,
        allow_backorders: false,
        is_active: true,
        is_featured: false,
        meta_title: null,
        meta_description: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "6",
        name: "Sac de Week-end",
        slug: "weekend-duffle",
        description: "Le compagnon parfait pour vos courts voyages. Durable et élégant.",
        short_description: "Sac de voyage durable",
        price: 250.00,
        compare_at_price: null,
        cost_price: null,
        category_id: "bags",
        is_b2b: true,
        is_b2c: true,
        min_quantity_b2b: 5,
        b2b_price: 200.00,
        sku: null,
        barcode: null,
        weight_kg: null,
        dimensions: null,
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800"],
        featured_image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
        stock: 20,
        low_stock_threshold: 5,
        track_inventory: true,
        allow_backorders: false,
        is_active: true,
        is_featured: false,
        meta_title: null,
        meta_description: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
    // Filter based on slug (mock)
    // In real app, fetch from Supabase
    const displayProducts = products;

    return (
        <div className="bg-white min-h-screen py-12">
            <div className="container">
                <div className="flex flex-col items-center mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 capitalize">Collection {params.slug}</h1>
                    <p className="mt-4 text-muted-foreground max-w-2xl">
                        Découvrez notre sélection de {params.slug}. Artisanal avec passion et précision.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {displayProducts.map(product => (
                        <B2CProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
