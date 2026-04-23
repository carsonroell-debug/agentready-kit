import Link from "next/link";
import { supabaseServerOrNull } from "@/lib/supabase/server";
import config from "@/agentready.config";

export async function Nav() {
  const supabase = await supabaseServerOrNull();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;

  return (
    <nav className="border-b border-brand-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
        <Link href="/" className="font-semibold text-white">
          {config.name}
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/features" className="hover:text-white text-brand-text">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-white text-brand-text">
            Pricing
          </Link>
          {user ? (
            <Link href="/dashboard" className="btn-primary">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="btn-primary">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
