"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const isTouch = useRef(false);

  useEffect(() => {
    // Detect touch device
    isTouch.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch.current) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    const text = textRef.current;
    if (!cursor || !ring || !glow || !text) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    // GSAP ticker for smooth follow
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      gsap.set(cursor, {
        x: mouse.current.x - cursor.offsetWidth / 2,
        y: mouse.current.y - cursor.offsetHeight / 2,
      });
      gsap.set(ring, {
        x: pos.current.x - ring.offsetWidth / 2,
        y: pos.current.y - ring.offsetHeight / 2,
      });
      gsap.set(glow, {
        x: pos.current.x - glow.offsetWidth / 2,
        y: pos.current.y - glow.offsetHeight / 2,
      });
      gsap.set(text, {
        x: pos.current.x,
        y: pos.current.y,
      });
    };

    gsap.ticker.add(animate);
    window.addEventListener("mousemove", onMouseMove);

    // Hover listeners for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor="pointer"], input, textarea, select'
    );
    const projectCards = document.querySelectorAll('[data-cursor="view"]');

    const onEnter = () => {
      gsap.to(cursor, {
        width: 60,
        height: 60,
        duration: 0.3,
        ease: "expo.out",
      });
      gsap.to(ring, {
        width: 80,
        height: 80,
        opacity: 0.2,
        duration: 0.3,
        ease: "expo.out",
      });
    };

    const onLeave = () => {
      gsap.to(cursor, {
        width: 16,
        height: 16,
        duration: 0.3,
        ease: "expo.out",
      });
      gsap.to(ring, {
        width: 40,
        height: 40,
        opacity: 0.5,
        duration: 0.3,
        ease: "expo.out",
      });
      gsap.to(text, { opacity: 0, duration: 0.2 });
    };

    const onProjectEnter = () => {
      gsap.to(cursor, {
        width: 80,
        height: 80,
        opacity: 0.2,
        duration: 0.3,
        ease: "expo.out",
      });
      gsap.to(text, { opacity: 1, duration: 0.2 });
    };

    const onProjectLeave = () => {
      gsap.to(cursor, {
        width: 16,
        height: 16,
        opacity: 1,
        duration: 0.3,
        ease: "expo.out",
      });
      gsap.to(text, { opacity: 0, duration: 0.2 });
    };

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    projectCards.forEach((el) => {
      el.addEventListener("mouseenter", onProjectEnter);
      el.addEventListener("mouseleave", onProjectLeave);
    });

    return () => {
      gsap.ticker.remove(animate);
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      projectCards.forEach((el) => {
        el.removeEventListener("mouseenter", onProjectEnter);
        el.removeEventListener("mouseleave", onProjectLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={glowRef} className="cursor-glow" />
      <div ref={textRef} className="cursor-text">
        View
      </div>
    </>
  );
}
