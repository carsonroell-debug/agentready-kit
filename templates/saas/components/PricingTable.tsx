"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export interface PricingTier {
  name: string;
  price: string;
  cadence: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  priceId?: string;
}

export function PricingTable({ tiers }: { tiers: PricingTier[] }) {
  const [busy, setBusy] = useState<string | null>(null);

  async function subscribe(tier: PricingTier) {
    if (!tier.priceId) return;
    setBusy(tier.name);
    try {
      const r = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: tier.priceId }),
      });
      const { url, error } = await r.json();
      if (url) window.location.href = url;
      else alert(error ?? "Checkout unavailable");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`card ${tier.highlight ? "border-brand-accent/60 ring-1 ring-brand-accent/30" : ""}`}
        >
          <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-white">{tier.price}</span>
            <span className="text-sm text-brand-muted">/{tier.cadence}</span>
          </div>
          <button
            className={`mt-6 w-full ${tier.highlight ? "btn-primary" : "btn-secondary"}`}
            onClick={() => subscribe(tier)}
            disabled={busy === tier.name || !tier.priceId}
          >
            {busy === tier.name ? "…" : tier.cta}
          </button>
          <ul className="mt-6 space-y-2">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-brand-text">
                <Check className="h-4 w-4 text-brand-accent mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
