import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // Authenticated user at login page → send to payment/activation flow
  if (pathname === "/portal" && user) {
    return NextResponse.redirect(new URL("/portal/pago", request.url));
  }

  // Protect payment and dashboard routes from unauthenticated users
  if ((pathname === "/portal/pago" || pathname.startsWith("/portal/pago/")) && !user) {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  if (pathname.match(/^\/portal\/.+\/dashboard/) && !user) {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/portal", "/portal/:path*"],
};
