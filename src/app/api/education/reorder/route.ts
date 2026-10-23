import { prisma } from "@/lib/prisma";
import { createReorderHandler } from "@/lib/api-helpers";

export const { PUT } = createReorderHandler(prisma.education);
