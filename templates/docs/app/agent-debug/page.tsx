import { AgentSection } from "@agentready/next";
import { getConfig, listEntries } from "@/lib/mdx";

export const metadata = {
  title: "Agent debug",
  description: "See how AI agents experience this docs site.",
};

export default async function AgentDebug() {
  const config = getConfig();
  const entries = await listEntries();
  const totalTokens = entries.reduce((a, e) => a + e.tokenEstimate, 0);
  const totalWords = entries.reduce((a, e) => a + e.wordCount, 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <AgentSection purpose="agent-debug-dashboard" className="space-y-8">
        <div>
          <h1 className="text-4xl font-semibold text-white">Agent debug</h1>
          <p className="text-brand-text mt-2">Docs site stats, as agents see them.</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Stat label="Pages" value={String(entries.length)} />
          <Stat label="Total words" value={totalWords.toLocaleString()} />
          <Stat label="Total tokens" value={`~${totalTokens.toLocaleString()}`} />
        </div>

        <div className="rounded-lg border border-brand-border bg-brand-surface p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Content</h2>
          <table className="w-full text-sm">
            <thead className="text-brand-muted text-xs uppercase tracking-wider border-b border-brand-border">
              <tr>
                <th className="text-left py-2">Path</th>
                <th className="text-left py-2">Title</th>
                <th className="text-right py-2">Words</th>
                <th className="text-right py-2">Tokens</th>
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
    </div>
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
