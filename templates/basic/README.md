# My AgentReady Site

A Next.js 15 starter that's fully agent-native out of the box.

## Dev

```bash
npm install
npm run dev
```

Then visit:
- http://localhost:3000 — your site
- http://localhost:3000/llms.txt — auto-generated agent index
- http://localhost:3000/AGENTS.md — instructions for crawlers
- http://localhost:3000/agent-debug — readiness dashboard
- `curl -H "Accept: text/markdown" http://localhost:3000/about` — Markdown version

## Edit

- **`agentready.config.ts`** — site name, description, sections, agent hints
- **`content/*.mdx`** — your pages (one file per URL)
- **`app/*`** — React pages (home, blog, about)

The Kit keeps `llms.txt`, `AGENTS.md`, and the `.md` alternates in sync automatically.

## Deploy

```bash
vercel
```

Set `NEXT_PUBLIC_BASE_URL` to your deployed URL — it's used for absolute links in `llms.txt` and JSON-LD.

## Upgrade

Pro templates at [agentready.tools/kit](https://agentready.tools/kit):
- **SaaS dashboard** — auth + billing pre-wired
- **Docs site** — search + versioning
- **E-commerce** — product pages built for agent discovery

$49 lifetime.
