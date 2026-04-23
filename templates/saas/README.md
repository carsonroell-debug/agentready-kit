# @agentready/template-saas

A SaaS starter that's agent-native by default. Marketing + auth + billing + agent-native all pre-wired.

## Stack

- Next.js 15 App Router · React 19 · TypeScript · Tailwind
- Supabase auth (magic link)
- Stripe subscriptions
- `@agentready/next` for llms.txt, AGENTS.md, content negotiation, React components

## Setup

```bash
cp .env.example .env.local
# Fill in Supabase + Stripe env vars
npm install
npm run dev
```

Visit:
- http://localhost:3000 — marketing home
- http://localhost:3000/pricing — PricingTable wired to Stripe Checkout
- http://localhost:3000/llms.txt — agent index
- http://localhost:3000/AGENTS.md — agent instructions
- http://localhost:3000/agent-debug — readiness dashboard

## Customize

1. **`agentready.config.ts`** — name, description, sections, agent hints
2. **`content/*.mdx`** — your public Markdown pages
3. **`app/page.tsx`** — marketing home hero
4. **`app/pricing/page.tsx`** — pricing tiers (match to your Stripe prices)
5. **`app/dashboard/page.tsx`** — authed app shell — replace with your product
6. **`components/Nav.tsx`** — nav links

## Deploy

```bash
vercel
```

Set env vars in Vercel dashboard. Point Stripe webhook at `https://<your-domain>/api/stripe/webhook`.

## License

Part of the [AgentReady Kit](https://agentready.tools/kit). Pro tier — purchase on Gumroad for lifetime access.
