import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getBlogPostBySlug } from "@/lib/queries";
import { formatDate, isRenderableImagePath } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="section-container max-w-3xl pt-32">
        <p className="text-xs uppercase tracking-wide text-white/40">
          {formatDate(post.createdAt)}
        </p>
        <h1 className="section-heading mt-2 !text-4xl">{post.title}</h1>
        <div className="relative mt-8 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl bg-white/5 text-white/30">
          {isRenderableImagePath(post.coverImage) ? (
            <Image
              src={post.coverImage.trim()}
              alt={post.title}
              fill
              sizes="768px"
              className="object-cover"
            />
          ) : (
            "BLOG_COVER"
          )}
        </div>

        <article className="prose prose-invert mt-10 max-w-none prose-headings:font-display prose-a:text-secondary">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </main>
      <Footer />
    </>
  );
}
