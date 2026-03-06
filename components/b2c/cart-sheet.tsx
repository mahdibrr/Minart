"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useCart } from "@/contexts/cart-context";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartSheet() {
    const { items, removeItem, updateQuantity, subtotal } = useCart();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="relative gap-2 border-minart-200 hover:bg-minart-50">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Panier</span>
                    {items.length > 0 && (
                        <span className="absolute -top-2 -right-2 h-5 w-5 bg-minart-500 text-white text-xs flex items-center justify-center rounded-full">
                            {items.length}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Panier d'Achat</SheetTitle>
                    <SheetDescription>
                        {items.length === 0 ? "Votre panier est vide" : `Vous avez ${items.length} articles dans votre panier`}
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4">
                    {items.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                            <ShoppingBag className="h-12 w-12 opacity-20" />
                            <p>Commencez vos achats pour ajouter des articles</p>
                            <SheetClose asChild>
                                <Button variant="outline">Parcourir la Boutique</Button>
                            </SheetClose>
                        </div>
                    )}

                    <ul className="space-y-4">
                        {items.map((item) => (
                            <li key={item.product.id} className="flex gap-4 border-b pb-4">
                                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-neutral-100">
                                    {item.product.images[0] && (
                                        <Image
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <div className="flex justify-between text-base font-medium">
                                        <h3 className="line-clamp-1">{item.product.name}</h3>
                                        <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">{item.product.description?.substring(0, 30)}...</p>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex items-center gap-2 border rounded-md">
                                            <button
                                                className="p-1 hover:bg-neutral-100"
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="w-4 text-center">{item.quantity}</span>
                                            <button
                                                className="p-1 hover:bg-neutral-100"
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            className="font-medium text-red-500 hover:text-red-400"
                                            onClick={() => removeItem(item.product.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {items.length > 0 && (
                    <SheetFooter className="border-t pt-4 sm:flex-col sm:space-x-0">
                        <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                            <p>Sous-total</p>
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <SheetClose asChild>
                            <Link href="/checkout" className="w-full">
                                <Button className="w-full bg-minart-500 hover:bg-minart-600 text-white">
                                    Commander
                                </Button>
                            </Link>
                        </SheetClose>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}
