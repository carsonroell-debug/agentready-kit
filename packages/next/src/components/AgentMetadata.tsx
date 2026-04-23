import { estimateTokens } from "../token-estimator";

export interface AgentMetadataProps {
  title: string;
  description?: string;
  url: string;
  type?: "article" | "website" | "product" | "documentation";
  author?: string;
  datePublished?: string;
  dateModified?: string;
  /**
   * Show a small dev-only badge with the token estimate for this page.
   * @default false (set to true in dev templates)
   */
  debug?: boolean;
  /**
   * If provided, the markdown body — used only for token estimate display.
   */
  body?: string;
}

/**
 * Emits JSON-LD structured data that agents pick up for better grounding.
 * Pair with `<AgentSection>` inside the page for semantic hints.
 *
 * Place at the top of any page component:
 *
 * ```tsx
 * <AgentMetadata title="About Acme" description="..." url="/about" />
 * ```
 */
export function AgentMetadata(props: AgentMetadataProps) {
  const {
    title,
    description,
    url,
    type = "article",
    author,
    datePublished,
    dateModified,
    debug,
    body,
  } = props;

  const ldType =
    type === "article"
      ? "Article"
      : type === "product"
        ? "Product"
        : type === "documentation"
          ? "TechArticle"
          : "WebPage";

  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ldType,
    headline: title,
    url,
  };
  if (description) ld.description = description;
  if (author) ld.author = { "@type": "Person", name: author };
  if (datePublished) ld.datePublished = datePublished;
  if (dateModified) ld.dateModified = dateModified;

  return (
    <>
      <script
        type="application/ld+json"
        // Safe: JSON.stringify on server-derived metadata; no user input passed through.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <meta name="agentready:version" content="0.1" />
      <meta name="agentready:url" content={url} />
      {debug && body && (
        <div
          data-agentready-debug
          style={{
            position: "fixed",
            bottom: 8,
            right: 8,
            padding: "4px 8px",
            background: "rgba(0,0,0,0.75)",
            color: "#a1a1aa",
            fontFamily: "ui-monospace, Menlo, monospace",
            fontSize: 10,
            borderRadius: 4,
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          ~{estimateTokens(body)} tokens
        </div>
      )}
    </>
  );
}
