"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { cn, isRenderableImagePath } from "@/lib/utils";
import type { AchievementDTO } from "@/types";

export function AchievementsGrid({ achievements }: { achievements: AchievementDTO[] }) {
  const [filter, setFilter] = useState("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(achievements.map((a) => a.category)))],
    [achievements]
  );
  const filtered =
    filter === "All" ? achievements : achievements.filter((a) => a.category === filter);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filter === cat
                ? "border-transparent bg-gradient-to-r from-primary to-secondary text-white"
                : "border-white/10 text-white/60 hover:border-secondary hover:text-white"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, idx) => (
          <motion.a
            key={item.id}
            href={item.url ?? undefined}
            target={item.url ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
            className="glass-card group flex flex-col overflow-hidden"
          >
            <div className="relative flex aspect-[4/3] items-center justify-center bg-white/5 text-sm text-white/30">
              {isRenderableImagePath(item.image) ? (
                <Image
                  src={item.image.trim()}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <FiAward size={28} />
              )}
            </div>
            <div className="p-5">
              <span className="text-xs font-medium uppercase tracking-wide text-secondary">
                {item.category}
              </span>
              <h3 className="mt-1 font-display text-base font-semibold leading-snug">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-white/50">
                {item.issuer} {item.date && `· ${item.date}`}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
