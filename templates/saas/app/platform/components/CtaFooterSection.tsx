import Link from "next/link";

export function CtaFooterSection() {
  return (
    <section className="py-20 border-t border-brand-border text-center">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-white">Ready to make your site AI-ready?</h2>
        <p className="mt-3 text-brand-text">
          Join the developers and marketers who are already ahead of the AI-readiness curve.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Link href="/pricing" className="btn-primary">
            Get started — $9/month
          </Link>
          <Link
            href="https://agentready.tools"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Run a free scan first →
          </Link>
        </div>
      </div>
    </section>
  );
}
