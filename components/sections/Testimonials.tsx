"use client";

import { TESTIMONIALS } from "@/lib/data";
import SectionReveal from "@/components/animations/SectionReveal";
import { Quote } from "lucide-react";

export default function Testimonials() {
  // Double the testimonials array for infinite loop
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16">
        <SectionReveal>
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">
            What people<br />
            <span className="text-accent">say</span>
          </h2>
        </SectionReveal>
      </div>

      {/* Auto-scrolling carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex gap-6 animate-marquee"
            style={{ animationDuration: "40s" }}
          >
            {doubled.map((t, i) => (
              <div
                key={`${t.id}-${i}`}
                className="shrink-0 w-[350px] md:w-[420px] p-8 rounded-2xl glass-card group hover:border-accent/20 transition-all duration-300"
              >
                <Quote
                  size={24}
                  className="text-accent/30 mb-4 group-hover:text-accent/60 transition-colors"
                />
                <p className="text-sm leading-relaxed text-secondary mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-accent">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-secondary">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
