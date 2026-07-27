import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Only treat a value as a renderable image path if it's a well-formed local
// path (e.g. "/images/photo.jpg") or a full http(s) URL. Protects every image
// spot in the admin-managed content (projects, experience, achievements,
// gallery, blog covers, avatars) from crashing next/image on bad input —
// a blank field, a pasted Windows path, a missing leading slash, etc.
export function isRenderableImagePath(path?: string | null): path is string {
  if (!path) return false;
  const trimmed = path.trim();
  return (
    trimmed.startsWith("/") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  );
}

// Defensive parsing for NEXT_PUBLIC_SITE_URL: people often copy the value
// straight out of a .env file into a hosting provider's environment variable
// UI, quotes and all (e.g. `"https://x.com"` instead of `https://x.com`),
// which crashes `new URL()`. Strip stray wrapping quotes, and fall back to a
// safe default rather than producing a broken value if it's still not a
// valid URL.
export function getSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com").trim();
  const unquoted = raw.replace(/^["']|["']$/g, "");
  try {
    return new URL(unquoted).toString().replace(/\/$/, "");
  } catch {
    console.warn(
      `NEXT_PUBLIC_SITE_URL ("${raw}") is not a valid URL — falling back to https://your-domain.com. Check for stray quotes in your environment variable value.`
    );
    return "https://your-domain.com";
  }
}
