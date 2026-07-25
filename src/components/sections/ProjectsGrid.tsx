"use client";

import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { cn } from "@/lib/utils";
import type { ProjectDTO } from "@/types";

export function ProjectsGrid({ projects }: { projects: ProjectDTO[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeProject, setActiveProject] = useState<ProjectDTO | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, search, category]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                category === cat
                  ? "border-transparent bg-gradient-to-r from-primary to-secondary text-white"
                  : "border-white/10 text-white/60 hover:border-secondary hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="glass flex items-center gap-2 rounded-full px-4 py-2.5 sm:w-64">
          <FiSearch className="text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            aria-label="Search projects"
            className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-white/40">No projects match your search.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onView={() => setActiveProject(project)}
            />
          ))}
        </div>
      )}

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
