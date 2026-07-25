import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getExperience } from "@/lib/queries";
import { TimelineReveal } from "@/components/ui/TimelineReveal";
import { isRenderableImagePath } from "@/lib/utils";
import { FiBriefcase, FiCheckCircle } from "react-icons/fi";

export default async function Experience() {
  const experience = await getExperience();

  return (
    <section id="experience" className="relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="Internships and roles that shaped how I build software."
        />

        <div className="relative ml-3 border-l border-white/10 pl-8 sm:ml-6">
          {experience.map((item, idx) => (
            <TimelineReveal key={item.id} index={idx}>
              <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white sm:-left-[45px]">
                <FiBriefcase size={14} />
              </span>
              <div className="glass-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="glass relative flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-xl text-[10px] text-white/40">
                      {isRenderableImagePath(item.companyLogo) ? (
                        <Image
                          src={item.companyLogo.trim()}
                          alt={`${item.company} logo`}
                          fill
                          sizes="48px"
                          className="object-contain p-1.5"
                        />
                      ) : (
                        "LOGO"
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">
                        {item.role}
                      </h3>
                      <p className="font-medium text-white/70">{item.company}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-secondary">
                    {item.startDate} — {item.endDate}
                  </span>
                </div>

                {item.responsibilities.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {item.responsibilities.map((r, i) => (
                      <li key={i} className="flex gap-2 text-sm text-white/60">
                        <FiCheckCircle className="mt-0.5 flex-none text-secondary" size={14} />
                        {r}
                      </li>
                    ))}
                  </ul>
                )}

                {item.achievements.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.achievements.map((a, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-primary/15 px-3 py-1 text-xs text-primary-foreground/90"
                      >
                        🏆 {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </TimelineReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
