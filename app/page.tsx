import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Factory, Shield, Truck, Users, MapPin, Phone, Star, CheckCircle2, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Elite B2B Design */}
      <section className="relative overflow-hidden bg-minart-950 text-white min-h-[85vh] flex items-center">
        {/* Background Image / Texture */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/atelier-workshop.jpg"
            alt="Atelier Minart Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-minart-900/80 mix-blend-multiply" />
        </div>

        {/* subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-minart-950 via-minart-950/90 to-transparent z-0" />

        <div className="container relative z-10 py-20 px-4 md:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-contrast/50 px-4 py-1.5 mb-8 text-contrast tracking-widest text-xs font-semibold uppercase">
              <Sparkles className="h-3 w-3" />
              <span>Savoir-Faire Artisanal & Premium</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6 leading-[1.1]">
              L'Art du Cadeau <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-contrast to-orange-200">
                d'Entreprise.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed font-light max-w-2xl">
              Minart conçoit et fabrique des articles en cuir sur-mesure pour sublimer votre marque. Excellence artisanale depuis 2010.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <Link href="/quote">
                <Button size="lg" className="h-14 bg-contrast hover:bg-contrast/90 text-minart-900 font-bold tracking-wider uppercase text-sm rounded-none px-10 border border-contrast transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  Demander un Devis
                </Button>
              </Link>
              <Link href="/catalogue">
                <Button size="lg" variant="outline" className="h-14 border-white/30 bg-transparent text-white hover:bg-white hover:text-minart-950 font-bold tracking-wider uppercase text-sm rounded-none px-10 transition-colors">
                  Explorer le Catalogue
                </Button>
              </Link>
            </div>

            {/* Premium Trust Bar */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t border-white/20">
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-serif text-contrast">25K+</span>
                <span className="text-sm font-medium tracking-wide text-white/60 uppercase">Pièces Livrées</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-serif text-contrast">500+</span>
                <span className="text-sm font-medium tracking-wide text-white/60 uppercase">Marques Clientes</span>
              </div>
              <div className="hidden md:flex flex-col gap-2">
                <span className="text-3xl font-serif text-contrast break-keep">100%</span>
                <span className="text-sm font-medium tracking-wide text-white/60 uppercase">Fabrication Locale</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clients / Trust Section */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-200">
        <div className="container px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-contrast uppercase mb-3">
              Ils nous font confiance
            </h2>
            <p className="text-muted-foreground">
              Partenaire de choix des institutions et entreprises exigeantes en Tunisie.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12">
            {/* Placeholder Text Logos for B2B Clients */}
            <div className="text-2xl font-serif font-bold text-neutral-400 uppercase tracking-widest transition-colors hover:text-minart-900 cursor-default">Banque Centrale</div>
            <div className="text-2xl font-serif font-bold text-neutral-400 uppercase tracking-widest transition-colors hover:text-minart-900 cursor-default">Groupe STB</div>
            <div className="text-2xl font-serif font-bold text-neutral-400 uppercase tracking-widest transition-colors hover:text-minart-900 cursor-default">Ooredoo</div>
            <div className="text-2xl font-serif font-bold text-neutral-400 uppercase tracking-widest transition-colors hover:text-minart-900 cursor-default">Tunisair</div>
            <div className="text-2xl font-serif font-bold text-neutral-400 uppercase tracking-widest transition-colors hover:text-minart-900 cursor-default">Hôtel Mövenpick</div>
            <div className="text-2xl font-serif font-bold text-neutral-400 uppercase tracking-widest transition-colors hover:text-minart-900 cursor-default">Biat</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-minart-950 text-white">
        <div className="container px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-contrast uppercase mb-3">
              Témoignages
            </h2>
            <h3 className="text-3xl md:text-4xl font-serif leading-tight max-w-2xl mx-auto">
              Ce que nos partenaires disent de nous.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="border border-white/10 p-8 hover:border-contrast/30 transition-colors">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-contrast text-contrast" />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-8 italic">
                "Minart a su capter l'essence de notre marque dans chaque détail. Les agendas personnalisés
                ont fait sensation auprès de nos clients VIP. Qualité irréprochable."
              </p>
              <div>
                <p className="font-semibold text-sm">Ahmed Ben Salah</p>
                <p className="text-white/50 text-xs uppercase tracking-wider">Directeur Marketing — Groupe STB</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="border border-white/10 p-8 hover:border-contrast/30 transition-colors">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-contrast text-contrast" />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-8 italic">
                "Une collaboration exceptionnelle pour nos coffrets de fin d'année.
                Le processus de personnalisation est fluide et le résultat toujours au-delà de nos attentes."
              </p>
              <div>
                <p className="font-semibold text-sm">Sonia Maalej</p>
                <p className="text-white/50 text-xs uppercase tracking-wider">Responsable Achats — Ooredoo Tunisie</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="border border-white/10 p-8 hover:border-contrast/30 transition-colors">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-contrast text-contrast" />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-8 italic">
                "Partenaire fiable depuis 3 ans. Minart comprend les exigences du secteur hôtelier.
                Leurs porte-documents en cuir sont devenus la signature de notre accueil."
              </p>
              <div>
                <p className="font-semibold text-sm">Karim Trabelsi</p>
                <p className="text-white/50 text-xs uppercase tracking-wider">Directeur Général — Hôtel Mövenpick</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section - Editorial B2B Style */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-sm font-bold tracking-widest text-contrast uppercase mb-3">
              Collection Corporate
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-minart-900 leading-tight max-w-3xl">
              L'excellence du cuir pour vos cadeaux d'affaires
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Article 1 - Agendas */}
            <div className="group relative">
              <div className="relative h-[400px] w-full overflow-hidden bg-minart-50 mb-6">
                <Image
                  src="/articles/article1.jpg"
                  alt="Agendas en cuir"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-contrast block mb-2">Populaire</span>
                <h3 className="text-xl font-serif text-minart-900 mb-3">
                  Agendas Personnalisés
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Une ligne professionnelle avec embossage de votre logo. Disponibles en cuir véritable ou simili-cuir.
                </p>
                <Link href="/catalogue" className="inline-flex items-center text-sm font-bold text-minart-900 hover:text-contrast transition-colors uppercase tracking-widest">
                  Découvrir <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Article 2 - Coffrets */}
            <div className="group relative">
              <div className="relative h-[400px] w-full overflow-hidden bg-minart-50 mb-6">
                <Image
                  src="/articles/article2.jpg"
                  alt="Coffrets personnalisés"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-minart-600 block mb-2">Premium</span>
                <h3 className="text-xl font-serif text-minart-900 mb-3">
                  Coffrets VIP
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Des coffrets sur-mesure combinant carnets, stylos et accessoires tech pour vos clients les plus prestigieux.
                </p>
                <Link href="/contact" className="inline-flex items-center text-sm font-bold text-minart-900 hover:text-contrast transition-colors uppercase tracking-widest">
                  Nous Contacter <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Article 3 - Porte-documents */}
            <div className="group relative">
              <div className="relative h-[400px] w-full overflow-hidden bg-minart-50 mb-6">
                <Image
                  src="/articles/article3.jpg"
                  alt="Porte-documents"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-contrast block mb-2">Nouveau</span>
                <h3 className="text-xl font-serif text-minart-900 mb-3">
                  Porte-Documents
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Conférenciers et cartables élégants. Une signature visuelle forte pour vos cadres et dirigeants.
                </p>
                <Link href="/quote" className="inline-flex items-center text-sm font-bold text-minart-900 hover:text-contrast transition-colors uppercase tracking-widest">
                  Demander un Devis <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Harmonious Dark */}
      <section className="bg-minart-800 text-white py-24 border-b border-minart-800">
        <div className="container px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 border border-white/10 p-12 md:p-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Discutons de votre projet de cadeaux de fin d'année.
              </h2>
              <p className="text-xl opacity-80 mb-8 font-light max-w-xl">
                Demandez un devis personnalisé. Nous produisons des maquettes sur-mesure intégrant votre identité visuelle.
              </p>

              <div className="flex items-center gap-8 pt-6 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-contrast" />
                  <span className="font-semibold tracking-wide">+216 56 688 434</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-contrast" />
                  <span className="font-semibold tracking-wide">La Soukra, Tunis</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link href="/contact">
                <Button size="lg" className="h-16 bg-white text-minart-900 hover:bg-contrast hover:text-white hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] font-bold tracking-wider uppercase text-sm rounded-none px-12 transition-all">
                  Nous Contacter <ArrowRight className="h-5 w-5 ml-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}