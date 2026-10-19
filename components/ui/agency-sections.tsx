"use client";

import React, { useState } from "react";
import {
  Code,
  Layout,
  Cpu,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  Clock,
  Globe,
  ExternalLink,
  X,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface ProjectItem {
  id: string;
  title: string;
  badge: string;
  category: string;
  description: string;
  tech: string[];
  metrics: string;
  clientProblem: string;
  solution: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "hearth-crumb",
    title: "Hearth & Crumb Bakery",
    badge: "CLIENT WORK",
    category: "Artisan Bakery & Cafe",
    description:
      "A warm, welcoming website and online ordering menu for an independent neighborhood sourdough bakery, featuring daily bake schedules, weekend pastry pre-orders, and catering inquiries.",
    tech: ["Next.js", "Online Pre-orders", "Tailwind CSS", "Local SEO"],
    metrics: "+58% weekend pastry pre-orders · Zero missed phone orders",
    clientProblem:
      "Morning rush lines were out the door, and the bakery staff was overwhelmed answering phone calls asking which specialty breads were still in stock.",
    solution:
      "Built an inviting, mobile-first website with a live daily bake board, a simple 2-click pre-order system for morning pickup, and clear open hours.",
  },
  {
    id: "northstar-dental",
    title: "North Star Dental Studio",
    badge: "CLIENT WORK",
    category: "Dental Practice & Family Care",
    description:
      "A clean, friendly website and patient portal for an independent family dental clinic, featuring online appointment booking, digital intake forms, and transparent treatment pricing.",
    tech: ["Next.js", "Online Booking", "Tailwind CSS", "Patient Portal"],
    metrics: "3.2x more online bookings · 100% paperless intake",
    clientProblem:
      "Patients found booking appointments over the phone frustrating, and clinic staff spent hours entering handwritten paper intake forms by hand.",
    solution:
      "Created a calm, accessible clinic website where patients can book checkups online and complete their intake forms on their phone before arriving.",
  },
  {
    id: "studio-moire",
    title: "Studio Moiré Architecture",
    badge: "CLIENT WORK",
    category: "Residential Architecture & Interiors",
    description:
      "An elegant, photography-first portfolio for a boutique residential architecture firm, showcasing home renovations, before-and-after case studies, and consultation inquiries.",
    tech: ["Next.js", "Photo Gallery", "Tailwind CSS", "Fast Page Loads"],
    metrics: "+65% client project inquiries · 1.1s average load time",
    clientProblem:
      "Their previous portfolio was slow to load on mobile and didn't show the craftsmanship, floor plans, or story behind each home renovation.",
    solution:
      "Engineered a fast, photo-rich portfolio with clean before/after comparisons, project material notes, and a simple consultation inquiry form.",
  },
  {
    id: "ridgecrest-advisors",
    title: "Ridgecrest Financial Advisors",
    badge: "CLIENT WORK",
    category: "Financial Planning & Advisory",
    description:
      "A straightforward, trustworthy website for an independent financial advisory practice, featuring transparent service guides, secure client portal access, and direct consultation scheduling.",
    tech: ["Next.js", "Tailwind CSS", "Client Portal", "Responsive Design"],
    metrics: "+44% consultation bookings · 100% mobile-friendly",
    clientProblem:
      "Potential clients found their old website cluttered with confusing financial jargon and difficult to read on mobile devices.",
    solution:
      "Designed a clean, modern website with straightforward service explanations, an interactive fee calculator, and direct appointment scheduling.",
  },
];

