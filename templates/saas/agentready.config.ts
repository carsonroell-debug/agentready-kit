import { defineAgentReady } from "@agentready/next/config";

export default defineAgentReady({
  name: "Acme SaaS",
  description:
    "A SaaS starter that's agent-native by default. Replace this description in agentready.config.ts.",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",

  contentDir: "content",

  sections: {
    features: "Features",
    pricing: "Pricing",
    docs: "Documentation",
  },

  setup: {
    install: "npm install",
    dev: "npm run dev",
    build: "npm run build",
  },

  agentHints: [
    "This is a paid SaaS — authentication required for the /app dashboard.",
    "Pricing, features, and docs are public and available as Markdown at <url>.md.",
    "For API access, contact the site owner — see the About page.",
  ],
});
