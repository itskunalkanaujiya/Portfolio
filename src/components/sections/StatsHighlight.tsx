"use client";

import { motion } from "framer-motion";
import { statItems } from "@/lib/data/stats";
import { Counter } from "@/components/ui/Counter";
import { GradientBlobs } from "@/components/ui/GradientBlobs";

export default function StatsHighlight() {
  return (
    <section className="relative overflow-hidden py-20">
      <GradientBlobs className="opacity-30" />
      <div className="section-container relative !py-0">
        <div className="glass-card grid grid-cols-2 gap-8 p-10 sm:grid-cols-4">
          {statItems.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-white/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
