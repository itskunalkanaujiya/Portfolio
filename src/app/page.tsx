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
import Contact from "@/components/sections/Contact";

// Force this page to always fetch fresh data from the database on every
// request instead of serving a cached copy built at deploy time. Without
// this, admin panel changes (especially deletes) can appear to "not work"
// on the live site because visitors keep seeing the page as it looked at
// the last deployment.
export const dynamic = "force-dynamic";

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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
