"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-16 max-w-2xl"
    >
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="section-heading mt-3">{title}</h2>
      {description && <p className="mt-4 text-lg text-white/60">{description}</p>}
    </motion.div>
  );
}
