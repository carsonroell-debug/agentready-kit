import { supabaseServer } from "@/lib/supabase/server";

export async function getSubscriptionStatus(): Promise<"active" | "trialing" | "inactive"> {
  try {
    const supabase = await supabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return "inactive";

    const { data } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!data) return "inactive";
    if (data.status === "active" || data.status === "trialing") return data.status;
    return "inactive";
  } catch {
    return "inactive";
  }
}

export async function isPro(): Promise<boolean> {
  const status = await getSubscriptionStatus();
  return status === "active" || status === "trialing";
}
