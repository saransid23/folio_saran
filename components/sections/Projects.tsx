/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PROJECTS } from "@/lib/data";
import SectionReveal from "@/components/animations/SectionReveal";
import MagneticButton from "@/components/animations/MagneticButton";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);

  const [pathsD, setPathsD] = useState<string[]>([]);
  const [showNode, setShowNode] = useState(false);
  const nodeRef = useRef<SVGCircleElement>(null);

  // Dynamic SVG Bezier Path calculation for ALL project cards
  const updatePaths = () => {
    const newPaths: string[] = [];

    for (let i = 0; i < PROJECTS.length - 1; i++) {
      const cardA = cardsRef.current[i];
      const cardB = cardsRef.current[i + 1];

      if (cardA && cardB) {
        const wA = cardA.offsetWidth;
        const hA = cardA.offsetHeight;
        const lA = cardA.offsetLeft;
        const tA = cardA.offsetTop;

        const wB = cardB.offsetWidth;
        const hB = cardB.offsetHeight;
        const lB = cardB.offsetLeft;
        const tB = cardB.offsetTop;

        if (i % 2 === 0) {
          // Card A is Right, Card B is Left
          // Bottom-left of Card A to Top-right of Card B
          const startX = lA + 20;
          const startY = tA + hA - 20;
          const endX = lB + wB - 20;
          const endY = tB + 20;

          const dy = endY - startY;
          const cpX1 = Math.min(startX, endX) - 150;
          const cpY1 = startY + dy * 0.3;
          const cpX2 = Math.min(startX, endX) - 150;
          const cpY2 = startY + dy * 0.7;

          newPaths.push(`M ${startX} ${startY} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${endX} ${endY}`);
        } else {
          // Card A is Left, Card B is Right
          // Bottom-right of Card A to Top-left of Card B
          const startX = lA + wA - 20;
          const startY = tA + hA - 20;
          const endX = lB + 20;
          const endY = tB + 20;

          const dy = endY - startY;
          const cpX1 = Math.max(startX, endX) + 150;
          const cpY1 = startY + dy * 0.3;
          const cpX2 = Math.max(startX, endX) + 150;
          const cpY2 = startY + dy * 0.7;

          newPaths.push(`M ${startX} ${startY} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${endX} ${endY}`);
        }
      }
    }
    setPathsD(newPaths);
  };

  useEffect(() => {
    updatePaths();

    // Wait for layout stabilization
    const timer = setTimeout(updatePaths, 300);
    window.addEventListener("resize", updatePaths);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePaths);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Mouse tilt effect for all cards
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

  // Animation: reveal Card 1 on scroll enter; path scrubs on scroll to reveal each subsequent card
  useEffect(() => {
    if (pathsD.length === 0) return;

    const section = sectionRef.current;
    const node = nodeRef.current;

    if (!section || !node) return;

    const ctx = gsap.context(() => {
      // Set all cards initial hidden state
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.set(card, { opacity: 0, scale: 0.9, y: 40, filter: "blur(8px)" });
        }
      });

      // Card 1 reveals when scrolled into viewport
      const card1 = cardsRef.current[0];
      if (card1) {
        ScrollTrigger.create({
          trigger: card1,
          start: "top 82%",
          onEnter: () =>
            gsap.to(card1, { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }),
        });
      }

      gsap.set(node, { opacity: 0 });
      setShowNode(true);

      // Scrub each path & reveal next card dynamically for ALL projects
      pathsD.forEach((_, i) => {
        const pathEl = pathsRef.current[i];
        const cardCurrent = cardsRef.current[i];
        const cardNext = cardsRef.current[i + 1];

        if (!pathEl || !cardCurrent || !cardNext) return;

        const pathLength = pathEl.getTotalLength();
        gsap.set(pathEl, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardCurrent,
            start: "top 40%",
            end: "top -15%",
            scrub: 0.6,
            onEnter: () => gsap.set(node, { opacity: 1 }),
            onLeaveBack: () => gsap.set(node, { opacity: 0 }),
            onLeave: () => {
              gsap.to(node, { opacity: 0, duration: 0.2 });
              gsap.to(cardNext, { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" });
            },
            onEnterBack: () => {
              gsap.to(cardNext, { opacity: 0, scale: 0.9, y: 40, filter: "blur(8px)", duration: 0.3 });
            },
          },
        });

        tl.to(pathEl, { strokeDashoffset: 0, ease: "none" }, 0);
        tl.to(node, { motionPath: { path: pathEl, align: pathEl, alignOrigin: [0.5, 0.5] }, ease: "none" }, 0);
      });
    }, section);

    return () => ctx.revert();
  }, [pathsD]);

  return (
    <section ref={sectionRef} id="projects" className="relative bg-background overflow-hidden py-16 md:py-24">
      <div className="pt-12 md:pt-16 pb-4 px-6 md:px-12 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <span className="section-label">Featured Work</span>
            <h2 className="section-title">
              Selected<br />
              <span className="text-accent">projects</span>
            </h2>
          </SectionReveal>
        </div>
      </div>

      {/* Staggered Vertical container */}
      <div
        ref={scrollContainerRef}
        className="relative max-w-6xl mx-auto px-6 md:px-12 py-8 flex flex-col gap-16 md:gap-24"
      >
        {/* Dynamic Storytelling Path Animation Canvas */}
        <svg
          className="absolute inset-0 pointer-events-none z-0"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          {pathsD.map((d, i) => (
            <path
              key={i}
              ref={(el) => {
                pathsRef.current[i] = el;
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
              filter: "drop-shadow(0 0 8px var(--color-accent, #D9FF3F))",
              opacity: showNode ? 1 : 0,
              transformOrigin: "center",
            }}
          />
        </svg>

        {PROJECTS.map((project, i) => {
          // Stagger card alignments: Card 0 (Right), Card 1 (Left), Card 2 (Right), Card 3 (Left)...
          const alignClass = i % 2 === 1 ? "self-start" : "self-end";

          return (
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              data-cursor="view"
              className={`relative w-full md:w-[50%] lg:w-[45%] shrink-0 group z-10 bg-background ${alignClass}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Project Card */}
              <div className="relative rounded-2xl overflow-hidden border border-border bg-surface">
                {/* Image area */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-70 group-hover:opacity-90"
                    style={{ willChange: "transform, opacity" }}
                  />
                  {/* Tint gradient overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-700 opacity-50 group-hover:opacity-30"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}30, transparent 60%)`,
                    }}
                  />
                  {/* Project number */}
                  <span
                    className="absolute top-4 left-6 text-8xl font-extrabold opacity-15 pointer-events-none select-none z-10"
                    style={{ color: project.color }}
                  >
                    0{i + 1}
                  </span>
                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent z-10" />
                </div>

                {/* Content */}
                <div className="relative bg-surface px-6 pb-6 pt-2 md:px-8 md:pb-8 md:pt-3">
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed mb-4">
                    {project.longDescription}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-background/60 text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    <MagneticButton>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-medium hover:border-foreground transition-colors text-foreground"
                      >
                        <FaGithub size={14} />
                        Code
                      </a>
                    </MagneticButton>
                    <MagneticButton>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D9FF2F] text-background text-sm font-bold hover:bg-accent hover:text-foreground transition-colors"
                        style={{ color: "#000" }}
                      >
                        Live Demo
                        <ArrowUpRight size={14} />
                      </a>
                    </MagneticButton>
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
