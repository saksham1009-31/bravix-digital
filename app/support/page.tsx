import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Clock, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Support & Client Inquiries | BRAVIX Digital Agency",
  description: "Get in touch with the BRAVIX team for client support, technical inquiries, and project maintenance.",
};

export default function SupportPage() {
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
          Client Care & Assistance
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-2 mb-6">
          Support & Inquiries
        </h1>
        <p className="text-base text-muted-foreground mb-12">
          We provide dedicated post-launch support, ongoing maintenance, and technical assistance for all our client partners.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 rounded-2xl border border-border/50 bg-card/50">
            <Mail className="w-6 h-6 text-[#FF4D00] mb-4" />
            <h2 className="text-lg font-bold mb-2">Direct Email Support</h2>
            <p className="text-sm text-muted-foreground mb-4">
              For urgent technical tickets, bug reports, and maintenance requests.
            </p>
            <a
              href="mailto:ssakkssham@gmail.com"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-[#FF4D00] transition-colors"
            >
              ssakkssham@gmail.com <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="p-6 rounded-2xl border border-border/50 bg-card/50">
            <Clock className="w-6 h-6 text-[#FF4D00] mb-4" />
            <h2 className="text-lg font-bold mb-2">Response Times</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Standard client inquiries are acknowledged and addressed within 24 hours Monday to Friday.
            </p>
            <span className="text-xs font-mono text-[#FF4D00] uppercase">
              Mon–Fri // 9:00 AM – 6:00 PM EST
            </span>
          </div>
        </div>

        <div className="p-8 rounded-3xl border border-border/60 bg-muted/20 text-center">
          <MessageSquare className="w-8 h-8 text-[#FF4D00] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Planning a New Project?</h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
            If you are exploring a new digital product, website redesign, or AI solution, use our project enquiry form.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-foreground text-background font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Start a Project Enquiry
          </Link>
        </div>
      </div>
    </div>
  );
}
