import type { HTMLAttributes, ReactNode } from "react";

export interface AgentSectionProps extends HTMLAttributes<HTMLElement> {
  /** Semantic label for what this block is about — agents surface this as a hint. */
  purpose:
    | "main-content"
    | "product-description"
    | "pricing"
    | "faq"
    | "documentation"
    | "api-reference"
    | "company-description"
    | "testimonial"
    | "contact"
    | (string & {});
  /** Optional short summary (1 sentence) surfaced as `data-agent-summary`. */
  summary?: string;
  children: ReactNode;
}

/**
 * Thin semantic wrapper. Adds `data-agent-purpose` and (optionally)
 * `data-agent-summary` so agent crawlers can quickly locate key sections
 * without rendering CSS or JS.
 *
 * ```tsx
 * <AgentSection purpose="pricing" summary="Three tiers, starts at $9/mo.">
 *   <h2>Pricing</h2>
 *   ...
 * </AgentSection>
 * ```
 */
export function AgentSection({ purpose, summary, children, ...rest }: AgentSectionProps) {
  return (
    <section data-agent-purpose={purpose} data-agent-summary={summary} {...rest}>
      {children}
    </section>
  );
}
