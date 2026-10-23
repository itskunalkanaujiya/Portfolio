"use client";

import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/lib/data/skills";
import {
  FiCode,
  FiZap,
  FiCpu,
  FiDatabase,
  FiTool,
  FiBookOpen,
  FiCloud,
} from "react-icons/fi";

// Per-category look: icon, accent colour and grid footprint on large screens.
// Class strings are written out in full so Tailwind can see them.
const categoryStyle: Record<
  string,
  { icon: typeof FiCode; accent: string; span: string }
> = {
  code: { icon: FiCode, accent: "#00E5FF", span: "lg:col-span-2" },
  genai: { icon: FiZap, accent: "#A78BFA", span: "sm:col-span-2 lg:col-span-4" },
  ml: { icon: FiCpu, accent: "#EC4899", span: "sm:col-span-2 lg:col-span-4" },
  database: { icon: FiDatabase, accent: "#34D399", span: "lg:col-span-2" },
  devops: { icon: FiCloud, accent: "#38BDF8", span: "lg:col-span-3" },
  tools: { icon: FiTool, accent: "#FBBF24", span: "lg:col-span-3" },
  subjects: { icon: FiBookOpen, accent: "#F472B6", span: "sm:col-span-2 lg:col-span-6" },
};

const allSkills = skillCategories.flatMap((c) => c.skills);

function trackSpotlight(e: MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

function Marquee() {
  const row = [...allSkills, ...allSkills];
  return (
    <div
      className="relative mb-8 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      aria-hidden
    >
      <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {row.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-white/50"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden">
      <div className="section-container">
        <SectionHeading
          eyebrow="Technical Skills"
          title="Tech stack"
          description="Languages, GenAI, ML, backend, cloud and fundamentals — the tools I reach for."
        />

        <Marquee />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {skillCategories.map((cat, catIdx) => {
            const style = categoryStyle[cat.icon] ?? categoryStyle.code;
            const Icon = style.icon;

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (catIdx % 3) * 0.08 }}
                onMouseMove={trackSpotlight}
                whileHover={{ y: -4 }}
                className={`glass-card group relative overflow-hidden p-5 ${style.span}`}
              >
                {/* cursor-following spotlight */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), ${style.accent}22, transparent 70%)`,
                  }}
                />

                <div className="relative mb-4 flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 flex-none items-center justify-center rounded-xl text-white"
                    style={{
                      background: `linear-gradient(135deg, ${style.accent}, ${style.accent}66)`,
                      boxShadow: `0 0 18px ${style.accent}55`,
                    }}
                  >
                    <Icon size={17} />
                  </span>
                  <h3 className="font-display text-base font-semibold">{cat.category}</h3>
                  <span className="ml-auto text-xs text-white/30">{cat.skills.length}</span>
                </div>

                <div className="relative flex flex-wrap gap-2">
                  {cat.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.15 + i * 0.04 }}
                      whileHover={{
                        y: -3,
                        scale: 1.07,
                        boxShadow: `0 6px 18px ${style.accent}44`,
                      }}
                      className="cursor-default rounded-lg border px-3 py-1.5 text-xs font-medium text-white/85 transition-colors hover:text-white"
                      style={{
                        borderColor: `${style.accent}33`,
                        backgroundColor: `${style.accent}12`,
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
