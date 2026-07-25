"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function TimelineReveal({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.4) }}
      className="relative mb-10 last:mb-0"
    >
      {children}
    </motion.div>
  );
}
