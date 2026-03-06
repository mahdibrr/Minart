"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { CartSheet } from "@/components/b2c/cart-sheet";


export function B2CHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-20 max-w-screen-2xl items-center justify-between">
                <div className="mr-4 flex items-center">
                    {/* Mobile Menu */}
                    <Button variant="ghost" size="icon" className="md:hidden mr-2">
                        <Menu className="h-5 w-5" />
                    </Button>

                    <Link href="/" className="mr-8 flex items-center">
                        <Image 
                            src="/Minartlogo.png" 
                            alt="Minart" 
                            width={180} 
                            height={60}
                            className="h-14 w-auto object-contain"
                            priority
                        />
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link href="/category/new" className="transition-colors hover:text-minart-500">Nouveautés</Link>
                        <Link href="/category/bags" className="transition-colors hover:text-minart-500">Sacs</Link>
                        <Link href="/category/accessories" className="transition-colors hover:text-minart-500">Accessoires</Link>
                        <Link href="/category/office" className="transition-colors hover:text-minart-500">Bureau</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                    </Button>
                    <CartSheet />
                </div>
            </div>
        </header>
    );
}
