"use client";
import { SiLeetcode } from "react-icons/si";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowDown } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { socialLinks, profilePhoto } from "@/lib/data/nav";
import { isRenderableImagePath } from "@/lib/utils";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const ROLES = [
  "Software Engineer",
  "AI/ML Developer",
   "LLM & Agentic AI Enthusiast",
   "Competitive Programmer"

];

function useTypingEffect(words: string[], speed = 90, pause = 1400) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: NodeJS.Timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 2);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

export default function Hero() {
  const typedText = useTypingEffect(ROLES);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-mesh"
    >
      <HeroScene />
      <ParticlesBackground count={70} />
      <div className="pointer-events-none absolute inset-0 bg-background/40" />

      <div className="section-container relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="section-eyebrow">Hi, my name is</span>
          <h1 className="section-heading mt-3 !text-5xl sm:!text-6xl lg:!text-7xl">
            <span className="gradient-text">Kunal Kanaujiya</span>
          </h1>
          <div className="mt-4 h-10 font-display text-2xl font-medium text-white/80 sm:text-3xl">
            {typedText}
            <span className="animate-pulse text-secondary">|</span>
          </div>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
           I engineer intelligent digital experiences by integrating AI, modern web frameworks, and cloud infrastructure—delivering scalable, high-performance applications from concept to deployment.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="/resume/Kunal_Kanaujiya_Resume.pdf" download>
              <Button size="lg">Download Resume</Button>
            </a>
            <a href="#projects">
              <Button size="lg" variant="outline">
                View Projects
              </Button>
            </a>
            <a href="#contact">
              <Button size="lg" variant="ghost">
                Hire Me
              </Button>
            </a>
          </div>

          <div className="mt-12 flex items-center gap-5">
            {[
              { icon: FiGithub, href: socialLinks.github, label: "GitHub" },
              { icon: FiLinkedin, href: socialLinks.linkedin, label: "LinkedIn" },
              { icon: SiLeetcode, href: socialLinks.leetcode, label: "LeetCode" },
              { icon: FiMail, href: socialLinks.email, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-colors hover:text-secondary"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative mx-auto hidden aspect-square w-full max-w-sm items-center justify-center sm:flex"
        >
          <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-to-tr from-primary via-secondary to-pink-500 opacity-30 blur-2xl" />
          <div className="glass relative h-full w-full overflow-hidden rounded-full border-2 border-white/10 p-2">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white/5 font-display text-sm text-white/40">
              {isRenderableImagePath(profilePhoto) ? (
                <Image
                  src={profilePhoto.trim()}
                  alt="Profile photo"
                  fill
                  sizes="384px"
                  className="object-cover"
                />
              ) : (
                "YOUR_PHOTO"
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-white/50 hover:text-secondary"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <FiArrowDown size={22} />
      </motion.a>
    </section>
  );
}
