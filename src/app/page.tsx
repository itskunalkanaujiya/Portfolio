import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import StatsHighlight from "@/components/sections/StatsHighlight";
import CodingProfiles from "@/components/sections/CodingProfiles";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import BlogPreview from "@/components/sections/BlogPreview";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <StatsHighlight />
        <CodingProfiles />
        <Testimonials />
        <Gallery />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
