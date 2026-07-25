import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";

const COOKIE_NAME = "admin_token";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifyAdminToken(token) : null;

  if (!session) {
    const loginUrl = new URL("/admin", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
