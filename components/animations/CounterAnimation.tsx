"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CounterAnimationProps {
  target: number;
  suffix?: string;
  label: string;
  className?: string;
}

export default function CounterAnimation({
  target,
  suffix = "",
  label,
  className = "",
}: CounterAnimationProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = numberRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    gsap.fromTo(
      { val: 0 },
      { val: 0 },
      {
        val: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        onUpdate: function () {
          el.textContent = Math.floor(this.targets()[0].val) + suffix;
        },
      }
    );
  }, [target, suffix]);

  return (
    <div ref={containerRef} className={className}>
      <span
        ref={numberRef}
        className="text-5xl md:text-7xl font-extrabold tracking-tighter"
      >
        0{suffix}
      </span>
      <span className="block mt-2 text-sm uppercase tracking-[0.2em] text-secondary font-medium">
        {label}
      </span>
    </div>
  );
}
