"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safely register GSAP ScrollTrigger for client environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SceneItem {
  id: string;
  number: string;
  phase: string;
  title: string;
  supporting: string;
}

const SCENES: SceneItem[] = [
  {
    id: "ideas",
    number: "01",
    phase: "PHASE 01 — VISION & DISCOVERY",
    title: "IDEAS",
    supporting: "Every remarkable digital experience starts with an idea.",
  },
  {
    id: "imagine",
    number: "02",
    phase: "PHASE 02 — CREATIVE STRATEGY",
    title: "IMAGINE",
    supporting: "Think beyond templates. Create beyond expectations.",
  },
  {
    id: "build",
    number: "03",
    phase: "PHASE 03 — HIGH-PRECISION ENGINEERING",
    title: "BUILD",
    supporting: "Premium websites. Intelligent AI. Digital products.",
  },
  {
    id: "impact",
    number: "04",
    phase: "PHASE 04 — ACCELERATION & REACH",
    title: "IMPACT",
    supporting: "Digital experiences designed to move businesses forward.",
  },
];

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function BravixScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion) return;
    if (!containerRef.current || !pinTargetRef.current) return;

    // Use gsap.matchMedia to handle responsive layouts cleanly
    const mm = gsap.matchMedia(containerRef);

    // =========================================================================
    // DESKTOP & TABLET: Pinned 400vh Scroll Timeline with Exact 4.0 Duration
    // =========================================================================
    mm.add("(min-width: 768px)", () => {
      // Timeline duration = exactly 4.0 normalized units (1.0 unit per scene)
      // Driven entirely by ScrollTrigger scrub across 400vh
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 400vh total scroll distance
          pin: pinTargetRef.current,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
          onUpdate: (self) => {
            // Update HUD progress line (0 to 100%)
            if (progressLineRef.current) {
              gsap.set(progressLineRef.current, { scaleX: self.progress });
            }
            // Update scene counter indicator
            if (counterRef.current) {
              const currentSceneIndex = Math.min(
                3,
                Math.floor(self.progress * 4)
              );
              counterRef.current.textContent = SCENES[currentSceneIndex].number;
            }
          },
        },
      });

      // Initially hide scenes 1, 2, 3
      SCENES.forEach((_, idx) => {
        if (idx !== 0) {
          gsap.set(`.scene-panel-${idx}`, { autoAlpha: 0 });
          gsap.set(`.scene-panel-${idx} .char-item`, {
            y: "0.6em",
            opacity: 0,
            scale: 0.94,
          });
          gsap.set(`.scene-panel-${idx} .accent-line`, { scaleX: 0 });
          gsap.set(`.scene-panel-${idx} .scene-meta`, { y: 20, opacity: 0 });
          gsap.set(`.scene-panel-${idx} .scene-support`, { y: 25, opacity: 0 });
        } else {
          // Scene 0 starts ready
          gsap.set(`.scene-panel-0`, { autoAlpha: 1 });
          gsap.set(`.scene-panel-0 .char-item`, {
            y: "0em",
            opacity: 1,
            scale: 1,
          });
          gsap.set(`.scene-panel-0 .accent-line`, { scaleX: 1 });
          gsap.set(`.scene-panel-0 .scene-meta`, { y: 0, opacity: 1 });
          gsap.set(`.scene-panel-0 .scene-support`, { y: 0, opacity: 1 });
        }
      });

      // Specifically prepare Scene 3 decorative elements (browser wireframe & AI nodes)
      gsap.set(".scene-panel-2 .build-interface-deco", {
        opacity: 0,
        y: 20,
        scale: 0.96,
      });

      // -----------------------------------------------------------------------
      // SCENE 1 — IDEAS. [0.00 – 1.00 timeline units / 0–25% scroll progress]
      // 0.00–0.20: Entrance (already visible at start, underline & support settle)
      // 0.20–0.65: Readable hold
      // 0.65–0.85: Exit transition begins
      // 0.85–1.00: Finish transition, prepare Scene 2
      // -----------------------------------------------------------------------
      tl.to(
        ".scene-panel-0 .char-item",
        {
          y: "-0.6em",
          opacity: 0,
          stagger: 0.025,
          duration: 0.16,
          ease: "power2.in",
        },
        0.65
      );
      tl.to(
        [
          ".scene-panel-0 .scene-support",
          ".scene-panel-0 .scene-meta",
          ".scene-panel-0 .accent-line",
        ],
        {
          y: -20,
          opacity: 0,
          duration: 0.14,
          ease: "power2.in",
        },
        0.68
      );
      tl.set(".scene-panel-0", { autoAlpha: 0 }, 0.85);

      // -----------------------------------------------------------------------
      // SCENE 2 — IMAGINE. [1.00 – 2.00 timeline units / 25–50% scroll progress]
      // 0.85–1.00: Crossfade in from Scene 1 (no blank gap)
      // 1.00–1.20: Entrance and staggered letter reveal
      // 1.20–1.65: Readable hold
      // 1.65–1.85: Exit transition begins
      // 1.85–2.00: Finish transition, prepare Scene 3
      // -----------------------------------------------------------------------
      tl.set(".scene-panel-1", { autoAlpha: 1 }, 0.85);
      tl.fromTo(
        ".scene-panel-1 .scene-meta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.12, ease: "power2.out" },
        0.88
      );
      // Letter reveal with masked vertical transition and subtle letter spacing
      tl.fromTo(
        ".scene-panel-1 .headline-mask",
        { letterSpacing: "0.08em" },
        { letterSpacing: "-0.01em", duration: 0.2, ease: "power2.out" },
        0.98
      );
      tl.fromTo(
        ".scene-panel-1 .char-item",
        { y: "0.6em", opacity: 0, scale: 0.94 },
        {
          y: "0em",
          opacity: 1,
          scale: 1,
          stagger: 0.02,
          duration: 0.16,
          ease: "power2.out",
        },
        1.0
      );
      // Thin orange line across composition
      tl.fromTo(
        ".scene-panel-1 .accent-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.15, ease: "power2.out" },
        1.06
      );
      tl.fromTo(
        ".scene-panel-1 .scene-support",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.14, ease: "power2.out" },
        1.08
      );

      // Scene 2 Exit
      tl.to(
        ".scene-panel-1 .char-item",
        {
          y: "-0.6em",
          opacity: 0,
          stagger: 0.02,
          duration: 0.16,
          ease: "power2.in",
        },
        1.65
      );
      tl.to(
        [
          ".scene-panel-1 .scene-support",
          ".scene-panel-1 .scene-meta",
          ".scene-panel-1 .accent-line",
        ],
        {
          y: -20,
          opacity: 0,
          duration: 0.14,
          ease: "power2.in",
        },
        1.68
      );
      tl.set(".scene-panel-1", { autoAlpha: 0 }, 1.85);

      // -----------------------------------------------------------------------
      // SCENE 3 — BUILD. [2.00 – 3.00 timeline units / 50–75% scroll progress]
      // 1.85–2.00: Crossfade in from Scene 2
      // 2.00–2.20: Entrance and staggered letter reveal + interface/AI nodes
      // 2.20–2.65: Readable hold
      // 2.65–2.85: Exit transition begins
      // 2.85–3.00: Finish transition, prepare Scene 4
      // -----------------------------------------------------------------------
      tl.set(".scene-panel-2", { autoAlpha: 1 }, 1.85);
      tl.fromTo(
        ".scene-panel-2 .scene-meta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.12, ease: "power2.out" },
        1.88
      );
      tl.fromTo(
        ".scene-panel-2 .char-item",
        { y: "0.6em", opacity: 0, scale: 0.94 },
        {
          y: "0em",
          opacity: 1,
          scale: 1,
          stagger: 0.024,
          duration: 0.16,
          ease: "power2.out",
        },
        2.0
      );
      tl.fromTo(
        ".scene-panel-2 .accent-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.15, ease: "power2.out" },
        2.06
      );
      // Secondary interface shapes & AI nodes staggered in
      tl.fromTo(
        ".scene-panel-2 .build-interface-deco",
        { opacity: 0, y: 15, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.16, ease: "power2.out" },
        2.08
      );
      tl.fromTo(
        ".scene-panel-2 .scene-support",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.14, ease: "power2.out" },
        2.1
      );

      // Scene 3 Exit
      tl.to(
        ".scene-panel-2 .char-item",
        {
          y: "-0.6em",
          opacity: 0,
          stagger: 0.02,
          duration: 0.16,
          ease: "power2.in",
        },
        2.65
      );
      tl.to(
        [
          ".scene-panel-2 .build-interface-deco",
          ".scene-panel-2 .scene-support",
          ".scene-panel-2 .scene-meta",
          ".scene-panel-2 .accent-line",
        ],
        {
          y: -20,
          opacity: 0,
          duration: 0.14,
          ease: "power2.in",
        },
        2.68
      );
      tl.set(".scene-panel-2", { autoAlpha: 0 }, 2.85);

      // -----------------------------------------------------------------------
      // SCENE 4 — IMPACT. [3.00 – 4.00 timeline units / 75–100% scroll progress]
      // 2.85–3.00: Crossfade in from Scene 3
      // 3.00–3.20: Entrance and staggered letter reveal
      // 3.20–3.65: Readable hold
      // 3.65–3.90: Supporting sentence & letters fade/move out
      // 3.90–4.00: Clean visual handoff into existing "Ready to begin?" slide
      // -----------------------------------------------------------------------
      tl.set(".scene-panel-3", { autoAlpha: 1 }, 2.85);
      tl.fromTo(
        ".scene-panel-3 .scene-meta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.12, ease: "power2.out" },
        2.88
      );
      tl.fromTo(
        ".scene-panel-3 .char-item",
        { y: "0.6em", opacity: 0, scale: 0.94 },
        {
          y: "0em",
          opacity: 1,
          scale: 1,
          stagger: 0.02,
          duration: 0.16,
          ease: "power2.out",
        },
        3.0
      );
      tl.fromTo(
        ".scene-panel-3 .accent-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.16, ease: "power2.out" },
        3.06
      );
      tl.fromTo(
        ".scene-panel-3 .scene-support",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.14, ease: "power2.out" },
        3.08
      );

      // Hold until 3.65, then transition out cleanly for handoff
      tl.to(
        ".scene-panel-3 .scene-support",
        { y: -15, opacity: 0, duration: 0.18, ease: "power2.in" },
        3.65
      );
      tl.to(
        ".scene-panel-3 .char-item",
        {
          y: "-0.4em",
          opacity: 0,
          stagger: 0.015,
          duration: 0.18,
          ease: "power2.in",
        },
        3.72
      );
      tl.to(
        [".scene-panel-3 .accent-line", ".scene-panel-3 .scene-meta"],
        { y: -15, opacity: 0, duration: 0.14, ease: "power2.in" },
        3.75
      );
      // Clean handoff pause to finalize at 4.00
      tl.to({}, { duration: 0.1 }, 3.9);
    });

    // =========================================================================
    // MOBILE (< 768px): Normal-Flow Adaptive Responsive Layout
    // =========================================================================
    mm.add("(max-width: 767px)", () => {
      // On mobile screens, disable pinning to avoid clipping or cramped viewports.
      // Animate each scene with its own trigger as it enters the viewport.
      SCENES.forEach((_, idx) => {
        const sceneEl = `.mobile-scene-${idx}`;
        gsap.fromTo(
          `${sceneEl} .char-item`,
          { y: "0.5em", opacity: 0, scale: 0.94 },
          {
            y: "0em",
            opacity: 1,
            scale: 1,
            stagger: 0.04,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sceneEl,
              start: "top 75%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        gsap.fromTo(
          `${sceneEl} .accent-line`,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sceneEl,
              start: "top 70%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, [prefersReducedMotion]);

  // Reduced motion accessible fallback view
  if (prefersReducedMotion) {
    return (
      <section className="relative z-10 w-full bg-[#F8F9FA] text-[#0A0A0A] border-b border-black/10 py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto space-y-24">
          {SCENES.map((scene) => (
            <div key={scene.id} className="border-l-2 border-[#FF4D00] pl-6 py-4">
              <span className="text-xs font-mono tracking-widest text-[#FF4D00] uppercase font-bold">
                {scene.phase}
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-[#0A0A0A] tracking-tight mt-2">
                {scene.title}
                <span className="text-[#FF4D00]">.</span>
              </h2>
              <p className="text-lg md:text-xl text-[#0A0A0A]/70 mt-4 max-w-xl">
                {scene.supporting}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full bg-[#F8F9FA] text-[#0A0A0A] border-b border-black/10 shadow-lg rounded-b-3xl overflow-hidden"
    >
      {/* 
        DESKTOP & TABLET VIEWPORT:
        Pinned during the 400vh scroll distance, houses the 4 stacked animated scenes
      */}
      <div
        ref={pinTargetRef}
        className="hidden md:flex relative h-screen w-full flex-col justify-between overflow-hidden bg-[#F8F9FA] select-none"
      >
        {/* Futuristic Precision Grid Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Subtle Radial Glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] bg-gradient-to-tr from-[#FF4D00]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Precision Crosshair Corner Accents */}
        <span className="absolute top-6 left-6 text-xs font-mono text-[#0A0A0A]/20 select-none">
          +
        </span>
        <span className="absolute top-6 right-6 text-xs font-mono text-[#0A0A0A]/20 select-none">
          +
        </span>

        {/* 1. TOP STATUS / HUD BAR */}
        <header className="relative z-20 w-full px-6 md:px-12 pt-8 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#0A0A0A]/60">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
            <span className="font-bold text-[#0A0A0A]">BRAVIX</span>
            <span className="text-[#0A0A0A]/30">|</span>
            <span className="text-[#0A0A0A]/50">DIGITAL AGENCY</span>
          </div>

          {/* Central Scroll Progress Bar */}
          <div className="flex items-center gap-3 w-48">
            <span className="text-[10px] text-[#0A0A0A]/40 font-mono">FLOW</span>
            <div className="flex-1 h-[2px] bg-black/10 overflow-hidden rounded-full">
              <div
                ref={progressLineRef}
                className="h-full w-full bg-[#FF4D00] origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>

          {/* Dynamic Scene Counter */}
          <div className="flex items-center gap-1 font-bold">
            <span>SCENE</span>
            <span ref={counterRef} className="text-[#FF4D00] font-black">
              01
            </span>
            <span className="text-[#0A0A0A]/30">/</span>
            <span className="text-[#0A0A0A]/40">04</span>
          </div>
        </header>

        {/* 2. CENTER CONTENT DISPLAY (4 Stacked Animated Scenes) */}
        <div className="relative z-20 flex-1 flex items-center justify-center w-full max-w-6xl mx-auto px-6">
          {SCENES.map((scene, idx) => (
            <article
              key={scene.id}
              className={`scene-panel-${idx} absolute inset-0 flex flex-col items-center justify-center text-center px-4`}
              aria-label={`${scene.title}: ${scene.supporting}`}
            >
              {/* Category / Phase Metadata */}
              <div className="scene-meta flex items-center gap-2 mb-4 md:mb-5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
                <span className="text-[11px] md:text-xs font-mono font-semibold tracking-[0.25em] text-[#FF4D00] uppercase">
                  {scene.phase}
                </span>
              </div>

              {/* Minimal Secondary Interface Shapes & AI Nodes (Scene 3 - BUILD) */}
              {idx === 2 && (
                <div className="build-interface-deco mb-4 flex items-center justify-center gap-4 text-xs font-mono text-[#0A0A0A]/40">
                  <div className="px-3 py-1 rounded border border-black/15 bg-black/[0.02] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>AI_NODE_ACTIVE</span>
                  </div>
                  <span className="text-black/20">───</span>
                  <div className="px-3 py-1 rounded border border-black/15 bg-black/[0.02] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
                    <span>SYSTEM_COMPILED</span>
                  </div>
                </div>
              )}

              {/* Main Headline (Character-Level Masked Reveal) */}
              <h2 className="relative text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-[#0A0A0A] leading-none mb-4">
                <span className="sr-only">
                  {scene.title}.
                </span>
                
                {/* Character Split Wrapper with Mask */}
                <div
                  className="headline-mask overflow-hidden inline-flex items-baseline py-2 px-2"
                  aria-hidden="true"
                >
                  <div className="inline-flex items-baseline">
                    {scene.title.split("").map((char, charIdx) => (
                      <span
                        key={`s${idx}-c${charIdx}-${char}`}
                        className="char-item inline-block will-change-transform transform-gpu select-none"
                      >
                        {char}
                      </span>
                    ))}
                    {/* Period visually attached to word in orange accent */}
                    <span
                      key={`s${idx}-period`}
                      className="char-item inline-block text-[#FF4D00] font-black will-change-transform transform-gpu select-none ml-[0.02em]"
                    >
                      .
                    </span>
                  </div>
                </div>
              </h2>

              {/* Supporting Graphic: Expanding Thin Orange Line */}
              <div className="w-full max-w-xs md:max-w-md h-[2px] bg-black/10 overflow-hidden my-2 rounded-full">
                <div className="accent-line h-full w-full bg-[#FF4D00] origin-left" />
              </div>

              {/* Supporting Copy */}
              <p className="scene-support text-lg md:text-2xl font-light text-[#0A0A0A]/75 max-w-2xl mt-4 md:mt-5 leading-relaxed tracking-wide px-4">
                {scene.supporting}
              </p>
            </article>
          ))}
        </div>

        {/* Bottom spacing buffer for optical vertical centering */}
        <div className="h-8 w-full pointer-events-none" />
      </div>

      {/* 
        MOBILE ADAPTIVE NORMAL-FLOW:
        Ensures text never clips and layout stays comfortable on small screens
      */}
      <div className="md:hidden flex flex-col py-16 px-6 space-y-24">
        {SCENES.map((scene, idx) => (
          <article
            key={`mobile-${scene.id}`}
            className={`mobile-scene-${idx} flex flex-col items-start`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF4D00] uppercase">
                {scene.phase}
              </span>
            </div>

            <h2 className="text-5xl font-black text-[#0A0A0A] tracking-tight leading-none overflow-hidden py-1">
              <span className="sr-only">{scene.title}.</span>
              <div className="inline-flex items-baseline" aria-hidden="true">
                {scene.title.split("").map((char, charIdx) => (
                  <span
                    key={`m-s${idx}-c${charIdx}-${char}`}
                    className="char-item inline-block will-change-transform select-none"
                  >
                    {char}
                  </span>
                ))}
                <span className="char-item inline-block text-[#FF4D00] font-black select-none ml-[0.02em]">
                  .
                </span>
              </div>
            </h2>

            <div className="w-32 h-[2px] bg-black/10 overflow-hidden my-3 rounded-full">
              <div className="accent-line h-full w-full bg-[#FF4D00] origin-left" />
            </div>

            <p className="text-base text-[#0A0A0A]/70 leading-relaxed mt-2">
              {scene.supporting}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
