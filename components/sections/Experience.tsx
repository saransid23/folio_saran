"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCES } from "@/lib/data";
import SectionReveal from "@/components/animations/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const ctx = gsap.context(() => {
      // Animate the connecting line
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-padding relative z-10 bg-background">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <span className="section-label">Experience</span>
          <h2 className="section-title mb-16">
            Where I&apos;ve<br />
            <span className="text-accent">worked</span>
          </h2>
        </SectionReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-accent origin-top"
          />

          {EXPERIENCES.map((exp, i) => (
            <SectionReveal key={exp.id} delay={i * 0.1}>
              <div
                className={`relative flex flex-col md:flex-row items-start gap-8 mb-16 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-4 border-background z-10" />

                {/* Card */}
                <div
                  className={`ml-12 md:ml-0 md:w-[45%] ${
                    i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                    {exp.period}
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight mt-2">
                    {exp.role}
                  </h3>
                  <p className="text-secondary font-medium mt-1">
                    {exp.company}
                  </p>
                  <p className="text-secondary text-sm leading-relaxed mt-4">
                    {exp.description}
                  </p>

                  {/* Tech tags */}
                  <div
                    className={`flex flex-wrap gap-2 mt-4 ${
                      i % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium px-3 py-1 rounded-full border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
