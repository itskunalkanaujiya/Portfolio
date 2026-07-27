import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    icon: "code",
    skills: ["Python", "SQL", "C++", "C"],
  },
  {
    category: "Web Development",
    icon: "web",
    skills: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
  },
  {
    category: "Generative AI",
    icon: "genai",
    skills: ["LangChain", "HuggingFace", "LLMs", "Prompt Engineering", "RAG", "Groq API"],
  },
  {
    category: "Machine Learning",
    icon: "ml",
    skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "NLP", "OpenCV"],
  },
  {
    category: "Databases",
    icon: "database",
    skills: ["SQLite", "Vector Databases (FAISS)"],
  },
  {
    category: "Tools & DevOps",
    icon: "tools",
    skills: ["FastAPI", "Docker","Kubernetes", "Render", "Streamlit", "Git", "GitHub", "Jupyter Notebook"],
  },
  {
    category: "Core Subjects",
    icon: "subjects",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
    ],
  },
];
