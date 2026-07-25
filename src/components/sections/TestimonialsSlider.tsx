"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiUser } from "react-icons/fi";
import { BsQuote } from "react-icons/bs";
import { isRenderableImagePath } from "@/lib/utils";
import type { TestimonialDTO } from "@/types";

export function TestimonialsSlider({ testimonials }: { testimonials: TestimonialDTO[] }) {
  const [index, setIndex] = useState(0);
  if (testimonials.length === 0) return null;
  const current = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative mx-auto max-w-3xl">
      <BsQuote className="mx-auto mb-4 text-4xl text-primary/50" />
      <div className="relative min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="glass-card p-8 text-center"
          >
            <p className="text-lg leading-relaxed text-white/80">&ldquo;{current.message}&rdquo;</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="relative flex h-11 w-11 flex-none items-center justify-center overflow-hidden rounded-full bg-white/10 text-white/50">
                {isRenderableImagePath(current.avatar) ? (
                  <Image
                    src={current.avatar.trim()}
                    alt={current.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                ) : (
                  <FiUser />
                )}
              </span>
              <div className="text-left">
                <p className="font-display font-semibold">{current.name}</p>
                {current.role && <p className="text-sm text-white/50">{current.role}</p>}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="glass flex h-10 w-10 items-center justify-center rounded-full hover:text-secondary"
        >
          <FiChevronLeft />
        </button>
        <div className="flex gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-secondary" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="glass flex h-10 w-10 items-center justify-center rounded-full hover:text-secondary"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
