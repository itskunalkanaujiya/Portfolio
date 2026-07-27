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
  { label: "Contact", href: "#contact" },
];

export const socialLinks = {
  github: "https://github.com/itskunalkanaujiya",
  linkedin: "https://www.linkedin.com/in/kunal-kanaujiya-2719902a4/",
  twitter: "https://x.com/kanaujiya_kunal",
  leetcode: "https://leetcode.com/u/7754024423/",
  email: "https://mail.google.com/mail/?view=cm&fs=1&to=kunalkanaujiya123@gmail.com",
};

// Your headshot/profile photo, shown in the Hero and About sections.
// Save the actual image file into public/images/ and put its path here,
// e.g. "/images/profile-photo.jpg". Leave as null to keep the placeholder box.
export const profilePhoto: string | null ="/images/profile.png";

// Google Maps embed URL shown in the Contact section. Get this from
// Google Maps -> Share -> "Embed a map" tab -> Copy HTML, then take just the
// URL inside src="...". Leave as null to keep the placeholder box instead.
export const mapEmbedUrl: string | null =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.1793491538924!2d80.924229875225!3d26.929528176637188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399956f60cf02329%3A0x2c34841a351abcbf!2sSemra%20Gaudhi%20Rd%2C%20Diguria%2C%20Aziz%20Nagar%2C%20Lucknow%2C%20Raipur%2C%20Uttar%20Pradesh%20226013!5e0!3m2!1sen!2sin!4v1785168175728!5m2!1sen!2sin";
