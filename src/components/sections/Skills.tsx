"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/lib/data/skills";
import { cn } from "@/lib/utils";
import {
  FiCode,
  FiGlobe,
  FiZap,
  FiCpu,
  FiDatabase,
  FiTool,
  FiBookOpen,
} from "react-icons/fi";

const iconMap: Record<string, typeof FiCode> = {
  code: FiCode,
  web: FiGlobe,
  genai: FiZap,
  ml: FiCpu,
  database: FiDatabase,
  tools: FiTool,
  subjects: FiBookOpen,
};

function CircuitCorner() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      className="pointer-events-none absolute right-4 top-4 opacity-20"
      aria-hidden
    >
      <path d="M40 4H14a4 4 0 0 0-4 4v22" stroke="url(#circuit-grad)" strokeWidth="1.5" />
      <circle cx="10" cy="30" r="2" fill="#00E5FF" />
      <defs>
        <linearGradient id="circuit-grad" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#7C3AED" />
          <stop offset="1" stopColor="#00E5FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden">
      <div className="section-container">
        <SectionHeading
          eyebrow="Technical Skills"
          title="Tech stack"
          description="Organized the way I actually think about it — languages, web, AI/ML, data, tooling, and fundamentals."
        />

        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3 [grid-auto-flow:dense]">
          {skillCategories.map((cat, catIdx) => {
            const Icon = iconMap[cat.icon] ?? FiCode;
            const isWide = cat.skills.length >= 6;

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (catIdx % 3) * 0.08 }}
                className={cn(
                  "glass-card relative flex flex-col p-6",
                  isWide && "lg:col-span-2"
                )}
              >
                <CircuitCorner />
                <span className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                  Tech Stack
                </span>
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{cat.category}</h3>
                </div>

                <ul className={cn("divide-y divide-white/5", isWide && "sm:columns-2")}>
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 py-2.5 text-sm text-white/75 first:pt-0 [break-inside:avoid]"
                    >
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-secondary" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
