-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  company_name text, -- For B2B
  phone text,
  role text default 'client' check (role in ('client', 'admin')),
  is_b2b_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CATEGORIES
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  parent_id uuid references public.categories(id) on delete set null,
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PRODUCTS
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  short_description text,
  price decimal(10, 2) not null,
  compare_at_price decimal(10, 2),
  cost_price decimal(10, 2),
  category_id uuid references public.categories(id),
  
  -- B2B/B2C logic
  is_b2b boolean default false,
  is_b2c boolean default true,
  min_quantity_b2b integer default 1,
  b2b_price decimal(10, 2),
  
  -- Product details
  sku text,
  barcode text,
  weight_kg decimal(10, 3),
  dimensions jsonb, -- {width: 10, height: 20, depth: 5}
  
  -- Media
  images text[] default '{}',
  featured_image text,
  
  -- Inventory
  stock integer default 0,
  low_stock_threshold integer default 5,
  track_inventory boolean default true,
  allow_backorders boolean default false,
  
  -- Status
  is_active boolean default true,
  is_featured boolean default false,
  
  -- SEO
  meta_title text,
  meta_description text,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PRODUCT VARIANTS
create table public.product_variants (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  name text not null,
  sku text,
  price decimal(10, 2),
  compare_at_price decimal(10, 2),
  stock integer default 0,
  attributes jsonb, -- {color: "red", size: "L"}
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- QUOTES (B2B)
create table public.quotes (
  id uuid default uuid_generate_v4() primary key,
  quote_number text not null unique,
  user_id uuid references public.profiles(id) not null,
  company_name text,
  contact_person text,
  email text not null,
  phone text,
  
  -- Status
  status text default 'pending' check (status in ('pending', 'reviewing', 'approved', 'rejected', 'converted')),
  
  -- Financial
  subtotal decimal(10, 2) not null default 0,
  tax_rate decimal(5, 2) default 0,
  tax_amount decimal(10, 2) default 0,
  total_estimated decimal(10, 2) not null default 0,
  currency text default 'TND',
  
  -- Dates
  valid_until date,
  converted_at timestamp with time zone,
  
  -- Notes
  notes text,
  internal_notes text,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- QUOTE ITEMS
create table public.quote_items (
  id uuid default uuid_generate_v4() primary key,
  quote_id uuid references public.quotes(id) on delete cascade not null,
  product_id uuid references public.products(id),
  product_name text not null,
  product_description text,
  product_image text,
  
  -- Pricing
  unit_price decimal(10, 2) not null,
  quantity integer not null check (quantity > 0),
  total_price decimal(10, 2) not null,
  
  -- Customization
  customization_text text,
  logo_url text,
  logo_file_name text,
  
  -- Notes
  notes text,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ORDERS (B2C)
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  order_number text not null unique,
  user_id uuid references public.profiles(id),
  
  -- Customer info (for guest checkout)
  customer_email text,
  customer_name text,
  customer_phone text,
  
  -- Status
  status text default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  payment_status text default 'unpaid' check (payment_status in ('unpaid', 'paid', 'failed', 'refunded')),
  
  -- Financial
  subtotal decimal(10, 2) not null,
  shipping_amount decimal(10, 2) default 0,
  tax_amount decimal(10, 2) default 0,
  discount_amount decimal(10, 2) default 0,
  total_amount decimal(10, 2) not null,
  currency text default 'TND',
  
  -- Payment
  payment_method text,
  payment_id text,
  stripe_session_id text,
  paid_at timestamp with time zone,
  
  -- Shipping
  shipping_address jsonb,
  billing_address jsonb,
  shipping_method text,
  tracking_number text,
  shipped_at timestamp with time zone,
  delivered_at timestamp with time zone,
  
  -- Notes
  customer_notes text,
  internal_notes text,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ORDER ITEMS
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id),
  variant_id uuid references public.product_variants(id),
  product_name text not null,
  product_sku text,
  product_image text,
  
  -- Pricing
  unit_price decimal(10, 2) not null,
  quantity integer not null check (quantity > 0),
  total_price decimal(10, 2) not null,
  
  -- Customization
  customization_text text,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- UPLOADED FILES (for logos and customizations)
create table public.uploaded_files (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  filename text not null,
  original_filename text not null,
  file_path text not null,
  file_size integer not null,
  mime_type text not null,
  bucket text not null,
  is_public boolean default false,
  purpose text check (purpose in ('logo', 'customization', 'product_image', 'other')),
  metadata jsonb,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ADDRESSES
create table public.addresses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null check (type in ('shipping', 'billing')),
  full_name text not null,
  company text,
  street_address text not null,
  apartment text,
  city text not null,
  state text,
  postal_code text not null,
  country text not null default 'Tunisia',
  phone text not null,
  is_default boolean default false,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- WISHLISTS (B2C)
create table public.wishlists (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  unique(user_id, product_id)
);

-- CART ITEMS (temporary storage)
create table public.cart_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  session_id text, -- for guest carts
  product_id uuid references public.products(id) on delete cascade,
  variant_id uuid references public.product_variants(id),
  quantity integer not null check (quantity > 0),
  customization_text text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  unique(user_id, product_id, variant_id, customization_text)
);

-- INDEXES for performance
create index idx_profiles_email on public.profiles(email);
create index idx_profiles_role on public.profiles(role);
create index idx_products_slug on public.products(slug);
create index idx_products_category on public.products(category_id);
create index idx_products_active on public.products(is_active);
create index idx_quotes_user on public.quotes(user_id);
create index idx_quotes_status on public.quotes(status);
create index idx_orders_user on public.orders(user_id);
create index idx_orders_status on public.orders(status);
create index idx_orders_payment_status on public.orders(payment_status);
create index idx_order_items_order on public.order_items(order_id);
create index idx_quote_items_quote on public.quote_items(quote_id);
create index idx_cart_items_user on public.cart_items(user_id);
create index idx_cart_items_session on public.cart_items(session_id);

-- ROW LEVEL SECURITY POLICIES

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.quotes enable row level security;
alter table public.orders enable row level security;
alter table public.addresses enable row level security;
alter table public.wishlists enable row level security;
alter table public.cart_items enable row level security;
alter table public.uploaded_files enable row level security;

-- PUBLIC POLICIES (read-only for everyone)
create policy "Public can view active products"
  on public.products for select
  using (is_active = true);

create policy "Public can view categories"
  on public.categories for select
  using (is_active = true);

-- USER POLICIES
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can view own quotes"
  on public.quotes for select
  using (auth.uid() = user_id);

create policy "Users can create quotes"
  on public.quotes for insert
  with check (auth.uid() = user_id);

create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id or auth.uid() is null and customer_email = current_setting('request.jwt.claims', true)::json->>'email');

create policy "Users can manage own addresses"
  on public.addresses for all
  using (auth.uid() = user_id);

create policy "Users can manage own wishlist"
  on public.wishlists for all
  using (auth.uid() = user_id);

create policy "Users can manage own cart"
  on public.cart_items for all
  using (auth.uid() = user_id or (auth.uid() is null and session_id = current_setting('request.jwt.claims', true)::json->>'session_id'));

-- ADMIN POLICIES (full access)
create policy "Admins have full access to profiles"
  on public.profiles for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Admins have full access to products"
  on public.products for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Admins have full access to categories"
  on public.categories for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Admins have full access to quotes"
  on public.quotes for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Admins have full access to orders"
  on public.orders for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Admins have full access to uploaded files"
  on public.uploaded_files for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- FUNCTIONS AND TRIGGERS

-- Update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply triggers to tables with updated_at
create trigger update_profiles_updated_at before update on public.profiles
  for each row execute function update_updated_at_column();

create trigger update_products_updated_at before update on public.products
  for each row execute function update_updated_at_column();

create trigger update_categories_updated_at before update on public.categories
  for each row execute function update_updated_at_column();

create trigger update_quotes_updated_at before update on public.quotes
  for each row execute function update_updated_at_column();

create trigger update_orders_updated_at before update on public.orders
  for each row execute function update_updated_at_column();

create trigger update_addresses_updated_at before update on public.addresses
  for each row execute function update_updated_at_column();

create trigger update_cart_items_updated_at before update on public.cart_items
  for each row execute function update_updated_at_column();

-- Generate order number
create or replace function generate_order_number()
returns text as $$
declare
  year_part text;
  month_part text;
  sequence_part text;
  new_number text;
begin
  year_part := to_char(now(), 'YY');
  month_part := to_char(now(), 'MM');
  
  select coalesce(max(substring(order_number from '^ORD-(\d+)-(\d+)-(\d+)$')), '0')
  into sequence_part
  from public.orders
  where order_number like 'ORD-' || year_part || '-' || month_part || '-%';
  
  sequence_part := lpad((cast(sequence_part as integer) + 1)::text, 4, '0');
  new_number := 'ORD-' || year_part || '-' || month_part || '-' || sequence_part;
  
  return new_number;
end;
$$ language plpgsql;

-- Generate quote number
create or replace function generate_quote_number()
returns text as $$
declare
  year_part text;
  month_part text;
  sequence_part text;
  new_number text;
begin
  year_part := to_char(now(), 'YY');
  month_part := to_char(now(), 'MM');
  
  select coalesce(max(substring(quote_number from '^QUO-(\d+)-(\d+)-(\d+)$')), '0')
  into sequence_part
  from public.quotes
  where quote_number like 'QUO-' || year_part || '-' || month_part || '-%';
  
  sequence_part := lpad((cast(sequence_part as integer) + 1)::text, 4, '0');
  new_number := 'QUO-' || year_part || '-' || month_part || '-' || sequence_part;
  
  return new_number;
end;
$$ language plpgsql;

-- Set order number on insert
create or replace function set_order_number()
returns trigger as $$
begin
  if new.order_number is null then
    new.order_number := generate_order_number();
  end if;
  return new;
end;
$$ language plpgsql;

create trigger set_order_number_trigger before insert on public.orders
  for each row execute function set_order_number();

-- Set quote number on insert
create or replace function set_quote_number()
returns trigger as $$
begin
  if new.quote_number is null then
    new.quote_number := generate_quote_number();
  end if;
  return new;
end;
$$ language plpgsql;

create trigger set_quote_number_trigger before insert on public.quotes
  for each row execute function set_quote_number();

-- Update product stock when order is created/cancelled
create or replace function update_product_stock()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update public.products
    set stock = stock - new.quantity
    where id = new.product_id
    and track_inventory = true;
  elsif tg_op = 'DELETE' and old.order_id in (
    select id from public.orders where status = 'cancelled'
  ) then
    update public.products
    set stock = stock + old.quantity
    where id = old.product_id
    and track_inventory = true;
  end if;
  return null;
end;
$$ language plpgsql;

create trigger update_stock_on_order_item after insert or delete on public.order_items
  for each row execute function update_product_stock();