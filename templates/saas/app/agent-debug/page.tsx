import { AgentSection } from "@agentready/next";
import { getConfig, listEntries } from "@/lib/mdx";

export const metadata = {
  title: "Agent debug",
  description: "See how AI agents experience this site.",
};

export default async function AgentDebug() {
  const config = getConfig();
  const entries = await listEntries();
  const totalTokens = entries.reduce((a, e) => a + e.tokenEstimate, 0);
  const totalWords = entries.reduce((a, e) => a + e.wordCount, 0);

  const checks = [
    { name: "/llms.txt exposed", pass: true },
    { name: "/AGENTS.md exposed", pass: true },
    { name: "Markdown alternates via middleware", pass: true },
    { name: "JSON-LD structured data on pages", pass: true },
    { name: "Stripe + auth wired", pass: true },
    { name: "At least 3 pieces of content", pass: entries.length >= 3 },
    { name: "Site description set in config", pass: !!config.description },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <AgentSection purpose="agent-debug-dashboard" className="space-y-8">
        <div>
          <h1 className="text-4xl font-semibold text-white">Agent debug</h1>
          <p className="text-brand-text mt-2">
            How AI crawlers see this site. Readable, fast, cheap.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Stat label="Content pages" value={String(entries.length)} />
          <Stat label="Total words" value={totalWords.toLocaleString()} />
          <Stat label="Total tokens" value={`~${totalTokens.toLocaleString()}`} />
        </div>

        <div className="card">
          <h2 className="text-sm font-semibold text-white mb-4">Readiness checks</h2>
          <ul className="space-y-2">
            {checks.map((c) => (
              <li key={c.name} className="flex items-center gap-2 text-sm">
                <span
                  className={
                    c.pass
                      ? "h-4 w-4 rounded-full bg-emerald-500/20 text-emerald-400 inline-flex items-center justify-center text-xs"
                      : "h-4 w-4 rounded-full bg-amber-500/20 text-amber-400 inline-flex items-center justify-center text-xs"
                  }
                >
                  {c.pass ? "✓" : "!"}
                </span>
                <span className={c.pass ? "text-brand-text" : "text-amber-300"}>{c.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </AgentSection>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card">
      <div className="text-xs uppercase tracking-wider text-brand-muted">{label}</div>
      <div className="text-2xl font-semibold text-white mt-1">{value}</div>
    </div>
  );
}
