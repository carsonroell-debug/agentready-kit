import { defineAgentReady } from "@agentready/next/config";

export default defineAgentReady({
  name: "Your Docs",
  description:
    "Documentation for your product. Agent-native out of the box — every page has a Markdown alternate.",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",

  contentDir: "content",

  sections: {
    docs: "Documentation",
  },

  setup: {
    install: "npm install",
    dev: "npm run dev",
    build: "npm run build",
  },

  agentHints: [
    "Every doc page responds to Accept: text/markdown with a clean MD body.",
    "For the best token efficiency, agents should fetch `/docs/<slug>.md` directly.",
  ],
});
