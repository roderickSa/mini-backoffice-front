import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const access_token = cookies().get("access_token");

  if (request.nextUrl.pathname === "/login" && access_token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname !== "/login" && !access_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
