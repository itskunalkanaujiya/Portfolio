import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// Unlike the other content routes, contact messages contain visitor PII, so
// even the list GET requires an admin session.
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (err) {
    console.error("GET /api/messages error:", err);
    return NextResponse.json({ error: "Failed to load messages." }, { status: 500 });
  }
}
