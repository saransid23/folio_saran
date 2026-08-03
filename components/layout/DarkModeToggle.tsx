"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage or system preference
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-[1000] w-12 h-12 rounded-full glass flex items-center justify-center hover:border-accent transition-all duration-300 shadow-lg"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
