import { prisma } from "@/lib/prisma";
import { blogPostSchema } from "@/lib/validations";
import { createListHandlers } from "@/lib/api-helpers";
import { slugify } from "@/lib/utils";

export const { GET, POST } = createListHandlers(prisma.blogPost, blogPostSchema, {
  orderBy: { createdAt: "desc" },
  transformInput: (body) => ({
    ...body,
    slug: (body.slug as string) || slugify((body.title as string) || ""),
  }),
});
