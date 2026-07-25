import { prisma } from "@/lib/prisma";
import { galleryItemSchema } from "@/lib/validations";
import { createListHandlers } from "@/lib/api-helpers";

export const { GET, POST } = createListHandlers(prisma.galleryItem, galleryItemSchema);
