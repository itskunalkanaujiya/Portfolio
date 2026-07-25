import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGallery } from "@/lib/queries";
import { GalleryGrid } from "@/components/sections/GalleryGrid";

export default async function Gallery() {
  const items = await getGallery();

  return (
    <section id="gallery" className="relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments & snapshots"
          description="Conference talks, hackathons, and behind-the-scenes moments."
        />
        <GalleryGrid items={items} />
      </div>
    </section>
  );
}
