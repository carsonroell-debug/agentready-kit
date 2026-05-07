import { AgentMetadata, AgentSection } from "@agentready/next";
import { PricingTable, type PricingTier } from "@/components/PricingTable";

const tiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "month",
    features: [
      "AgentReady Scanner (free scans)",
      "MD This Page basic conversions",
      "Community support",
    ],
    cta: "Start free",
    priceId: undefined,
  },
  {
    name: "Pro",
    price: "$9",
    cadence: "month",
    features: [
      "Unlimited Scanner scans",
      "Full MD This Page history & export",
      "Batch page export (up to 50 pages)",
      "Access to AgentReady Kit",
      "Priority support",
      "Early access to new tools",
      "Cancel anytime",
    ],
    cta: "Get started",
    highlight: true,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
  },
];

export const metadata = {
  title: "Pricing — AgentReady",
  description: "One plan. Everything included. $9/month for full access to Scanner, MD This Page, and the Kit.",
};

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <AgentMetadata
        title="Pricing"
        description="Simple, predictable pricing."
        url="/pricing"
        type="website"
      />
      <AgentSection purpose="pricing" summary="Free tier + $19/mo Pro.">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-white">Simple pricing</h1>
          <p className="mt-2 text-brand-text">Free forever, paid when you scale.</p>
        </header>
        <PricingTable tiers={tiers} />
      </AgentSection>
    </div>
  );
}
