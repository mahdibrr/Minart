import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function getStats() {
  const supabase = await createClient();

  const [
    { count: ordersCount },
    { data: orders },
    { count: customersCount },
    { count: pendingOrders },
    { data: lowStockProducts },
  ] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("total_amount").in("status", ["completed", "processing", "shipped"]),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "client"),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("products").select("id, name, stock, low_stock_threshold").lte("stock", 10).eq("track_inventory", true).limit(5),
  ]);

  const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

  return {
    totalOrders: ordersCount || 0,
    totalRevenue,
    totalCustomers: customersCount || 0,
    pendingOrders: pendingOrders || 0,
    lowStockProducts: lowStockProducts || [],
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold text-minart-900">Tableau de Bord Admin</h1>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline">Retour au Site</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes Totales</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRevenue.toFixed(2)} TND</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes en Attente</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-minart-100">
                  <Package className="h-6 w-6 text-minart-500" />
                </div>
                <div>
                  <CardTitle>Produits</CardTitle>
                  <CardDescription>Gérer le catalogue</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/admin/products">
                <Button className="w-full">Voir les Produits</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-minart-100">
                  <ShoppingCart className="h-6 w-6 text-minart-500" />
                </div>
                <div>
                  <CardTitle>Commandes</CardTitle>
                  <CardDescription>Gérer les commandes</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/admin/orders">
                <Button className="w-full">Voir les Commandes</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-minart-100">
                  <Users className="h-6 w-6 text-minart-500" />
                </div>
                <div>
                  <CardTitle>Clients</CardTitle>
                  <CardDescription>Gérer les utilisateurs</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/admin/customers">
                <Button className="w-full">Voir les Clients</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
        {stats.lowStockProducts.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-contrast-500" />
                Produits en Stock Faible
              </CardTitle>
              <CardDescription>Ces produits nécessitent un réapprovisionnement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stats.lowStockProducts.map((product) => (
                  <div key={product.id} className="flex justify-between items-center p-3 bg-contrast-50 rounded-lg">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-sm text-contrast-600">
                      Stock: {product.stock} / Seuil: {product.low_stock_threshold}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
