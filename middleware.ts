import { cookies, headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const access_token = cookies().get("access_token");

  if (request.nextUrl.pathname === "/login" && access_token) {
    //TODO: THIS IS NOT WORKING GOOD DO IT BETTER
    const previousUrl = headers().get("next-url");

    return NextResponse.redirect(new URL(previousUrl ?? "/dashboard", request.url));
  }

  if (request.nextUrl.pathname !== "/login" && !access_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
