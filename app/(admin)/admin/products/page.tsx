"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Product, Category } from "@/types";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductForm } from "@/components/admin/product-form";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/products");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories");
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch("/api/admin/products/" + id, { method: "DELETE" });
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };


  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowDialog(true);
  };

  const handleCreate = () => {
    setEditingProduct(undefined);
    setShowDialog(true);
  };

  const handleSuccess = () => {
    setShowDialog(false);
    setEditingProduct(undefined);
    fetchProducts();
  };

  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold text-minart-900">Gestion des Produits</h1>
          <div className="flex items-center gap-4">
            <Button onClick={handleCreate} className="gap-2 bg-minart-500 hover:bg-minart-600">
              <Plus className="h-4 w-4" />
              Nouveau Produit
            </Button>
            <Link href="/admin">
              <Button variant="outline">Retour</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Liste des Produits ({filteredProducts.length})</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-9 w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-minart-500" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun produit</p>
                <Button onClick={handleCreate} className="mt-4">Créer un produit</Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Image</th>
                      <th className="text-left p-3">Nom</th>
                      <th className="text-left p-3">Prix</th>
                      <th className="text-left p-3">Stock</th>
                      <th className="text-left p-3">Statut</th>
                      <th className="text-right p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          {product.images[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded" />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs">No img</div>
                          )}
                        </td>
                        <td className="p-3 font-medium">{product.name}</td>
                        <td className="p-3">{product.price.toFixed(2)} TND</td>
                        <td className="p-3">
                          <span className={product.stock <= product.low_stock_threshold ? "text-red-600 font-semibold" : ""}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={"px-2 py-1 rounded text-xs " + (product.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700")}>
                            {product.is_active ? "Actif" : "Inactif"}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDelete(product.id)} className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Modifier" : "Nouveau Produit"}</DialogTitle>
            <DialogDescription>{editingProduct ? "Modifier le produit" : "Créer un produit"}</DialogDescription>
          </DialogHeader>
          <ProductForm product={editingProduct} categories={categories} onSuccess={handleSuccess} onCancel={() => setShowDialog(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
