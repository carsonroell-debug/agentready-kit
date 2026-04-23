import Link from "next/link";
import { AgentMetadata, AgentSection } from "@agentready/next";
import { getConfig, listDocs } from "@/lib/mdx";
import { ArrowRight, BookOpen } from "lucide-react";

export default async function Home() {
  const config = getConfig();
  const docs = await listDocs();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <AgentMetadata
        title={config.name}
        description={config.description}
        url="/"
        type="documentation"
      />

      <AgentSection purpose="documentation-index" summary={config.description}>
        <h1 className="text-5xl font-semibold text-white tracking-tight">{config.name}</h1>
        <p className="mt-4 text-lg text-brand-text max-w-2xl">{config.description}</p>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <Link
            href="/docs/getting-started"
            className="rounded-lg border border-brand-border bg-brand-surface p-6 hover:border-brand-accent transition-colors group"
          >
            <BookOpen className="h-5 w-5 text-brand-accent mb-3" />
            <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-1">
              Get started <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h2>
            <p className="text-sm text-brand-text">
              Install, configure, and ship your first agent-native docs page.
            </p>
          </Link>
          <Link
            href="/llms.txt"
            className="rounded-lg border border-brand-border bg-brand-surface p-6 hover:border-brand-accent transition-colors"
          >
            <BookOpen className="h-5 w-5 text-brand-accent mb-3" />
            <h2 className="text-lg font-semibold text-white mb-1">
              For AI agents: <code className="text-brand-accent">/llms.txt</code>
            </h2>
            <p className="text-sm text-brand-text">
              Indexed page list with word + token counts. Agents fetch the Markdown alternates via
              <code className="text-brand-accent"> .md</code> URLs.
            </p>
          </Link>
        </div>

        <h2 className="mt-12 text-sm font-semibold uppercase tracking-wider text-brand-muted">
          All pages
        </h2>
        <ul className="mt-4 space-y-2">
          {docs.map((d) => (
            <li key={d.path}>
              <Link
                href={d.path}
                className="flex items-baseline justify-between text-sm group"
              >
                <span className="text-white group-hover:text-brand-accent">{d.title}</span>
                <span className="text-xs text-brand-muted">~{d.tokenEstimate} tokens</span>
              </Link>
              {d.description && (
                <p className="text-xs text-brand-muted mt-0.5">{d.description}</p>
              )}
            </li>
          ))}
        </ul>
      </AgentSection>
    </div>
  );
}
