
import { NextRequest, NextResponse } from "next/server";


const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/"];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;


  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);


  const accessToken = req.cookies.get("accessToken")?.value;


  if (isProtectedRoute && !accessToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isPublicRoute && accessToken && path !== "/dashboard") {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }


  return NextResponse.next();
}


export const config = {
  matcher: ["/dashboard/:path*", "/login", "/"], 
};
