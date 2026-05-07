import Link from "next/link";

export function ScannerCTA() {
  return (
    <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-400 mb-2">
        Is your site AI-ready?
      </p>
      <p className="text-sm text-brand-text leading-snug">
        Run a free scan to see how AI agents score and read your website.
      </p>
      <Link
        href="https://agentready.tools?utm_source=mdpage&utm_medium=sidebar&utm_campaign=cross_product"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block text-center rounded-md bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
      >
        Scan my site →
      </Link>
    </div>
  );
}
