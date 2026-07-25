import { prisma } from "@/lib/prisma";
import { educationSchema } from "@/lib/validations";
import { createDetailHandlers } from "@/lib/api-helpers";

export const { GET, PUT, DELETE } = createDetailHandlers(prisma.education, educationSchema);