const SERVICES = [
  {
    id: "website-design",
    title: "Website Design & Development",
    subtitle: "Modern, responsive websites engineered for ambitious brands.",
    icon: Code,
    deliverables: [
      "Custom responsive UI/UX design",
      "Next.js / React high-performance architecture",
      "Headless CMS integration",
      "Search engine optimization (SEO) foundation",
    ],
    highlight: "Core Specialty",
  },
  {
    id: "landing-pages",
    title: "Landing Pages & Business Websites",
    subtitle: "Focused digital experiences designed around clear business conversion goals.",
    icon: Layout,
    deliverables: [
      "High-converting visual hierarchies",
      "Fast page loads with modern WebP/AVIF media",
      "A/B testing-ready modular components",
      "CRM and email capture integration",
    ],
    highlight: "Conversion Focused",
  },
  {
    id: "ai-solutions",
    title: "AI Solutions & Integration",
    subtitle: "Intelligent features and workflows to give your product a competitive edge.",
    icon: Cpu,
    deliverables: [
      "Custom LLM and chatbot integrations",
      "Automated content & document workflows",
      "Intelligent recommendation engines",
      "Secure API connectors & guardrails",
    ],
    highlight: "Intelligent Tech",
  },
  {
    id: "interactive-experiences",
    title: "Interactive Experiences",
    subtitle: "Smooth animations, polished interfaces, and memorable user journeys.",
    icon: Sparkles,
    deliverables: [
      "Scroll-driven GSAP & ScrollTrigger physics",
      "Micro-interactions & fluid cursor effects",
      "Curtain-reveal & 3D canvas transitions",
      "Optimized 60FPS browser performance",
    ],
    highlight: "Motion & Polish",
  },
];

