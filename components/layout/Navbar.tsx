"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_LINKS, PERSONAL } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Menu, X, Download, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Shrink and glass effect on scroll
    ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        setScrolled(self.progress > 0);
      },
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    // Entrance animation
    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 3.5, ease: "expo.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(el);
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-[1000] transition-all duration-500",
          "rounded-full px-6 py-3",
          scrolled
            ? "glass shadow-lg scale-[0.95] py-2"
            : "bg-transparent"
        )}
        style={{ opacity: 0 }}
      >
        <div className="flex items-center gap-8">
          {/* Logo */}
          <a
            href="#"
            className="text-lg font-extrabold tracking-tighter whitespace-nowrap"
            onClick={(e) => {
              e.preventDefault();
              const lenis = (window as any).__lenis;
              if (lenis) {
                lenis.scrollTo(0);
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            Portfolio<span className="text-accent">.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-secondary hover:text-foreground transition-colors duration-300 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={PERSONAL.resumeUrl}
              download
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border border-border hover:border-foreground transition-colors duration-300"
            >
              <Download size={14} />
              Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="flex items-center gap-1.5 text-sm font-bold px-5 py-2 rounded-full bg-accent text-foreground hover:bg-accent-dark transition-colors duration-300"
            >
              Hire Me
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div
        className={cn(
          "fixed inset-0 z-[999] bg-background flex flex-col items-center justify-center transition-all duration-500",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-4xl font-extrabold tracking-tight hover:text-accent transition-colors"
              style={{
                transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
                transform: isOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isOpen ? 1 : 0,
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 mt-8">
            <a
              href={PERSONAL.resumeUrl}
              download
              className="flex items-center gap-2 text-lg font-medium px-6 py-3 rounded-full border border-border"
            >
              <Download size={18} />
              Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="flex items-center gap-2 text-lg font-bold px-6 py-3 rounded-full bg-accent text-foreground"
            >
              Hire Me
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
