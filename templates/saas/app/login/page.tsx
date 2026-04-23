"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setStatus("error");
      setErr(error.message);
      return;
    }
    setStatus("sent");
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="card">
        <h1 className="text-2xl font-semibold text-white">Sign in</h1>
        <p className="text-sm text-brand-text mt-2">
          We&apos;ll email you a magic link. No password.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input"
          />
          <button type="submit" className="btn-primary w-full">
            Send magic link
          </button>
        </form>
        {status === "sent" && (
          <div className="mt-4 p-3 rounded-md bg-brand-accent/10 border border-brand-accent/30 text-sm text-white">
            Check your inbox — click the link to finish signing in.
          </div>
        )}
        {status === "error" && (
          <div className="mt-4 p-3 rounded-md bg-red-950/40 border border-red-900/60 text-sm text-red-300">
            {err}
          </div>
        )}
      </div>
    </div>
  );
}
