import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { personalInfo, skillCategories } from "@/data/resume-data";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const title = `${personalInfo.name} | ${personalInfo.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(personalInfo.siteUrl),
  title,
  description: personalInfo.summary,
  keywords: ["Java", "Spring Boot", "Microservices", "Kafka", "Angular", "React", "Full Stack Developer", "Portfolio"],
  authors: [{ name: personalInfo.name, url: personalInfo.linkedin }],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: personalInfo.headline,
    url: "/",
    siteName: `${personalInfo.name} | Portfolio`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: personalInfo.headline,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#07090e",
};

// Structured data so search engines understand who this page is about
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  jobTitle: personalInfo.title,
  url: personalInfo.siteUrl,
  email: `mailto:${personalInfo.email}`,
  sameAs: [personalInfo.linkedin, personalInfo.github],
  knowsAbout: skillCategories.flatMap((c) => c.skills).slice(0, 20),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-ink-950"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
