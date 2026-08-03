"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS_MARQUEE, SKILLS_ORBIT } from "@/lib/data";
import SectionReveal from "@/components/animations/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;

    const ctx = gsap.context(() => {
      // Rotate the orbit container
      gsap.to(orbit, {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      // Counter-rotate the children to keep text upright
      const nodes = orbit.querySelectorAll(".skill-node");
      gsap.to(nodes, {
        rotation: -360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    }, orbit);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16">
        <SectionReveal>
          <span className="section-label">Skills & Tech</span>
          <h2 className="section-title">
            Technologies I<br />
            <span className="text-accent">work with</span>
          </h2>
        </SectionReveal>
      </div>

      {/* Infinite Marquee */}
      <div className="space-y-4 mb-24">
        {/* Row 1 — Left to Right */}
        <div className="overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...SKILLS_MARQUEE, ...SKILLS_MARQUEE].map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-3 mx-4 px-6 py-3 rounded-full border border-border text-sm font-semibold tracking-wide hover:border-accent hover:bg-accent/5 transition-all duration-300 shrink-0"
              >
                <span className="w-2 h-2 rounded-full bg-accent" />
                {skill}
              </span>
            ))}
          </div>
        </div>
        {/* Row 2 — Right to Left */}
        <div className="overflow-hidden">
          <div className="flex animate-marquee-reverse whitespace-nowrap">
            {[...SKILLS_MARQUEE, ...SKILLS_MARQUEE]
              .reverse()
              .map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-3 mx-4 px-6 py-3 rounded-full border border-border text-sm font-semibold tracking-wide hover:border-accent hover:bg-accent/5 transition-all duration-300 shrink-0"
                >
                  <span className="w-2 h-2 rounded-full bg-foreground" />
                  {skill}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Interactive Skill Orbit */}
      <SectionReveal className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center py-16">
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
            {/* Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-foreground text-background flex items-center justify-center">
                <span className="text-lg md:text-xl font-extrabold tracking-tighter">
                  ME
                </span>
              </div>
            </div>

            {/* Orbit ring */}
            <div className="absolute inset-0 rounded-full border border-border/50" />
            <div className="absolute inset-8 rounded-full border border-border/30" />

            {/* Orbiting nodes */}
            <div ref={orbitRef} className="absolute inset-0">
              {SKILLS_ORBIT.map((skill, i) => {
                const angle = (i / SKILLS_ORBIT.length) * 360;
                const radius = 42; // percent from center
                const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <div
                    key={skill}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                    }}
                  >
                    <div
                      className="skill-node w-12 h-12 md:w-16 md:h-16 rounded-full bg-surface border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-300 group"
                    >
                      <span className="text-[10px] md:text-xs font-bold tracking-wide group-hover:text-accent transition-colors">
                        {skill}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
