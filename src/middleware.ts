// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export const config = {
//   matcher: ["/dashboard/:path*"]
// };

// export function middleware(req: NextRequest) {
//   const accessToken = req.cookies.get("accessToken")?.value;

//   console.log("Middleware - Path:", req.nextUrl.pathname);
//   console.log("Middleware - Has accessToken:", !!accessToken);

//   if (!accessToken) {
//     console.log("Middleware - No token, redirecting to login");
//     const url = req.nextUrl.clone();
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   console.log("Middleware - Token found, allowing access");
//   return NextResponse.next();
// }