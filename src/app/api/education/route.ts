import { prisma } from "@/lib/prisma";
import { educationSchema } from "@/lib/validations";
import { createListHandlers } from "@/lib/api-helpers";

export const { GET, POST } = createListHandlers(prisma.education, educationSchema);
