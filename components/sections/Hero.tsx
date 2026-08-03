"use client";

import { useEffect, useRef, Suspense, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PERSONAL } from "@/lib/data";
import MagneticButton from "@/components/animations/MagneticButton";
import {
  FileText,
  MapPin,
  CircleDot,
  ChevronDown,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);

// Lazy load the 3D scene to keep initial bundle small
const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
  loading: () => null,
});

const HERO_LINES = [
  "Saran",
  "Siddarth",
  "AI Engineer",
  "Software Developer",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const badgesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Timeline for hero entrance (after preloader)
      const tl = gsap.timeline({ delay: 2.8 });

      // Animate each line staggered
      linesRef.current.forEach((line, i) => {
        tl.fromTo(
          line,
          { y: 120, opacity: 0, rotateX: 30 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            ease: "expo.out",
          },
          i * 0.1
        );
      });

      // Badges and CTA
      tl.fromTo(
        badgesRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" },
        "-=0.6"
      );
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" },
        "-=0.5"
      );

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          linesRef.current.forEach((line, i) => {
            gsap.set(line, {
              y: self.progress * (i * 15 + 30),
              opacity: 1 - self.progress * 0.8,
            });
          });
        },
      });
    }, section);

    // Mouse spotlight
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(217,255,63,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(217,255,63,0.05) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Mouse spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute z-[1] transition-opacity duration-300"
        style={{
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(217,255,63,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* 3D Scene */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 xl:px-24 pt-32">
        {/* Hero Typography */}
        <div className="mb-12">
          {HERO_LINES.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <div
                ref={(el) => {
                  if (el) linesRef.current[i] = el;
                }}
                className={`hero-text ${
                  i >= 2 ? "hero-text-outline" : ""
                }`}
                style={{ opacity: 0 }}
              >
                {line}
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div
          ref={badgesRef}
          className="flex flex-wrap items-center gap-4 mb-8"
          style={{ opacity: 0 }}
        >
          <span className="flex items-center gap-2 text-sm text-secondary border border-border rounded-full px-4 py-2">
            <MapPin size={14} />
            {PERSONAL.location}
          </span>
          {PERSONAL.available && (
            <span className="flex items-center gap-2 text-sm border border-accent/30 bg-accent/10 text-foreground rounded-full px-4 py-2">
              <CircleDot size={14} className="text-accent animate-pulse" />
              Available for Work
            </span>
          )}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center gap-4"
          style={{ opacity: 0 }}
        >
          <MagneticButton>
            <a
              href={PERSONAL.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-bold text-sm tracking-wide hover:text-foreground transition-colors duration-500"
            >
              <FileText size={16} />
              View Resume
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-border font-medium text-sm hover:border-foreground transition-colors duration-300"
            >
              <FaGithub size={16} />
              GitHub
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-border font-medium text-sm hover:border-foreground transition-colors duration-300"
            >
              <FaLinkedin size={16} />
              LinkedIn
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs uppercase tracking-[0.3em] text-secondary">
          Scroll
        </span>
        <ChevronDown
          size={20}
          className="text-secondary animate-scroll-indicator"
        />
      </div>
    </section>
  );
}
