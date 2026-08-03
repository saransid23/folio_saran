"use client";

import { useEffect, useRef } from "react";

export default function GradientBlobs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Blobs animate via CSS — this component is purely decorative
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Blob 1 */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03] animate-float"
        style={{
          top: "10%",
          left: "10%",
          background:
            "radial-gradient(circle, #D9FF3F 0%, transparent 70%)",
          filter: "blur(80px)",
          animationDelay: "0s",
        }}
      />
      {/* Blob 2 */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.02] animate-float"
        style={{
          top: "50%",
          right: "5%",
          background:
            "radial-gradient(circle, #D9FF3F 0%, transparent 70%)",
          filter: "blur(100px)",
          animationDelay: "2s",
        }}
      />
      {/* Blob 3 */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.02] animate-float"
        style={{
          bottom: "10%",
          left: "30%",
          background:
            "radial-gradient(circle, #D9FF3F 0%, transparent 70%)",
          filter: "blur(80px)",
          animationDelay: "4s",
        }}
      />
    </div>
  );
}
