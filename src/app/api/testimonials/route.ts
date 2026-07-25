import { prisma } from "@/lib/prisma";
import { testimonialSchema } from "@/lib/validations";
import { createListHandlers } from "@/lib/api-helpers";

export const { GET, POST } = createListHandlers(prisma.testimonial, testimonialSchema);
