import { generateLlmsTxt, scanContent } from "@agentready/next/server";
import config from "@/agentready.config";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const entries = await scanContent(config);
  const body = generateLlmsTxt(config, entries);
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
