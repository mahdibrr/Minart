import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { QuoteSheet } from "@/components/b2b/quote-sheet";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function B2BHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-minart-800/50 bg-minart-950/90 backdrop-blur-md text-white shadow-sm transition-all duration-300">
            <div className="container flex h-16 md:h-20 max-w-screen-2xl items-center justify-between">
                <div className="mr-4 hidden md:flex items-center">
                    <Link href="/" className="mr-8 flex items-center group">
                        <div className="bg-white/95 rounded-md p-1.5 flex items-center justify-center shadow-sm group-hover:bg-white transition-colors">
                            <Image
                                src="/logo.png"
                                alt="Minart Logo"
                                width={64}
                                height={24}
                                className="w-10 sm:w-12 md:w-14 lg:w-16 h-auto object-contain transition-all duration-300"
                                priority
                            />
                        </div>
                    </Link>
                    <nav className="flex items-center gap-8 text-sm">
                        <Link href="/entreprise" className="relative transition-colors hover:text-contrast text-white/80 font-medium tracking-wider uppercase text-xs after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-contrast after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">À Propos De Nous</Link>
                        <Link href="/catalogue" className="relative transition-colors hover:text-contrast text-white/80 font-medium tracking-wider uppercase text-xs after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-contrast after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Catalogue</Link>
                        <Link href="/contact" className="relative transition-colors hover:text-contrast text-white/80 font-medium tracking-wider uppercase text-xs after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-contrast after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Contactez-nous</Link>
                    </nav>
                </div>

                {/* Mobile Menu & Logo */}
                <div className="md:hidden flex items-center gap-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 -ml-2 rounded-full h-10 w-10">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-minart-950 border-r-minart-800 text-white p-6">
                            <SheetTitle className="sr-only">Menu de Navigation</SheetTitle>
                            <div className="flex flex-col gap-8 mt-10">
                                <Link href="/" className="flex items-center">
                                    <div className="bg-white rounded-md p-1.5 inline-flex shadow-sm">
                                        <Image src="/logo.png" alt="Minart Logo" width={80} height={32} className="w-16 h-auto" />
                                    </div>
                                </Link>
                                <nav className="flex flex-col gap-6">
                                    <Link href="/entreprise" className="text-lg font-medium tracking-widest uppercase hover:text-contrast transition-colors border-b border-white/10 pb-4">À Propos De Nous</Link>
                                    <Link href="/catalogue" className="text-lg font-medium tracking-widest uppercase hover:text-contrast transition-colors border-b border-white/10 pb-4">Catalogue</Link>
                                    <Link href="/contact" className="text-lg font-medium tracking-widest uppercase hover:text-contrast transition-colors border-b border-white/10 pb-4">Demander un devis</Link>
                                </nav>
                                <div className="mt-auto pt-8 flex items-center gap-4 text-white/60">
                                    <span className="text-sm">Nous contacter : +216 56 688 434</span>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Link href="/" className="flex items-center">
                        <div className="bg-white/95 rounded-md p-1 flex items-center justify-center shadow-sm">
                            <Image
                                src="/logo.png"
                                alt="Minart Logo"
                                width={48}
                                height={20}
                                className="w-12 h-auto object-contain"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                <div className="flex items-center">
                    <QuoteSheet />
                </div>
            </div>
        </header>
    );
}
