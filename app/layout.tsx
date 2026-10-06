import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BasketProvider } from "@/context/BasketContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnalyticsScripts } from "@/components/analytics/Analytics";
import "./globals.css";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Gaucho",
    template: "%s | Gaucho",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gaucho | Fresh. Juicy. Local.",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "/images/branding/og-placeholder.svg",
        width: 1200,
        height: 630,
        alt: "Gaucho",
      },
    ],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/images/branding/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <BasketProvider>
          <Navbar />
          {children}
          <Footer />
        </BasketProvider>
        <Analytics />
        <SpeedInsights />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
