import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mushfiq.dev";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mushfiq — Full-stack engineer",
    template: "%s — Mushfiq",
  },
  description:
    "Full-stack engineer building CMS-driven platforms, scraping pipelines, and AI-integrated tooling.",
  keywords: [
    "Mushfiq",
    "full-stack engineer",
    "Next.js",
    "React",
    "Node.js",
    "CMS",
    "scraping",
    "AI integration",
    "portfolio",
  ],
  authors: [{ name: "Mushfiq" }],
  creator: "Mushfiq",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Mushfiq",
    title: "Mushfiq — Full-stack engineer",
    description:
      "Full-stack engineer building CMS-driven platforms, scraping pipelines, and AI-integrated tooling.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mushfiq — Full-stack engineer",
    description:
      "Full-stack engineer building CMS-driven platforms, scraping pipelines, and AI-integrated tooling.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
