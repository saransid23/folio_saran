"use client";

import { PERSONAL, NAV_LINKS } from "@/lib/data";
import SectionReveal from "@/components/animations/SectionReveal";
import MagneticButton from "@/components/animations/MagneticButton";
import { Mail, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(el);
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleScrollTop = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-border overflow-hidden">
      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Brand */}
            <SectionReveal>
              <h3 className="text-2xl font-extrabold tracking-tighter mb-4">
                Portfolio<span className="text-accent">.</span>
              </h3>
              <p className="text-secondary text-sm leading-relaxed max-w-xs">
                AI Engineer & Full Stack Developer creating intelligent digital
                experiences that push boundaries.
              </p>
            </SectionReveal>

            {/* Quick Links */}
            <SectionReveal delay={0.1}>
              <h4 className="text-xs uppercase tracking-[0.2em] text-secondary font-semibold mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-secondary hover:text-foreground transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </SectionReveal>

            {/* Connect */}
            <SectionReveal delay={0.2}>
              <h4 className="text-xs uppercase tracking-[0.2em] text-secondary font-semibold mb-4">
                Connect
              </h4>
              <div className="flex items-center gap-3">
                {[
                  { icon: FaGithub, href: PERSONAL.github, label: "GitHub" },
                  {
                    icon: FaLinkedin,
                    href: PERSONAL.linkedin,
                    label: "LinkedIn",
                  },
                  {
                    icon: FaTwitter,
                    href: PERSONAL.twitter,
                    label: "Twitter",
                  },
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
                      className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-300"
                      aria-label={label}
                    >
                      <Icon size={16} />
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-4">
            <p className="text-xs text-secondary">
              © {new Date().getFullYear()} All rights reserved. Built with ♥
            </p>
            <MagneticButton>
              <button
                onClick={handleScrollTop}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-300"
                aria-label="Back to top"
              >
                <ArrowUp size={16} />
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
