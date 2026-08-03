"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT } from "@/lib/data";
import SectionReveal from "@/components/animations/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const ctx = gsap.context(() => {
      const img = image.querySelector(".portrait-img") as HTMLElement;
      const glowOverlay = image.querySelector(".portrait-glow") as HTMLElement;

      // Image reveal — cinematic wipe from right to left
      gsap.fromTo(
        image.querySelector(".image-mask"),
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Portrait scale up — starts slightly zoomed in, eases to normal to leave room for parallax
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.4, opacity: 0 },
          {
            scale: 1.15,
            opacity: 1,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );

        // Smooth parallax on scroll — image drifts upward gently
        gsap.to(img, {
          yPercent: -8,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Subtle 3D tilt on scroll
      gsap.to(image, {
        rotateY: 4,
        rotateX: -2,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Glow overlay fades in as you scroll
      if (glowOverlay) {
        gsap.fromTo(
          glowOverlay,
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "center center",
              scrub: 1,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative"
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <span className="section-label">About Me</span>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-8">
          {/* Image */}
          <SectionReveal>
            <div
              ref={imageRef}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              {/* Portrait image */}
              <img
                src="/portrait.png"
                alt="Saran Siddarth"
                className="portrait-img absolute inset-0 w-full h-full object-cover object-top"
                style={{ willChange: "transform, opacity" }}
              />

              {/* Accent glow overlay */}
              <div
                className="portrait-glow absolute inset-0 z-[2] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(217,255,63,0.12) 100%)",
                  opacity: 0,
                }}
              />

              {/* Image reveal mask */}
              <div
                className="image-mask absolute inset-0 bg-foreground origin-right z-10"
              />
            </div>
          </SectionReveal>

          {/* Text */}
          <div ref={textRef}>
            <SectionReveal>
              <h2 className="section-title mb-8">
                Building the future with
                <span className="text-accent"> code</span> &
                <span className="text-accent"> intelligence</span>
              </h2>
            </SectionReveal>

            {ABOUT.description.map((para, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <p className="text-lg text-secondary leading-relaxed mb-6">
                  {para}
                </p>
              </SectionReveal>
            ))}

            {/* Stats */}
            <SectionReveal delay={0.3}>
              <div className="grid grid-cols-2 gap-6 mt-10 pt-10 border-t border-border max-w-sm">
                {ABOUT.stats.map((stat) => (
                  <div key={stat.label}>
                    <span className="text-3xl font-extrabold tracking-tighter">
                      {stat.value}
                    </span>
                    <span className="block text-xs uppercase tracking-[0.15em] text-secondary mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
