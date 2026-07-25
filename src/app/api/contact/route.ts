import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactFormSchema } from "@/lib/validations";
import { sendContactNotification } from "@/lib/mailer";

// Simple in-memory rate limiter (per server instance). For multi-instance
// deployments on Vercel, swap this for a durable store like Upstash Redis.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    const saved = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    // Email failures shouldn't fail the request — the message is already saved.
    try {
      await sendContactNotification({ name, email, subject, message });
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr);
    }

    return NextResponse.json({ success: true, id: saved.id }, { status: 201 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
