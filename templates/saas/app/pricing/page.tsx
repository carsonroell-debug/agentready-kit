import { AgentMetadata, AgentSection } from "@agentready/next";
import { PricingTable, type PricingTier } from "@/components/PricingTable";

const tiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "month",
    features: [
      "Core features",
      "5 projects",
      "Community support",
      "Agent-native from day one",
    ],
    cta: "Sign up",
    priceId: undefined,
  },
  {
    name: "Pro",
    price: "$19",
    cadence: "month",
    features: [
      "Everything in Free",
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "Cancel anytime",
    ],
    cta: "Start Pro",
    highlight: true,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
  },
];

export const metadata = {
  title: "Pricing",
  description: "Simple, predictable pricing. Free tier + $19/mo Pro.",
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
