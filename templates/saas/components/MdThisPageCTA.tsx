import Link from "next/link";

export function MdThisPageCTA() {
  return (
    <div className="mt-8 rounded-xl border border-blue-500/20 bg-blue-500/10 p-6 flex items-start gap-4">
      <div className="text-3xl select-none">🔍</div>
      <div className="flex-1">
        <h3 className="font-semibold text-white text-base leading-snug">
          See exactly what AI reads on this page
        </h3>
        <p className="mt-1 text-sm text-brand-text">
          MD This Page converts any webpage to clean Markdown — so you can see the
          actual content AI agents extract from your site.
        </p>
        <Link
          href="https://mdpage.agentready.tools?utm_source=scanner&utm_medium=cta&utm_campaign=cross_product"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Install MD This Page
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
