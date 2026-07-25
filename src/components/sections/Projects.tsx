import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/lib/queries";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="A selection of projects — filter by category or search by tech stack."
        />
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
