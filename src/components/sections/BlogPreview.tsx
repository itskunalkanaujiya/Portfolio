import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getBlogPosts } from "@/lib/queries";
import { formatDate, isRenderableImagePath } from "@/lib/utils";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

export default async function BlogPreview() {
  const posts = (await getBlogPosts()).slice(0, 3);

  return (
    <section id="blog" className="relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Blog"
          title="Latest writing"
          description="Thoughts on engineering, design, and building products."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
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
                <h3 className="mt-2 font-display text-lg font-semibold">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm text-white/60">{post.excerpt}</p>
                <span className="mt-4 flex items-center gap-1 text-sm font-medium text-secondary">
                  Read more{" "}
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/blog">
            <Button variant="outline">View all posts</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
