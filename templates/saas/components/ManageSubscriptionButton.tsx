"use client";

import { useState } from "react";

export function ManageSubscriptionButton() {
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    setBusy(true);
    try {
      const r = await fetch("/api/stripe/portal", { method: "POST" });
      const { url, error } = await r.json();
      if (url) window.location.href = url;
      else console.error("Portal error:", error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button className="btn-secondary text-sm" onClick={handleClick} disabled={busy}>
      {busy ? "…" : "Manage subscription"}
    </button>
  );
}
