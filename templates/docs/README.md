# @agentready/template-docs

Docs site template that's agent-native by default. Sidebar nav, prev/next, `/llms.txt`, `/AGENTS.md`, and Markdown alternates on every page.

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

- http://localhost:3000 — docs home
- http://localhost:3000/docs/getting-started — first doc
- http://localhost:3000/llms.txt — agent index
- http://localhost:3000/agent-debug — readiness dashboard

## Add a doc page

Create `content/docs/<slug>.mdx`:

```yaml
---
title: My new doc
description: One sentence.
order: 10
---

# My new doc

...your content...
```

That's it. The sidebar, `/llms.txt`, and `.md` alternate all update automatically.

## Deploy

```bash
vercel
```

See `content/docs/deploy.mdx` for details.

## License

Part of the [AgentReady Kit](https://agentready.tools/kit). Pro tier — purchase on Gumroad for lifetime access.
