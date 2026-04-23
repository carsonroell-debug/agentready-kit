/**
 * @agentready/next — client-safe entry.
 * React components + type-safe config helper.
 *
 * For server-only generators (llms.txt, AGENTS.md, content scanner), import from
 * `@agentready/next/server`. For middleware, `@agentready/next/middleware`.
 */
export { defineAgentReady } from "./config";
export { AgentSection, type AgentSectionProps } from "./components/AgentSection";
export { AgentMetadata, type AgentMetadataProps } from "./components/AgentMetadata";
export { estimateTokens, countWords } from "./token-estimator";
export type {
  AgentReadyConfig,
  ContentEntry,
  ContentFrontmatter,
} from "./types";
