"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Product, Category } from "@/types";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProductForm({ product, categories, onSuccess, onCancel }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    short_description: product?.short_description || "",
    price: product?.price || 0,
    compare_at_price: product?.compare_at_price || null,
    category_id: product?.category_id || "",
    sku: product?.sku || "",
    stock: product?.stock || 0,
    low_stock_threshold: product?.low_stock_threshold || 5,
    track_inventory: product?.track_inventory ?? true,
    is_active: product?.is_active ?? true,
    is_featured: product?.is_featured || false,
    images: product?.images || [],
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: !product ? generateSlug(name) : prev.slug,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const { url } = await response.json();
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url],
      }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = product
        ? `/api/admin/products/${product.id}`
        : "/api/admin/products";
      
      const method = product ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save product");

      toast.success(product ? "Product updated" : "Product created");
      onSuccess();
    } catch (error) {
      toast.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section: Informations de base */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b">
          <div className="h-8 w-1 bg-minart-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-gray-900">Informations de base</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nom du produit <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Ex: Agenda en Cuir Premium"
              className="mt-1.5"
              required
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="slug" className="text-sm font-medium text-gray-700">
              Slug (URL) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="agenda-en-cuir-premium"
              className="mt-1.5 font-mono text-sm"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Généré automatiquement à partir du nom</p>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="short_description" className="text-sm font-medium text-gray-700">
              Description courte
            </Label>
            <Input
              id="short_description"
              value={formData.short_description || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
              placeholder="Une brève description du produit"
              className="mt-1.5"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description détaillée
            </Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Description complète du produit, ses caractéristiques, matériaux..."
              rows={5}
              className="mt-1.5"
            />
          </div>
        </div>
      </div>

      {/* Section: Prix et catégorie */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b">
          <div className="h-8 w-1 bg-minart-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-gray-900">Prix et catégorie</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price" className="text-sm font-medium text-gray-700">
              Prix (TND) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              placeholder="0.00"
              className="mt-1.5"
              required
            />
          </div>

          <div>
            <Label htmlFor="compare_at_price" className="text-sm font-medium text-gray-700">
              Prix barré (TND)
            </Label>
            <Input
              id="compare_at_price"
              type="number"
              step="0.01"
              min="0"
              value={formData.compare_at_price || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, compare_at_price: e.target.value ? parseFloat(e.target.value) : null }))}
              placeholder="0.00"
              className="mt-1.5"
            />
            <p className="text-xs text-gray-500 mt-1">Pour afficher une réduction</p>
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
              Catégorie
            </Label>
            <Select
              value={formData.category_id || ""}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="sku" className="text-sm font-medium text-gray-700">
              SKU / Référence
            </Label>
            <Input
              id="sku"
              value={formData.sku || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
              placeholder="AGD-PREM-001"
              className="mt-1.5"
            />
          </div>
        </div>
      </div>

      {/* Section: Inventaire */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b">
          <div className="h-8 w-1 bg-minart-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-gray-900">Gestion de l'inventaire</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="stock" className="text-sm font-medium text-gray-700">
              Stock disponible
            </Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
              placeholder="0"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="low_stock_threshold" className="text-sm font-medium text-gray-700">
              Seuil de stock faible
            </Label>
            <Input
              id="low_stock_threshold"
              type="number"
              min="0"
              value={formData.low_stock_threshold}
              onChange={(e) => setFormData(prev => ({ ...prev, low_stock_threshold: parseInt(e.target.value) || 0 }))}
              placeholder="5"
              className="mt-1.5"
            />
            <p className="text-xs text-gray-500 mt-1">Alerte quand le stock atteint ce niveau</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
          <Checkbox
            id="track_inventory"
            checked={formData.track_inventory}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, track_inventory: checked as boolean }))}
          />
          <Label htmlFor="track_inventory" className="text-sm font-medium cursor-pointer">
            Suivre l'inventaire de ce produit
          </Label>
        </div>
      </div>

      {/* Section: Images */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b">
          <div className="h-8 w-1 bg-minart-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-gray-900">Images du produit</h3>
        </div>
        
        <div className="space-y-4">
          {formData.images.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Images téléchargées</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square border-2 border-gray-200 rounded-lg overflow-hidden hover:border-minart-500 transition-colors">
                      <img src={img} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {index === 0 ? (
                      <div className="absolute top-2 left-2 bg-minart-600 text-white text-xs px-2 py-1 rounded font-medium shadow-md">
                        Image principale
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = [...formData.images];
                          const [movedImage] = newImages.splice(index, 1);
                          newImages.unshift(movedImage);
                          setFormData(prev => ({ ...prev, images: newImages }));
                        }}
                        className="absolute top-2 left-2 bg-gray-700 hover:bg-minart-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Définir comme principale
                      </button>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {index === 0 ? "Principale" : `Secondaire ${index}`}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 La première image est l'image principale. Cliquez sur "Définir comme principale" pour changer.
              </p>
            </div>
          )}
          
          <div className="border-2 border-gray-300 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-gray-400" />
                <h4 className="font-medium text-gray-700">
                  {formData.images.length === 0 ? "Ajouter l'image principale" : "Ajouter une image secondaire"}
                </h4>
              </div>
              
              <div className="flex gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="flex-1"
                  id="file-input"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('file-input')?.click()}
                  disabled={uploading}
                  className="whitespace-nowrap"
                >
                  Parcourir...
                </Button>
              </div>
              
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF jusqu'à 10MB
              </p>
              
              {uploading && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Loader2 className="h-4 w-4 animate-spin text-minart-500" />
                  <span className="text-sm text-gray-600">Téléchargement en cours...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section: Statut */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b">
          <div className="h-8 w-1 bg-minart-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-gray-900">Statut du produit</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <Checkbox
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked as boolean }))}
            />
            <div className="flex-1">
              <Label htmlFor="is_active" className="text-sm font-medium cursor-pointer">
                Produit actif
              </Label>
              <p className="text-xs text-gray-500">Visible sur le site</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <Checkbox
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked as boolean }))}
            />
            <div className="flex-1">
              <Label htmlFor="is_featured" className="text-sm font-medium cursor-pointer">
                Produit en vedette
              </Label>
              <p className="text-xs text-gray-500">Mis en avant sur la page d'accueil</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel} className="px-6">
          Annuler
        </Button>
        <Button type="submit" disabled={loading} className="px-6 bg-minart-500 hover:bg-minart-600">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product ? "Mettre à jour" : "Créer le produit"}
        </Button>
      </div>
    </form>
  );
}
