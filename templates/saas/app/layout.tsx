import type { Metadata } from "next";
import config from "@/agentready.config";
import { Nav } from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: config.name,
  description: config.description,
  metadataBase: new URL(config.baseUrl),
  alternates: {
    types: {
      "text/markdown": "/",
      "text/plain": "/llms.txt",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="alternate" type="text/markdown" href="/" />
        <link rel="agent-index" href="/llms.txt" />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <footer className="max-w-6xl mx-auto px-6 py-8 text-xs text-brand-muted border-t border-brand-border mt-16">
          <div className="flex items-center justify-between">
            <span>© {new Date().getFullYear()} {config.name}</span>
            <span className="text-brand-muted">
              Built with{" "}
              <a href="https://agentready.tools/kit" className="text-brand-accent hover:underline">
                AgentReady Kit
              </a>{" "}
              · <a href="/llms.txt" className="text-brand-accent hover:underline">/llms.txt</a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
