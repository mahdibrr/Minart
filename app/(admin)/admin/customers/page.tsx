import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Building2, User, CheckCircle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function getCustomersData() {
  const supabase = await createClient();

  const [
    { data: customers },
    { count: totalCount },
    { count: b2bCount },
    { count: b2cCount },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("role", "client")
      .order("created_at", { ascending: false }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "client"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "client").eq("is_b2b_verified", true),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "client").eq("is_b2b_verified", false),
  ]);

  return {
    customers: customers || [],
    stats: {
      total: totalCount || 0,
      b2b: b2bCount || 0,
      b2c: b2cCount || 0,
    },
  };
}

export default async function AdminCustomersPage() {
  const { customers, stats } = await getCustomersData();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold text-minart-900">Gestion des Clients</h1>
          <Link href="/admin">
            <Button variant="outline">Retour au Tableau de Bord</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-minart-500">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Clients</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-500">{stats.b2b}</div>
              <div className="text-sm text-muted-foreground">Clients B2B Vérifiés</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-500">{stats.b2c}</div>
              <div className="text-sm text-muted-foreground">Clients B2C</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des Clients ({customers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {customers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Aucun client trouvé
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Client</th>
                      <th className="text-left p-4 font-medium">Entreprise</th>
                      <th className="text-left p-4 font-medium">Téléphone</th>
                      <th className="text-left p-4 font-medium">Membre depuis</th>
                      <th className="text-left p-4 font-medium">Statut B2B</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer: any) => (
                      <tr key={customer.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              customer.is_b2b_verified ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
                            }`}>
                              {customer.is_b2b_verified ? <Building2 className="h-5 w-5" /> : <User className="h-5 w-5" />}
                            </div>
                            <div>
                              <div className="font-medium">{customer.full_name || "N/A"}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {customer.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">{customer.company_name || "-"}</td>
                        <td className="p-4 text-muted-foreground">{customer.phone || "-"}</td>
                        <td className="p-4 text-muted-foreground">
                          {new Date(customer.created_at).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="p-4">
                          {customer.is_b2b_verified ? (
                            <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                              <CheckCircle className="h-3 w-3" />
                              Vérifié
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                              Standard
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
