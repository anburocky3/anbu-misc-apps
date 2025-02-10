import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = ["/services", "/winrar", "/settings"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isAuthenticated =
    request.cookies.get("isAuthenticated")?.value === "true";
  console.log(path, isAuthenticated);

  // Check if the current route is protected
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (path === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/services", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
