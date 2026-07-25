import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Admin ---
  const passwordHash = await bcrypt.hash("changeme123", 10);
  await prisma.admin.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: { email: "admin@example.com", passwordHash },
  });

  // --- Education ---
  await prisma.education.createMany({
    data: [
      {
        degree: "B.Tech in Computer Science",
        institution: "YOUR_COLLEGE",
        cgpa: "8.9 / 10",
        startDate: "2021",
        endDate: "2025",
        description: "Specialized in AI/ML and distributed systems. Placeholder description.",
        order: 1,
      },
      {
        degree: "Higher Secondary (XII)",
        institution: "YOUR_SCHOOL",
        cgpa: "92%",
        startDate: "2019",
        endDate: "2021",
        description: "Science stream with Computer Science. Placeholder description.",
        order: 2,
      },
    ],
    skipDuplicates: true,
  });

  // --- Experience ---
  await prisma.experience.createMany({
    data: [
      {
        role: "Software Engineering Intern",
        company: "COMPANY_NAME",
        companyLogo: "/images/COMPANY_LOGO.png",
        startDate: "May 2025",
        endDate: "Jul 2025",
        responsibilities: [
          "Built and shipped features for a production Next.js application",
          "Collaborated with design and backend teams on API contracts",
        ],
        achievements: ["Reduced page load time by 30%", "Shipped 3 major features"],
        order: 1,
      },
    ],
    skipDuplicates: true,
  });

  // --- Projects ---
  await prisma.project.createMany({
    data: [
      {
        title: "PROJECT_TITLE_ONE",
        slug: "project-one",
        description: "A short one-line description of project one.",
        longDescription: "A longer placeholder description explaining the problem, solution, and impact of project one.",
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
    ],
    skipDuplicates: true,
  });

  // --- Achievements ---
  await prisma.achievement.createMany({
    data: [
      { title: "CERTIFICATE_TITLE", issuer: "ISSUING_PLATFORM", category: "Certificate", image: "/images/CERTIFICATE_IMAGE_1.jpg", date: "2025", order: 1 },
      { title: "HACKATHON_NAME — Winner", issuer: "ORGANIZER", category: "Hackathon", image: "/images/CERTIFICATE_IMAGE_2.jpg", date: "2025", order: 2 },
    ],
    skipDuplicates: true,
  });

  // --- Gallery ---
  await prisma.galleryItem.createMany({
    data: [
      { image: "/images/GALLERY_IMAGE_1.jpg", caption: "Placeholder caption 1", order: 1 },
      { image: "/images/GALLERY_IMAGE_2.jpg", caption: "Placeholder caption 2", order: 2 },
      { image: "/images/GALLERY_IMAGE_3.jpg", caption: "Placeholder caption 3", order: 3 },
    ],
    skipDuplicates: true,
  });

  // --- Testimonials ---
  await prisma.testimonial.createMany({
    data: [
      { name: "TESTIMONIAL_NAME_1", role: "Manager at COMPANY_NAME", message: "Placeholder testimonial praising the candidate's work ethic and skill.", order: 1 },
      { name: "TESTIMONIAL_NAME_2", role: "Peer / Collaborator", message: "Placeholder testimonial about collaboration and delivery quality.", order: 2 },
    ],
    skipDuplicates: true,
  });

  // --- Blog ---
  await prisma.blogPost.createMany({
    data: [
      {
        title: "My First Blog Post",
        slug: "my-first-blog-post",
        excerpt: "A placeholder excerpt introducing the blog post topic.",
        content: "# My First Blog Post\n\nThis is placeholder **markdown** content. Replace with your own writing.",
        coverImage: "/images/BLOG_COVER_1.jpg",
        published: true,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
