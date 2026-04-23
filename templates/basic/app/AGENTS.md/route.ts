import { generateAgentsMd, scanContent } from "@agentready/next/server";
import config from "@/agentready.config";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const entries = await scanContent(config);
  const body = generateAgentsMd(config, entries);
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
