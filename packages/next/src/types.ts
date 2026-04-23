export interface AgentReadyConfig {
  /** The name of the site or organization. Appears as the H1 in llms.txt. */
  name: string;
  /** One-sentence description. Appears as the blockquote below the H1 in llms.txt. */
  description: string;
  /** Absolute base URL, e.g. `https://example.com`. Used to build absolute links. */
  baseUrl: string;
  /** Directory of MDX content, relative to the project root. Default: `content`. */
  contentDir?: string;
  /** Map of top-level route segment -> human-readable section title in llms.txt. */
  sections?: Record<string, string>;
  /** Extra lines appended to AGENTS.md output (custom instructions for agents). */
  agentHints?: string[];
  /** If set, shown at the top of AGENTS.md as project setup guidance. */
  setup?: {
    install?: string;
    dev?: string;
    build?: string;
  };
  /** Paths to exclude from llms.txt (glob patterns, tested against the slug). */
  exclude?: string[];
}

export interface ContentFrontmatter {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  draft?: boolean;
  [k: string]: unknown;
}

export interface ContentEntry {
  /** URL path (leading slash, no `.mdx`), e.g. `/blog/hello-world`. */
  path: string;
  /** Top-level section key (first path segment), e.g. `blog`. */
  section: string;
  /** Source file path, e.g. `content/blog/hello-world.mdx`. */
  file: string;
  /** Parsed frontmatter. */
  frontmatter: ContentFrontmatter;
  /** Title — frontmatter.title, or first H1, or filename. */
  title: string;
  /** Description — frontmatter.description, or first paragraph. */
  description: string | null;
  /** Raw markdown body (frontmatter stripped). */
  content: string;
  /** Token estimate (chars / 4). */
  tokenEstimate: number;
  /** Word count. */
  wordCount: number;
}
