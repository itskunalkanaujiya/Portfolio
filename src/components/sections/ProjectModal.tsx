"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import { isRenderableImagePath } from "@/lib/utils";
import type { ProjectDTO } from "@/types";

export function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectDTO | null;
  onClose: () => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const gallery = project?.gallery?.length ? project.gallery : project ? [project.image] : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <FiX size={18} />
            </button>

            {/* Carousel */}
            <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl bg-white/5">
              {isRenderableImagePath(gallery[imgIndex]) ? (
                <Image
                  src={gallery[imgIndex].trim()}
                  alt={`${project.title} screenshot ${imgIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-white/30">
                  PROJECT_IMAGE
                </div>
              )}
              {gallery.length > 1 && (
                <>
                  <button
                    aria-label="Previous image"
                    onClick={() => setImgIndex((i) => (i - 1 + gallery.length) % gallery.length)}
                    className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                  >
                    <FiChevronLeft />
                  </button>
                  <button
                    aria-label="Next image"
                    onClick={() => setImgIndex((i) => (i + 1) % gallery.length)}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                  >
                    <FiChevronRight />
                  </button>
                </>
              )}
            </div>

            <span className="rounded-full bg-primary/20 px-3 py-1 text-xs text-secondary">
              {project.category}
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{project.title}</h3>
            <p className="mt-3 text-white/60">
              {project.longDescription || project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium hover:border-secondary hover:text-secondary"
                >
                  <FiGithub /> Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-white hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.7)]"
                >
                  <FiExternalLink /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
