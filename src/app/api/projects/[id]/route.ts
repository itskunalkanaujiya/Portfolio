import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { projectSchema } from "@/lib/validations";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (err) {
    console.error("GET /api/projects/[id] error:", err);
    return NextResponse.json({ error: "Failed to load project." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const parsed = projectSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid project data." },
        { status: 400 }
      );
    }

    const project = await prisma.project.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json(project);
  } catch (err) {
    console.error("PUT /api/projects/[id] error:", err);
    return NextResponse.json({ error: "Failed to update project." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/projects/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete project." }, { status: 500 });
  }
}
