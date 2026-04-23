const LICENSE_ENDPOINT =
  process.env.AGENTREADY_LICENSE_URL || "https://agentready.tools/api/verify-license";

/**
 * Verify a Pro license key against the AgentReady server.
 *
 * The server lives inside the agentready.tools Next.js app and checks the key
 * against rows written by the Gumroad webhook. A failed call returns `false`
 * rather than throwing — the CLI presents the failure interactively.
 */
export async function verifyLicense(key: string, template: string): Promise<boolean> {
  if (!key.trim()) return false;
  try {
    const r = await fetch(LICENSE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: key.trim(), template }),
    });
    if (!r.ok) return false;
    const data = (await r.json()) as { valid?: boolean };
    return !!data.valid;
  } catch {
    return false;
  }
}
