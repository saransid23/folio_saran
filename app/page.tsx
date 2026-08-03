import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Services />
      <Contact />
    </main>
  );
}
