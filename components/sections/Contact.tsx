"use client";


import SectionReveal from "@/components/animations/SectionReveal";
import MagneticButton from "@/components/animations/MagneticButton";
import { PERSONAL } from "@/lib/data";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Big Typography */}
        <SectionReveal>
          <div className="mb-12 text-center">
            <span className="section-label justify-center">Get in Touch</span>
            <h2
              className="font-extrabold tracking-tighter leading-[0.9] mt-6"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 6rem)" }}
            >
              LET&apos;S BUILD
              <br />
              SOMETHING
              <br />
              <span className="text-accent">AMAZING</span>
            </h2>
          </div>
        </SectionReveal>

        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mt-8">
          <SectionReveal>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-8 max-w-md">
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
            <div className="flex items-center justify-center gap-6">
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
                    className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon size={22} />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
