import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cookie keys
const AUTH_TOKEN_KEY = "picword_auth_token";
const USER_ROLE_KEY = "picword_user_role";

// Route configurations
const AUTH_ROUTES = [
  "/login",
  "/register",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

const PROTECTED_ROUTES = [
  "/dashboard",
  "/profile",
  "/quiz",
  "/settings",
  "/srs",
];

const ADMIN_ROUTE_PREFIX = "/admin";

/**
 * Next.js Edge Security Proxy & Route Protection (RBAC)
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Retrieve auth credentials from cookies
  const authToken = request.cookies.get(AUTH_TOKEN_KEY)?.value;
  const userRole = request.cookies.get(USER_ROLE_KEY)?.value;

  const isAuthenticated = Boolean(authToken);
  const isAdmin = userRole === "admin";

  // 1. ── Handle Auth Routes (Prevent authenticated users from visiting /login, /register, etc.) ──
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  if (isAuthRoute && isAuthenticated) {
    const redirectUrl = new URL(isAdmin ? "/admin" : "/dashboard", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // 2. ── Handle Admin Routes (Role-Based Access Control: strictly for role === "admin") ──
  if (pathname.startsWith(ADMIN_ROUTE_PREFIX)) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (!isAdmin) {
      // Authenticated but non-admin user trying to access admin panel
      const forbiddenUrl = new URL("/dashboard", request.url);
      forbiddenUrl.searchParams.set("error", "unauthorized_admin_access");
      return NextResponse.redirect(forbiddenUrl);
    }
  }

  // 3. ── Handle Private User Routes (/dashboard, /profile, /quiz, etc.) ──
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. ── Attach security headers ──
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public assets (/images, /icons, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
