import Link from "next/link";
import { Check } from "lucide-react";

const features = [
  "Unlimited Scanner scans",
  "Full MD This Page history & export",
  "Batch page export (up to 50 pages)",
  "Priority support",
  "Access to AgentReady Kit",
  "Early access to new tools",
];

export function PricingSection() {
  return (
    <section className="py-16 border-t border-brand-border">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-white">One plan. Everything included.</h2>
        <p className="mt-3 text-brand-text max-w-lg mx-auto">
          No separate subscriptions. One $9/month plan unlocks Pro access across Scanner, MD This
          Page, and the Kit.
        </p>

        <div className="mt-10 max-w-sm mx-auto card ring-1 ring-brand-accent/30 border-brand-accent/40">
          <h3 className="text-lg font-semibold text-white">AgentReady Pro</h3>
          <div className="mt-2 flex items-baseline justify-center gap-1">
            <span className="text-5xl font-semibold text-white">$9</span>
            <span className="text-brand-muted">/ month</span>
          </div>
          <ul className="mt-6 space-y-3 text-left">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-brand-text">
                <Check className="h-4 w-4 text-brand-accent mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Link href="/pricing" className="btn-primary mt-6 w-full text-center block">
            Get started
          </Link>
          <p className="mt-3 text-xs text-brand-muted">
            Cancel anytime. No contracts. Works across all AgentReady products.
          </p>
        </div>
      </div>
    </section>
  );
}
