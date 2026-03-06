# Supabase Database Setup

This directory contains SQL scripts for setting up the Bluebell database.

## Setup Order

Run these scripts in your Supabase SQL Editor in the following order:

1. **schema.sql** - Creates all tables, relationships, and RLS policies
2. **storage-setup.sql** - Sets up storage bucket for product images
3. **seed-products.sql** - Seeds initial categories and products (optional)
4. **create-admin.sql** - Creates an admin user (optional)

## Storage Bucket

The `product-images` bucket is used to store product images. It's configured as:
- Public read access (anyone can view images)
- Authenticated write access (only logged-in users can upload)

## Important Notes

- Make sure to run `schema.sql` first as it creates the base tables
- The storage bucket must be created before uploading product images
- RLS policies are enabled on all tables for security
- Admin users have full access to all data

## Environment Variables

Make sure your `.env.local` file contains:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
