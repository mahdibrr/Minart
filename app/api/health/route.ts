import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Check database connection
    const { data: dbCheck, error: dbError } = await supabase
      .from("products")
      .select("count", { count: "exact", head: true })
      .limit(1);

    // Check auth connection
    const { data: authCheck, error: authError } = await supabase.auth.getSession();

    const status = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        database: dbError ? "unhealthy" : "healthy",
        authentication: authError ? "unhealthy" : "healthy",
        api: "healthy",
      },
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV,
    };

    const isHealthy = !dbError && !authError;
    
    return NextResponse.json(status, {
      status: isHealthy ? 200 : 503,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Health check failed:", error);
    
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
        services: {
          database: "unknown",
          authentication: "unknown",
          api: "unhealthy",
        },
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }
}