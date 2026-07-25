import { prisma } from "@/lib/prisma";
import { galleryItemSchema } from "@/lib/validations";
import { createDetailHandlers } from "@/lib/api-helpers";

export const { GET, PUT, DELETE } = createDetailHandlers(prisma.galleryItem, galleryItemSchema);
