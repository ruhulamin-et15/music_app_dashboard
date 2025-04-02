import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  const homeRoute = `${request.nextUrl.origin}/login`;
  const adminRoutes = [
    "/",
    "/event-creator",
    "/running-event",
    "/subscription",
    "/transaction",
    "/users",
  ];

  // Retrieve token from cookies
  const token = request.cookies.get("accessToken")?.value;

  // If token is missing or empty, redirect to login
  if (!token || typeof token !== "string" || token.trim() === "") {
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  let userInfo;
  try {
    userInfo = jwtDecode(token) as { exp?: number; role?: string };
  } catch (error) {
    console.error("JWT decoding error:", error);
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  // Check token expiration
  if (!userInfo?.exp || userInfo.exp < Date.now() / 1000) {
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  const currentPath = request.nextUrl.pathname;

  // Restrict access for non-admin users
  if (userInfo?.role !== "ADMIN" && adminRoutes.some((e) => currentPath.startsWith(e))) {
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/event-creator",
    "/running-event",
    "/subscription",
    "/transaction",
    "/users",
  ],
};
