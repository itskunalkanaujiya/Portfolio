import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTestimonials } from "@/lib/queries";
import { TestimonialsSlider } from "@/components/sections/TestimonialsSlider";

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section id="testimonials" className="relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Testimonials"
          title="What people say"
          description="Feedback from managers, peers, and collaborators."
        />
        <TestimonialsSlider testimonials={testimonials} />
      </div>
    </section>
  );
}
