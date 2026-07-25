import { NextRequest, NextResponse } from "next/server";
import type { ZodObject, ZodRawShape } from "zod";
import { getAdminSession } from "@/lib/auth";

// Every Prisma model delegate (prisma.project, prisma.education, ...) is
// passed in here. We intentionally type it as `any` rather than a strict
// interface: TypeScript's strictFunctionTypes checks arrow-function-typed
// interface properties contravariantly, so a real generated Prisma delegate
// (whose findMany/create/etc. take specific typed args like
// AchievementFindManyArgs) fails to structurally satisfy a Delegate interface
// declared with `unknown` args — even though every delegate genuinely
// supports these calls at runtime. The Zod schema below is the actual
// validation safety net, not this parameter's TS shape.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Delegate = any;

interface ListHandlerOptions {
  orderBy?: unknown;
  /** Mutate/derive fields (e.g. auto-slug) before validation on create. */
  transformInput?: (body: Record<string, unknown>) => Record<string, unknown>;
}

export function createListHandlers(
  delegate: Delegate,
  schema: ZodObject<ZodRawShape>,
  options: ListHandlerOptions = {}
) {
  const { orderBy = { order: "asc" }, transformInput } = options;

  async function GET() {
    try {
      const items = await delegate.findMany({ orderBy });
      return NextResponse.json(items);
    } catch (err) {
      console.error("GET list error:", err);
      return NextResponse.json({ error: "Failed to load items." }, { status: 500 });
    }
  }

  async function POST(req: NextRequest) {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    try {
      const rawBody = await req.json();
      const body = transformInput ? transformInput(rawBody) : rawBody;
      const parsed = schema.safeParse(body);

      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message || "Invalid data." },
          { status: 400 }
        );
      }

      const created = await delegate.create({ data: parsed.data });
      return NextResponse.json(created, { status: 201 });
    } catch (err) {
      console.error("POST list error:", err);
      return NextResponse.json({ error: "Failed to create item." }, { status: 500 });
    }
  }

  return { GET, POST };
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

export function createDetailHandlers(delegate: Delegate, schema: ZodObject<ZodRawShape>) {
  async function GET(_req: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    try {
      const item = await delegate.findUnique({ where: { id } });
      if (!item) {
        return NextResponse.json({ error: "Not found." }, { status: 404 });
      }
      return NextResponse.json(item);
    } catch (err) {
      console.error("GET detail error:", err);
      return NextResponse.json({ error: "Failed to load item." }, { status: 500 });
    }
  }

  async function PUT(req: NextRequest, { params }: RouteParams) {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    try {
      const body = await req.json();
      const parsed = schema.partial().safeParse(body);

      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message || "Invalid data." },
          { status: 400 }
        );
      }

      const updated = await delegate.update({ where: { id }, data: parsed.data });
      return NextResponse.json(updated);
    } catch (err) {
      console.error("PUT detail error:", err);
      return NextResponse.json({ error: "Failed to update item." }, { status: 500 });
    }
  }

  async function DELETE(_req: NextRequest, { params }: RouteParams) {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    try {
      await delegate.delete({ where: { id } });
      return NextResponse.json({ success: true });
    } catch (err) {
      console.error("DELETE detail error:", err);
      return NextResponse.json({ error: "Failed to delete item." }, { status: 500 });
    }
  }

  return { GET, PUT, DELETE };
}
