import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import AIChatWidget from "@/components/AIChatWidget";

export default function Home() {
  return (
    <div id="top">
      <Hero />
      <div className="border-t border-white/[0.04]" />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <AIChatWidget />
    </div>
  );
}
