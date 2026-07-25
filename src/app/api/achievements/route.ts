import { prisma } from "@/lib/prisma";
import { achievementSchema } from "@/lib/validations";
import { createListHandlers } from "@/lib/api-helpers";

export const { GET, POST } = createListHandlers(prisma.achievement, achievementSchema);
