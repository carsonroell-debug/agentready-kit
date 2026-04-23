# @agentready/next

Make any Next.js 15 site agent-native.

```bash
npm install @agentready/next
```

## One config file

```ts
// agentready.config.ts
import { defineAgentReady } from "@agentready/next/config";

export default defineAgentReady({
  name: "Acme Corp",
  description: "We sell widgets.",
  baseUrl: "https://acme.com",
  sections: { blog: "Blog", docs: "Documentation" },
});
```

## Three route handlers

```ts
// app/llms.txt/route.ts
import { generateLlmsTxt, scanContent } from "@agentready/next/server";
import config from "@/agentready.config";

export async function GET() {
  const entries = await scanContent(config);
  return new Response(generateLlmsTxt(config, entries), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
```

```ts
// app/AGENTS.md/route.ts (or /api/agents.md)
import { generateAgentsMd, scanContent } from "@agentready/next/server";
import config from "@/agentready.config";

export async function GET() {
  const entries = await scanContent(config);
  return new Response(generateAgentsMd(config, entries), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
```

```ts
// app/markdown/[...slug]/route.ts
import { readContent } from "@agentready/next/server";
import config from "@/agentready.config";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const entry = await readContent(slug.join("/"), config);
  if (!entry) return new Response("Not found", { status: 404 });
  return new Response(entry.content, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
```

## Content negotiation middleware

```ts
// middleware.ts
import { agentReadyMiddleware } from "@agentready/next/middleware";

export default agentReadyMiddleware({
  markdownRoutes: ["/", "/blog/*", "/docs/*"],
});

export const config = { matcher: "/((?!_next|api|favicon.ico).*)" };
```

Now:
- `curl https://acme.com/about.md` → clean Markdown
- `curl -H "Accept: text/markdown" https://acme.com/about` → clean Markdown
- `https://acme.com/about` in a browser → your React page

## Components

```tsx
import { AgentMetadata, AgentSection } from "@agentready/next";

export default function About() {
  return (
    <>
      <AgentMetadata title="About Acme" description="We sell widgets." url="/about" />
      <AgentSection purpose="company-description" summary="Founded 2019, based in Toronto.">
        <h1>About Acme</h1>
        <p>...</p>
      </AgentSection>
    </>
  );
}
```

## License

MIT. Part of the [Freedom Engineers](https://freedomengineers.tech) studio.
