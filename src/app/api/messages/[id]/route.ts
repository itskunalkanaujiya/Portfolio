import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json().catch(() => ({}));
    const read = typeof body.read === "boolean" ? body.read : true;
    const updated = await prisma.contactMessage.update({ where: { id }, data: { read } });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /api/messages/[id] error:", err);
    return NextResponse.json({ error: "Failed to update message." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/messages/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete message." }, { status: 500 });
  }
}
