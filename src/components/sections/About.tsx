"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Counter } from "@/components/ui/Counter";
import { statItems } from "@/lib/data/stats";
import { profilePhoto } from "@/lib/data/nav";
import { isRenderableImagePath } from "@/lib/utils";
import { FiMapPin, FiCalendar, FiBookOpen, FiCode } from "react-icons/fi";

const personalDetails = [
  { icon: FiMapPin, label: "Location", value: "YOUR_CITY, YOUR_COUNTRY" },
  { icon: FiCalendar, label: "Availability", value: "Open to opportunities" },
  { icon: FiBookOpen, label: "Education", value: "YOUR_DEGREE, YOUR_COLLEGE" },
  { icon: FiCode, label: "Focus", value: "Full Stack & AI/ML" },
];

export default function About() {
  return (
    <section id="about" className="relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="About Me"
          title="Turning ideas into interactive experiences"
          description="A quick look at who I am, what I do, and how I got here."
        />

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto aspect-[4/5] w-full max-w-sm"
          >
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-primary to-secondary opacity-20 blur-xl" />
            <div className="glass relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10">
              {isRenderableImagePath(profilePhoto) ? (
                <Image
                  src={profilePhoto.trim()}
                  alt="Profile photo"
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover"
                />
              ) : (
                <span className="font-display text-white/40">YOUR_PHOTO</span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-4 text-white/70">
              <p>
                I&apos;m <strong className="text-white">YOUR_NAME</strong>, a
                software engineer who loves building things that live at the
                intersection of great design and solid engineering. Placeholder
                biography paragraph — replace with your own story: what got
                you into building software, what you care about, and what
                kind of problems excite you.
              </p>
              <p>
                Outside of code, I enjoy YOUR_HOBBY_1, YOUR_HOBBY_2, and
                contributing to open source. I&apos;m currently focused on
                YOUR_CURRENT_FOCUS.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {personalDetails.map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass-card flex items-center gap-3 p-4">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary/20 text-secondary">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/40">{label}</p>
                    <p className="text-sm font-medium text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {statItems.map((stat) => (
                <GlassCard key={stat.label} className="text-center">
                  <Counter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-2 text-xs text-white/50">{stat.label}</p>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
