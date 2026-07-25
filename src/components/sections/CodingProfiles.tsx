"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { codingProfiles } from "@/lib/data/coding-profiles";
import {
  SiLeetcode,
  SiCodeforces,
  SiCodechef,
  SiGeeksforgeeks,
  SiGithub,
} from "react-icons/si";
import { FiLinkedin } from "react-icons/fi";

const iconMap: Record<string, typeof SiLeetcode> = {
  leetcode: SiLeetcode,
  codeforces: SiCodeforces,
  codechef: SiCodechef,
  gfg: SiGeeksforgeeks,
  github: SiGithub,
  linkedin: FiLinkedin,
};

export default function CodingProfiles() {
  return (
    <section id="coding-profiles" className="relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Coding Profiles"
          title="Find me across the web"
          description="Competitive programming, open source, and professional profiles."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {codingProfiles.map((profile, idx) => {
            const Icon = iconMap[profile.icon] ?? SiGithub;
            return (
              <motion.a
                key={profile.platform}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                className="glass-card group flex items-center gap-4 p-6"
              >
                <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-2xl text-white transition-transform group-hover:scale-110">
                  <Icon />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{profile.platform}</h3>
                  <p className="text-sm text-white/50">@{profile.username}</p>
                  <p className="mt-1 text-sm text-secondary">{profile.stat}</p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
