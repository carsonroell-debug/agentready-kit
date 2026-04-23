import { NextResponse, type NextRequest } from "next/server";
import { agentReadyMiddleware } from "@agentready/next/middleware";
import { updateSession } from "@/lib/supabase/middleware";

const agentReady = agentReadyMiddleware({
  markdownRoutes: ["/", "/pricing", "/features/*", "/docs/*"],
});

/**
 * Chains Supabase session refresh THEN AgentReady content negotiation.
 * If Supabase envs aren't set, we skip the session step gracefully so the
 * template runs on first `npm run dev` before the user wires up auth.
 */
export async function middleware(req: NextRequest) {
  const hasSupabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (hasSupabase) {
    const sessionRes = await updateSession(req);
    // If updateSession short-circuited (e.g. redirect), return it.
    if (sessionRes.headers.get("location")) return sessionRes;
  }

  const res = await agentReady(req);
  return res ?? NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)",
};