export function AgencySections() {
  const [selectedService, setSelectedService] = useState<string>("Website Design & Development");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Website Design & Development",
    budget: "$5k - $15k",
    message: "",
    honeypot: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formFeedback, setFormFeedback] = useState<string>("");

  const handleServiceSelect = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setFormData((prev) => ({ ...prev, projectType: serviceTitle }));
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setFormFeedback("");

    // Client-side validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setFormStatus("error");
      setFormFeedback("Please enter a valid name (at least 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setFormStatus("error");
      setFormFeedback("Please enter a valid email address.");
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setFormStatus("error");
      setFormFeedback("Please provide a project description (at least 10 characters).");
      return;
    }

    try {
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ||
        "f41daa70-2124-4462-8146-0b8e8006be71";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Project Enquiry: ${formData.name.trim()} (${formData.projectType})`,
          from_name: "BRAVIX Digital Agency",
          name: formData.name.trim(),
          email: formData.email.trim(),
          project_type: formData.projectType,
          budget: formData.budget || "Not specified",
          message: formData.message.trim(),
          botcheck: formData.honeypot || "",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus("success");
        setFormFeedback(
          data.message ||
            "Thank you! Your project enquiry has been submitted. Our team will review your requirements and respond within 24 hours."
        );
        // Reset inputs on success
        setFormData({
          name: "",
          email: "",
          projectType: selectedService,
          budget: "$5k - $15k",
          message: "",
          honeypot: "",
        });
      } else {
        setFormStatus("error");
        setFormFeedback(
          data.message || "Failed to submit enquiry through Web3Forms. Please try again."
        );
      }
    } catch {
      setFormStatus("error");
      setFormFeedback("Network error. Please check your connection or email us directly at ssakkssham@gmail.com.");
    }
  };

  return (
    <div className="relative z-10 w-full bg-background text-foreground">
      {/* =====================================================================
          1. SERVICES SECTION
      ====================================================================== */}
      <section id="services" className="w-full py-28 px-6 md:px-12 border-b border-border/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#FF4D00] uppercase">
                What We Do
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mt-3">
                Full-Cycle Digital Services
              </h2>
            </div>
            <p className="text-muted-foreground text-sm md:text-base max-w-md">
              We partner with forward-thinking businesses to craft refined visual identities, performant web platforms, and automated workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="group relative rounded-3xl border border-border/60 bg-card/40 hover:bg-card/70 p-8 md:p-10 transition-all duration-300 hover:border-[#FF4D00]/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground group-hover:text-[#FF4D00] group-hover:bg-[#FF4D00]/10 transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-border/60 text-muted-foreground">
                        {srv.highlight}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3">{srv.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {srv.subtitle}
                    </p>

                    <div className="space-y-2.5 mb-8">
                      {srv.deliverables.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border/30">
                    <MagneticButton
                      onClick={() => handleServiceSelect(srv.title)}
                      className="magnetic-glass-pill px-5 py-2.5 rounded-full text-foreground text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-2 group w-fit"
                    >
                      <span>Start a Project with this</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FF4D00] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </MagneticButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. PORTFOLIO / WORK SECTION
      ====================================================================== */}
      <section id="work" className="w-full py-28 px-6 md:px-12 border-b border-border/40 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#FF4D00] uppercase">
                Selected Works
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mt-3">
                Crafted for Impact
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">
                [ SELECTED CLIENT WORK ]
              </span>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                Real web platforms, online menus, and digital systems built for growing businesses and independent brands.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setActiveModalProject(proj)}
                className="group cursor-pointer rounded-3xl border border-border/60 bg-card/40 hover:bg-card/80 p-8 transition-all duration-300 hover:border-foreground/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 text-xs font-mono">
                    <span className="text-[#FF4D00] font-semibold tracking-wider">
                      {proj.badge}
                    </span>
                    <span className="text-muted-foreground">{proj.category}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-[#FF4D00] transition-colors flex items-center justify-between">
                    <span>{proj.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-3 py-1 rounded-full bg-foreground/5 border border-border/40 text-foreground/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/30 flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>{proj.metrics}</span>
                  <MagneticButton
                    as="span"
                    className="magnetic-glass-pill px-3.5 py-1.5 rounded-full text-foreground group-hover:text-[#FF4D00] inline-flex items-center gap-1.5 text-xs font-bold"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </MagneticButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. ABOUT SECTION
      ====================================================================== */}
      <section id="about" className="w-full py-28 px-6 md:px-12 border-b border-border/40">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#FF4D00] uppercase">
            About the Agency
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mt-4 mb-8 leading-[1.2]">
            &ldquo;Design with purpose. Build with precision. Create digital experiences that move businesses forward.&rdquo;
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border/40 text-muted-foreground text-sm leading-relaxed">
            <div>
              <h3 className="text-foreground font-bold text-base mb-2">Our Mission</h3>
              <p>
                BRAVIX is a digital creative agency combining design, development, and intelligent technology to build meaningful digital experiences for ambitious businesses.
              </p>
            </div>
            <div>
              <h3 className="text-foreground font-bold text-base mb-2">Our Engineering</h3>
              <p>
                We build exclusively with modern production frameworks like Next.js, TypeScript, and hardware-accelerated animations (GSAP) to deliver lightning-fast, accessible products.
              </p>
            </div>
            <div>
              <h3 className="text-foreground font-bold text-base mb-2">AI-Driven Value</h3>
              <p>
                We do not add technology for novelty. Every AI model, conversational interface, or automation pipeline is integrated with deliberate business utility and measurable ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. CONTACT & PROJECT ENQUIRY SECTION
      ====================================================================== */}
      <section id="contact" className="w-full py-28 px-6 md:px-12 border-b border-border/40 bg-muted/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#FF4D00] uppercase">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mt-3 mb-4">
              Start a Project
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Tell us about your objectives. We will review your project scope and provide architectural guidance, timeline estimates, and preliminary pricing within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl border border-border/60 bg-card/50">
                <Mail className="w-6 h-6 text-[#FF4D00] mb-3" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Direct Inquiries
                </h3>
                <a
                  href="mailto:ssakkssham@gmail.com"
                  className="text-base font-bold text-foreground hover:text-[#FF4D00] transition-colors flex items-center gap-1.5"
                >
                  ssakkssham@gmail.com <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-6 rounded-3xl border border-border/60 bg-card/50">
                <Clock className="w-6 h-6 text-[#FF4D00] mb-3" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Response Guarantee
                </h3>
                <p className="text-sm font-bold text-foreground">
                  Within 24 Hours
                </p>
                <span className="text-xs text-muted-foreground">Monday – Friday</span>
              </div>

              <div className="p-6 rounded-3xl border border-border/60 bg-card/50">
                <Globe className="w-6 h-6 text-[#FF4D00] mb-3" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Availability
                </h3>
                <p className="text-sm font-bold text-foreground">
                  Global Clients · Remote First
                </p>
              </div>
            </div>

            {/* Project Enquiry Form */}
            <div className="lg:col-span-2 rounded-3xl border border-border/60 bg-card/60 p-8 md:p-10 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field for anti-spam */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                      Your Name <span className="text-[#FF4D00]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:border-[#FF4D00] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                      Your Email <span className="text-[#FF4D00]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:border-[#FF4D00] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                      Project Type <span className="text-[#FF4D00]">*</span>
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:border-[#FF4D00] transition-colors"
                    >
                      <option value="Website Design & Development">Website Design & Development</option>
                      <option value="Landing Pages & Business Websites">Landing Pages & Business Websites</option>
                      <option value="AI Solutions & Integration">AI Solutions & Integration</option>
                      <option value="Interactive Experiences">Interactive Experiences</option>
                      <option value="Complete Digital Transformation">Complete Digital Transformation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                      Budget Range (Optional)
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:border-[#FF4D00] transition-colors"
                    >
                      <option value="Under $5k">Under $5k</option>
                      <option value="$5k - $15k">$5k - $15k</option>
                      <option value="$15k - $30k">$15k - $30k</option>
                      <option value="$30k+">$30k+</option>
                      <option value="To be discussed">To be discussed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    Project Description <span className="text-[#FF4D00]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your brand, project goals, timeline, and key requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:border-[#FF4D00] transition-colors resize-none"
                  />
                </div>

                {/* Status Feedback */}
                {formStatus === "success" && (
                  <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{formFeedback}</span>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{formFeedback}</span>
                  </div>
                )}

                <MagneticButton
                  as="button"
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="magnetic-glass-pill w-full py-4 rounded-full text-foreground font-bold text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 group shadow-lg"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#FF4D00]" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#FF4D00] group-hover:rotate-12 transition-transform" />
                      <span>Submit Project Enquiry</span>
                    </>
                  )}
                </MagneticButton>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. PROJECT MODAL DRAWER
      ====================================================================== */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-card border border-border rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono font-bold tracking-widest text-[#FF4D00] uppercase">
              {activeModalProject.badge} · {activeModalProject.category}
            </span>
            <h3 className="text-3xl font-black mt-2 mb-4">{activeModalProject.title}</h3>

            <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
              <p className="text-base text-foreground font-light">
                {activeModalProject.description}
              </p>

              <div className="p-4 rounded-2xl bg-muted/20 border border-border/40">
                <h4 className="text-xs font-mono uppercase text-foreground font-bold mb-1">Challenge</h4>
                <p>{activeModalProject.clientProblem}</p>
              </div>

              <div className="p-4 rounded-2xl bg-muted/20 border border-border/40">
                <h4 className="text-xs font-mono uppercase text-foreground font-bold mb-1">Architecture & Solution</h4>
                <p>{activeModalProject.solution}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-muted-foreground font-bold mb-2">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-foreground/5 border border-border text-xs font-mono text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-border flex items-center justify-between">
                <span className="text-xs font-mono text-[#FF4D00]">{activeModalProject.metrics}</span>
                <MagneticButton
                  onClick={() => {
                    const title = activeModalProject.title;
                    setActiveModalProject(null);
                    handleServiceSelect(`Project: ${title}`);
                  }}
                  className="magnetic-glass-pill px-6 py-2.5 rounded-full text-foreground text-xs font-bold inline-flex items-center gap-2 group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FF4D00] group-hover:rotate-12 transition-transform" />
                  <span>Start Similar Project</span>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
