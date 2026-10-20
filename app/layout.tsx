import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bravix.agency";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BRAVIX — Digital Creative Agency",
    template: "%s | BRAVIX Digital Agency",
  },
  description:
    "We turn bold ideas into digital experiences. BRAVIX is a digital creative agency designing premium websites, custom software, and intelligent AI solutions for ambitious brands.",
  keywords: [
    "BRAVIX digital agency",
    "digital creative agency",
    "web design agency",
    "Next.js web development",
    "UI UX design",
    "AI solutions agency",
    "e-commerce development",
  ],
  authors: [{ name: "BRAVIX Digital Agency" }],
  creator: "BRAVIX",
  publisher: "BRAVIX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "BRAVIX — Digital Creative Agency",
    description:
      "We turn bold ideas into digital experiences. High-performance websites, creative engineering, and custom digital systems.",
    url: siteUrl,
    siteName: "BRAVIX Digital Agency",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BRAVIX — Digital Creative Agency",
    description:
      "We turn bold ideas into digital experiences. High-performance websites, creative engineering, and custom digital systems.",
    creator: "@bravixagency",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "BRAVIX Digital Agency",
    url: siteUrl,
    description:
      "Digital creative agency engineering high-performance websites, web applications, and intelligent digital experiences.",
    email: "ssakkssham@gmail.com",
    areaServed: "Worldwide",
    sameAs: [],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
        plusJakarta.variable
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
