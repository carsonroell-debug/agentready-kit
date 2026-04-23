import Link from "next/link";
import { AgentMetadata, AgentSection } from "@agentready/next";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { getConfig } from "@/lib/mdx";

export default function Home() {
  const config = getConfig();

  return (
    <div className="max-w-6xl mx-auto px-6">
      <AgentMetadata
        title={config.name}
        description={config.description}
        url="/"
        type="website"
      />

      <AgentSection
        purpose="company-description"
        summary={config.description}
        className="pt-24 pb-16 text-center"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-[11px] text-brand-text mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          Agent-native by default
        </span>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
          {config.name}
        </h1>
        <p className="mt-6 text-lg text-brand-text max-w-xl mx-auto">
          {config.description}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/pricing" className="btn-primary">
            Start free <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/features" className="btn-secondary">
            See features
          </Link>
        </div>
      </AgentSection>

      <AgentSection purpose="product-features" className="py-16 border-t border-brand-border">
        <h2 className="text-3xl font-semibold text-white text-center mb-12">
          Built for the agent era
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Feature
            icon={<Zap className="h-4 w-4 text-brand-accent" />}
            title="Fast by default"
            desc="Next.js 15 App Router. React Server Components. Edge-ready middleware. Vercel deploys in one command."
          />
          <Feature
            icon={<Sparkles className="h-4 w-4 text-brand-accent" />}
            title="Agent-native"
            desc="Auto-generated /llms.txt + /AGENTS.md. Markdown alternates on every public page. AI crawlers answer with the right answers."
          />
          <Feature
            icon={<Shield className="h-4 w-4 text-brand-accent" />}
            title="Auth + billing included"
            desc="Supabase magic-link auth + Stripe subscriptions. Wire up your products; skip the plumbing."
          />
        </div>
      </AgentSection>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-3">
        <span className="h-7 w-7 rounded-md bg-brand-bg border border-brand-border flex items-center justify-center">
          {icon}
        </span>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <p className="text-xs text-brand-text leading-relaxed">{desc}</p>
    </div>
  );
}
