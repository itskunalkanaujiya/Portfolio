"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { socialLinks } from "@/lib/data/nav";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiMapPin } from "react-icons/fi";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }

      toast.success("Message sent — I'll get back to you soon!");
      reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send message.");
    }
  }

  return (
    <section id="contact" className="relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          description="Have a project in mind, or just want to say hi? Send a message."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <form onSubmit={handleSubmit(onSubmit)} className="glass-card space-y-5 p-8" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm text-white/70">
                  Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-secondary focus:outline-none"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm text-white/70">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-secondary focus:outline-none"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-1.5 block text-sm text-white/70">
                Subject
              </label>
              <input
                id="subject"
                {...register("subject")}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-secondary focus:outline-none"
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-white/70">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-secondary focus:outline-none"
                placeholder="Tell me a bit about your project..."
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
              )}
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>

          <div className="flex flex-col gap-6">
            <div className="glass-card flex aspect-video items-center justify-center p-6 text-white/30">
              <FiMapPin className="mr-2" /> Google Maps placeholder — embed your location
            </div>

            <div className="glass-card p-6">
              <h3 className="font-display text-lg font-semibold">Find me elsewhere</h3>
              <div className="mt-4 flex gap-4">
                {[
                  { icon: FiGithub, href: socialLinks.github, label: "GitHub" },
                  { icon: FiLinkedin, href: socialLinks.linkedin, label: "LinkedIn" },
                  { icon: FiTwitter, href: socialLinks.twitter, label: "Twitter" },
                  { icon: FiMail, href: socialLinks.email, label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-secondary"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
