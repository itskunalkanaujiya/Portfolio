"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiEye } from "react-icons/fi";
import { isRenderableImagePath } from "@/lib/utils";
import type { ProjectDTO } from "@/types";

export function ProjectCard({
  project,
  onView,
  index,
}: {
  project: ProjectDTO;
  onView: () => void;
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      className="glass-card group relative flex flex-col overflow-hidden"
    >
      <div className="relative aspect-video overflow-hidden bg-white/5">
        {isRenderableImagePath(project.image) ? (
          <Image
            src={project.image.trim()}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-white/30 transition-transform duration-500 group-hover:scale-105">
            PROJECT_IMAGE
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-background/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={onView}
            aria-label={`View details for ${project.title}`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-secondary hover:text-background"
          >
            <FiEye size={18} />
          </button>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-secondary hover:text-background"
            >
              <FiGithub size={18} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-secondary hover:text-background"
            >
              <FiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-medium uppercase tracking-wide text-secondary">
          {project.category}
        </span>
        <h3 className="mt-2 font-display text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm text-white/60">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/60">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
