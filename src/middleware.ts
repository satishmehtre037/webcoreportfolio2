import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname, search } = request.nextUrl;

  // 1. Force permanent 301 redirect from *.vercel.app or www to https://webcorestudio.dev
  if (
    host.includes("vercel.app") ||
    host.startsWith("www.webcorestudio.dev") ||
    host === "webcorestudio.com"
  ) {
    const targetUrl = new URL(`https://webcorestudio.dev${pathname}${search}`);
    const response = NextResponse.redirect(targetUrl, 301);
    // Tell crawlers never to index the vercel.app staging domain
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  const response = NextResponse.next();

  // 2. Set strict canonical & security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
