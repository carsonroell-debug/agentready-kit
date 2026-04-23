import type { Metadata } from "next";
import Link from "next/link";
import config from "@/agentready.config";
import "./globals.css";

export const metadata: Metadata = {
  title: config.name,
  description: config.description,
  metadataBase: new URL(config.baseUrl),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="alternate" type="text/markdown" href="/" />
        <link rel="agent-index" href="/llms.txt" />
      </head>
      <body>
        <header className="border-b border-brand-border">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
            <Link href="/" className="font-semibold text-white">
              {config.name}
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/docs/getting-started" className="hover:text-white">
                Docs
              </Link>
              <Link
                href="/llms.txt"
                className="text-brand-muted hover:text-white text-xs"
                title="Agent index"
              >
                /llms.txt
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
