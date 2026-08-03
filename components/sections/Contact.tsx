"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import SectionReveal from "@/components/animations/SectionReveal";
import MagneticButton from "@/components/animations/MagneticButton";
import { PERSONAL } from "@/lib/data";
import { Send, CheckCircle, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
    if (!formId) {
      console.warn("Formspree Form ID is missing. Please set NEXT_PUBLIC_FORMSPREE_FORM_ID in your .env.local file.");
      // For development fallback or simulation if not set yet:
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        const successEl = document.getElementById("success-animation");
        if (successEl) {
          gsap.fromTo(
            successEl,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }
          );
        }
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: "", email: "", message: "" });
        }, 3000);
      }, 1000);
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        // Success animation
        setTimeout(() => {
          const successEl = document.getElementById("success-animation");
          if (successEl) {
            gsap.fromTo(
              successEl,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }
            );
          }
        }, 50);

        // Reset after 5 seconds to give the user enough time to see the success message
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: "", email: "", message: "" });
        }, 5000);
      } else {
        const data = await response.json();
        setSubmitError(data.error || "Failed to send message. Please try again later.");
      }
    } catch (err) {
      setSubmitError("An error occurred. Please check your connection and try again.");
      console.error("Formspree submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Big Typography */}
        <SectionReveal>
          <div className="mb-16">
            <span className="section-label">Get in Touch</span>
            <h2
              className="font-extrabold tracking-tighter leading-[0.9] mt-4"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
            >
              LET&apos;S BUILD
              <br />
              SOMETHING
              <br />
              <span className="text-accent">AMAZING</span>
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Info + CTA */}
          <SectionReveal>
            <p className="text-lg text-secondary leading-relaxed mb-8 max-w-md">
              Have a project in mind? Let&apos;s talk about how we can work
              together to create something extraordinary.
            </p>

            <MagneticButton className="mb-10">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="magnetic-btn inline-flex items-center gap-3 px-10 py-5 rounded-full bg-foreground text-background text-lg font-bold hover:text-foreground transition-colors duration-500"
              >
                <Mail size={20} />
                Say Hello
              </a>
            </MagneticButton>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: FaGithub, href: PERSONAL.github, label: "GitHub" },
                { icon: FaLinkedin, href: PERSONAL.linkedin, label: "LinkedIn" },
                { icon: FaTwitter, href: PERSONAL.twitter, label: "Twitter" },
                {
                  icon: Mail,
                  href: `mailto:${PERSONAL.email}`,
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <MagneticButton key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </SectionReveal>

          {/* Right — Contact Form */}
          <SectionReveal delay={0.2}>
            {!submitted ? (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-[0.2em] text-secondary mb-2 font-medium"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-transparent border-b-2 border-border py-3 text-lg font-medium outline-none focus:border-accent transition-colors placeholder:text-muted"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-[0.2em] text-secondary mb-2 font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-transparent border-b-2 border-border py-3 text-lg font-medium outline-none focus:border-accent transition-colors placeholder:text-muted"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-[0.2em] text-secondary mb-2 font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-transparent border-b-2 border-border py-3 text-lg font-medium outline-none focus:border-accent transition-colors resize-none placeholder:text-muted"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {submitError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm font-medium">
                    {submitError}
                  </div>
                )}

                <MagneticButton>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="magnetic-btn inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-foreground font-bold text-sm tracking-wide hover:bg-accent-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} className={isSubmitting ? "animate-pulse" : ""} />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </MagneticButton>
              </form>
            ) : (
              <div
                id="success-animation"
                className="flex flex-col items-center justify-center h-full min-h-[300px]"
              >
                <CheckCircle size={64} className="text-accent mb-4" />
                <h3 className="text-2xl font-extrabold tracking-tight">
                  Message Sent!
                </h3>
                <p className="text-secondary mt-2">
                  I&apos;ll get back to you soon.
                </p>
              </div>
            )}
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
