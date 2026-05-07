import Link from "next/link";

export function HeroSection() {
  return (
    <section className="py-24 text-center max-w-6xl mx-auto px-6">
      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
        The complete toolkit for<br className="hidden md:block" /> the AI-ready web.
      </h1>
      <p className="mt-6 text-lg text-brand-text max-w-2xl mx-auto">
        AI agents are reading the web right now. AgentReady helps you diagnose what they see,
        optimize how they read it, and serve content they can actually use.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Link href="/api/stripe/checkout" className="btn-primary">
          Get started — $9/month
        </Link>
        <a href="#products" className="btn-secondary">
          See how it works ↓
        </a>
      </div>
    </section>
  );
}
