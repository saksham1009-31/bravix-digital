"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function HeaderNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#top" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl transition-all duration-300 ${
        isScrolled ? "py-1" : "py-2"
      }`}
    >
      <div className="relative rounded-full border border-border/50 bg-background/80 backdrop-blur-xl px-5 sm:px-8 py-3.5 shadow-2xl flex items-center justify-between transition-all">
        {/* Logo */}
        <Link
          href="#top"
          className="flex items-center gap-2 font-black tracking-tighter text-lg md:text-xl text-foreground group"
        >
          <span>BRAVIX</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] group-hover:scale-150 transition-transform" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-4">
          <MagneticButton
            as="a"
            href="#contact"
            className="magnetic-glass-pill flex items-center gap-2 px-5 py-2.5 rounded-full text-foreground text-xs font-bold tracking-wide group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF4D00] group-hover:rotate-12 transition-transform" />
            <span>Start a Project</span>
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-5 rounded-3xl border border-border/60 bg-background/95 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground py-2 border-b border-border/20 flex items-center justify-between"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground/60" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-foreground text-background text-xs font-bold tracking-wide"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF4D00]" />
            Start a Project
          </a>
        </div>
      )}
    </header>
  );
}
