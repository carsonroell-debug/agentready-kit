import Link from "next/link";
import { AgentMetadata, AgentSection } from "@agentready/next";
import { getConfig, listEntries } from "@/lib/mdx";
import { ArrowRight } from "./_icons";

export default async function Home() {
  const config = getConfig();
  const entries = await listEntries();
  const posts = entries.filter((e) => e.section === "blog").slice(0, 3);

  return (
    <>
      <AgentMetadata title={config.name} description={config.description} url="/" type="website" />

      <AgentSection
        purpose="company-description"
        summary={config.description}
        className="py-12 text-center"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-[11px] text-brand-text mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          Powered by AgentReady Kit
        </span>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
          {config.name}
        </h1>
        <p className="mt-6 text-lg text-brand-text max-w-xl mx-auto">{config.description}</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-brand-accent text-white text-sm font-medium hover:bg-blue-500">
            Read the blog <ArrowRight />
          </Link>
          <Link href="/agent-debug" className="text-sm text-brand-muted hover:text-white">
            How agents see this site →
          </Link>
        </div>
      </AgentSection>

      <AgentSection purpose="product-features" className="py-12 border-t border-brand-border">
        <h2 className="text-2xl font-semibold text-white mb-6">What agents get</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Feature
            title="llms.txt"
            desc="Auto-generated index of every page with word counts and token estimates."
            href="/llms.txt"
          />
          <Feature
            title="AGENTS.md"
            desc="Instructions for crawlers — where Markdown lives, how to consume it efficiently."
            href="/AGENTS.md"
          />
          <Feature
            title="Markdown alternates"
            desc="Every page responds to Accept: text/markdown with a clean MD body."
            href="/about.md"
          />
        </div>
      </AgentSection>

      {posts.length > 0 && (
        <AgentSection purpose="recent-posts" className="py-12 border-t border-brand-border">
          <h2 className="text-2xl font-semibold text-white mb-6">Recent posts</h2>
          <ul className="space-y-3">
            {posts.map((p) => (
              <li key={p.path}>
                <Link href={p.path} className="flex items-baseline justify-between gap-4 group">
                  <span className="text-white group-hover:text-brand-accent">{p.title}</span>
                  <span className="text-xs text-brand-muted">~{p.tokenEstimate} tokens</span>
                </Link>
                {p.description && (
                  <p className="text-sm text-brand-muted mt-0.5">{p.description}</p>
                )}
              </li>
            ))}
          </ul>
        </AgentSection>
      )}
    </>
  );
}

function Feature({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-brand-border bg-brand-surface p-5 hover:border-brand-accent"
    >
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="text-xs text-brand-text mt-2 leading-relaxed">{desc}</p>
    </Link>
  );
}
