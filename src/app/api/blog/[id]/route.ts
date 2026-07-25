import { prisma } from "@/lib/prisma";
import { blogPostSchema } from "@/lib/validations";
import { createDetailHandlers } from "@/lib/api-helpers";

export const { GET, PUT, DELETE } = createDetailHandlers(prisma.blogPost, blogPostSchema);
