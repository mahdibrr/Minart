"use client";

import { useState } from "react";
import { Product } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuoteSelection } from "@/contexts/quote-selection-context";
import { ClipboardList, Star, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ProductDialogProps {
    product: Product;
    trigger: React.ReactNode;
}

export function ProductDialog({ product, trigger }: ProductDialogProps) {
    const { addItem } = useQuoteSelection();
    const [activeImage, setActiveImage] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const images = product.images?.length > 0 ? product.images : [];
    const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;

    const handleAddToQuote = () => {
        addItem(product, product.min_quantity_b2b || 1);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Image Gallery */}
                    <div className="bg-neutral-50 p-6 flex flex-col items-center">
                        <div className="relative w-full aspect-square bg-white rounded-xl border overflow-hidden mb-4 shadow-sm">
                            {images.length > 0 ? (
                                <Image
                                    src={images[activeImage]}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <div className="flex flex-col h-full items-center justify-center text-muted-foreground gap-2">
                                    <ImageIcon className="h-12 w-12 opacity-20" />
                                    <span>Pas d'Image</span>
                                </div>
                            )}
                            {hasDiscount && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm shadow-md">
                                    Remise -{Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)}%
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {images.length > 1 && (
                            <div className="flex gap-2 w-full overflow-x-auto py-2 px-1">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-16 h-16 rounded-md border flex-shrink-0 overflow-hidden transition-all ${activeImage === idx ? "ring-2 ring-minart-500 border-none" : "hover:border-minart-300"
                                            }`}
                                    >
                                        <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="p-8 flex flex-col justify-between">
                        <div>
                            <DialogHeader className="mb-6 text-left">
                                <DialogTitle className="text-3xl font-bold text-minart-900 leading-tight">
                                    {product.name}
                                </DialogTitle>
                                <div className="flex items-center gap-3 mt-4">
                                    <span className="text-lg font-semibold text-minart-600">Prix sur devis</span>
                                    {product.min_quantity_b2b > 1 && (
                                        <span className="text-sm text-muted-foreground">
                                            Min. {product.min_quantity_b2b} pcs
                                        </span>
                                    )}
                                </div>
                            </DialogHeader>

                            <div className="prose prose-sm text-muted-foreground mb-6">
                                <p>{product.description || product.short_description || "Aucune description disponible pour ce produit."}</p>
                            </div>

                            <div className="space-y-3 p-4 bg-minart-50 rounded-xl mb-8 border border-minart-100">
                                <h4 className="font-semibold text-sm text-minart-900 uppercase tracking-wider mb-2">Détails de Fabrication</h4>
                                <div className="grid grid-cols-2 gap-y-2 text-sm">
                                    {product.sku && (
                                        <>
                                            <div className="text-muted-foreground">Référence:</div>
                                            <div className="font-medium text-right">{product.sku}</div>
                                        </>
                                    )}
                                    {product.dimensions && Object.keys(product.dimensions).length > 0 && (
                                        <>
                                            <div className="text-muted-foreground">Dimensions:</div>
                                            <div className="font-medium text-right">
                                                {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Button size="lg" className="w-full bg-minart-900 hover:bg-minart-800 text-white font-semibold py-6 shadow-xl gap-2 rounded-none uppercase tracking-wider text-sm" onClick={handleAddToQuote}>
                            <ClipboardList className="h-5 w-5" />
                            Ajouter à ma Sélection
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
