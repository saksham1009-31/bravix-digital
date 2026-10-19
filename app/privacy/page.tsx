import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | BRAVIX Digital Agency",
  description: "Privacy policy and data handling standards of BRAVIX Digital Agency.",
};

export default function PrivacyPage() {
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
          Legal & Compliance
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-2 mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          Effective Date: January 1, 2026 · Last Updated: October 2026
        </p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. Introduction</h2>
            <p>
              BRAVIX Digital Agency (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard personal information submitted through our website and enquiry channels.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. Information We Collect</h2>
            <p>
              When you submit a project enquiry or get in touch with us, we collect information you voluntarily provide, including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full name and professional contact details</li>
              <li>Work email address and telephone number</li>
              <li>Company name and project specifications</li>
              <li>Estimated budget parameters and project timeline requirements</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. How We Use Your Information</h2>
            <p>
              We process your information exclusively to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Evaluate project requirements and prepare agency proposals</li>
              <li>Communicate regarding ongoing consultations and project deliverables</li>
              <li>Maintain client records and billing workflows</li>
              <li>Comply with applicable legal obligations</li>
            </ul>
            <p>
              We do not sell, rent, or trade your personal data to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">4. Data Security</h2>
            <p>
              We implement industry-standard administrative, technical, and physical safeguards to protect information against unauthorized access, destruction, or disclosure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">5. Contact Us</h2>
            <p>
              If you have any questions or requests regarding your personal information, please contact our data team at{" "}
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
