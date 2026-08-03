"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
