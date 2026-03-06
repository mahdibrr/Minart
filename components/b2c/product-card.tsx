import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

interface B2CProductCardProps {
    product: Product;
}

export function B2CProductCard({ product }: B2CProductCardProps) {
    return (
        <Card className="group border-none shadow-none hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-[3/4] relative bg-neutral-50 overflow-hidden rounded-lg mb-3">
                {product.images[0] ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-300">Pas d'Image</div>
                )}
                <Button
                    size="icon"
                    className="absolute bottom-4 right-4 rounded-full bg-white text-black hover:bg-minart-500 hover:text-white shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                >
                    <ShoppingBag className="h-4 w-4" />
                </Button>
            </div>
            <CardContent className="p-0">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-medium text-gray-900 group-hover:text-minart-600 transition-colors">{product.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{product.description?.substring(0, 50)}...</p>
                    </div>
                    <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                </div>
            </CardContent>
        </Card>
    );
}
