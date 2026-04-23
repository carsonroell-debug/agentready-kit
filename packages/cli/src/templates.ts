export interface TemplateDef {
  /** Internal id / CLI value. */
  id: string;
  /** Shown in the picker. */
  label: string;
  /** One-line description in the picker. */
  hint: string;
  /** giget source — e.g. `gh:freedomengineers/agentready-kit/templates/basic`. */
  source: string;
  /** Free or requires a Pro license key. */
  tier: "free" | "pro";
}

// Override via env var if you fork: `AGENTREADY_REPO=my-org/my-fork npx create-agentready-app`
const REPO = process.env.AGENTREADY_REPO || "carsonroell-debug/agentready-kit";

export const TEMPLATES: TemplateDef[] = [
  {
    id: "basic",
    label: "Basic",
    hint: "Marketing site + blog. Free. MIT.",
    source: `gh:${REPO}/templates/basic`,
    tier: "free",
  },
  {
    id: "saas",
    label: "SaaS dashboard",
    hint: "Auth + billing + dashboard. Pro.",
    source: `gh:${REPO}/templates/saas`,
    tier: "pro",
  },
  {
    id: "docs",
    label: "Docs site",
    hint: "Docs + search + versioning. Pro.",
    source: `gh:${REPO}/templates/docs`,
    tier: "pro",
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    hint: "Product pages + cart, agent-discoverable. Pro.",
    source: `gh:${REPO}/templates/ecommerce`,
    tier: "pro",
  },
];

export function findTemplate(id: string): TemplateDef | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
