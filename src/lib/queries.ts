import { prisma } from "@/lib/prisma";
import type {
  ProjectDTO,
  EducationDTO,
  ExperienceDTO,
  AchievementDTO,
  GalleryItemDTO,
} from "@/types";

/**
 * Every function here tries the real database first. If DATABASE_URL isn't
 * configured yet (fresh clone, no Postgres set up), it falls back to the
 * placeholder data below instead of crashing the page. Once you run
 * `npm run db:push && npm run db:seed`, these will start returning real rows.
 */

const fallbackEducation = [
  {
    id: "fallback-1",
    degree: "B.Tech in Computer Science",
    institution: "YOUR_COLLEGE",
    cgpa: "8.9 / 10",
    startDate: "2021",
    endDate: "2025",
    description: "Specialized in AI/ML and distributed systems.",
    order: 1,
  },
  {
    id: "fallback-2",
    degree: "Higher Secondary (XII)",
    institution: "YOUR_SCHOOL",
    cgpa: "92%",
    startDate: "2019",
    endDate: "2021",
    description: "Science stream with Computer Science.",
    order: 2,
  },
];

const fallbackExperience = [
  {
    id: "fallback-1",
    role: "Software Engineering Intern",
    company: "COMPANY_NAME",
    companyLogo: null,
    startDate: "May 2025",
    endDate: "Jul 2025",
    responsibilities: [
      "Built and shipped features for a production Next.js application",
      "Collaborated with design and backend teams on API contracts",
    ],
    achievements: ["Reduced page load time by 30%", "Shipped 3 major features"],
    order: 1,
  },
];

const fallbackProjects = [
  {
    id: "fallback-1",
    title: "PROJECT_TITLE_ONE",
    slug: "project-one",
    description: "A short one-line description of project one.",
    longDescription: "A longer placeholder description for project one.",
    image: "/images/PROJECT_IMAGE_1.jpg",
    gallery: ["/images/PROJECT_IMAGE_1.jpg"],
    techStack: ["Next.js", "TypeScript", "PostgreSQL"],
    category: "Full Stack",
    githubUrl: "https://github.com/YOUR_USERNAME/project-one",
    liveUrl: "https://project-one.example.com",
    featured: true,
    order: 1,
  },
  {
    id: "fallback-2",
    title: "PROJECT_TITLE_TWO",
    slug: "project-two",
    description: "A short one-line description of project two.",
    longDescription: "A longer placeholder description for project two.",
    image: "/images/PROJECT_IMAGE_2.jpg",
    gallery: ["/images/PROJECT_IMAGE_2.jpg"],
    techStack: ["Python", "TensorFlow", "FastAPI"],
    category: "AI/ML",
    githubUrl: "https://github.com/YOUR_USERNAME/project-two",
    liveUrl: "",
    featured: true,
    order: 2,
  },
  {
    id: "fallback-3",
    title: "PROJECT_TITLE_THREE",
    slug: "project-three",
    description: "A short one-line description of project three.",
    longDescription: "A longer placeholder description for project three.",
    image: "/images/PROJECT_IMAGE_3.jpg",
    gallery: ["/images/PROJECT_IMAGE_3.jpg"],
    techStack: ["React", "Node.js", "MongoDB"],
    category: "Frontend",
    githubUrl: "https://github.com/YOUR_USERNAME/project-three",
    liveUrl: "https://project-three.example.com",
    featured: false,
    order: 3,
  },
];

const fallbackAchievements = [
  { id: "fallback-1", title: "CERTIFICATE_TITLE", issuer: "ISSUING_PLATFORM", category: "Certificate", image: null, date: "2025", url: null, order: 1 },
  { id: "fallback-2", title: "HACKATHON_NAME — Winner", issuer: "ORGANIZER", category: "Hackathon", image: null, date: "2025", url: null, order: 2 },
  { id: "fallback-3", title: "AWARD_NAME", issuer: "ORGANIZER", category: "Award", image: null, date: "2024", url: null, order: 3 },
];

const fallbackGallery = [
  { id: "fallback-1", image: "/images/GALLERY_IMAGE_1.jpg", caption: "Placeholder caption 1", order: 1 },
  { id: "fallback-2", image: "/images/GALLERY_IMAGE_2.jpg", caption: "Placeholder caption 2", order: 2 },
  { id: "fallback-3", image: "/images/GALLERY_IMAGE_3.jpg", caption: "Placeholder caption 3", order: 3 },
  { id: "fallback-4", image: "/images/GALLERY_IMAGE_4.jpg", caption: "Placeholder caption 4", order: 4 },
];

export async function getEducation(): Promise<EducationDTO[]> {
  try {
    const data = await prisma.education.findMany({ orderBy: { order: "asc" } });
    return data.length ? data : fallbackEducation;
  } catch {
    return fallbackEducation;
  }
}

export async function getExperience(): Promise<ExperienceDTO[]> {
  try {
    const data = await prisma.experience.findMany({ orderBy: { order: "asc" } });
    return data.length ? data : fallbackExperience;
  } catch {
    return fallbackExperience;
  }
}

export async function getProjects(): Promise<ProjectDTO[]> {
  try {
    const data = await prisma.project.findMany({ orderBy: { order: "asc" } });
    return data.length ? data : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getAchievements(): Promise<AchievementDTO[]> {
  try {
    const data = await prisma.achievement.findMany({ orderBy: { order: "asc" } });
    return data.length ? data : fallbackAchievements;
  } catch {
    return fallbackAchievements;
  }
}

export async function getGallery(): Promise<GalleryItemDTO[]> {
  try {
    const data = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
    return data.length ? data : fallbackGallery;
  } catch {
    return fallbackGallery;
  }
}
