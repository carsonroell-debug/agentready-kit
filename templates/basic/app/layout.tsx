import type { Metadata } from "next";
import Link from "next/link";
import config from "@/agentready.config";
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
        <nav className="border-b border-brand-border">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
            <Link href="/" className="font-semibold text-white">
              {config.name}
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/about" className="hover:text-white">
                About
              </Link>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
              <Link href="/agent-debug" className="text-brand-muted hover:text-white text-xs">
                🤖 Agent debug
              </Link>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-6 py-12">{children}</main>
        <footer className="max-w-4xl mx-auto px-6 py-8 text-xs text-brand-muted border-t border-brand-border">
          Built with{" "}
          <a href="https://agentready.tools/kit" className="text-brand-accent hover:underline">
            AgentReady Kit
          </a>
          . View{" "}
          <Link href="/llms.txt" className="text-brand-accent hover:underline">
            /llms.txt
          </Link>{" "}
          ·{" "}
          <Link href="/AGENTS.md" className="text-brand-accent hover:underline">
            /AGENTS.md
          </Link>
        </footer>
      </body>
    </html>
  );
}
