import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Page Not Found | BRAVIX Digital Agency",
  description: "The requested page could not be located on BRAVIX Digital Agency.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#FF4D00] uppercase">
          Error 404
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
          Page Not Found
        </h1>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          The page or digital resource you were looking for doesn&apos;t exist or has been relocated.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-foreground text-background font-bold text-sm hover:opacity-90 transition-opacity shadow-lg group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
