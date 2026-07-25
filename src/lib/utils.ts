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
