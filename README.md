# AgentReady Next.js Kit

> One command. Your Next.js site speaks perfect Markdown to every AI agent.

A Next.js 15 starter + library that makes any site agent-native:

- **`/llms.txt`** auto-generated from your content
- **`/AGENTS.md`** snippet generated from your codebase
- **Content negotiation** — `Accept: text/markdown` on any page serves a clean MD version, no Cloudflare required
- **`<AgentSection>` / `<AgentMetadata>`** React components with token estimates
- **`/agent-debug`** dashboard — see what agents see

Built by [Freedom Engineers](https://freedomengineers.tech). Sibling to [AgentReady Scanner](https://agentready.tools) and [MD This Page Pro](https://mdpage.agentready.tools).

## Try it in 60 seconds

```bash
npx create-agentready-app@latest my-site
cd my-site
npm install
npm run dev
```

Visit:
- `http://localhost:3000` — your site
- `http://localhost:3000/llms.txt` — auto-generated agent index
- `http://localhost:3000/agent-debug` — crawler stats + suggestions
- `curl -H "Accept: text/markdown" http://localhost:3000/` — clean MD version

## Why this exists

AI agents (ChatGPT, Claude, Perplexity, Cursor) read your site differently than Google. Giving them raw HTML with nav, ads, footers, and JS-rendered content wastes 70-90% of their token budget and confuses them.

Cloudflare added content negotiation for sites behind their CDN. This Kit gives you the same thing, self-hosted, with better tooling.

## What's in the box

### Free tier (MIT licensed)

- [`@agentready/next`](./packages/next) — the runtime library
- [`create-agentready-app`](./packages/cli) — scaffolding CLI
- [`templates/basic`](./templates/basic) — a working Next.js 15 starter

### Pro tier ($49 lifetime on Gumroad)

- `templates/saas` — dashboard starter (marketing + auth + billing pre-wired)
- `templates/docs` — docs site with built-in agent routing
- `templates/ecommerce` — product pages optimized for agent discovery
- Premium support + priority feature requests

## Monorepo structure

```
agentready-kit/
├── packages/
│   ├── next/                   # @agentready/next runtime library
│   └── cli/                    # create-agentready-app
└── templates/
    ├── basic/                  # Free — full Next.js 15 starter
    ├── saas/                   # Pro (planned)
    ├── docs/                   # Pro (planned)
    └── ecommerce/              # Pro (planned)
```

## Commands

```bash
pnpm install
pnpm dev:basic           # run the basic template at localhost:3000
pnpm build               # build everything
pnpm build:lib           # just @agentready/next
pnpm build:cli           # just the CLI
```

## Deploy

Templates ship Vercel-ready. `vercel` in the project root just works.

## License

MIT for `@agentready/next` + CLI + basic template. Premium templates use a license-key check.
