# create-agentready-app

Scaffold a new Next.js 15 site that's fully agent-native out of the box.

```bash
npx create-agentready-app@latest my-site
# or
npm create agentready-app@latest my-site
pnpm create agentready-app my-site
```

## What you get

- `/llms.txt` auto-generated from your content
- `/AGENTS.md` snippet for agent crawlers
- Content negotiation middleware — `Accept: text/markdown` returns clean MD
- `<AgentSection>` + `<AgentMetadata>` React components
- `/agent-debug` dashboard page
- Sample MDX content in `content/`

## Templates

| Template | Tier | What it is |
| --- | --- | --- |
| `basic` | Free (MIT) | Marketing site + blog |
| `saas` | Pro ($49) | Auth + billing + dashboard |
| `docs` | Pro ($49) | Docs + search + versioning |
| `ecommerce` | Pro ($49) | Product pages optimized for agents |

Pro templates require a license key from [agentready.tools/kit](https://agentready.tools/kit).

## Dev mode

Running inside the monorepo? Point at local templates instead of fetching:

```bash
AGENTREADY_LOCAL_TEMPLATES=./templates npx create-agentready-app my-site
```
