"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types";
import { toast } from "sonner";

// Simplified cart item for client-side use
interface ClientCartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    items: ClientCartItem[];
    addItem: (product: Product, quantity: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<ClientCartItem[]>([]);

    // Hydrate from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem("minart-b2c-cart");
        if (stored) {
            try {
                setItems(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Persist to local storage
    useEffect(() => {
        localStorage.setItem("minart-b2c-cart", JSON.stringify(items));
    }, [items]);

    const addItem = (product: Product, quantity: number) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                toast.success(`Quantité mise à jour pour ${product.name}`);
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            toast.success(`${product.name} ajouté au panier`);
            return [...prev, { product, quantity }];
        });
    };

    const removeItem = (productId: string) => {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
        toast.info("Article retiré du panier");
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
