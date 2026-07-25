import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/queries";
import { formatDate, isRenderableImagePath } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on engineering, design, and building products.",
};

const PAGE_SIZE = 6;

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const posts = await getBlogPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const paginated = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Navbar />
      <main className="section-container pt-32">
        <h1 className="section-heading">
          <span className="gradient-text">Blog</span>
        </h1>
        <p className="mt-3 max-w-xl text-white/60">
          Writing on engineering, design, and building products.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="glass-card group flex flex-col overflow-hidden"
            >
              <div className="relative flex aspect-[16/10] items-center justify-center bg-white/5 text-sm text-white/30">
                {isRenderableImagePath(post.coverImage) ? (
                  <Image
                    src={post.coverImage.trim()}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  "BLOG_COVER"
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  {formatDate(post.createdAt)}
                </p>
                <h2 className="mt-2 font-display text-lg font-semibold">{post.title}</h2>
                <p className="mt-2 flex-1 text-sm text-white/60">{post.excerpt}</p>
                <span className="mt-4 flex items-center gap-1 text-sm font-medium text-secondary">
                  Read more <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/blog?page=${p}`}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm ${
                  p === page
                    ? "bg-gradient-to-r from-primary to-secondary text-white"
                    : "glass text-white/60 hover:text-white"
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
