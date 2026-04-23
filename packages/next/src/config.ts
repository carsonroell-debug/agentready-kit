import type { AgentReadyConfig } from "./types";

/**
 * Define an AgentReady config with full TypeScript autocomplete.
 * This is the single source of truth for how your site exposes itself to agents.
 *
 * @example
 * ```ts
 * // agentready.config.ts
 * import { defineAgentReady } from "@agentready/next/config";
 *
 * export default defineAgentReady({
 *   name: "Acme Corp",
 *   description: "We sell widgets.",
 *   baseUrl: "https://acme.com",
 *   sections: { blog: "Blog", docs: "Documentation" },
 * });
 * ```
 */
export function defineAgentReady(config: AgentReadyConfig): AgentReadyConfig {
  return {
    contentDir: "content",
    sections: {},
    agentHints: [],
    exclude: [],
    ...config,
  };
}
