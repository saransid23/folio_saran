/* eslint-disable @typescript-eslint/no-unused-vars */
 
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SERVICES } from "@/lib/data";
import SectionReveal from "@/components/animations/SectionReveal";
import {
  Monitor,
  Layers,
  Brain,
  Cpu,
  Database,
  Zap,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Layers,
  Brain,
  Cpu,
  Database,
  Zap,
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [showNode, setShowNode] = useState(false);

  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const nodeRef = useRef<SVGCircleElement>(null);

  // Build Bezier curve paths connecting consecutive cards
  const updatePaths = () => {
    const cards = cardsRef.current;
    if (cards.length < 2) return;

    const newPaths: string[] = [];

    for (let i = 0; i < cards.length - 1; i++) {
      const cardA = cards[i];
      const cardB = cards[i + 1];
      if (!cardA || !cardB) continue;

      const wA = cardA.offsetWidth;
      const hA = cardA.offsetHeight;
      const lA = cardA.offsetLeft;
      const tA = cardA.offsetTop;

      const wB = cardB.offsetWidth;
      const hB = cardB.offsetHeight;
      const lB = cardB.offsetLeft;
      const tB = cardB.offsetTop;

      // Determine curve direction based on card alignment
      // Even-indexed cards are self-end (right), odd-indexed are self-start (left)
      const aIsRight = i % 2 === 0;

      let startX: number, startY: number, endX: number, endY: number;

      if (aIsRight) {
        // Card A is on the right → exit from bottom-left, enter Card B from top-right
        startX = lA + 20;
        startY = tA + hA - 20;
        endX = lB + wB - 20;
        endY = tB + 20;
      } else {
        // Card A is on the left → exit from bottom-right, enter Card B from top-left
        startX = lA + wA - 20;
        startY = tA + hA - 20;
        endX = lB + 20;
        endY = tB + 20;
      }

      const dy = endY - startY;

      let cpX1: number, cpY1: number, cpX2: number, cpY2: number;

      if (aIsRight) {
        // Sweep left
        cpX1 = Math.min(startX, endX) - 150;
        cpY1 = startY + dy * 0.3;
        cpX2 = Math.min(startX, endX) - 150;
        cpY2 = startY + dy * 0.7;
      } else {
        // Sweep right
        cpX1 = Math.max(startX, endX) + 150;
        cpY1 = startY + dy * 0.3;
        cpX2 = Math.max(startX, endX) + 150;
        cpY2 = startY + dy * 0.7;
      }

      newPaths.push(
        `M ${startX} ${startY} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${endX} ${endY}`
      );
    }

    setPaths(newPaths);
  };

  useEffect(() => {
    updatePaths();

    const timer = setTimeout(updatePaths, 300);
    window.addEventListener("resize", updatePaths);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePaths);
    };
  }, []);

  // 3D tilt on hover — same as Projects
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const onMouseMove = (e: MouseEvent) => {
          if ((gsap.getProperty(card, "opacity") as number) < 0.9) return;

          const rect = card.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const rotateX = ((e.clientY - centerY) / rect.height) * -10;
          const rotateY = ((e.clientX - centerX) / rect.width) * 10;

          gsap.to(card, {
            rotateX,
            rotateY,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 1000,
          });
        };

        const onMouseLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
          });
        };

        card.addEventListener("mousemove", onMouseMove);
        card.addEventListener("mouseleave", onMouseLeave);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Animation: card 0 reveals on enter; each subsequent card reveals when the line reaches it
  useEffect(() => {
    if (paths.length === 0) return;

    const section = sectionRef.current;
    const node = nodeRef.current;
    const cards = cardsRef.current;
    const svgPaths = pathRefs.current;

    if (!section || !node || cards.length < 2) return;

    const ctx = gsap.context(() => {
      svgPaths.forEach((p) => {
        if (!p) return;
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      gsap.set(cards, { opacity: 0, scale: 0.9, y: 40, filter: "blur(8px)" });
      gsap.set(node, { opacity: 0 });
      setShowNode(true);

      // Card 0: reveal when it enters the viewport
      const card0 = cards[0];
      if (card0) {
        ScrollTrigger.create({
          trigger: card0,
          start: "top 82%",
          onEnter: () =>
            gsap.to(card0, { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }),
        });
      }

      // For each path: scrub it as cardA scrolls through the viewport,
      // then reveal cardB only when the line finishes (onLeave)
      paths.forEach((_, i) => {
        const pathEl = svgPaths[i];
        const cardA = cards[i];
        const cardB = cards[i + 1];
        if (!pathEl || !cardA || !cardB) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardA,
            start: "top 40%",
            end: "top -15%",
            scrub: 0.6,
            onEnter: () => gsap.set(node, { opacity: 1 }),
            onLeaveBack: () => gsap.set(node, { opacity: 0 }),
            onLeave: () => {
              // Line reached cardB — reveal it now
              gsap.to(node, { opacity: 0, duration: 0.2 });
              gsap.to(cardB, { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" });
            },
            onEnterBack: () => {
              // Scrolling back up — hide cardB again
              gsap.to(cardB, { opacity: 0, scale: 0.9, y: 40, filter: "blur(8px)", duration: 0.3 });
            },
          },
        });
        tl.to(pathEl, { strokeDashoffset: 0, ease: "none" }, 0);
        tl.to(node, { motionPath: { path: pathEl, align: pathEl, alignOrigin: [0.5, 0.5] }, ease: "none" }, 0);
      });

    }, section);

    return () => ctx.revert();
  }, [paths]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-background overflow-hidden py-16 md:py-24"
    >
      <div className="pt-12 md:pt-16 pb-4 px-6 md:px-12 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <span className="section-label">What I Do</span>
            <h2 className="section-title">
              Services &<br />
              <span className="text-accent">expertise</span>
            </h2>
          </SectionReveal>
        </div>
      </div>

      {/* Staggered vertical container — same layout as Projects */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-8 flex flex-col gap-16 md:gap-24">
        {/* SVG path canvas */}
        <svg
          className="absolute inset-0 pointer-events-none z-0"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          {paths.map((d, i) => (
            <path
              key={i}
              ref={(el) => {
                pathRefs.current[i] = el;
              }}
              d={d}
              fill="none"
              stroke="var(--color-accent, #D9FF3F)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ opacity: d ? 0.35 : 0 }}
            />
          ))}
          <circle
            ref={nodeRef}
            r="8"
            fill="var(--color-accent, #D9FF3F)"
            stroke="#000000"
            strokeWidth="2"
            className="animate-pulse"
            style={{
              filter:
                "drop-shadow(0 0 8px var(--color-accent, #D9FF3F))",
              opacity: showNode ? 1 : 0,
              transformOrigin: "center",
            }}
          />
        </svg>

        {SERVICES.map((service, i) => {
          const Icon = iconMap[service.icon] || Monitor;
          // Stagger: even → right, odd → left (same as Projects)
          const alignClass = i % 2 === 0 ? "self-end" : "self-start";

          return (
            <div
              key={service.id}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              data-cursor="view"
              className={`relative w-full md:w-[50%] lg:w-[45%] shrink-0 group z-10 bg-background ${alignClass}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Service Card */}
              <div className="relative rounded-2xl overflow-hidden border border-border bg-surface p-8 md:p-10">
                {/* Hover background */}
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Accent number watermark */}
                <span
                  className="absolute top-6 right-6 text-8xl font-extrabold opacity-[0.06] select-none pointer-events-none"
                  style={{ color: "var(--color-accent)" }}
                >
                  0{i + 1}
                </span>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-foreground/5 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon
                      size={26}
                      className="group-hover:text-accent transition-colors duration-300"
                    />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3 text-foreground">
                    {service.title}
                  </h3>

                  <p className="text-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Learn more →
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
