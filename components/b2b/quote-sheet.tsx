"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useQuoteSelection } from "@/contexts/quote-selection-context";
import { ClipboardList, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function QuoteSheet() {
    const { items, removeItem, updateQuantity, totalItems } = useQuoteSelection();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white/80 hover:text-white hover:bg-white/10 rounded-full h-11 w-11">
                    <ClipboardList className="h-6 w-6" />
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-contrast text-minart-950 text-[10px] font-bold flex items-center justify-center rounded-full">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md bg-white">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle className="text-minart-900 font-serif">Sélection pour Devis</SheetTitle>
                    <SheetDescription>
                        {items.length === 0
                            ? "Aucun produit sélectionné"
                            : `${items.length} produit${items.length > 1 ? "s" : ""} sélectionné${items.length > 1 ? "s" : ""}`
                        }
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4">
                    {items.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                            <ClipboardList className="h-12 w-12 opacity-20" />
                            <p className="text-center text-sm">Parcourez le catalogue et ajoutez des produits à votre sélection pour demander un devis.</p>
                            <SheetClose asChild>
                                <Link href="/catalogue">
                                    <Button variant="outline" size="sm" className="text-xs uppercase tracking-wider">
                                        Voir le Catalogue
                                    </Button>
                                </Link>
                            </SheetClose>
                        </div>
                    )}

                    <ul className="space-y-4">
                        {items.map((item) => (
                            <li key={item.product.id} className="flex gap-3 border-b border-neutral-100 pb-4">
                                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-neutral-50">
                                    {item.product.images[0] && (
                                        <Image
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col min-w-0">
                                    <h3 className="text-sm font-semibold text-minart-900 line-clamp-1">{item.product.name}</h3>
                                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                        {item.product.short_description || item.product.description?.substring(0, 50)}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-1 border border-neutral-200 rounded">
                                            <button
                                                className="p-1 hover:bg-neutral-100 transition-colors"
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                                            <button
                                                className="p-1 hover:bg-neutral-100 transition-colors"
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            className="text-red-400 hover:text-red-600 transition-colors"
                                            onClick={() => removeItem(item.product.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {items.length > 0 && (
                    <SheetFooter className="border-t pt-4 flex-col gap-3">
                        <p className="text-xs text-muted-foreground text-center">
                            Finalisez votre sélection et recevez un devis personnalisé sous 24h.
                        </p>
                        <SheetClose asChild>
                            <Link href="/quote" className="w-full">
                                <Button className="w-full bg-minart-900 hover:bg-minart-800 text-white rounded-none uppercase tracking-wider text-xs font-bold h-12">
                                    Demander un Devis <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link href="/catalogue" className="w-full">
                                <Button variant="outline" className="w-full rounded-none uppercase tracking-wider text-xs h-10">
                                    Continuer la sélection
                                </Button>
                            </Link>
                        </SheetClose>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}
