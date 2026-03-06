import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-minart-900 text-white">
            <div className="container py-[15px]">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                    <div className="space-y-4">
                        <div className="bg-white rounded-lg p-1.5 inline-flex items-center justify-center shadow-sm">
                            <Image
                                src="/logo.png"
                                alt="Minart Logo"
                                width={80}
                                height={32}
                                className="w-20 md:w-24 h-auto object-contain"
                            />
                        </div>
                        <p className="text-white/70 leading-relaxed text-sm">
                            Cadeaux d'entreprise premium et excellence de fabrication depuis 2010.
                            Production locale sur-mesure à La Soukra, Tunis.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest text-contrast">Entreprise</h4>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li><Link href="/about" className="hover:text-contrast transition-colors">À Propos</Link></li>
                            <li><Link href="/contact" className="hover:text-contrast transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest text-contrast">Réseaux</h4>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li><a href="#" className="hover:text-contrast transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-contrast transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-contrast transition-colors">Facebook</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-minart-800 text-center text-xs text-white/50">
                    &copy; {new Date().getFullYear()} Minart. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
