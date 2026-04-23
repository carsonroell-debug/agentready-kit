/**
 * Rough token estimate. Not a replacement for tiktoken — it's within 10-15%
 * for English prose, which is all we need for llms.txt hints and the /agent-debug page.
 *
 * Average English token ≈ 4 chars. Code and URLs skew longer per-token.
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

export function countWords(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}
