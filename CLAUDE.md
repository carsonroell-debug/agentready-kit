# agentready-kit

Turborepo monorepo: a Next.js 15 starter that makes sites agent-native.

## The product
- **Free (MIT):** `@agentready/next` library + `create-agentready-app` CLI + `templates/basic`
- **Pro ($49 lifetime Gumroad):** `templates/saas`, `templates/docs`, `templates/ecommerce` (license-gated in the CLI)

## Structure
- `packages/next` — runtime library: content scanner, llms.txt generator, AGENTS.md generator, content-negotiation middleware, React components (`<AgentSection>`, `<AgentMetadata>`), token estimator
- `packages/cli` — `create-agentready-app` scaffolding tool. Uses `@clack/prompts`. Premium templates call `verifyLicense()` which hits `https://agentready.tools/api/verify-license` (stubbed to allow "basic").
- `templates/basic` — a complete Next.js 15 App Router app with `@agentready/next` pre-wired. This is what `npx create-agentready-app` copies.

## Key design decisions
- **Content source of truth:** MDX files in `content/` of the user's project. `@agentready/next` scans these at build time for llms.txt generation and serves the raw MD via `/markdown/[...slug]`.
- **`agentready.config.ts`** is the one file users edit. Type-safe via `defineAgentReady()`.
- **License verification is online** — premium templates can't be scaffolded offline. The API call is at `agentready.tools/api/verify-license` (payload: `{ key, template }`).
- **Turbo v2** — uses `tasks` not `pipeline`.

## Commands
```
pnpm install
pnpm dev:basic         # template at localhost:3000
pnpm build:lib         # @agentready/next
pnpm build:cli         # create-agentready-app
```

## Publish flow (when ready)
- `packages/next` → `@agentready/next` on npm
- `packages/cli` → `create-agentready-app` on npm (needs a repo/ folder reference for templates)
- Premium templates → private GitHub org + Gumroad webhook grants access

## Agent learning
If you discover something non-obvious:
1. Update this file
2. Append to `C:\DEV\studio\AGENT_KNOWLEDGE.md` under "agentready-kit" with date
