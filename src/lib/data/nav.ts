import { NavLink } from "@/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Coding", href: "#coding-profiles" },
  { label: "Gallery", href: "#gallery" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks = {
  github: "https://github.com/YOUR_USERNAME",
  linkedin: "https://linkedin.com/in/YOUR_USERNAME",
  twitter: "https://twitter.com/YOUR_USERNAME",
  leetcode: "https://leetcode.com/YOUR_USERNAME",
  email: "mailto:YOUR_EMAIL@example.com",
};

// Your headshot/profile photo, shown in the Hero and About sections.
// Save the actual image file into public/images/ and put its path here,
// e.g. "/images/profile-photo.jpg". Leave as null to keep the placeholder box.
export const profilePhoto: string | null = "/images/formalprofilepicture.png";
