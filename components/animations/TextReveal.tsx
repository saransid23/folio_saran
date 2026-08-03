"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  scrollTrigger?: boolean;
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.08,
  as: Tag = "div",
  scrollTrigger = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll(".word-wrap");

    const config: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger,
      delay,
      ease: "expo.out",
    };

    if (scrollTrigger) {
      config.scrollTrigger = {
        trigger: container,
        start: "top 85%",
        toggleActions: "play none none none",
      };
    }

    gsap.fromTo(
      words,
      { y: 80, opacity: 0 },
      config
    );
  }, [delay, stagger, scrollTrigger]);

  // Split text into lines (by newline) then words
  const lines = text.split("\n");

  return (
    <Tag ref={containerRef as React.RefObject<HTMLDivElement & HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>} className={className}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block overflow-hidden">
          {line.split(" ").map((word, wordIdx) => (
            <span
              key={`${lineIdx}-${wordIdx}`}
              className="word-wrap inline-block"
              style={{ opacity: 0 }}
            >
              {word}&nbsp;
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
