import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

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

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-brand-muted mt-1">Signed in as {user.email}</p>
      </header>

      <section className="card">
        <h2 className="text-lg font-semibold text-white mb-2">Welcome</h2>
        <p className="text-sm text-brand-text">
          This is your authenticated app shell. Replace it with your product.
        </p>
        <p className="text-xs text-brand-muted mt-4">
          The marketing surface is all under <code className="text-brand-accent">app/page.tsx</code>,{" "}
          <code className="text-brand-accent">app/pricing/</code>, etc. Your authed product lives under{" "}
          <code className="text-brand-accent">app/dashboard/</code> and any other authed routes you add.
        </p>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold text-white mb-2">Account</h2>
        <form action="/api/auth/signout" method="post">
          <button className="btn-secondary" type="submit">Sign out</button>
        </form>
      </section>
    </div>
  );
}
