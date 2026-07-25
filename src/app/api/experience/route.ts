import { prisma } from "@/lib/prisma";
import { experienceSchema } from "@/lib/validations";
import { createListHandlers } from "@/lib/api-helpers";

export const { GET, POST } = createListHandlers(prisma.experience, experienceSchema);
