import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Get total orders count
    const { count: ordersCount } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true });

    // Get total revenue
    const { data: orders } = await supabase
      .from("orders")
      .select("total_amount")
      .in("status", ["completed", "processing", "shipped"]);

    const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

    // Get total customers
    const { count: customersCount } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "client");

    // Get pending orders
    const { count: pendingOrders } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    // Get low stock products
    const { data: lowStockProducts } = await supabase
      .from("products")
      .select("id, name, stock, low_stock_threshold")
      .lte("stock", supabase.rpc("low_stock_threshold"))
      .eq("track_inventory", true)
      .limit(5);

    // Get recent orders
    const { data: recentOrders } = await supabase
      .from("orders")
      .select("*, profiles(full_name, email)")
      .order("created_at", { ascending: false })
      .limit(5);

    return NextResponse.json({
      stats: {
        totalOrders: ordersCount || 0,
        totalRevenue: totalRevenue,
        totalCustomers: customersCount || 0,
        pendingOrders: pendingOrders || 0,
      },
      lowStockProducts: lowStockProducts || [],
      recentOrders: recentOrders || [],
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
