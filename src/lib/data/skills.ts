import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    icon: "code",
    skills: ["Python", "SQL", "Java", "C++", "C"],
  },
  {
    category: "Generative AI",
    icon: "genai",
    skills: [
      "LangChain",
      "LangGraph",
      "LangSmith",
      "HuggingFace",
      "LLMs",
      "RAG",
      "Multimodal LLMs",
      "Vision-Language Models (VLM)",
      "Prompt Engineering",
    ],
  },
  {
    category: "Machine Learning",
    icon: "ml",
    skills: [
      "Scikit-learn",
      "NLP",
      "OpenCV",
      "PyTorch",
      "CLIP",
      "MediaPipe",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
    ],
  },
  {
    category: "Backend & Databases",
    icon: "database",
    skills: [
      "FastAPI",
      "PostgreSQL",
      "REST APIs",
      "Web Scraping",
      "FAISS",
      "ChromaDB",
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: "devops",
    skills: [
      "AWS (EC2, S3, Lambda)",
      "Azure Kubernetes Service (AKS)",
      "CI/CD",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    category: "Tools & Platforms",
    icon: "tools",
    skills: ["Git", "GitHub", "Linux", "Jupyter Notebook", "Render", "Vercel", "Streamlit"],
  },
  {
    category: "Core Subjects",
    icon: "subjects",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOPs)",
      "Database Management Systems (DBMS)",
      "Operating Systems",
      "Computer Networks",
    ],
  },
];
