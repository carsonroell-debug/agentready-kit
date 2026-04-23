/**
 * Stripe webhook. Point your Stripe dashboard at /api/stripe/webhook and listen
 * for `customer.subscription.*` + `checkout.session.completed`. Update your
 * `profiles` table (or equivalent) based on the events.
 */
import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(body, sig, secret);
  } catch (e) {
    return NextResponse.json({ error: `Bad signature: ${(e as Error).message}` }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      // TODO: update your DB (user tier, pro_until, stripe_customer_id, stripe_subscription_id).
      // See the AgentReady Kit docs or the mdpage-pro dashboard for a full reference implementation.
      console.log(`[stripe webhook] ${event.type}`);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
