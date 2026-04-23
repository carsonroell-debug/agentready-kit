import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function stripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set");
  _stripe = new Stripe(key, { apiVersion: "2025-02-24.acacia" });
  return _stripe;
}

export const PRO_PRICE_ID = () => {
  const id = process.env.STRIPE_PRO_PRICE_ID;
  if (!id) throw new Error("STRIPE_PRO_PRICE_ID not set");
  return id;
};
