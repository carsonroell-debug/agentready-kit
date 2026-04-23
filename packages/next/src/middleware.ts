import { NextResponse, type NextRequest } from "next/server";

export interface AgentReadyMiddlewareOptions {
  /**
   * Path prefixes that should respond with Markdown when the request has
   * `Accept: text/markdown` (or `.md` suffix). Each entry can be a literal path
   * or a prefix ending in `/*`.
   *
   * @default ["/", "/*"]
   */
  markdownRoutes?: string[];
  /**
   * Paths that are served by their own route handlers (e.g. `/AGENTS.md`,
   * `/llms.txt`) and must NOT be rewritten to `/markdown/...`. These still get
   * the correct `Content-Type` from their handler.
   *
   * @default ["/AGENTS.md", "/llms.txt", "/CLAUDE.md", "/robots.txt", "/sitemap.xml"]
   */
  bypass?: string[];
  /**
   * Extra logic to chain before content negotiation kicks in (Supabase session
   * refresh, redirects, etc.). Return a response to short-circuit.
   */
  before?: (req: NextRequest) => Promise<NextResponse | undefined> | NextResponse | undefined;
}

const DEFAULT_BYPASS = [
  "/AGENTS.md",
  "/llms.txt",
  "/CLAUDE.md",
  "/robots.txt",
  "/sitemap.xml",
];

/**
 * Next.js middleware that implements content negotiation for AI agents.
 *
 * - `GET /foo.md`                 -> rewrites to `/markdown/foo`
 * - `GET /foo` with `Accept: text/markdown` -> rewrites to `/markdown/foo`
 * - Everything else passes through.
 *
 * @example
 * ```ts
 * // middleware.ts
 * import { agentReadyMiddleware } from "@agentready/next/middleware";
 *
 * export default agentReadyMiddleware({
 *   markdownRoutes: ["/", "/blog/*", "/docs/*"],
 * });
 *
 * export const config = { matcher: "/((?!_next|api|favicon.ico).*)" };
 * ```
 */
export function agentReadyMiddleware(options: AgentReadyMiddlewareOptions = {}) {
  const routes = options.markdownRoutes ?? ["/", "/*"];
  const bypass = new Set([...(options.bypass ?? DEFAULT_BYPASS)]);

  return async function middleware(req: NextRequest): Promise<NextResponse> {
    if (options.before) {
      const early = await options.before(req);
      if (early) return early;
    }

    const { pathname } = req.nextUrl;

    // Never rewrite well-known files that are served by their own route handlers.
    if (bypass.has(pathname)) return NextResponse.next();

    // Case 1: `.md` suffix — explicit request for the markdown version.
    if (pathname.endsWith(".md") && !pathname.startsWith("/markdown/")) {
      const url = req.nextUrl.clone();
      const base = pathname.slice(0, -3) || "/";
      url.pathname = `/markdown${base === "/" ? "" : base}`;
      return NextResponse.rewrite(url);
    }

    // Case 2: Accept: text/markdown header
    const accept = req.headers.get("accept") ?? "";
    if (accept.includes("text/markdown") && matches(pathname, routes)) {
      const url = req.nextUrl.clone();
      url.pathname = `/markdown${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  };
}

function matches(path: string, routes: string[]): boolean {
  for (const r of routes) {
    if (r.endsWith("/*")) {
      const prefix = r.slice(0, -2);
      if (path === prefix || path.startsWith(`${prefix}/`)) return true;
      if (prefix === "" && path !== "/markdown") return true;
    } else if (r === path) {
      return true;
    }
  }
  return false;
}
