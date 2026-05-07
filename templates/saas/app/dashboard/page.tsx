import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { isPro } from "@/lib/subscription";
import { MdThisPageCTA } from "@/components/MdThisPageCTA";
import { ManageSubscriptionButton } from "@/components/ManageSubscriptionButton";

export const metadata = {
  title: "Dashboard",
  description: "Your account.",
};

export default async function Dashboard() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const pro = await isPro();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-brand-muted mt-1">Signed in as {user.email}</p>
      </header>

      <section className="card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Plan</h2>
            <p className="text-sm text-brand-text">
              {pro ? (
                <span className="text-brand-accent font-medium">AgentReady Pro</span>
              ) : (
                "Free"
              )}
            </p>
          </div>
          {pro ? (
            <ManageSubscriptionButton />
          ) : (
            <Link href="/pricing" className="btn-primary text-sm">
              Upgrade to Pro →
            </Link>
          )}
        </div>
      </section>

      {!pro && <MdThisPageCTA />}

      <section className="card">
        <h2 className="text-lg font-semibold text-white mb-2">Account</h2>
        <form action="/api/auth/signout" method="post">
          <button className="btn-secondary" type="submit">
            Sign out
          </button>
        </form>
      </section>
    </div>
  );
}

