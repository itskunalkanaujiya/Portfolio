import { prisma } from "@/lib/prisma";
import { experienceSchema } from "@/lib/validations";
import { createDetailHandlers } from "@/lib/api-helpers";

export const { GET, PUT, DELETE } = createDetailHandlers(prisma.experience, experienceSchema);
