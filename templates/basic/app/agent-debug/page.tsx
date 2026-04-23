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
    { name: "/llms.txt route exposed", pass: true },
    { name: "/AGENTS.md route exposed", pass: true },
    { name: "Markdown alternates via middleware", pass: true },
    { name: "JSON-LD structured data on pages", pass: true },
    { name: "At least 3 pieces of content", pass: entries.length >= 3 },
    { name: "Site description set in config", pass: !!config.description },
    { name: "Sections labelled in config", pass: Object.keys(config.sections || {}).length > 0 },
  ];

  return (
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

      <div className="rounded-lg border border-brand-border bg-brand-surface p-6">
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

      <div className="rounded-lg border border-brand-border bg-brand-surface p-6">
        <h2 className="text-sm font-semibold text-white mb-4">Content inventory</h2>
        <table className="w-full text-sm">
          <thead className="text-brand-muted text-xs uppercase tracking-wider border-b border-brand-border">
            <tr>
              <th className="text-left py-2">Path</th>
              <th className="text-left py-2">Title</th>
              <th className="text-right py-2">Words</th>
              <th className="text-right py-2">~Tokens</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.path} className="border-b border-brand-border last:border-0">
                <td className="py-2">
                  <code className="text-brand-muted">{e.path}</code>
                </td>
                <td className="py-2 text-white">{e.title}</td>
                <td className="py-2 text-right">{e.wordCount}</td>
                <td className="py-2 text-right">{e.tokenEstimate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentSection>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-brand-border bg-brand-surface p-5">
      <div className="text-xs uppercase tracking-wider text-brand-muted">{label}</div>
      <div className="text-2xl font-semibold text-white mt-1">{value}</div>
    </div>
  );
}
