"use client";

import { navLinks, socialLinks } from "@/lib/data/nav";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp } from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/5">
      <div className="section-container grid gap-10 !py-16 sm:grid-cols-3">
        <div>
          <a href="#hero" className="font-display text-xl font-bold">
            <span className="gradient-text">YOUR_NAME</span>
          </a>
          <p className="mt-3 max-w-xs text-sm text-white/50">
            Building premium, performant digital experiences — one project at a time.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-white/70">
            Quick Links
          </h4>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-white/50 hover:text-secondary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-white/70">
            Connect
          </h4>
          <div className="mt-4 flex gap-3">
            {[
              { icon: FiGithub, href: socialLinks.github, label: "GitHub" },
              { icon: FiLinkedin, href: socialLinks.linkedin, label: "LinkedIn" },
              { icon: FiTwitter, href: socialLinks.twitter, label: "Twitter" },
              { icon: FiMail, href: socialLinks.email, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-secondary"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="section-container flex flex-col items-center justify-between gap-4 border-t border-white/5 !py-6 sm:flex-row">
        <p className="text-xs text-white/40">
          © {year} YOUR_NAME. All rights reserved.
        </p>
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="glass flex h-10 w-10 items-center justify-center rounded-full text-white/60 hover:text-secondary"
        >
          <FiArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
