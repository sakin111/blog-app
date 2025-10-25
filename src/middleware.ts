import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isLogin = req.nextUrl.pathname.startsWith("/login");

  if (!accessToken && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (accessToken && isLogin) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], 
};
