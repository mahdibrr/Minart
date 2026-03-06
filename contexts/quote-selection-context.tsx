"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types";
import { toast } from "sonner";

export interface QuoteSelectionItem {
    product: Product;
    quantity: number;
    customization: string;
}

interface QuoteSelectionContextType {
    items: QuoteSelectionItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    updateCustomization: (productId: string, text: string) => void;
    clearSelection: () => void;
    totalItems: number;
}

const QuoteSelectionContext = createContext<QuoteSelectionContextType | undefined>(undefined);

export function QuoteSelectionProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<QuoteSelectionItem[]>([]);

    // Hydrate from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem("minart-quote-selection");
        if (stored) {
            try {
                setItems(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse quote selection", e);
            }
        }
    }, []);

    // Persist to local storage
    useEffect(() => {
        localStorage.setItem("minart-quote-selection", JSON.stringify(items));
    }, [items]);

    const addItem = (product: Product, quantity: number = 1) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                toast.success(`${product.name} est déjà dans votre sélection`);
                return prev;
            }
            toast.success(`${product.name} ajouté à votre sélection de devis`);
            return [...prev, { product, quantity, customization: "" }];
        });
    };

    const removeItem = (productId: string) => {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
        toast.info("Produit retiré de la sélection");
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

    const updateCustomization = (productId: string, text: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.product.id === productId ? { ...item, customization: text } : item
            )
        );
    };

    const clearSelection = () => {
        setItems([]);
    };

    const totalItems = items.length;

    return (
        <QuoteSelectionContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, updateCustomization, clearSelection, totalItems }}
        >
            {children}
        </QuoteSelectionContext.Provider>
    );
}

export function useQuoteSelection() {
    const context = useContext(QuoteSelectionContext);
    if (context === undefined) {
        throw new Error("useQuoteSelection must be used within a QuoteSelectionProvider");
    }
    return context;
}
