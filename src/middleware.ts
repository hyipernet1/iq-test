import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TOKEN } from "./types/enums";

const protectedRoutes = ["/unsubscribe"];

export function middleware(request: NextRequest) {
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    const token = request.cookies.get(TOKEN.ACCESS_TOKEN)?.value;
    if (token) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isAuthPage =
    request.nextUrl.pathname.includes("login") ||
    request.nextUrl.pathname.includes("signup");

  if (isAuthPage) {
    const token = request.cookies.get(TOKEN.ACCESS_TOKEN)?.value;
    if (!token) return NextResponse.next();
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/unsubscribe/:path*", "/login/:path*", "/signup/:path*"],
};
