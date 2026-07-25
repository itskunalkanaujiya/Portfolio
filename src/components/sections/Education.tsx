import { SectionHeading } from "@/components/ui/SectionHeading";
import { getEducation } from "@/lib/queries";
import { TimelineReveal } from "@/components/ui/TimelineReveal";
import { FiAward } from "react-icons/fi";

export default async function Education() {
  const education = await getEducation();

  return (
    <section id="education" className="relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Education"
          title="Academic background"
          description="Degrees, institutions, and the milestones along the way."
        />

        <div className="relative ml-3 border-l border-white/10 pl-8 sm:ml-6">
          {education.map((item, idx) => (
            <TimelineReveal key={item.id} index={idx}>
              <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white sm:-left-[45px]">
                <FiAward size={14} />
              </span>
              <div className="glass-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold text-white">
                    {item.degree}
                  </h3>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-secondary">
                    {item.startDate} — {item.endDate}
                  </span>
                </div>
                <p className="mt-1 font-medium text-white/70">{item.institution}</p>
                {item.cgpa && (
                  <p className="mt-1 text-sm text-white/50">CGPA / Score: {item.cgpa}</p>
                )}
                {item.description && (
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {item.description}
                  </p>
                )}
              </div>
            </TimelineReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
