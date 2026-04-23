import { readFile, readdir, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import matter from "gray-matter";
import { countWords, estimateTokens } from "./token-estimator";
import type { AgentReadyConfig, ContentEntry, ContentFrontmatter } from "./types";

/**
 * Walk the content directory and return one entry per MDX/MD file.
 * Skips drafts and any path matched by config.exclude.
 */
export async function scanContent(config: AgentReadyConfig): Promise<ContentEntry[]> {
  const dir = config.contentDir || "content";
  const root = join(process.cwd(), dir);
  const files = await walk(root).catch(() => [] as string[]);
  const entries: ContentEntry[] = [];

  for (const file of files) {
    if (!/\.(mdx?|markdown)$/.test(file)) continue;
    const entry = await readEntry(file, root, dir);
    if (!entry) continue;
    if (entry.frontmatter.draft) continue;
    if (isExcluded(entry.path, config.exclude)) continue;
    entries.push(entry);
  }

  return entries.sort((a, b) => a.path.localeCompare(b.path));
}

/**
 * Read a single content file by URL path (used by /markdown/[...slug] route handlers).
 * Returns null if the file doesn't exist.
 */
export async function readContent(
  path: string,
  config: AgentReadyConfig,
): Promise<ContentEntry | null> {
  const dir = config.contentDir || "content";
  const root = join(process.cwd(), dir);
  const clean = path.replace(/^\/+|\/+$/g, "");
  const candidates = [`${clean}.mdx`, `${clean}.md`, `${clean}/index.mdx`, `${clean}/index.md`];
  for (const rel of candidates) {
    try {
      const file = join(root, rel);
      await stat(file);
      return await readEntry(file, root, dir);
    } catch {
      continue;
    }
  }
  return null;
}

async function walk(dir: string): Promise<string[]> {
  const names = await readdir(dir, { withFileTypes: true });
  const out: string[] = [];
  for (const name of names) {
    const p = join(dir, name.name);
    if (name.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

async function readEntry(
  file: string,
  root: string,
  contentDir: string,
): Promise<ContentEntry | null> {
  const raw = await readFile(file, "utf8");
  const parsed = matter(raw);
  const frontmatter = parsed.data as ContentFrontmatter;
  const content = parsed.content;

  const rel = relative(root, file).replaceAll(sep, "/");
  const slug = rel
    .replace(/\.(mdx?|markdown)$/, "")
    .replace(/\/index$/, "")
    .replace(/^index$/, "");
  const path = "/" + slug;
  const section = slug.split("/")[0] || "";

  const title = (frontmatter.title as string | undefined) ?? extractH1(content) ?? (slug || "Home");
  const description =
    (frontmatter.description as string | undefined) ?? extractFirstParagraph(content) ?? null;

  return {
    path: path === "/" ? "/" : path,
    section,
    file: relative(process.cwd(), file).replaceAll(sep, "/") || `${contentDir}/${rel}`,
    frontmatter,
    title,
    description,
    content,
    tokenEstimate: estimateTokens(content),
    wordCount: countWords(content),
  };
}

function extractH1(md: string): string | null {
  const m = md.match(/^#\s+(.+)$/m);
  return m?.[1]?.trim() ?? null;
}

function extractFirstParagraph(md: string): string | null {
  const body = md.replace(/^---[\s\S]*?---/, "").trim();
  const paragraphs = body.split(/\n\n+/);
  for (const p of paragraphs) {
    const t = p.trim();
    if (!t || t.startsWith("#") || t.startsWith("```") || t.startsWith(">")) continue;
    return t.slice(0, 280);
  }
  return null;
}

function isExcluded(path: string, patterns: string[] = []): boolean {
  if (!patterns.length) return false;
  return patterns.some((pat) => {
    if (pat.endsWith("/*")) return path.startsWith(pat.slice(0, -1));
    return path === pat;
  });
}
