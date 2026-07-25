"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight, FiImage } from "react-icons/fi";
import { isRenderableImagePath } from "@/lib/utils";
import type { GalleryItemDTO } from "@/types";

export function GalleryGrid({ items }: { items: GalleryItemDTO[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, idx) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveIndex(idx)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: (idx % 4) * 0.06 }}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-white/5"
            aria-label={`Open ${item.caption ?? "gallery image"} in lightbox`}
          >
            <div className="flex h-full w-full items-center justify-center text-white/30 transition-transform duration-500 group-hover:scale-110">
              {isRenderableImagePath(item.image) ? (
                <Image
                  src={item.image.trim()}
                  alt={item.caption ?? "Gallery photo"}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              ) : (
                <FiImage size={22} />
              )}
            </div>
            {item.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {item.caption}
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setActiveIndex(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setActiveIndex(null)}
              aria-label="Close lightbox"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <FiX size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((i) => (i === null ? 0 : (i - 1 + items.length) % items.length));
              }}
              aria-label="Previous image"
              className="absolute left-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <FiChevronLeft size={20} />
            </button>
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="glass relative flex aspect-video w-full max-w-3xl items-center justify-center overflow-hidden rounded-2xl text-white/40"
            >
              {isRenderableImagePath(items[activeIndex].image) ? (
                <Image
                  src={items[activeIndex].image.trim()}
                  alt={items[activeIndex].caption ?? "Gallery photo"}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-contain"
                />
              ) : (
                items[activeIndex].caption ?? "GALLERY_IMAGE"
              )}
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((i) => (i === null ? 0 : (i + 1) % items.length));
              }}
              aria-label="Next image"
              className="absolute right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <FiChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
