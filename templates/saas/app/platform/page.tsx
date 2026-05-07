import type { Metadata } from "next";
import { HeroSection } from "./components/HeroSection";
import { ProductCardsSection } from "./components/ProductCardsSection";
import { PricingSection } from "./components/PricingSection";
import { FaqSection } from "./components/FaqSection";
import { CtaFooterSection } from "./components/CtaFooterSection";

export const metadata: Metadata = {
  title: "AgentReady Platform — The Complete Toolkit for the AI-Ready Web",
  description:
    "Diagnose, optimize, and serve your content to AI agents. AgentReady combines the Scanner, MD This Page, and Kit into one platform for $9/month.",
  openGraph: {
    title: "AgentReady Platform — The Complete Toolkit for the AI-Ready Web",
    description:
      "Diagnose, optimize, and serve your content to AI agents. One plan, three tools, $9/month.",
    url: "https://agentready.tools/platform",
    siteName: "AgentReady",
    images: [
      {
        url: "https://agentready.tools/og/platform.png",
        width: 1200,
        height: 630,
        alt: "AgentReady Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentReady Platform — The Complete Toolkit for the AI-Ready Web",
    description: "Diagnose, optimize, and serve your content to AI agents. $9/month.",
    images: ["https://agentready.tools/og/platform.png"],
  },
  alternates: {
    canonical: "https://agentready.tools/platform",
  },
};

export default function PlatformPage() {
  return (
    <main>
      <HeroSection />
      <ProductCardsSection />
      <PricingSection />
      <FaqSection />
      <CtaFooterSection />
    </main>
  );
}
