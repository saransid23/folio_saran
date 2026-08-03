"use client";

import { ACHIEVEMENTS } from "@/lib/data";
import SectionReveal from "@/components/animations/SectionReveal";
import CounterAnimation from "@/components/animations/CounterAnimation";

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <span className="section-label">Achievements</span>
          <h2 className="section-title mb-16">
            Numbers that<br />
            <span className="text-accent">speak</span>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {ACHIEVEMENTS.map((item, i) => (
            <SectionReveal key={item.label} delay={i * 0.1}>
              <div className="text-center p-8 rounded-2xl border border-border hover:border-accent/30 transition-colors duration-300">
                <CounterAnimation
                  target={item.value}
                  suffix={item.suffix}
                  label={item.label}
                  className="flex flex-col items-center"
                />
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
