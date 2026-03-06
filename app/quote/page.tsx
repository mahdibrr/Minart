"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuoteSelection } from "@/contexts/quote-selection-context";
import { ClipboardList, Trash2, Minus, Plus, ArrowRight, CheckCircle2, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function QuotePage() {
    const { items, removeItem, updateQuantity, updateCustomization, clearSelection } = useQuoteSelection();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would send the data to Supabase or an API
        setSubmitted(true);
        clearSelection();
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
                <div className="bg-contrast/10 rounded-full p-6 mb-8">
                    <CheckCircle2 className="h-16 w-16 text-contrast" />
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-minart-900 mb-4">
                    Demande Envoyée !
                </h1>
                <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
                    Merci pour votre demande de devis. Notre équipe vous contactera sous 24h
                    avec une proposition personnalisée.
                </p>
                <Link href="/">
                    <Button className="bg-minart-900 hover:bg-minart-800 text-white rounded-none uppercase tracking-wider text-sm px-8 h-12">
                        Retour à l'Accueil
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            {/* Hero */}
            <section className="bg-minart-950 text-white py-16">
                <div className="container px-4 md:px-8">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                            Demander un Devis
                        </h1>
                        <p className="text-white/70 text-lg">
                            Remplissez le formulaire ci-dessous avec vos besoins.
                            Notre équipe vous répondra sous 24 heures.
                        </p>
                    </div>
                </div>
            </section>

            {/* Form + Selection */}
            <section className="py-16 bg-neutral-50">
                <div className="container px-4 md:px-8">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Left: Form */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Company Info */}
                                <div className="bg-white p-8 border border-neutral-200">
                                    <h2 className="text-xl font-serif font-bold text-minart-900 mb-6 pb-4 border-b">
                                        Informations de l'Entreprise
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="company" className="text-xs uppercase tracking-wider font-semibold">Nom de l'entreprise *</Label>
                                            <Input id="company" placeholder="Votre entreprise" required className="rounded-none border-neutral-300" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="contact" className="text-xs uppercase tracking-wider font-semibold">Personne de contact *</Label>
                                            <Input id="contact" placeholder="Nom et prénom" required className="rounded-none border-neutral-300" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-xs uppercase tracking-wider font-semibold">Email professionnel *</Label>
                                            <Input id="email" type="email" placeholder="contact@entreprise.tn" required className="rounded-none border-neutral-300" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-xs uppercase tracking-wider font-semibold">Téléphone *</Label>
                                            <Input id="phone" type="tel" placeholder="+216 XX XXX XXX" required className="rounded-none border-neutral-300" />
                                        </div>
                                    </div>
                                </div>

                                {/* Project Details */}
                                <div className="bg-white p-8 border border-neutral-200">
                                    <h2 className="text-xl font-serif font-bold text-minart-900 mb-6 pb-4 border-b">
                                        Détails du Projet
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="description" className="text-xs uppercase tracking-wider font-semibold">Description de votre besoin</Label>
                                            <Textarea
                                                id="description"
                                                placeholder="Décrivez votre projet : type de produits souhaités, quantités estimées, personnalisation (logo, couleurs, matériaux), délais..."
                                                rows={5}
                                                className="rounded-none border-neutral-300 resize-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs uppercase tracking-wider font-semibold">Logo de votre entreprise (optionnel)</Label>
                                            <div className="border-2 border-dashed border-neutral-300 p-8 text-center hover:border-contrast transition-colors cursor-pointer">
                                                <Upload className="h-8 w-8 mx-auto mb-3 text-neutral-400" />
                                                <p className="text-sm text-muted-foreground">
                                                    Glissez votre logo ici ou <span className="text-contrast font-semibold">cliquez pour parcourir</span>
                                                </p>
                                                <p className="text-xs text-neutral-400 mt-1">PNG, SVG, AI, PDF — Max 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit */}
                                <Button type="submit" className="w-full bg-minart-900 hover:bg-minart-800 text-white rounded-none uppercase tracking-wider text-sm font-bold h-14">
                                    Envoyer la Demande de Devis <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </div>

                            {/* Right: Selected Products */}
                            <div className="lg:col-span-1">
                                <div className="bg-white border border-neutral-200 sticky top-24">
                                    <div className="p-6 border-b border-neutral-200 bg-minart-950 text-white">
                                        <div className="flex items-center gap-3">
                                            <ClipboardList className="h-5 w-5" />
                                            <h2 className="text-lg font-serif font-bold">
                                                Votre Sélection
                                            </h2>
                                        </div>
                                        <p className="text-white/60 text-sm mt-1">
                                            {items.length === 0
                                                ? "Aucun produit sélectionné"
                                                : `${items.length} produit${items.length > 1 ? "s" : ""}`
                                            }
                                        </p>
                                    </div>

                                    {items.length === 0 ? (
                                        <div className="p-8 text-center">
                                            <ClipboardList className="h-10 w-10 mx-auto mb-4 text-neutral-300" />
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Vous pouvez aussi demander un devis sans sélectionner de produits.
                                            </p>
                                            <Link href="/catalogue">
                                                <Button variant="outline" size="sm" className="rounded-none uppercase tracking-wider text-xs">
                                                    Parcourir le catalogue
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div>
                                            <ul className="divide-y divide-neutral-100">
                                                {items.map((item) => (
                                                    <li key={item.product.id} className="p-4">
                                                        <div className="flex gap-3">
                                                            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden bg-neutral-50 border">
                                                                {item.product.images[0] && (
                                                                    <Image
                                                                        src={item.product.images[0]}
                                                                        alt={item.product.name}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                )}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="text-sm font-semibold text-minart-900 line-clamp-1">{item.product.name}</h3>
                                                                <div className="flex items-center justify-between mt-2">
                                                                    <div className="flex items-center gap-1 border border-neutral-200">
                                                                        <button type="button" className="p-1 hover:bg-neutral-100" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                                                                            <Minus className="h-3 w-3" />
                                                                        </button>
                                                                        <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                                                                        <button type="button" className="p-1 hover:bg-neutral-100" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                                                                            <Plus className="h-3 w-3" />
                                                                        </button>
                                                                    </div>
                                                                    <button type="button" className="text-red-400 hover:text-red-600" onClick={() => removeItem(item.product.id)}>
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            placeholder="Note (ex: graver logo, couleur...)"
                                                            value={item.customization}
                                                            onChange={(e) => updateCustomization(item.product.id, e.target.value)}
                                                            className="w-full mt-2 text-xs border border-neutral-200 px-2 py-1.5 placeholder:text-neutral-400 focus:outline-none focus:border-contrast"
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
