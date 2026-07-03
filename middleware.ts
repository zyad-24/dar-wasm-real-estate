import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isAdminPage = request.nextUrl.pathname === "/admin";
  const isLoggedIn = request.cookies.get("admin-auth")?.value === "true";

  if (isAdminPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin"],
};