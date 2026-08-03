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
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const [pathD1, setPathD1] = useState("");
  const [pathD2, setPathD2] = useState("");
  const [showNode, setShowNode] = useState(false);

  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const nodeRef = useRef<SVGCircleElement>(null);

  // Dynamic SVG Bezier Path calculation based on card offset locations
  const updatePaths = () => {
    const card1 = cardsRef.current[0];
    const card2 = cardsRef.current[1];
    const card3 = cardsRef.current[2];

    if (card1 && card2 && card3) {
      // Card 1
      const w1 = card1.offsetWidth;
      const h1 = card1.offsetHeight;
      const l1 = card1.offsetLeft;
      const t1 = card1.offsetTop;

      // Card 2
      const w2 = card2.offsetWidth;
      const h2 = card2.offsetHeight;
      const l2 = card2.offsetLeft;
      const t2 = card2.offsetTop;

      // Card 3
      const w3 = card3.offsetWidth;
      const h3 = card3.offsetHeight;
      const l3 = card3.offsetLeft;
      const t3 = card3.offsetTop;

      // Curve 1: Bottom-left of Card 1 to Top-right of Card 2
      // Bleed 20px inside card boundary to hide lines behind card background
      const startX1 = l1 + 20;
      const startY1 = t1 + h1 - 20;
      const endX1 = l2 + w2 - 20;
      const endY1 = t2 + 20;

      // Create a smooth curved Bezier path that sweeps out to the left
      const dy1 = endY1 - startY1;
      const cpX1_1 = Math.min(startX1, endX1) - 150; // Sweeps wide left
      const cpY1_1 = startY1 + dy1 * 0.3;
      const cpX1_2 = Math.min(startX1, endX1) - 150;
      const cpY1_2 = startY1 + dy1 * 0.7;

      setPathD1(`M ${startX1} ${startY1} C ${cpX1_1} ${cpY1_1}, ${cpX1_2} ${cpY1_2}, ${endX1} ${endY1}`);

      // Curve 2: Bottom-right of Card 2 to Top-left of Card 3
      // Bleed 20px inside card boundary to hide lines behind card background
      const startX2 = l2 + w2 - 20;
      const startY2 = t2 + h2 - 20;
      const endX2 = l3 + 20;
      const endY2 = t3 + 20;

      // Create a smooth curved Bezier path that sweeps out to the right
      const dy2 = endY2 - startY2;
      const cpX2_1 = Math.max(startX2, endX2) + 150; // Sweeps wide right
      const cpY2_1 = startY2 + dy2 * 0.3;
      const cpX2_2 = Math.max(startX2, endX2) + 150;
      const cpY2_2 = startY2 + dy2 * 0.7;

      setPathD2(`M ${startX2} ${startY2} C ${cpX2_1} ${cpY2_1}, ${cpX2_2} ${cpY2_2}, ${endX2} ${endY2}`);
    }
  };

  useEffect(() => {
    updatePaths();
    
    // Wait for fonts and layout stabilization
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
      // Individual card tilt effects on mouse hover
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const onMouseMove = (e: MouseEvent) => {
          // Only apply hover tilt if the card is already visible
          if (gsap.getProperty(card, "opacity") as number < 0.9) return;

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

  // Animation: card 1 reveals on enter; path scrubs as you scroll; card 2/3 reveal when path finishes
  useEffect(() => {
    if (!pathD1 || !pathD2) return;

    const section = sectionRef.current;
    const path1 = path1Ref.current;
    const path2 = path2Ref.current;
    const node = nodeRef.current;
    const card1 = cardsRef.current[0];
    const card2 = cardsRef.current[1];
    const card3 = cardsRef.current[2];

    if (!section || !card1 || !card2 || !card3 || !path1 || !path2 || !node) return;

    const ctx = gsap.context(() => {
      const path1Length = path1.getTotalLength();
      const path2Length = path2.getTotalLength();

      gsap.set(path1, { strokeDasharray: path1Length, strokeDashoffset: path1Length });
      gsap.set(path2, { strokeDasharray: path2Length, strokeDashoffset: path2Length });
      gsap.set([card1, card2, card3], { opacity: 0, scale: 0.9, y: 40, filter: "blur(8px)" });
      gsap.set(node, { opacity: 0 });
      setShowNode(true);

      // Card 1 reveals when it scrolls into view
      ScrollTrigger.create({
        trigger: card1,
        start: "top 82%",
        onEnter: () =>
          gsap.to(card1, { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }),
      });

      // Path 1 scrubs while card1 is well into the viewport;
      // card2 is revealed only when the line finishes (onLeave)
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: card1,
          start: "top 40%",
          end: "top -15%",
          scrub: 0.6,
          onEnter: () => gsap.set(node, { opacity: 1 }),
          onLeaveBack: () => gsap.set(node, { opacity: 0 }),
          onLeave: () => {
            // Line has finished drawing — now reveal card 2
            gsap.to(node, { opacity: 0, duration: 0.2 });
            gsap.to(card2, { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" });
          },
          onEnterBack: () => {
            // Scrolling back up — hide card 2 again
            gsap.to(card2, { opacity: 0, scale: 0.9, y: 40, filter: "blur(8px)", duration: 0.3 });
          },
        },
      });
      tl1.to(path1, { strokeDashoffset: 0, ease: "none" }, 0);
      tl1.to(node, { motionPath: { path: path1, align: path1, alignOrigin: [0.5, 0.5] }, ease: "none" }, 0);

      // Path 2 scrubs while card2 is well into the viewport;
      // card3 is revealed only when the line finishes (onLeave)
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: card2,
          start: "top 40%",
          end: "top -15%",
          scrub: 0.6,
          onEnter: () => gsap.set(node, { opacity: 1 }),
          onLeaveBack: () => gsap.set(node, { opacity: 0 }),
          onLeave: () => {
            gsap.to(node, { opacity: 0, duration: 0.2 });
            gsap.to(card3, { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" });
          },
          onEnterBack: () => {
            gsap.to(card3, { opacity: 0, scale: 0.9, y: 40, filter: "blur(8px)", duration: 0.3 });
          },
        },
      });
      tl2.to(path2, { strokeDashoffset: 0, ease: "none" }, 0);
      tl2.to(node, { motionPath: { path: path2, align: path2, alignOrigin: [0.5, 0.5] }, ease: "none" }, 0);

    }, section);

    return () => ctx.revert();
  }, [pathD1, pathD2]);

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
        {/* Storytelling Path Animation Canvas */}
        <svg
          className="absolute inset-0 pointer-events-none z-0"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          <path
            ref={path1Ref}
            d={pathD1}
            fill="none"
            stroke="var(--color-accent, #D9FF3F)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ opacity: pathD1 ? 0.35 : 0 }}
          />
          <path
            ref={path2Ref}
            d={pathD2}
            fill="none"
            stroke="var(--color-accent, #D9FF3F)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ opacity: pathD2 ? 0.35 : 0 }}
          />
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
          // Stagger card alignments: Card 1 (Right), Card 2 (Left), Card 3 (Right)
          const alignClass = i === 1 ? "self-start" : "self-end";

          return (
            <div
              key={project.id}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              data-cursor="view"
              className={`relative w-full md:w-[50%] lg:w-[45%] shrink-0 group z-10 bg-background ${alignClass}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Project Card */}
              <div className="relative rounded-2xl overflow-hidden border border-border bg-surface">
                {/* Image area — fixed aspect ratio, no overlap */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  {/* Project image */}
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
                  {/* Bottom gradient for smooth transition to content */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent z-10" />
                </div>

                {/* Content — flows naturally below the image */}
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
