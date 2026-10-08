/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES, type ServiceItem } from "@/lib/data";
import SectionReveal from "@/components/animations/SectionReveal";
import {
  Brain,
  Monitor,
  Layers,
  Cpu,
  Database,
  Zap,
  Plus,
  Minus,
  ArrowUpRight,
  Sliders,
  Layers3,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Monitor,
  Layers,
  Cpu,
  Database,
  Zap,
};

export default function Services() {
  const [expandedId, setExpandedId] = useState<string>("ai");
  const [viewMode, setViewMode] = useState<"stack" | "spotlight">("stack");

  return (
    <section
      id="services"
      className="relative bg-background overflow-hidden py-24 md:py-36 border-t border-border/60"
    >
      {/* Background Ambient Ticker */}
      <div className="absolute top-10 left-0 right-0 overflow-hidden pointer-events-none opacity-[0.03] select-none whitespace-nowrap">
        <div className="inline-block animate-marquee font-black text-9xl tracking-widest uppercase text-foreground">
          01 // ARTIFICIAL INTELLIGENCE — 02 // FRONTEND MOTION — 03 // FULL STACK — 04 // MACHINE VISION — 05 // DATA SCIENCE — 06 // DEVOPS —
        </div>
        <div className="inline-block animate-marquee font-black text-9xl tracking-widest uppercase text-foreground" aria-hidden="true">
          01 // ARTIFICIAL INTELLIGENCE — 02 // FRONTEND MOTION — 03 // FULL STACK — 04 // MACHINE VISION — 05 // DATA SCIENCE — 06 // DEVOPS —
        </div>
      </div>

      {/* Dynamic Ambient Background Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* SECTION HEADER & VIEW SWITCHER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-border pb-8">
          <SectionReveal>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-accent" />
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-accent uppercase">
                SERVICES & EXPERTISE
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Capability <span className="text-accent">Spectrum</span>
            </h2>
          </SectionReveal>

          {/* CREATIVE VIEW MODE TOGGLE */}
          <div className="flex items-center gap-2 bg-surface/80 border border-border p-1.5 rounded-2xl backdrop-blur-xl shadow-lg">
            <button
              onClick={() => setViewMode("stack")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                viewMode === "stack"
                  ? "bg-accent text-black shadow-md"
                  : "text-secondary hover:text-foreground"
              }`}
            >
              <Layers3 className="w-4 h-4" />
              Interactive Stack
            </button>
            <button
              onClick={() => setViewMode("spotlight")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                viewMode === "spotlight"
                  ? "bg-accent text-black shadow-md"
                  : "text-secondary hover:text-foreground"
              }`}
            >
              <Sliders className="w-4 h-4" />
              Spotlight Stage
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MODE 1: FULL-WIDTH KINETIC ACCORDION STACK (FRESH & NON-GRID)*/}
        {/* ============================================================ */}
        {viewMode === "stack" && (
          <div className="flex flex-col gap-4">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon] || Monitor;
              const isExpanded = expandedId === service.id;

              return (
                <div
                  key={service.id}
                  onClick={() => setExpandedId(isExpanded ? "" : service.id)}
                  className={`group relative rounded-3xl border transition-all duration-400 cursor-pointer overflow-hidden backdrop-blur-2xl ${
                    isExpanded
                      ? "bg-surface/90 border-accent/60 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                      : "bg-surface/40 border-border/80 hover:border-white/30 hover:bg-surface/60"
                  }`}
                >
                  {/* Subtle Accent Edge Beam */}
                  <div
                    className="absolute top-0 bottom-0 left-0 w-1.5 transition-colors duration-300"
                    style={{ backgroundColor: isExpanded ? service.color : "transparent" }}
                  />

                  {/* Main Row Header */}
                  <div className="p-6 md:p-8 flex items-center justify-between gap-6">
                    <div className="flex items-center gap-6 md:gap-10">
                      {/* Number */}
                      <span
                        className="text-2xl md:text-4xl font-mono font-black tracking-tight transition-colors duration-300"
                        style={{ color: isExpanded ? service.color : "var(--color-muted)" }}
                      >
                        {service.number}
                      </span>

                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${service.color}15`,
                          borderColor: `${service.color}40`,
                          color: service.color,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Title & Tagline */}
                      <div>
                        <h3 className="text-xl md:text-3xl font-extrabold tracking-tight text-foreground group-hover:text-white transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs md:text-sm font-medium text-foreground/80 hidden sm:block mt-1">
                          {service.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Expand Toggle Button */}
                    <div
                      className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0"
                      style={{
                        backgroundColor: isExpanded ? service.color : "rgba(255,255,255,0.05)",
                        borderColor: isExpanded ? service.color : "rgba(255,255,255,0.1)",
                        color: isExpanded ? "#000000" : "#FFFFFF",
                      }}
                    >
                      {isExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* EXPANDABLE DETAIL STAGE */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-border/60 bg-black/40"
                      >
                        <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                          
                          {/* Left Description */}
                          <div className="space-y-3 max-w-xl">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                              // CORE TECHNICAL SCOPE
                            </span>
                            <p className="text-sm md:text-base text-foreground font-medium leading-relaxed">
                              {service.description}
                            </p>
                          </div>

                          {/* Right Tech Tags */}
                          <div className="flex flex-wrap gap-2 md:justify-end max-w-md">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-white/10 border border-white/20 text-white shadow-sm"
                                style={{ borderColor: `${service.color}50` }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================ */}
        {/* MODE 2: SPLIT SCREEN SPOTLIGHT STAGE (STUDIO INTERACTIVE)  */}
        {/* ============================================================ */}
        {viewMode === "spotlight" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT NAVIGATION COLUMN */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {SERVICES.map((service) => {
                const Icon = iconMap[service.icon] || Monitor;
                const isSelected = expandedId === service.id;

                return (
                  <button
                    key={service.id}
                    onClick={() => setExpandedId(service.id)}
                    onMouseEnter={() => setExpandedId(service.id)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-surface border-accent shadow-xl scale-[1.02]"
                        : "bg-surface/30 border-border/60 hover:bg-surface/60 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="text-lg font-mono font-bold"
                        style={{ color: isSelected ? service.color : "var(--color-muted)" }}
                      >
                        {service.number}
                      </span>
                      <span className="text-lg font-extrabold text-foreground">
                        {service.title}
                      </span>
                    </div>

                    <Icon
                      className="w-5 h-5 transition-transform duration-300"
                      style={{ color: isSelected ? service.color : "var(--color-muted)" }}
                    />
                  </button>
                );
              })}
            </div>

            {/* RIGHT SPOTLIGHT STAGE */}
            <div className="lg:col-span-7">
              {(() => {
                const target = SERVICES.find((s) => s.id === expandedId) || SERVICES[0];
                const TargetIcon = iconMap[target.icon] || Monitor;

                return (
                  <motion.div
                    key={target.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-3xl border border-white/20 bg-surface/90 p-8 md:p-12 overflow-hidden shadow-2xl backdrop-blur-2xl"
                  >
                    {/* Glowing Corner Aura */}
                    <div
                      className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                      style={{ backgroundColor: target.color }}
                    />

                    <div className="relative z-10 space-y-8">
                      {/* Top Header */}
                      <div className="flex items-center justify-between">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center border bg-black/60 shadow-lg text-white"
                          style={{ borderColor: `${target.color}60`, color: target.color }}
                        >
                          <TargetIcon className="w-8 h-8" />
                        </div>
                        <span className="text-4xl font-mono font-black" style={{ color: target.color }}>
                          {target.number}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
                          {target.title}
                        </h3>
                        <p className="text-base text-foreground font-medium leading-relaxed">
                          {target.description}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div className="pt-6 border-t border-border">
                        <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider block mb-3">
                          // TECHNOLOGIES & TOOLING
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {target.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-white/10 border border-white/20 text-white shadow-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })()}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
