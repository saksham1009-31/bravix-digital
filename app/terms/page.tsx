import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | BRAVIX Digital Agency",
  description: "Terms of service governing engagements and use of BRAVIX Digital Agency services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to BRAVIX Home
        </Link>

        <span className="text-xs font-mono tracking-widest text-[#FF4D00] uppercase font-bold">
          Terms & Agreements
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-2 mb-6">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          Effective Date: January 1, 2026 · Last Updated: October 2026
        </p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. Engagement Scope</h2>
            <p>
              These Terms of Service govern digital agency services provided by BRAVIX Digital Agency (&quot;Agency&quot;), including website design, software engineering, AI integrations, and brand consultancy. Individual project scopes, milestones, and deliverables are specified in project-specific Statements of Work (SOW).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. Intellectual Property Rights</h2>
            <p>
              Upon receipt of final payment, full intellectual property rights to custom deliverables created specifically for the client are assigned to the client. The Agency retains rights to proprietary tools, reusable component libraries, and general methodologies developed independently of the engagement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. Payment & Milestones</h2>
            <p>
              Projects typically proceed under milestone-based billing agreed upon prior to project kickoff. Standard terms require an initial deposit prior to work commencement, with subsequent milestones tied to prototype delivery, development signoff, and production launch.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">4. Confidentiality</h2>
            <p>
              Both parties agree to protect and treat as confidential all proprietary business, technical, and commercial information shared during the course of the project relationship.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">5. Inquiries & Support</h2>
            <p>
              For legal questions regarding client agreements, contact our advisory team at{" "}
              <a href="mailto:ssakkssham@gmail.com" className="text-foreground underline hover:text-[#FF4D00]">
                ssakkssham@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
