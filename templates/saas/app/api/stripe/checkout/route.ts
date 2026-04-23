import { NextResponse, type NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { priceId } = (await req.json()) as { priceId?: string };
  if (!priceId) return NextResponse.json({ error: "Missing priceId" }, { status: 400 });

  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return NextResponse.json({ error: "Sign in first" }, { status: 401 });

  const { origin } = new URL(req.url);
  const session = await stripe().checkout.sessions.create({
    mode: "subscription",
    customer_email: user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/dashboard?upgraded=1`,
    cancel_url: `${origin}/pricing`,
    allow_promotion_codes: true,
    subscription_data: { metadata: { supabase_user_id: user.id } },
  });

  return NextResponse.json({ url: session.url });
}
