import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Factory, Shield, Truck, MapPin, Phone, Star, Sparkles, Building2, HardHat, PackageSearch } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Elite B2B Design */}
      <section className="relative overflow-hidden bg-minart-950 text-white min-h-[90vh] flex items-center">
        {/* Background Image - Clean Desk Leather */}
        <div className="absolute inset-0 z-0 opacity-50">
          <Image
            src="/images/b2b/b2b_hero_bg_sharp.png"
            alt="Atelier Minart Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-minart-900/40 mix-blend-multiply" />
        </div>

        {/* subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-minart-950/90 via-minart-950/60 to-transparent z-0" />

        <div className="container relative z-10 py-20 px-4 md:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-contrast/50 px-4 py-1.5 mb-8 text-contrast tracking-widest text-xs font-semibold uppercase bg-minart-950/50 backdrop-blur-sm">
              <Sparkles className="h-3 w-3" />
              <span>Savoir-Faire Artisanal & Corporate</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6 leading-[1.1]">
              L'Art du Cadeau <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-contrast to-orange-200">
                d'Entreprise.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed font-light max-w-2xl">
              Minart conçoit et fabrique des articles en cuir sur-mesure pour sublimer l'image de votre société. Excellence artisanale depuis 2010.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <Link href="/quote">
                <Button size="lg" className="h-14 w-full sm:w-auto bg-contrast hover:bg-contrast/90 text-minart-900 font-bold tracking-wider uppercase text-sm rounded-none px-10 border border-contrast transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  Demander un Devis
                </Button>
              </Link>
              <Link href="/catalogue">
                <Button size="lg" variant="outline" className="h-14 w-full sm:w-auto border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-minart-950 font-bold tracking-wider uppercase text-sm rounded-none px-10 transition-colors">
                  Explorer le Catalogue
                </Button>
              </Link>
            </div>

            {/* Premium Trust Bar */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t border-white/20">
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-serif text-contrast">Livr.</span>
                <span className="text-sm font-medium tracking-wide text-white/60 uppercase">En Gros</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-serif text-contrast">Sur-Mesure</span>
                <span className="text-sm font-medium tracking-wide text-white/60 uppercase">Embossage B2B</span>
              </div>
              <div className="hidden md:flex flex-col gap-2">
                <span className="text-3xl font-serif text-contrast break-keep">100%</span>
                <span className="text-sm font-medium tracking-wide text-white/60 uppercase">Fabrication Locale</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clients / Trust Section - B2B */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-200 overflow-hidden relative">
        <div className="container px-4 md:px-8 mb-10">
          <div className="text-center">
            <h2 className="text-sm font-bold tracking-widest text-minart-700 uppercase mb-3">
              Ils nous font confiance
            </h2>
            <p className="text-muted-foreground">
              Partenaire de choix des institutions et entreprises exigeantes.
            </p>
          </div>
        </div>

        {/* Simple Marquee Implementation */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4">
            <span className="text-2xl font-serif font-bold text-neutral-300 uppercase tracking-widest hover:text-minart-900 transition-colors cursor-default mx-8">Groupe Financier</span>
            <span className="text-2xl font-serif font-bold text-neutral-300 uppercase tracking-widest hover:text-minart-900 transition-colors cursor-default mx-8">Opérateur Télécom</span>
            <span className="text-2xl font-serif font-bold text-neutral-300 uppercase tracking-widest hover:text-minart-900 transition-colors cursor-default mx-8">Hôtellerie de Luxe</span>
            <span className="text-2xl font-serif font-bold text-neutral-300 uppercase tracking-widest hover:text-minart-900 transition-colors cursor-default mx-8">Compagnie Aérienne</span>
            <span className="text-2xl font-serif font-bold text-neutral-300 uppercase tracking-widest hover:text-minart-900 transition-colors cursor-default mx-8">Industrie Auto</span>
            <span className="text-2xl font-serif font-bold text-neutral-300 uppercase tracking-widest hover:text-minart-900 transition-colors cursor-default mx-8">Banque Centrale</span>
          </div>
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4 absolute top-0">
            <span className="text-2xl font-serif font-bold text-neutral-300 uppercase tracking-widest hover:text-minart-900 transition-colors cursor-default mx-8">Groupe Financier</span>
            <span className="text-2xl font-serif font-bold text-neutral-300 uppercase tracking-widest hover:text-minart-900 transition-colors cursor-default mx-8">Opérateur Télécom</span>
            <span className="text-2xl font-serif font-bold text-neutral-300 uppercase tracking-widest hover:text-minart-900 transition-colors cursor-default mx-8">Hôtellerie de Luxe</span>
            <span className="text-2xl font-serif font-bold text-neutral-300 uppercase tracking-widest hover:text-minart-900 transition-colors cursor-default mx-8">Compagnie Aérienne</span>
            <span className="text-2xl font-serif font-bold text-neutral-300 uppercase tracking-widest hover:text-minart-900 transition-colors cursor-default mx-8">Industrie Auto</span>
            <span className="text-2xl font-serif font-bold text-neutral-300 uppercase tracking-widest hover:text-minart-900 transition-colors cursor-default mx-8">Banque Centrale</span>
          </div>
        </div>
      </section>

      {/* Categories / Catalog B2B */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-8">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-sm font-bold tracking-widest text-contrast uppercase mb-3 px-4 py-1 bg-minart-50 text-minart-900 rounded-full">
              Sélection Corporate
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-minart-950 leading-tight max-w-3xl">
              Solutions d'Affaires
            </h2>
            <p className="mt-6 text-muted-foreground max-w-2xl text-lg">
              Des produits vierges prêts à accueillir votre marque. Nous personnalisons chaque pièce en série pour vos collaborateurs et partenaires.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Main Featured Category */}
            <div className="group relative bg-minart-50 p-8 md:p-12 overflow-hidden flex flex-col justify-end min-h-[500px]">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/b2b/leather_agendas.png"
                  alt="Agendas en cuir B2B"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-minart-950/90 via-minart-900/40 to-transparent z-10" />
              </div>
              
              <div className="relative z-20 text-white mt-auto">
                <div className="mb-4 inline-block bg-contrast text-minart-900 text-xs font-bold px-3 py-1 uppercase tracking-widest">
                  Best Seller Corporate
                </div>
                <h3 className="text-3xl font-serif mb-4 text-white">Agendas d'Entreprise</h3>
                <p className="text-white/80 mb-8 max-w-md font-light leading-relaxed">
                  Finition premium en cuir véritable. Parfait pour les commandes en volume. Estampage thermique de votre logo disponible.
                </p>
                <Link href="/catalogue/agendas">
                  <Button className="bg-white text-minart-900 hover:bg-contrast rounded-none px-8 font-bold uppercase tracking-wider text-xs">
                    Voir les Modèles <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-12">
              {/* Secondary Category 1 */}
              <div className="group relative bg-minart-50 overflow-hidden flex-1 min-h-[250px] flex items-center">
                <div className="absolute inset-0 z-0 w-1/2">
                   <div className="absolute inset-0 bg-minart-900 z-10 opacity-10 mix-blend-multiply" />
                   <Image
                    src="/images/b2b/vip_gift_box.png"
                    alt="Coffrets VIP"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Fade gradient to blend with text area */}
                  <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-20" />
                </div>
                
                <div className="relative z-20 w-1/2 ml-auto p-8 md:p-12 bg-white flex flex-col justify-center h-full">
                  <h3 className="text-2xl font-serif mb-3 text-minart-950">Coffrets VIP</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    Compositions sur-mesure combinant différents articles pour des cadeaux prestiges.
                  </p>
                  <Link href="/catalogue/coffrets" className="text-sm font-bold text-minart-800 hover:text-contrast transition-colors uppercase tracking-widest flex items-center w-max">
                    Découvrir <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>

               {/* Secondary Category 2 */}
               <div className="group relative bg-minart-950 overflow-hidden flex-1 min-h-[250px] flex items-center">
                <div className="absolute inset-0 z-0 opacity-40">
                  <Image
                    src="/images/atelier-workshop.jpg"
                    alt="Production en Gros"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale"
                  />
                </div>
                
                <div className="relative z-20 w-full p-8 md:p-12 text-center text-white flex flex-col items-center justify-center">
                  <PackageSearch className="h-10 w-10 text-contrast mb-4" />
                  <h3 className="text-2xl font-serif mb-3">Commande en Gros</h3>
                  <p className="text-white/70 text-sm mb-6 max-w-sm leading-relaxed">
                    Tarifs dégressifs et production à grande échelle pour vos événements d'entreprise.
                  </p>
                  <Link href="/quote">
                    <Button variant="outline" className="border-contrast text-contrast hover:bg-contrast hover:text-minart-950 rounded-none bg-transparent font-bold uppercase tracking-wider text-xs">
                      Obtenir les Tarifs
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - B2B Process Step by Step */}
      <section className="py-24 bg-minart-50 border-y border-minart-100 text-minart-950">
         <div className="container px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-contrast uppercase mb-3">
              Notre Processus
            </h2>
            <h3 className="text-3xl md:text-4xl font-serif leading-tight max-w-2xl mx-auto text-minart-900">
              De l'idée à la production en série.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 border border-neutral-100 shadow-sm relative group hover:border-minart-300 transition-colors">
              <div className="text-6xl font-serif font-bold text-minart-50 absolute top-4 right-4 z-0 group-hover:text-minart-100 transition-colors">1</div>
              <div className="relative z-10">
                <div className="h-12 w-12 bg-minart-100 text-minart-800 flex items-center justify-center mb-6">
                  <Phone className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-bold mb-3 text-minart-950">Consultation</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Nous discutons de vos besoins, de vos quantités et de votre budget pour trouver la meilleure option corporate.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 border border-neutral-100 shadow-sm relative group hover:border-minart-300 transition-colors">
              <div className="text-6xl font-serif font-bold text-minart-50 absolute top-4 right-4 z-0 group-hover:text-minart-100 transition-colors">2</div>
              <div className="relative z-10">
                <div className="h-12 w-12 bg-minart-100 text-minart-800 flex items-center justify-center mb-6">
                  <Building2 className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-bold mb-3 text-minart-950">Maquettage</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Création de maquettes virtuelles avec votre logo embossé pour validation visuelle avant toute production.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 border border-neutral-100 shadow-sm relative group hover:border-minart-300 transition-colors">
              <div className="text-6xl font-serif font-bold text-minart-50 absolute top-4 right-4 z-0 group-hover:text-minart-100 transition-colors">3</div>
              <div className="relative z-10">
                <div className="h-12 w-12 bg-minart-100 text-minart-800 flex items-center justify-center mb-6">
                  <Factory className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-bold mb-3 text-minart-950">Production</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Lancement de la production en série dans nos propres ateliers en Tunisie.
                </p>
              </div>
            </div>

             {/* Step 4 */}
             <div className="bg-white p-8 border border-neutral-100 shadow-sm relative group hover:border-minart-300 transition-colors">
              <div className="text-6xl font-serif font-bold text-minart-50 absolute top-4 right-4 z-0 group-hover:text-minart-100 transition-colors">4</div>
              <div className="relative z-10">
                <div className="h-12 w-12 bg-minart-100 text-minart-800 flex items-center justify-center mb-6">
                  <Truck className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-bold mb-3 text-minart-950">Livraison</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Livraison sécurisée de vos articles personnalisés prêts à être offerts.
                </p>
              </div>
            </div>
          </div>
         </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-minart-950 text-white relative">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-contrast uppercase mb-3">
                Témoignage
              </h2>
              <h3 className="text-3xl md:text-5xl font-serif leading-tight mb-8">
                 "Une réactivité exceptionnelle pour des volumes importants."
              </h3>
              <p className="text-white/70 text-lg leading-relaxed mb-8 font-light italic border-l-2 border-contrast pl-6 py-2">
                "Minart a su gérer notre commande de 2500 coffrets VIP en un temps record. La qualité de l'embossage de notre logo est irréprochable et la finition du cuir est parfaite."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-white/10 rounded-full flex items-center justify-center font-serif text-xl border border-contrast/50">M</div>
                <div>
                   <p className="font-bold text-base">Directeur des Achats</p>
                   <p className="text-white/50 text-xs uppercase tracking-widest mt-1">Secteur Bancaire</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              {/* Stats Cards */}
               <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm sm:translate-y-12 hover:bg-white/10 transition-colors">
                 <Shield className="h-8 w-8 text-contrast mb-4" />
                 <h4 className="text-4xl font-serif text-white mb-2">15+</h4>
                 <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Années d'Expertise</p>
               </div>
               <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
                 <HardHat className="h-8 w-8 text-contrast mb-4" />
                 <h4 className="text-4xl font-serif text-white mb-2">Locaux</h4>
                 <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Ateliers en Tunisie</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Harmonious Dark */}
      <section className="bg-minart-900 text-white py-24 border-b border-minart-800">
        <div className="container px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 border border-white/10 p-10 md:p-16 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-contrast/5 rounded-full blur-3xl" />

            <div className="max-w-2xl relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Équipez votre entreprise avec l'excellence Minart.
              </h2>
              <p className="text-xl opacity-80 mb-8 font-light max-w-xl">
                Demandez un devis personnalisé pour vos commandes en volume. Nous répondons en moins de 24h ouvrées.
              </p>

              <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-white/10">
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

            <div className="flex-shrink-0 relative z-10">
              <Link href="/quote">
                <Button size="lg" className="h-[72px] bg-contrast text-minart-900 hover:bg-white hover:text-minart-950 shadow-[0_0_40px_rgba(212,175,55,0.2)] font-bold tracking-wider uppercase text-sm rounded-none px-12 transition-all">
                  Demander un Devis <ArrowRight className="h-5 w-5 ml-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}