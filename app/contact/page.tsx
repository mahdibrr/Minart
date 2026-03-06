import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-minart-50 to-white py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-minart-900 mb-6">
              Contactez-Nous
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et discuter de vos projets.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-minart-900 mb-8">Nos Coordonnées</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-minart-100 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-minart-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-minart-900 mb-1">Adresse</h3>
                    <p className="text-muted-foreground">
                      La Soukra, Tunis<br />
                      Tunisie
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-minart-100 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-minart-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-minart-900 mb-1">Téléphone</h3>
                    <p className="text-muted-foreground">
                      +216 XX XXX XXX
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-minart-100 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-minart-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-minart-900 mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      contact@Minartdesign.tn
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-minart-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-minart-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-minart-900 mb-1">Horaires</h3>
                    <p className="text-muted-foreground">
                      Lundi - Vendredi: 9h00 - 18h00<br />
                      Samedi: 9h00 - 13h00<br />
                      Dimanche: Fermé
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 rounded-2xl bg-minart-50">
                <h3 className="font-semibold text-minart-900 mb-3">Commande Personnalisée?</h3>
                <p className="text-muted-foreground mb-4">
                  Pour une réponse plus rapide concernant vos besoins en articles personnalisés, laissez-nous un message détaillé.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl border border-border p-8">
                <h2 className="text-2xl font-bold text-minart-900 mb-6">Envoyez-nous un Message</h2>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" placeholder="Votre prénom" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" placeholder="Votre nom" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="votre@email.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" placeholder="+216 XX XXX XXX" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Entreprise (optionnel)</Label>
                    <Input id="company" placeholder="Nom de votre entreprise" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Décrivez votre projet ou posez votre question..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-contrast hover:bg-contrast/90 text-white">
                    Envoyer le Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
