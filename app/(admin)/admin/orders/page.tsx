import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock, Package } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function getOrdersData() {
  const supabase = await createClient();

  const [
    { data: orders },
    { count: pendingCount },
    { count: processingCount },
    { count: shippedCount },
    { count: completedCount },
    { count: cancelledCount },
  ] = await Promise.all([
    supabase
      .from("orders")
      .select("*, profiles(full_name, email)")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "processing"),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "shipped"),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "completed"),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "cancelled"),
  ]);

  return {
    orders: orders || [],
    stats: {
      pending: pendingCount || 0,
      processing: processingCount || 0,
      shipped: shippedCount || 0,
      completed: completedCount || 0,
      cancelled: cancelledCount || 0,
    },
  };
}

const statusMap: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "En attente", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  processing: { label: "En cours", color: "bg-contrast-100 text-contrast-700", icon: Package },
  shipped: { label: "Expédiée", color: "bg-blue-100 text-blue-700", icon: Package },
  completed: { label: "Livrée", color: "bg-green-100 text-green-700", icon: CheckCircle },
  cancelled: { label: "Annulée", color: "bg-red-100 text-red-700", icon: XCircle },
};

export default async function AdminOrdersPage() {
  const { orders, stats } = await getOrdersData();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold text-minart-900">Gestion des Commandes</h1>
          <Link href="/admin">
            <Button variant="outline">Retour au Tableau de Bord</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">En attente</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-contrast-500">{stats.processing}</div>
              <div className="text-sm text-muted-foreground">En cours</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-500">{stats.shipped}</div>
              <div className="text-sm text-muted-foreground">Expédiées</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Livrées</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-500">{stats.cancelled}</div>
              <div className="text-sm text-muted-foreground">Annulées</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Commandes Récentes ({orders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Aucune commande trouvée
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">N° Commande</th>
                      <th className="text-left p-4 font-medium">Client</th>
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-left p-4 font-medium">Total</th>
                      <th className="text-left p-4 font-medium">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order: any) => {
                      const statusInfo = statusMap[order.status] || statusMap.pending;
                      const StatusIcon = statusInfo.icon;
                      
                      return (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium">{order.order_number}</td>
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{order.profiles?.full_name || "N/A"}</div>
                              <div className="text-sm text-muted-foreground">{order.profiles?.email}</div>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString("fr-FR")}
                          </td>
                          <td className="p-4 font-medium">{Number(order.total_amount).toFixed(2)} TND</td>
                          <td className="p-4">
                            <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 w-fit ${statusInfo.color}`}>
                              <StatusIcon className="h-3 w-3" />
                              {statusInfo.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
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
