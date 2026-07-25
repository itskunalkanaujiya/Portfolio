"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/lib/data/skills";
import {
  FiCode,
  FiLayout,
  FiServer,
  FiCpu,
  FiDatabase,
  FiCloud,
  FiTool,
} from "react-icons/fi";

const iconMap: Record<string, typeof FiCode> = {
  code: FiCode,
  layout: FiLayout,
  server: FiServer,
  brain: FiCpu,
  database: FiDatabase,
  cloud: FiCloud,
  tool: FiTool,
};

export default function Skills() {
  return (
    <section id="skills" className="relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Technical Skills"
          title="Tools & technologies I work with"
          description="Organized by category, with an honest sense of where I'm strongest."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, catIdx) => {
            const Icon = iconMap[cat.icon] ?? FiCode;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (catIdx % 3) * 0.08 }}
                className="glass-card p-6"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
                    <Icon size={18} />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{cat.category}</h3>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1.5 flex justify-between text-sm">
                        <span className="text-white/80">{skill.name}</span>
                        <span className="text-white/40">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        />
                      </div>
                    </div>
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
