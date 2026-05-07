import { ProductCard } from "./ProductCard";

export function ProductCardsSection() {
  return (
    <section id="products" className="py-16 border-t border-brand-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          <ProductCard
            label="Diagnose"
            title="AgentReady Scanner"
            body="Paste your URL and get an instant AI-readiness score. See exactly how AI agents interpret your site — from structured data and semantic clarity to crawlability and content density."
            features={[
              "AI readiness score (0–100)",
              "Page-by-page content analysis",
              "Structured data detection",
              "Actionable fix recommendations",
            ]}
            ctaText="Run a free scan →"
            ctaHref="https://agentready.tools"
            accent="blue"
          />
          <ProductCard
            label="Consume"
            title="MD This Page"
            body="A browser extension that converts any webpage to clean Markdown in one keystroke (Alt+M). See what AI agents actually extract from a page — and send it directly to Claude, ChatGPT, or any LLM."
            features={[
              "One-keystroke conversion (Alt+M)",
              "Clean Markdown output, no noise",
              "Send-to-Claude integration",
              "Batch export for multiple pages",
            ]}
            ctaText="Install the extension →"
            ctaHref="https://mdpage.agentready.tools"
            accent="purple"
          />
          <ProductCard
            label="Build"
            title="AgentReady Kit"
            body="A growing library of tools, templates, and specs for developers building AI-ready websites. Includes llms.txt generators, structured data templates, and AI sitemap configurations."
            features={[
              "llms.txt generator",
              "Structured data templates",
              "AI sitemap configuration",
              "Developer documentation",
            ]}
            ctaText="Explore the Kit →"
            ctaHref="https://agentready.tools/kit"
            accent="green"
          />
        </div>
      </div>
    </section>
  );
}
