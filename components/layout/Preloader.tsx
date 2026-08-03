"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Prevent scroll during preloader
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete();
      },
    });

    // Animate counter from 0 to 100
    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function () {
          setCount(Math.floor(this.targets()[0].val));
        },
      }
    );

    // Fade out text first
    tl.to([counterRef.current, labelRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.in",
    });

    // Smooth fade out of the entire preloader background
    tl.to(
      preloaderRef.current,
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.1"
    );

    // Remove preloader from DOM
    tl.set(preloaderRef.current, { display: "none" });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-[100000]">
      {/* Main preloader screen */}
      <div className="preloader">
        <div className="flex flex-col items-center gap-4">
          <span
            ref={labelRef}
            className="text-sm uppercase tracking-[0.3em] opacity-60"
          >
            Loading
          </span>
          <span
            ref={counterRef}
            className="text-[8rem] md:text-[12rem] font-extrabold leading-none tabular-nums"
          >
            {count}%
          </span>
        </div>
      </div>
    </div>
  );
}
