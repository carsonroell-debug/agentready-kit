import { defineAgentReady } from "@agentready/next/config";

export default defineAgentReady({
  name: "My AgentReady Site",
  description:
    "A Next.js 15 starter that speaks perfect Markdown to every AI agent. Built with @agentready/next.",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",

  contentDir: "content",

  sections: {
    blog: "Blog",
    docs: "Documentation",
  },

  setup: {
    install: "npm install",
    dev: "npm run dev",
    build: "npm run build",
  },

  agentHints: [
    "Every page has a Markdown version — request with `Accept: text/markdown` or append `.md` to the URL.",
    "The llms.txt index lists all content with word counts and token estimates.",
  ],
});
