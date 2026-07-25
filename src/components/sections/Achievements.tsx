import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAchievements } from "@/lib/queries";
import { AchievementsGrid } from "@/components/sections/AchievementsGrid";

export default async function Achievements() {
  const achievements = await getAchievements();

  return (
    <section id="achievements" className="relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Achievements"
          title="Certificates & recognitions"
          description="Certifications, hackathon wins, awards, and competitive programming milestones."
        />
        <AchievementsGrid achievements={achievements} />
      </div>
    </section>
  );
}
