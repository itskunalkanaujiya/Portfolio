export interface NavLink {
  label: string;
  href: string;
}

export interface SkillCategory {
  category: string;
  icon: string; // react-icons key handled in component map
  skills: string[];
}

export interface CodingProfile {
  platform: string;
  username: string;
  url: string;
  stat: string; // e.g. "1800+ rating" or "300+ problems"
  icon: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

// Loose shape shared by both real Prisma rows and the static fallback data
// in lib/queries.ts, so components don't break before a database is connected.
export interface ProjectDTO {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string | null;
  image: string;
  gallery: string[];
  techStack: string[];
  category: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
  featured: boolean;
  order: number;
}

export interface EducationDTO {
  id: string;
  degree: string;
  institution: string;
  cgpa?: string | null;
  startDate: string;
  endDate: string;
  description?: string | null;
  order: number;
}

export interface ExperienceDTO {
  id: string;
  role: string;
  company: string;
  companyLogo?: string | null;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  achievements: string[];
  order: number;
}

export interface AchievementDTO {
  id: string;
  title: string;
  issuer?: string | null;
  category: string;
  image?: string | null;
  date?: string | null;
  url?: string | null;
  order: number;
}

export interface GalleryItemDTO {
  id: string;
  image: string;
  caption?: string | null;
  order: number;
}

export interface TestimonialDTO {
  id: string;
  name: string;
  role?: string | null;
  avatar?: string | null;
  message: string;
  order: number;
}

export interface BlogPostDTO {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  published: boolean;
  createdAt: string | Date;
}

export interface ContactMessageDTO {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string | Date;
}

// ---------- Generic admin CRUD config ----------

export type AdminFieldType = "text" | "textarea" | "checkbox" | "array";

export interface AdminFieldConfig {
  key: string;
  label: string;
  type: AdminFieldType;
  placeholder?: string;
  required?: boolean;
  helperText?: string; // e.g. "Comma separated" for array fields
}

export interface AdminResourceConfig {
  resource: string; // API path segment, e.g. "education"
  label: string; // e.g. "Education"
  titleKey: string; // field shown as the main row label
  subtitleKey?: string; // field shown as secondary row text
  fields: AdminFieldConfig[];
  hasOrder?: boolean; // defaults to true; set false for models without an `order` column (e.g. BlogPost)
}


