import { prisma } from "@/lib/prisma";
import { achievementSchema } from "@/lib/validations";
import { createDetailHandlers } from "@/lib/api-helpers";

export const { GET, PUT, DELETE } = createDetailHandlers(prisma.achievement, achievementSchema);
