# Bluebell Application Setup Guide

## Prerequisites

- Node.js 18+ installed
- Supabase account and project created
- Git (optional)

## Step 1: Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project settings:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy the Project URL and anon/public key

## Step 2: Database Setup

Run these SQL scripts in your Supabase SQL Editor (in order):

### 1. Create Tables and Policies
```sql
-- Run: supabase/schema.sql
```
This creates all tables, relationships, and Row Level Security policies.

### 2. Setup Storage Bucket
```sql
-- Run: supabase/storage-setup.sql
```
This creates the `product-images` bucket for storing product images.

### 3. Seed Initial Data (Optional)
```sql
-- Run: supabase/seed-products.sql
```
This adds sample categories and products to get started.

### 4. Create Admin User (Optional)
```sql
-- Run: supabase/create-admin.sql
```
This creates an admin user for testing.

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run Development Server

```bash
npm run dev
```

The application will be available at http://localhost:3000

## Step 5: Access Admin Dashboard

Navigate to: http://localhost:3000/admin

## Key Features Available

### Admin Dashboard
- Real-time statistics (orders, revenue, customers)
- Low stock alerts
- Quick access to management pages

### Product Management
- Create new products with images
- Edit existing products
- Delete products
- Search and filter products
- Track inventory levels
- Set B2B/B2C availability
- Manage pricing and discounts

### Orders Management
- View all orders
- Filter by status
- See customer information
- Track order statistics

### Customer Management
- View all customers
- See B2B verification status
- Track customer information

### Public Catalogue
- Browse all active B2B products
- Search products
- Filter by category
- Sort by various criteria
- View product details

## Troubleshooting

### Issue: "Failed to fetch products"
**Solution:** Check that:
1. Supabase URL and key are correct in `.env.local`
2. Database tables are created (run schema.sql)
3. RLS policies are enabled

### Issue: "Image upload failed"
**Solution:** Check that:
1. Storage bucket is created (run storage-setup.sql)
2. Storage policies are set correctly
3. User is authenticated

### Issue: "No products showing"
**Solution:**
1. Run seed-products.sql to add sample data
2. Or create products manually through the admin panel
3. Ensure products have `is_active = true`

## Production Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Environment Variables for Production

Make sure to set the same environment variables in your production environment.

## Security Considerations

### Important: Protect Admin Routes

Add middleware to protect admin routes (recommended):

Create `middleware.ts` in the root:

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
```

## API Endpoints

### Products
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `GET /api/admin/products/[id]` - Get single product
- `PATCH /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

### Categories
- `GET /api/admin/categories` - List all categories

### Upload
- `POST /api/admin/upload` - Upload product image

### Statistics
- `GET /api/admin/stats` - Get dashboard statistics

## Database Schema Overview

### Main Tables
- `profiles` - User accounts and roles
- `products` - Product catalog
- `categories` - Product categories
- `orders` - Customer orders
- `order_items` - Order line items
- `quotes` - B2B quote requests
- `cart_items` - Shopping cart items

### Storage Buckets
- `product-images` - Product image storage

## Support

For issues or questions:
1. Check the REFACTORING_SUMMARY.md for detailed changes
2. Review Supabase documentation: https://supabase.com/docs
3. Check Next.js documentation: https://nextjs.org/docs

## Next Steps

1. Customize the UI to match your brand
2. Add authentication for customers
3. Implement order processing workflow
4. Add email notifications
5. Set up payment processing
6. Add analytics and reporting
