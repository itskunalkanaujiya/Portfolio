import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

const reorderSchema = z.object({
  ids: z.array(z.string().min(1)).min(1),
});

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const parsed = reorderSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid order data." }, { status: 400 });
    }

    await prisma.$transaction(
      parsed.data.ids.map((id, index) =>
        prisma.project.update({ where: { id }, data: { order: index + 1 } })
      )
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT /api/projects/reorder error:", err);
    return NextResponse.json({ error: "Failed to save order." }, { status: 500 });
  }
}
