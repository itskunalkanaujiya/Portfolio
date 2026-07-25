import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(150),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().optional(),
  image: z.string().min(1),
  gallery: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  category: z.string().min(1),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  cgpa: z.string().optional().default(""),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  description: z.string().optional().default(""),
  order: z.number().default(0),
});

export const experienceSchema = z.object({
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  companyLogo: z.string().optional().default(""),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  responsibilities: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
  order: z.number().default(0),
});

export const achievementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  issuer: z.string().optional().default(""),
  category: z.string().min(1, "Category is required"),
  image: z.string().optional().default(""),
  date: z.string().optional().default(""),
  url: z.string().optional().default(""),
  order: z.number().default(0),
});

export const galleryItemSchema = z.object({
  image: z.string().min(1, "Image path is required"),
  caption: z.string().optional().default(""),
  order: z.number().default(0),
});

export const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().optional().default(""),
  avatar: z.string().optional().default(""),
  message: z.string().min(1, "Message is required"),
  order: z.number().default(0),
});

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().optional().default(""),
  published: z.boolean().default(false),
});
