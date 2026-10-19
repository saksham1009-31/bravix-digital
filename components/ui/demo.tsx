"use client";

import { HeaderNav } from "@/components/ui/header-nav";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BravixScrollAnimation } from "@/components/ui/bravix-scroll-animation";
import { AgencySections } from "@/components/ui/agency-sections";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { Sparkles, ArrowUpRight } from "lucide-react";

export default function Demo() {
  return (
    <div id="top" className="relative w-full bg-background min-h-screen font-sans selection:bg-white/20 overflow-x-hidden">
      {/* Floating Header Navigation */}
      <HeaderNav />

      {/* 
        MAIN CONTENT AREA 
        We use a high z-index and minimum height to allow the user 
        to scroll down and reveal the footer securely underneath.
      */}
      <main className="relative z-10 w-full min-h-[120vh] bg-background flex flex-col items-center justify-center text-foreground border-b border-white/10 shadow-md rounded-b-3xl px-6 py-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
        
        {/* Eyebrow */}
        <span className="text-xs sm:text-sm font-mono tracking-[0.3em] text-neutral-400 uppercase mb-4">
          DIGITAL CREATIVE AGENCY
        </span>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-foreground max-w-4xl mb-6 leading-[1.15]">
          We turn bold ideas into digital experiences.
        </h1>

        {/* Supporting text */}
        <p className="text-base sm:text-lg md:text-xl font-light text-neutral-400 max-w-2xl mb-8 leading-relaxed">
          We design premium websites, develop intelligent AI solutions, and create digital products for ambitious brands.
        </p>

        {/* Service line */}
        <div className="text-xs sm:text-sm font-mono tracking-[0.25em] text-neutral-500 uppercase mb-8">
          WEB DESIGN · DEVELOPMENT · AI SOLUTIONS
        </div>

        {/* Interactive Magnetic Hero Action Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          <MagneticButton
            as="a"
            href="#contact"
            className="magnetic-glass-pill px-8 py-4 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-3 group"
          >
            <Sparkles className="w-5 h-5 text-[#FF4D00] group-hover:rotate-12 transition-transform" />
            <span>Start a project</span>
          </MagneticButton>

          <MagneticButton
            as="a"
            href="#work"
            className="magnetic-glass-pill px-8 py-4 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-3 group"
          >
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span>Explore our work</span>
          </MagneticButton>
        </div>
        
        {/* Scroll indicator with gradient line */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs font-light tracking-[0.2em] text-neutral-500 uppercase">
            Scroll down to reveal
          </span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-neutral-400 to-transparent" />
        </div>
      </main>

      {/* BRAVIX Middle Scroll Animation */}
      <BravixScrollAnimation />

      {/* Agency Services, Portfolio, About, and Contact Sections */}
      <AgencySections />

      {/* The Cinematic Footer is injected here */}
      <CinematicFooter />
      
    </div>
  );
}
