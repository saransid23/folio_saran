"use client";

import { useState } from "react";
import Preloader from "@/components/layout/Preloader";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SmoothScroll from "@/components/layout/SmoothScroll";
import DarkModeToggle from "@/components/layout/DarkModeToggle";
import GradientBlobs from "@/components/animations/GradientBlobs";
import FloatingParticles from "@/components/animations/FloatingParticles";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <div>
        <CustomCursor />
        <ScrollProgress />
        <DarkModeToggle />
        <div className="noise-overlay" />
        <GradientBlobs />
        <FloatingParticles />
        
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </div>
    </>
  );
}
