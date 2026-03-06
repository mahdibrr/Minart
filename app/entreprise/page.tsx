import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Award, Users, Target, TrendingUp } from "lucide-react";

export default function EntreprisePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-minart-50 to-white py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-minart-900 mb-6">
              À Propos de Minart
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Depuis 2010, nous créons des articles en cuir de qualité supérieure pour les entreprises tunisiennes et internationales.
            </p>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-minart-900 mb-6">Notre Histoire</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Fondée en 2010 à La Soukra, Tunis, Minart est née de la passion pour l'artisanat du cuir et le désir de créer des produits d'exception pour les entreprises.
                </p>
                <p>
                  Au fil des années, nous avons développé notre expertise dans la fabrication d'articles promotionnels et de bureau personnalisés, tout en maintenant notre engagement envers la qualité et l'excellence.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers de servir des centaines d'entreprises en Tunisie et à l'international, en offrant des solutions sur mesure qui reflètent l'identité de chaque client.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden bg-minart-100">
              <div className="absolute inset-0 flex items-center justify-center text-minart-300">
                <Award className="h-32 w-32" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20 bg-gradient-to-b from-white to-minart-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-minart-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident notre travail au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-minart-100 text-minart-500 mb-6">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-minart-900 mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                Nous visons l'excellence dans chaque détail de nos créations
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-minart-100 text-minart-500 mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-minart-900 mb-3">Collaboration</h3>
              <p className="text-muted-foreground">
                Nous travaillons en étroite collaboration avec nos clients
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-minart-100 text-minart-500 mb-6">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-minart-900 mb-3">Précision</h3>
              <p className="text-muted-foreground">
                Chaque produit est fabriqué avec précision et attention
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-minart-100 text-minart-500 mb-6">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-minart-900 mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                Nous innovons constamment pour répondre aux besoins du marché
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres Clés */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-minart-900 mb-4">
              Minart en Chiffres
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-minart-500 mb-2">15+</div>
              <div className="text-muted-foreground">Années d'expérience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-minart-500 mb-2">500+</div>
              <div className="text-muted-foreground">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-minart-500 mb-2">10K+</div>
              <div className="text-muted-foreground">Produits fabriqués</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-minart-500 mb-2">100%</div>
              <div className="text-muted-foreground">Made in Tunisia</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-minart-500 to-minart-600">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à Collaborer avec Nous?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Découvrez comment nous pouvons vous aider à créer des produits uniques pour votre entreprise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-minart-600 hover:bg-gray-100 font-semibold px-8">
                  Nous Contacter
                </Button>
              </Link>
              <Link href="/catalogue">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white">
                  Voir le Catalogue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}