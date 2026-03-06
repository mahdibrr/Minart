// Base types
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

// User/Profile types
export interface Profile extends BaseEntity {
  email: string;
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
  role: 'client' | 'admin';
  is_b2b_verified: boolean;
}

// Category types
export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
}

// Product types
export interface Product extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_at_price: number | null;
  cost_price: number | null;
  category_id: string | null;
  
  // B2B/B2C
  is_b2b: boolean;
  is_b2c: boolean;
  min_quantity_b2b: number;
  b2b_price: number | null;
  
  // Product details
  sku: string | null;
  barcode: string | null;
  weight_kg: number | null;
  dimensions: {
    width?: number;
    height?: number;
    depth?: number;
  } | null;
  
  // Media
  images: string[];
  featured_image: string | null;
  
  // Inventory
  stock: number;
  low_stock_threshold: number;
  track_inventory: boolean;
  allow_backorders: boolean;
  
  // Status
  is_active: boolean;
  is_featured: boolean;
  
  // SEO
  meta_title: string | null;
  meta_description: string | null;
}

// Product variant types
export interface ProductVariant extends BaseEntity {
  product_id: string;
  name: string;
  sku: string | null;
  price: number | null;
  compare_at_price: number | null;
  stock: number;
  attributes: Record<string, any>;
  sort_order: number;
}

// Quote types (B2B)
export interface Quote extends BaseEntity {
  quote_number: string;
  user_id: string;
  company_name: string | null;
  contact_person: string | null;
  email: string;
  phone: string | null;
  
  status: 'pending' | 'reviewing' | 'approved' | 'rejected' | 'converted';
  
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total_estimated: number;
  currency: string;
  
  valid_until: string | null;
  converted_at: string | null;
  
  notes: string | null;
  internal_notes: string | null;
  
  // Relations
  items?: QuoteItem[];
  user?: Profile;
}

export interface QuoteItem extends BaseEntity {
  quote_id: string;
  product_id: string | null;
  product_name: string;
  product_description: string | null;
  product_image: string | null;
  
  unit_price: number;
  quantity: number;
  total_price: number;
  
  customization_text: string | null;
  logo_url: string | null;
  logo_file_name: string | null;
  
  notes: string | null;
  
  // Relations
  product?: Product;
}

// Order types (B2C)
export interface Order extends BaseEntity {
  order_number: string;
  user_id: string | null;
  
  customer_email: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  payment_status: 'unpaid' | 'paid' | 'failed' | 'refunded';
  
  subtotal: number;
  shipping_amount: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  
  payment_method: string | null;
  payment_id: string | null;
  stripe_session_id: string | null;
  paid_at: string | null;
  
  shipping_address: ShippingAddress | null;
  billing_address: BillingAddress | null;
  shipping_method: string | null;
  tracking_number: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  
  customer_notes: string | null;
  internal_notes: string | null;
  
  // Relations
  items?: OrderItem[];
  user?: Profile | null;
}

export interface OrderItem extends BaseEntity {
  order_id: string;
  product_id: string | null;
  variant_id: string | null;
  product_name: string;
  product_sku: string | null;
  product_image: string | null;
  
  unit_price: number;
  quantity: number;
  total_price: number;
  
  customization_text: string | null;
  
  // Relations
  product?: Product;
  variant?: ProductVariant;
}

// Address types
export interface Address extends BaseEntity {
  user_id: string;
  type: 'shipping' | 'billing';
  full_name: string;
  company: string | null;
  street_address: string;
  apartment: string | null;
  city: string;
  state: string | null;
  postal_code: string;
  country: string;
  phone: string;
  is_default: boolean;
}

export interface ShippingAddress {
  full_name: string;
  company?: string;
  street_address: string;
  apartment?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
  phone: string;
}

export interface BillingAddress extends ShippingAddress {
  tax_id?: string;
}

// Cart types
export interface CartItem {
  id: string;
  user_id: string | null;
  session_id: string | null;
  product_id: string;
  variant_id: string | null;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  customization_text: string | null;
  created_at: string;
  updated_at: string;
}

// Wishlist types
export interface WishlistItem extends BaseEntity {
  user_id: string;
  product_id: string;
  product?: Product;
}

// File upload types
export interface UploadedFile extends BaseEntity {
  user_id: string | null;
  filename: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  bucket: string;
  is_public: boolean;
  purpose: 'logo' | 'customization' | 'product_image' | 'other';
  metadata: Record<string, any> | null;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  full_name: string;
  company_name?: string;
  phone?: string;
  accept_terms: boolean;
}

export interface QuoteRequestFormData {
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  notes?: string;
  items: Array<{
    product_id: string;
    quantity: number;
    customization_text?: string;
    logo_file?: File;
  }>;
}

export interface CheckoutFormData {
  shipping_address: ShippingAddress;
  billing_address: BillingAddress;
  shipping_method: string;
  payment_method: string;
  customer_notes?: string;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// Filter types
export interface ProductFilters {
  category?: string;
  min_price?: number;
  max_price?: number;
  is_b2b?: boolean;
  is_b2c?: boolean;
  is_featured?: boolean;
  search?: string;
  sort_by?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}

// Dashboard stats
export interface DashboardStats {
  total_revenue: number;
  total_orders: number;
  total_quotes: number;
  total_products: number;
  pending_orders: number;
  pending_quotes: number;
  low_stock_products: number;
  revenue_trend: number;
  order_trend: number;
}

// Chart data
export interface RevenueChartData {
  date: string;
  revenue: number;
  orders: number;
}

export interface CategoryChartData {
  category: string;
  count: number;
  revenue: number;
}