import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { projectSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(projects);
  } catch (err) {
    console.error("GET /api/projects error:", err);
    return NextResponse.json({ error: "Failed to load projects." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = projectSchema.safeParse({
      ...body,
      slug: body.slug || slugify(body.title || ""),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid project data." },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({ data: parsed.data });
    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    console.error("POST /api/projects error:", err);
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}
