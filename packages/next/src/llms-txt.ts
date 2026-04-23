import type { AgentReadyConfig, ContentEntry } from "./types";

/**
 * Generate an llms.txt per the spec at https://llmstxt.org/.
 *
 * Structure:
 *   # <name>
 *
 *   > <description>
 *
 *   - [Home](/): overview
 *
 *   ## <section>
 *
 *   - [Title](/path): description
 */
export function generateLlmsTxt(config: AgentReadyConfig, entries: ContentEntry[]): string {
  const lines: string[] = [];
  lines.push(`# ${config.name}`, "", `> ${config.description}`, "");

  const baseUrl = config.baseUrl.replace(/\/$/, "");
  const sections = config.sections || {};

  const grouped = new Map<string, ContentEntry[]>();
  for (const e of entries) {
    const key = e.section || "_root";
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(e);
  }

  // Root-level entries first (sectionless), then each named section in config order.
  const root = grouped.get("_root") ?? [];
  if (root.length) {
    for (const e of root) lines.push(entryLine(e, baseUrl));
    lines.push("");
  }

  const orderedSections: string[] = [
    ...Object.keys(sections),
    ...[...grouped.keys()].filter((k) => k !== "_root" && !(k in sections)),
  ];

  for (const key of orderedSections) {
    const es = grouped.get(key);
    if (!es?.length) continue;
    const heading = sections[key] ?? toTitle(key);
    lines.push(`## ${heading}`, "");
    for (const e of es) lines.push(entryLine(e, baseUrl));
    lines.push("");
  }

  return lines.join("\n").trimEnd() + "\n";
}

function entryLine(e: ContentEntry, baseUrl: string): string {
  const abs = `${baseUrl}${e.path === "/" ? "" : e.path}`;
  const suffix = e.description ? `: ${e.description}` : `: ${e.wordCount} words, ~${e.tokenEstimate} tokens`;
  return `- [${e.title}](${abs})${suffix}`;
}

function toTitle(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
