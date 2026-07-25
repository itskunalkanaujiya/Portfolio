import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    icon: "code",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "Python", level: 85 },
      { name: "C++", level: 80 },
    ],
  },
  {
    category: "Frontend",
    icon: "layout",
    skills: [
      { name: "React", level: 92 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Three.js", level: 70 },
    ],
  },
  {
    category: "Backend",
    icon: "server",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 70 },
    ],
  },
  {
    category: "AI / ML",
    icon: "brain",
    skills: [
      { name: "TensorFlow", level: 75 },
      { name: "PyTorch", level: 72 },
      { name: "Scikit-learn", level: 80 },
    ],
  },
  {
    category: "Databases",
    icon: "database",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Redis", level: 70 },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: "cloud",
    skills: [
      { name: "AWS", level: 75 },
      { name: "Docker", level: 78 },
      { name: "Vercel", level: 88 },
      { name: "CI/CD", level: 72 },
    ],
  },
  {
    category: "Tools",
    icon: "tool",
    skills: [
      { name: "Git", level: 90 },
      { name: "Figma", level: 75 },
      { name: "Postman", level: 85 },
    ],
  },
];
