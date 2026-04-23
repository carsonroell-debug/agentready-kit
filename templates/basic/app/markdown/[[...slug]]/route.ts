import { readContent } from "@agentready/next/server";
import config from "@/agentready.config";

/**
 * Serves clean Markdown for any content path. Hit either via:
 *   - `/<path>.md`                                   (rewritten by middleware)
 *   - `/<path>` with `Accept: text/markdown`         (rewritten by middleware)
 *   - `/markdown/<path>` directly
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const path = slug?.length ? slug.join("/") : "index";

  const entry = await readContent(path, config);
  if (!entry) {
    return new Response(`# Not Found\n\nNo content at /${path}.\n`, {
      status: 404,
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  }

  const header = [
    "---",
    `url: ${config.baseUrl}${entry.path === "/" ? "" : entry.path}`,
    `title: ${JSON.stringify(entry.title)}`,
    entry.description ? `description: ${JSON.stringify(entry.description)}` : null,
    `tokens: ~${entry.tokenEstimate}`,
    "---",
    "",
  ]
    .filter(Boolean)
    .join("\n");

  return new Response(header + entry.content, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
