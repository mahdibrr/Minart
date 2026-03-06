import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export const config = {
    matcher: [
        // Match all routes except static files and API routes
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
    ],
};

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    
    const isAdmin = url.pathname.startsWith("/admin");
    
    // SUPABASE AUTH SETUP (for protected routes)
    let response = NextResponse.next({
        request: {
            headers: req.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return req.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    req.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: req.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name: string, options: CookieOptions) {
                    req.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: req.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                },
            },
        }
    );

    // AUTH CHECK FOR ADMIN ROUTES
    if (isAdmin) {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
            // Redirect to login if not authenticated
            const loginUrl = new URL("/login", req.url);
            loginUrl.searchParams.set("redirect", url.pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Check if user has admin role
        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (profile?.role !== "admin") {
            // Redirect to home if not admin
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return response;
}