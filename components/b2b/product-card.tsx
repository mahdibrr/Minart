import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ProductDialog } from "./product-dialog";

interface B2BProductCardProps {
    product: Product;
}

export function B2BProductCard({ product }: B2BProductCardProps) {
    const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;

    const cardContent = (
        <Card className="overflow-hidden border-border/50 hover:border-minart-500 hover:shadow-xl transition-all cursor-pointer h-full flex flex-col">
            <div className="aspect-square relative bg-neutral-100 flex-shrink-0">
                {product.images[0] ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">Pas d'Image</div>
                )}
                {hasDiscount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold shadow-sm">
                        -{Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)}%
                    </div>
                )}
                {product.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        {product.images.length}
                    </div>
                )}
            </div>
            <CardHeader className="p-4 flex-shrink-0 flex-grow">
                <CardTitle className="text-lg font-semibold text-minart-900 line-clamp-1 mb-1">{product.name}</CardTitle>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-minart-600">{product.price.toFixed(2)} TND</span>
                    {hasDiscount && (
                        <span className="text-xs text-muted-foreground line-through">
                            {product.compare_at_price?.toFixed(2)} TND
                        </span>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-shrink-0 mt-auto">
                <p className="text-xs text-muted-foreground line-clamp-2">{product.description || product.short_description}</p>
            </CardContent>
        </Card>
    );

    return <ProductDialog product={product} trigger={cardContent} />;
}
